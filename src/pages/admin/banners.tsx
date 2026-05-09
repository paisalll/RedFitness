import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Stack, Card, Button, CircularProgress, Chip,
} from '@mui/material';
import Iconify from 'src/components/iconify';
import { supabase } from 'src/utils/supabase';
import { useAdminAuth } from 'src/contexts/admin-auth-context';

const PAGE_LABELS: Record<string, string> = {
  home: 'Home',
  classes: 'Classes',
  clubs: 'Clubs',
  membership: 'Membership',
  career: 'Career',
  contact: 'Personal Training',
  highlights: 'Highlights',
};

type Banner = { id: number; page_key: string; image_url: string | null; updated_at: string };

export default function AdminBannersPage() {
  const { role } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (role && role !== 'admin') navigate('/rf-admin/schedules', { replace: true });
  }, [role, navigate]);

  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<string | null>(null);

  const fetchBanners = async () => {
    setLoading(true);
    const { data } = await supabase.from('banners').select('*').order('page_key');
    if (data) setBanners(data);
    setLoading(false);
  };

  useEffect(() => { fetchBanners(); }, []);

  const handleUpload = async (pageKey: string, file: File) => {
    setUploading(pageKey);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `banners/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('fitness-assets')
        .upload(filePath, file, { cacheControl: '3600', upsert: false });
      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage.from('fitness-assets').getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('banners')
        .upsert({ page_key: pageKey, image_url: urlData.publicUrl, updated_at: new Date().toISOString() }, { onConflict: 'page_key' });
      if (updateError) throw updateError;

      fetchBanners();
    } catch (err: any) {
      alert('Upload error: ' + err.message);
    } finally {
      setUploading(null);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress sx={{ color: '#DF2026' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ color: '#fff', fontWeight: 800, fontFamily: "'Poppins', sans-serif" }}>
          Banners
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.875rem', mt: 0.5 }}>
          Manage hero section background images across pages
        </Typography>
      </Box>

      <Stack spacing={2}>
        {Object.entries(PAGE_LABELS).map(([key, label]) => {
          const banner = banners.find((b) => b.page_key === key);
          const isUploading = uploading === key;

          return (
            <Card
              key={key}
              sx={{
                p: 3,
                bgcolor: '#1A1A1A',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 2,
                boxShadow: 'none',
              }}
            >
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems={{ sm: 'center' }}>
                {/* Preview */}
                <Box
                  sx={{
                    width: { xs: '100%', sm: 160 },
                    height: 90,
                    borderRadius: 1.5,
                    overflow: 'hidden',
                    bgcolor: '#111',
                    flexShrink: 0,
                    border: '1px solid rgba(255,255,255,0.06)',
                    position: 'relative',
                  }}
                >
                  {banner?.image_url ? (
                    <img
                      src={banner.image_url}
                      alt={label}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 1 }}>
                      <Iconify icon="solar:image-broken-bold" width={28} sx={{ color: 'rgba(255,255,255,0.15)' }} />
                    </Box>
                  )}
                </Box>

                {/* Info */}
                <Box sx={{ flex: 1 }}>
                  <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 0.5 }}>
                    <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem' }}>{label}</Typography>
                    <Chip
                      label={banner?.image_url ? 'Custom' : 'Default'}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        bgcolor: banner?.image_url ? 'rgba(223,32,38,0.12)' : 'rgba(255,255,255,0.06)',
                        color: banner?.image_url ? '#DF2026' : 'rgba(255,255,255,0.3)',
                        border: 'none',
                      }}
                    />
                  </Stack>
                  <Typography sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', fontFamily: 'monospace' }}>
                    /{key === 'home' ? '' : key}
                  </Typography>
                  {banner?.updated_at && (
                    <Typography sx={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.7rem', mt: 0.5 }}>
                      Updated {new Date(banner.updated_at).toLocaleDateString('id-ID')}
                    </Typography>
                  )}
                </Box>

                {/* Upload button */}
                <Button
                  component="label"
                  variant="outlined"
                  size="small"
                  disabled={isUploading}
                  startIcon={
                    isUploading ? (
                      <CircularProgress size={14} color="inherit" />
                    ) : (
                      <Iconify icon="eva:cloud-upload-fill" />
                    )
                  }
                  sx={{
                    color: 'rgba(255,255,255,0.5)',
                    borderColor: 'rgba(255,255,255,0.12)',
                    whiteSpace: 'nowrap',
                    '&:hover': { borderColor: '#DF2026', color: '#DF2026', bgcolor: 'rgba(223,32,38,0.06)' },
                  }}
                >
                  {isUploading ? 'Uploading...' : banner?.image_url ? 'Replace Image' : 'Upload Image'}
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleUpload(key, file);
                      e.target.value = '';
                    }}
                  />
                </Button>
              </Stack>
            </Card>
          );
        })}
      </Stack>
    </Box>
  );
}

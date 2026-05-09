import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Button, Stack, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, IconButton, Dialog,
  DialogTitle, DialogContent, DialogActions, TextField, CircularProgress,
} from '@mui/material';
import Iconify from 'src/components/iconify';
import { supabase } from 'src/utils/supabase';
import { useAdminAuth } from 'src/contexts/admin-auth-context';

const inputDarkSx = {
  '& .MuiOutlinedInput-root': {
    color: '#fff',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.12)' },
    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
    '&.Mui-focused fieldset': { borderColor: '#DF2026' },
  },
  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.4)' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#DF2026' },
};

export default function AdminClubsPage() {
  const { role } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (role && role !== 'admin') navigate('/rf-admin/schedules', { replace: true });
  }, [role, navigate]);

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const { data: result } = await supabase.from('clubs').select('*').order('id');
    if (result) setData(result);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const { error } = await supabase.storage.from('fitness-assets').upload(`clubs/${fileName}`, file, { cacheControl: '3600', upsert: false });
    if (error) throw error;
    const { data: urlData } = supabase.storage.from('fitness-assets').getPublicUrl(`clubs/${fileName}`);
    return urlData.publicUrl;
  };

  const handleSave = async () => {
    setIsUploading(true);
    try {
      const payload = { ...formData };
      if (selectedFile) payload.image_url = await uploadImage(selectedFile);
      if (isEdit) {
        const { error } = await supabase.from('clubs').update(payload).eq('id', payload.id);
        if (error) throw error;
      } else {
        delete payload.id;
        const { error } = await supabase.from('clubs').insert([payload]);
        if (error) throw error;
      }
      setOpenDialog(false);
      fetchData();
    } catch (err: any) {
      alert('Error: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: any) => {
    if (!window.confirm('Delete this club?')) return;
    await supabase.from('clubs').delete().eq('id', id);
    fetchData();
  };

  const openNew = () => { setFormData({}); setSelectedFile(null); setIsEdit(false); setOpenDialog(true); };
  const openEdit = (row: any) => { setFormData(row); setSelectedFile(null); setIsEdit(true); setOpenDialog(true); };

  return (
    <Box sx={{ p: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ color: '#fff', fontWeight: 800, fontFamily: "'Poppins', sans-serif" }}>
            Clubs
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.875rem', mt: 0.5 }}>
            Manage gym locations
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={openNew}
          sx={{ bgcolor: '#DF2026', '&:hover': { bgcolor: '#A8171C' }, boxShadow: 'none' }}
        >
          Add Club
        </Button>
      </Stack>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
          <CircularProgress sx={{ color: '#DF2026' }} />
        </Box>
      ) : (
        <TableContainer
          component={Paper}
          sx={{ bgcolor: '#1A1A1A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2, boxShadow: 'none' }}
        >
          <Table>
            <TableHead>
              <TableRow>
                {['Name', 'City', 'Image', 'Actions'].map((h) => (
                  <TableCell
                    key={h}
                    align={h === 'Actions' ? 'right' : 'left'}
                    sx={{ color: 'rgba(255,255,255,0.4)', borderColor: 'rgba(255,255,255,0.06)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: 1.5 }}
                  >
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.06)' }}>{row.name}</TableCell>
                  <TableCell sx={{ color: 'rgba(255,255,255,0.55)', borderColor: 'rgba(255,255,255,0.06)' }}>{row.city}</TableCell>
                  <TableCell sx={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                    {row.image_url && (
                      <img src={row.image_url} alt="" width={56} height={38} style={{ borderRadius: 4, objectFit: 'cover' }} />
                    )}
                  </TableCell>
                  <TableCell align="right" sx={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                    <IconButton size="small" onClick={() => openEdit(row)} sx={{ color: 'rgba(255,255,255,0.4)', '&:hover': { color: '#fff' } }}>
                      <Iconify icon="eva:edit-fill" />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(row.id)} sx={{ color: 'rgba(255,255,255,0.4)', '&:hover': { color: '#DF2026' } }}>
                      <Iconify icon="eva:trash-2-fill" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{ sx: { bgcolor: '#1A1A1A', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 2 } }}
      >
        <DialogTitle sx={{ color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          {isEdit ? 'Edit Club' : 'Add Club'}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2.5} sx={{ mt: 2.5 }}>
            <Box sx={{ p: 2, border: '1px dashed rgba(255,255,255,0.12)', borderRadius: 1, textAlign: 'center' }}>
              <Button
                component="label"
                variant="outlined"
                size="small"
                startIcon={<Iconify icon="eva:cloud-upload-fill" />}
                sx={{ color: 'rgba(255,255,255,0.5)', borderColor: 'rgba(255,255,255,0.15)', '&:hover': { borderColor: '#DF2026', color: '#DF2026' } }}
              >
                {selectedFile ? 'Change Image' : 'Upload Image'}
                <input type="file" hidden accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) setSelectedFile(f); e.target.value = ''; }} />
              </Button>
              {selectedFile && (
                <Typography variant="caption" sx={{ display: 'block', mt: 1, color: '#DF2026' }}>{selectedFile.name}</Typography>
              )}
              {!selectedFile && formData.image_url && (
                <Box sx={{ mt: 1.5 }}>
                  <img src={formData.image_url} alt="" style={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 4 }} />
                </Box>
              )}
            </Box>
            <TextField label="Name" value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} fullWidth sx={inputDarkSx} />
            <TextField label="Club Key" value={formData.club_key || ''} onChange={(e) => setFormData({ ...formData, club_key: e.target.value })} fullWidth sx={inputDarkSx} />
            <TextField label="City" value={formData.city || ''} onChange={(e) => setFormData({ ...formData, city: e.target.value })} fullWidth sx={inputDarkSx} />
            <TextField label="Address" multiline rows={3} value={formData.address || ''} onChange={(e) => setFormData({ ...formData, address: e.target.value })} fullWidth sx={inputDarkSx} />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2.5, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <Button onClick={() => setOpenDialog(false)} disabled={isUploading} sx={{ color: 'rgba(255,255,255,0.4)' }}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={isUploading}
            sx={{ bgcolor: '#DF2026', '&:hover': { bgcolor: '#A8171C' }, boxShadow: 'none' }}
          >
            {isUploading ? <CircularProgress size={20} color="inherit" /> : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

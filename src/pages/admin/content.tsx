import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Stack, Card, Button, CircularProgress, Chip,
  TextField, Snackbar, Alert, Divider,
} from '@mui/material';
import Iconify from 'src/components/iconify';
import { supabase } from 'src/utils/supabase';
import { useAdminAuth } from 'src/contexts/admin-auth-context';
import { CONTENT_SCHEMAS, SectionContent } from 'src/content';
import { usePageContent, mutate, KEYS } from 'src/api/admin';

// ----------------------------------------------------------------------

const inputDarkSx = {
  '& .MuiOutlinedInput-root': {
    color: '#fff',
    fontSize: '0.875rem',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.12)' },
    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
    '&.Mui-focused fieldset': { borderColor: '#DF2026' },
  },
  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.4)' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#DF2026' },
  '& .MuiFormHelperText-root': { color: 'rgba(255,255,255,0.25)' },
};

type PageValues = Record<string, SectionContent>;

// ----------------------------------------------------------------------

export default function AdminContentPage() {
  const { role } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (role && role !== 'admin') navigate('/rf-admin/schedules', { replace: true });
  }, [role, navigate]);

  const [pageKey, setPageKey] = useState(CONTENT_SCHEMAS[0]?.pageKey ?? '');
  const schema = useMemo(
    () => CONTENT_SCHEMAS.find((p) => p.pageKey === pageKey),
    [pageKey]
  );

  const { rows, isLoading: loading } = usePageContent(pageKey);

  const [savingSection, setSavingSection] = useState<string | null>(null);
  // `values` = editable state, `saved` = last persisted snapshot (for dirty check)
  const [values, setValues] = useState<PageValues>({});
  const [saved, setSaved] = useState<PageValues>({});
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  // Rebuild local edit state whenever the page or fetched rows change.
  useEffect(() => {
    if (!schema) return;
    const base: PageValues = {};
    schema.sections.forEach((sec) => {
      base[sec.key] = { ...sec.defaults };
    });
    rows.forEach((row: { section_key: string; content: SectionContent }) => {
      if (base[row.section_key]) {
        base[row.section_key] = { ...base[row.section_key], ...(row.content || {}) };
      }
    });
    setValues(base);
    setSaved(JSON.parse(JSON.stringify(base)));
  }, [pageKey, rows, schema]);

  const setField = (sectionKey: string, fieldKey: string, value: string) => {
    setValues((prev) => ({
      ...prev,
      [sectionKey]: { ...prev[sectionKey], [fieldKey]: value },
    }));
  };

  const isDirty = (sectionKey: string) =>
    JSON.stringify(values[sectionKey]) !== JSON.stringify(saved[sectionKey]);

  const handleSave = async (sectionKey: string) => {
    setSavingSection(sectionKey);
    try {
      const { error } = await supabase.from('page_content').upsert(
        {
          page_key: pageKey,
          section_key: sectionKey,
          content: values[sectionKey],
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'page_key,section_key' }
      );
      if (error) throw error;

      setSaved((prev) => ({
        ...prev,
        [sectionKey]: JSON.parse(JSON.stringify(values[sectionKey])),
      }));
      mutate(KEYS.pageContent(pageKey));
      setToast({ msg: 'Perubahan tersimpan', type: 'success' });
    } catch (err: any) {
      setToast({ msg: 'Gagal menyimpan: ' + err.message, type: 'error' });
    } finally {
      setSavingSection(null);
    }
  };

  const handleResetToDefault = (sectionKey: string) => {
    const sec = schema?.sections.find((s) => s.key === sectionKey);
    if (!sec) return;
    setValues((prev) => ({ ...prev, [sectionKey]: { ...sec.defaults } }));
  };

  const handleRevert = (sectionKey: string) => {
    setValues((prev) => ({
      ...prev,
      [sectionKey]: JSON.parse(JSON.stringify(saved[sectionKey])),
    }));
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ color: '#fff', fontWeight: 800, fontFamily: "'Poppins', sans-serif" }}>
          Page Content
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.875rem', mt: 0.5 }}>
          Ubah teks/copy yang tampil di setiap section halaman
        </Typography>
      </Box>

      {/* Page selector */}
      <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}>
        {CONTENT_SCHEMAS.map((p) => {
          const active = p.pageKey === pageKey;
          return (
            <Chip
              key={p.pageKey}
              label={p.label}
              onClick={() => setPageKey(p.pageKey)}
              sx={{
                fontWeight: 700,
                fontSize: '0.78rem',
                borderRadius: 1,
                bgcolor: active ? 'rgba(223,32,38,0.12)' : 'rgba(255,255,255,0.04)',
                color: active ? '#DF2026' : 'rgba(255,255,255,0.45)',
                border: `1px solid ${active ? 'rgba(223,32,38,0.3)' : 'rgba(255,255,255,0.08)'}`,
                '&:hover': { bgcolor: active ? 'rgba(223,32,38,0.16)' : 'rgba(255,255,255,0.07)' },
              }}
            />
          );
        })}
      </Stack>

      {loading || !schema ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
          <CircularProgress sx={{ color: '#DF2026' }} />
        </Box>
      ) : (
        <Stack spacing={3}>
          {schema.sections.map((sec) => {
            const dirty = isDirty(sec.key);
            const isSaving = savingSection === sec.key;

            return (
              <Card
                key={sec.key}
                sx={{
                  bgcolor: '#1A1A1A',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 2,
                  boxShadow: 'none',
                  overflow: 'visible',
                }}
              >
                {/* Section header */}
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ p: 3, pb: 2 }}
                >
                  <Box>
                    <Stack direction="row" alignItems="center" spacing={1.5}>
                      <Box sx={{ width: 4, height: 18, bgcolor: '#DF2026', borderRadius: 0.5 }} />
                      <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1rem' }}>
                        {sec.label}
                      </Typography>
                      {dirty && (
                        <Chip
                          label="Belum disimpan"
                          size="small"
                          sx={{
                            height: 20,
                            fontSize: '0.62rem',
                            fontWeight: 700,
                            bgcolor: 'rgba(223,32,38,0.12)',
                            color: '#DF2026',
                          }}
                        />
                      )}
                    </Stack>
                    {sec.description && (
                      <Typography sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.78rem', mt: 0.5, ml: 2.75 }}>
                        {sec.description}
                      </Typography>
                    )}
                  </Box>
                </Stack>

                <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />

                {/* Fields */}
                <Box
                  sx={{
                    p: 3,
                    display: 'grid',
                    gap: 2.5,
                    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                  }}
                >
                  {sec.fields.map((field) => (
                    <TextField
                      key={field.key}
                      label={field.label}
                      value={values[sec.key]?.[field.key] ?? ''}
                      onChange={(e) => setField(sec.key, field.key, e.target.value)}
                      helperText={field.hint}
                      multiline={field.type === 'multiline'}
                      minRows={field.type === 'multiline' ? 2 : undefined}
                      fullWidth
                      size="small"
                      sx={{
                        ...inputDarkSx,
                        gridColumn: field.type === 'multiline' ? { md: '1 / -1' } : undefined,
                      }}
                    />
                  ))}
                </Box>

                <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />

                {/* Section actions */}
                <Stack
                  direction="row"
                  spacing={1.5}
                  justifyContent="flex-end"
                  alignItems="center"
                  sx={{ p: 2, px: 3 }}
                >
                  <Button
                    size="small"
                    onClick={() => handleResetToDefault(sec.key)}
                    sx={{ color: 'rgba(255,255,255,0.35)', '&:hover': { color: 'rgba(255,255,255,0.7)' } }}
                  >
                    Pulihkan default
                  </Button>
                  <Button
                    size="small"
                    onClick={() => handleRevert(sec.key)}
                    disabled={!dirty}
                    sx={{ color: 'rgba(255,255,255,0.35)', '&:hover': { color: 'rgba(255,255,255,0.7)' } }}
                  >
                    Batalkan
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleSave(sec.key)}
                    disabled={!dirty || isSaving}
                    startIcon={
                      isSaving ? (
                        <CircularProgress size={14} color="inherit" />
                      ) : (
                        <Iconify icon="solar:diskette-bold" width={16} />
                      )
                    }
                    sx={{
                      bgcolor: '#DF2026',
                      boxShadow: 'none',
                      '&:hover': { bgcolor: '#A8171C', boxShadow: 'none' },
                      '&.Mui-disabled': { bgcolor: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.25)' },
                    }}
                  >
                    {isSaving ? 'Menyimpan...' : 'Simpan'}
                  </Button>
                </Stack>
              </Card>
            );
          })}
        </Stack>
      )}

      <Snackbar
        open={!!toast}
        autoHideDuration={3000}
        onClose={() => setToast(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={toast?.type ?? 'success'}
          variant="filled"
          onClose={() => setToast(null)}
          sx={{ width: '100%' }}
        >
          {toast?.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}

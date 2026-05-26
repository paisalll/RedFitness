import {
  Box, Typography, Button, Stack, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Chip, CircularProgress, IconButton,
} from '@mui/material';
import Iconify from 'src/components/iconify';
import { supabase } from 'src/utils/supabase';
import { useRegistrations, mutate, KEYS } from 'src/api/admin';

// ----------------------------------------------------------------------

const SOURCE_COLORS: Record<string, string> = {
  free_trial: '#DF2026',
  whatsapp: '#25D366',
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

// ----------------------------------------------------------------------

export default function AdminRegistrationsPage() {
  const { registrations: data, isLoading: loading } = useRegistrations();

  const handleDelete = async (id: number) => {
    if (!window.confirm('Hapus pendaftaran ini?')) return;
    await supabase.from('registrations').delete().eq('id', id);
    mutate(KEYS.registrations);
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Nama Depan', 'Nama Belakang', 'Email', 'Telepon', 'Klub', 'Source', 'Tanggal'];
    const rows = data.map((r) => [
      r.id,
      r.first_name,
      r.last_name ?? '',
      r.email,
      r.phone ?? '',
      r.clubs?.name ?? '',
      r.source,
      formatDate(r.created_at),
    ]);
    const csv = [headers, ...rows].map((row) => row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `registrations-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ color: '#fff', fontWeight: 800, fontFamily: "'Poppins', sans-serif" }}>
            Registrations
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.875rem', mt: 0.5 }}>
            {data.length} total pendaftaran
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5}>
          <Button
            variant="outlined"
            startIcon={<Iconify icon="solar:download-bold" />}
            onClick={handleExportCSV}
            disabled={data.length === 0}
            sx={{ color: 'rgba(255,255,255,0.5)', borderColor: 'rgba(255,255,255,0.12)', '&:hover': { borderColor: '#DF2026', color: '#DF2026' } }}
          >
            Export CSV
          </Button>
          <Button
            variant="outlined"
            startIcon={<Iconify icon="solar:refresh-bold" />}
            onClick={() => mutate(KEYS.registrations)}
            sx={{ color: 'rgba(255,255,255,0.5)', borderColor: 'rgba(255,255,255,0.12)', '&:hover': { borderColor: '#DF2026', color: '#DF2026' } }}
          >
            Refresh
          </Button>
        </Stack>
      </Stack>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
          <CircularProgress sx={{ color: '#DF2026' }} />
        </Box>
      ) : data.length === 0 ? (
        <Box sx={{ py: 10, textAlign: 'center' }}>
          <Iconify icon="solar:inbox-bold-duotone" width={48} sx={{ color: 'rgba(255,255,255,0.15)', mb: 2 }} />
          <Typography sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.9rem' }}>Belum ada pendaftaran.</Typography>
        </Box>
      ) : (
        <TableContainer
          component={Paper}
          sx={{ bgcolor: '#1A1A1A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2, boxShadow: 'none' }}
        >
          <Table size="small">
            <TableHead>
              <TableRow>
                {['Nama', 'Email', 'Telepon', 'Klub', 'Source', 'Tanggal', ''].map((h) => (
                  <TableCell
                    key={h}
                    align={h === '' ? 'right' : 'left'}
                    sx={{ color: 'rgba(255,255,255,0.4)', borderColor: 'rgba(255,255,255,0.06)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: 1.5, py: 1.5 }}
                  >
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id} sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.02)' } }}>
                  <TableCell sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.06)', py: 1.5 }}>
                    <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                      {row.first_name} {row.last_name}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ color: 'rgba(255,255,255,0.65)', borderColor: 'rgba(255,255,255,0.06)', fontSize: '0.825rem' }}>
                    {row.email}
                  </TableCell>
                  <TableCell sx={{ color: 'rgba(255,255,255,0.55)', borderColor: 'rgba(255,255,255,0.06)', fontSize: '0.825rem', fontFamily: 'monospace' }}>
                    {row.phone || '—'}
                  </TableCell>
                  <TableCell sx={{ color: 'rgba(255,255,255,0.55)', borderColor: 'rgba(255,255,255,0.06)', fontSize: '0.825rem' }}>
                    {row.clubs?.name || '—'}
                  </TableCell>
                  <TableCell sx={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                    <Chip
                      label={row.source}
                      size="small"
                      sx={{
                        borderRadius: 0,
                        bgcolor: `${SOURCE_COLORS[row.source] ?? '#555'}22`,
                        color: SOURCE_COLORS[row.source] ?? 'rgba(255,255,255,0.5)',
                        border: `1px solid ${SOURCE_COLORS[row.source] ?? '#555'}44`,
                        fontFamily: 'monospace',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        letterSpacing: 1,
                        textTransform: 'uppercase',
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ color: 'rgba(255,255,255,0.4)', borderColor: 'rgba(255,255,255,0.06)', fontSize: '0.78rem', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                    {formatDate(row.created_at)}
                  </TableCell>
                  <TableCell align="right" sx={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                    <IconButton size="small" onClick={() => handleDelete(row.id)} sx={{ color: 'rgba(255,255,255,0.25)', '&:hover': { color: '#DF2026' } }}>
                      <Iconify icon="eva:trash-2-fill" width={16} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

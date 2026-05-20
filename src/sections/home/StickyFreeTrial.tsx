import { useState, useEffect } from 'react';
import { m } from 'framer-motion';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
// components
import Iconify from 'src/components/iconify';
// utils
import { supabase } from 'src/utils/supabase';

// ----------------------------------------------------------------------

type Club = { id: string; name: string };

const fieldSx = (theme: any) => ({
  '& .MuiOutlinedInput-root': {
    color: '#fff',
    fontSize: '0.875rem',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.12)' },
    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
    '&.Mui-focused fieldset': { borderColor: '#DF2026' },
  },
  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#DF2026' },
  '& .MuiSelect-icon': { color: 'rgba(255,255,255,0.4)' },
});

// ----------------------------------------------------------------------

export default function StickyFreeTrial() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', phone: '', club_id: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    supabase.from('clubs').select('id, name').order('id').then(({ data }) => {
      if (data) setClubs(data as Club[]);
    });
  }, []);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setError('');
  };

  const handleSubmit = async () => {
    if (!form.first_name.trim() || !form.email.trim()) {
      setError('First name and email are required.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const { error: fnError } = await supabase.functions.invoke('send-registration-email', {
        body: {
          first_name: form.first_name.trim(),
          last_name: form.last_name.trim() || null,
          email: form.email.trim(),
          phone: form.phone.trim() || null,
          club_id: form.club_id || null,
          source: 'free_trial',
        },
      });
      if (fnError) throw fnError;

      setSuccess(true);
      setForm({ first_name: '', last_name: '', email: '', phone: '', club_id: '' });
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      component={m.div}
      initial={false}
      animate={open ? 'open' : 'closed'}
      variants={{
        open: { x: 0 },
        closed: { x: 380 },
      }}
      transition={{ type: 'spring', stiffness: 260, damping: 30 }}
      sx={{
        position: 'fixed',
        top: '20%',
        right: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'flex-start',
      }}
    >
      {/* TRIGGER TAB */}
      <Box
        onClick={() => setOpen((prev) => !prev)}
        sx={{
          cursor: 'pointer',
          bgcolor: '#DF2026',
          color: 'common.white',
          p: 2,
          borderTopLeftRadius: 8,
          borderBottomLeftRadius: 8,
          boxShadow: theme.customShadows.z24,
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          transform: 'rotate(180deg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 120,
          fontWeight: 800,
          letterSpacing: 2,
          fontSize: 13,
          fontFamily: 'monospace',
          textTransform: 'uppercase',
          '&:hover': { bgcolor: '#A8171C' },
        }}
      >
        {open ? 'CLOSE' : 'TRY US FOR FREE'}
      </Box>

      {/* FORM PANEL */}
      <Box
        sx={{
          width: 380,
          bgcolor: '#111',
          p: 3,
          minHeight: 450,
          boxShadow: `-24px 24px 72px -8px ${alpha(theme.palette.common.black, 0.48)}`,
          borderLeft: `3px solid #DF2026`,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
          <Box>
            <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '1rem', fontFamily: "'Poppins', sans-serif", textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Free Trial
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.72rem', fontFamily: 'monospace', letterSpacing: 1 }}>
              Register your first session free
            </Typography>
          </Box>
          <IconButton onClick={() => setOpen(false)} size="small" sx={{ color: 'rgba(255,255,255,0.35)', '&:hover': { color: '#fff' } }}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        {success ? (
          <Stack alignItems="center" justifyContent="center" spacing={2.5} sx={{ flex: 1, py: 4 }}>
            <Box sx={{ width: 56, height: 56, bgcolor: 'rgba(223,32,38,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Iconify icon="solar:check-circle-bold-duotone" width={32} sx={{ color: '#DF2026' }} />
            </Box>
            <Typography sx={{ color: '#fff', fontWeight: 700, textAlign: 'center', fontFamily: "'Poppins', sans-serif" }}>
              You&apos;re Registered!
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', textAlign: 'center', lineHeight: 1.7 }}>
              We&apos;ll be in touch shortly. Check your email for confirmation.
            </Typography>
            <Button
              size="small"
              onClick={() => setSuccess(false)}
              sx={{ color: '#DF2026', fontSize: '0.75rem', fontFamily: 'monospace', letterSpacing: 1, textTransform: 'uppercase' }}
            >
              Register again
            </Button>
          </Stack>
        ) : (
          <Stack spacing={2} sx={{ flex: 1 }}>
            <TextField
              fullWidth
              size="small"
              label="First Name *"
              value={form.first_name}
              onChange={handleChange('first_name')}
              sx={fieldSx(theme)}
            />
            <TextField
              fullWidth
              size="small"
              label="Last Name"
              value={form.last_name}
              onChange={handleChange('last_name')}
              sx={fieldSx(theme)}
            />
            <TextField
              fullWidth
              size="small"
              label="Email *"
              type="email"
              value={form.email}
              onChange={handleChange('email')}
              sx={fieldSx(theme)}
            />
            <TextField
              fullWidth
              size="small"
              label="Phone Number"
              value={form.phone}
              onChange={handleChange('phone')}
              sx={fieldSx(theme)}
            />
            <TextField
              select
              fullWidth
              size="small"
              label="Preferred Club"
              value={form.club_id}
              onChange={handleChange('club_id')}
              sx={fieldSx(theme)}
              SelectProps={{ MenuProps: { sx: { zIndex: 10001 }, PaperProps: { sx: { bgcolor: '#1a1a1a', color: '#fff', '& .MuiMenuItem-root:hover': { bgcolor: 'rgba(223,32,38,0.08)' } } } } }}
            >
              <MenuItem value="">Select Club (optional)</MenuItem>
              {clubs.map((c) => (
                <MenuItem key={c.id} value={String(c.id)}>{c.name}</MenuItem>
              ))}
            </TextField>

            {error && (
              <Typography sx={{ color: '#DF2026', fontSize: '0.78rem', fontFamily: 'monospace' }}>
                {error}
              </Typography>
            )}

            <Button
              variant="contained"
              size="large"
              onClick={handleSubmit}
              disabled={submitting}
              endIcon={!submitting && <Iconify icon="solar:arrow-right-up-bold" />}
              sx={{
                mt: 1,
                bgcolor: '#DF2026',
                color: '#fff',
                borderRadius: 0,
                fontWeight: 800,
                fontSize: '0.72rem',
                letterSpacing: 2,
                textTransform: 'uppercase',
                fontFamily: 'monospace',
                boxShadow: 'none',
                py: 1.5,
                '&:hover': { bgcolor: '#A8171C', boxShadow: 'none' },
                '&.Mui-disabled': { bgcolor: 'rgba(223,32,38,0.4)', color: 'rgba(255,255,255,0.5)' },
              }}
            >
              {submitting ? <CircularProgress size={20} color="inherit" /> : 'Register Now'}
            </Button>

            <Typography sx={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.7rem', textAlign: 'center', lineHeight: 1.6 }}>
              Your data is safe and will never be shared with third parties.
            </Typography>
          </Stack>
        )}
      </Box>
    </Box>
  );
}

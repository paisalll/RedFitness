import { useState, useEffect } from 'react';
import { m } from 'framer-motion';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// components
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';
// utils
import { supabase } from 'src/utils/supabase';

// ----------------------------------------------------------------------

const RED = '#DF2026';
const RED_DARK = '#A8171C';
const BLACK = '#060606';

// ----------------------------------------------------------------------

const BENEFITS = [
  {
    icon: 'solar:dumbbell-large-bold-duotone',
    node: (
      <>
        World-class equipment, high-performance classes, and{' '}
        <Box component="span" sx={{ fontWeight: 800, color: 'common.white', fontFamily: "'Poppins', sans-serif" }}>
          Premium Reformer Pilates
        </Box>{' '}
        built for those who expect more.
      </>
    ),
  },
  {
    icon: 'solar:heart-pulse-bold-duotone',
    node: "Precision-led fitness assessment to unlock your body's full potential.",
  },
  {
    icon: 'solar:diploma-bold-duotone',
    node: "Elite, certified trainers who don't just guide you — evolve with them.",
  },
  {
    icon: 'solar:users-group-rounded-bold-duotone',
    node: 'A driven community that pushes you further, every single day.',
  },
  {
    icon: 'solar:hand-stars-bold-duotone',
    node: (
      <>
        <Box component="span" sx={{ fontWeight: 800, color: 'common.white', fontFamily: "'Poppins', sans-serif" }}>
          The first chain gym to include complimentary Japanese Seitai Therapy by Red Seitai seamlessly included in your membership. 
        </Box>{' '}
      </>
    ),
  },
  {
    icon: 'solar:map-bold-duotone',
    node: 'One membership. Multiple clubs. Unlimited access to your next level.',
  },
];

// ----------------------------------------------------------------------

const inputSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 0, // Input form dibuat tajam ujungnya
    color: 'common.white',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.12)' },
    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.25)' },
    '&.Mui-focused fieldset': { borderColor: RED },
  },
  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.4)' },
  '& .MuiInputLabel-root.Mui-focused': { color: RED },
  '& .MuiSelect-icon': { color: 'rgba(255,255,255,0.4)' },
};

// ----------------------------------------------------------------------

type Club = { id: string; name: string };

export default function HomeFreeTrial() {
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');
  const [clubs, setClubs] = useState<Club[]>([]);
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', phone: '', club_id: '', agreed: true });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    supabase.from('clubs').select('id, name').order('id').then(({ data }) => {
      if (data) setClubs(data as Club[]);
    });
  }, []);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = field === 'agreed' ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
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
      setForm({ first_name: '', last_name: '', email: '', phone: '', club_id: '', agreed: true });
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const renderForm = (
    <Box
      sx={{
        p: { xs: 3, md: 4.5 },
        borderRadius: 0, // Kotak form dibuat tajam
        backdropFilter: 'blur(20px)',
        bgcolor: alpha(BLACK, 0.88),
        border: `1px solid ${alpha(RED, 0.25)}`,
        boxShadow: `-20px 20px 60px -8px ${alpha(BLACK, 0.6)}`,
      }}
    >
      <Stack spacing={3}>
        <Box>
          {/* Overline Form */}
          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
            <Box sx={{ width: 28, height: 2, bgcolor: RED, flexShrink: 0 }} />
            <Typography
              sx={{
                fontSize: '0.65rem',
                fontWeight: 800,
                letterSpacing: 4,
                textTransform: 'uppercase',
                color: RED,
                fontFamily: 'monospace',
              }}
            >
              Limited Offer
            </Typography>
          </Stack>

          <Typography 
            variant="h4" 
            sx={{ 
              color: 'common.white', 
              mb: 1.5, 
              lineHeight: 1.1, 
              fontWeight: 800, 
              fontFamily: "'Poppins', sans-serif",
              textTransform: 'uppercase',
              letterSpacing: -1,
            }}
          >
            Claim Your 1-Week{' '}
            <Box component="span" sx={{ color: RED, display: 'block', fontStyle: 'italic' }}>
              Free Membership
            </Box>
          </Typography>
          <Typography variant="body2" sx={{ color: alpha('#fff', 0.5), lineHeight: 1.7 }}>
            Experience full access to our facilities, classes, and premium services — on us.
          </Typography>
        </Box>

        <Divider sx={{ borderColor: alpha(RED, 0.15) }} />

        {success ? (
          <Stack alignItems="center" spacing={2.5} sx={{ py: 3 }}>
            <Box sx={{ width: 56, height: 56, bgcolor: 'rgba(223,32,38,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Iconify icon="solar:check-circle-bold-duotone" width={32} sx={{ color: RED }} />
            </Box>
            <Typography sx={{ color: '#fff', fontWeight: 700, textAlign: 'center', fontFamily: "'Poppins', sans-serif", fontSize: '1.1rem' }}>
              You&apos;re Registered!
            </Typography>
            <Typography sx={{ color: alpha('#fff', 0.5), fontSize: '0.875rem', textAlign: 'center', lineHeight: 1.7 }}>
              We&apos;ll be in touch shortly. Check your email for confirmation.
            </Typography>
            <Button size="small" onClick={() => setSuccess(false)} sx={{ color: RED, fontFamily: 'monospace', letterSpacing: 1, textTransform: 'uppercase', fontSize: '0.75rem' }}>
              Register again
            </Button>
          </Stack>
        ) : (
          <>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
              <TextField fullWidth label="First Name *" size="small" value={form.first_name} onChange={handleChange('first_name')} sx={inputSx} />
              <TextField fullWidth label="Last Name" size="small" value={form.last_name} onChange={handleChange('last_name')} sx={inputSx} />
            </Stack>

            <TextField fullWidth label="Email Address *" type="email" size="small" value={form.email} onChange={handleChange('email')} sx={inputSx} />
            <TextField fullWidth label="Phone Number" size="small" value={form.phone} onChange={handleChange('phone')} sx={inputSx} />

            <TextField select fullWidth label="Preferred Club" size="small" value={form.club_id} onChange={handleChange('club_id')} sx={inputSx}>
              <MenuItem value="">Select Club (optional)</MenuItem>
              {clubs.map((c) => (
                <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
              ))}
            </TextField>

            {error && (
              <Typography sx={{ color: RED, fontSize: '0.78rem', fontFamily: 'monospace' }}>{error}</Typography>
            )}

            <FormControlLabel
              control={
                <Checkbox
                  checked={form.agreed}
                  onChange={handleChange('agreed')}
                  size="small"
                  sx={{ color: alpha('#fff', 0.3), '&.Mui-checked': { color: RED } }}
                />
              }
              label={
                <Typography variant="caption" sx={{ color: alpha('#fff', 0.45) }}>
                  I agree to the{' '}
                  <Box component="span" sx={{ color: RED, textDecoration: 'underline', cursor: 'pointer' }}>Terms</Box>{' '}
                  and Data Privacy policy.
                </Typography>
              }
            />

            <Button
              size="large"
              variant="contained"
              onClick={handleSubmit}
              disabled={submitting || !form.agreed}
              endIcon={!submitting && <Iconify icon="solar:arrow-right-up-bold" width={18} />}
              sx={{
                py: 1.75,
                px: 5,
                fontSize: '0.72rem',
                fontWeight: 800,
                letterSpacing: 2.5,
                textTransform: 'uppercase',
                fontFamily: 'monospace',
                borderRadius: 0,
                bgcolor: RED,
                color: '#fff',
                boxShadow: 'none',
                '&:hover': { bgcolor: RED_DARK, boxShadow: 'none' },
                '&.Mui-disabled': { bgcolor: alpha(RED, 0.4), color: 'rgba(255,255,255,0.5)' },
              }}
            >
              {submitting ? <CircularProgress size={20} color="inherit" /> : 'Claim My Free Week'}
            </Button>
          </>
        )}
      </Stack>
    </Box>
  );

  const renderContent = (
    <Stack spacing={4} sx={{ maxWidth: 500, mx: { xs: 'auto', md: 'unset' } }}>
      <m.div variants={varFade().inRight}>
        {/* Overline Content */}
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
            <Box sx={{ width: 28, height: 2, bgcolor: RED, flexShrink: 0 }} />
            <Typography
              sx={{
                fontSize: '0.65rem',
                fontWeight: 800,
                letterSpacing: 4,
                textTransform: 'uppercase',
                color: RED,
                fontFamily: 'monospace',
              }}
            >
              Why Choose Us
            </Typography>
        </Stack>

        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            textTransform: 'uppercase',
            lineHeight: 0.95,
            letterSpacing: -2,
            mb: 3,
            color: 'common.white',
            fontFamily: "'Poppins', sans-serif",
            fontSize: { xs: '2.5rem', md: '4.5rem' },
          }}
        >
          Check Us <br/>
          <Box component="span" sx={{ color: RED, fontStyle: 'italic' }}>
            Out.
          </Box>
        </Typography>
        <Typography sx={{ color: alpha('#fff', 0.55), lineHeight: 1.85, fontSize: '0.88rem' }}>
          This isn&apos;t just fitness. This is a standard — a place where discipline meets lifestyle,
          and results become identity. Train with intent. Move with purpose. Become your strongest self.
        </Typography>
      </m.div>

      <Stack spacing={0}>
        {BENEFITS.map((item, index) => (
          <m.div key={index} variants={varFade({ distance: 20 }).inRight}>
            <Stack 
              direction="row" 
              spacing={2.5} 
              alignItems="flex-start" 
              sx={{ 
                py: 2.5, 
                borderBottom: `1px solid ${alpha('#fff', 0.06)}`,
                transition: 'background 0.3s',
                '&:hover': { bgcolor: alpha(RED, 0.025) },
              }}
            >
              <Box
                sx={{
                  mt: 0.2,
                  minWidth: 42,
                  height: 42,
                  borderRadius: 0, // Icon box tajam
                  bgcolor: 'transparent',
                  border: `1px solid ${alpha(RED, 0.2)}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'background 0.2s',
                  '&:hover': { bgcolor: alpha(RED, 0.1) },
                }}
              >
                <Iconify icon={item.icon} width={22} sx={{ color: RED }} />
              </Box>
              <Typography
                variant="body2"
                sx={{ color: alpha('#fff', 0.72), fontWeight: 500, lineHeight: 1.75, pt: 0.7, fontSize: '0.82rem' }}
              >
                {item.node}
              </Typography>
            </Stack>
          </m.div>
        ))}
      </Stack>
    </Stack>
  );

  return (
    <Box
      sx={{
        py: { xs: 10, md: 15 },
        position: 'relative',
        overflow: 'hidden',
        background: `linear-gradient(145deg, ${RED_DARK} 0%, ${BLACK} 55%, #0a0a0a 100%)`, // Gradien menggunakan merah gelap ke hitam
      }}
    >
      {/* Decorative glow — top left */}
      <Box
        sx={{
          position: 'absolute',
          top: -120,
          left: -120,
          width: 560,
          height: 560,
          borderRadius: '50%',
          background: alpha(RED, 0.12),
          filter: 'blur(110px)',
          pointerEvents: 'none',
        }}
      />
      {/* Decorative glow — bottom right */}
      <Box
        sx={{
          position: 'absolute',
          bottom: -80,
          right: -80,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: alpha(RED, 0.06),
          filter: 'blur(90px)',
          pointerEvents: 'none',
        }}
      />

      <Container component={MotionViewport}>
        <Grid container spacing={{ xs: 8, md: 10 }} alignItems="center">
          <Grid xs={12} md={5}>
            <m.div variants={varFade().inLeft}>
              {renderForm}
            </m.div>
          </Grid>

          <Grid xs={12} md={7}>
            {renderContent}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
import { m } from 'framer-motion';
// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
// components
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

const RED = '#DF2026';
const BLACK = '#060606';

const PILLARS = [
  { icon: 'solar:body-bold-duotone', label: 'Body Realignment' },
  { icon: 'solar:heart-pulse-bold-duotone', label: 'Circulation Boost' },
  { icon: 'solar:meditation-round-bold-duotone', label: 'Stress Relief' },
  { icon: 'solar:shield-bold-duotone', label: 'Holistic Recovery' },
];

// ----------------------------------------------------------------------

export default function RedSeitaiAbout() {
  return (
    <Box
      sx={{
        bgcolor: BLACK,
        py: { xs: 10, md: 15 },
        borderTop: `1px solid ${alpha(RED, 0.15)}`,
      }}
    >
      <Container component={MotionViewport}>
        <Grid container spacing={{ xs: 6, md: 10 }} alignItems="center">

          {/* LEFT — TEXT */}
          <Grid xs={12} md={6}>
            <m.div variants={varFade().inLeft}>
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
                <Box sx={{ width: 28, height: 2, bgcolor: RED }} />
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
                  About Seitai
                </Typography>
              </Stack>

              <Typography
                variant="h2"
                sx={{
                  color: '#fff',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  fontFamily: "'Poppins', sans-serif",
                  letterSpacing: -2,
                  lineHeight: 0.9,
                  mb: 4,
                }}
              >
                What Is{' '}
                <Box component="span" sx={{ color: RED, fontStyle: 'italic', display: 'block' }}>
                  Red Seitai?
                </Box>
              </Typography>

              <Stack spacing={3}>
                <Typography sx={{ color: alpha('#fff', 0.6), fontSize: '0.9rem', lineHeight: 1.9 }}>
                  <strong style={{ color: '#fff' }}>Seitai</strong> is a Japanese-origin bodywork discipline focused on restoring the body's natural balance. The word means <em>"correct body"</em> — and that's exactly what this therapy aims to achieve.
                </Typography>

                <Typography sx={{ color: alpha('#fff', 0.6), fontSize: '0.9rem', lineHeight: 1.9 }}>
                  Red Seitai Therapy combines traditional manual techniques with modern physiological understanding to release tension, realign the skeletal structure, and support the body's self-healing capacity.
                </Typography>

                <Typography sx={{ color: alpha('#fff', 0.6), fontSize: '0.9rem', lineHeight: 1.9 }}>
                  Unlike conventional massage, Seitai works on the <strong style={{ color: '#fff' }}>root cause</strong> of discomfort — not just the symptoms — leaving you feeling lighter, more mobile, and deeply restored.
                </Typography>
              </Stack>
            </m.div>
          </Grid>

          {/* RIGHT — PILLARS */}
          <Grid xs={12} md={6}>
            <m.div variants={varFade().inRight}>
              <Grid container spacing={2}>
                {PILLARS.map((p) => (
                  <Grid xs={6} key={p.label}>
                    <Box
                      sx={{
                        p: 3.5,
                        border: `1px solid ${alpha('#fff', 0.07)}`,
                        borderTop: `2px solid ${RED}`,
                        bgcolor: alpha('#fff', 0.02),
                        textAlign: 'center',
                        transition: 'background 0.3s',
                        '&:hover': { bgcolor: alpha(RED, 0.04) },
                      }}
                    >
                      <Box
                        sx={{
                          width: 52,
                          height: 52,
                          borderRadius: 1,
                          bgcolor: alpha(RED, 0.1),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 2,
                        }}
                      >
                        <Iconify icon={p.icon} width={28} sx={{ color: RED }} />
                      </Box>
                      <Typography
                        sx={{
                          color: '#fff',
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          textTransform: 'uppercase',
                          fontFamily: "'Poppins', sans-serif",
                          letterSpacing: 0.5,
                        }}
                      >
                        {p.label}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              {/* Stats strip */}
              <Box
                sx={{
                  mt: 2,
                  p: 3,
                  border: `1px solid ${alpha('#fff', 0.07)}`,
                  bgcolor: alpha(RED, 0.04),
                  borderLeft: `3px solid ${RED}`,
                }}
              >
                <Typography sx={{ color: alpha('#fff', 0.5), fontSize: '0.8rem', lineHeight: 1.8 }}>
                  <Box component="span" sx={{ color: '#fff', fontWeight: 800, fontSize: '1.1rem' }}>
                    Trusted by athletes, office workers, and wellness seekers
                  </Box>{' '}
                  — Red Seitai is for anyone who wants to move and feel better every day.
                </Typography>
              </Box>
            </m.div>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}

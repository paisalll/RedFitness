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
// hooks
import { useSectionContent } from 'src/hooks/use-page-content';

// ----------------------------------------------------------------------

const RED = '#DF2026';
const BLACK = '#060606';

const PILLAR_ICONS = [
  'solar:body-bold-duotone',
  'solar:heart-pulse-bold-duotone',
  'solar:meditation-round-bold-duotone',
  'solar:shield-bold-duotone',
];

// ----------------------------------------------------------------------

export default function RedSeitaiAbout() {
  const content = useSectionContent('red-seitai', 'about');
  const PILLARS = PILLAR_ICONS.map((icon, i) => ({ icon, label: content[`pillar${i + 1}`] || '' }));
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
                  {content.eyebrow}
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
                {content.title}{' '}
                <Box component="span" sx={{ color: RED, fontStyle: 'italic', display: 'block' }}>
                  {content.title_highlight}
                </Box>
              </Typography>

              <Stack spacing={3}>
                <Typography sx={{ color: alpha('#fff', 0.6), fontSize: '0.9rem', lineHeight: 1.9 }}>
                  {content.paragraph1}
                </Typography>

                <Typography sx={{ color: alpha('#fff', 0.6), fontSize: '0.9rem', lineHeight: 1.9 }}>
                  {content.paragraph2}
                </Typography>

                <Typography sx={{ color: alpha('#fff', 0.6), fontSize: '0.9rem', lineHeight: 1.9 }}>
                  {content.paragraph3}
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
                  {content.stats_text}
                </Typography>
              </Box>
            </m.div>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}

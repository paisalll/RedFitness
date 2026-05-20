import { m } from 'framer-motion';
// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// components
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';
// hooks
import { useSectionContent } from 'src/hooks/use-page-content';

// ----------------------------------------------------------------------

const RED = '#DF2026';
const RED_DARK = '#A8171C';
const BLACK = '#060606';

const TREATMENT_META = [
  { num: '01', icon: 'solar:hand-stars-bold-duotone', badge: 'Most Popular' },
  { num: '02', icon: 'solar:spine-bold-duotone', badge: null },
  { num: '03', icon: 'solar:running-round-bold-duotone', badge: 'For Athletes' },
  { num: '04', icon: 'solar:moon-bold-duotone', badge: null },
];

// ----------------------------------------------------------------------

export default function RedSeitaiTreatments() {
  const content = useSectionContent('red-seitai', 'treatments');
  const TREATMENTS = TREATMENT_META.map((m, i) => ({
    ...m,
    title: content[`t${i + 1}_title`] || '',
    duration: content[`t${i + 1}_duration`] || '',
    desc: content[`t${i + 1}_desc`] || '',
  }));
  return (
    <Box
      sx={{
        bgcolor: '#080808',
        py: { xs: 10, md: 15 },
        borderTop: `1px solid ${alpha(RED, 0.15)}`,
        borderBottom: `1px solid ${alpha(RED, 0.15)}`,
      }}
    >
      <Container component={MotionViewport}>
        {/* HEADER */}
        <Box sx={{ textAlign: 'center', mb: 10 }}>
          <m.div variants={varFade().inDown}>
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={1.5} sx={{ mb: 2 }}>
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
              <Box sx={{ width: 28, height: 2, bgcolor: RED }} />
            </Stack>

            <Typography
              variant="h2"
              sx={{
                color: '#fff',
                fontWeight: 800,
                textTransform: 'uppercase',
                mb: 3,
                fontFamily: "'Poppins', sans-serif",
                letterSpacing: -2,
                lineHeight: 0.9,
              }}
            >
              {content.title}{' '}
              <Box component="span" sx={{ color: RED, fontStyle: 'italic' }}>
                {content.title_highlight}
              </Box>
            </Typography>

            <Typography sx={{ color: alpha('#fff', 0.55), maxWidth: 480, mx: 'auto', fontSize: '0.9rem', lineHeight: 1.8 }}>
              {content.description}
            </Typography>
          </m.div>
        </Box>

        {/* TREATMENT CARDS */}
        <Grid container spacing={3}>
          {TREATMENTS.map((t) => (
            <Grid xs={12} sm={6} key={t.num}>
              <m.div variants={varFade().inUp} style={{ height: '100%' }}>
                <Box
                  sx={{
                    p: 4,
                    height: 1,
                    position: 'relative',
                    border: `1px solid ${alpha('#fff', 0.07)}`,
                    borderTop: `2px solid ${RED}`,
                    bgcolor: alpha('#fff', 0.02),
                    transition: 'border-color 0.3s, background 0.3s',
                    '&:hover': {
                      bgcolor: alpha(RED, 0.04),
                      borderColor: alpha(RED, 0.3),
                      borderTopColor: RED,
                    },
                  }}
                >
                  {/* Badge */}
                  {t.badge && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        px: 1.5,
                        py: 0.5,
                        bgcolor: RED,
                        color: '#fff',
                        fontSize: '0.6rem',
                        fontWeight: 800,
                        letterSpacing: 1.5,
                        textTransform: 'uppercase',
                        fontFamily: 'monospace',
                      }}
                    >
                      {t.badge}
                    </Box>
                  )}

                  {/* Icon + Number */}
                  <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        bgcolor: alpha(RED, 0.1),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 1,
                        flexShrink: 0,
                      }}
                    >
                      <Iconify icon={t.icon} width={26} sx={{ color: RED }} />
                    </Box>
                    <Typography
                      sx={{
                        fontFamily: 'monospace',
                        fontSize: '1.5rem',
                        fontWeight: 900,
                        color: alpha(RED, 0.2),
                        lineHeight: 1,
                      }}
                    >
                      {t.num}
                    </Typography>
                  </Stack>

                  <Typography
                    variant="h5"
                    sx={{
                      color: '#fff',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      fontFamily: "'Poppins', sans-serif",
                      letterSpacing: -0.5,
                      mb: 0.75,
                    }}
                  >
                    {t.title}
                  </Typography>

                  <Stack direction="row" alignItems="center" spacing={0.75} sx={{ mb: 2.5 }}>
                    <Iconify icon="solar:clock-circle-bold" width={13} sx={{ color: RED }} />
                    <Typography sx={{ color: RED, fontSize: '0.72rem', fontFamily: 'monospace', fontWeight: 700 }}>
                      {t.duration}
                    </Typography>
                  </Stack>

                  <Typography sx={{ color: alpha('#fff', 0.5), fontSize: '0.875rem', lineHeight: 1.8 }}>
                    {t.desc}
                  </Typography>
                </Box>
              </m.div>
            </Grid>
          ))}
        </Grid>

        {/* CTA */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ mt: 10 }}>
          <m.div variants={varFade().inUp}>
            <Button
              variant="contained"
              size="large"
              endIcon={<Iconify icon="solar:arrow-right-up-bold" />}
              href="/join/select-club"
              sx={{
                bgcolor: RED,
                color: '#fff',
                borderRadius: 0,
                px: 6,
                py: 1.75,
                fontSize: '0.72rem',
                fontWeight: 800,
                letterSpacing: 2,
                textTransform: 'uppercase',
                fontFamily: 'monospace',
                boxShadow: 'none',
                '&:hover': { bgcolor: RED_DARK, boxShadow: 'none' },
              }}
            >
              {content.cta_button1}
            </Button>
          </m.div>

          <m.div variants={varFade().inUp}>
            <Button
              variant="outlined"
              size="large"
              startIcon={<Iconify icon="solar:phone-bold" />}
              sx={{
                color: '#fff',
                borderColor: alpha('#fff', 0.2),
                borderRadius: 0,
                px: 6,
                py: 1.75,
                fontSize: '0.72rem',
                fontWeight: 800,
                letterSpacing: 2,
                textTransform: 'uppercase',
                fontFamily: 'monospace',
                '&:hover': { borderColor: RED, color: RED, bgcolor: alpha(RED, 0.06) },
              }}
            >
              {content.cta_button2}
            </Button>
          </m.div>
        </Stack>
      </Container>
    </Box>
  );
}

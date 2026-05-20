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

const BENEFIT_ICONS = [
  'solar:body-bold-duotone',
  'solar:stretching-bold-duotone',
  'solar:shield-bold-duotone',
  'solar:meditation-round-bold-duotone',
  'solar:running-round-bold-duotone',
  'solar:graph-up-bold-duotone',
];

// ----------------------------------------------------------------------

export default function PilatesPerformerBenefits() {
  const content = useSectionContent('pilates-performer', 'benefits');
  const BENEFITS = BENEFIT_ICONS.map((icon, i) => ({
    icon,
    title: content[`benefit${i + 1}_title`] || '',
    desc: content[`benefit${i + 1}_desc`] || '',
  }));
  return (
    <Box
      sx={{
        bgcolor: BLACK,
        py: { xs: 10, md: 15 },
        borderTop: `1px solid ${alpha(RED, 0.15)}`,
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
              <Box component="span" sx={{ color: RED, fontStyle: 'italic', display: 'block' }}>
                {content.title_highlight}
              </Box>
            </Typography>

            <Typography sx={{ color: alpha('#fff', 0.55), maxWidth: 480, mx: 'auto', fontSize: '0.9rem', lineHeight: 1.8 }}>
              {content.description}
            </Typography>
          </m.div>
        </Box>

        {/* BENEFITS GRID */}
        <Grid container spacing={3}>
          {BENEFITS.map((item, index) => (
            <Grid xs={12} sm={6} md={4} key={item.title}>
              <m.div variants={varFade().inUp} style={{ height: '100%' }}>
                <Box
                  sx={{
                    p: 4,
                    height: 1,
                    border: `1px solid ${alpha('#fff', 0.07)}`,
                    borderTop: `2px solid ${index % 3 === 0 ? RED : alpha(RED, 0.3)}`,
                    bgcolor: alpha('#fff', 0.02),
                    transition: 'border-color 0.3s, background 0.3s',
                    '&:hover': {
                      borderTopColor: RED,
                      bgcolor: alpha(RED, 0.04),
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 1,
                      bgcolor: alpha(RED, 0.1),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                    }}
                  >
                    <Iconify icon={item.icon} width={26} sx={{ color: RED }} />
                  </Box>

                  <Typography
                    variant="h6"
                    sx={{
                      color: '#fff',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      fontFamily: "'Poppins', sans-serif",
                      mb: 1.5,
                      fontSize: '0.95rem',
                      letterSpacing: 0.5,
                    }}
                  >
                    {item.title}
                  </Typography>

                  <Typography sx={{ color: alpha('#fff', 0.5), fontSize: '0.85rem', lineHeight: 1.8 }}>
                    {item.desc}
                  </Typography>
                </Box>
              </m.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

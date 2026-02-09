import { m } from 'framer-motion';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// components
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

const PROMOS = [
  {
    title: 'WORKOUT ANYTIME ANYWHERE',
    description: 'Workout at Celebrity Fitness with Fitpass start from Rp107K / Session. Enjoy all facilities.',
    icon: 'solar: smartphone-line-duotone',
    color: '#8E2DE2', // Purple gradient start
  },
  {
    title: 'EXCLUSIVE PERSONAL TRAINING',
    description: 'Get personalized results with our expert trainers tailored to your goals.',
    icon: 'solar:ranking-bold-duotone',
    color: '#4776E6', // Blue gradient
  },
  {
    title: 'BE OUR STARMAKER',
    description: 'Join our community and become the best version of yourself today.',
    icon: 'solar:star-bold-duotone',
    color: '#f953c6', // Pink gradient
  },
];

const FEATURES = [
  {
    title: 'A TOTALLY COOL CREW',
    description: 'Vibe with our StarSquad and StarMakers. They\'ve got your back!',
    icon: 'solar:users-group-two-rounded-bold-duotone',
  },
  {
    title: 'RED CARPET TREATMENT',
    description: 'A star like you deserves the best. Our clubs and classes know it!',
    icon: 'solar: crown-minimalistic-bold-duotone',
  },
  {
    title: 'TONS OF FUN CLASSES',
    description: 'Say bye bye to boring. So many classes to choose. So much fun to have!',
    icon: 'solar: music-notes-bold-duotone',
  },
];

// ----------------------------------------------------------------------

export default function HomeHugePackElements() {
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');

  const renderPromos = (
    <Grid container spacing={3} sx={{ mb: 10 }}>
      {PROMOS.map((promo, index) => (
        <Grid xs={12} md={4} key={promo.title}>
          <m.div variants={varFade({ distance: 40 }).inUp}>
            <Card
              sx={{
                p: 4,
                height: 280,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                position: 'relative',
                color: 'common.white',
                overflow: 'hidden',
                borderRadius: 2,
                background: `linear-gradient(135deg, ${promo.color} 0%, ${alpha(promo.color, 0.6)} 100%)`,
                transition: 'transform 0.3s',
                '&:hover': { transform: 'translateY(-8px)' },
              }}
            >
              <Iconify icon={promo.icon} width={48} sx={{ position: 'absolute', top: 24, right: 24, opacity: 0.5 }} />
              
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 800, lineHeight: 1.2 }}>
                {promo.title}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                {promo.description}
              </Typography>
              
              <Box sx={{ mt: 3, textAlign: 'right' }}>
                <Iconify icon="solar:arrow-right-up-bold" width={24} />
              </Box>
            </Card>
          </m.div>
        </Grid>
      ))}
    </Grid>
  );

  const renderFeatures = (
    <Grid container spacing={5} alignItems="center">
      <Grid xs={12} md={5}>
        <m.div variants={varFade().inLeft}>
          <Typography variant="h2" sx={{ fontWeight: 900, mb: 3, letterSpacing: -1 }}>
            ALL-STAR <br />
            <Box component="span" sx={{ color: 'primary.main' }}>ESSENTIALS</Box>
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 5, maxWidth: 360 }}>
            Why settle for boring workouts when you can party with us? Have fun while you work it!
          </Typography>
          <Button
            variant="contained"
            size="large"
            color="primary"
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 1,
              fontSize: 16,
              fontWeight: 'bold',
              boxShadow: (theme) => `0 8px 16px 0 ${alpha(theme.palette.primary.main, 0.3)}`,
            }}
          >
            JOIN US NOW
          </Button>
        </m.div>
      </Grid>

      <Grid xs={12} md={7}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
          {FEATURES.map((feature) => (
            <m.div key={feature.title} variants={varFade().inRight} style={{ flex: 1 }}>
              <Box
                sx={{
                  p: 3,
                  height: 1,
                  borderRadius: 2,
                  border: `1px solid ${alpha(theme.palette.grey[500], 0.12)}`,
                  bgcolor: alpha(theme.palette.grey[500], 0.04),
                  '&:hover': {
                    bgcolor: alpha(theme.palette.grey[500], 0.08),
                  }
                }}
              >
                <Iconify 
                  icon={feature.icon} 
                  width={40} 
                  sx={{ 
                    mb: 3, 
                    color: 'primary.main',
                    filter: `drop-shadow(0 0 8px ${alpha(theme.palette.primary.main, 0.4)})` 
                  }} 
                />
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {feature.description}
                </Typography>
              </Box>
            </m.div>
          ))}
        </Stack>
      </Grid>
    </Grid>
  );

  return (
    <Box sx={{ bgcolor: 'background.default', overflow: 'hidden' }}>
      <Container
        component={MotionViewport}
        sx={{
          py: { xs: 10, md: 15 },
        }}
      >
        {renderPromos}
        {renderFeatures}
      </Container>
    </Box>
  );
}
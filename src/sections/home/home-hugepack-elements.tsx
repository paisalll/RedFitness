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
    title: 'Train Anywhere. Anytime.',
    description: 'One membership, access to multiple locations making it easier to stay consistent wherever you go.',
    icon: 'solar:map-point-bold-duotone',
    color: '#8E2DE2',
  },
  {
    title: 'Personal Training That Delivers',
    description: 'Work with certified trainers and follow structured programs designed for real progress.',
    icon: 'solar:dumbbells-bold-duotone',
    color: '#4776E6',
  },
  {
    title: 'More Than a Gym',
    description: 'Join a community that motivates you to grow stronger—physically and mentally.',
    icon: 'solar:people-nearby-bold-duotone',
    color: '#f953c6',
  },
];

const FEATURES = [
  {
    title: 'Expert-Led Service',
    description: 'Our professional team is dedicated to delivering a seamless and personalized fitness experience—ensuring every visit feels supported, efficient, and results-driven.',
    icon: 'solar:shield-user-bold-duotone',
  },
  {
    title: 'Premium Reformer Pilates',
    description: 'Enhance strength, flexibility, and posture through guided Reformer Pilates sessions in a premium, focused environment.',
    icon: 'solar:meditation-round-bold-duotone',
  },
  {
    title: 'Complimentary Japanese Seitai Therapy',
    description: 'Experience the benefit of Japanese Seitai therapy included in your membership to support recovery, alignment, and overall well-being.',
    icon: 'solar:hand-heart-bold-duotone',
  },
];

// ----------------------------------------------------------------------

export default function HomeHugePackElements() {
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');

  const renderPromos = (
    <Grid container spacing={2.5} sx={{ mb: 10 }}>
      {PROMOS.map((promo, index) => (
        <Grid xs={12} md={4} key={promo.title}>
          <m.div variants={varFade({ distance: 40 }).inUp}>
            <Card
              sx={{
                p: 3.5,
                height: 260,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                position: 'relative',
                color: 'common.white',
                overflow: 'hidden',
                borderRadius: 3,
                background: `linear-gradient(145deg, ${promo.color} 0%, ${alpha(promo.color, 0.5)} 100%)`,
                transition: 'transform 0.35s ease, box-shadow 0.35s ease',
                boxShadow: `0 8px 32px ${alpha(promo.color, 0.25)}`,
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: `0 16px 40px ${alpha(promo.color, 0.35)}`,
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.25) 100%)',
                  zIndex: 0,
                },
              }}
            >
              <Box sx={{ position: 'absolute', top: 24, right: 24, zIndex: 1 }}>
                <Box
                  sx={{
                    width: 52, height: 52,
                    borderRadius: 2,
                    bgcolor: alpha('#fff', 0.15),
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backdropFilter: 'blur(6px)',
                  }}
                >
                  <Iconify icon={promo.icon} width={28} sx={{ color: 'white' }} />
                </Box>
              </Box>

              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 800, lineHeight: 1.25, fontSize: '1rem' }}>
                  {promo.title}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.78, lineHeight: 1.6, fontSize: '0.8rem' }}>
                  {promo.description}
                </Typography>
              </Box>
            </Card>
          </m.div>
        </Grid>
      ))}
    </Grid>
  );

  const renderFeatures = (
    <Grid container spacing={4} alignItems="center">
      <Grid xs={12} md={4}>
        <m.div variants={varFade().inLeft}>
          <Typography
            variant="overline"
            sx={{ color: 'primary.main', letterSpacing: 3, fontWeight: 700, mb: 1.5, display: 'block' }}
          >
            Why Red Fitness
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, letterSpacing: -0.5, lineHeight: 1.2, fontSize: { xs: '1.75rem', md: '2.25rem' } }}>
            Complete Fitness.{' '}
            <Box component="span" sx={{ color: 'primary.main' }}>
              Elevated Experience.
            </Box>
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 4, maxWidth: 340, fontSize: '0.9rem', lineHeight: 1.75 }}>
            More than just a gym—enjoy expert service, premium training, and exclusive recovery designed to support your full journey.
          </Typography>
          <Button
            variant="contained"
            size="medium"
            color="primary"
            endIcon={<Iconify icon="solar:arrow-right-bold" width={18} />}
            sx={{
              px: 3.5,
              py: 1.25,
              borderRadius: 1.5,
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: 0.5,
              boxShadow: (theme) => `0 6px 16px 0 ${alpha(theme.palette.primary.main, 0.3)}`,
              '&:hover': {
                boxShadow: (theme) => `0 8px 20px 0 ${alpha(theme.palette.primary.main, 0.45)}`,
              },
            }}
          >
            Join Us Now
          </Button>
        </m.div>
      </Grid>

      <Grid xs={12} md={7}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          {FEATURES.map((feature) => (
            <m.div key={feature.title} variants={varFade().inRight} style={{ flex: 1 }}>
              <Box
                sx={{
                  p: 2.5,
                  height: 1,
                  borderRadius: 2.5,
                  border: `1px solid ${alpha(theme.palette.grey[500], 0.1)}`,
                  bgcolor: alpha(theme.palette.grey[500], 0.03),
                  transition: 'border-color 0.25s, background 0.25s, transform 0.25s',
                  '&:hover': {
                    bgcolor: alpha(theme.palette.grey[500], 0.07),
                    borderColor: alpha(theme.palette.primary.main, 0.3),
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 44, height: 44,
                    borderRadius: 1.5,
                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    mb: 2,
                  }}
                >
                  <Iconify
                    icon={feature.icon}
                    width={24}
                    sx={{ color: 'primary.main' }}
                  />
                </Box>
                <Typography variant="subtitle2" sx={{ mb: 0.75, fontWeight: 700, fontSize: '0.85rem' }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.78rem', lineHeight: 1.65 }}>
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
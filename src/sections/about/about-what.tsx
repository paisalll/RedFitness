import { m } from 'framer-motion';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
// components
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

const STATS = [
  { value: '25', label: 'CLUBS' },
  { value: '7', label: 'CLASS TYPES' },
  { value: '85', label: 'CLASSES' },
  { value: '7,000', label: 'CLASSES PER MONTH' },
  { value: '45,000', label: 'MEMBERS' },
];

const STEPS = [
  {
    step: '01',
    title: 'GET STARTED',
    description: 'Fill in your details and select your preferred club.',
    icon: 'solar:cursor-bold-duotone',
  },
  {
    step: '02',
    title: 'SELECT CLUB ACCESS',
    description: 'Choose a Home Club or add Passport Access to all clubs. Opt for Fitness First or Dual Access.',
    icon: 'solar:shop-2-bold-duotone',
  },
  {
    step: '03',
    title: 'SELECT BRAND ACCESS',
    description: 'Confirm your personal details and make payment.',
    icon: 'solar:card-verified-bold-duotone',
  },
];

export default function HomeJoinSteps() {
  const theme = useTheme();

  const renderStats = (
    <Grid container spacing={3} justifyContent="center" sx={{ mb: { xs: 10, md: 15 } }}>
      {STATS.map((stat, index) => (
        <Grid key={stat.label} xs={6} md={2.4}>
          <m.div variants={varFade().inUp} transition={{ delay: index * 0.1 }}>
            <Box
              sx={{
                py: 5,
                textAlign: 'center',
                borderRadius: 2,
                bgcolor: alpha(theme.palette.grey[900], 0.4),
                border: `1px solid ${alpha(theme.palette.common.white, 0.05)}`,
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  mb: 1,
                  fontWeight: 900,
                  background: `linear-gradient(to right, #b92b27, #1565C0)`, // Gradient Merah-Biru/Ungu
                  backgroundClip: 'text',
                  textFillColor: 'transparent',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {stat.value}
              </Typography>
              <Typography variant="subtitle2" sx={{ color: 'common.white', opacity: 0.8 }}>
                {stat.label}
              </Typography>
            </Box>
          </m.div>
        </Grid>
      ))}
    </Grid>
  );

  const renderSteps = (
    <Box>
      <m.div variants={varFade().inDown}>
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
            mb: 8,
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: 1,
            color: 'common.white',
          }}
        >
          Join Online in <span style={{ color: theme.palette.common.white }}>3 Easy Steps</span>
        </Typography>
      </m.div>

      <Grid container spacing={4}>
        {STEPS.map((item, index) => (
          <Grid key={item.step} xs={12} md={4}>
            <m.div variants={varFade().inUp} transition={{ delay: index * 0.2 }}>
              <Card
                sx={{
                  p: 4,
                  height: 1,
                  bgcolor: alpha('#2e0f0f', 0.6), // Dark purple bg
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                  boxShadow: theme.customShadows.z24,
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    border: `1px solid ${theme.palette.primary.main}`,
                  },
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    mb: 2,
                    fontWeight: 900,
                    color: 'transparent',
                    WebkitTextStroke: `1px ${theme.palette.primary.main}`, // Outline effect untuk angka
                    opacity: 0.5,
                  }}
                >
                  {item.step}
                </Typography>

                <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: 'common.white' }}>
                  {item.title}
                </Typography>

                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <Iconify
                    icon={item.icon}
                    width={32}
                    sx={{ color: 'primary.main', mt: 0.5, flexShrink: 0 }}
                  />
                  <Typography variant="body2" sx={{ color: 'text.primary', lineHeight: 1.8 }}>
                    {item.description}
                  </Typography>
                </Stack>
              </Card>
            </m.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  return (
    <Box
      sx={{
        bgcolor: '#090101', // Very dark background
        py: { xs: 10, md: 15 },
        overflow: 'hidden',
      }}
    >
      <Container component={MotionViewport}>
        {renderStats}
        {renderSteps}
      </Container>
    </Box>
  );
}
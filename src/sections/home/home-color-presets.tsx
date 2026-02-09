import { m } from 'framer-motion';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
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

// ----------------------------------------------------------------------

const BENEFITS = [
  {
    icon: 'solar:dumbbell-large-bold-duotone',
    text: 'Premium equipment and dynamic group fitness classes.',
  },
  {
    icon: 'solar:heart-pulse-bold-duotone',
    text: 'Complimentary health and fitness assessment.',
  },
  {
    icon: 'solar:star-bold-duotone',
    text: 'Certified StarMakers to ignite your motivation.',
  },
  {
    icon: 'solar:users-group-rounded-bold-duotone',
    text: 'Vibrant, uplifting fitness community who have your back.',
  },
  {
    icon: 'solar:city-bold-duotone',
    text: 'Workout in 25 clubs nationwide and over 70 clubs across SE Asia.',
  },
];

export default function HomeFreeTrial() {
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');

  const renderForm = (
    <Box
      sx={{
        p: { xs: 3, md: 5 },
        borderRadius: 2,
        bgcolor: alpha(theme.palette.grey[900], 0.8), // Semi-transparent dark bg
        backdropFilter: 'blur(20px)', // Glassmorphism effect
        border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
        boxShadow: `-24px 24px 72px -8px ${alpha(theme.palette.common.black, 0.4)}`,
      }}
    >
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4" sx={{ color: 'common.white', mb: 1 }}>
            SIGN UP FOR A <br />
            <Box component="span" sx={{ color: 'primary.main' }}>FREE TRIAL</Box>
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.primary' }}>
            We'll get in touch within 48 hours.
          </Typography>
        </Box>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField fullWidth label="First Name" placeholder="Enter First Name" />
          <TextField fullWidth label="Last Name" placeholder="Enter Last Name" />
        </Stack>

        <TextField fullWidth label="Email Address" placeholder="example@mail.com" />
        <TextField fullWidth label="Phone Number" placeholder="+62 812..." />

        <TextField select fullWidth label="Preferred Club" defaultValue="">
          <MenuItem value="jakarta">Jakarta - Central Park</MenuItem>
          <MenuItem value="tangerang">Tangerang - AEON BSD</MenuItem>
          <MenuItem value="surabaya">Surabaya - Galaxy Mall</MenuItem>
        </TextField>

        <FormControlLabel
          control={<Checkbox defaultChecked sx={{ color: 'primary.main', '&.Mui-checked': { color: 'primary.main' } }} />}
          label={
            <Typography variant="caption" sx={{ color: 'text.primary' }}>
              I've read and agree to the <span style={{ textDecoration: 'underline' }}>Terms</span> and Data Privacy policy.
            </Typography>
          }
        />

        <Button
          size="large"
          variant="contained"
          color="primary"
          sx={{
            py: 1.5,
            fontSize: 16,
            fontWeight: 'bold',
            boxShadow: `0 8px 16px 0 ${alpha(theme.palette.primary.main, 0.24)}`,
          }}
        >
          SUBMIT
        </Button>
      </Stack>
    </Box>
  );

  const renderContent = (
    <Stack spacing={5} sx={{ maxWidth: 480, mx: { xs: 'auto', md: 'unset' } }}>
      <m.div variants={varFade().inRight}>
        <Typography variant="h2" sx={{ fontWeight: 900, textTransform: 'uppercase' }}>
          CHECK US OUT
        </Typography>
        <Typography sx={{ color: 'text.primary', mt: 2 }}>
          We're not about just fitness. Walk out looking, feeling like a star.
          Sign up. Try us. Tour our clubs, meet our StarMakers. Get on the A-list today!
        </Typography>
      </m.div>

      <Stack spacing={3}>
        {BENEFITS.map((item, index) => (
          <m.div key={index} variants={varFade({ distance: 20 }).inRight}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Iconify
                icon={item.icon}
                width={32}
                sx={{
                  color: 'primary.main',
                  filter: `drop-shadow(0 0 8px ${alpha(theme.palette.primary.main, 0.4)})`,
                }}
              />
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {item.text}
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
        background: `linear-gradient(135deg, #2e0c45 0%, #111 100%)`, // Background Ungu Gelap ala Celebrity Fitness
      }}
    >
      {/* Decorative Blur */}
      <Box
        sx={{
          position: 'absolute',
          top: -100,
          left: -100,
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: alpha(theme.palette.primary.main, 0.15),
          filter: 'blur(100px)',
        }}
      />

      <Container component={MotionViewport}>
        <Grid container spacing={{ xs: 5, md: 8 }} alignItems="center">
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
import { m } from 'framer-motion';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

const FEATURES = [
  {
    icon: 'solar:users-group-two-rounded-bold-duotone',
    text: 'Unlimited group fitness classes',
  },
  {
    icon: 'solar:dumbbell-large-bold-duotone',
    text: 'Unlimited HIIT classes',
  },
  {
    icon: 'solar:meditation-round-bold-duotone',
    text: 'Unlimited Mind and Body sessions',
  },
  {
    icon: 'solar:bicycle-bold-duotone',
    text: 'Unlimited Cycling experiences',
  },
];

export default function HomeRockstarWorkouts() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: { xs: 10, md: 15 },
        bgcolor: '#090101', // Dark background
        overflow: 'hidden',
        position: 'relative',
      }}
    >
       {/* Background Decoration (Optional) */}
       <Box
        sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: '50%',
            filter: 'blur(100px)',
            background: alpha(theme.palette.primary.main, 0.15),
            zIndex: 0,
        }}
       />

      <Container component={MotionViewport} sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={{ xs: 5, md: 8 }} alignItems="center">
          
          {/* BAGIAN KIRI: GAMBAR */}
          <Grid xs={12} md={5}>
            <m.div variants={varFade().inLeft}>
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: `-40px 40px 80px ${alpha(theme.palette.common.black, 0.48)}`,
                }}
              >
                <Image
                  alt="rockstar workout"
                  src="/assets/images/e097b50dfb5b0a4131cbabfd28082f7c.webp" // Ganti dengan gambar trampolin
                  ratio="3/4"
                  sx={{
                    transition: 'transform 0.5s ease',
                    '&:hover': { transform: 'scale(1.05)' },
                  }}
                />
                
                {/* Overlay Gradient halus di bawah gambar */}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: 1,
                        height: '40%',
                        background: `linear-gradient(to top, ${alpha('#140822', 0.8)} 0%, transparent 100%)`,
                    }}
                />
              </Box>
            </m.div>
          </Grid>

          {/* BAGIAN KANAN: KONTEN & FITUR */}
          <Grid xs={12} md={7}>
            <m.div variants={varFade().inRight}>
              <Typography variant="h2" sx={{ mb: 2, fontWeight: 900, textTransform: 'uppercase', color: 'common.white' }}>
                ROCKSTAR-WORTHY <br />
                <Box component="span" sx={{ color: 'common.white', opacity: 0.7 }}>WORKOUTS</Box>
              </Typography>
              
              <Typography sx={{ color: 'text.primary', mb: 5 }}>
                Our group classes totally rock! Killer workouts. Ultimate training... everything worthy of a rockstar.
              </Typography>

              {/* Box Feature List */}
              <Box
                sx={{
                    p: 4,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.common.white, 0.05),
                    border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
                    backdropFilter: 'blur(10px)',
                }}
              >
                  <Stack spacing={3}>
                    {FEATURES.map((feature, index) => (
                      <Stack key={index} direction="row" spacing={2} alignItems="center">
                        <Iconify 
                            icon={feature.icon} 
                            width={32} 
                            sx={{ color: 'primary.main' }} // Cyan/Teal
                        />
                        <Typography variant="body1" sx={{ color: 'common.white', fontWeight: 500 }}>
                            {feature.text}
                        </Typography>
                      </Stack>
                    ))}

                    <Box sx={{ pt: 2 }}>
                        <Button
                            variant="contained"
                            size="large"
                            color="primary" // Cyan/Teal
                            endIcon={<Iconify icon="solar:arrow-right-up-bold" />}
                            sx={{
                                borderRadius: 50,
                                px: 4,
                                py: 1.5,
                                fontSize: 16,
                                fontWeight: 'bold',
                                boxShadow: `0 8px 16px 0 ${alpha(theme.palette.primary.main, 0.24)}`
                            }}
                        >
                            DISCOVER MORE
                        </Button>
                    </Box>
                  </Stack>
              </Box>
            </m.div>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}
import { m } from 'framer-motion';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { MotionContainer, varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

const COLORS = {
  red: '#D40000',
  redDark: '#8a0000', 
  black: '#000000',
  white: '#FFFFFF',
};

export default function PersonalTrainingHero() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: { md: 560 },
        py: { xs: 10, md: 0 },
        overflow: 'hidden',
        position: 'relative',
        // KEMBALI KE PENGATURAN BACKGROUND IMAGE
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        // Ganti URL ini dengan gambar background abstrak (tanpa orang)
        backgroundImage:
          'url(/assets/background/overlay_1.svg), url(/assets/images/asian-athletic-man-with-rope-doing-exercise-in-fitness-gym-free-photo.webp)',
      }}
    >
      {/* Dekorasi Cahaya Merah di Latar Belakang */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '60%',
          height: '100%',
          background: `radial-gradient(circle at center, ${alpha(COLORS.red, 0.15)} 0%, transparent 70%)`,
          filter: 'blur(80px)',
          zIndex: 0,
        }}
      />

      <Container component={MotionContainer} sx={{ position: 'relative', zIndex: 1, height: 1, mt: 5 }}>
        <Grid container spacing={5} alignItems="center" sx={{ height: 1 }}>
          
          {/* BAGIAN KIRI: TEKS */}
          <Grid xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <m.div variants={varFade().inRight}>
              <Typography variant="overline" sx={{ color: COLORS.red, fontWeight: 'bold', letterSpacing: 2 }}>
                PERSONAL TRAINING
              </Typography>
            </m.div>

            <m.div variants={varFade().inRight}>
              <Typography
                variant="h1"
                sx={{
                  mt: 2,
                  mb: 3,
                  fontWeight: 900,
                  color: COLORS.white,
                  textTransform: 'uppercase',
                  lineHeight: 1.1,
                }}
              >
                TRAIN LIKE <br />
                <Box component="span" sx={{ color: COLORS.red }}>A STAR</Box>
              </Typography>
            </m.div>

            <m.div variants={varFade().inRight}>
              <Typography
                variant="h5"
                sx={{
                  color: COLORS.white,
                  fontWeight: 'normal',
                  opacity: 0.8,
                  maxWidth: 480,
                  mx: { xs: 'auto', md: 'unset' }
                }}
              >
                Get maximum results with our StarMakers.
              </Typography>
            </m.div>

            <m.div variants={varFade().inRight}>
              <Button
                variant="contained"
                size="large"
                endIcon={<Iconify icon="solar:arrow-right-up-bold" />}
                sx={{
                  mt: 5,
                  bgcolor: COLORS.red,
                  color: COLORS.white,
                  borderRadius: 50,
                  px: 4,
                  py: 1.5,
                  fontSize: 16,
                  fontWeight: 'bold',
                  boxShadow: `0 8px 24px 0 ${alpha(COLORS.red, 0.4)}`,
                  '&:hover': {
                    bgcolor: COLORS.redDark,
                  }
                }}
              >
                GET YOUR TRAINER NOW
              </Button>
            </m.div>
          </Grid>

          {/* BAGIAN KANAN: GAMBAR MODEL */}
          <Grid xs={12} md={6}>
            <m.div variants={varFade().inUp}>
              <Box
                sx={{
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  '&::before': {
                     content: '""',
                     position: 'absolute',
                     top: '50%',
                     left: '50%',
                     transform: 'translate(-50%, -50%)',
                     width: '100%',
                     height: '100%',
                     background: `radial-gradient(circle, ${alpha(COLORS.red, 0.2)} 0%, transparent 70%)`,
                     filter: 'blur(50px)',
                     zIndex: -1,
                  }
                }}
              >
                {/* <Image
                  visibleByDefault
                  disabledEffect
                  alt="Personal Training"
                  src="/assets/images/home/personal_training_model.png" 
                  sx={{
                    maxWidth: { xs: 320, md: 560 },
                    filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.6))',
                  }}
                /> */}
              </Box>
            </m.div>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}
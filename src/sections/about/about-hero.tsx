import { m, MotionProps } from 'framer-motion';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Box, { BoxProps } from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { MotionContainer, varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

export default function AboutHero() {
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
      <Container component={MotionContainer} sx={{ position: 'relative', zIndex: 1, height: 1, mt: 5 }}>
        <Grid container spacing={5} alignItems="center" sx={{ height: 1 }}>
          
          {/* BAGIAN KIRI: TEKS */}
          <Grid xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <m.div variants={varFade().inRight}>
              <Typography variant="overline" sx={{ color: 'common.white', opacity: 0.8, letterSpacing: 2 }}>
                MEMBERSHIP
              </Typography>
            </m.div>

            <Box sx={{ mt: 2, mb: 3 }}>
              <TextAnimate
                text="GET YOUR"
                variants={varFade().inRight}
                sx={{ color: 'common.white', display: 'block' }}
              />
              <Stack
                spacing={2}
                display="inline-flex"
                direction={{ xs: 'column', md: 'row' }}
                sx={{ color: 'common.white' }}
              >
                <TextAnimate text="STAR POWER" sx={{ color: 'common.white' }} />
                <TextAnimate text="ON" sx={{ color: 'common.white' }} />
              </Stack>
            </Box>

            <m.div variants={varFade().inRight}>
              <Typography
                variant="h5"
                sx={{
                  color: 'common.white',
                  fontWeight: 'normal',
                  opacity: 0.9,
                  maxWidth: 480,
                  mx: { xs: 'auto', md: 'unset' }
                }}
              >
                You're in charge. Get pumped with your choice of classes.
              </Typography>
            </m.div>

            <m.div variants={varFade().inRight}>
              <Button
                variant="contained"
                size="large"
                color="primary" // Sesuaikan warna (Cyan/Teal)
                endIcon={<Iconify icon="solar:arrow-right-up-bold" />}
                sx={{
                  mt: 5,
                  borderRadius: 50,
                  px: 4,
                  py: 1.5,
                  fontSize: 16,
                  fontWeight: 'bold',
                  boxShadow: `0 8px 16px 0 ${alpha(theme.palette.primary.main, 0.24)}`
                }}
              >
                LEARN MORE
              </Button>
            </m.div>
          </Grid>

          {/* BAGIAN KANAN: GAMBAR MODEL (PNG Transparan) */}
          <Grid xs={12} md={6}>
            <m.div variants={varFade().inUp}>
              <Box
                sx={{
                  position: 'relative',
                  mt: { xs: 5, md: 0 },
                }}
              >
                {/* Pastikan ini gambar orangnya saja (transparent background) */}
                {/* <Image
                  disabledEffect
                  visibleByDefault
                  alt="membership hero model"
                  src="/assets/images/about/hero_membership_model.png" 
                  sx={{
                    maxWidth: { xs: 300, md: 500 },
                    mx: 'auto',
                    filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.24))'
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

// ----------------------------------------------------------------------

type TextAnimateProps = BoxProps &
  MotionProps & {
    text: string;
  };

function TextAnimate({ text, variants, sx, ...other }: TextAnimateProps) {
  return (
    <Box
      component={m.div}
      sx={{
        typography: 'h2',
        fontWeight: 900,
        overflow: 'hidden',
        display: 'inline-flex',
        textTransform: 'uppercase',
        ...sx,
      }}
      {...other}
    >
      {text.split('').map((letter, index) => (
        <m.span key={index} variants={variants || varFade().inUp}>
          {letter}
        </m.span>
      ))}
    </Box>
  );
}
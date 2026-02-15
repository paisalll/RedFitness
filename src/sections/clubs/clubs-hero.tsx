import { m } from 'framer-motion';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
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

export default function ClubsHero() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: '100vh', md: 800 }, // Full screen di mobile, tinggi fix di desktop
        overflow: 'hidden',
      }}
    >
      {/* 1. BACKGROUND IMAGE */}
      {/* Ganti src dengan path gambar fasilitas gym kamu */}
      <Image
        alt="world class gym facilities"
        src="/assets/images/facilities/hero_facilities.jpg" 
        sx={{
          width: 1,
          height: 1,
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      />

      {/* 2. OVERLAY GRADIENT (THEMA RED FITNESS) */}
      {/* Ini penting untuk membuat teks terbaca dan mengubah suasana menjadi "Red Fitness" */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 1,
          height: 1,
          zIndex: 1,
          // Gradient: Hitam pekat di kiri bawah, perlahan transparan dengan tint merah di kanan atas
          background: `linear-gradient(to top right, 
            ${alpha(COLORS.black, 0.9)} 20%, 
            ${alpha(COLORS.black, 0.7)} 50%, 
            ${alpha(COLORS.red, 0.3)} 100%)`,
        }}
      />

      {/* 3. HERO CONTENT */}
      <Container
        component={MotionContainer}
        sx={{
          height: 1,
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center', // Konten di tengah secara vertikal
          alignItems: { xs: 'center', md: 'flex-start' }, // Kiri di desktop, tengah di mobile
          textAlign: { xs: 'center', md: 'left' },
          pt: { xs: 10, md: 0 }
        }}
      >
        <m.div variants={varFade().inRight}>
          <Typography
            variant="overline"
            sx={{
              color: COLORS.red,
              fontWeight: 800,
              letterSpacing: 2,
              mb: 2,
              display: 'block'
            }}
          >
            PREMIUM TRAINING GROUNDS
          </Typography>
        </m.div>

        <m.div variants={varFade().inRight}>
          <Typography
            variant="h1"
            sx={{
              color: COLORS.white,
              fontWeight: 900,
              textTransform: 'uppercase',
              lineHeight: 1,
              mb: 3,
              fontSize: { xs: '3.5rem', md: '6rem' }, // Font raksasa
            }}
          >
            WORLD-CLASS <br />
            <Box component="span" sx={{ color: COLORS.red, textShadow: `0 0 30px ${alpha(COLORS.red, 0.5)}` }}>
              FACILITIES
            </Box>
          </Typography>
        </m.div>

        <m.div variants={varFade().inRight}>
          <Typography
            variant="h5"
            sx={{
              color: COLORS.white,
              fontWeight: 'normal',
              maxWidth: 600,
              mb: 6,
              opacity: 0.9,
              lineHeight: 1.6
            }}
          >
            Train with the best. Our state-of-the-art equipment, spacious zones, and dedicated performance areas are designed to push your limits.
          </Typography>
        </m.div>

        <m.div variants={varFade().inRight}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button
              variant="contained"
              size="large"
              endIcon={<Iconify icon="solar:arrow-right-up-bold" />}
              sx={{
                bgcolor: COLORS.red,
                color: COLORS.white,
                borderRadius: 50,
                px: 5,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                boxShadow: `0 8px 24px ${alpha(COLORS.red, 0.4)}`,
                '&:hover': {
                  bgcolor: COLORS.redDark,
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              EXPLORE ZONES
            </Button>
            
            <Button
              variant="outlined"
              size="large"
              startIcon={<Iconify icon="solar:play-circle-bold" />}
              sx={{
                color: COLORS.white,
                borderColor: alpha(COLORS.white, 0.5),
                borderRadius: 50,
                px: 5,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                '&:hover': {
                  borderColor: COLORS.red,
                  bgcolor: alpha(COLORS.red, 0.1)
                },
              }}
            >
              VIRTUAL TOUR
            </Button>
          </Stack>
        </m.div>
      </Container>
    </Box>
  );
}
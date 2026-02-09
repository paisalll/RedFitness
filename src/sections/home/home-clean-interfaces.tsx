import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

const CLUBS = [
  {
    id: 1,
    name: 'ARTHA GADING - JAKARTA',
    address: 'Jl. Artha Gading Selatan No. 01, Jakarta Utara',
    image: '/assets/images/home/club_1.jpg', // Ganti dengan path gambar kamu
  },
  {
    id: 2,
    name: 'GANDARIA CITY - JAKARTA',
    address: 'Jl. Sultan Iskandar Muda, Kebayoran Lama, Jakarta Selatan',
    image: '/assets/images/home/club_2.jpg',
  },
  {
    id: 3,
    name: 'AEON MALL - BSD CITY',
    address: 'Jl. BSD Raya Utama, Pagedangan, Tangerang',
    image: '/assets/images/home/club_3.jpg',
  },
];

export default function HomeClubNearby() {
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % CLUBS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + CLUBS.length) % CLUBS.length);
  };

  const currentClub = CLUBS[currentIndex];

  const renderHeader = (
    <Stack spacing={2} sx={{ textAlign: 'center', mb: { xs: 5, md: 8 }, color: 'common.white' }}>
      <m.div variants={varFade().inDown}>
        <Typography variant="h2" sx={{ textTransform: 'uppercase', fontWeight: 900 }}>
          Find Your <br />
          <Box component="span" sx={{ color: 'primary.main' }}>Fitness Club Nearby</Box>
        </Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Typography sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
          Discover a fitness club conveniently near you, offering state-of-the-art facilities,
          expert trainers and a motivating environment.
        </Typography>
      </m.div>
    </Stack>
  );

  const renderSlider = (
    <Box sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden', boxShadow: theme.customShadows.z24 }}>
      <AnimatePresence mode="wait">
        <m.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Box sx={{ position: 'relative', pt: { xs: '75%', md: '50%' } }}>
            <Image
              alt={currentClub.name}
              src={currentClub.image}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: 1,
                height: 1,
                objectFit: 'cover',
              }}
            />
            {/* Dark Overlay for better contrast */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: 1,
                height: 1,
                background: `linear-gradient(to bottom, transparent 0%, ${alpha(theme.palette.grey[900], 0.8)} 100%)`,
              }}
            />
          </Box>
        </m.div>
      </AnimatePresence>

      {/* Floating Info Card */}
      <Box
        component={m.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        sx={{
          position: 'absolute',
          bottom: { xs: 80, md: 60 },
          left: { xs: 20, md: 60 },
          zIndex: 9,
          p: 4,
          maxWidth: 360,
          borderRadius: 2,
          color: 'common.white',
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.info.main} 100%)`,
          boxShadow: `-10px 10px 40px ${alpha(theme.palette.primary.main, 0.4)}`,
        }}
      >
        <Typography variant="h4" sx={{ mb: 1, fontWeight: 800, textTransform: 'uppercase' }}>
          {currentClub.name}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9, mb: 3 }}>
          {currentClub.address}
        </Typography>
        
        <Stack direction="row" alignItems="center" spacing={1} sx={{ cursor: 'pointer', '&:hover': { opacity: 0.8 } }}>
             <Iconify icon="solar:map-arrow-up-bold" width={24} />
             <Typography variant="subtitle2">VIEW DETAILS</Typography>
        </Stack>
      </Box>

      {/* Navigation Arrows */}
      <Stack
        direction="row"
        spacing={2}
        sx={{
          position: 'absolute',
          bottom: { xs: 20, md: 60 },
          right: { xs: 20, md: 60 },
          zIndex: 9,
        }}
      >
        <IconButton
          onClick={handlePrev}
          sx={{
            bgcolor: alpha(theme.palette.common.black, 0.4),
            color: 'common.white',
            border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
            '&:hover': { bgcolor: 'primary.main', borderColor: 'primary.main' },
          }}
        >
          <Iconify icon="eva:arrow-back-fill" />
        </IconButton>
        <IconButton
          onClick={handleNext}
          sx={{
            bgcolor: alpha(theme.palette.common.black, 0.4),
            color: 'common.white',
            border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
            '&:hover': { bgcolor: 'primary.main', borderColor: 'primary.main' },
          }}
        >
          <Iconify icon="eva:arrow-forward-fill" />
        </IconButton>
      </Stack>
    </Box>
  );

  return (
    <Box sx={{ bgcolor: '#190a2e', py: { xs: 10, md: 15 }, overflow: 'hidden' }}>
      <Container component={MotionViewport}>
        {renderHeader}

        <m.div variants={varFade().inUp}>
            {renderSlider}
        </m.div>

        <Stack alignItems="center" sx={{ mt: 8 }}>
          <m.div variants={varFade().inUp}>
            <Button
                variant="contained"
                size="large"
                color="primary"
                endIcon={<Iconify icon="solar:arrow-right-up-bold" />}
                sx={{
                    borderRadius: 50,
                    px: 5,
                    py: 1.5,
                    fontSize: 16,
                    fontWeight: 'bold',
                    boxShadow: `0 8px 16px 0 ${alpha(theme.palette.primary.main, 0.24)}`
                }}
            >
                VIEW ALL CLUBS
            </Button>
          </m.div>
        </Stack>
      </Container>
    </Box>
  );
}
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
import { COLORS } from '../about/about-team';

// ----------------------------------------------------------------------

const CLUBS = [
  {
    id: 1,
    name: 'Red Fitness Taman Palem',
    city: 'Jakarta Barat',
    address: 'Superindo Building, Jl. Permata Taman Palem, Pegadungan, Kec. Kalideres, Kota Jakarta Barat, DKI Jakarta 11830',
    image: '/assets/background/CLUB/26.png',
  },
  {
    id: 2,
    name: 'Red Fitness Kramat Jati',
    city: 'Jakarta Timur',
    address: 'Lippo Plaza Kramat Jati, Jl. Raya Jakarta-Bogor Km 19, RT.14/RW.6, Kramat Jati, Kec. Kramat Jati, Kota Jakarta Timur, DKI Jakarta 13510',
    image: '/assets/background/CLUB/27.png',
  },
  {
    id: 3,
    name: 'Red Fitness Cileungsi',
    city: 'Kabupaten Bogor',
    address: 'Metropolitan Mall Cileungsi, Jl. Kota Taman Metropolitan, Cileungsi Kidul, Kec. Cileungsi, Kabupaten Bogor, Jawa Barat 16820',
    image: '/assets/background/CLUB/28.png',
  },
  {
    id: 4,
    name: 'Red Fitness Bogor',
    city: 'Kota Bogor',
    address: 'Super Indo Pajajaran, Jl. Raya Pajajaran No.7a, RT.04/RW.11, Baranangsiang, Kec. Bogor Timur, Kota Bogor, Jawa Barat 16143',
    image: '/assets/background/CLUB/26.png',
  },
  {
    id: 5,
    name: 'Red Fitness Tambun',
    city: 'Kabupaten Bekasi',
    address: 'Metland Tambun, Jl. Sultan Hasanudin, Lantai 2 Blk. A, Tambun, Kec. Tambun Selatan, Kabupaten Bekasi, Jawa Barat 17510',
    image: '/assets/background/CLUB/27.png',
  },
  {
    id: 6,
    name: 'Red Fitness Graha Raya Bintaro',
    city: 'Tangerang Selatan',
    address: 'Transmart Graha Raya, Jl. Boulevard Graha Raya, Paku Jaya, Kec. Serpong Utara, Kota Tangerang Selatan, Banten 15324',
    image: '/assets/background/CLUB/28.png',
  },
  {
    id: 7,
    name: 'Red Fitness Green Pramuka',
    city: 'Jakarta Pusat',
    address: 'Green Pramuka Square Mall, Jl. Rw. Jaya No.49, Rawasari, Kec. Cempaka Putih, Kota Jakarta Pusat, DKI Jakarta 10570',
    image: '/assets/background/CLUB/26.png',
  },
  {
    id: 8,
    name: 'Red Fitness Citra 8',
    city: 'Jakarta Barat',
    address: 'Citra Garden 8, Area Aerobliss, Pegadungan, Kec. Kalideres, DKI Jakarta 11830',
    image: '/assets/background/CLUB/28.png',
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
          Find the Best <br />
          <Box component="span" sx={{ color: 'primary.main' }}>Fitness Club Near You</Box>
        </Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Typography sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
          Train with top-tier equipment, expert coaches, and an atmosphere that keeps you motivated.
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
          p: 3.5,
          maxWidth: 380,
          borderRadius: 2,
          color: 'common.white',
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.info.main} 100%)`,
          boxShadow: `-10px 10px 40px ${alpha(theme.palette.primary.main, 0.4)}`,
        }}
      >
        <Typography
          variant="overline"
          sx={{ opacity: 0.75, letterSpacing: 2, fontSize: '0.65rem', display: 'block', mb: 0.5 }}
        >
          {currentClub.city}
        </Typography>
        <Typography variant="h5" sx={{ mb: 1, fontWeight: 800, textTransform: 'uppercase', lineHeight: 1.2 }}>
          {currentClub.name}
        </Typography>
        <Typography variant="caption" sx={{ opacity: 0.8, mb: 2.5, display: 'block', lineHeight: 1.6 }}>
          {currentClub.address}
        </Typography>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={1} sx={{ cursor: 'pointer', '&:hover': { opacity: 0.8 } }}>
            <Iconify icon="solar:map-arrow-up-bold" width={20} />
            <Typography variant="subtitle2" sx={{ fontSize: '0.75rem', letterSpacing: 1 }}>VIEW DETAILS</Typography>
          </Stack>
          <Typography variant="caption" sx={{ opacity: 0.6 }}>
            {currentIndex + 1} / {CLUBS.length}
          </Typography>
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
    <Box sx={{ bgcolor: `${COLORS.black}`, py: { xs: 10, md: 15 }, overflow: 'hidden' }}>
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
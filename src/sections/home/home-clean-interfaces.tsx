import { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress'; // Tambahan untuk loading
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';
import { COLORS } from '../about/about-team';
// supabase
import { supabase } from 'src/utils/supabase';

// ----------------------------------------------------------------------

export default function HomeClubNearby() {
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');

  // --- STATE UNTUK SUPABASE ---
  const [clubs, setClubs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchClubs = async () => {
      setIsLoading(true);
      const { data, error } = await supabase.from('clubs').select('*');
      
      if (!error && data && data.length > 0) {
        setClubs(data);
      } else {
        console.error('Error fetching clubs or no data:', error);
      }
      setIsLoading(false);
    };
    fetchClubs();
  }, []);

  // --- SLIDER LOGIC ---
  const handleNext = () => {
    if (clubs.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % clubs.length);
  };

  const handlePrev = () => {
    if (clubs.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + clubs.length) % clubs.length);
  };

  // Aman mengambil club saat ini (mencegah undefined error saat awal render)
  const currentClub = clubs.length > 0 ? clubs[currentIndex] : null;

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
    <Box sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden', boxShadow: theme.customShadows.z24, minHeight: { xs: 300, md: 500 } }}>
      
      {/* TAMPILAN SAAT LOADING ATAU DATA KOSONG */}
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 1, position: 'absolute', width: 1, bgcolor: alpha(theme.palette.grey[900], 0.8) }}>
          <CircularProgress color="primary" />
        </Box>
      ) : !currentClub ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 1, position: 'absolute', width: 1, bgcolor: alpha(theme.palette.grey[900], 0.8) }}>
          <Typography sx={{ color: 'common.white' }}>No clubs available.</Typography>
        </Box>
      ) : (
        <>
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
                  src={currentClub.image_url} // Diubah menjadi image_url sesuai database
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
                {currentIndex + 1} / {clubs.length}
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
        </>
      )}
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
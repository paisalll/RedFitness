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
import CircularProgress from '@mui/material/CircularProgress';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';
// supabase
import { supabase } from 'src/utils/supabase';

// ----------------------------------------------------------------------

const RED = '#DF2026';
const RED_DARK = '#A8171C';
const BLACK = '#060606'; // Disamakan dengan konstanta BLACK sebelumnya

// ----------------------------------------------------------------------

export default function HomeClubNearby() {
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');

  const [clubs, setClubs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const handleNext = () => {
    if (clubs.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % clubs.length);
  };

  const handlePrev = () => {
    if (clubs.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + clubs.length) % clubs.length);
  };

  const currentClub = clubs.length > 0 ? clubs[currentIndex] : null;

  const renderHeader = (
    <Stack spacing={2} sx={{ textAlign: 'center', mb: { xs: 5, md: 8 }, color: 'common.white' }}>
      <m.div variants={varFade().inDown}>
        {/* Overline disamakan formatnya */}
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={1.5} sx={{ mb: 1.5 }}>
          <Box sx={{ width: 28, height: 2, bgcolor: RED, flexShrink: 0 }} />
          <Typography
            sx={{
              fontSize: '0.65rem',
              fontWeight: 800,
              letterSpacing: 4,
              textTransform: 'uppercase',
              color: RED,
              fontFamily: 'monospace',
            }}
          >
            Our Locations
          </Typography>
          <Box sx={{ width: 28, height: 2, bgcolor: RED, flexShrink: 0 }} />
        </Stack>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Typography
          variant="h2"
          sx={{ 
            textTransform: 'uppercase', 
            fontWeight: 800, 
            lineHeight: 0.95,
            letterSpacing: -2,
            fontFamily: "'Poppins', sans-serif",
            fontSize: { xs: '2.5rem', md: '4rem' }
          }}
        >
          Find the Best <br />
          <Box component="span" sx={{ color: RED, fontStyle: 'italic', display: 'block' }}>
            Fitness Club Near You.
          </Box>
        </Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Typography sx={{ color: alpha('#fff', 0.45), maxWidth: 560, mx: 'auto', fontSize: '0.88rem', lineHeight: 1.85, mt: 2 }}>
          Train with top-tier equipment, expert coaches, and an atmosphere that keeps you motivated.
        </Typography>
      </m.div>
    </Stack>
  );

  const renderSlider = (
    <Box
      sx={{
        position: 'relative',
        border: `1px solid ${alpha(RED, 0.15)}`,
        overflow: 'hidden',
        minHeight: { xs: 300, md: 500 },
        bgcolor: '#080808',
      }}
    >
      {isLoading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 1,
            position: 'absolute',
            width: 1,
            bgcolor: BLACK,
          }}
        >
          <CircularProgress sx={{ color: RED }} />
        </Box>
      ) : !currentClub ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 1,
            position: 'absolute',
            width: 1,
            bgcolor: BLACK,
          }}
        >
          <Typography sx={{ color: alpha('#fff', 0.4) }}>No clubs available.</Typography>
        </Box>
      ) : (
        <>
          <AnimatePresence mode="wait">
            <m.div
              key={currentIndex}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              <Box sx={{ position: 'relative', pt: { xs: '75%', md: '50%' } }}>
                <Image
                  alt={currentClub.name}
                  src={currentClub.image_url}
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: 1,
                    height: 1,
                    objectFit: 'cover',
                  }}
                />
                {/* Dark overlay */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: 1,
                    height: 1,
                    background: `linear-gradient(to bottom, transparent 20%, ${BLACK} 100%)`,
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
            transition={{ delay: 0.15, duration: 0.4 }}
            sx={{
              position: 'absolute',
              bottom: { xs: 80, md: 60 },
              left: { xs: 20, md: 50 },
              zIndex: 9,
              p: 3,
              maxWidth: 360,
              color: 'common.white',
              bgcolor: '#080808', // Tetap mempertahankan background gelap floating label
              border: `1px solid ${alpha(RED, 0.3)}`,
              borderLeft: `3px solid ${RED}`,
              borderRadius: 0, // Dipastikan tajam
            }}
          >
            <Typography
              variant="overline"
              sx={{ color: RED, letterSpacing: 2, fontSize: '0.6rem', display: 'block', mb: 0.5, fontFamily: 'monospace' }}
            >
              {currentClub.city}
            </Typography>
            <Typography
              variant="h5"
              sx={{ mb: 0.75, fontWeight: 800, textTransform: 'uppercase', lineHeight: 1.2, fontFamily: "'Poppins', sans-serif" }}
            >
              {currentClub.name}
            </Typography>
            <Typography variant="caption" sx={{ color: alpha('#fff', 0.5), mb: 2.5, display: 'block', lineHeight: 1.6 }}>
              {currentClub.address}
            </Typography>

            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ cursor: 'pointer', color: RED, '&:hover': { opacity: 0.75 } }}
              >
                <Iconify icon="solar:map-arrow-up-bold" width={18} />
                <Typography variant="caption" sx={{ fontWeight: 800, letterSpacing: 1.5, fontSize: '0.68rem', fontFamily: 'monospace' }}>
                  VIEW DETAILS
                </Typography>
              </Stack>
              <Typography variant="caption" sx={{ color: alpha('#fff', 0.35), fontFamily: 'monospace' }}>
                {String(currentIndex + 1).padStart(2, '0')} / {String(clubs.length).padStart(2, '0')}
              </Typography>
            </Stack>
          </Box>

          {/* Navigation Arrows */}
          <Stack
            direction="row"
            spacing={1.5}
            sx={{
              position: 'absolute',
              bottom: { xs: 20, md: 60 },
              right: { xs: 20, md: 50 },
              zIndex: 9,
            }}
          >
            <IconButton
              onClick={handlePrev}
              sx={{
                bgcolor: BLACK,
                color: alpha('#fff', 0.5),
                border: `1px solid ${alpha('#fff', 0.12)}`,
                borderRadius: 0, // Dibuat kotak tajam
                '&:hover': { bgcolor: '#111', borderColor: RED, color: RED },
              }}
            >
              <Iconify icon="eva:arrow-back-fill" />
            </IconButton>
            <IconButton
              onClick={handleNext}
              sx={{
                bgcolor: RED,
                color: '#fff',
                borderRadius: 0, // Dibuat kotak tajam
                boxShadow: 'none',
                '&:hover': { bgcolor: RED_DARK },
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
    <Box
      sx={{
        bgcolor: BLACK,
        py: { xs: 10, md: 15 },
        overflow: 'hidden',
        borderTop: `1px solid ${alpha(RED, 0.15)}`,
      }}
    >
      <Container component={MotionViewport}>
        {renderHeader}

        <m.div variants={varFade().inUp}>{renderSlider}</m.div>

        <Stack alignItems="center" sx={{ mt: { xs: 6, md: 8 } }}>
          <m.div variants={varFade().inUp}>
            <Button
              variant="contained"
              size="large"
              endIcon={<Iconify icon="solar:arrow-right-up-bold" width={18} />}
              sx={{
                borderRadius: 0,
                px: 5,
                py: 1.75,
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: 2.5,
                fontSize: '0.72rem',
                bgcolor: RED,
                color: '#fff',
                boxShadow: 'none',
                fontFamily: 'monospace',
                '&:hover': { bgcolor: RED_DARK, boxShadow: 'none' },
              }}
            >
              View All Clubs
            </Button>
          </m.div>
        </Stack>
      </Container>
    </Box>
  );
}
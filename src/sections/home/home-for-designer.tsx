import { useState, useEffect } from 'react';
import { m } from 'framer-motion';
// router
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme, alpha } from '@mui/material/styles';
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

export default function HomeFeaturedClasses() {
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');

  // --- STATE SUPABASE ---
  const [featuredClasses, setFeaturedClasses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchFeatured = async () => {
      setIsLoading(true);
      // Mengambil data class yang kolom is_featured-nya true
      const { data, error } = await supabase
        .from('classes')
        .select('*')
        .eq('is_featured', true);
        
      if (!error && data) {
        setFeaturedClasses(data);
      } else {
        console.error('Error fetching featured classes:', error);
      }
      setIsLoading(false);
    };

    fetchFeatured();
  }, []);

  const renderDescription = (
    <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 8 } }}>
      <m.div variants={varFade().inDown}>
        <Typography variant="h2" sx={{ fontWeight: 900, mb: 2, letterSpacing: 2 }}>
          FEATURED CLASSES
        </Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Typography sx={{ color: 'text.secondary', maxWidth: 640, mx: 'auto' }}>
          Dive into celebrity-inspired fitness. Fun, dynamic classes that'll get you training like a star!
        </Typography>
      </m.div>
    </Box>
  );

  const renderContent = (
    <Stack
      direction="row"
      spacing={3}
      sx={{
        overflowX: 'auto',
        py: 5,
        px: 1,
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
      }}
    >
      {isLoading ? (
        // Tampilan saat data sedang diambil
        <Box sx={{ display: 'flex', justifyContent: 'center', width: 1, py: 5 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : featuredClasses.length === 0 ? (
        // Tampilan jika tidak ada class yang di set 'is_featured = true'
        <Box sx={{ display: 'flex', justifyContent: 'center', width: 1, py: 5 }}>
           <Typography sx={{ color: 'text.secondary' }}>No featured classes available at the moment.</Typography>
        </Box>
      ) : (
        featuredClasses.map((item, index) => {
          // Format index menjadi string '01', '02', '03' untuk menggantikan id statis
          const formattedIndex = String(index + 1).padStart(2, '0');

          return (
            <m.div 
              key={item.id} 
              variants={varFade({ distance: 40 }).inRight}
              transition={{ delay: index * 0.1 }}
            >
              <Box
                component={RouterLink}
                to="/classes"
                sx={{
                  display: 'block',
                  textDecoration: 'none',
                  width: { xs: 280, md: 320 },
                  flexShrink: 0,
                  borderRadius: 2,
                  overflow: 'hidden',
                  position: 'relative',
                  bgcolor: 'background.neutral',
                  cursor: 'pointer',
                  transition: (theme) => theme.transitions.create(['transform', 'box-shadow']),
                  '&:hover': {
                    transform: 'translateY(-12px)',
                    boxShadow: `0 20px 40px ${alpha(theme.palette.common.black, 0.4)}`,
                    '& .class-img': { transform: 'scale(1.1)' },
                    '& .arrow-icon': { color: 'primary.light' },
                  },
                }}
              >
                <Box sx={{ position: 'relative', overflow: 'hidden', height: 380 }}>
                  <Image
                    alt={item.title}
                    src={item.image_url} // Menggunakan kolom image_url dari Supabase
                    className="class-img"
                    sx={{
                      width: 1,
                      height: 1,
                      objectFit: 'cover',
                      objectPosition: 'center top',
                      transition: 'transform 0.5s ease',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: 1,
                      height: 1,
                      background: `linear-gradient(to bottom, transparent 50%, ${alpha(theme.palette.common.black, 0.8)} 100%)`,
                    }}
                  />
                </Box>

                <Box sx={{ p: 3, bgcolor: '#161C24', color: 'common.white' }}>
                  <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 'bold', display: 'block', mb: 1 }}>
                    {formattedIndex}
                  </Typography>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="h5" sx={{ fontWeight: 800 }}>
                      {item.title}
                    </Typography>
                    <Iconify icon="solar:arrow-right-up-bold" className="arrow-icon" sx={{ color: 'primary.main', transition: 'color 0.3s' }} />
                  </Stack>
                </Box>
              </Box>
            </m.div>
          );
        })
      )}
    </Stack>
  );

  return (
    <Box
      sx={{
        py: { xs: 10, md: 15 },
        bgcolor: '#0D1117',
        position: 'relative',
      }}
    >
      <Container component={MotionViewport}>
        {renderDescription}
        
        {renderContent}

        <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} sx={{ mt: 5 }}>
          <Button
            component={RouterLink}
            to="/classes"
            variant="contained"
            color="primary"
            size="large"
            sx={{
              borderRadius: 50,
              px: 4,
              fontWeight: 'bold',
              textTransform: 'uppercase',
            }}
          >
            Check Classes
          </Button>

          {/* Tombol Panah (Hanya sebagai dekorasi seperti kode aslinya, atau Anda bisa tambahkan fungsi scroll manual ke depannya) */}
          <Stack direction="row" spacing={1}>
             <IconButton sx={{ border: `1px solid ${theme.palette.divider}` }}>
                <Iconify icon="eva:arrow-back-fill" />
             </IconButton>
             <IconButton sx={{ bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}>
                <Iconify icon="eva:arrow-forward-fill" sx={{ color: 'common.white' }} />
             </IconButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
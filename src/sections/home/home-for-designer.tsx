import { m } from 'framer-motion';
// @mui
import { useTheme, alpha } from '@mui/material/styles';
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

const CLASSES = [
  { id: '01', title: 'DNA CORE MOTION', img: '/assets/images/home/class_1.jpg' },
  { id: '02', title: 'BODYPUMP', img: '/assets/images/home/class_2.jpg' },
  { id: '03', title: 'BODYCOMBAT', img: '/assets/images/home/class_3.jpg' },
  { id: '04', title: 'BODYJAM', img: '/assets/images/home/class_4.jpg' },
];

export default function HomeFeaturedClasses() {
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');

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
      {CLASSES.map((item, index) => (
        <m.div 
          key={item.id} 
          variants={varFade({ distance: 40 }).inRight}
          transition={{ delay: index * 0.1 }}
        >
          <Box
            sx={{
              width: { xs: 280, md: 320 },
              flexShrink: 0,
              borderRadius: 2,
              overflow: 'hidden',
              position: 'relative',
              bgcolor: 'background.neutral',
              transition: (theme) => theme.transitions.create(['transform']),
              '&:hover': {
                transform: 'translateY(-12px)',
                '& .class-img': { transform: 'scale(1.1)' },
              },
            }}
          >
            <Box sx={{ position: 'relative', overflow: 'hidden', height: 380 }}>
              <Image
                alt={item.title}
                src={item.img}
                className="class-img"
                sx={{
                  height: 1,
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
                {item.id}
              </Typography>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h5" sx={{ fontWeight: 800 }}>
                  {item.title}
                </Typography>
                <Iconify icon="solar:arrow-right-up-bold" sx={{ color: 'primary.main' }} />
              </Stack>
            </Box>
          </Box>
        </m.div>
      ))}
    </Stack>
  );

  return (
    <Box
      sx={{
        py: { xs: 10, md: 15 },
        bgcolor: '#0D1117', // Dark theme sesuai gambar
        position: 'relative',
      }}
    >
      <Container component={MotionViewport}>
        {renderDescription}
        
        {renderContent}

        <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} sx={{ mt: 5 }}>
          <Button
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
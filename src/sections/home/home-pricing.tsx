import { m } from 'framer-motion';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

const APP_FEATURES = [
  'BOOK AHEAD TO GET GOING',
  'MAKE EVERY VISIT COUNT',
  'CELEB TRIBE CHALLENGES',
  'CHECK OUT OUR OTHER CLUBS',
];

// Mock images untuk Instagram Feed (Ganti dengan path gambar kamu)
const INSTA_POSTS = [
  '/assets/images/home/insta_1.jpg',
  '/assets/images/home/insta_2.jpg',
  '/assets/images/home/insta_3.jpg',
  '/assets/images/home/insta_4.jpg',
  '/assets/images/home/insta_5.jpg',
  '/assets/images/home/insta_6.jpg',
];

export default function HomeAppAndSocial() {
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');

  const renderAppSection = (
    <Grid container spacing={5} alignItems="center" sx={{ mb: { xs: 10, md: 15 } }}>
      <Grid xs={12} md={6}>
        <m.div variants={varFade().inLeft}>
          <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            {/* Mockup HP */}
            <Image
              alt="mobile app"
              src="/assets/images/home/mobile_app_mockup.png" // Pastikan ada gambar mockup HP transparan
              sx={{ maxWidth: 400, zIndex: 2 }}
            />
            {/* Glow Effect di belakang HP */}
            <Box
              sx={{
                position: 'absolute',
                top: '20%',
                left: '20%',
                width: 300,
                height: 300,
                bgcolor: alpha(theme.palette.primary.main, 0.4),
                filter: 'blur(80px)',
                borderRadius: '50%',
                zIndex: 1,
              }}
            />
          </Box>
        </m.div>
      </Grid>

      <Grid xs={12} md={6}>
        <m.div variants={varFade().inRight}>
          <Typography variant="h2" sx={{ mb: 2, fontWeight: 900, textTransform: 'uppercase' }}>
            App for Access <br /> and Bookings
          </Typography>
          <Typography sx={{ color: 'text.primary', mb: 4 }}>
            Download our app for bookings and access. We cap club capacities to ensure your safety.
          </Typography>

          <Stack spacing={2} sx={{ mb: 5 }}>
            {APP_FEATURES.map((feature) => (
              <Stack key={feature} direction="row" alignItems="center" spacing={2}>
                 <Iconify icon="solar:add-circle-bold" sx={{ color: 'common.white' }} />
                 <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{feature}</Typography>
              </Stack>
            ))}
          </Stack>

          <Stack direction="row" spacing={2}>
            <Image 
                alt="App Store" 
                src="/assets/icons/app-store.svg" 
                sx={{ width: 140, cursor: 'pointer' }} 
            />
             <Image 
                alt="Google Play" 
                src="/assets/icons/google-play.svg" 
                sx={{ width: 140, cursor: 'pointer' }} 
            />
          </Stack>
        </m.div>
      </Grid>
    </Grid>
  );

  const renderSocialSection = (
    <Stack spacing={5} alignItems="center">
      <m.div variants={varFade().inUp}>
        <Typography variant="h2" sx={{ fontWeight: 900, textTransform: 'uppercase', textAlign: 'center' }}>
          Follow Us On Instagram
        </Typography>
      </m.div>

      <Box 
        sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(6, 1fr)' }, 
            width: 1 
        }}
      >
        {INSTA_POSTS.map((img, index) => (
          <m.div key={index} variants={varFade().inUp} transition={{ delay: index * 0.1 }}>
            <Box sx={{ position: 'relative', pt: '100%', overflow: 'hidden', '&:hover img': { transform: 'scale(1.1)' } }}>
              <Image
                alt={`insta-${index}`}
                src={img}
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: 1,
                  height: 1,
                  objectFit: 'cover',
                  transition: 'transform 0.4s ease',
                }}
              />
              {/* Hover Overlay */}
              <Stack
                alignItems="center"
                justifyContent="center"
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: 1,
                    height: 1,
                    bgcolor: alpha(theme.palette.grey[900], 0.6),
                    opacity: 0,
                    transition: 'opacity 0.3s',
                    color: 'common.white',
                    '&:hover': { opacity: 1 }
                }}
              >
                 <Iconify icon="akar-icons:instagram-fill" width={32} />
              </Stack>
            </Box>
          </m.div>
        ))}
      </Box>

      <m.div variants={varFade().inUp}>
        <Button
            variant="contained"
            color="primary" // Warna Cyan/Teal
            size="large"
            endIcon={<Iconify icon="solar:arrow-right-up-bold" />}
            sx={{
                borderRadius: 50,
                px: 4,
                fontWeight: 'bold',
                boxShadow: `0 8px 16px 0 ${alpha(theme.palette.primary.main, 0.24)}`
            }}
        >
            DISCOVER MORE
        </Button>
      </m.div>
    </Stack>
  );

  return (
    <Box sx={{ bgcolor: '#000000', py: { xs: 10, md: 15 }, overflow: 'hidden', color: 'common.white' }}>
      <Container component={MotionViewport}>
        {renderAppSection}
      </Container>
      
      {/* Social Section dibuat full width container-nya agar grid fotonya menyentuh tepi layar jika diinginkan, atau masukkan ke container jika ingin boxed */}
      <Container maxWidth={false} sx={{ px: { xs: 0, md: 0 } }}> 
         {renderSocialSection}
      </Container>
    </Box>
  );
}
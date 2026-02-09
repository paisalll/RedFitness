import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Chooi Yin',
    role: 'Member since 2018',
    quote: 'SMASH YOUR WAY TO THE TOP',
    review: 'I realized that if I did not make a lifestyle change immediately, I might never do it and get worse. I gave myself one year to find that person inside me who was screaming to get out. That was when I met Amirul. I told him I wanted my sexy back! And that was the start of my journey.',
    avatar: '/assets/images/home/member_1.jpg', // Pastikan kamu punya gambar dummy atau ganti url ini
  },
  {
    id: 2,
    name: 'Sarah Jenkins',
    role: 'Member since 2020',
    quote: 'ADDICTED TO THE ENERGY',
    review: 'The vibe here is unmatched. I used to dread going to the gym, but now I look forward to the BodyCombat classes every single week. The instructors push you to your limits in the best way possible!',
    avatar: '/assets/images/home/member_2.jpg',
  },
  {
    id: 3,
    name: 'Michael Tan',
    role: 'Member since 2022',
    quote: 'STRONGER THAN YESTERDAY',
    review: 'Joining the personal training program was the best investment I ever made. My trainer understands my goals perfectly and helps me crush them one rep at a time.',
    avatar: '/assets/images/home/member_3.jpg',
  },
];

export default function HomeTestimonials() {
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');

  const [activeStep, setActiveStep] = useState(0);

  const maxSteps = TESTIMONIALS.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep - 1 + maxSteps) % maxSteps);
  };

  const activeTestimonial = TESTIMONIALS[activeStep];

  const renderControls = (
    <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
      <IconButton
        onClick={handleBack}
        sx={{
          p: 2,
          border: `1px solid ${alpha(theme.palette.common.white, 0.3)}`,
          color: 'common.white',
          '&:hover': {
            bgcolor: alpha(theme.palette.common.white, 0.08),
            borderColor: 'common.white',
          },
        }}
      >
        <Iconify icon="eva:arrow-back-fill" />
      </IconButton>

      <IconButton
        onClick={handleNext}
        sx={{
          p: 2,
          bgcolor: 'primary.main',
          color: 'common.white',
          boxShadow: `0 8px 16px 0 ${alpha(theme.palette.primary.main, 0.24)}`,
          '&:hover': {
            bgcolor: 'primary.dark',
          },
        }}
      >
        <Iconify icon="eva:arrow-forward-fill" />
      </IconButton>
    </Stack>
  );

  const renderContent = (
    <Stack sx={{ maxWidth: 480, mx: { xs: 'auto', md: 'unset' }, textAlign: { xs: 'center', md: 'left' } }}>
      <m.div variants={varFade().inUp}>
        <Typography variant="h2" sx={{ mb: 1, fontWeight: 900, textTransform: 'uppercase' }}>
          What Members <br />
          <Box component="span" sx={{ color: 'primary.main' }}>Think About Us</Box>
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent={{ xs: 'center', md: 'flex-start' }}
          spacing={2}
          sx={{ mb: 5, mt: 2 }}
        >
          <Avatar
            src={activeTestimonial.avatar}
            alt={activeTestimonial.name}
            sx={{ width: 48, height: 48 }}
          />
          <Box sx={{ textAlign: 'left' }}>
            <Typography variant="subtitle1">{activeTestimonial.name}</Typography>
            <Typography variant="caption" sx={{ color: 'text.disabled' }}>
              {activeTestimonial.role}
            </Typography>
          </Box>
        </Stack>
      </m.div>

      <Box sx={{ minHeight: 240, position: 'relative' }}>
        <AnimatePresence mode="wait">
          <m.div
            key={activeTestimonial.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h3"
              sx={{
                color: 'secondary.main', // Warna Cyan/Teal sesuai gambar
                mb: 3,
                fontStyle: 'italic',
                fontWeight: 800,
              }}
            >
              "{activeTestimonial.quote}"
            </Typography>

            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
              {activeTestimonial.review}
            </Typography>
          </m.div>
        </AnimatePresence>
      </Box>

      {renderControls}
    </Stack>
  );

  const renderImg = (
    <Box sx={{ position: 'relative', height: 1, minHeight: { xs: 320, md: 560 } }}>
      <AnimatePresence mode="wait">
        <m.div
            key={activeTestimonial.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ width: '100%', height: '100%' }}
        >
            <Image
                disabledEffect
                alt={activeTestimonial.name}
                src={activeTestimonial.avatar} // Menggunakan gambar avatar sebagai foto besar juga
                sx={{
                    width: 1,
                    height: 1,
                    objectFit: 'cover',
                    borderRadius: 2,
                    boxShadow: (theme) => `-40px 40px 80px ${alpha(theme.palette.common.black, 0.4)}`,
                }}
            />
            {/* Overlay Gradient Style */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: 1,
                    height: '50%',
                    borderRadius: '0 0 16px 16px',
                    background: `linear-gradient(to top, ${theme.palette.grey[900]} 0%, transparent 100%)`,
                }}
            />
        </m.div>
      </AnimatePresence>
      
      {/* Decorative Element */}
      <Box
        component={m.div}
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        sx={{
            position: 'absolute',
            top: -40,
            right: -40,
            zIndex: -1,
            width: 160,
            height: 160,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.4)} 0%, transparent 100%)`,
            filter: 'blur(40px)',
        }}
      />
    </Box>
  );

  return (
    <Box
      sx={{
        bgcolor: 'grey.900',
        color: 'common.white',
        py: { xs: 10, md: 15 },
        overflow: 'hidden',
      }}
    >
      <Container component={MotionViewport}>
        <Grid container spacing={{ xs: 5, md: 8 }} alignItems="center" direction={{ xs: 'column-reverse', md: 'row' }}>
          <Grid xs={12} md={6}>
            {renderContent}
          </Grid>

          <Grid xs={12} md={6}>
             {renderImg}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
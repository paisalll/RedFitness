import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
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

const RED = '#DF2026';
const RED_DARK = '#A8171C';
const BLACK = '#060606';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Chooi Yin',
    role: 'Member since 2018',
    quote: 'I finally found a routine I can stick to.',
    review: 'Before joining Red Fitness Indonesia, I struggled to stay consistent. With the support from trainers and the right environment, I was able to build a routine, stay motivated, and see real progress. This is more than just a gym—it’s where my journey truly started.',
    avatar: '/assets/background/home_member/8.png',
  },
  {
    id: 2,
    name: 'Sarah Jenkins',
    role: 'Member since 2020',
    quote: 'ADDICTED TO THE ENERGY',
    review: 'The vibe here is unmatched. I used to dread going to the gym, but now I look forward to the BodyCombat classes every single week. The instructors push you to your limits in the best way possible!',
    avatar: '/assets/background/home_member/9.png',
  },
  {
    id: 3,
    name: 'Michael Tan',
    role: 'Member since 2022',
    quote: 'STRONGER THAN YESTERDAY',
    review: 'Joining the personal training program was the best investment I ever made. My trainer understands my goals perfectly and helps me crush them one rep at a time.',
    avatar: '/assets/background/home_member/10.png',
  },
];

// ── Shared accent rule (Diambil dari elemen header) ──────────────
const AccentRule = styled('div')({
  width: '100%',
  height: 1,
  background: `linear-gradient(90deg, transparent 0%, ${RED} 40%, ${RED} 60%, transparent 100%)`,
  opacity: 0.22,
});

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
    <Stack direction="row" spacing={2} sx={{ mt: 5, justifyContent: { xs: 'center', md: 'flex-start' } }}>
      <IconButton
        onClick={handleBack}
        sx={{
          p: 2,
          borderRadius: 0, // Kotak tajam seperti tombol Join Us Now
          border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
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
          borderRadius: 0, // Kotak tajam
          bgcolor: RED,
          color: 'common.white',
          boxShadow: 'none',
          '&:hover': {
            bgcolor: RED_DARK,
          },
        }}
      >
        <Iconify icon="eva:arrow-forward-fill" />
      </IconButton>
    </Stack>
  );

  const renderContent = (
    <Stack sx={{ maxWidth: 480, mx: { xs: 'auto', md: 'unset' }, textAlign: { xs: 'center', md: 'left' } }}>
      
      {/* Overline row mirip dengan "Why Red Fitness" */}
      <m.div variants={varFade().inLeft}>
        <Stack 
          direction="row" 
          alignItems="center" 
          justifyContent={{ xs: 'center', md: 'flex-start' }}
          spacing={1.5} 
          sx={{ mb: 3 }}
        >
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
            Real Stories
          </Typography>
        </Stack>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography 
          variant="h2" 
          sx={{ 
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: -2,
            color: 'common.white',
            textTransform: 'uppercase',
            fontFamily: "'Poppins', sans-serif",
            fontSize: { xs: '2.5rem', md: '4rem' },
            mb: 4
          }}
        >
          What Our <br />
          <Box component="span" display="block" sx={{ color: RED, fontStyle: 'italic' }}>
            Members Achieve.
          </Box>
        </Typography>
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
                color: 'common.white', 
                mb: 3,
                fontFamily: "'Poppins', sans-serif",
                textTransform: 'uppercase',
                fontWeight: 800,
                letterSpacing: -0.5,
              }}
            >
              "{activeTestimonial.quote}"
            </Typography>

            <Typography 
              variant="body1" 
              sx={{ 
                color: alpha('#fff', 0.4), // Menyamai deskripsi header
                lineHeight: 1.85,
                fontSize: '0.88rem',
                mb: 4
              }}
            >
              {activeTestimonial.review}
            </Typography>

            {/* Profil Member */}
            <Stack
              direction="row"
              alignItems="center"
              justifyContent={{ xs: 'center', md: 'flex-start' }}
              spacing={2}
            >
              <Avatar
                src={activeTestimonial.avatar}
                alt={activeTestimonial.name}
                sx={{ 
                  width: 48, 
                  height: 48,
                  border: `1px solid ${alpha(RED, 0.4)}` // Border merah tipis pada avatar
                }}
              />
              <Box sx={{ textAlign: 'left' }}>
                <Typography sx={{ fontWeight: 800, fontSize: '0.9rem', color: 'common.white', fontFamily: "'Poppins', sans-serif", textTransform: 'uppercase' }}>
                  {activeTestimonial.name}
                </Typography>
                <Typography sx={{ color: RED, fontSize: '0.7rem', fontWeight: 700, fontFamily: 'monospace', letterSpacing: 1 }}>
                  {activeTestimonial.role}
                </Typography>
              </Box>
            </Stack>

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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ width: '100%', height: '100%' }}
        >
            <Image
                disabledEffect
                alt={activeTestimonial.name}
                src={activeTestimonial.avatar}
                sx={{
                    width: 1,
                    height: 1,
                    objectFit: 'cover',
                    borderRadius: 0, // Dibuat tajam sesuai tema
                    border: `1px solid ${alpha('#fff', 0.06)}`,
                }}
            />
            {/* Overlay Gradient Hitam di bawah gambar */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: 1,
                    height: '50%',
                    background: `linear-gradient(to top, ${BLACK} 0%, transparent 100%)`,
                }}
            />
        </m.div>
      </AnimatePresence>
      
      {/* Decorative Red Blur Element */}
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
            background: `linear-gradient(135deg, ${alpha(RED, 0.4)} 0%, transparent 100%)`,
            filter: 'blur(40px)',
        }}
      />
    </Box>
  );

  return (
    <Box
      sx={{
        bgcolor: BLACK, // Background utama diset ke BLACK
        color: 'common.white',
        py: { xs: 10, md: 15 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Garis atas pembatas */}
      <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
        <AccentRule />
      </Box>

      <Container component={MotionViewport}>
        <Grid container spacing={{ xs: 8, md: 10 }} alignItems="center" direction={{ xs: 'column-reverse', md: 'row' }}>
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
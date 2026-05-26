import { m } from 'framer-motion';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { MotionContainer, varFade } from 'src/components/animate';
// hooks
import { useBanner } from 'src/hooks/use-banner';
import { useSectionContent } from 'src/hooks/use-page-content';

// ----------------------------------------------------------------------

const RED = '#DF2026';
const RED_DARK = '#A8171C';
const BLACK = '#060606';
const DEFAULT_BG = '/assets/background/TRAINER/16.webp';

export default function PersonalTrainingHero() {
  const theme = useTheme();
  const bannerUrl = useBanner('contact');
  const content = useSectionContent('contact', 'hero');

  return (
    <Box
      sx={{
        minHeight: { md: 560 },
        py: { xs: 10, md: 0 },
        overflow: 'hidden',
        position: 'relative',
        bgcolor: BLACK,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: `url(/assets/background/overlay_1.svg), url(${bannerUrl || DEFAULT_BG})`,
        borderBottom: `1px solid ${alpha(RED, 0.15)}`,
      }}
    >
      {/* OVERLAY GRADIENT: Agar teks tetap terbaca di atas background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 1,
          height: 1,
          zIndex: 0,
          background: `linear-gradient(to right, ${alpha(BLACK, 0.95)} 0%, ${alpha(BLACK, 0.7)} 50%, ${alpha(RED, 0.2)} 100%)`,
        }}
      />

      {/* Dekorasi Cahaya Merah di Latar Belakang */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '60%',
          height: '100%',
          background: `radial-gradient(circle at center, ${alpha(RED, 0.15)} 0%, transparent 70%)`,
          filter: 'blur(80px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <Container component={MotionContainer} sx={{ position: 'relative', zIndex: 1, height: 1, mt: 5 }}>
        <Grid container spacing={5} alignItems="center" sx={{ height: 1 }}>
          
          {/* BAGIAN KIRI: TEKS */}
          <Grid xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <m.div variants={varFade().inRight}>
                <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                    <Box sx={{ width: 28, height: 2, bgcolor: RED }} />
                    <Typography sx={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: 4, textTransform: 'uppercase', color: RED, fontFamily: 'monospace' }}>
                        {content.eyebrow}
                    </Typography>
                </Stack>
            </m.div>

            <m.div variants={varFade().inRight}>
              <Typography
                variant="h1"
                sx={{
                  mt: 2,
                  mb: 3,
                  fontWeight: 900,
                  color: '#fff',
                  textTransform: 'uppercase',
                  lineHeight: 0.95,
                  letterSpacing: -2,
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: { xs: '3.5rem', md: '5.5rem' },
                }}
              >
                {content.title} <br />
                <Box component="span" sx={{ color: RED, fontStyle: 'italic' }}>{content.title_highlight}</Box>
              </Typography>
            </m.div>

            <m.div variants={varFade().inRight}>
              <Typography
                sx={{
                  color: alpha('#fff', 0.6),
                  fontSize: '0.9rem',
                  lineHeight: 1.8,
                  maxWidth: 480,
                  mx: { xs: 'auto', md: 'unset' }
                }}
              >
                {content.description}
              </Typography>
            </m.div>

            <m.div variants={varFade().inRight}>
              <Button
                variant="contained"
                size="large"
                endIcon={<Iconify icon="solar:arrow-right-up-bold" />}
                sx={{
                  mt: 5,
                  bgcolor: RED,
                  color: '#fff',
                  borderRadius: 0, // Sharp
                  px: 5,
                  py: 1.75,
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  fontFamily: 'monospace',
                  boxShadow: 'none',
                  '&:hover': {
                    bgcolor: RED_DARK,
                    boxShadow: 'none',
                  }
                }}
              >
                {content.button}
              </Button>
            </m.div>
          </Grid>

          {/* BAGIAN KANAN: GAMBAR MODEL */}
          <Grid xs={12} md={6}>
            <m.div variants={varFade().inUp}>
              <Box
                sx={{
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  '&::before': {
                     content: '""',
                     position: 'absolute',
                     top: '50%',
                     left: '50%',
                     transform: 'translate(-50%, -50%)',
                     width: '100%',
                     height: '100%',
                     background: `radial-gradient(circle, ${alpha(RED, 0.2)} 0%, transparent 70%)`,
                     filter: 'blur(50px)',
                     zIndex: -1,
                  }
                }}
              >
                {/* <Image
                  visibleByDefault
                  disabledEffect
                  alt="Personal Training Model"
                  src="/assets/images/home/personal_training_model.png" 
                  sx={{
                    maxWidth: { xs: 320, md: 560 },
                    filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.6))',
                  }}
                /> */}
              </Box>
            </m.div>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}
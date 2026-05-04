import { m, MotionProps } from 'framer-motion';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Box, { BoxProps } from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { MotionContainer, varFade } from 'src/components/animate';

const RED = '#DF2026';
const RED_DARK = '#A8171C';
const BLACK = '#060606';

// ----------------------------------------------------------------------

export default function AboutHero() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: { md: 560 },
        py: { xs: 10, md: 0 },
        overflow: 'hidden',
        position: 'relative',
        bgcolor: BLACK, // Fallback background color
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage:
          'url(/assets/background/overlay_1.svg), url(/assets/background/member.png)',
        borderBottom: `1px solid ${alpha(RED, 0.15)}`,
      }}
    >
        {/* Overlay agar gambar background tidak mengganggu teks */}
        <Box
            sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 1,
            height: 1,
            zIndex: 0,
            background: `linear-gradient(to right, ${alpha(BLACK, 0.9)} 0%, ${alpha(BLACK, 0.6)} 50%, transparent 100%)`,
            }}
        />

      <Container component={MotionContainer} sx={{ position: 'relative', zIndex: 1, height: 1, mt: { md: 5 } }}>
        <Grid container spacing={5} alignItems="center" sx={{ height: 1 }}>
          
          {/* BAGIAN KIRI: TEKS */}
          <Grid xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <m.div variants={varFade().inRight}>
                <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                    <Box sx={{ width: 28, height: 2, bgcolor: RED }} />
                    <Typography sx={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: 4, textTransform: 'uppercase', color: RED, fontFamily: 'monospace' }}>
                        Membership
                    </Typography>
                </Stack>
            </m.div>

            <Box sx={{ mt: 2, mb: 3 }}>
              <TextAnimate
                text="GET YOUR"
                variants={varFade().inRight}
                sx={{ color: '#fff', display: 'block', fontFamily: "'Poppins', sans-serif", letterSpacing: -2, lineHeight: 1 }}
              />
              <Stack
                spacing={1}
                display="inline-flex"
                direction={{ xs: 'column', md: 'row' }}
                sx={{ color: '#fff' }}
              >
                <TextAnimate text="STAR POWER" sx={{ color: RED, fontFamily: "'Poppins', sans-serif", letterSpacing: -2, lineHeight: 1, fontStyle: 'italic' }} />
                <TextAnimate text="ON." sx={{ color: '#fff', fontFamily: "'Poppins', sans-serif", letterSpacing: -2, lineHeight: 1 }} />
              </Stack>
            </Box>

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
                You're in charge. Get pumped with your choice of classes. Experience elite training tailored to your goals.
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
                  borderRadius: 0, // Sharp corners
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
                  },
                }}
              >
                LEARN MORE
              </Button>
            </m.div>
          </Grid>

          {/* BAGIAN KANAN: GAMBAR MODEL */}
          <Grid xs={12} md={6}>
            <m.div variants={varFade().inUp}>
              <Box
                sx={{
                  position: 'relative',
                  mt: { xs: 5, md: 0 },
                }}
              >
                {/* 
                   Pastikan ini gambar orangnya saja (transparent background). 
                   Uncomment jika gambarnya sudah siap.
                */}
                <Image
                  disabledEffect
                  visibleByDefault
                  alt="membership hero model"
                  src="/assets/images/about/hero_membership_model.png" 
                  sx={{
                    maxWidth: { xs: 300, md: 500 },
                    mx: 'auto',
                  }}
                />
              </Box>
            </m.div>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

type TextAnimateProps = BoxProps &
  MotionProps & {
    text: string;
  };

function TextAnimate({ text, variants, sx, ...other }: TextAnimateProps) {
  return (
    <Box
      component={m.div}
      sx={{
        typography: 'h1', // Adjusted size to match other heroes
        fontWeight: 900,
        overflow: 'hidden',
        display: 'inline-flex',
        textTransform: 'uppercase',
        ...sx,
      }}
      {...other}
    >
      {text.split('').map((letter, index) => (
        <m.span key={index} variants={variants || varFade().inUp}>
          {letter === ' ' ? '\u00A0' : letter} {/* Preserve spaces */}
        </m.span>
      ))}
    </Box>
  );
}
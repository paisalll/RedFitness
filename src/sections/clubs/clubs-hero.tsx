import { m } from 'framer-motion';
// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { MotionContainer, varFade } from 'src/components/animate';
// hooks
import { useBanner } from 'src/hooks/use-banner';

// ----------------------------------------------------------------------

const RED = '#DF2026';
const RED_DARK = '#A8171C';
const BLACK = '#060606';
const DEFAULT_BG = '/assets/images/facilities/hero_facilities.jpg';

export default function ClubsHero() {
  const bannerUrl = useBanner('clubs');
  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: '100vh', md: 800 },
        overflow: 'hidden',
        borderBottom: `1px solid ${alpha(RED, 0.15)}`,
      }}
    >
      <Image
        alt="world class gym facilities"
        src={bannerUrl || DEFAULT_BG}
        sx={{
          width: 1,
          height: 1,
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      />

      {/* OVERLAY GRADIENT */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 1,
          height: 1,
          zIndex: 1,
          background: `linear-gradient(to top right, 
            ${alpha(BLACK, 0.95)} 20%, 
            ${alpha(BLACK, 0.7)} 50%, 
            ${alpha(RED, 0.25)} 100%)`,
        }}
      />

      {/* HERO CONTENT */}
      <Container
        component={MotionContainer}
        sx={{
          height: 1,
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: { xs: 'center', md: 'flex-start' },
          textAlign: { xs: 'center', md: 'left' },
          pt: { xs: 10, md: 0 }
        }}
      >
        <m.div variants={varFade().inRight}>
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
              <Box sx={{ width: 28, height: 2, bgcolor: RED }} />
              <Typography sx={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: 4, textTransform: 'uppercase', color: RED, fontFamily: 'monospace' }}>
                Premium Grounds
              </Typography>
            </Stack>
        </m.div>

        <m.div variants={varFade().inRight}>
          <Typography
            variant="h1"
            sx={{
              color: '#fff',
              fontWeight: 900,
              textTransform: 'uppercase',
              lineHeight: 0.95,
              mb: 3,
              letterSpacing: -2,
              fontFamily: "'Poppins', sans-serif",
              fontSize: { xs: '3.5rem', md: '6rem' },
            }}
          >
            World-Class <br />
            <Box component="span" sx={{ color: RED, fontStyle: 'italic', display: 'block' }}>
              Facilities.
            </Box>
          </Typography>
        </m.div>

        <m.div variants={varFade().inRight}>
          <Typography
            sx={{
              color: alpha('#fff', 0.6),
              maxWidth: 500,
              mb: 6,
              fontSize: '0.9rem',
              lineHeight: 1.8
            }}
          >
            Train with the best. Our state-of-the-art equipment, spacious zones, and dedicated performance areas are designed to push your limits.
          </Typography>
        </m.div>

        <m.div variants={varFade().inRight}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button
              variant="contained"
              size="large"
              endIcon={<Iconify icon="solar:arrow-right-up-bold" />}
              sx={{
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
                '&:hover': { bgcolor: RED_DARK, boxShadow: 'none' },
              }}
            >
              Explore Zones
            </Button>

            <Button
              variant="outlined"
              size="large"
              startIcon={<Iconify icon="solar:play-circle-bold" />}
              sx={{
                color: '#fff',
                borderColor: alpha('#fff', 0.3),
                borderRadius: 0, // Sharp
                px: 5,
                py: 1.75,
                fontSize: '0.72rem',
                fontWeight: 800,
                letterSpacing: 2,
                textTransform: 'uppercase',
                fontFamily: 'monospace',
                '&:hover': {
                  borderColor: RED,
                  bgcolor: alpha(RED, 0.1),
                },
              }}
            >
              Virtual Tour
            </Button>
          </Stack>
        </m.div>
      </Container>
    </Box>
  );
}
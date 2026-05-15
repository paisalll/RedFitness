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
const DEFAULT_BG = '/assets/background/1.png';

// ----------------------------------------------------------------------

export default function PilatesPerformerHero() {
  const bannerUrl = useBanner('pilates-performer');

  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: '100vh', md: 760 },
        overflow: 'hidden',
        borderBottom: `1px solid ${alpha(RED, 0.15)}`,
      }}
    >
      <Image
        alt="pilates performer"
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
          background: `linear-gradient(to right,
            ${alpha(BLACK, 0.95)} 0%,
            ${alpha(BLACK, 0.7)} 40%,
            ${alpha(RED, 0.25)} 100%)`,
        }}
      />

      {/* CONTENT */}
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
        }}
      >
        <m.div variants={varFade().inRight}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1.5}
            sx={{ mb: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}
          >
            <Box sx={{ width: 28, height: 2, bgcolor: RED }} />
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
              Premium Program
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
              fontSize: { xs: '3rem', md: '5.5rem' },
            }}
          >
            Pilates <br />
            <Box component="span" sx={{ color: RED, fontStyle: 'italic', display: 'block' }}>
              Performer.
            </Box>
          </Typography>
        </m.div>

        <m.div variants={varFade().inRight}>
          <Typography
            sx={{
              color: alpha('#fff', 0.6),
              maxWidth: 480,
              mb: 5,
              fontSize: '0.9rem',
              lineHeight: 1.8,
            }}
          >
            Elevate your core strength, flexibility, and posture with our exclusive Pilates Performer program — designed for all levels.
          </Typography>
        </m.div>

        <m.div variants={varFade().inRight}>
          <Button
            variant="contained"
            size="large"
            endIcon={<Iconify icon="solar:arrow-right-up-bold" />}
            sx={{
              bgcolor: RED,
              color: '#fff',
              borderRadius: 0,
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
            Join Now
          </Button>
        </m.div>
      </Container>

      {/* SLIDER INDICATORS */}
      <Stack
        direction="row"
        spacing={1.5}
        justifyContent="center"
        sx={{ position: 'absolute', bottom: 40, left: 0, right: 0, zIndex: 3 }}
      >
        {[0, 1].map((index) => (
          <Box
            key={index}
            sx={{
              width: index === 0 ? 32 : 8,
              height: 8,
              borderRadius: 0,
              bgcolor: index === 0 ? RED : alpha('#fff', 0.3),
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              '&:hover': { bgcolor: RED },
            }}
          />
        ))}
      </Stack>
    </Box>
  );
}

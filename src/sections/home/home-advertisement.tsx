import { m } from 'framer-motion';
// @mui
import { useTheme, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// routes
import { paths } from 'src/routes/paths';
// components
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

const RED = '#DF2026';
const RED_DARK = '#A8171C';
const BLACK = '#060606';

// ----------------------------------------------------------------------

export default function HomeAdvertisement() {
  const theme = useTheme();

  const renderDescription = (
    <Box
      sx={{
        textAlign: {
          xs: 'center',
          md: 'left',
        },
        zIndex: 2,
      }}
    >
      <m.div variants={varFade().inDown}>
        {/* Overline */}
        <Stack 
          direction="row" 
          alignItems="center" 
          spacing={1.5} 
          justifyContent={{ xs: 'center', md: 'flex-start' }}
          sx={{ mb: 2 }}
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
            Level Up Today
          </Typography>
        </Stack>
      </m.div>

      <Box
        component={m.div}
        variants={varFade().inDown}
        sx={{ mb: 5 }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            textTransform: 'uppercase',
            lineHeight: 0.95,
            letterSpacing: -2,
            color: 'common.white',
            fontFamily: "'Poppins', sans-serif",
            fontSize: { xs: '2.5rem', md: '4.2rem' },
          }}
        >
          Get Started With <br />
          <Box component="span" sx={{ color: RED, fontStyle: 'italic', display: 'block' }}>
            Red Fitness.
          </Box>
        </Typography>
      </Box>

      <m.div variants={varFade().inRight}>
        <Button
          size="large"
          variant="contained"
          target="_blank"
          rel="noopener"
          href={paths.minimalUI}
          endIcon={<Iconify icon="solar:arrow-right-up-bold" width={18} />}
          sx={{
            borderRadius: 0, // Kotak tajam
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
          Explore Membership
        </Button>
      </m.div>
    </Box>
  );

  const renderImg = (
    <Stack component={m.div} variants={varFade().inUp} alignItems="center" sx={{ zIndex: 2 }}>
      <Box
        component={m.img}
        animate={{
          y: [-20, 0, -20],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        alt="dumbbell"
        src="/assets/images/home/dumbelll.webp"
        sx={{ maxWidth: { xs: 320, md: 460 }, dropShadow: `0px 20px 40px ${alpha(BLACK, 0.6)}` }}
      />
    </Stack>
  );

  return (
    <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: BLACK }}>
      <Container component={MotionViewport}>
        <Stack
          alignItems="center"
          direction={{ xs: 'column', md: 'row-reverse' }} // Dibalik agar gambar di kanan (opsional, bisa diganti 'row' jika ingin di kiri)
          justifyContent="space-between"
          spacing={5}
          sx={{
            background: `linear-gradient(135deg, ${RED_DARK} 0%, ${BLACK} 80%)`, // Gradasi merah ke hitam
            borderRadius: 0, // Container tajam
            border: `1px solid ${alpha(RED, 0.2)}`,
            px: { xs: 3, md: 8 },
            py: { xs: 8, md: 10 },
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative Glow Elements */}
          <Box
            sx={{
              position: 'absolute',
              top: -100,
              right: -100,
              width: 400,
              height: 400,
              borderRadius: '50%',
              background: alpha(RED, 0.15),
              filter: 'blur(80px)',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />

          {renderImg}
          {renderDescription}
        </Stack>
      </Container>
    </Box>
  );
}
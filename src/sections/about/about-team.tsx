import { m } from 'framer-motion';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

export default function HomeGoalsAndDualCTA() {
  const theme = useTheme();

  const renderGoalsSection = (
    <Container component={MotionViewport} sx={{ py: { xs: 10, md: 15 }, position: 'relative', zIndex: 2 }}>
      <Grid container spacing={{ xs: 5, md: 8 }} alignItems="center">
        {/* TEKS & KONTEN (KIRI) */}
        <Grid xs={12} md={6}>
          <m.div variants={varFade().inLeft}>
            <Typography variant="h2" sx={{ mb: 2, fontWeight: 900, textTransform: 'uppercase', color: 'common.white' }}>
              CRUSH THOSE <br />
              <Box component="span" sx={{ color: 'common.white', opacity: 0.7 }}>GOALS</Box>
            </Typography>

            <Typography sx={{ color: 'text.primary', mb: 4 }}>
              Ready for a fresh twist to your routine? Make it personal with our StarMakers Personal Training Packages.
            </Typography>

            {/* Feature Box */}
            <Box
              sx={{
                p: 3,
                mb: 4,
                borderRadius: 2,
                bgcolor: alpha(theme.palette.common.white, 0.05),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
              }}
            >
              <Stack spacing={2}>
                {[
                  'Your road to greatness includes a personalized plan tailored to your goals, strengths and style.',
                  'Get motivating feedback and supercharged, supervised workouts for maximum results and total fun.',
                ].map((text, index) => (
                  <Stack key={index} direction="row" alignItems="flex-start" spacing={2}>
                    <Iconify icon="solar:star-bold" width={24} sx={{ color: '#ff0055', mt: 0.5, flexShrink: 0 }} />
                    <Typography variant="body2" sx={{ color: 'common.white' }}>
                      {text}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>

            <Button
              variant="contained"
              size="large"
              color="primary" // Cyan/Teal
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
        </Grid>

        {/* GAMBAR (KANAN) */}
        <Grid xs={12} md={6}>
          <m.div variants={varFade().inRight}>
            <Box
              sx={{
                position: 'relative',
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: `-40px 40px 80px ${alpha(theme.palette.common.black, 0.48)}`,
              }}
            >
              <Image
                alt="crush goals"
                src="/assets/images/pexels-kuldeep-singhania-1111658-2105493.jpg" // Ganti dengan gambar pria jaket biru camo
                ratio="3/4"
                sx={{
                  transition: 'transform 0.5s ease',
                  '&:hover': { transform: 'scale(1.05)' },
                }}
              />
            </Box>
          </m.div>
        </Grid>
      </Grid>
    </Container>
  );

  const renderDualCTA = (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, width: 1 }}>
      {/* BAGIAN KIRI: TRY US FOR FREE */}
      <Box
        sx={{
          flex: 1,
          py: { xs: 8, md: 10 },
          px: { xs: 3, md: 5 },
          textAlign: 'center',
          background: `linear-gradient(135deg, #8c1818 0%, #450c3b 100%)`, // Gradient Ungu Biru
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <m.div variants={varFade().inUp}>
          <Typography variant="h3" sx={{ color: 'common.white', mb: 2, fontWeight: 900, textTransform: 'uppercase' }}>
            TRY US FOR FREE
          </Typography>
          <Typography sx={{ color: 'common.white', opacity: 0.8, mb: 4 }}>
            Get an exclusive FREE TRIAL experience. No strings attached.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            endIcon={<Iconify icon="solar:arrow-right-up-bold" />}
            sx={{ borderRadius: 50, px: 5, fontWeight: 'bold' }}
          >
            TRY NOW
          </Button>
        </m.div>
      </Box>

      {/* BAGIAN KANAN: CORPORATE DEAL */}
      <Box
        sx={{
          flex: 1,
          py: { xs: 8, md: 10 },
          px: { xs: 3, md: 5 },
          textAlign: 'center',
          background: `linear-gradient(135deg, #9a1b96 0%, #8c1414 100%)`, // Gradient Ungu Pink/Magenta
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <m.div variants={varFade().inUp}>
          <Typography variant="h3" sx={{ color: 'common.white', mb: 2, fontWeight: 900, textTransform: 'uppercase' }}>
            LOOKING FOR A <br /> CORPORATE DEAL?
          </Typography>
          <Typography sx={{ color: 'common.white', opacity: 0.8, mb: 4 }}>
            Get an exclusive FREE TRIAL experience. No strings attached.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            endIcon={<Iconify icon="solar:arrow-right-up-bold" />}
            sx={{ borderRadius: 50, px: 5, fontWeight: 'bold' }}
          >
            CHECK OUT NOW
          </Button>
        </m.div>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ bgcolor: '#090101', overflow: 'hidden' }}>
      {renderGoalsSection}
      {renderDualCTA}
    </Box>
  );
}
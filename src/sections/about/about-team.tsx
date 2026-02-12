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

// DEFINISI WARNA SESUAI REQUEST
export const COLORS = {
  red: '#D40000',
  redDark: '#8a0000', // Variasi gelap untuk gradient
  black: '#000000',
  white: '#ffffff',
};

export default function HomeGoalsAndDualCTA() {
  const theme = useTheme();

  const renderGoalsSection = (
    <Container component={MotionViewport} sx={{ py: { xs: 10, md: 15 }, position: 'relative', zIndex: 2 }}>
      <Grid container spacing={{ xs: 5, md: 8 }} alignItems="center">
        {/* TEKS & KONTEN (KIRI) */}
        <Grid xs={12} md={6}>
          <m.div variants={varFade().inLeft}>
            <Typography 
              variant="h2" 
              sx={{ 
                mb: 2, 
                fontWeight: 900, 
                textTransform: 'uppercase', 
                color: COLORS.white 
              }}
            >
              CRUSH THOSE <br />
              <Box component="span" sx={{ color: COLORS.red }}>GOALS</Box>
            </Typography>

            <Typography sx={{ color: 'text.secondary', mb: 4 }}>
              Ready for a fresh twist to your routine? Make it personal with our StarMakers Personal Training Packages.
            </Typography>

            {/* Feature Box */}
            <Box
              sx={{
                p: 3,
                mb: 4,
                borderRadius: 2,
                bgcolor: alpha(COLORS.white, 0.05), // Sedikit transparan putih di atas hitam
                border: `1px solid ${alpha(COLORS.red, 0.3)}`, // Border merah tipis
              }}
            >
              <Stack spacing={2}>
                {[
                  'Your road to greatness includes a personalized plan tailored to your goals, strengths and style.',
                  'Get motivating feedback and supercharged, supervised workouts for maximum results and total fun.',
                ].map((text, index) => (
                  <Stack key={index} direction="row" alignItems="flex-start" spacing={2}>
                    {/* Ikon Bintang Merah */}
                    <Iconify 
                      icon="solar:star-bold" 
                      width={24} 
                      sx={{ color: COLORS.red, mt: 0.5, flexShrink: 0 }} 
                    />
                    <Typography variant="body2" sx={{ color: COLORS.white }}>
                      {text}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>

            <Button
              variant="contained"
              size="large"
              endIcon={<Iconify icon="solar:arrow-right-up-bold" />}
              sx={{
                bgcolor: COLORS.red,
                color: COLORS.white,
                borderRadius: 50,
                px: 4,
                fontWeight: 'bold',
                boxShadow: `0 8px 16px 0 ${alpha(COLORS.red, 0.4)}`, // Shadow merah
                '&:hover': {
                  bgcolor: COLORS.redDark, // Gelap saat hover
                }
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
                boxShadow: `-40px 40px 80px ${alpha(COLORS.red, 0.15)}`, // Glow merah tipis di belakang gambar
                border: `1px solid ${alpha(COLORS.white, 0.1)}`,
              }}
            >
              <Image
                alt="crush goals"
                src="/assets/images/home/crush_goals.jpg" 
                ratio="3/4"
                sx={{
                  transition: 'transform 0.5s ease',
                  '&:hover': { transform: 'scale(1.05)' },
                }}
              />
               {/* Overlay Gradient Merah di bawah gambar */}
               <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: 1,
                    height: '50%',
                    background: `linear-gradient(to top, ${COLORS.black} 0%, transparent 100%)`,
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
      {/* BAGIAN KIRI: TRY US FOR FREE (Black -> Dark Red) */}
      <Box
        sx={{
          flex: 1,
          py: { xs: 8, md: 10 },
          px: { xs: 3, md: 5 },
          textAlign: 'center',
          // Gradient Hitam ke Merah Gelap
          background: `linear-gradient(135deg, ${COLORS.black} 0%, ${COLORS.redDark} 100%)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderRight: { md: `1px solid ${alpha(COLORS.white, 0.1)}` }
        }}
      >
        <m.div variants={varFade().inUp}>
          <Typography variant="h3" sx={{ color: COLORS.white, mb: 2, fontWeight: 900, textTransform: 'uppercase' }}>
            TRY US FOR FREE
          </Typography>
          <Typography sx={{ color: COLORS.white, opacity: 0.8, mb: 4 }}>
            Get an exclusive FREE TRIAL experience. No strings attached.
          </Typography>
          <Button
            variant="contained"
            size="large"
            endIcon={<Iconify icon="solar:arrow-right-up-bold" />}
            sx={{ 
                borderRadius: 50, 
                px: 5, 
                fontWeight: 'bold',
                bgcolor: COLORS.white,
                color: COLORS.black, // Tombol Putih text Hitam (Kontras)
                '&:hover': { bgcolor: alpha(COLORS.white, 0.9) }
            }}
          >
            TRY NOW
          </Button>
        </m.div>
      </Box>

      {/* BAGIAN KANAN: CORPORATE DEAL (Red -> Dark Red) */}
      <Box
        sx={{
          flex: 1,
          py: { xs: 8, md: 10 },
          px: { xs: 3, md: 5 },
          textAlign: 'center',
          // Gradient Merah Terang ke Merah Gelap
          background: `linear-gradient(135deg, ${COLORS.red} 0%, ${COLORS.redDark} 100%)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <m.div variants={varFade().inUp}>
          <Typography variant="h3" sx={{ color: COLORS.white, mb: 2, fontWeight: 900, textTransform: 'uppercase' }}>
            LOOKING FOR A <br /> CORPORATE DEAL?
          </Typography>
          <Typography sx={{ color: COLORS.white, opacity: 0.8, mb: 4 }}>
            Get an exclusive FREE TRIAL experience. No strings attached.
          </Typography>
          <Button
            variant="contained"
            size="large"
            endIcon={<Iconify icon="solar:arrow-right-up-bold" />}
            sx={{ 
                borderRadius: 50, 
                px: 5, 
                fontWeight: 'bold',
                bgcolor: COLORS.black, // Tombol Hitam di atas background Merah
                color: COLORS.white,
                '&:hover': { bgcolor: alpha(COLORS.black, 0.8) }
            }}
          >
            CHECK OUT NOW
          </Button>
        </m.div>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ bgcolor: COLORS.black, overflow: 'hidden' }}>
      {renderGoalsSection}
      {renderDualCTA}
    </Box>
  );
}
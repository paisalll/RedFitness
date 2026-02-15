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

export default function ClubsDualCTA() {
  const theme = useTheme();

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
      {renderDualCTA}
    </Box>
  );
}
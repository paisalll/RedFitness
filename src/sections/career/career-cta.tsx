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
// hooks
import { useSectionContent } from 'src/hooks/use-page-content';

// ----------------------------------------------------------------------

// DEFINISI WARNA SESUAI REQUEST
export const COLORS = {
  red: '#DF2026',
  redDark: '#A8171C',
  black: '#000000',
  white: '#ffffff',
};

export default function CareerDualCTA() {
  const theme = useTheme();
  const content = useSectionContent('career', 'cta');

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
            {content.trial_title}
          </Typography>
          <Typography sx={{ color: COLORS.white, opacity: 0.8, mb: 4 }}>
            {content.trial_description}
          </Typography>
          <Button
            variant="contained"
            size="large"
            endIcon={<Iconify icon="solar:arrow-right-up-bold" />}
            sx={{
                borderRadius: 0.5,
                px: 5,
                fontWeight: 700,
                letterSpacing: 1,
                bgcolor: COLORS.white,
                color: COLORS.black,
                boxShadow: 'none',
                '&:hover': { bgcolor: alpha(COLORS.white, 0.9), boxShadow: 'none' }
            }}
          >
            {content.trial_button}
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
            {content.corp_title}
          </Typography>
          <Typography sx={{ color: COLORS.white, opacity: 0.8, mb: 4 }}>
            {content.corp_description}
          </Typography>
          <Button
            variant="contained"
            size="large"
            endIcon={<Iconify icon="solar:arrow-right-up-bold" />}
            sx={{
                borderRadius: 0.5,
                px: 5,
                fontWeight: 700,
                letterSpacing: 1,
                bgcolor: COLORS.black,
                color: COLORS.white,
                boxShadow: 'none',
                '&:hover': { bgcolor: alpha(COLORS.black, 0.8), boxShadow: 'none' }
            }}
          >
            {content.corp_button}
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
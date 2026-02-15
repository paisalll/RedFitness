import { m } from 'framer-motion';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

const COLORS = {
    red: '#D40000',
    redDark: '#8a0000',
    black: '#000000',
    white: '#FFFFFF',
};

export default function ClassesTimetableCTA() {
    const theme = useTheme();

    return (
        <Box sx={{ bgcolor: COLORS.black, overflow: 'hidden' }}>
        
        {/* SECTION 1: CLASS TIMES OF THE WEEK */}
        <Box 
            sx={{ 
            py: { xs: 10, md: 15 }, 
            textAlign: 'center',
            position: 'relative',
            borderBottom: `1px solid ${alpha(COLORS.white, 0.1)}`
            }}
        >
            <Container component={MotionViewport}>
            <m.div variants={varFade().inUp}>
                <Typography variant="h2" sx={{ color: COLORS.white, fontWeight: 900, textTransform: 'uppercase', mb: 2 }}>
                CLASS TIMES OF <Box component="span" sx={{ color: COLORS.red }}>THE WEEK</Box>
                </Typography>
                
                <Typography sx={{ color: 'text.secondary', mb: 5 }}>
                Book our classes up to 6 days before they started.
                </Typography>

                <Button
                variant="contained"
                size="large"
                endIcon={<Iconify icon="solar:arrow-right-up-bold" />}
                sx={{
                    bgcolor: COLORS.red, // Tombol Merah
                    color: COLORS.white,
                    borderRadius: 50,
                    px: 5,
                    py: 1.5,
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    boxShadow: `0 8px 16px 0 ${alpha(COLORS.red, 0.4)}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                    bgcolor: COLORS.redDark,
                    transform: 'translateY(-3px)',
                    boxShadow: `0 12px 24px 0 ${alpha(COLORS.red, 0.5)}`,
                    }
                }}
                >
                VIEW TIMETABLE
                </Button>
            </m.div>
            </Container>
        </Box>

        {/* SECTION 2: DUAL CTA BANNER (TRY US FOR FREE & CORPORATE DEAL) */}
        <Stack direction={{ xs: 'column', md: 'row' }} sx={{ width: 1 }}>
            
            {/* KIRI: TRY US FOR FREE */}
            <Box
            sx={{
                flex: 1,
                py: { xs: 8, md: 12 },
                px: { xs: 3, md: 5 },
                textAlign: 'center',
                // Gradient Hitam ke Merah Gelap
                background: `linear-gradient(135deg, ${COLORS.black} 0%, ${COLORS.redDark} 100%)`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                borderRight: { md: `1px solid ${alpha(COLORS.white, 0.1)}` },
                borderBottom: { xs: `1px solid ${alpha(COLORS.white, 0.1)}`, md: 'none' }
            }}
            >
            <m.div variants={varFade().inLeft}>
                <Typography variant="h3" sx={{ color: COLORS.white, fontWeight: 900, textTransform: 'uppercase', mb: 2 }}>
                TRY US FOR FREE
                </Typography>
                <Typography sx={{ color: alpha(COLORS.white, 0.7), mb: 4, maxWidth: 400 }}>
                Get an exclusive FREE TRIAL experience. No strings attached.
                </Typography>
                
                <Button
                variant="contained"
                size="large"
                endIcon={<Iconify icon="solar:arrow-right-up-bold" />}
                sx={{
                    bgcolor: COLORS.white, // Tombol Putih Kontras
                    color: COLORS.black,
                    borderRadius: 50,
                    px: 5,
                    fontWeight: 'bold',
                    '&:hover': { bgcolor: alpha(COLORS.white, 0.9) }
                }}
                >
                TRY NOW
                </Button>
            </m.div>
            </Box>

            {/* KANAN: CORPORATE DEAL */}
            <Box
            sx={{
                flex: 1,
                py: { xs: 8, md: 12 },
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
            <m.div variants={varFade().inRight}>
                <Typography variant="h3" sx={{ color: COLORS.white, fontWeight: 900, textTransform: 'uppercase', mb: 2 }}>
                LOOKING FOR A <br /> CORPORATE DEAL?
                </Typography>
                <Typography sx={{ color: alpha(COLORS.white, 0.8), mb: 4, maxWidth: 400 }}>
                Get an exclusive FREE TRIAL experience. No strings attached.
                </Typography>
                
                <Button
                variant="contained"
                size="large"
                endIcon={<Iconify icon="solar:arrow-right-up-bold" />}
                sx={{
                    bgcolor: COLORS.black, // Tombol Hitam Kontras di atas Merah
                    color: COLORS.white,
                    borderRadius: 50,
                    px: 5,
                    fontWeight: 'bold',
                    '&:hover': { bgcolor: alpha(COLORS.black, 0.8) }
                }}
                >
                CHECK OUT NOW
                </Button>
            </m.div>
            </Box>

        </Stack>

        </Box>
    );
}
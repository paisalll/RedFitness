import { m } from 'framer-motion';
// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

const RED = '#DF2026';
const RED_DARK = '#A8171C';
const BLACK = '#060606';

export default function ClassesTimetableCTA() {
    return (
        <Box sx={{ bgcolor: BLACK, overflow: 'hidden' }}>
        
        {/* SECTION 1: CLASS TIMES OF THE WEEK */}
        <Box 
            sx={{ 
            py: { xs: 10, md: 15 }, 
            textAlign: 'center',
            position: 'relative',
            borderTop: `1px solid ${alpha(RED, 0.15)}`,
            borderBottom: `1px solid ${alpha(RED, 0.15)}`
            }}
        >
            <Container component={MotionViewport}>
            <m.div variants={varFade().inUp}>
                <Stack direction="row" alignItems="center" justifyContent="center" spacing={1.5} sx={{ mb: 2 }}>
                    <Box sx={{ width: 28, height: 2, bgcolor: RED }} />
                    <Typography sx={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: 4, textTransform: 'uppercase', color: RED, fontFamily: 'monospace' }}>
                        Schedule
                    </Typography>
                    <Box sx={{ width: 28, height: 2, bgcolor: RED }} />
                </Stack>

                <Typography variant="h2" sx={{ color: '#fff', fontWeight: 800, textTransform: 'uppercase', mb: 3, fontFamily: "'Poppins', sans-serif", letterSpacing: -2, lineHeight: 0.9 }}>
                Class Times Of <br/> <Box component="span" sx={{ color: RED, fontStyle: 'italic' }}>The Week.</Box>
                </Typography>
                
                <Typography sx={{ color: alpha('#fff', 0.6), mb: 5, fontSize: '0.9rem' }}>
                Book our classes up to 6 days before they started.
                </Typography>

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
                    fontWeight: 800,
                    fontSize: '0.72rem',
                    fontFamily: 'monospace',
                    textTransform: 'uppercase',
                    letterSpacing: 2,
                    boxShadow: 'none',
                    '&:hover': {
                        bgcolor: RED_DARK,
                        boxShadow: 'none',
                    }
                }}
                >
                View Timetable
                </Button>
            </m.div>
            </Container>
        </Box>

        {/* SECTION 2: DUAL CTA BANNER */}
        <Stack direction={{ xs: 'column', md: 'row' }} sx={{ width: 1 }}>
            
            {/* KIRI: TRY US FOR FREE */}
            <Box
            sx={{
                flex: 1,
                py: { xs: 10, md: 15 },
                px: { xs: 3, md: 8 },
                textAlign: 'center',
                background: `linear-gradient(135deg, ${BLACK} 0%, ${RED_DARK} 100%)`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                borderRight: { md: `1px solid ${alpha('#fff', 0.1)}` },
                borderBottom: { xs: `1px solid ${alpha('#fff', 0.1)}`, md: 'none' }
            }}
            >
            <m.div variants={varFade().inLeft}>
                <Stack direction="row" alignItems="center" justifyContent="center" spacing={1.5} sx={{ mb: 2 }}>
                    <Box sx={{ width: 20, height: 2, bgcolor: RED }} />
                    <Typography sx={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: 4, textTransform: 'uppercase', color: RED, fontFamily: 'monospace' }}>
                        Trial Access
                    </Typography>
                </Stack>
                <Typography variant="h2" sx={{ color: '#fff', mb: 2, fontWeight: 800, textTransform: 'uppercase', fontFamily: "'Poppins', sans-serif", letterSpacing: -2, lineHeight: 0.95 }}>
                Try Us <br /> For <Box component="span" sx={{ fontStyle: 'italic', color: RED }}>Free.</Box>
                </Typography>
                <Typography sx={{ color: alpha('#fff', 0.6), mb: 5, maxWidth: 320, fontSize: '0.9rem', mx: 'auto' }}>
                Get an exclusive FREE TRIAL experience. No strings attached.
                </Typography>
                
                <Button
                variant="contained"
                size="large"
                endIcon={<Iconify icon="solar:arrow-right-up-bold" />}
                sx={{
                    bgcolor: '#fff',
                    color: BLACK,
                    borderRadius: 0, // Sharp
                    px: 5,
                    py: 1.75,
                    fontWeight: 800,
                    fontFamily: 'monospace',
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    boxShadow: 'none',
                    '&:hover': { bgcolor: alpha('#fff', 0.9), boxShadow: 'none' }
                }}
                >
                Try Now
                </Button>
            </m.div>
            </Box>

            {/* KANAN: CORPORATE DEAL */}
            <Box
            sx={{
                flex: 1,
                py: { xs: 10, md: 15 },
                px: { xs: 3, md: 8 },
                textAlign: 'center',
                bgcolor: '#080808',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            >
            <m.div variants={varFade().inRight}>
                <Stack direction="row" alignItems="center" justifyContent="center" spacing={1.5} sx={{ mb: 2 }}>
                    <Typography sx={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: 4, textTransform: 'uppercase', color: RED, fontFamily: 'monospace' }}>
                        B2B Solutions
                    </Typography>
                    <Box sx={{ width: 20, height: 2, bgcolor: RED }} />
                </Stack>
                <Typography variant="h2" sx={{ color: '#fff', mb: 2, fontWeight: 800, textTransform: 'uppercase', fontFamily: "'Poppins', sans-serif", letterSpacing: -2, lineHeight: 0.95 }}>
                Corporate <br /> <Box component="span" sx={{ fontStyle: 'italic', color: RED }}>Deal.</Box>
                </Typography>
                <Typography sx={{ color: alpha('#fff', 0.6), mb: 5, maxWidth: 320, fontSize: '0.9rem', mx: 'auto' }}>
                Elevate your team's performance with our tailored corporate memberships.
                </Typography>
                
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
                    fontWeight: 800,
                    fontFamily: 'monospace',
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    boxShadow: 'none',
                    '&:hover': { bgcolor: RED_DARK, boxShadow: 'none' }
                }}
                >
                Check Out Now
                </Button>
            </m.div>
            </Box>

        </Stack>

        </Box>
    );
}
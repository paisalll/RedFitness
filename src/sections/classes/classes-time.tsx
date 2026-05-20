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
// hooks
import { useSectionContent } from 'src/hooks/use-page-content';

// ----------------------------------------------------------------------

const RED = '#DF2026';
const RED_DARK = '#A8171C';
const BLACK = '#060606';

export default function ClassesTimetableCTA() {
    const content = useSectionContent('classes', 'time');
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
                        {content.schedule_eyebrow}
                    </Typography>
                    <Box sx={{ width: 28, height: 2, bgcolor: RED }} />
                </Stack>

                <Typography variant="h2" sx={{ color: '#fff', fontWeight: 800, textTransform: 'uppercase', mb: 3, fontFamily: "'Poppins', sans-serif", letterSpacing: -2, lineHeight: 0.9 }}>
                {content.schedule_title} <br/> <Box component="span" sx={{ color: RED, fontStyle: 'italic' }}>{content.schedule_highlight}</Box>
                </Typography>

                <Typography sx={{ color: alpha('#fff', 0.6), mb: 5, fontSize: '0.9rem' }}>
                {content.schedule_description}
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
                {content.schedule_button}
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
                        {content.trial_eyebrow}
                    </Typography>
                </Stack>
                <Typography variant="h2" sx={{ color: '#fff', mb: 2, fontWeight: 800, textTransform: 'uppercase', fontFamily: "'Poppins', sans-serif", letterSpacing: -2, lineHeight: 0.95 }}>
                {content.trial_title} <br /> <Box component="span" sx={{ fontStyle: 'italic', color: RED }}>{content.trial_title_highlight}</Box>
                </Typography>
                <Typography sx={{ color: alpha('#fff', 0.6), mb: 5, maxWidth: 320, fontSize: '0.9rem', mx: 'auto' }}>
                {content.trial_description}
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
                {content.trial_button}
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
                        {content.corp_eyebrow}
                    </Typography>
                    <Box sx={{ width: 20, height: 2, bgcolor: RED }} />
                </Stack>
                <Typography variant="h2" sx={{ color: '#fff', mb: 2, fontWeight: 800, textTransform: 'uppercase', fontFamily: "'Poppins', sans-serif", letterSpacing: -2, lineHeight: 0.95 }}>
                {content.corp_title} <br /> <Box component="span" sx={{ fontStyle: 'italic', color: RED }}>{content.corp_title_highlight}</Box>
                </Typography>
                <Typography sx={{ color: alpha('#fff', 0.6), mb: 5, maxWidth: 320, fontSize: '0.9rem', mx: 'auto' }}>
                {content.corp_description}
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
                {content.corp_button}
                </Button>
            </m.div>
            </Box>

        </Stack>

        </Box>
    );
}
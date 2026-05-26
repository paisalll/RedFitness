import { m } from 'framer-motion';
// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';
// hooks
import { useSectionContent } from 'src/hooks/use-page-content';

// ----------------------------------------------------------------------

const RED = '#DF2026';
const BLACK = '#060606';

const HIGHLIGHT_IMAGES = [
    '/assets/background/HIGHLIGHT/36.webp',
    '/assets/background/HIGHLIGHT/35.webp',
    '/assets/background/HIGHLIGHT/34.webp',
];

export default function HighlightsList() {
    const content = useSectionContent('highlights', 'list');
    const HIGHLIGHTS = HIGHLIGHT_IMAGES.map((image, i) => ({ image, title: content[`item${i + 1}_title`] || '' }));
    return (
        <Box sx={{ bgcolor: BLACK, py: { xs: 10, md: 15 }, color: '#fff', borderTop: `1px solid ${alpha(RED, 0.15)}` }}>
        <Container component={MotionViewport}>
            
            {/* HEADER */}
            <Stack spacing={5} sx={{ mb: 8 }} alignItems="center">
            <m.div variants={varFade().inDown}>
                <Stack direction="row" alignItems="center" justifyContent="center" spacing={1.5} sx={{ mb: 2 }}>
                    <Box sx={{ width: 28, height: 2, bgcolor: RED }} />
                    <Typography sx={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: 4, textTransform: 'uppercase', color: RED, fontFamily: 'monospace' }}>
                        {content.eyebrow}
                    </Typography>
                    <Box sx={{ width: 28, height: 2, bgcolor: RED }} />
                </Stack>
                <Typography
                variant="h2"
                sx={{
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: -2,
                    lineHeight: 0.9,
                    fontFamily: "'Poppins', sans-serif",
                    textAlign: 'center'
                }}
                >
                {content.title} <br/> <Box component="span" sx={{ color: RED, fontStyle: 'italic' }}>{content.title_highlight}</Box>
                </Typography>
            </m.div>
            </Stack>

            {/* HIGHLIGHTS GRID */}
            <Grid container spacing={3}>
            {HIGHLIGHTS.map((item, index) => (
                <Grid key={index} xs={12} sm={6} md={4}>
                <m.div variants={varFade().inUp} style={{ height: '100%' }}>
                    <Card
                    sx={{
                        bgcolor: '#080808',
                        borderRadius: 0, // Sharp
                        border: `1px solid ${alpha(RED, 0.15)}`,
                        borderLeft: `3px solid ${RED}`,
                        boxShadow: 'none',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        '&:hover': {
                        transform: 'translateY(-8px)',
                        bgcolor: '#0c0c0c',
                        borderColor: alpha(RED, 0.5),
                        '& .arrow-box': {
                            bgcolor: RED,
                            color: '#fff',
                            borderColor: RED
                        },
                        '& .highlight-img': { transform: 'scale(1.05)' },
                        }
                    }}
                    >
                    {/* Image Area */}
                    <Box sx={{ position: 'relative', pt: '65%', overflow: 'hidden' }}>
                        <Image
                        alt={item.title}
                        src={item.image}
                        className="highlight-img"
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: 1,
                            height: 1,
                            transition: 'transform 0.5s ease',
                        }}
                        />
                        {/* Overlay Gradien pada gambar agar menyatu dengan background */}
                        <Box sx={{ position: 'absolute', top: 0, left: 0, width: 1, height: 1, background: `linear-gradient(to bottom, transparent 40%, ${BLACK} 100%)` }} />
                    </Box>

                    {/* Content Area */}
                    <CardContent 
                        sx={{ 
                        flexGrow: 1, 
                        display: 'flex', 
                        flexDirection: 'column', 
                        justifyContent: 'space-between',
                        bgcolor: '#080808',
                        p: 3 
                        }}
                    >
                        <Box>
                            <Typography variant="overline" sx={{ color: RED, fontFamily: 'monospace', mb: 0.5, display: 'block', letterSpacing: 2 }}>
                                EVENT
                            </Typography>
                            <Typography 
                            variant="h6" 
                            sx={{ 
                                fontWeight: 800, 
                                textTransform: 'uppercase', 
                                lineHeight: 1.2,
                                mb: 3,
                                color: '#fff',
                                fontFamily: "'Poppins', sans-serif"
                            }}
                            >
                            {item.title}
                            </Typography>
                        </Box>

                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography sx={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: 1.5, fontFamily: 'monospace', color: RED, textTransform: 'uppercase' }}>
                                Read More
                            </Typography>
                            <IconButton
                                className="arrow-box"
                                size="small"
                                sx={{
                                borderRadius: 0, // Sharp
                                bgcolor: BLACK,
                                color: alpha('#fff', 0.5),
                                transition: 'all 0.3s ease',
                                border: `1px solid ${alpha('#fff', 0.1)}`,
                                }}
                            >
                                <Iconify icon="solar:arrow-right-up-bold" width={18} />
                            </IconButton>
                        </Stack>
                    </CardContent>
                    </Card>
                </m.div>
                </Grid>
            ))}
            </Grid>

        </Container>
        </Box>
    );
}
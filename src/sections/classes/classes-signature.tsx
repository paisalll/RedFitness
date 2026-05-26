import { useRef, useState } from 'react';
import { m } from 'framer-motion';
// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/navigation';
// @ts-ignore
import 'swiper/css/pagination';
// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';
// hooks
import { useSectionContent } from 'src/hooks/use-page-content';

// ----------------------------------------------------------------------

const RED = '#DF2026';
const BLACK = '#060606';

const CLASS_IMAGES = [
    { id: '01', image: '/assets/background/CLASSES/s1.webp' },
    { id: '02', image: '/assets/background/CLASSES/s2.webp' },
    { id: '03', image: '/assets/background/CLASSES/s3.webp' },
    { id: '04', image: '/assets/background/CLASSES/s4.webp' },
    { id: '06', image: '/assets/background/CLASSES/s5.webp' },
];

export default function ClassesSignature() {
    const content = useSectionContent('classes', 'signature');
    const SIGNATURE_CLASSES = CLASS_IMAGES.map((c, i) => ({ ...c, title: content[`sig${i + 1}_title`] || c.id }));
    const swiperRef = useRef<SwiperType | null>(null);
    const [progress, setProgress] = useState(0);

    const handleSlideChange = (swiper: SwiperType) => {
        const slidesPerView = typeof swiper.params.slidesPerView === 'number' 
            ? swiper.params.slidesPerView 
            : 1;

        const totalScrollableSlides = swiper.slides.length - slidesPerView;

        if (totalScrollableSlides <= 0) {
            setProgress(100);
            return;
        }

        const progressValue = (swiper.activeIndex / totalScrollableSlides) * 100;
        const safeProgress = Math.min(Math.max(progressValue, 0), 100); 
        setProgress(safeProgress);
    };

    return (
        <Box sx={{ bgcolor: BLACK, py: { xs: 10, md: 15 }, overflow: 'hidden' }}>
        <Container component={MotionViewport}>
            
            {/* HEADER SECTION */}
            <Box sx={{ textAlign: 'center', mb: 10 }}>
            <m.div variants={varFade().inDown}>
                <Stack direction="row" alignItems="center" justifyContent="center" spacing={1.5} sx={{ mb: 2 }}>
                    <Box sx={{ width: 28, height: 2, bgcolor: RED }} />
                    <Typography sx={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: 4, textTransform: 'uppercase', color: RED, fontFamily: 'monospace' }}>
                        {content.eyebrow}
                    </Typography>
                    <Box sx={{ width: 28, height: 2, bgcolor: RED }} />
                </Stack>
                <Typography variant="h2" sx={{ color: '#fff', fontWeight: 800, textTransform: 'uppercase', mb: 3, fontFamily: "'Poppins', sans-serif", letterSpacing: -2, lineHeight: 0.9 }}>
                {content.title} <Box component="span" sx={{ color: RED, fontStyle: 'italic' }}>{content.title_highlight}</Box>
                </Typography>
                <Typography sx={{ color: alpha('#fff', 0.6), maxWidth: 500, mx: 'auto', fontSize: '0.9rem' }}>
                {content.description}
                </Typography>
            </m.div>
            </Box>

            {/* SLIDER SECTION */}
            <m.div variants={varFade().inUp}>
            <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                onSlideChange={handleSlideChange}
                modules={[Navigation]}
                spaceBetween={24}
                slidesPerView={1.2} 
                breakpoints={{
                    640: { slidesPerView: 2.2 },
                    1024: { slidesPerView: 3.5 }, 
                }}
                style={{ overflow: 'visible' }}
            >
                {SIGNATURE_CLASSES.map((item) => (
                <SwiperSlide key={item.id}>
                    <Card 
                    sx={{ 
                        bgcolor: 'transparent', 
                        boxShadow: 'none', 
                        borderRadius: 0, // Sharp
                        position: 'relative',
                        transition: 'transform 0.3s',
                        '&:hover': { transform: 'translateY(-8px)' }
                    }}
                    >
                    {/* Image Container */}
                    <Box sx={{ borderRadius: 0, overflow: 'hidden', mb: 3, border: `1px solid ${alpha('#fff', 0.1)}` }}>
                        <Image 
                        alt={item.title} 
                        src={item.image} 
                        ratio="4/3" 
                        sx={{ 
                            transition: 'transform 0.5s',
                            '&:hover': { transform: 'scale(1.05)' } 
                        }} 
                        />
                    </Box>

                    {/* Content */}
                    <Stack spacing={1}>
                        <Typography 
                        variant="overline" 
                        sx={{ color: RED, fontFamily: 'monospace', letterSpacing: 2, display: 'block' }}
                        >
                        CLASS {item.id}
                        </Typography>
                        
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="h5" sx={{ color: '#fff', fontWeight: 800, textTransform: 'uppercase', fontFamily: "'Poppins', sans-serif" }}>
                            {item.title}
                        </Typography>
                        
                        <Iconify 
                            icon="solar:arrow-right-up-bold" 
                            sx={{ color: RED, width: 24, height: 24 }} 
                        />
                        </Stack>
                    </Stack>
                    </Card>
                </SwiperSlide>
                ))}
            </Swiper>
            </m.div>

            {/* CONTROLS & PROGRESS BAR */}
            <Stack 
            direction="row" 
            alignItems="center" 
            justifyContent="space-between" 
            sx={{ mt: 8 }}
            >
            {/* Progress Bar */}
            <Box 
                sx={{ 
                height: 2, 
                flexGrow: 1, 
                bgcolor: alpha('#fff', 0.1), 
                mr: 5, 
                position: 'relative',
                borderRadius: 0 // Sharp
                }}
            >
                <Box 
                sx={{ 
                    position: 'absolute', 
                    left: 0, 
                    top: 0, 
                    height: 1, 
                    width: `${Math.max(15, progress)}%`, 
                    bgcolor: RED,
                    transition: 'width 0.3s ease'
                }} 
                />
            </Box>

            {/* Navigation Arrows */}
            <Stack direction="row" spacing={2}>
                <IconButton
                onClick={() => swiperRef.current?.slidePrev()}
                sx={{
                    borderRadius: 0, // Sharp
                    border: `1px solid ${alpha('#fff', 0.2)}`,
                    color: '#fff',
                    '&:hover': { borderColor: RED, color: '#fff', bgcolor: RED }
                }}
                >
                <Iconify icon="eva:arrow-back-fill" />
                </IconButton>

                <IconButton
                onClick={() => swiperRef.current?.slideNext()}
                sx={{
                    borderRadius: 0, // Sharp
                    border: `1px solid ${alpha('#fff', 0.2)}`,
                    color: '#fff',
                    '&:hover': { borderColor: RED, color: '#fff', bgcolor: RED }
                }}
                >
                <Iconify icon="eva:arrow-forward-fill" />
                </IconButton>
            </Stack>
            </Stack>

            {/* BOTTOM CTA LINK */}
            <Box sx={{ textAlign: 'center', mt: 15 }}>
            <m.div variants={varFade().inUp}>
                <Typography 
                    variant="h4" 
                    sx={{ 
                        fontWeight: 900, 
                        textTransform: 'uppercase', 
                        color: '#fff',
                        display: 'inline-flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                        transition: 'color 0.3s',
                        fontFamily: "'Poppins', sans-serif",
                        '&:hover': { color: RED }
                    }}
                >
                    {content.cta_link}
                    <Iconify icon="solar:arrow-right-up-bold" sx={{ ml: 1, width: 28, height: 28 }} />
                </Typography>
            </m.div>
            </Box>

        </Container>
        </Box>
    );
}
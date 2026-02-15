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
import { alpha, useTheme } from '@mui/material/styles';
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

// ----------------------------------------------------------------------

const COLORS = {
    red: '#D40000',
    black: '#000000',
    white: '#FFFFFF',
};

// Data Mockup Kelas (Ganti src gambar dengan asset kamu)
const SIGNATURE_CLASSES = [
    { id: '01', title: 'DNA FLAVOR', image: '/assets/images/classes/class_1.jpg' },
    { id: '02', title: 'DNA MASK', image: '/assets/images/classes/class_2.jpg' },
    { id: '03', title: 'DNA INSANITY', image: '/assets/images/classes/class_3.jpg' },
    { id: '04', title: 'SALTAR', image: '/assets/images/classes/class_4.jpg' },
    { id: '05', title: 'DNA RAW', image: '/assets/images/classes/class_5.jpg' },
    { id: '06', title: 'DNA CORE', image: '/assets/images/classes/class_6.jpg' },
];

export default function ClassesSignature() {
    const theme = useTheme();
    const swiperRef = useRef<SwiperType | null>(null);
    const [progress, setProgress] = useState(0);

    // Update progress bar saat slide berubah
    const handleSlideChange = (swiper: SwiperType) => {
    // 1. Ambil slidesPerView, pastikan tipenya number.
    // Jika 'auto' atau undefined, kita anggap 1 agar tidak error saat dibagi.
    const slidesPerView = typeof swiper.params.slidesPerView === 'number' 
        ? swiper.params.slidesPerView 
        : 1;

        // 2. Hitung total slide yang bisa digeser
        const totalScrollableSlides = swiper.slides.length - slidesPerView;

        // 3. Hindari pembagian dengan 0 atau angka negatif
        if (totalScrollableSlides <= 0) {
        setProgress(100);
        return;
        }

        // 4. Kalkulasi persentase
        const progressValue = (swiper.activeIndex / totalScrollableSlides) * 100;
        
        // 5. Batasi nilai antara 0 sampai 100 (Clamping)
        const safeProgress = Math.min(Math.max(progressValue, 0), 100); 
        
        setProgress(safeProgress);
    };

    return (
        <Box sx={{ bgcolor: COLORS.black, py: { xs: 10, md: 15 }, overflow: 'hidden' }}>
        <Container component={MotionViewport}>
            
            {/* HEADER SECTION */}
            <Box sx={{ textAlign: 'center', mb: 8 }}>
            <m.div variants={varFade().inDown}>
                <Typography variant="h2" sx={{ color: COLORS.white, fontWeight: 900, textTransform: 'uppercase', mb: 2 }}>
                SIGNATURE <Box component="span" sx={{ color: COLORS.red }}>CLASSES</Box>
                </Typography>
                <Typography sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
                Experience our signature classes, designed to get you training like a star.
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
                slidesPerView={1.2} // Mobile: lihat sedikit slide sebelah
                breakpoints={{
                640: { slidesPerView: 2.2 },
                1024: { slidesPerView: 3.5 }, // Desktop: 3.5 slide
                }}
                style={{ overflow: 'visible' }}
            >
                {SIGNATURE_CLASSES.map((item) => (
                <SwiperSlide key={item.id}>
                    <Card 
                    sx={{ 
                        bgcolor: 'transparent', 
                        boxShadow: 'none', 
                        borderRadius: 0,
                        position: 'relative',
                        transition: 'transform 0.3s',
                        '&:hover': { transform: 'translateY(-8px)' }
                    }}
                    >
                    {/* Image Container */}
                    <Box sx={{ borderRadius: 2, overflow: 'hidden', mb: 3 }}>
                        <Image 
                        alt={item.title} 
                        src={item.image} 
                        ratio="4/3" 
                        sx={{ 
                            transition: 'transform 0.5s',
                            '&:hover': { transform: 'scale(1.1)' } 
                        }} 
                        />
                    </Box>

                    {/* Content */}
                    <Stack spacing={1}>
                        <Typography 
                        variant="h4" 
                        sx={{ color: COLORS.red, fontWeight: 900, opacity: 0.8 }}
                        >
                        {item.id}
                        </Typography>
                        
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="h5" sx={{ color: COLORS.white, fontWeight: 800, textTransform: 'uppercase' }}>
                            {item.title}
                        </Typography>
                        
                        <Iconify 
                            icon="solar:arrow-right-up-bold" 
                            sx={{ color: COLORS.red, width: 24, height: 24 }} 
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
                bgcolor: alpha(COLORS.white, 0.1), 
                mr: 5, 
                position: 'relative',
                borderRadius: 1
                }}
            >
                <Box 
                sx={{ 
                    position: 'absolute', 
                    left: 0, 
                    top: 0, 
                    height: 1, 
                    width: `${Math.max(15, progress)}%`, // Minimal width 15% biar kelihatan
                    bgcolor: COLORS.red,
                    transition: 'width 0.3s ease'
                }} 
                />
            </Box>

            {/* Navigation Arrows */}
            <Stack direction="row" spacing={2}>
                <IconButton
                onClick={() => swiperRef.current?.slidePrev()}
                sx={{
                    border: `1px solid ${alpha(COLORS.white, 0.3)}`,
                    color: COLORS.white,
                    '&:hover': { borderColor: COLORS.red, color: COLORS.red }
                }}
                >
                <Iconify icon="eva:arrow-back-fill" />
                </IconButton>

                <IconButton
                onClick={() => swiperRef.current?.slideNext()}
                sx={{
                    border: `1px solid ${alpha(COLORS.white, 0.3)}`,
                    color: COLORS.white,
                    '&:hover': { borderColor: COLORS.red, color: COLORS.red }
                }}
                >
                <Iconify icon="eva:arrow-forward-fill" />
                </IconButton>
            </Stack>
            </Stack>

            {/* BOTTOM CTA LINK */}
            <Box sx={{ textAlign: 'center', mt: 10 }}>
            <m.div variants={varFade().inUp}>
                <Typography 
                    variant="h3" 
                    sx={{ 
                        fontWeight: 900, 
                        textTransform: 'uppercase', 
                        color: COLORS.white,
                        display: 'inline-flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                        transition: 'color 0.3s',
                        '&:hover': { color: COLORS.red }
                    }}
                >
                    EXPLORE ALL CLASSES
                    <Iconify icon="solar:arrow-right-up-bold" sx={{ ml: 1, width: 32, height: 32 }} />
                </Typography>
            </m.div>
            </Box>

        </Container>
        </Box>
    );
}
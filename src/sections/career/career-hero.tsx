import { m } from 'framer-motion';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { MotionContainer, varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

const COLORS = {
    red: '#D40000',
    redDark: '#8a0000',
    black: '#000000',
    white: '#FFFFFF',
};

export default function CareerHero() {
    const theme = useTheme();

    return (
    <Box
        sx={{
        position: 'relative',
        height: { xs: '100vh', md: 760 }, // Full screen di mobile, fixed height di desktop
        overflow: 'hidden',
        }}
    >
        {/* 1. BACKGROUND IMAGE */}
        <Image
        alt="classes hero"
        src="/assets/images/classes/hero_classes.jpg" // Ganti dengan gambar gym/rowing class kamu
        sx={{
            width: 1,
            height: 1,
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 0,
        }}
        />

        {/* 2. OVERLAY GRADIENT (BLACK & RED) */}
        <Box
        sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 1,
            height: 1,
            zIndex: 1,
            // Gradient dari Hitam (kiri) ke Transparan (kanan) dengan sedikit tint merah
            background: `linear-gradient(to right, 
            ${alpha(COLORS.black, 0.9)} 0%, 
            ${alpha(COLORS.black, 0.7)} 40%, 
            ${alpha(COLORS.red, 0.2)} 100%)`,
        }}
        />

        {/* 3. CONTENT */}
        <Container
        component={MotionContainer}
        sx={{
            height: 1,
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: { xs: 'center', md: 'flex-start' }, // Tengah di HP, Kiri di Desktop
            textAlign: { xs: 'center', md: 'left' },
        }}
        >

        <m.div variants={varFade().inRight}>
            <Typography
            variant="h3"
            sx={{
                color: COLORS.white,
                fontWeight: 'normal',
                maxWidth: 480,
                mb: 5,
                opacity: 0.9,
            }}
            >
            Careers
            </Typography>
        </m.div>
        <m.div variants={varFade().inRight}>
            <Typography
            variant="h1"
            sx={{
                color: COLORS.white,
                fontWeight: 900,
                textTransform: 'uppercase',
                lineHeight: 0.9,
                mb: 2,
                fontSize: { xs: '3rem', md: '5.5rem' }, // Ukuran font raksasa
            }}
            >
            Be our Starmaker <br />
            </Typography>
        </m.div>

        <m.div variants={varFade().inRight}>
            <Typography
            variant="h6"
            sx={{
                color: COLORS.white,
                fontWeight: 'normal',
                maxWidth: 480,
                mb: 5,
                opacity: 0.9,
            }}
            >
            Join the Celebrity Fitness Squad and help inspire others to get better every day!
            </Typography>
        </m.div>

        <m.div variants={varFade().inRight}>
            <Button
            variant="contained"
            size="large"
            endIcon={<Iconify icon="solar:arrow-right-up-bold" />}
            sx={{
                bgcolor: COLORS.red,
                color: COLORS.white,
                borderRadius: 50,
                px: 5,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                boxShadow: `0 8px 24px ${alpha(COLORS.red, 0.4)}`,
                '&:hover': {
                bgcolor: COLORS.redDark,
                transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
            }}
            >
            Follow Us On Intagram
            </Button>
        </m.div>
        </Container>

        {/* 4. SLIDER INDICATORS (DOTS) */}
        <Stack
        direction="row"
        spacing={1.5}
        justifyContent="center"
        sx={{
            position: 'absolute',
            bottom: 40,
            left: 0,
            right: 0,
            zIndex: 3,
        }}
        >
        {[0, 1].map((index) => (
            <Box
            key={index}
            sx={{
                width: index === 0 ? 32 : 8, // Dot pertama panjang (aktif)
                height: 8,
                borderRadius: 4,
                bgcolor: index === 0 ? COLORS.red : alpha(COLORS.white, 0.3),
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                '&:hover': { bgcolor: COLORS.red },
            }}
            />
        ))}
        </Stack>
    </Box>
    );
}
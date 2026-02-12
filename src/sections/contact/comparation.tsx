import { m } from 'framer-motion';
import { useRef } from 'react';
// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/navigation';
// @ts-ignore
import 'swiper/css/pagination';// @mui
import { alpha } from '@mui/material/styles';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Unstable_Grid2';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

const COLORS = {
  red: '#D40000',
  redDark: '#8a0000',
  black: '#000000',
  white: '#FFFFFF',
};

const ROWS = [
  { benefit: 'Postural & Dynamic Movement Assessment', value: true, rockstar: true, pt100: true },
  { benefit: 'Nutrition Consultation', value: true, rockstar: true, pt100: true },
  { benefit: 'Full session with fitness pro with personalized fitness program', value: true, rockstar: true, pt100: true },
  { benefit: 'Choose up to 3 Personal Trainers under 1 package', value: false, rockstar: true, pt100: true },
  { benefit: 'Customized session 30/60/90 minutes', value: false, rockstar: true, pt100: true },
  { benefit: 'PT Buddy eligibility at anytime** Train with a friend', value: false, rockstar: true, pt100: true },
  { benefit: 'Virtual PT', value: false, rockstar: true, pt100: true },
  { benefit: '1:1 Pilates***', value: false, rockstar: true, pt100: true },
  { benefit: '1:1 Group Fitness Exercise***', value: false, rockstar: true, pt100: true },
  { benefit: 'Unlimited GX class access*', value: false, rockstar: false, pt100: true },
  { benefit: 'Free membership dues', value: false, rockstar: false, pt100: true },
];

const STEP_SLIDES = [
  { id: '01', title: 'ASSESSMENTS', description: "Get assessed with our exclusive tests.", img: '/assets/images/home/assessments.jpg' },
  { id: '02', title: 'PREP FOR PEP', description: "Your trainer crafts a custom regime.", img: '/assets/images/home/prep_for_pep.jpg' },
  { id: '03', title: 'TRAIN HARD', description: "Execute your plan with expert guidance.", img: '/assets/images/home/train_hard.jpg' },
];

export default function PersonalTrainingComparison() {
  const swiperRef = useRef<any>(null);

  return (
    <Box sx={{ bgcolor: COLORS.black, py: { xs: 10, md: 15 }, color: COLORS.white, overflow: 'hidden' }}>
      <Container component={MotionViewport}>
        
        {/* Header & Table Section */}
        <m.div variants={varFade().inDown}>
          <Typography variant="h2" sx={{ textAlign: 'center', fontWeight: 900, mb: 8, textTransform: 'uppercase' }}>
            CHOOSE YOUR <Box component="span" sx={{ color: COLORS.red }}>PERSONAL TRAINER</Box>
          </Typography>
        </m.div>

        <TableContainer sx={{ borderRadius: 2, border: `1px solid ${alpha(COLORS.white, 0.1)}`, bgcolor: alpha(COLORS.white, 0.02) }}>
          <Table sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: alpha(COLORS.red, 0.05) }}>
                <TableCell sx={{ color: COLORS.white, fontWeight: 'bold' }}>BENEFITS</TableCell>
                <TableCell align="center" sx={{ color: COLORS.white, fontWeight: 900 }}>VALUE</TableCell>
                <TableCell align="center" sx={{ color: COLORS.white, bgcolor: COLORS.red, fontWeight: 900 }}>ROCKSTAR</TableCell>
                <TableCell align="center" sx={{ color: COLORS.white, fontWeight: 900 }}>PT 100</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ROWS.map((row) => (
                <TableRow key={row.benefit} sx={{ '&:hover': { bgcolor: alpha(COLORS.white, 0.02) } }}>
                  <TableCell sx={{ color: COLORS.white, borderColor: alpha(COLORS.white, 0.1) }}>{row.benefit}</TableCell>
                  <TableCell align="center" sx={{ borderColor: alpha(COLORS.white, 0.1) }}>{renderCheck(row.value)}</TableCell>
                  <TableCell align="center" sx={{ borderColor: alpha(COLORS.white, 0.1), bgcolor: alpha(COLORS.red, 0.03) }}>{renderCheck(row.rockstar)}</TableCell>
                  <TableCell align="center" sx={{ borderColor: alpha(COLORS.white, 0.1) }}>{renderCheck(row.pt100)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* CTA Button */}
        <Box sx={{ textAlign: 'center', mt: 6, mb: 15 }}>
          <m.div variants={varFade().inUp}>
            <Button variant="contained" size="large" sx={{ bgcolor: COLORS.red, color: COLORS.white, px: 6, borderRadius: 50, fontWeight: 'bold', '&:hover': { bgcolor: COLORS.redDark } }}>
              GET STARTED NOW
            </Button>
          </m.div>
        </Box>

        {/* Slider Section: WE MAKE YOUR GOAL OUR JOB */}
        <Grid container spacing={5} alignItems="center">
          <Grid xs={12} md={4}>
            <m.div variants={varFade().inLeft}>
              <Typography variant="h2" sx={{ fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.1, mb: 3 }}>
                WE MAKE <br /> YOUR GOAL <br /> <Box component="span" sx={{ color: COLORS.red }}>OUR JOB</Box>
              </Typography>
              <Typography sx={{ color: 'text.secondary', mb: 4 }}>
                Your all-access to upping your fitness game. Dedicated, professional trainers to help you rock your journey.
              </Typography>
              
              <Stack direction="row" spacing={2}>
                <IconButton 
                  onClick={() => swiperRef.current?.slidePrev()}
                  sx={{ border: `1px solid ${alpha(COLORS.white, 0.2)}`, color: COLORS.white, '&:hover': { bgcolor: COLORS.red } }}
                >
                  <Iconify icon="eva:arrow-back-fill" />
                </IconButton>
                <IconButton 
                  onClick={() => swiperRef.current?.slideNext()}
                  sx={{ bgcolor: COLORS.red, color: COLORS.white, '&:hover': { bgcolor: COLORS.redDark } }}
                >
                  <Iconify icon="eva:arrow-forward-fill" />
                </IconButton>
              </Stack>
            </m.div>
          </Grid>

          <Grid xs={12} md={8}>
            <Swiper
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              modules={[Navigation, Pagination]}
              spaceBetween={24}
              slidesPerView={1.2}
              breakpoints={{
                640: { slidesPerView: 1.5 },
                1024: { slidesPerView: 2.2 },
              }}
              style={{ overflow: 'visible' }}
            >
              {STEP_SLIDES.map((slide) => (
                <SwiperSlide key={slide.id}>
                  <Box sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden' }}>
                    <Typography variant="h1" sx={{ 
                      position: 'absolute', top: -10, left: 10, zIndex: 1, 
                      color: 'transparent', WebkitTextStroke: `1px ${alpha(COLORS.white, 0.3)}`, 
                      fontWeight: 900, fontSize: '5rem' 
                    }}>
                      {slide.id}
                    </Typography>
                    
                    <Image alt={slide.title} src={slide.img} ratio="3/4" sx={{ borderRadius: 2 }} />
                    
                    <Box sx={{ 
                      position: 'absolute', bottom: 0, left: 0, width: 1, p: 3, 
                      background: `linear-gradient(to top, ${COLORS.black} 0%, transparent 100%)` 
                    }}>
                      <Typography variant="h5" sx={{ fontWeight: 800, color: COLORS.white, mb: 1 }}>{slide.title}</Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>{slide.description}</Typography>
                    </Box>
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

function renderCheck(isValid: boolean) {
  return (
    <Iconify 
      icon={isValid ? "solar:check-circle-bold" : "solar:close-circle-bold"} 
      width={24}
      sx={{ color: isValid ? '#00e676' : alpha(COLORS.white, 0.2) }} 
    />
  );
}
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
import 'swiper/css/pagination';
// @mui
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

const RED = '#DF2026';
const RED_DARK = '#A8171C';
const BLACK = '#060606';

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
  { id: '01', title: 'ASSESSMENTS', description: "Get assessed with our exclusive tests.", img: '/assets/background/TRAINER/19.png' },
  { id: '02', title: 'PREP FOR PEP', description: "Your trainer crafts a custom regime.", img: '/assets/background/TRAINER/17.png' },
  { id: '03', title: 'TRAIN HARD', description: "Execute your plan with expert guidance.", img: '/assets/background/TRAINER/18.png' },
];

export default function PersonalTrainingComparison() {
  const swiperRef = useRef<any>(null);

  return (
    <Box sx={{ bgcolor: BLACK, py: { xs: 10, md: 15 }, color: '#fff', overflow: 'hidden', borderTop: `1px solid ${alpha(RED, 0.15)}` }}>
      <Container component={MotionViewport}>
        
        {/* Header & Table Section */}
        <m.div variants={varFade().inDown}>
           <Stack direction="row" alignItems="center" justifyContent="center" spacing={1.5} sx={{ mb: 2 }}>
              <Box sx={{ width: 28, height: 2, bgcolor: RED }} />
              <Typography sx={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: 4, textTransform: 'uppercase', color: RED, fontFamily: 'monospace' }}>
                Compare Plans
              </Typography>
              <Box sx={{ width: 28, height: 2, bgcolor: RED }} />
          </Stack>
          <Typography variant="h2" sx={{ textAlign: 'center', fontWeight: 800, mb: 8, textTransform: 'uppercase', fontFamily: "'Poppins', sans-serif", letterSpacing: -2, lineHeight: 0.9 }}>
            Choose Your <br /> <Box component="span" sx={{ color: RED, fontStyle: 'italic' }}>Personal Trainer.</Box>
          </Typography>
        </m.div>

        <TableContainer sx={{ borderRadius: 0, border: `1px solid ${alpha('#fff', 0.1)}`, bgcolor: '#080808' }}>
          <Table sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: alpha(RED, 0.1) }}>
                <TableCell sx={{ color: '#fff', fontWeight: 800, fontFamily: 'monospace', letterSpacing: 1 }}>BENEFITS</TableCell>
                <TableCell align="center" sx={{ color: '#fff', fontWeight: 800, fontFamily: 'monospace', letterSpacing: 1 }}>VALUE</TableCell>
                <TableCell align="center" sx={{ color: '#fff', bgcolor: RED, fontWeight: 800, fontFamily: 'monospace', letterSpacing: 1 }}>ROCKSTAR</TableCell>
                <TableCell align="center" sx={{ color: '#fff', fontWeight: 800, fontFamily: 'monospace', letterSpacing: 1 }}>PT 100</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ROWS.map((row) => (
                <TableRow key={row.benefit} sx={{ '&:hover': { bgcolor: alpha('#fff', 0.05) } }}>
                  <TableCell sx={{ color: alpha('#fff', 0.8), borderColor: alpha('#fff', 0.1), fontSize: '0.85rem' }}>{row.benefit}</TableCell>
                  <TableCell align="center" sx={{ borderColor: alpha('#fff', 0.1) }}>{renderCheck(row.value)}</TableCell>
                  <TableCell align="center" sx={{ borderColor: alpha('#fff', 0.1), bgcolor: alpha(RED, 0.05) }}>{renderCheck(row.rockstar)}</TableCell>
                  <TableCell align="center" sx={{ borderColor: alpha('#fff', 0.1) }}>{renderCheck(row.pt100)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* CTA Button */}
        <Box sx={{ textAlign: 'center', mt: 6, mb: 15 }}>
          <m.div variants={varFade().inUp}>
            <Button 
                variant="contained" 
                size="large" 
                endIcon={<Iconify icon="solar:arrow-right-up-bold" />}
                sx={{ 
                    bgcolor: RED, 
                    color: '#fff', 
                    px: 6, 
                    py: 1.75,
                    borderRadius: 0, 
                    fontWeight: 800, 
                    fontFamily: 'monospace',
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    boxShadow: 'none',
                    '&:hover': { bgcolor: RED_DARK, boxShadow: 'none' } 
                }}
            >
              Get Started Now
            </Button>
          </m.div>
        </Box>

        {/* Slider Section: WE MAKE YOUR GOAL OUR JOB */}
        <Grid container spacing={5} alignItems="center">
          <Grid xs={12} md={4}>
            <m.div variants={varFade().inLeft}>
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
                  <Box sx={{ width: 28, height: 2, bgcolor: RED }} />
                  <Typography sx={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: 4, textTransform: 'uppercase', color: RED, fontFamily: 'monospace' }}>
                    The Process
                  </Typography>
              </Stack>
              <Typography variant="h2" sx={{ fontWeight: 800, textTransform: 'uppercase', lineHeight: 0.95, letterSpacing: -2, mb: 3, fontFamily: "'Poppins', sans-serif" }}>
                We Make <br /> Your Goal <br /> <Box component="span" sx={{ color: RED, fontStyle: 'italic' }}>Our Job.</Box>
              </Typography>
              <Typography sx={{ color: alpha('#fff', 0.6), mb: 4, fontSize: '0.9rem', lineHeight: 1.8 }}>
                Your all-access to upping your fitness game. Dedicated, professional trainers to help you rock your journey.
              </Typography>
              
              <Stack direction="row" spacing={2}>
                <IconButton 
                  onClick={() => swiperRef.current?.slidePrev()}
                  sx={{ borderRadius: 0, border: `1px solid ${alpha('#fff', 0.2)}`, color: '#fff', '&:hover': { bgcolor: RED, borderColor: RED } }}
                >
                  <Iconify icon="eva:arrow-back-fill" />
                </IconButton>
                <IconButton 
                  onClick={() => swiperRef.current?.slideNext()}
                  sx={{ borderRadius: 0, bgcolor: RED, color: '#fff', border: `1px solid ${RED}`, '&:hover': { bgcolor: RED_DARK } }}
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
                  <Box sx={{ position: 'relative', borderRadius: 0, overflow: 'hidden', border: `1px solid ${alpha('#fff', 0.1)}` }}>
                    <Typography variant="h1" sx={{ 
                      position: 'absolute', top: -10, left: 10, zIndex: 1, 
                      color: 'transparent', WebkitTextStroke: `1px ${alpha('#fff', 0.4)}`, 
                      fontWeight: 900, fontSize: '5rem', fontFamily: "'Poppins', sans-serif"
                    }}>
                      {slide.id}
                    </Typography>
                    
                    <Image alt={slide.title} src={slide.img} ratio="3/4" sx={{ borderRadius: 0 }} />
                    
                    <Box sx={{ 
                      position: 'absolute', bottom: 0, left: 0, width: 1, p: 3, 
                      background: `linear-gradient(to top, ${BLACK} 0%, transparent 100%)` 
                    }}>
                      <Typography variant="h5" sx={{ fontWeight: 800, color: '#fff', mb: 1, textTransform: 'uppercase', fontFamily: "'Poppins', sans-serif" }}>{slide.title}</Typography>
                      <Typography variant="caption" sx={{ color: alpha('#fff', 0.7), display: 'block', fontSize: '0.8rem' }}>{slide.description}</Typography>
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
      sx={{ color: isValid ? RED : alpha('#fff', 0.2) }} 
    />
  );
}
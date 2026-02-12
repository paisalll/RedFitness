import { m } from 'framer-motion';
// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
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

export default function PersonalTrainingQuality() {
  return (
    <Box sx={{ bgcolor: COLORS.black, py: { xs: 10, md: 15 }, overflow: 'hidden' }}>
      <Container component={MotionViewport} maxWidth="lg">
        
        {/* SECTION 1: DID YOU KNOW? */}
        <Grid container spacing={{ xs: 5, md: 10 }} alignItems="center" sx={{ mb: { xs: 10, md: 20 } }}>
          <Grid xs={12} md={6}>
            <m.div variants={varFade().inLeft}>
              <Typography variant="h2" sx={{ color: COLORS.white, fontWeight: 900, mb: 2, textTransform: 'uppercase', lineHeight: 1.1 }}>
                DID YOU <br />
                <Box component="span" sx={{ color: COLORS.red }}>KNOW?</Box>
              </Typography>
              
              <Typography sx={{ color: 'text.secondary', mb: 5, fontSize: '1.1rem' }}>
                Our StarMaker Instructors' strength? They're all certified trainers. Just so they can help you crush your goals.
              </Typography>

              <Box
                sx={{
                  p: 4,
                  borderRadius: 2,
                  bgcolor: alpha(COLORS.white, 0.03),
                  border: `1px solid ${alpha(COLORS.red, 0.2)}`,
                  position: 'relative'
                }}
              >
                <Typography variant="overline" sx={{ color: COLORS.red, fontWeight: 900, mb: 3, display: 'block', letterSpacing: 2 }}>
                  YOU'LL GET
                </Typography>
                
                <Stack spacing={3}>
                  <Stack direction="row" spacing={2}>
                    <Iconify icon="solar:star-bold" sx={{ color: COLORS.red, mt: 0.5, flexShrink: 0 }} width={24} />
                    <Typography variant="body1" sx={{ color: COLORS.white, opacity: 0.9 }}>
                      Tailormade fitness plan to match your goals.
                    </Typography>
                  </Stack>
                  
                  <Stack direction="row" spacing={2}>
                    <Iconify icon="solar:star-bold" sx={{ color: COLORS.red, mt: 0.5, flexShrink: 0 }} width={24} />
                    <Typography variant="body1" sx={{ color: COLORS.white, opacity: 0.9 }}>
                      Personal feedback to keep you motivated while you get supervised & fun sessions.
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
            </m.div>
          </Grid>

          <Grid xs={12} md={6}>
            <m.div variants={varFade().inRight}>
              <Box sx={{ position: 'relative' }}>
                <Image
                  alt="trainer feedback"
                  src="public/assets/images/people-working-out-indoors-together-with-dumbbells.jpg"
                  sx={{
                    borderRadius: 2,
                    boxShadow: `-24px 24px 72px ${alpha(COLORS.red, 0.15)}`,
                  }}
                />
              </Box>
            </m.div>
          </Grid>
        </Grid>

        {/* SECTION 2: COMMITTED TO QUALITY */}
        <Grid container spacing={{ xs: 5, md: 10 }} alignItems="center" direction={{ xs: 'column-reverse', md: 'row' }}>
          <Grid xs={12} md={6}>
            <m.div variants={varFade().inLeft}>
              <Image
                alt="quality assessment"
                src="public/assets/images/people-working-out-indoors-together-with-dumbbells.jpg"
                sx={{
                  borderRadius: 2,
                  boxShadow: `24px 24px 72px ${alpha(COLORS.red, 0.15)}`,
                }}
              />
            </m.div>
          </Grid>

          <Grid xs={12} md={6} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
            <m.div variants={varFade().inRight}>
              <Typography variant="h2" sx={{ color: COLORS.white, fontWeight: 900, mb: 3, textTransform: 'uppercase', lineHeight: 1.1 }}>
                COMMITTED <br />
                <Box component="span" sx={{ color: COLORS.red }}>TO QUALITY</Box>
              </Typography>
              
              <Typography sx={{ color: 'text.secondary', lineHeight: 1.8, fontSize: '1.1rem' }}>
                All our Certified Fitness Coaches are required to complete a vigorous foundation training program spanning 3 to 12 months. 
                Our coaches are required to pass all exams before being allowed to train our clients.
              </Typography>
            </m.div>
          </Grid>
        </Grid>

      </Container>
    </Box>
  );
}
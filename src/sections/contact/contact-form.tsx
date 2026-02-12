import { m } from 'framer-motion';
// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
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

const FAQ = [
  {
    question: 'CERTIFIED FITNESS COACHES: THE BENEFITS',
    answer: 'Our coaches provide professional guidance, personalized programming, and the motivation you need to reach your goals safely and effectively.',
  },
  {
    question: 'DEFINING GOALS WITH CERTIFIED FITNESS COACHES',
    answer: 'Your coach will perform assessments to understand your current level and help you set SMART (Specific, Measurable, Achievable, Relevant, Time-bound) goals.',
  },
  {
    question: 'HOW ARE FITNESS LEVELS ACCESSED?',
    answer: 'We use a combination of postural analysis, dynamic movement screening, and strength/cardio testing to create your baseline.',
  },
  {
    question: 'ADAPTING WORKOUTS TO FIT CRAZY SCHEDULES',
    answer: 'Flexibility is key. Our trainers work around your availability, offering sessions that fit into your busy lifestyle.',
  },
];

export default function PersonalTrainingFinal() {
  return (
    <Box sx={{ bgcolor: COLORS.black, py: { xs: 10, md: 15 }, color: COLORS.white }}>
      <Container component={MotionViewport}>
        
        {/* SECTION: JOIN THE PROGRAM */}
        <Grid container spacing={{ xs: 5, md: 10 }} alignItems="flex-start" sx={{ mb: { xs: 15, md: 20 } }}>
          
          {/* Kolom Kiri: Form Sign Up */}
          <Grid xs={12} md={5}>
            <m.div variants={varFade().inLeft}>
              <Box
                sx={{
                  p: 4,
                  borderRadius: 2,
                  bgcolor: alpha(COLORS.white, 0.03),
                  border: `1px solid ${alpha(COLORS.red, 0.2)}`,
                }}
              >
                <Typography variant="h4" sx={{ mb: 1, fontWeight: 900, textAlign: 'center' }}>
                  SIGN UP FOR A <br />
                  <Box component="span" sx={{ color: COLORS.red }}>FREE TRIAL</Box>
                </Typography>
                <Typography variant="body2" sx={{ mb: 4, textAlign: 'center', opacity: 0.6 }}>
                  We'll get in touch within 48 hours.
                </Typography>

                <Stack spacing={2.5}>
                  <TextField fullWidth label="First Name" variant="filled" sx={{ bgcolor: alpha(COLORS.white, 0.05) }} />
                  <TextField fullWidth label="Last Name" variant="filled" sx={{ bgcolor: alpha(COLORS.white, 0.05) }} />
                  <TextField fullWidth label="Email Address" variant="filled" sx={{ bgcolor: alpha(COLORS.white, 0.05) }} />
                  <TextField fullWidth label="Phone Number" variant="filled" sx={{ bgcolor: alpha(COLORS.white, 0.05) }} />
                  
                  <FormControlLabel
                    control={<Checkbox sx={{ color: COLORS.red, '&.Mui-checked': { color: COLORS.red } }} />}
                    label={
                      <Typography variant="caption" sx={{ opacity: 0.7 }}>
                        I've read and agree to the Terms and Data Privacy policy.
                      </Typography>
                    }
                  />

                  <Button
                    fullWidth
                    size="large"
                    variant="contained"
                    sx={{
                      bgcolor: COLORS.red,
                      color: COLORS.white,
                      fontWeight: 'bold',
                      py: 1.5,
                      '&:hover': { bgcolor: COLORS.redDark }
                    }}
                  >
                    SUBMIT
                  </Button>
                </Stack>
              </Box>
            </m.div>
          </Grid>

          {/* Kolom Kanan: Benefit List */}
          <Grid xs={12} md={7}>
            <m.div variants={varFade().inRight}>
              <Typography variant="h2" sx={{ fontWeight: 900, textTransform: 'uppercase', mb: 1 }}>
                JOIN THE PROGRAM
              </Typography>
              <Typography variant="h4" sx={{ color: COLORS.red, fontWeight: 800, mb: 3 }}>
                PERSONAL TRAINING MADE FOR YOU
              </Typography>
              <Typography sx={{ color: 'text.secondary', mb: 5 }}>
                Crush those goals with our experts. We don't do average. It's a custom, results-driven training vibe.
              </Typography>

              <Box sx={{ p: 4, bgcolor: alpha(COLORS.white, 0.02), borderRadius: 2, border: `1px solid ${alpha(COLORS.white, 0.05)}` }}>
                <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 'bold' }}>YOU'LL ENJOY</Typography>
                <Stack spacing={2}>
                  {[
                    'Save up and own your fitness journey!',
                    'Certified Coaches on your schedule, your style.',
                    'Personalized plans.',
                    'Epic assessments.',
                    'MyCoach tracking.',
                    'Plus pro tips on nutrition.'
                  ].map((text) => (
                    <Stack key={text} direction="row" spacing={2} alignItems="center">
                      <Iconify icon="solar:star-bold" width={18} sx={{ color: COLORS.red }} />
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>{text}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            </m.div>
          </Grid>
        </Grid>

        {/* SECTION: FAQ */}
        <Box>
          <m.div variants={varFade().inDown}>
            <Typography variant="h2" sx={{ textAlign: 'center', fontWeight: 900, mb: 8 }}>
              FREQUENTLY ASKED <Box component="span" sx={{ color: COLORS.red }}>QUESTIONS</Box>
            </Typography>
          </m.div>

          <Stack spacing={2}>
            {FAQ.map((item, index) => (
              <m.div key={index} variants={varFade().inUp}>
                <Accordion 
                  sx={{ 
                    bgcolor: alpha(COLORS.white, 0.02), 
                    color: COLORS.white,
                    border: `1px solid ${alpha(COLORS.white, 0.1)}`,
                    '&:before': { display: 'none' },
                    '&.Mui-expanded': { border: `1px solid ${COLORS.red}` }
                  }}
                >
                  <AccordionSummary expandIcon={<Iconify icon="eva:plus-fill" sx={{ color: COLORS.red }} />}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{item.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography sx={{ opacity: 0.7 }}>{item.answer}</Typography>
                  </AccordionDetails>
                </Accordion>
              </m.div>
            ))}
          </Stack>
        </Box>

      </Container>
    </Box>
  );
}
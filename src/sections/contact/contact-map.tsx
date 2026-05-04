import { m } from 'framer-motion';
// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
// components
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

const RED = '#DF2026';
const BLACK = '#060606';

const PILLARS = [
  {
    title: 'POSTURE',
    icon: 'solar:figure-bold',
    description: 'Correcting your posture will reduce stress and strain on your body. You’ll stand taller and feel less fatigue.',
  },
  {
    title: 'MOBILITY',
    icon: 'solar:accessibility-bold',
    description: 'Good mobility allows your body to move the way it was designed – pain free and with a good range of motion.',
  },
  {
    title: 'CORE',
    icon: 'solar:body-bold',
    description: 'Your core is part of almost every move you make. Strong core muscles act as a stabilizer, making moving safer.',
  },
  {
    title: 'STRENGTH',
    icon: 'solar:dumbbell-large-bold',
    description: 'Strength training helps you develop strong bones, manage weight and help you do everyday activities better.',
  },
  {
    title: 'CARDIO',
    icon: 'solar:heart-pulse-bold',
    description: 'Improving your cardio will strengthen your stamina and endurance so you can work harder for long and burn more calories.',
  },
];

const FEATURES = [
  {
    title: 'STAR CHOICES',
    icon: 'solar:magic-stick-3-bold-duotone',
    description: 'Get started with the pre-exercise questionnaire. Clue in your personal trainer on your habits and goals.',
  },
  {
    title: 'CUSTOM MADE',
    icon: 'solar:clipboard-list-bold-duotone',
    description: 'Swag! A personalized workout plan by your personal trainer, delivered straight to your app.',
  },
  {
    title: 'KNOW IT TO ROCK IT',
    icon: 'solar:play-circle-bold-duotone',
    description: 'Hit check-in to unlock and access the details on your fitness and posture. Transform your form now.',
  },
  {
    title: 'CHECK ON PROGRESS',
    icon: 'solar:chart-2-bold-duotone',
    description: 'Progress motivates! Track your journey with regular reports to keep you pushing those limits.',
  },
  {
    title: 'BRAGGING RIGHTS',
    icon: 'solar:share-circle-bold-duotone',
    description: 'Every session is a story to share. Chart those wins and share those glories with your squad.',
  },
];

export default function PersonalTrainingPillars() {
  return (
    <Box sx={{ bgcolor: BLACK, py: { xs: 10, md: 15 }, color: '#fff', borderTop: `1px solid ${alpha(RED, 0.15)}` }}>
      <Container component={MotionViewport}>
        
        {/* SECTION 1: 5 PILLARS */}
        <Grid container spacing={5} sx={{ mb: { xs: 10, md: 20 } }}>
          <Grid xs={12} md={4}>
            <m.div variants={varFade().inLeft}>
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
                  <Box sx={{ width: 28, height: 2, bgcolor: RED }} />
                  <Typography sx={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: 4, textTransform: 'uppercase', color: RED, fontFamily: 'monospace' }}>
                    Foundation
                  </Typography>
              </Stack>
              <Typography variant="h2" sx={{ fontWeight: 800, textTransform: 'uppercase', lineHeight: 0.95, letterSpacing: -2, mb: 3, fontFamily: "'Poppins', sans-serif" }}>
                Our Coaches <br /> Practice The <br />
                <Box component="span" sx={{ color: RED, fontStyle: 'italic' }}>5 Key Pillars.</Box>
              </Typography>
            </m.div>
          </Grid>

          <Grid xs={12} md={8}>
            <Grid container spacing={3}>
              {PILLARS.map((pillar, index) => (
                <Grid key={pillar.title} xs={12} sm={6} md={4}>
                  <m.div variants={varFade().inUp} transition={{ delay: index * 0.1 }} style={{ height: '100%' }}>
                    <Box sx={{ 
                      p: 4, 
                      height: '100%', 
                      bgcolor: '#080808',
                      border: `1px solid ${alpha('#fff', 0.05)}`,
                      borderTop: `3px solid transparent`,
                      borderRadius: 0, // Sharp
                      transition: 'all 0.3s',
                      '&:hover': { 
                          borderColor: alpha(RED, 0.2), 
                          borderTopColor: RED, 
                          bgcolor: '#0c0c0c',
                          transform: 'translateY(-5px)' 
                      }
                    }}>
                      <Iconify icon={pillar.icon} width={32} sx={{ color: RED, mb: 3 }} />
                      <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 800, fontFamily: "'Poppins', sans-serif" }}>{pillar.title}</Typography>
                      <Typography variant="body2" sx={{ color: alpha('#fff', 0.6), lineHeight: 1.7 }}>{pillar.description}</Typography>
                    </Box>
                  </m.div>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        {/* SECTION 2: MY TRAINER FEATURE */}
        <Box sx={{ textAlign: 'center' }}>
          <m.div variants={varFade().inDown}>
             <Stack direction="row" alignItems="center" justifyContent="center" spacing={1.5} sx={{ mb: 2 }}>
                <Box sx={{ width: 28, height: 2, bgcolor: RED }} />
                <Typography sx={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: 4, textTransform: 'uppercase', color: RED, fontFamily: 'monospace' }}>
                    Digital Experience
                </Typography>
                <Box sx={{ width: 28, height: 2, bgcolor: RED }} />
            </Stack>
            <Typography variant="h2" sx={{ fontWeight: 800, textTransform: 'uppercase', mb: 8, fontFamily: "'Poppins', sans-serif", letterSpacing: -2, lineHeight: 0.95 }}>
              Level Up With <br /> <Box component="span" sx={{ color: RED, fontStyle: 'italic' }}>My Trainer Feature.</Box>
            </Typography>
          </m.div>

          <Grid container spacing={3} justifyContent="center">
            {FEATURES.map((feature, index) => (
              <Grid key={feature.title} xs={12} sm={6} md={4}>
                <m.div variants={varFade().inUp} transition={{ delay: index * 0.1 }} style={{ height: '100%' }}>
                  <Stack 
                    spacing={2.5} 
                    alignItems="center" 
                    sx={{ 
                      p: 4, 
                      borderRadius: 0, // Sharp
                      bgcolor: '#080808',
                      border: `1px solid ${alpha(RED, 0.1)}`,
                      height: '100%',
                      transition: 'all 0.3s',
                      '&:hover': {
                          borderColor: RED,
                          bgcolor: '#0c0c0c',
                          transform: 'translateY(-4px)'
                      }
                    }}
                  >
                    <Iconify icon={feature.icon} width={48} sx={{ color: RED }} />
                    <Typography variant="h6" sx={{ fontWeight: 800, fontFamily: "'Poppins', sans-serif" }}>{feature.title}</Typography>
                    <Typography variant="body2" sx={{ color: alpha('#fff', 0.6), lineHeight: 1.7 }}>{feature.description}</Typography>
                  </Stack>
                </m.div>
              </Grid>
            ))}
          </Grid>
        </Box>

      </Container>
    </Box>
  );
}
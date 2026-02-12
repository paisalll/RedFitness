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

const COLORS = {
  red: '#D40000',
  black: '#000000',
  white: '#FFFFFF',
};

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
    <Box sx={{ bgcolor: COLORS.black, py: { xs: 10, md: 15 }, color: COLORS.white }}>
      <Container component={MotionViewport}>
        
        {/* SECTION 1: 5 PILLARS */}
        <Grid container spacing={5} sx={{ mb: { xs: 10, md: 20 } }}>
          <Grid xs={12} md={4}>
            <m.div variants={varFade().inLeft}>
              <Typography variant="h2" sx={{ fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.1, mb: 3 }}>
                OUR COACHES PRACTICE <br />
                <Box component="span" sx={{ color: COLORS.red }}>THE 5 KEY PILLARS OF FITNESS</Box>
              </Typography>
            </m.div>
          </Grid>

          <Grid xs={12} md={8}>
            <Grid container spacing={3}>
              {PILLARS.map((pillar, index) => (
                <Grid key={pillar.title} xs={12} sm={6} md={4}>
                  <m.div variants={varFade().inUp} transition={{ delay: index * 0.1 }}>
                    <Box sx={{ 
                      p: 3, 
                      height: 1, 
                      border: `1px solid ${alpha(COLORS.white, 0.1)}`,
                      transition: 'all 0.3s',
                      '&:hover': { borderColor: COLORS.red, transform: 'translateY(-5px)' }
                    }}>
                      <Iconify icon={pillar.icon} width={32} sx={{ color: COLORS.red, mb: 2 }} />
                      <Typography variant="h6" sx={{ mb: 1, fontWeight: 800 }}>{pillar.title}</Typography>
                      <Typography variant="body2" sx={{ opacity: 0.6 }}>{pillar.description}</Typography>
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
            <Typography variant="h2" sx={{ fontWeight: 900, textTransform: 'uppercase', mb: 8 }}>
              LEVEL UP WITH <Box component="span" sx={{ color: COLORS.red }}>MY TRAINER FEATURE</Box>
            </Typography>
          </m.div>

          <Grid container spacing={3} justifyContent="center">
            {FEATURES.map((feature, index) => (
              <Grid key={feature.title} xs={12} sm={6} md={4}>
                <m.div variants={varFade().inUp} transition={{ delay: index * 0.1 }}>
                  <Stack 
                    spacing={2} 
                    alignItems="center" 
                    sx={{ 
                      p: 4, 
                      borderRadius: 2,
                      bgcolor: alpha(COLORS.white, 0.03),
                      border: `1px solid ${alpha(COLORS.red, 0.1)}`,
                      height: 1
                    }}
                  >
                    <Iconify icon={feature.icon} width={48} sx={{ color: COLORS.red }} />
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>{feature.title}</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.7 }}>{feature.description}</Typography>
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
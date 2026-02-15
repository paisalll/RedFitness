import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Unstable_Grid2';
// components
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

const COLORS = {
  red: '#D40000',
  black: '#000000',
  white: '#FFFFFF',
  cyan: '#00FFCC',
};

const STEPS = [
  { label: 'YOUR CLUB', icon: 'solar:map-point-bold', active: false },
  { label: 'YOUR PLAN', icon: 'solar:clipboard-list-bold', active: true }, // Active
  { label: 'YOUR DETAILS', icon: 'solar:user-id-bold', active: false },
  { label: 'PAYMENT', icon: 'solar:card-bold', active: false },
];

const PLANS = [
  {
    id: 'monthly',
    name: 'MONTHLY FLEX',
    price: 'Rp 499.000',
    period: '/month',
    features: ['Access to 1 Club', 'No Commitment', 'Free 1x PT Session'],
    bestValue: false,
  },
  {
    id: '12months',
    name: '12 MONTHS SAVER',
    price: 'Rp 399.000',
    period: '/month',
    features: ['Access to All Clubs', '12 Month Commitment', 'Free Starter Pack', 'Free 2x PT Sessions'],
    bestValue: true, // Highlighted
  },
  {
    id: 'student',
    name: 'STUDENT PLAN',
    price: 'Rp 350.000',
    period: '/month',
    features: ['Access to 1 Club', 'Valid Student ID Req.', 'Off-peak Access'],
    bestValue: false,
  },
];

export default function SelectPlanView() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleNext = () => {
    router.push(paths.join.details); // Ganti dengan path details kamu
  };

  return (
    <Box sx={{ pb: 20 }}>
      <Container component={MotionViewport} sx={{ py: 10, color: COLORS.white }}>
        
        {/* 1. STEPPER (Sama seperti sebelumnya) */}
        <Stack direction="row" justifyContent="center" spacing={{ xs: 2, md: 8 }} sx={{ mb: 10 }}>
          {STEPS.map((step, index) => (
            <Stack key={index} alignItems="center">
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  bgcolor: step.active ? COLORS.red : COLORS.black,
                  border: `2px solid ${step.active ? COLORS.red : alpha(COLORS.white, 0.3)}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1,
                  boxShadow: step.active ? `0 0 20px ${COLORS.red}` : 'none',
                }}
              >
                <Iconify icon={step.icon} width={24} color={step.active ? COLORS.white : alpha(COLORS.white, 0.5)} />
              </Box>
              <Typography variant="caption" sx={{ fontWeight: 'bold', color: step.active ? COLORS.white : alpha(COLORS.white, 0.5) }}>
                {step.label}
              </Typography>
            </Stack>
          ))}
        </Stack>

        {/* 2. TITLE */}
        <m.div variants={varFade().inUp}>
          <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 900, mb: 8, textTransform: 'uppercase' }}>
            2 - CHOOSE YOUR <Box component="span" sx={{ color: COLORS.red }}>MEMBERSHIP</Box>
          </Typography>
        </m.div>

        {/* 3. PLAN CARDS */}
        <Grid container spacing={3} justifyContent="center">
          {PLANS.map((plan) => {
            const isSelected = selectedPlan === plan.id;
            
            return (
              <Grid xs={12} md={4} key={plan.id}>
                <m.div variants={varFade().inUp}>
                  <Card
                    onClick={() => setSelectedPlan(plan.id)}
                    sx={{
                      p: 4,
                      position: 'relative',
                      cursor: 'pointer',
                      bgcolor: isSelected ? alpha(COLORS.red, 0.1) : alpha(COLORS.white, 0.03),
                      border: `2px solid ${isSelected ? COLORS.red : alpha(COLORS.white, 0.1)}`,
                      borderRadius: 2,
                      transition: 'all 0.3s',
                      transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                      '&:hover': {
                         transform: 'translateY(-8px)',
                         borderColor: isSelected ? COLORS.red : COLORS.white
                      }
                    }}
                  >
                    {plan.bestValue && (
                      <Chip 
                        label="BEST VALUE" 
                        sx={{ 
                          bgcolor: COLORS.cyan, 
                          color: COLORS.black, 
                          fontWeight: 'bold', 
                          position: 'absolute', 
                          top: 16, 
                          right: 16 
                        }} 
                      />
                    )}

                    <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, color: isSelected ? COLORS.red : COLORS.white }}>
                      {plan.name}
                    </Typography>
                    
                    <Stack direction="row" alignItems="baseline" spacing={0.5} sx={{ mb: 3 }}>
                      <Typography variant="h3" sx={{ fontWeight: 900 }}>{plan.price}</Typography>
                      <Typography variant="body2" sx={{ opacity: 0.7 }}>{plan.period}</Typography>
                    </Stack>

                    <Divider sx={{ borderStyle: 'dashed', borderColor: alpha(COLORS.white, 0.2), mb: 3 }} />

                    <Stack spacing={2} sx={{ mb: 4 }}>
                      {plan.features.map((feature) => (
                        <Stack key={feature} direction="row" alignItems="center" spacing={1.5}>
                          <Iconify icon="solar:check-circle-bold" sx={{ color: isSelected ? COLORS.red : COLORS.cyan }} />
                          <Typography variant="body2">{feature}</Typography>
                        </Stack>
                      ))}
                    </Stack>

                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        bgcolor: isSelected ? COLORS.red : alpha(COLORS.white, 0.1),
                        color: COLORS.white,
                        fontWeight: 'bold',
                        '&:hover': {
                            bgcolor: isSelected ? COLORS.red : alpha(COLORS.white, 0.2)
                        }
                      }}
                    >
                      {isSelected ? 'SELECTED' : 'CHOOSE PLAN'}
                    </Button>
                  </Card>
                </m.div>
              </Grid>
            );
          })}
        </Grid>

        {/* 4. STICKY NEXT BUTTON */}
        <AnimatePresence>
          {selectedPlan && (
            <m.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 99 }}
            >
              <Box sx={{ bgcolor: alpha(COLORS.black, 0.9), backdropFilter: 'blur(10px)', borderTop: `1px solid ${alpha(COLORS.white, 0.1)}`, py: 3 }}>
                <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    size="large"
                    variant="contained"
                    onClick={handleNext}
                    endIcon={<Iconify icon="solar:arrow-right-bold" />}
                    sx={{ bgcolor: COLORS.cyan, color: COLORS.black, borderRadius: 50, px: 6, fontWeight: '900', '&:hover': { bgcolor: alpha(COLORS.cyan, 0.8) } }}
                  >
                    NEXT: DETAILS
                  </Button>
                </Container>
              </Box>
            </m.div>
          )}
        </AnimatePresence>

      </Container>
    </Box>
  );
}
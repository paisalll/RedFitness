import { useState } from 'react';
import { m } from 'framer-motion';
// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Radio from '@mui/material/Radio';
// components
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

const COLORS = {
  red: '#D40000',
  black: '#000000',
  white: '#FFFFFF',
  cyan: '#00FFCC',
};

const STEPS = [
  { label: 'YOUR CLUB', icon: 'solar:map-point-bold', active: false },
  { label: 'YOUR PLAN', icon: 'solar:clipboard-list-bold', active: false },
  { label: 'YOUR DETAILS', icon: 'solar:user-id-bold', active: false },
  { label: 'PAYMENT', icon: 'solar:card-bold', active: true }, // Active
];

const PAYMENT_METHODS = [
    { id: 'cc', label: 'Credit Card', icon: 'solar:card-bold' },
    { id: 'va', label: 'Virtual Account', icon: 'solar:smartphone-bold' },
    { id: 'ewallet', label: 'E-Wallet (Gopay/OVO)', icon: 'solar:wallet-bold' },
];

export default function PaymentView() {
  const [method, setMethod] = useState('cc');

  return (
    <Box sx={{ pb: 15 }}>
      <Container component={MotionViewport} sx={{ py: 10, color: COLORS.white }}>
        
        {/* STEPPER */}
        <Stack direction="row" justifyContent="center" spacing={{ xs: 2, md: 8 }} sx={{ mb: 10 }}>
          {STEPS.map((step, index) => (
            <Stack key={index} alignItems="center">
              <Box sx={{ width: 50, height: 50, borderRadius: '50%', bgcolor: step.active ? COLORS.red : COLORS.black, border: `2px solid ${step.active ? COLORS.red : alpha(COLORS.white, 0.3)}`, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                <Iconify icon={step.icon} width={24} color={step.active ? COLORS.white : alpha(COLORS.white, 0.5)} />
              </Box>
              <Typography variant="caption" sx={{ fontWeight: 'bold', color: step.active ? COLORS.white : alpha(COLORS.white, 0.5) }}>{step.label}</Typography>
            </Stack>
          ))}
        </Stack>

        <m.div variants={varFade().inUp}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={5}>
                
                {/* LEFT: PAYMENT METHOD */}
                <Box sx={{ flex: 1 }}>
                    <Typography variant="h4" sx={{ mb: 3, fontWeight: 800 }}>PAYMENT METHOD</Typography>
                    <Stack spacing={2}>
                        {PAYMENT_METHODS.map((pm) => {
                            const isSelected = method === pm.id;
                            return (
                                <Box
                                    key={pm.id}
                                    onClick={() => setMethod(pm.id)}
                                    sx={{
                                        p: 3,
                                        borderRadius: 2,
                                        border: `1px solid ${isSelected ? COLORS.red : alpha(COLORS.white, 0.1)}`,
                                        bgcolor: isSelected ? alpha(COLORS.red, 0.05) : alpha(COLORS.white, 0.02),
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        transition: 'all 0.2s',
                                        '&:hover': { borderColor: COLORS.red }
                                    }}
                                >
                                    <Iconify icon={pm.icon} width={32} sx={{ color: isSelected ? COLORS.red : COLORS.white, mr: 2 }} />
                                    <Typography variant="h6" sx={{ flexGrow: 1 }}>{pm.label}</Typography>
                                    <Radio 
                                        checked={isSelected} 
                                        sx={{ color: COLORS.white, '&.Mui-checked': { color: COLORS.red } }} 
                                    />
                                </Box>
                            )
                        })}
                    </Stack>
                </Box>

                {/* RIGHT: ORDER SUMMARY */}
                <Box sx={{ width: { xs: 1, md: 400 } }}>
                    <Card sx={{ p: 4, bgcolor: alpha(COLORS.white, 0.05), border: `1px solid ${alpha(COLORS.white, 0.1)}` }}>
                        <Typography variant="h5" sx={{ mb: 3, fontWeight: 800, textTransform: 'uppercase' }}>ORDER SUMMARY</Typography>
                        
                        <Stack spacing={2} sx={{ mb: 3 }}>
                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="body2" sx={{ opacity: 0.7 }}>Club</Typography>
                                <Typography variant="subtitle2">RF Botani - Bogor</Typography>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="body2" sx={{ opacity: 0.7 }}>Plan</Typography>
                                <Typography variant="subtitle2">12 Months Saver</Typography>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="body2" sx={{ opacity: 0.7 }}>Join Fee</Typography>
                                <Typography variant="subtitle2">Rp 150.000</Typography>
                            </Stack>
                        </Stack>

                        <Divider sx={{ borderStyle: 'dashed', borderColor: alpha(COLORS.white, 0.2), mb: 3 }} />

                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                            <Typography variant="h6">TOTAL</Typography>
                            <Typography variant="h4" sx={{ color: COLORS.red }}>Rp 549.000</Typography>
                        </Stack>

                        <Button
                            fullWidth
                            size="large"
                            variant="contained"
                            sx={{
                                bgcolor: COLORS.cyan,
                                color: COLORS.black,
                                fontWeight: '900',
                                borderRadius: 50,
                                py: 1.5,
                                '&:hover': { bgcolor: alpha(COLORS.cyan, 0.8) }
                            }}
                        >
                            PAY & JOIN NOW
                        </Button>
                        
                        <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', mt: 2, opacity: 0.5 }}>
                            Secure 256-bit SSL Encrypted Payment
                        </Typography>
                    </Card>
                </Box>

            </Stack>
        </m.div>

      </Container>
    </Box>
  );
}
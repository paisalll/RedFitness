import { m } from 'framer-motion';
// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
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
  { label: 'YOUR PLAN', icon: 'solar:clipboard-list-bold', active: false },
  { label: 'YOUR DETAILS', icon: 'solar:user-id-bold', active: true }, // Active
  { label: 'PAYMENT', icon: 'solar:card-bold', active: false },
];

export default function YourDetailsView() {
  const router = useRouter();

  const handleNext = () => {
    router.push(paths.join.payment); // Ganti dengan path payment kamu
  };

  const renderTextField = (label: string, placeholder: string) => (
    <TextField
      fullWidth
      label={label}
      placeholder={placeholder}
      variant="filled"
      sx={{
        bgcolor: alpha(COLORS.white, 0.05),
        borderRadius: 1,
        '& .MuiInputLabel-root': { color: alpha(COLORS.white, 0.6) },
        '& .MuiFilledInput-root': { 
            color: COLORS.white,
            '&:before, &:after': { borderBottomColor: alpha(COLORS.white, 0.3) },
            '&:hover:before': { borderBottomColor: COLORS.white },
            '&.Mui-focused:after': { borderBottomColor: COLORS.red }
        },
      }}
    />
  );

  return (
    <Box sx={{ pb: 15 }}>
      <Container component={MotionViewport} sx={{ py: 10, color: COLORS.white }}>
        
        {/* STEPPER */}
        <Stack direction="row" justifyContent="center" spacing={{ xs: 2, md: 8 }} sx={{ mb: 10 }}>
          {STEPS.map((step, index) => (
            <Stack key={index} alignItems="center">
              <Box
                sx={{
                  width: 50, height: 50, borderRadius: '50%',
                  bgcolor: step.active ? COLORS.red : COLORS.black,
                  border: `2px solid ${step.active ? COLORS.red : alpha(COLORS.white, 0.3)}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1,
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

        {/* TITLE */}
        <m.div variants={varFade().inUp}>
          <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 900, mb: 6, textTransform: 'uppercase' }}>
            3 - WHO IS <Box component="span" sx={{ color: COLORS.red }}>JOINING?</Box>
          </Typography>
        </m.div>

        {/* FORM */}
        <m.div variants={varFade().inUp}>
          <Box sx={{ maxWidth: 800, mx: 'auto', p: 4, borderRadius: 2, border: `1px solid ${alpha(COLORS.white, 0.1)}`, bgcolor: alpha(COLORS.white, 0.02) }}>
            
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>{renderTextField('First Name', 'John')}</Grid>
              <Grid xs={12} md={6}>{renderTextField('Last Name', 'Doe')}</Grid>
              
              <Grid xs={12} md={6}>{renderTextField('Email Address', 'john@example.com')}</Grid>
              <Grid xs={12} md={6}>{renderTextField('Phone Number', '+62 812...')}</Grid>
              
              <Grid xs={12}>{renderTextField('Date of Birth', 'DD/MM/YYYY')}</Grid>
              
              <Grid xs={12}>
                <FormControlLabel
                  control={<Checkbox sx={{ color: COLORS.red, '&.Mui-checked': { color: COLORS.red } }} />}
                  label={<Typography variant="body2" sx={{ opacity: 0.8 }}>I agree to the Terms & Conditions and Privacy Policy of Red Fitness.</Typography>}
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 5, textAlign: 'right' }}>
               <Button
                  size="large"
                  variant="contained"
                  onClick={handleNext}
                  sx={{ 
                      bgcolor: COLORS.cyan, 
                      color: COLORS.black, 
                      borderRadius: 50, 
                      px: 6, 
                      fontWeight: '900',
                      '&:hover': { bgcolor: alpha(COLORS.cyan, 0.8) }
                  }}
               >
                  PROCEED TO PAYMENT
               </Button>
            </Box>

          </Box>
        </m.div>

      </Container>
    </Box>
  );
}
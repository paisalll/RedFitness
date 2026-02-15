import { useState } from 'react';
import { m } from 'framer-motion';
// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';
// components
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';
import { useRouter } from 'src/routes/hooks';

// ----------------------------------------------------------------------

const COLORS = {
  red: '#D40000',
  black: '#000000',
  white: '#FFFFFF',
  cyan: '#00FFCC',
};

export default function LoginView() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Logika login di sini
    console.log('Login clicked');
    router.push('/'); 
  };

  return (
    <Container component={MotionViewport} sx={{ py: 15, color: COLORS.white, minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
      <m.div variants={varFade().inUp} style={{ width: '100%', maxWidth: 480 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h3" sx={{ fontWeight: 900, mb: 2 }}>
            SIGN IN TO ACCESS <Box component="span" sx={{ color: COLORS.red }}>YOUR ACCOUNT</Box>
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Purchasing FITPASS? Create a new account or sign in to proceed.
          </Typography>
        </Box>

        <Stack spacing={3}>
          {/* EMAIL INPUT */}
          <Stack spacing={1}>
            <Typography variant="caption" sx={{ fontWeight: 'bold', ml: 1, textTransform: 'uppercase' }}>Email Address</Typography>
            <TextField
              fullWidth
              placeholder="your@email.com"
              variant="filled"
              sx={{
                '& .MuiFilledInput-root': {
                  bgcolor: alpha(COLORS.white, 0.05),
                  borderRadius: 1,
                  color: COLORS.white,
                  '&:hover': { bgcolor: alpha(COLORS.white, 0.08) },
                  '&.Mui-focused': { bgcolor: alpha(COLORS.white, 0.08) },
                  '&:before, &:after': { borderBottom: 'none' } // Hilangkan garis bawah default MUI
                },
                '& .MuiInputBase-input': { p: 2.5 }
              }}
            />
          </Stack>

          {/* PASSWORD INPUT */}
          <Stack spacing={1}>
            <Typography variant="caption" sx={{ fontWeight: 'bold', ml: 1, textTransform: 'uppercase' }}>Password</Typography>
            <TextField
              fullWidth
              placeholder="Your Password"
              type={showPassword ? 'text' : 'password'}
              variant="filled"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: alpha(COLORS.white, 0.6) }}>
                      <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiFilledInput-root': {
                  bgcolor: alpha(COLORS.white, 0.05),
                  borderRadius: 1,
                  color: COLORS.white,
                  '&:hover': { bgcolor: alpha(COLORS.white, 0.08) },
                  '&.Mui-focused': { bgcolor: alpha(COLORS.white, 0.08) },
                  '&:before, &:after': { borderBottom: 'none' }
                },
                '& .MuiInputBase-input': { p: 2.5 }
              }}
            />
          </Stack>

          {/* CHECKBOX */}
          <FormControlLabel
            control={
              <Checkbox 
                sx={{ 
                  color: alpha(COLORS.white, 0.6), 
                  '&.Mui-checked': { color: COLORS.red } 
                }} 
              />
            }
            label={
              <Typography variant="body2" sx={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.75rem' }}>
                Keep me signed in
              </Typography>
            }
          />

          {/* SIGN IN BUTTON */}
          <Button
            fullWidth
            size="large"
            variant="contained"
            onClick={handleLogin}
            sx={{
              bgcolor: COLORS.cyan,
              color: COLORS.black,
              fontWeight: '900',
              fontSize: '1rem',
              borderRadius: 50,
              py: 1.5,
              mt: 2,
              boxShadow: `0 0 20px ${alpha(COLORS.cyan, 0.3)}`,
              '&:hover': { 
                bgcolor: alpha(COLORS.cyan, 0.8),
                boxShadow: `0 0 30px ${alpha(COLORS.cyan, 0.5)}`,
              }
            }}
          >
            SIGN IN
          </Button>

          {/* FOOTER LINKS */}
          <Stack alignItems="center" spacing={1} sx={{ mt: 3 }}>
            <Stack direction="row" spacing={0.5}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>Forgot password?</Typography>
              <Link href="#" underline="hover" sx={{ color: COLORS.cyan, fontWeight: 'bold', cursor: 'pointer' }}>
                Click here
              </Link>
            </Stack>
            
            <Stack direction="row" spacing={0.5}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>Don't have an account yet?</Typography>
              <Link href="/join/select-club" underline="hover" sx={{ color: COLORS.cyan, fontWeight: 'bold', cursor: 'pointer' }}>
                Create a new account
              </Link>
            </Stack>
          </Stack>

        </Stack>
      </m.div>

    </Container>
  );
}
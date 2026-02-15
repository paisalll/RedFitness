// src/layouts/booking/index.tsx

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import Logo from 'src/components/logo';
import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function BookingLayout({ children }: Props) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#000000' }}>
      
      {/* 1. MINIMAL HEADER */}
      <Box
        component="header"
        sx={{
          py: 3,
          borderBottom: '1px solid rgba(255,255,255, 0.1)',
        }}
      >
        <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Logo />
            <Typography variant="overline" sx={{ color: 'white', opacity: 0.7, display: { xs: 'none', md: 'block' } }}>
              CLASS BOOKING
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2}>
             <Button component={RouterLink} href="/" color="inherit" sx={{ color: 'white' }}>
                Home
             </Button>
             <Button variant="outlined" sx={{ color: '#D40000', borderColor: '#D40000' }} href='/login'>
                LOGIN
             </Button>
          </Stack>
        </Container>
      </Box>

      {/* 2. MAIN CONTENT */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>

      {/* 3. MINIMAL FOOTER */}
      <Box
        component="footer"
        sx={{
          py: 3,
          textAlign: 'center',
          borderTop: '1px solid rgba(255,255,255, 0.1)',
        }}
      >
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          Copyright © 2026 Red Fitness. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
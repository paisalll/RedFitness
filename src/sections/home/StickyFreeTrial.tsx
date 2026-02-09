import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
// components
import Iconify from 'src/components/iconify';
import { varHover } from 'src/components/animate';

// ----------------------------------------------------------------------

export default function StickyFreeTrial() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      {/* Container Utama Fixed Position */}
      <Box
        component={m.div}
        initial={false}
        animate={open ? 'open' : 'closed'}
        variants={{
          open: { x: 0 },
          closed: { x: 380 }, // Sembunyikan form (geser ke kanan sebesar lebar form)
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 30 }}
        sx={{
          position: 'fixed',
          top: '20%', // Posisi vertikal (bisa disesuaikan)
          right: 0,
          zIndex: 9999, // Pastikan di atas semua elemen
          display: 'flex',
          alignItems: 'flex-start',
        }}
      >
        {/* 1. TRIGGER TAB (Tombol Vertikal) */}
        <Box
          onClick={toggleSidebar}
          sx={{
            cursor: 'pointer',
            bgcolor: '#ff0055', // Warna Pink kemerahan (sesuai gambar)
            color: 'common.white',
            p: 2,
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8,
            boxShadow: theme.customShadows.z24,
            writingMode: 'vertical-rl', // Membuat teks vertikal
            textOrientation: 'mixed',
            transform: 'rotate(180deg)', // Agar teks terbaca dari bawah ke atas
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 'auto',
            minHeight: 120,
            fontWeight: 800,
            letterSpacing: 2,
            fontSize: 14,
            '&:hover': {
              bgcolor: '#d40045',
            },
          }}
        >
          {open ? 'CLOSE' : 'TRY US FOR FREE'}
        </Box>

        {/* 2. FORM PANEL */}
        <Box
          sx={{
            width: 380,
            bgcolor: 'grey.900', // Dark background
            p: 3,
            height: 'auto',
            minHeight: 450,
            boxShadow: `-24px 24px 72px -8px ${alpha(theme.palette.common.black, 0.48)}`,
            borderLeft: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ color: 'common.white' }}>
              GET FREE TRIAL
            </Typography>
            <IconButton onClick={toggleSidebar} size="small" sx={{ color: 'text.primary' }}>
              <Iconify icon="eva:close-fill" />
            </IconButton>
          </Stack>

          <Stack spacing={2}>
            <TextField
              fullWidth
              size="small"
              placeholder="First Name"
              sx={{ bgcolor: alpha(theme.palette.grey[800], 0.5), borderRadius: 1 }}
            />
            <TextField
              fullWidth
              size="small"
              placeholder="Last Name"
              sx={{ bgcolor: alpha(theme.palette.grey[800], 0.5), borderRadius: 1 }}
            />
            <TextField
              fullWidth
              size="small"
              placeholder="Email Address"
              sx={{ bgcolor: alpha(theme.palette.grey[800], 0.5), borderRadius: 1 }}
            />
            <TextField
              fullWidth
              size="small"
              placeholder="Phone Number"
              sx={{ bgcolor: alpha(theme.palette.grey[800], 0.5), borderRadius: 1 }}
            />
            
            <TextField 
                select 
                fullWidth 
                size="small" 
                defaultValue="" 
                sx={{ bgcolor: alpha(theme.palette.grey[800], 0.5), borderRadius: 1 }}
            >
                <MenuItem value="" disabled>Preferred Club</MenuItem>
                <MenuItem value="jakarta">Jakarta</MenuItem>
                <MenuItem value="tangerang">Tangerang</MenuItem>
            </TextField>

            <Button
              variant="contained"
              color="primary" // Cyan/Teal
              size="large"
              sx={{
                mt: 2,
                borderRadius: 30,
                fontWeight: 'bold',
                boxShadow: `0 8px 16px 0 ${alpha(theme.palette.primary.main, 0.24)}`
              }}
            >
              SUBMIT
            </Button>
          </Stack>
        </Box>
      </Box>
      
      {/* Optional: Overlay background jika ingin layar belakang gelap saat form terbuka */}
      {/* <AnimatePresence>
        {open && (
            <Box 
                component={m.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={toggleSidebar}
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    bgcolor: 'rgba(0,0,0,0.5)',
                    zIndex: 9998,
                }}
            />
        )}
      </AnimatePresence> */}
    </>
  );
}
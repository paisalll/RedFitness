// @mui
import { useTheme, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
// hooks
import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';
// components
import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
// local
import { HEADER } from '../config-layout';
import { navConfig } from './config-navigation';
import NavMobile from './nav/mobile';
import NavDesktop from './nav/desktop';
import { Typography } from '@mui/material';
import path from 'path';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

// ----------------------------------------------------------------------

// KONFIGURASI WARNA
const COLORS = {
  red: '#D40000',
  black: '#000000',
  white: '#FFFFFF',
};

export default function Header() {
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');
  const offsetTop = useOffSetTop(HEADER.H_DESKTOP);
  const router = useRouter();

  return (
    <AppBar
      sx={{
        bgcolor: COLORS.black, // Background Hitam Pekat
        boxShadow: 'none',
        borderBottom: `1px solid ${alpha(COLORS.white, 0.1)}`,
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_DESKTOP,
          },
          transition: theme.transitions.create(['height'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(offsetTop && {
            height: {
              md: HEADER.H_DESKTOP_OFFSET,
            },
            bgcolor: alpha(COLORS.black, 0.8),
            backdropFilter: 'blur(10px)',
          }),
        }}
      >
        <Container sx={{ height: 1, display: 'flex', alignItems: 'center' }}>
          
          {/* 1. LOGO (Kiri) */}
          <Logo />

          <Box sx={{ flexGrow: 1 }} />

          {/* 2. NAVIGATION DESKTOP (Tengah-Kanan) */}
          {mdUp && (
            <Box sx={{ mr: 3 }}>
              <NavDesktop 
                offsetTop={offsetTop} 
                data={navConfig} 
                // Catatan: Pastikan di NavDesktop kamu juga mengubah warna teks menjadi Putih & Hover Merah
              />
            </Box>
          )}

          {/* 3. ACTIONS (Kanan) */}
          <Stack direction="row" alignItems="center" spacing={2}>
            
            {/* Tombol Join Online - Gaya Outline Merah/Putih */}
            {mdUp && (
              <Button
                variant="outlined"
                endIcon={<Iconify icon="solar:arrow-right-up-bold" width={18} />}
                sx={{
                  color: COLORS.white,
                  borderColor: COLORS.white,
                  borderRadius: 50, // Capsule shape
                  px: 3,
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  '&:hover': {
                    borderColor: COLORS.red,
                    color: COLORS.red,
                    bgcolor: alpha(COLORS.red, 0.08),
                  },
                }}
                onClick={() => router.push(paths.join.select)}
              >
                Join Online
              </Button>
            )}

            {/* Icons Group (Calendar, Location, Profile) */}
            <Stack direction="row" spacing={1.5} sx={{ color: COLORS.white }}>
              <Iconify icon="solar:calendar-minimalistic-bold" width={24} sx={{ cursor: 'pointer', '&:hover': { color: COLORS.red } }} onClick={() => router.push(paths.timetable)} />
              <Iconify icon="solar:map-point-bold" width={24} sx={{ cursor: 'pointer', '&:hover': { color: COLORS.red } }} onClick={() => router.push(paths.clubs)} />
              <Iconify icon="solar:user-circle-bold" width={24} sx={{ cursor: 'pointer', '&:hover': { color: COLORS.red } }} />
              
              {/* Language Selector Dummy */}
              <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                ID | EN <Iconify icon="eva:chevron-down-fill" width={16} />
              </Typography>
            </Stack>

            {!mdUp && <NavMobile offsetTop={offsetTop} data={navConfig} />}
          </Stack>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
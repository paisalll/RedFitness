// @mui
import { useTheme, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
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
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

// ----------------------------------------------------------------------

// KONFIGURASI WARNA DIUPDATE SESUAI TEMA
const RED = '#DF2026';
const RED_DARK = '#A8171C';
const BLACK = '#060606';

export default function Header() {
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');
  const offsetTop = useOffSetTop(HEADER.H_DESKTOP);
  const router = useRouter();

  return (
    <AppBar
      sx={{
        bgcolor: BLACK, // Background Hitam Pekat
        boxShadow: 'none',
        borderBottom: `1px solid ${alpha('#fff', 0.06)}`,
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_DESKTOP,
          },
          transition: theme.transitions.create(['height', 'background-color', 'border-bottom'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(offsetTop && {
            height: {
              md: HEADER.H_DESKTOP_OFFSET,
            },
            bgcolor: alpha(BLACK, 0.9),
            backdropFilter: 'blur(10px)',
            borderBottom: `1px solid ${alpha(RED, 0.25)}`, // Aksen border merah saat di-scroll
          }),
        }}
      >
        <Container sx={{ height: 1, display: 'flex', alignItems: 'center' }}>
          
          {/* 1. LOGO (Kiri) - Diperbesar dengan scale */}
          <Box 
            sx={{ 
              transform: { xs: 'scale(1.1)', md: 'scale(1.25)' }, 
              transformOrigin: 'left center', 
              display: 'flex',
              mr: 2
            }}
          >
            <Logo />
          </Box>

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
          <Stack direction="row" alignItems="center" spacing={2.5}>
            
            {/* Tombol Join Online - Diupdate ke gaya tajam jika ingin digunakan nanti */}
            {/* {mdUp && (
              <Button
                variant="outlined"
                endIcon={<Iconify icon="solar:arrow-right-up-bold" width={18} />}
                sx={{
                  color: 'common.white',
                  borderColor: alpha('#fff', 0.3),
                  borderRadius: 0, // Dibuat kotak tajam
                  px: 3,
                  py: 1,
                  fontWeight: 800,
                  fontFamily: 'monospace',
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                  '&:hover': {
                    borderColor: RED,
                    color: RED,
                    bgcolor: alpha(RED, 0.08),
                  },
                }}
                onClick={() => router.push(paths.join.select)}
              >
                Join Online
              </Button>
            )} */}

            {/* Icons Group (Calendar, Location, Profile) */}
            <Stack direction="row" spacing={2} sx={{ color: 'common.white', alignItems: 'center' }}>
              <Iconify icon="solar:calendar-minimalistic-bold" width={22} sx={{ cursor: 'pointer', transition: 'color 0.2s', '&:hover': { color: RED } }} onClick={() => router.push(paths.timetable)} />
              <Iconify icon="solar:map-point-bold" width={22} sx={{ cursor: 'pointer', transition: 'color 0.2s', '&:hover': { color: RED } }} onClick={() => router.push(paths.clubs)} />
              <Iconify icon="solar:user-circle-bold" width={22} sx={{ cursor: 'pointer', transition: 'color 0.2s', '&:hover': { color: RED } }} />
              
              {/* Language Selector dengan Monospace font */}
              <Typography 
                variant="caption" 
                sx={{ 
                  fontWeight: 700, 
                  display: 'flex', 
                  alignItems: 'center', 
                  cursor: 'pointer',
                  fontFamily: 'monospace',
                  transition: 'color 0.2s',
                  '&:hover': { color: RED }
                }}
              >
                ID <Box component="span" sx={{ color: alpha('#fff', 0.3), mx: 0.5 }}>|</Box> EN <Iconify icon="eva:chevron-down-fill" width={16} sx={{ ml: 0.5 }} />
              </Typography>
            </Stack>

            {!mdUp && <NavMobile offsetTop={offsetTop} data={navConfig} />}
          </Stack>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
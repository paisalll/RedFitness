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
          
          {/* 1. LOGO (Kiri) */}
          <Box
            sx={{
              transform: { xs: 'scale(1.05)', md: 'scale(1.1)' },
              transformOrigin: 'left center',
              display: 'flex',
              mr: 1.5,
              flexShrink: 0,
            }}
          >
            <Logo />
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {/* 2. NAVIGATION DESKTOP */}
          {mdUp && (
            <NavDesktop offsetTop={offsetTop} data={navConfig} />
          )}

          {/* 3. ACTIONS (Kanan) */}
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Stack direction="row" spacing={1.5} sx={{ color: 'common.white', alignItems: 'center' }}>
              <Iconify
                icon="solar:calendar-minimalistic-bold"
                width={20}
                sx={{ cursor: 'pointer', transition: 'color 0.2s', '&:hover': { color: RED } }}
                onClick={() => router.push(paths.timetable)}
              />
              <Iconify
                icon="solar:map-point-bold"
                width={20}
                sx={{ cursor: 'pointer', transition: 'color 0.2s', '&:hover': { color: RED } }}
                onClick={() => router.push(paths.clubs)}
              />
              <Iconify
                icon="solar:user-circle-bold"
                width={20}
                sx={{ cursor: 'pointer', transition: 'color 0.2s', '&:hover': { color: RED } }}
              />

              {/* Language Selector — hidden on smaller desktops to save space */}
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                  display: { xs: 'none', xl: 'flex' },
                  alignItems: 'center',
                  cursor: 'pointer',
                  fontFamily: 'monospace',
                  fontSize: '0.7rem',
                  transition: 'color 0.2s',
                  '&:hover': { color: RED },
                }}
              >
                ID <Box component="span" sx={{ color: alpha('#fff', 0.3), mx: 0.5 }}>|</Box> EN
                <Iconify icon="eva:chevron-down-fill" width={14} sx={{ ml: 0.25 }} />
              </Typography>
            </Stack>

            {!mdUp && <NavMobile offsetTop={offsetTop} data={navConfig} />}
          </Stack>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
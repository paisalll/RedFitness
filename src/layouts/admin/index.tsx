import { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
  Typography, Button, Avatar, Stack, CircularProgress,
} from '@mui/material';
import Iconify from 'src/components/iconify';
import { useAdminAuth, type AdminRole } from 'src/contexts/admin-auth-context';

const DRAWER_WIDTH = 260;

const NAV_ITEMS: { label: string; path: string; icon: string; roles: AdminRole[] }[] = [
  { label: 'Dashboard', path: '/rf-admin/dashboard', icon: 'solar:chart-2-bold-duotone', roles: ['admin', 'schedule_manager'] },
  { label: 'Clubs', path: '/rf-admin/clubs', icon: 'solar:buildings-2-bold-duotone', roles: ['admin'] },
  { label: 'Classes', path: '/rf-admin/classes', icon: 'solar:dumbbell-bold-duotone', roles: ['admin'] },
  { label: 'Schedules', path: '/rf-admin/schedules', icon: 'solar:calendar-bold-duotone', roles: ['admin', 'schedule_manager'] },
  { label: 'Banners', path: '/rf-admin/banners', icon: 'solar:gallery-wide-bold-duotone', roles: ['admin'] },
  { label: 'Page Content', path: '/rf-admin/content', icon: 'solar:document-text-bold-duotone', roles: ['admin'] },
  { label: 'Registrations', path: '/rf-admin/registrations', icon: 'solar:users-group-rounded-bold-duotone', roles: ['admin'] },
];

export default function AdminLayout() {
  const { user, role, loading, signOut } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/rf-admin/login', { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', bgcolor: '#0A0A0A' }}>
        <CircularProgress sx={{ color: '#DF2026' }} />
      </Box>
    );
  }

  if (!user) return null;

  const visibleItems = NAV_ITEMS.filter((item) => role && item.roles.includes(role));

  const handleSignOut = async () => {
    await signOut();
    navigate('/rf-admin/login', { replace: true });
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#111' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            bgcolor: '#0A0A0A',
            border: 'none',
            borderRight: '1px solid rgba(255,255,255,0.06)',
          },
        }}
      >
        {/* Logo */}
        <Box sx={{ p: 3, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box sx={{ width: 6, height: 28, bgcolor: '#DF2026', borderRadius: 0.5, flexShrink: 0 }} />
            <Box>
              <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '0.95rem', lineHeight: 1, fontFamily: "'Poppins', sans-serif" }}>
                RED FITNESS
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.6rem', letterSpacing: 2.5, textTransform: 'uppercase', fontFamily: 'monospace', mt: 0.25 }}>
                Admin Panel
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* Navigation */}
        <Box sx={{ flex: 1, py: 2 }}>
          <List disablePadding>
            {visibleItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <ListItem key={item.path} disablePadding sx={{ px: 1.5, mb: 0.5 }}>
                  <ListItemButton
                    onClick={() => navigate(item.path)}
                    sx={{
                      borderRadius: 1,
                      py: 1.25,
                      px: 1.5,
                      bgcolor: isActive ? 'rgba(223,32,38,0.1)' : 'transparent',
                      border: `1px solid ${isActive ? 'rgba(223,32,38,0.25)' : 'transparent'}`,
                      '&:hover': {
                        bgcolor: isActive ? 'rgba(223,32,38,0.14)' : 'rgba(255,255,255,0.04)',
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <Iconify
                        icon={item.icon}
                        width={20}
                        sx={{ color: isActive ? '#DF2026' : 'rgba(255,255,255,0.35)' }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontSize: '0.875rem',
                        fontWeight: isActive ? 700 : 500,
                        color: isActive ? '#fff' : 'rgba(255,255,255,0.5)',
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>

        {/* User info + Logout */}
        <Box sx={{ p: 2, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1.5 }}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: '#DF2026', fontSize: '0.75rem', flexShrink: 0 }}>
              {user?.email?.charAt(0).toUpperCase()}
            </Avatar>
            <Box sx={{ overflow: 'hidden', flex: 1 }}>
              <Typography sx={{ color: '#fff', fontSize: '0.78rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user?.email}
              </Typography>
              <Typography sx={{ color: role === 'admin' ? '#DF2026' : 'rgba(255,255,255,0.35)', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: 1 }}>
                {role === 'admin' ? 'Administrator' : 'Schedule Manager'}
              </Typography>
            </Box>
          </Stack>
          <Button
            fullWidth
            variant="outlined"
            size="small"
            startIcon={<Iconify icon="solar:logout-2-bold" width={16} />}
            onClick={handleSignOut}
            sx={{
              color: 'rgba(255,255,255,0.45)',
              borderColor: 'rgba(255,255,255,0.1)',
              fontSize: '0.75rem',
              '&:hover': { borderColor: '#DF2026', color: '#DF2026', bgcolor: 'rgba(223,32,38,0.06)' },
            }}
          >
            Logout
          </Button>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flex: 1, overflow: 'auto', minHeight: '100vh' }}>
        <Outlet />
      </Box>
    </Box>
  );
}

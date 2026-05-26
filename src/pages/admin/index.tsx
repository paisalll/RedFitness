import { Box, Typography, Grid, Card, Stack, CircularProgress } from '@mui/material';
import Iconify from 'src/components/iconify';
import { useAdminAuth } from 'src/contexts/admin-auth-context';
import { useAdminCounts } from 'src/api/admin';

const STATS = [
  { key: 'clubs', label: 'Total Clubs', icon: 'solar:buildings-2-bold-duotone' },
  { key: 'classes', label: 'Total Classes', icon: 'solar:dumbbell-bold-duotone' },
  { key: 'schedules', label: 'Total Schedules', icon: 'solar:calendar-bold-duotone' },
] as const;

export default function AdminDashboardPage() {
  const { user } = useAdminAuth();
  const { counts, isLoading: loading } = useAdminCounts();

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4" sx={{ color: '#fff', fontWeight: 800, fontFamily: "'Poppins', sans-serif" }}>
          Dashboard
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.875rem', mt: 0.5 }}>
          Welcome back, {user?.email}
        </Typography>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
          <CircularProgress sx={{ color: '#DF2026' }} />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {STATS.map((stat) => (
            <Grid item xs={12} sm={6} md={4} key={stat.key}>
              <Card
                sx={{
                  p: 3,
                  bgcolor: '#1A1A1A',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 2,
                  boxShadow: 'none',
                }}
              >
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography
                      sx={{
                        color: 'rgba(255,255,255,0.35)',
                        fontSize: '0.7rem',
                        textTransform: 'uppercase',
                        letterSpacing: 1.5,
                        mb: 1,
                        fontFamily: 'monospace',
                      }}
                    >
                      {stat.label}
                    </Typography>
                    <Typography variant="h3" sx={{ color: '#fff', fontWeight: 800, lineHeight: 1 }}>
                      {counts[stat.key]}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: 1.5,
                      bgcolor: 'rgba(223,32,38,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Iconify icon={stat.icon} width={28} sx={{ color: '#DF2026' }} />
                  </Box>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

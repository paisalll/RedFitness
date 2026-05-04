import { m } from 'framer-motion';
// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
// components
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

const RED = '#DF2026';
const BLACK = '#060606';

const STATS = [
  { value: '25', label: 'CLUBS' },
  { value: '7', label: 'CLASS TYPES' },
  { value: '85', label: 'CLASSES' },
  { value: '7,000', label: 'CLASSES PER MONTH' },
  { value: '45,000', label: 'MEMBERS' },
];

const STEPS = [
  {
    step: '01',
    title: 'GET STARTED',
    description: 'Fill in your details and select your preferred club.',
    icon: 'solar:cursor-bold-duotone',
  },
  {
    step: '02',
    title: 'SELECT CLUB ACCESS',
    description: 'Choose a Home Club or add Passport Access to all clubs.',
    icon: 'solar:shop-2-bold-duotone',
  },
  {
    step: '03',
    title: 'SELECT BRAND ACCESS',
    description: 'Confirm your personal details and make payment.',
    icon: 'solar:card-verified-bold-duotone',
  },
];

export default function HomeJoinSteps() {

  const renderStats = (
    <Grid container spacing={3} justifyContent="center" sx={{ mb: { xs: 10, md: 15 } }}>
      {STATS.map((stat, index) => (
        <Grid key={stat.label} xs={6} md={2.4}>
          <m.div variants={varFade().inUp} transition={{ delay: index * 0.1 }} style={{ height: '100%' }}>
            <Box
              sx={{
                py: 5,
                px: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                borderRadius: 0, // Sharp
                bgcolor: '#080808',
                border: `1px solid ${alpha(RED, 0.15)}`,
                transition: 'all 0.3s',
                '&:hover': {
                    borderColor: RED,
                    bgcolor: '#0c0c0c',
                    transform: 'translateY(-4px)'
                }
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  mb: 1,
                  fontWeight: 900,
                  color: RED,
                  fontFamily: "'Poppins', sans-serif",
                  lineHeight: 1
                }}
              >
                {stat.value}
              </Typography>
              <Typography sx={{ color: alpha('#fff', 0.6), fontFamily: 'monospace', fontSize: '0.7rem', fontWeight: 800, letterSpacing: 1 }}>
                {stat.label}
              </Typography>
            </Box>
          </m.div>
        </Grid>
      ))}
    </Grid>
  );

  const renderSteps = (
    <Box>
      <m.div variants={varFade().inDown}>
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={1.5} sx={{ mb: 2 }}>
            <Box sx={{ width: 28, height: 2, bgcolor: RED }} />
            <Typography sx={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: 4, textTransform: 'uppercase', color: RED, fontFamily: 'monospace' }}>
                Join Us
            </Typography>
            <Box sx={{ width: 28, height: 2, bgcolor: RED }} />
        </Stack>
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
            mb: 8,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: -2,
            lineHeight: 0.95,
            color: '#fff',
            fontFamily: "'Poppins', sans-serif"
          }}
        >
          Join Online in <br/> <span style={{ color: RED, fontStyle: 'italic' }}>3 Easy Steps.</span>
        </Typography>
      </m.div>

      <Grid container spacing={4}>
        {STEPS.map((item, index) => (
          <Grid key={item.step} xs={12} md={4}>
            <m.div variants={varFade().inUp} transition={{ delay: index * 0.2 }} style={{ height: '100%' }}>
              <Card
                sx={{
                  p: 4,
                  height: 1,
                  borderRadius: 0, // Sharp
                  bgcolor: '#080808',
                  border: `1px solid ${alpha(RED, 0.2)}`,
                  borderTop: `4px solid ${RED}`,
                  boxShadow: 'none',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    bgcolor: '#0c0c0c',
                    borderColor: alpha(RED, 0.4),
                  },
                }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    mb: 2,
                    fontWeight: 900,
                    fontFamily: "'Poppins', sans-serif",
                    color: 'transparent',
                    WebkitTextStroke: `1px ${alpha(RED, 0.5)}`, // Outline effect
                    opacity: 0.8,
                    lineHeight: 1
                  }}
                >
                  {item.step}
                </Typography>

                <Typography variant="h5" sx={{ mb: 3, fontWeight: 800, color: '#fff', fontFamily: "'Poppins', sans-serif", textTransform: 'uppercase' }}>
                  {item.title}
                </Typography>

                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <Iconify
                    icon={item.icon}
                    width={24}
                    sx={{ color: RED, mt: 0.2, flexShrink: 0 }}
                  />
                  <Typography sx={{ color: alpha('#fff', 0.6), fontSize: '0.85rem', lineHeight: 1.7 }}>
                    {item.description}
                  </Typography>
                </Stack>
              </Card>
            </m.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  return (
    <Box
      sx={{
        bgcolor: BLACK,
        py: { xs: 10, md: 15 },
        overflow: 'hidden',
        borderTop: `1px solid ${alpha(RED, 0.15)}`
      }}
    >
      <Container component={MotionViewport}>
        {renderStats}
        {renderSteps}
      </Container>
    </Box>
  );
}
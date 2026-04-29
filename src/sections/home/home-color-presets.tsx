import { m } from 'framer-motion';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// components
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

const RED = '#DF2026';
const RED_DARK = '#A8171C';
const BLACK = '#060606';

// ----------------------------------------------------------------------

const BENEFITS = [
  {
    icon: 'solar:dumbbell-large-bold-duotone',
    node: (
      <>
        World-class equipment, high-performance classes, and{' '}
        <Box component="span" sx={{ fontWeight: 800, color: 'common.white', fontFamily: "'Poppins', sans-serif" }}>
          Premium Reformer Pilates
        </Box>{' '}
        built for those who expect more.
      </>
    ),
  },
  {
    icon: 'solar:heart-pulse-bold-duotone',
    node: "Precision-led fitness assessment to unlock your body's full potential.",
  },
  {
    icon: 'solar:diploma-bold-duotone',
    node: "Elite, certified trainers who don't just guide you — evolve with them.",
  },
  {
    icon: 'solar:users-group-rounded-bold-duotone',
    node: 'A driven community that pushes you further, every single day.',
  },
  {
    icon: 'solar:hand-stars-bold-duotone',
    node: (
      <>
        <Box component="span" sx={{ fontWeight: 800, color: 'common.white', fontFamily: "'Poppins', sans-serif" }}>
          The first chain gym to include complimentary Japanese Seitai Therapy by Red Seitai seamlessly included in your membership. 
        </Box>{' '}
      </>
    ),
  },
  {
    icon: 'solar:map-bold-duotone',
    node: 'One membership. Multiple clubs. Unlimited access to your next level.',
  },
];

// ----------------------------------------------------------------------

const inputSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 0, // Input form dibuat tajam ujungnya
    color: 'common.white',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.12)' },
    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.25)' },
    '&.Mui-focused fieldset': { borderColor: RED },
  },
  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.4)' },
  '& .MuiInputLabel-root.Mui-focused': { color: RED },
  '& .MuiSelect-icon': { color: 'rgba(255,255,255,0.4)' },
};

// ----------------------------------------------------------------------

export default function HomeFreeTrial() {
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');

  const renderForm = (
    <Box
      sx={{
        p: { xs: 3, md: 4.5 },
        borderRadius: 0, // Kotak form dibuat tajam
        backdropFilter: 'blur(20px)',
        bgcolor: alpha(BLACK, 0.88),
        border: `1px solid ${alpha(RED, 0.25)}`,
        boxShadow: `-20px 20px 60px -8px ${alpha(BLACK, 0.6)}`,
      }}
    >
      <Stack spacing={3}>
        <Box>
          {/* Overline Form */}
          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
            <Box sx={{ width: 28, height: 2, bgcolor: RED, flexShrink: 0 }} />
            <Typography
              sx={{
                fontSize: '0.65rem',
                fontWeight: 800,
                letterSpacing: 4,
                textTransform: 'uppercase',
                color: RED,
                fontFamily: 'monospace',
              }}
            >
              Limited Offer
            </Typography>
          </Stack>

          <Typography 
            variant="h4" 
            sx={{ 
              color: 'common.white', 
              mb: 1.5, 
              lineHeight: 1.1, 
              fontWeight: 800, 
              fontFamily: "'Poppins', sans-serif",
              textTransform: 'uppercase',
              letterSpacing: -1,
            }}
          >
            Claim Your 1-Week{' '}
            <Box component="span" sx={{ color: RED, display: 'block', fontStyle: 'italic' }}>
              Free Membership
            </Box>
          </Typography>
          <Typography variant="body2" sx={{ color: alpha('#fff', 0.5), lineHeight: 1.7 }}>
            Experience full access to our facilities, classes, and premium services — on us.
          </Typography>
        </Box>

        <Divider sx={{ borderColor: alpha(RED, 0.15) }} />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
          <TextField fullWidth label="First Name" placeholder="Enter First Name" size="small" sx={inputSx} />
          <TextField fullWidth label="Last Name" placeholder="Enter Last Name" size="small" sx={inputSx} />
        </Stack>

        <TextField fullWidth label="Email Address" placeholder="example@mail.com" size="small" sx={inputSx} />
        <TextField fullWidth label="Phone Number" placeholder="+62 812..." size="small" sx={inputSx} />

        <TextField select fullWidth label="Preferred Club" defaultValue="" size="small" sx={inputSx}>
          <MenuItem value="jakarta">Jakarta - Central Park</MenuItem>
          <MenuItem value="tangerang">Tangerang - AEON BSD</MenuItem>
          <MenuItem value="surabaya">Surabaya - Galaxy Mall</MenuItem>
        </TextField>

        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              size="small"
              sx={{ color: alpha('#fff', 0.3), '&.Mui-checked': { color: RED } }}
            />
          }
          label={
            <Typography variant="caption" sx={{ color: alpha('#fff', 0.45) }}>
              I agree to the{' '}
              <Box component="span" sx={{ color: RED, textDecoration: 'underline', cursor: 'pointer' }}>
                Terms
              </Box>{' '}
              and Data Privacy policy.
            </Typography>
          }
        />

        <Button
          size="large"
          variant="contained"
          endIcon={<Iconify icon="solar:arrow-right-up-bold" width={18} />}
          sx={{
            py: 1.75,
            px: 5,
            fontSize: '0.72rem',
            fontWeight: 800,
            letterSpacing: 2.5,
            textTransform: 'uppercase',
            fontFamily: 'monospace',
            borderRadius: 0, // Button tajam
            bgcolor: RED,
            color: '#fff',
            boxShadow: 'none',
            '&:hover': {
              bgcolor: RED_DARK,
              boxShadow: 'none',
            },
          }}
        >
          Claim My Free Week
        </Button>
      </Stack>
    </Box>
  );

  const renderContent = (
    <Stack spacing={4} sx={{ maxWidth: 500, mx: { xs: 'auto', md: 'unset' } }}>
      <m.div variants={varFade().inRight}>
        {/* Overline Content */}
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
            <Box sx={{ width: 28, height: 2, bgcolor: RED, flexShrink: 0 }} />
            <Typography
              sx={{
                fontSize: '0.65rem',
                fontWeight: 800,
                letterSpacing: 4,
                textTransform: 'uppercase',
                color: RED,
                fontFamily: 'monospace',
              }}
            >
              Why Choose Us
            </Typography>
        </Stack>

        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            textTransform: 'uppercase',
            lineHeight: 0.95,
            letterSpacing: -2,
            mb: 3,
            color: 'common.white',
            fontFamily: "'Poppins', sans-serif",
            fontSize: { xs: '2.5rem', md: '4.5rem' },
          }}
        >
          Check Us <br/>
          <Box component="span" sx={{ color: RED, fontStyle: 'italic' }}>
            Out.
          </Box>
        </Typography>
        <Typography sx={{ color: alpha('#fff', 0.55), lineHeight: 1.85, fontSize: '0.88rem' }}>
          This isn&apos;t just fitness. This is a standard — a place where discipline meets lifestyle,
          and results become identity. Train with intent. Move with purpose. Become your strongest self.
        </Typography>
      </m.div>

      <Stack spacing={0}>
        {BENEFITS.map((item, index) => (
          <m.div key={index} variants={varFade({ distance: 20 }).inRight}>
            <Stack 
              direction="row" 
              spacing={2.5} 
              alignItems="flex-start" 
              sx={{ 
                py: 2.5, 
                borderBottom: `1px solid ${alpha('#fff', 0.06)}`,
                transition: 'background 0.3s',
                '&:hover': { bgcolor: alpha(RED, 0.025) },
              }}
            >
              <Box
                sx={{
                  mt: 0.2,
                  minWidth: 42,
                  height: 42,
                  borderRadius: 0, // Icon box tajam
                  bgcolor: 'transparent',
                  border: `1px solid ${alpha(RED, 0.2)}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'background 0.2s',
                  '&:hover': { bgcolor: alpha(RED, 0.1) },
                }}
              >
                <Iconify icon={item.icon} width={22} sx={{ color: RED }} />
              </Box>
              <Typography
                variant="body2"
                sx={{ color: alpha('#fff', 0.72), fontWeight: 500, lineHeight: 1.75, pt: 0.7, fontSize: '0.82rem' }}
              >
                {item.node}
              </Typography>
            </Stack>
          </m.div>
        ))}
      </Stack>
    </Stack>
  );

  return (
    <Box
      sx={{
        py: { xs: 10, md: 15 },
        position: 'relative',
        overflow: 'hidden',
        background: `linear-gradient(145deg, ${RED_DARK} 0%, ${BLACK} 55%, #0a0a0a 100%)`, // Gradien menggunakan merah gelap ke hitam
      }}
    >
      {/* Decorative glow — top left */}
      <Box
        sx={{
          position: 'absolute',
          top: -120,
          left: -120,
          width: 560,
          height: 560,
          borderRadius: '50%',
          background: alpha(RED, 0.12),
          filter: 'blur(110px)',
          pointerEvents: 'none',
        }}
      />
      {/* Decorative glow — bottom right */}
      <Box
        sx={{
          position: 'absolute',
          bottom: -80,
          right: -80,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: alpha(RED, 0.06),
          filter: 'blur(90px)',
          pointerEvents: 'none',
        }}
      />

      <Container component={MotionViewport}>
        <Grid container spacing={{ xs: 8, md: 10 }} alignItems="center">
          <Grid xs={12} md={5}>
            <m.div variants={varFade().inLeft}>
              {renderForm}
            </m.div>
          </Grid>

          <Grid xs={12} md={7}>
            {renderContent}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
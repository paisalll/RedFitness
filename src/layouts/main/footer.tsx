import { m } from 'framer-motion';
// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
// _mock
import { _socials } from 'src/_mock';
// components
import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

const RED = '#DF2026';
const RED_DARK = '#A8171C';
const BLACK = '#060606';

const NAV_LINKS = [
  {
    headline: 'MEMBERSHIP',
    children: [
      { name: 'Membership', href: '#' },
      { name: 'Join Online', href: '#' },
      { name: 'Corporate', href: '#' },
      { name: 'Membership Privileges', href: '#' },
    ],
  },
  {
    headline: 'CLUBS & CLASSES',
    children: [
      { name: 'Classes', href: '#' },
      { name: 'Club Finder', href: '#' },
      { name: 'Timetable', href: '#' },
      { name: 'Mobile App', href: '#' },
    ],
  },
  {
    headline: 'OUR COMPANY',
    children: [
      { name: 'Why Red Fitness', href: paths.about },
      { name: 'Blog', href: '#' },
      { name: 'Highlights', href: '#' },
      { name: 'FAQ', href: '#' },
    ],
  },
  {
    headline: 'GET IN TOUCH',
    children: [
      { name: 'Contact Us', href: paths.contact },
      { name: 'Careers', href: '#' },
    ],
  },
];

// ----------------------------------------------------------------------

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        bgcolor: BLACK,
        color: 'common.white',
        pt: { xs: 10, md: 12 },
        pb: 5,
        borderTop: `1px solid ${alpha(RED, 0.2)}`,
      }}
    >
      <Container component={MotionViewport}>
        <Grid container spacing={8} justifyContent="space-between">
          
          {/* BAGIAN KIRI: NEWSLETTER / SUBSCRIBE */}
          <Grid xs={12} md={4}>
            <m.div variants={varFade().inUp}>
              {/* Logo Diperbesar */}
              <Box 
                sx={{ 
                  transform: { xs: 'scale(1.1)', md: 'scale(1.25)' }, 
                  transformOrigin: 'left center', 
                  mb: 4,
                  display: 'inline-block'
                }}
              >
                <Logo />
              </Box>
              
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1.5 }}>
                <Box sx={{ width: 24, height: 2, bgcolor: RED, flexShrink: 0 }} />
                <Typography 
                  variant="overline" 
                  sx={{ 
                    color: RED, 
                    fontWeight: 800, 
                    letterSpacing: 2, 
                    display: 'block',
                    fontFamily: 'monospace'
                  }}
                >
                  GET THE LATEST UPDATES
                </Typography>
              </Stack>
              
              <Typography variant="body2" sx={{ color: alpha('#fff', 0.5), mb: 3, lineHeight: 1.8 }}>
                Stay tuned for some exciting updates coming straight to you!
              </Typography>

              <Stack spacing={2.5}>
                <TextField
                  fullWidth
                  hiddenLabel
                  placeholder="EMAIL ADDRESS"
                  variant="filled"
                  sx={{
                    bgcolor: alpha('#fff', 0.03),
                    borderRadius: 0, // Input tajam
                    border: `1px solid ${alpha('#fff', 0.08)}`,
                    '& .MuiFilledInput-root': { 
                      color: 'common.white',
                      bgcolor: 'transparent',
                      borderRadius: 0,
                      '&::before, &::after': { display: 'none' }, // Menghilangkan garis bawah bawaan MUI
                    },
                    '& .MuiFilledInput-input': {
                      py: 1.5,
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '0.85rem'
                    }
                  }}
                />
                
                <FormControlLabel
                  control={<Checkbox size="small" sx={{ color: alpha('#fff', 0.3), '&.Mui-checked': { color: RED } }} />}
                  label={<Typography variant="caption" sx={{ color: alpha('#fff', 0.5) }}>Are you an existing customer?</Typography>}
                  sx={{ ml: 0 }}
                />

                <Button
                  variant="contained"
                  endIcon={<Iconify icon="solar:arrow-right-up-bold" width={18} />}
                  sx={{
                    bgcolor: RED,
                    color: '#fff',
                    fontWeight: 800,
                    borderRadius: 0, // Tombol tajam
                    px: 4,
                    py: 1.75,
                    fontFamily: 'monospace',
                    letterSpacing: 2,
                    fontSize: '0.75rem',
                    boxShadow: 'none',
                    '&:hover': { bgcolor: RED_DARK, boxShadow: 'none' },
                  }}
                >
                  SUBSCRIBE NOW
                </Button>
              </Stack>
            </m.div>
          </Grid>

          {/* BAGIAN KANAN: NAVIGATION LINKS */}
          <Grid xs={12} md={7}>
            <m.div variants={varFade().inUp}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={5} justifyContent="space-between">
                {NAV_LINKS.map((list) => (
                  <Stack key={list.headline} spacing={2.5}>
                    <Typography 
                      variant="overline" 
                      sx={{ 
                        fontWeight: 800, 
                        letterSpacing: 1.5, 
                        fontFamily: 'monospace',
                        color: 'common.white'
                      }}
                    >
                      {list.headline}
                    </Typography>

                    <Stack spacing={1.5}>
                      {list.children.map((link) => (
                        <Link
                          key={link.name}
                          component={RouterLink}
                          href={link.href}
                          color="inherit"
                          variant="body2"
                          sx={{ 
                            color: alpha('#fff', 0.45),
                            textDecoration: 'none',
                            transition: 'color 0.2s',
                            '&:hover': { color: RED } 
                          }}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            </m.div>
          </Grid>
        </Grid>

        <Divider sx={{ my: { xs: 6, md: 8 }, borderColor: alpha('#fff', 0.08) }} />

        {/* BOTTOM FOOTER: SOCIALS & COPYRIGHT */}
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={3}
        >
          <Typography variant="caption" sx={{ color: alpha('#fff', 0.3), textAlign: { xs: 'center', md: 'left' } }}>
            Copyright © 2026 Red Fitness | Award Winning Fitness Chain in South East Asia. All rights reserved.
          </Typography>

          <Stack direction="row" spacing={1.5} alignItems="center">
            <Link href="#" color="inherit" variant="caption" sx={{ color: alpha('#fff', 0.4), '&:hover': { color: RED } }}>Terms & Conditions</Link>
            <Typography variant="caption" sx={{ color: alpha('#fff', 0.2) }}>|</Typography>
            <Link href="#" color="inherit" variant="caption" sx={{ color: alpha('#fff', 0.4), '&:hover': { color: RED } }}>Club Rules</Link>
            <Typography variant="caption" sx={{ color: alpha('#fff', 0.2) }}>|</Typography>
            <Link href="#" color="inherit" variant="caption" sx={{ color: alpha('#fff', 0.4), '&:hover': { color: RED } }}>Privacy Policy</Link>
          </Stack>

          <Stack direction="row" spacing={0.5}>
            {['eva:facebook-fill', 'ant-design:instagram-filled', 'ant-design:youtube-filled'].map((icon) => (
              <IconButton 
                key={icon} 
                sx={{ 
                  color: alpha('#fff', 0.4), 
                  transition: 'color 0.2s',
                  '&:hover': { color: RED } 
                }}
              >
                <Iconify icon={icon} width={20} />
              </IconButton>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
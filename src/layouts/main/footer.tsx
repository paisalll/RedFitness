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

const COLORS = {
  red: '#D40000',
  redDark: '#8a0000',
  black: '#000000',
  white: '#FFFFFF',
};

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
      { name: 'FAQ', href: paths.faqs },
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
        bgcolor: COLORS.black,
        color: COLORS.white,
        pt: 10,
        pb: 5,
        borderTop: `1px solid ${alpha(COLORS.white, 0.1)}`,
      }}
    >
      <Container component={MotionViewport}>
        <Grid container spacing={5} justifyContent="space-between">
          
          {/* BAGIAN KIRI: NEWSLETTER / SUBSCRIBE */}
          <Grid xs={12} md={4}>
            <m.div variants={varFade().inUp}>
              <Logo sx={{ mb: 3 }} />
              
              <Typography variant="overline" sx={{ color: COLORS.red, fontWeight: 'bold', mb: 1, display: 'block' }}>
                GET THE LATEST UPDATES
              </Typography>
              
              <Typography variant="body2" sx={{ opacity: 0.6, mb: 3 }}>
                Stay tuned for some exciting updates coming straight to you!
              </Typography>

              <Stack spacing={2}>
                <TextField
                  fullWidth
                  hiddenLabel
                  placeholder="EMAIL ADDRESS"
                  variant="filled"
                  sx={{
                    bgcolor: alpha(COLORS.white, 0.05),
                    borderRadius: 1,
                    '& .MuiFilledInput-root': { color: COLORS.white },
                  }}
                />
                
                <FormControlLabel
                  control={<Checkbox size="small" sx={{ color: COLORS.red, '&.Mui-checked': { color: COLORS.red } }} />}
                  label={<Typography variant="caption" sx={{ opacity: 0.7 }}>Are you an existing customer?</Typography>}
                />

                <Button
                  variant="contained"
                  sx={{
                    bgcolor: `${COLORS.red}`, // Mengikuti warna hijau tosca CTA di gambar asli
                    color: COLORS.black,
                    fontWeight: 'bold',
                    borderRadius: 50,
                    px: 4,
                    '&:hover': { bgcolor: alpha(`${COLORS.redDark}`, 0.8) },
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
                  <Stack key={list.headline} spacing={2}>
                    <Typography variant="overline" sx={{ fontWeight: 900, letterSpacing: 1 }}>
                      {list.headline}
                    </Typography>

                    {list.children.map((link) => (
                      <Link
                        key={link.name}
                        component={RouterLink}
                        href={link.href}
                        color="inherit"
                        variant="body2"
                        sx={{ 
                          opacity: 0.6, 
                          textDecoration: 'none',
                          '&:hover': { opacity: 1, color: COLORS.red } 
                        }}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </Stack>
                ))}
              </Stack>
            </m.div>
          </Grid>
        </Grid>

        <Divider sx={{ my: 8, borderColor: alpha(COLORS.white, 0.1) }} />

        {/* BOTTOM FOOTER: SOCIALS & COPYRIGHT */}
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={3}
        >
          <Typography variant="caption" sx={{ opacity: 0.4 }}>
            Copyright © 2026 Red Fitness | Award Winning Fitness Chain in South East Asia. All rights reserved.
          </Typography>

          <Stack direction="row" spacing={1}>
            <Link href="#" color="inherit" variant="caption" sx={{ opacity: 0.4 }}>Terms & Conditions</Link>
            <Typography variant="caption" sx={{ opacity: 0.4 }}>|</Typography>
            <Link href="#" color="inherit" variant="caption" sx={{ opacity: 0.4 }}>Club Rules</Link>
            <Typography variant="caption" sx={{ opacity: 0.4 }}>|</Typography>
            <Link href="#" color="inherit" variant="caption" sx={{ opacity: 0.4 }}>Privacy Policy</Link>
          </Stack>

          <Stack direction="row" spacing={1}>
            {['eva:facebook-fill', 'ant-design:instagram-filled', 'ant-design:youtube-filled'].map((icon) => (
              <IconButton key={icon} sx={{ color: COLORS.white, '&:hover': { color: COLORS.red } }}>
                <Iconify icon={icon} />
              </IconButton>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
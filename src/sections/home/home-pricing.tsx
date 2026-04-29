import { m } from 'framer-motion';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// components
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';
import Image from 'src/components/image';

// ----------------------------------------------------------------------

const RED = '#DF2026';
const RED_DARK = '#A8171C';
const BLACK = '#060606';
const WA_GREEN = '#25D366'; // Disimpan khusus jika ingin dipakai di icon WA

// ----------------------------------------------------------------------

const WA_CONTACTS = [
  {
    label: 'Membership Inquiry',
    description: 'Tanya info harga, paket, dan promo terbaru.',
    number: '6289646805434', // Ganti dengan nomor WA aktual
    message: 'Halo Red Fitness! Saya ingin tanya info membership.',
    icon: 'solar:tag-price-bold-duotone',
  },
  {
    label: 'Class Booking',
    description: 'Reservasi kelas pilates, cardio, dan lainnya.',
    number: '6289646805434', // Ganti dengan nomor WA aktual
    message: 'Halo Red Fitness! Saya ingin booking kelas.',
    icon: 'solar:calendar-bold-duotone',
  },
  {
    label: 'Personal Training',
    description: 'Jadwalkan sesi dengan certified trainer kami.',
    number: '6289646805434', // Ganti dengan nomor WA aktual
    message: 'Halo Red Fitness! Saya tertarik dengan program Personal Training.',
    icon: 'solar:dumbbell-large-bold-duotone',
  },
];

const OPERATIONAL_HOURS = [
  { day: 'Senin – Jumat', hours: '06.00 – 22.00' },
  { day: 'Sabtu', hours: '07.00 – 21.00' },
  { day: 'Minggu & Hari Libur', hours: '08.00 – 20.00' },
];

// Mock images untuk Instagram Feed
const INSTA_POSTS = [
  '/assets/images/home/insta_1.jpg',
  '/assets/images/home/insta_2.jpg',
  '/assets/images/home/insta_3.jpg',
  '/assets/images/home/insta_4.jpg',
  '/assets/images/home/insta_5.jpg',
  '/assets/images/home/insta_6.jpg',
];

// ----------------------------------------------------------------------

export default function HomeAppAndSocial() {
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');

  const handleWhatsApp = (number: string, message: string) => {
    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const renderWhatsAppSection = (
    <Grid container spacing={{ xs: 8, md: 10 }} alignItems="center" sx={{ mb: { xs: 12, md: 16 } }}>
      {/* Left */}
      <Grid xs={12} md={5}>
        <m.div variants={varFade().inLeft}>
          <Stack spacing={4}>
            <Box>
              {/* Overline */}
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
                  Hubungi Kami
                </Typography>
              </Stack>

              {/* Heading */}
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
                  fontSize: { xs: '2.5rem', md: '4rem' },
                }}
              >
                Chat &amp; Book <br />
                <Box component="span" sx={{ color: RED, fontStyle: 'italic', display: 'block' }}>
                  via WhatsApp.
                </Box>
              </Typography>
              <Typography sx={{ color: alpha('#fff', 0.45), lineHeight: 1.85, fontSize: '0.88rem' }}>
                Tidak perlu ribet. Langsung chat dengan tim kami untuk booking kelas,
                tanya paket membership, atau jadwalkan sesi personal training — kapan saja.
              </Typography>
            </Box>

            {/* Operational Hours */}
            <Box
              sx={{
                p: 3.5,
                borderRadius: 0, // Dibuat tajam
                border: `1px solid ${alpha(RED, 0.25)}`,
                bgcolor: alpha(RED, 0.04),
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 3 }}>
                <Iconify icon="solar:clock-circle-bold-duotone" width={24} sx={{ color: RED }} />
                <Typography variant="subtitle2" sx={{ color: 'common.white', fontWeight: 800, letterSpacing: 0.5, textTransform: 'uppercase', fontFamily: "'Poppins', sans-serif" }}>
                  Jam Operasional
                </Typography>
              </Stack>
              <Stack spacing={2}>
                {OPERATIONAL_HOURS.map((item) => (
                  <Stack key={item.day} direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" sx={{ color: alpha('#fff', 0.6), fontSize: '0.82rem', fontWeight: 500 }}>
                      {item.day}
                    </Typography>
                    <Chip
                      label={item.hours}
                      size="small"
                      sx={{
                        borderRadius: 0, // Chip tajam
                        bgcolor: alpha(RED, 0.1),
                        color: RED,
                        fontWeight: 700,
                        fontFamily: 'monospace',
                        letterSpacing: 1,
                        fontSize: '0.72rem',
                        border: `1px solid ${alpha(RED, 0.2)}`,
                      }}
                    />
                  </Stack>
                ))}
              </Stack>
            </Box>
          </Stack>
        </m.div>
      </Grid>

      {/* Right — WA Cards */}
      <Grid xs={12} md={7}>
        <Stack spacing={2.5}>
          {WA_CONTACTS.map((contact, index) => (
            <m.div key={contact.label} variants={varFade({ distance: 30 }).inRight}>
              <Box
                sx={{
                  p: { xs: 2.5, md: 3 },
                  borderRadius: 0, // Dibuat tajam
                  border: `1px solid ${alpha('#fff', 0.06)}`,
                  bgcolor: alpha('#fff', 0.02),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 2,
                  transition: 'border-color 0.25s, background 0.25s',
                  '&:hover': {
                    borderColor: alpha(RED, 0.35),
                    bgcolor: alpha(RED, 0.03),
                  },
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2.5} sx={{ flex: 1 }}>
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: 0, // Icon box tajam
                      bgcolor: 'transparent',
                      border: `1px solid ${alpha(RED, 0.2)}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Iconify icon={contact.icon} width={26} sx={{ color: RED }} />
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" sx={{ color: 'common.white', fontWeight: 800, mb: 0.25, textTransform: 'uppercase', fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem' }}>
                      {contact.label}
                    </Typography>
                    <Typography variant="caption" sx={{ color: alpha('#fff', 0.45), lineHeight: 1.6, fontSize: '0.8rem' }}>
                      {contact.description}
                    </Typography>
                  </Box>
                </Stack>

                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleWhatsApp(contact.number, contact.message)}
                  startIcon={<Iconify icon="ic:baseline-whatsapp" width={18} />}
                  sx={{
                    bgcolor: RED, // Menggunakan RED agar selaras, bukan hijau
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: '0.68rem',
                    letterSpacing: 1.5,
                    px: 2.5,
                    py: 1.25,
                    borderRadius: 0, // Tombol tajam
                    whiteSpace: 'nowrap',
                    textTransform: 'uppercase',
                    fontFamily: 'monospace',
                    boxShadow: 'none',
                    flexShrink: 0,
                    '&:hover': { bgcolor: RED_DARK, boxShadow: 'none' },
                  }}
                >
                  Chat Now
                </Button>
              </Box>
            </m.div>
          ))}

          <m.div variants={varFade().inUp}>
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ px: 0.5, mt: 1 }}>
              <Iconify icon="solar:shield-check-bold-duotone" width={18} sx={{ color: alpha('#fff', 0.25) }} />
              <Typography variant="caption" sx={{ color: alpha('#fff', 0.35), lineHeight: 1.6, fontSize: '0.75rem' }}>
                Tim kami biasanya membalas dalam &lt; 5 menit selama jam operasional.
              </Typography>
            </Stack>
          </m.div>
        </Stack>
      </Grid>
    </Grid>
  );

  const renderSocialSection = (
    <Stack spacing={6} alignItems="center">
      <m.div variants={varFade().inUp}>
        <Stack alignItems="center" spacing={2}>
          {/* Overline Social */}
          <Stack direction="row" alignItems="center" spacing={1.5}>
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
              Social Media
            </Typography>
            <Box sx={{ width: 28, height: 2, bgcolor: RED, flexShrink: 0 }} />
          </Stack>

          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 800, 
              textTransform: 'uppercase', 
              textAlign: 'center',
              fontFamily: "'Poppins', sans-serif",
              letterSpacing: -1,
              lineHeight: 1,
              fontSize: { xs: '2rem', md: '3.5rem' }
            }}
          >
            Follow Us On <Box component="span" sx={{ color: RED, fontStyle: 'italic' }}>Instagram</Box>
          </Typography>
        </Stack>
      </m.div>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(6, 1fr)' },
          width: 1,
        }}
      >
        {INSTA_POSTS.map((img, index) => (
          <m.div key={index} variants={varFade().inUp} transition={{ delay: index * 0.1 }}>
            <Box
              sx={{
                position: 'relative',
                pt: '100%',
                overflow: 'hidden',
                '&:hover img': { transform: 'scale(1.1)' },
              }}
            >
              <Image
                alt={`insta-${index}`}
                src={img}
                sx={{
                  position: 'absolute',
                  top: 0, left: 0,
                  width: 1, height: 1,
                  objectFit: 'cover',
                  transition: 'transform 0.4s ease',
                  borderRadius: 0, // Gambar tajam
                }}
              />
              <Stack
                alignItems="center"
                justifyContent="center"
                sx={{
                  position: 'absolute',
                  top: 0, left: 0,
                  width: 1, height: 1,
                  bgcolor: alpha(BLACK, 0.7),
                  opacity: 0,
                  transition: 'opacity 0.3s',
                  color: 'common.white',
                  '&:hover': { opacity: 1 },
                }}
              >
                <Iconify icon="akar-icons:instagram-fill" width={32} sx={{ color: RED }} />
              </Stack>
            </Box>
          </m.div>
        ))}
      </Box>

      <m.div variants={varFade().inUp}>
        <Button
          variant="contained"
          size="large"
          endIcon={<Iconify icon="solar:arrow-right-up-bold" width={18} />}
          sx={{
            borderRadius: 0, // Tombol tajam
            px: 5,
            py: 1.75,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: 2.5,
            fontSize: '0.72rem',
            bgcolor: RED,
            color: '#fff',
            boxShadow: 'none',
            fontFamily: 'monospace',
            '&:hover': { bgcolor: RED_DARK, boxShadow: 'none' },
          }}
        >
          DISCOVER MORE
        </Button>
      </m.div>
    </Stack>
  );

  return (
    <Box sx={{ bgcolor: BLACK, py: { xs: 10, md: 15 }, overflow: 'hidden', color: 'common.white' }}>
      <Container component={MotionViewport}>
        {renderWhatsAppSection}
      </Container>

      <Container maxWidth={false} sx={{ px: { xs: 0, md: 0 } }}>
        {renderSocialSection}
      </Container>
    </Box>
  );
}
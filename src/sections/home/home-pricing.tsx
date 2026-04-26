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

const WA_GREEN = '#25D366';

// ----------------------------------------------------------------------

export default function HomeAppAndSocial() {
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');

  const handleWhatsApp = (number: string, message: string) => {
    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const renderWhatsAppSection = (
    <Grid container spacing={{ xs: 5, md: 8 }} alignItems="center" sx={{ mb: { xs: 10, md: 15 } }}>
      {/* Left */}
      <Grid xs={12} md={5}>
        <m.div variants={varFade().inLeft}>
          <Stack spacing={4}>
            <Box>
              <Typography
                variant="overline"
                sx={{ color: WA_GREEN, letterSpacing: 3, fontWeight: 700, mb: 1.5, display: 'block' }}
              >
                Hubungi Kami
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  lineHeight: 1.1,
                  mb: 2,
                  color: 'common.white',
                  fontSize: { xs: '2rem', md: '2.6rem' },
                }}
              >
                Chat &amp; Book <br />
                <Box component="span" sx={{ color: WA_GREEN }}>via WhatsApp</Box>
              </Typography>
              <Typography sx={{ color: alpha('#fff', 0.55), lineHeight: 1.85, fontSize: '0.92rem' }}>
                Tidak perlu ribet. Langsung chat dengan tim kami untuk booking kelas,
                tanya paket membership, atau jadwalkan sesi personal training — kapan saja.
              </Typography>
            </Box>

            {/* Operational Hours */}
            <Box
              sx={{
                p: 3,
                borderRadius: 2.5,
                border: `1px solid ${alpha(WA_GREEN, 0.2)}`,
                bgcolor: alpha(WA_GREEN, 0.04),
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2.5 }}>
                <Iconify icon="solar:clock-circle-bold-duotone" width={22} sx={{ color: WA_GREEN }} />
                <Typography variant="subtitle2" sx={{ color: 'common.white', fontWeight: 700, letterSpacing: 0.5 }}>
                  Jam Operasional
                </Typography>
              </Stack>
              <Stack spacing={1.5}>
                {OPERATIONAL_HOURS.map((item) => (
                  <Stack key={item.day} direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" sx={{ color: alpha('#fff', 0.5), fontSize: '0.82rem' }}>
                      {item.day}
                    </Typography>
                    <Chip
                      label={item.hours}
                      size="small"
                      sx={{
                        bgcolor: alpha(WA_GREEN, 0.1),
                        color: WA_GREEN,
                        fontWeight: 700,
                        fontSize: '0.72rem',
                        border: `1px solid ${alpha(WA_GREEN, 0.2)}`,
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
                  p: 3,
                  borderRadius: 2.5,
                  border: `1px solid ${alpha('#fff', 0.07)}`,
                  bgcolor: alpha('#fff', 0.03),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 2,
                  transition: 'border-color 0.25s, background 0.25s',
                  '&:hover': {
                    borderColor: alpha(WA_GREEN, 0.35),
                    bgcolor: alpha(WA_GREEN, 0.05),
                  },
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2.5} sx={{ flex: 1 }}>
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: 2,
                      bgcolor: alpha(WA_GREEN, 0.1),
                      border: `1px solid ${alpha(WA_GREEN, 0.2)}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Iconify icon={contact.icon} width={26} sx={{ color: WA_GREEN }} />
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" sx={{ color: 'common.white', fontWeight: 700, mb: 0.25 }}>
                      {contact.label}
                    </Typography>
                    <Typography variant="caption" sx={{ color: alpha('#fff', 0.45), lineHeight: 1.5 }}>
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
                    bgcolor: WA_GREEN,
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    px: 2,
                    py: 1,
                    borderRadius: 1.5,
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    '&:hover': { bgcolor: '#1ebe5a' },
                  }}
                >
                  Chat Now
                </Button>
              </Box>
            </m.div>
          ))}

          <m.div variants={varFade().inUp}>
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ px: 0.5 }}>
              <Iconify icon="solar:shield-check-bold-duotone" width={16} sx={{ color: alpha('#fff', 0.25) }} />
              <Typography variant="caption" sx={{ color: alpha('#fff', 0.3), lineHeight: 1.6 }}>
                Tim kami biasanya membalas dalam &lt; 5 menit selama jam operasional.
              </Typography>
            </Stack>
          </m.div>
        </Stack>
      </Grid>
    </Grid>
  );

  const renderSocialSection = (
    <Stack spacing={5} alignItems="center">
      <m.div variants={varFade().inUp}>
        <Typography variant="h2" sx={{ fontWeight: 900, textTransform: 'uppercase', textAlign: 'center' }}>
          Follow Us On Instagram
        </Typography>
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
                }}
              />
              <Stack
                alignItems="center"
                justifyContent="center"
                sx={{
                  position: 'absolute',
                  top: 0, left: 0,
                  width: 1, height: 1,
                  bgcolor: alpha(theme.palette.grey[900], 0.6),
                  opacity: 0,
                  transition: 'opacity 0.3s',
                  color: 'common.white',
                  '&:hover': { opacity: 1 },
                }}
              >
                <Iconify icon="akar-icons:instagram-fill" width={32} />
              </Stack>
            </Box>
          </m.div>
        ))}
      </Box>

      <m.div variants={varFade().inUp}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          endIcon={<Iconify icon="solar:arrow-right-up-bold" />}
          sx={{
            borderRadius: 50,
            px: 4,
            fontWeight: 'bold',
            boxShadow: `0 8px 16px 0 ${alpha(theme.palette.primary.main, 0.24)}`,
          }}
        >
          DISCOVER MORE
        </Button>
      </m.div>
    </Stack>
  );

  return (
    <Box sx={{ bgcolor: '#000000', py: { xs: 10, md: 15 }, overflow: 'hidden', color: 'common.white' }}>
      <Container component={MotionViewport}>
        {renderWhatsAppSection}
      </Container>

      <Container maxWidth={false} sx={{ px: { xs: 0, md: 0 } }}>
        {renderSocialSection}
      </Container>
    </Box>
  );
}
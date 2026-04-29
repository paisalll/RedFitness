import { m } from 'framer-motion';
// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
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

const PROMOS = [
  {
    title: 'Train Anywhere. Anytime.',
    description:
      'One membership, access to multiple locations making it easier to stay consistent wherever you go.',
    icon: 'solar:map-point-bold-duotone',
  },
  {
    title: 'Personal Training That Delivers',
    description:
      'Work with certified trainers and follow structured programs designed for real progress.',
    icon: 'solar:dumbbells-bold-duotone',
  },
  {
    title: 'More Than a Gym',
    description:
      'Join a community that motivates you to grow stronger—physically and mentally.',
    icon: 'solar:people-nearby-bold-duotone',
  },
];

const FEATURES = [
  {
    title: 'Expert-Led Service',
    description:
      'Our professional team is dedicated to delivering a seamless and personalized fitness experience—ensuring every visit feels supported, efficient, and results-driven.',
    icon: 'solar:shield-user-bold-duotone',
  },
  {
    title: 'Premium Reformer Pilates',
    description:
      'Enhance strength, flexibility, and posture through guided Reformer Pilates sessions in a premium, focused environment.',
    icon: 'solar:meditation-round-bold-duotone',
  },
  {
    title: 'Complimentary Japanese Seitai Therapy',
    description:
      'Experience the benefit of Japanese Seitai therapy included in your membership to support recovery, alignment, and overall well-being.',
    icon: 'solar:hand-heart-bold-duotone',
  },
];

// ── Shared accent rule ────────────────────────────────────────────────────────
const AccentRule = styled('div')({
  width: '100%',
  height: 1,
  background: `linear-gradient(90deg, transparent 0%, ${RED} 40%, ${RED} 60%, transparent 100%)`,
  opacity: 0.22,
});

// ── Ghost watermark ───────────────────────────────────────────────────────────
const GhostLabel = styled(Typography)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  fontSize: 'clamp(5rem, 13vw, 10rem)',
  fontWeight: 900,
  letterSpacing: -4,
  textTransform: 'uppercase',
  WebkitTextStroke: `1px ${alpha('#DF2026', 0.055)}`,
  color: 'transparent',
  userSelect: 'none',
  pointerEvents: 'none',
  whiteSpace: 'nowrap',
  fontFamily: "'Poppins', sans-serif",
  lineHeight: 1,
});

// ----------------------------------------------------------------------

export default function HomeHugePackElements() {
  const mdUp = useResponsive('up', 'md');

  // ─── Editorial Section Header (full-width) ────────────────────────────────
  const renderHeader = (
    <Box sx={{ mb: { xs: 8, md: 12 } }}>
      <AccentRule />

      {/* Overline row */}
      <m.div variants={varFade().inLeft}>
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mt: 5, mb: { xs: 5, md: 7 } }}>
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
            Why Red Fitness
          </Typography>
        </Stack>
      </m.div>

      {/* Heading + body split — mirrors home-for-designer header */}
      <m.div variants={varFade().inUp}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ xs: 'flex-start', md: 'flex-end' }}
          justifyContent="space-between"
          spacing={{ xs: 3, md: 6 }}
        >
          {/* Large display heading */}
          <Typography
            variant="h1"
            sx={{
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: -2,
              color: 'common.white',
              textTransform: 'uppercase',
              fontFamily: "'Poppins', sans-serif",
              fontSize: { xs: '2.8rem', md: '5rem', lg: '5.8rem' },
              flexShrink: 0,
            }}
          >
            Complete Fitness.
            <Box
              component="span"
              display="block"
              sx={{ color: RED, fontStyle: 'italic' }}
            >
              Elevated Experience.
            </Box>
          </Typography>

          {/* Right: body + CTA aligned to bottom */}
          <Box sx={{ maxWidth: 700, pb: { md: 0.5 } }}>
            <Typography
              sx={{
                color: alpha('#fff', 0.38),
                fontSize: '0.88rem',
                lineHeight: 1.85,
                mb: 3,
              }}
            >
              More than just a gym — enjoy expert service, premium training, and exclusive
              recovery designed to support your full journey.
            </Typography>

            <Button
              variant="contained"
              size="large"
              endIcon={<Iconify icon="solar:arrow-right-up-bold" width={18} />}
              sx={{
                whiteSpace: 'nowrap',    // Mencegah teks turun ke bawah
                minWidth: 'max-content', // Memastikan lebar button selalu mengikuti isi teksnya
                borderRadius: 0,
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
              Join Us Now
            </Button>
          </Box>
        </Stack>
      </m.div>

      <AccentRule sx={{ mt: { xs: 6, md: 8 } }} />
    </Box>
  );

  // ─── PROMOS — horizontal stat-style strip ─────────────────────────────────
  const renderPromos = (
    <Box sx={{ mb: { xs: 8, md: 12 } }}>
      <Grid container spacing={0}>
        {PROMOS.map((promo, index) => (
          <Grid xs={12} md={4} key={promo.title}>
            <m.div variants={varFade({ distance: 30 }).inUp} style={{ height: '100%' }}>
              <Box
                sx={{
                  p: { xs: 3, md: 4 },
                  height: 1,
                  position: 'relative',
                  borderTop: `1px solid ${alpha('#fff', 0.06)}`,
                  borderBottom: `1px solid ${alpha('#fff', 0.06)}`,
                  borderRight: {
                    md: index < PROMOS.length - 1
                      ? `1px solid ${alpha('#fff', 0.06)}`
                      : 'none',
                  },
                  borderLeft: {
                    xs: `1px solid ${alpha('#fff', 0.06)}`,
                    md: 'none',
                  },
                  transition: 'background 0.3s',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: 2,
                    bgcolor: RED,
                    transform: 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.45s cubic-bezier(0.22,1,0.36,1)',
                  },
                  '&:hover': {
                    bgcolor: alpha(RED, 0.03),
                    '&::before': { transform: 'scaleX(1)' },
                  },
                }}
              >
                {/* Index */}
                <Typography
                  sx={{
                    fontSize: '0.6rem',
                    fontWeight: 800,
                    letterSpacing: 2,
                    color: alpha(RED, 0.4),
                    fontFamily: 'monospace',
                    mb: 3,
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </Typography>

                {/* Icon */}
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    border: `1px solid ${alpha(RED, 0.2)}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                  }}
                >
                  <Iconify icon={promo.icon} width={24} sx={{ color: RED }} />
                </Box>

                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    color: 'common.white',
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    mb: 1.25,
                    lineHeight: 1.25,
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  {promo.title}
                </Typography>

                <Typography
                  sx={{
                    color: alpha('#fff', 0.38),
                    fontSize: '0.8rem',
                    lineHeight: 1.75,
                  }}
                >
                  {promo.description}
                </Typography>
              </Box>
            </m.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  // ─── FEATURES — asymmetric row: large number + content ───────────────────
  const renderFeatures = (
    <Stack spacing={0}>
      {FEATURES.map((feature, index) => (
        <m.div key={feature.title} variants={varFade({ distance: 24 }).inUp}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '80px 1fr 1fr' },
              gap: 0,
              borderTop: `1px solid ${alpha('#fff', 0.06)}`,
              transition: 'background 0.3s',
              '&:hover': { bgcolor: alpha(RED, 0.025) },
              '&:last-of-type': {
                borderBottom: `1px solid ${alpha('#fff', 0.06)}`,
              },
            }}
          >
            {/* Col 1 — large index */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: { xs: 'flex-start', md: 'center' },
                p: { xs: '24px 0 0', md: '32px 24px' },
                borderRight: { md: `1px solid ${alpha('#fff', 0.06)}` },
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: '1.6rem', md: '2rem' },
                  fontWeight: 900,
                  color: alpha(RED, 0.18),
                  fontFamily: 'monospace',
                  lineHeight: 1,
                  letterSpacing: -1,
                }}
              >
                {String(index + 1).padStart(2, '0')}
            </Typography>
            </Box>

            {/* Col 2 — icon + title */}
            <Box
              sx={{
                p: { xs: '12px 0 8px', md: '32px 40px' },
                borderRight: { md: `1px solid ${alpha('#fff', 0.06)}` },
                display: 'flex',
                alignItems: 'center',
                gap: 2.5,
              }}
            >
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  border: `1px solid ${alpha(RED, 0.2)}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Iconify icon={feature.icon} width={22} sx={{ color: RED }} />
              </Box>
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '0.88rem', md: '0.95rem' },
                  color: 'common.white',
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  lineHeight: 1.3,
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                {feature.title}
              </Typography>
            </Box>

            {/* Col 3 — description */}
            <Box
              sx={{
                p: { xs: '0 0 24px', md: '32px 40px' },
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography
                sx={{
                  color: alpha('#fff', 0.38),
                  fontSize: '0.82rem',
                  lineHeight: 1.8,
                  maxWidth: 420,
                }}
              >
                {feature.description}
              </Typography>
            </Box>
          </Box>
        </m.div>
      ))}
    </Stack>
  );

  // ─── Root ─────────────────────────────────────────────────────────────────
  return (
    <Box sx={{ bgcolor: BLACK, overflow: 'hidden', position: 'relative' }}>
      {/* Ghost watermark */}
      <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <GhostLabel>Fitness</GhostLabel>
      </Box>

      {/* Right edge red line */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 2,
          height: '100%',
          background: `linear-gradient(to bottom, transparent, ${RED} 30%, ${RED} 70%, transparent)`,
          opacity: 0.12,
        }}
      />

      {/* Top divider */}
      <Box sx={{ height: 1, bgcolor: alpha(RED, 0.2), width: '100%' }} />

      <Container component={MotionViewport} maxWidth="lg" sx={{ py: { xs: 10, md: 16 } }}>
        {renderHeader}
        {renderPromos}
        {renderFeatures}
      </Container>
    </Box>
  );
}
import { m, useScroll } from 'framer-motion';
import { useEffect, useRef, useState, useCallback } from 'react';
// @mui
import { styled, alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
// routes
import { paths } from 'src/routes/paths';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
import { useBanner } from 'src/hooks/use-banner';
// theme
import { bgGradient, bgBlur } from 'src/theme/css';
// layouts
import { HEADER } from 'src/layouts/config-layout';
// components
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';
import { MotionContainer, varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

const RED = '#DF2026';
const RED_DARK = '#A8171C';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')<{ bannerUrl?: string }>(({ theme, bannerUrl }) => ({
  ...bgGradient({
    color: alpha(theme.palette.background.default, theme.palette.mode === 'light' ? 0.9 : 0.6),
    imgUrl: bannerUrl || '/assets/background/1.webp',
  }),
  width: '100%',
  height: '100vh',
  position: 'relative',
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    position: 'fixed',
  },
}));

const StyledWrapper = styled('div')(({ theme }) => ({
  height: '100%',
  overflow: 'hidden',
  position: 'relative',
  [theme.breakpoints.up('md')]: {
    marginTop: HEADER.H_DESKTOP_OFFSET,
  },
}));

// Thin red accent line — replaces glow blur
const StyledAccentLine = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: 3,
  background: `linear-gradient(90deg, transparent 0%, ${RED} 40%, ${RED} 60%, transparent 100%)`,
  opacity: 0.7,
});

type StyledPolygonProps = {
  opacity?: number;
  anchor?: 'left' | 'right';
};

const StyledPolygon = styled('div')<StyledPolygonProps>(
  ({ opacity = 1, anchor = 'left', theme }) => ({
    ...bgBlur({
      opacity,
      color: '#DF2026',
    }),
    zIndex: 9,
    bottom: 0,
    height: 80,
    width: '50%',
    position: 'absolute',
    clipPath: 'polygon(0% 0%, 100% 100%, 0% 100%)',
    ...(anchor === 'left' && {
      left: 0,
      ...(theme.direction === 'rtl' && {
        transform: 'scale(-1, 1)',
      }),
    }),
    ...(anchor === 'right' && {
      right: 0,
      transform: 'scaleX(-1)',
      ...(theme.direction === 'rtl' && {
        transform: 'scaleX(1)',
      }),
    }),
  })
);

// ----------------------------------------------------------------------

export default function HomeHero() {
  const bannerUrl = useBanner('home');
  const mdUp = useResponsive('up', 'md');
  const theme = useTheme();
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollY } = useScroll();
  const [percent, setPercent] = useState(0);

  const getScroll = useCallback(() => {
    let heroHeight = 0;
    if (heroRef.current) {
      heroHeight = heroRef.current.offsetHeight;
    }
    scrollY.on('change', (scrollHeight) => {
      const scrollPercent = (scrollHeight * 100) / heroHeight;
      setPercent(Math.floor(scrollPercent));
    });
  }, [scrollY]);

  useEffect(() => {
    getScroll();
  }, [getScroll]);

  const opacity = 1 - percent / 100;
  const hide = percent > 120;

  const renderDescription = (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        height: 1,
        mx: 'auto',
        maxWidth: 520,
        opacity: opacity > 0 ? opacity : 0,
        mt: {
          md: `-${HEADER.H_DESKTOP + percent * 2.5}px`,
        },
      }}
    >
      {/* Small overline label */}
      <m.div variants={varFade().inDown}>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            mb: 3,
            px: 2,
            py: 0.75,
            border: `1px solid ${alpha(RED, 0.4)}`,
            borderRadius: 0.5,
          }}
        >
        </Box>
      </m.div>

      {/* Main heading */}
      <m.div variants={varFade().in}>
        <Typography
          component="h1"
          sx={{
            textAlign: 'center',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: -1,
            fontSize: { xs: '2.8rem', md: '4rem' },
            color: 'common.white',
            mb: 2,
            fontFamily: "'Poppins', sans-serif",
            textTransform: 'uppercase',
          }}
        >
          Train Better.{' '}
          <Box component="span" sx={{ color: RED }}>
            Achieve More.
          </Box>
        </Typography>
      </m.div>

      <m.div variants={varFade().in}>
        <Typography
          variant="body1"
          textAlign="center"
          sx={{
            color: alpha('#fff', 0.5),
            mb: 2,
            mx: 'auto',
            maxWidth: 400,
            lineHeight: 1.7,
            fontSize: { xs: '0.9rem', md: '1rem' },
          }}
        >
          A modern fitness experience built to elevate your strength, performance, and lifestyle.
        </Typography>
      </m.div>

      <m.div variants={varFade().in}>
        <Stack
          spacing={0.75}
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{ my: 2.5 }}
        >
          <Rating
            readOnly
            value={4.9}
            precision={0.1}
            max={5}
            sx={{ '& .MuiRating-iconFilled': { color: RED } }}
          />
          <Typography variant="caption" sx={{ color: alpha('#fff', 0.45) }}>
            <Box component="strong" sx={{ mr: 0.5, color: 'common.white' }}>
              4.9/5
            </Box>
            from 1000+ members
          </Typography>
        </Stack>
      </m.div>

      <m.div variants={varFade().in}>
        <Stack spacing={1.5} direction={{ xs: 'column-reverse', sm: 'row' }} sx={{ mb: 5 }}>
          <Stack alignItems="center" spacing={1.5}>
            <Typography
              variant="caption"
              sx={{ color: alpha('#fff', 0.45), fontWeight: 600, letterSpacing: 1 }}
            >
              Starting from{' '}
              <Box component="span" sx={{ color: 'common.white', fontWeight: 800, fontSize: '1rem' }}>
                195k/month
              </Box>
            </Typography>

            <Button
              component={RouterLink}
              href={paths.dashboard.root}
              size="large"
              variant="contained"
              startIcon={<Iconify icon="eva:flash-fill" width={24} />}
              sx={{
                bgcolor: RED,
                color: '#fff',
                px: 4,
                fontWeight: 700,
                letterSpacing: 1,
                borderRadius: 0.5,
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: RED_DARK,
                  boxShadow: 'none',
                },
              }}
            >
              Join Now
            </Button>

            <Link
              color="inherit"
              variant="caption"
              target="_blank"
              rel="noopener"
              href={paths.freeUI}
              sx={{
                color: alpha('#fff', 0.4),
                textDecoration: 'underline',
                display: 'inline-flex',
                alignItems: 'center',
                '&:hover': { color: RED },
              }}
            >
              <Iconify icon="eva:external-link-fill" width={16} sx={{ mr: 0.5 }} />
              Other Membership Plans
            </Link>
          </Stack>
        </Stack>
      </m.div>
    </Stack>
  );

  const renderPolygons = (
    <>
      <StyledPolygon />
      <StyledPolygon anchor="right" opacity={0.48} />
      <StyledPolygon anchor="right" opacity={0.48} sx={{ height: 48, zIndex: 10 }} />
      <StyledPolygon anchor="right" sx={{ zIndex: 11, height: 24 }} />
    </>
  );

  return (
    <>
      <StyledRoot
        ref={heroRef}
        bannerUrl={bannerUrl}
        sx={{
          ...(hide && { opacity: 0 }),
        }}
      >
        <StyledAccentLine />
        <StyledWrapper>
          <Container component={MotionContainer} sx={{ height: 1 }}>
            <Grid container columnSpacing={{ md: 10 }} sx={{ height: 1 }}>
              <Grid xs={12} md={6}>
                {renderDescription}
              </Grid>
            </Grid>
          </Container>
        </StyledWrapper>
      </StyledRoot>

      {mdUp && renderPolygons}

      <Box sx={{ height: { md: '100vh' } }} />
    </>
  );
}
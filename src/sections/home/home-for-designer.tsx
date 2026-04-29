import { useState, useEffect, useRef } from 'react';
import { m } from 'framer-motion';
// router
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme, alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';
// supabase
import { supabase } from 'src/utils/supabase';

// ----------------------------------------------------------------------

const RED = '#DF2026';
const RED_DARK = '#A8171C';
const RED_MUTED = alpha('#DF2026', 0.08);
const BLACK = '#060606';
const CARD_BG = '#0D0D0D';

// ----------------------------------------------------------------------

/** Thin horizontal rule with a red center glow */
const AccentRule = styled('div')({
  width: '100%',
  height: 1,
  background: `linear-gradient(90deg, transparent 0%, ${RED} 40%, ${RED} 60%, transparent 100%)`,
  opacity: 0.25,
});

/** Large decorative background text */
const GhostLabel = styled(Typography)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  fontSize: 'clamp(5rem, 14vw, 11rem)',
  fontWeight: 900,
  letterSpacing: -4,
  textTransform: 'uppercase',
  WebkitTextStroke: `1px ${alpha('#DF2026', 0.07)}`,
  color: 'transparent',
  userSelect: 'none',
  pointerEvents: 'none',
  whiteSpace: 'nowrap',
  fontFamily: "'Poppins', sans-serif",
  lineHeight: 1,
});

// ----------------------------------------------------------------------

export default function HomeFeaturedClasses() {
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');

  const [featuredClasses, setFeaturedClasses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('classes')
        .select('*')
        .eq('is_featured', true);

      if (!error && data) {
        setFeaturedClasses(data);
      } else {
        console.error('Error fetching featured classes:', error);
      }
      setIsLoading(false);
    };

    fetchFeatured();
  }, []);

  // ─── Section Header ─────────────────────────────────────────────────────────
  const renderHeader = (
    <Box sx={{ position: 'relative', mb: { xs: 8, md: 12 } }}>
      <AccentRule />

      {/* Top meta row */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mt: 5, mb: { xs: 5, md: 7 } }}
      >
        {/* Left: overline */}
        <m.div variants={varFade().inLeft}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box
              sx={{
                width: 28,
                height: 2,
                bgcolor: RED,
                flexShrink: 0,
              }}
            />
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
              What We Offer
            </Typography>
          </Stack>
        </m.div>

        {/* Right: subtle class count */}
        {!isLoading && featuredClasses.length > 0 && (
          <m.div variants={varFade().inRight}>
            <Typography
              sx={{
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: alpha('#fff', 0.2),
                fontFamily: 'monospace',
              }}
            >
              {String(featuredClasses.length).padStart(2, '0')} Programs
            </Typography>
          </m.div>
        )}
      </Stack>

      {/* Main heading — editorial split layout */}
      <m.div variants={varFade().inUp}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ xs: 'flex-start', md: 'flex-end' }}
          justifyContent="space-between"
          spacing={{ xs: 3, md: 6 }}
        >
          <Typography
            variant="h1"
            sx={{
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: -2,
              color: 'common.white',
              textTransform: 'uppercase',
              fontFamily: "'Poppins', sans-serif",
              fontSize: { xs: '3rem', md: '5.5rem', lg: '6.5rem' },
              flexShrink: 0,
            }}
          >
            Featured
            <Box
              component="span"
              display="block"
              sx={{
                color: RED,
                /* italic for editorial tension */
                fontStyle: 'italic',
              }}
            >
              Classes
            </Box>
          </Typography>

          {/* Right body copy aligned to bottom of heading */}
          <Box sx={{ maxWidth: 340, pb: { md: 0.5 } }}>
            <Typography
              sx={{
                color: alpha('#fff', 0.38),
                fontSize: '0.88rem',
                lineHeight: 1.85,
              }}
            >
              Dive into celebrity-inspired fitness. Fun, dynamic classes that&apos;ll get you
              training like a star — sculpted by our world-class coaches.
            </Typography>

            <Button
              component={RouterLink}
              to="/classes"
              variant="text"
              endIcon={<Iconify icon="solar:arrow-right-up-bold" width={16} />}
              sx={{
                mt: 2.5,
                px: 0,
                color: RED,
                fontWeight: 700,
                fontSize: '0.75rem',
                letterSpacing: 2,
                textTransform: 'uppercase',
                borderRadius: 0,
                borderBottom: `1px solid ${alpha(RED, 0.35)}`,
                '&:hover': {
                  background: 'transparent',
                  borderColor: RED,
                  color: '#fff',
                },
              }}
            >
              Explore All
            </Button>
          </Box>
        </Stack>
      </m.div>

      <AccentRule sx={{ mt: { xs: 6, md: 8 } }} />
    </Box>
  );

  // ─── Cards Grid ─────────────────────────────────────────────────────────────
  const renderCards = (
    <Box>
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
          <CircularProgress size={28} sx={{ color: RED }} />
        </Box>
      ) : featuredClasses.length === 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
          <Typography sx={{ color: alpha('#fff', 0.3), fontSize: '0.85rem', letterSpacing: 2 }}>
            NO CLASSES AVAILABLE
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            gap: 0,
            // Outer border frame
            border: `1px solid ${alpha('#fff', 0.06)}`,
          }}
        >
          {featuredClasses.map((item, index) => {
            const formattedIndex = String(index + 1).padStart(2, '0');
            const isActive = activeIndex === index;

            // Determine border styles for internal grid lines
            const col = index % (mdUp ? 3 : 2);
            const row = Math.floor(index / (mdUp ? 3 : 2));

            return (
              <m.div
                key={item.id}
                variants={varFade({ distance: 30 }).inUp}
                transition={{ delay: index * 0.08 }}
              >
                <Box
                  component={RouterLink}
                  to="/classes"
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: { xs: 340, md: 440 },
                    position: 'relative',
                    overflow: 'hidden',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    // Internal grid lines via borders
                    borderRight: `1px solid ${alpha('#fff', 0.06)}`,
                    borderBottom: `1px solid ${alpha('#fff', 0.06)}`,
                    // Red accent on left for hovered card
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: 2,
                      height: '100%',
                      bgcolor: RED,
                      transform: 'scaleY(0)',
                      transformOrigin: 'bottom',
                      transition: 'transform 0.45s cubic-bezier(0.22,1,0.36,1)',
                      zIndex: 20,
                    },
                    '&:hover::before': {
                      transform: 'scaleY(1)',
                    },
                    '&:hover .card-image': {
                      transform: 'scale(1.07)',
                      filter: 'brightness(0.55)',
                    },
                    '&:hover .card-meta': {
                      transform: 'translateY(-4px)',
                    },
                    '&:hover .card-cta': {
                      opacity: 1,
                      transform: 'translateY(0)',
                    },
                  }}
                >
                  {/* Image layer */}
                  <Image
                    alt={item.title}
                    src={item.image_url}
                    className="card-image"
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      width: 1,
                      height: 1,
                      objectFit: 'cover',
                      objectPosition: 'center top',
                      transition: 'transform 0.65s cubic-bezier(0.22,1,0.36,1), filter 0.5s ease',
                      filter: 'brightness(0.45)',
                    }}
                  />

                  {/* Gradient overlay */}
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      background: `linear-gradient(to top, ${BLACK} 0%, transparent 55%)`,
                      zIndex: 1,
                    }}
                  />

                  {/* Index number — top right */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 20,
                      right: 20,
                      zIndex: 5,
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: 'monospace',
                        fontSize: '0.6rem',
                        fontWeight: 800,
                        letterSpacing: 2,
                        color: alpha('#fff', 0.25),
                        transition: 'color 0.3s',
                        ...(isActive && { color: RED }),
                      }}
                    >
                      {formattedIndex}
                    </Typography>
                  </Box>

                  {/* Bottom meta */}
                  <Box
                    className="card-meta"
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      zIndex: 5,
                      p: { xs: 2.5, md: 3 },
                      transition: 'transform 0.4s ease',
                    }}
                  >
                    {/* Category tag */}
                    {item.category && (
                      <Box
                        sx={{
                          display: 'inline-flex',
                          px: 1.25,
                          py: 0.4,
                          mb: 1.5,
                          border: `1px solid ${alpha(RED, 0.4)}`,
                          bgcolor: alpha(RED, 0.08),
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: '0.58rem',
                            fontWeight: 800,
                            letterSpacing: 2.5,
                            textTransform: 'uppercase',
                            color: RED,
                            fontFamily: 'monospace',
                          }}
                        >
                          {item.category}
                        </Typography>
                      </Box>
                    )}

                    <Stack direction="row" alignItems="flex-end" justifyContent="space-between">
                      <Typography
                        sx={{
                          fontWeight: 900,
                          fontSize: { xs: '1rem', md: '1.15rem' },
                          textTransform: 'uppercase',
                          letterSpacing: 1,
                          color: 'common.white',
                          lineHeight: 1.2,
                          fontFamily: "'Poppins', sans-serif",
                        }}
                      >
                        {item.title}
                      </Typography>

                      <Box
                        sx={{
                          width: 34,
                          height: 34,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: `1px solid ${alpha('#fff', 0.12)}`,
                          flexShrink: 0,
                          ml: 2,
                          transition: 'background 0.3s, border-color 0.3s',
                          ...(isActive && {
                            bgcolor: RED,
                            borderColor: RED,
                          }),
                        }}
                      >
                        <Iconify
                          icon="solar:arrow-right-up-bold"
                          width={15}
                          sx={{ color: 'common.white' }}
                        />
                      </Box>
                    </Stack>

                    {/* Hover CTA */}
                    <Box
                      className="card-cta"
                      sx={{
                        mt: 1.5,
                        opacity: 0,
                        transform: 'translateY(6px)',
                        transition: 'opacity 0.35s ease, transform 0.35s ease',
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: '0.72rem',
                          color: alpha('#fff', 0.45),
                          letterSpacing: 1.5,
                          textTransform: 'uppercase',
                          fontFamily: 'monospace',
                        }}
                      >
                        {item.duration ? `${item.duration} min · ` : ''}
                        {item.level || 'All Levels'}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </m.div>
            );
          })}
        </Box>
      )}
    </Box>
  );

  // ─── Footer Row ──────────────────────────────────────────────────────────────
  const renderFooter = (
    <m.div variants={varFade().inUp}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems="center"
        justifyContent="space-between"
        spacing={3}
        sx={{ mt: 6, pt: 5, borderTop: `1px solid ${alpha('#fff', 0.06)}` }}
      >
        {/* Left: stat pill */}
        <Stack direction="row" alignItems="center" spacing={3}>
          <Box>
            <Typography
              sx={{
                fontSize: '1.6rem',
                fontWeight: 900,
                color: 'common.white',
                lineHeight: 1,
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              20+
            </Typography>
            <Typography
              sx={{
                fontSize: '0.6rem',
                fontWeight: 700,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: alpha('#fff', 0.28),
                fontFamily: 'monospace',
                mt: 0.5,
              }}
            >
              Active Classes
            </Typography>
          </Box>

          <Box sx={{ width: 1, height: 40, borderLeft: `1px solid ${alpha('#fff', 0.08)}` }} />

          <Box>
            <Typography
              sx={{
                fontSize: '1.6rem',
                fontWeight: 900,
                color: 'common.white',
                lineHeight: 1,
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              1K+
            </Typography>
            <Typography
              sx={{
                fontSize: '0.6rem',
                fontWeight: 700,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: alpha('#fff', 0.28),
                fontFamily: 'monospace',
                mt: 0.5,
              }}
            >
              Members
            </Typography>
          </Box>
        </Stack>

        {/* Right: CTA */}
        <Button
          component={RouterLink}
          to="/classes"
          variant="contained"
          size="large"
          endIcon={<Iconify icon="solar:arrow-right-up-bold" width={18} />}
          sx={{
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
            '&:hover': {
              bgcolor: RED_DARK,
              boxShadow: 'none',
            },
          }}
        >
          View All Classes
        </Button>
      </Stack>
    </m.div>
  );

  // ─── Root ────────────────────────────────────────────────────────────────────
  return (
    <Box
      sx={{
        py: { xs: 10, md: 16 },
        bgcolor: BLACK,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background ghost text */}
      <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <GhostLabel>Classes</GhostLabel>
      </Box>

      {/* Left edge red line */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 2,
          height: '100%',
          background: `linear-gradient(to bottom, transparent, ${RED} 30%, ${RED} 70%, transparent)`,
          opacity: 0.15,
        }}
      />

      <Container component={MotionViewport} maxWidth="lg">
        {renderHeader}
        {renderCards}
        {renderFooter}
      </Container>
    </Box>
  );
}
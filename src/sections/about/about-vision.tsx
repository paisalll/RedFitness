import { m } from 'framer-motion';
// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';
// hooks
import { useSectionContent } from 'src/hooks/use-page-content';

// ----------------------------------------------------------------------

const RED = '#DF2026';
const RED_DARK = '#A8171C';
const BLACK = '#060606';

export default function HomeRockstarWorkouts() {
  const content = useSectionContent('membership', 'vision');

  const FEATURES = [
    { icon: 'solar:users-group-two-rounded-bold-duotone', text: content.feature1 },
    { icon: 'solar:dumbbell-large-bold-duotone', text: content.feature2 },
    { icon: 'solar:meditation-round-bold-duotone', text: content.feature3 },
    { icon: 'solar:bicycle-bold-duotone', text: content.feature4 },
  ];

  return (
    <Box
      sx={{
        py: { xs: 10, md: 15 },
        bgcolor: BLACK, 
        overflow: 'hidden',
        position: 'relative',
        borderTop: `1px solid ${alpha(RED, 0.15)}`
      }}
    >
       {/* Background Decoration */}
       <Box
        sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: '50%',
            filter: 'blur(120px)',
            background: alpha(RED, 0.1),
            zIndex: 0,
            pointerEvents: 'none'
        }}
       />

      <Container component={MotionViewport} sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={{ xs: 5, md: 8 }} alignItems="center">
          
          {/* BAGIAN KIRI: GAMBAR */}
          <Grid xs={12} md={5}>
            <m.div variants={varFade().inLeft}>
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: 0, // Sharp
                  overflow: 'hidden',
                  border: `1px solid ${alpha(RED, 0.2)}`,
                }}
              >
                <Image
                  alt="rockstar workout"
                  src="/assets/images/e097b50dfb5b0a4131cbabfd28082f7c.webp" 
                  ratio="3/4"
                  sx={{
                    transition: 'transform 0.5s ease',
                    '&:hover': { transform: 'scale(1.05)' },
                  }}
                />
                
                {/* Overlay Gradient */}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: 1,
                        height: '40%',
                        background: `linear-gradient(to top, ${BLACK} 0%, transparent 100%)`,
                    }}
                />
              </Box>
            </m.div>
          </Grid>

          {/* BAGIAN KANAN: KONTEN & FITUR */}
          <Grid xs={12} md={7}>
            <m.div variants={varFade().inRight}>
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
                  <Box sx={{ width: 28, height: 2, bgcolor: RED }} />
                  <Typography sx={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: 4, textTransform: 'uppercase', color: RED, fontFamily: 'monospace' }}>
                    {content.eyebrow}
                  </Typography>
              </Stack>

              <Typography 
                variant="h2" 
                sx={{ 
                    mb: 3, 
                    fontWeight: 800, 
                    textTransform: 'uppercase', 
                    color: '#fff',
                    fontFamily: "'Poppins', sans-serif",
                    letterSpacing: -2,
                    lineHeight: 0.95
                }}
              >
                {content.title} <br />
                <Box component="span" sx={{ color: RED, fontStyle: 'italic' }}>{content.title_highlight}</Box>
              </Typography>
              
              <Typography sx={{ color: alpha('#fff', 0.6), mb: 5, fontSize: '0.9rem', lineHeight: 1.8 }}>
                {content.description}
              </Typography>

              {/* Box Feature List - Sharp Design */}
              <Box
                sx={{
                    p: 4,
                    borderRadius: 0, // Sharp
                    bgcolor: '#080808',
                    border: `1px solid ${alpha(RED, 0.15)}`,
                    borderLeft: `3px solid ${RED}`,
                }}
              >
                  <Stack spacing={3}>
                    {FEATURES.map((feature, index) => (
                      <Stack key={index} direction="row" spacing={2.5} alignItems="center">
                        <Iconify 
                            icon={feature.icon} 
                            width={24} 
                            sx={{ color: RED }} 
                        />
                        <Typography sx={{ color: alpha('#fff', 0.9), fontWeight: 500, fontSize: '0.9rem', fontFamily: 'monospace', textTransform: 'uppercase' }}>
                            {feature.text}
                        </Typography>
                      </Stack>
                    ))}

                    <Box sx={{ pt: 3 }}>
                        <Button
                            variant="contained"
                            size="large"
                            endIcon={<Iconify icon="solar:arrow-right-up-bold" />}
                            sx={{
                                borderRadius: 0, // Sharp
                                px: 5,
                                py: 1.75,
                                fontSize: '0.72rem',
                                fontWeight: 800,
                                fontFamily: 'monospace',
                                letterSpacing: 2,
                                textTransform: 'uppercase',
                                bgcolor: RED,
                                color: '#fff',
                                boxShadow: 'none',
                                '&:hover': { bgcolor: RED_DARK, boxShadow: 'none' }
                            }}
                        >
                            {content.button}
                        </Button>
                    </Box>
                  </Stack>
              </Box>
            </m.div>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}
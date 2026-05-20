import { m } from 'framer-motion';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
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

export default function HomeGoalsAndDualCTA() {
  const theme = useTheme();
  const content = useSectionContent('membership', 'team');

  const renderGoalsSection = (
    <Container component={MotionViewport} sx={{ py: { xs: 10, md: 15 }, position: 'relative', zIndex: 2 }}>
      <Grid container spacing={{ xs: 5, md: 8 }} alignItems="center">
        {/* TEKS & KONTEN (KIRI) */}
        <Grid xs={12} md={6}>
          <m.div variants={varFade().inLeft}>
             <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
              <Box sx={{ width: 28, height: 2, bgcolor: RED }} />
              <Typography sx={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: 4, textTransform: 'uppercase', color: RED, fontFamily: 'monospace' }}>
                {content.goals_eyebrow}
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
              {content.goals_title} <br />
              <Box component="span" sx={{ color: RED, fontStyle: 'italic' }}>{content.goals_title_highlight}</Box>
            </Typography>

            <Typography sx={{ color: alpha('#fff', 0.6), mb: 4, fontSize: '0.9rem', lineHeight: 1.8 }}>
              {content.goals_description}
            </Typography>

            {/* Feature Box - Sharp Corners */}
            <Box
              sx={{
                p: 4,
                mb: 5,
                borderRadius: 0, // Sharp
                bgcolor: '#080808', // Solid dark background
                border: `1px solid ${alpha(RED, 0.15)}`,
                borderLeft: `3px solid ${RED}`,
              }}
            >
              <Stack spacing={3}>
                {[content.goals_point1, content.goals_point2].map((text, index) => (
                  <Stack key={index} direction="row" alignItems="flex-start" spacing={2.5}>
                    <Iconify 
                      icon="solar:star-bold" 
                      width={20} 
                      sx={{ color: RED, mt: 0.2, flexShrink: 0 }} 
                    />
                    <Typography sx={{ color: alpha('#fff', 0.8), fontSize: '0.85rem', lineHeight: 1.6 }}>
                      {text}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>

            <Button
              variant="contained"
              size="large"
              endIcon={<Iconify icon="solar:arrow-right-up-bold" />}
              sx={{
                bgcolor: RED,
                color: '#fff',
                borderRadius: 0, // Sharp
                px: 5,
                py: 1.75,
                fontWeight: 800,
                fontSize: '0.72rem',
                fontFamily: 'monospace',
                textTransform: 'uppercase',
                letterSpacing: 2,
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: RED_DARK,
                  boxShadow: 'none',
                }
              }}
            >
              {content.goals_button}
            </Button>
          </m.div>
        </Grid>

        {/* GAMBAR (KANAN) */}
        <Grid xs={12} md={6}>
          <m.div variants={varFade().inRight}>
            <Box
              sx={{
                position: 'relative',
                borderRadius: 0, // Sharp
                overflow: 'hidden',
                border: `1px solid ${alpha(RED, 0.15)}`,
              }}
            >
              <Image
                alt="crush goals"
                src="/assets/background/home/7.png" 
                ratio="3/4"
                sx={{
                  transition: 'transform 0.5s ease',
                  '&:hover': { transform: 'scale(1.05)' },
                }}
              />
               {/* Overlay Gradient Merah-Hitam di bawah gambar */}
               <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: 1,
                    height: '50%',
                    background: `linear-gradient(to top, ${BLACK} 0%, transparent 100%)`,
                  }}
                />
            </Box>
          </m.div>
        </Grid>
      </Grid>
    </Container>
  );

  const renderDualCTA = (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, width: 1, borderTop: `1px solid ${alpha(RED, 0.15)}` }}>
      
      {/* BAGIAN KIRI: TRY US FOR FREE */}
      <Box
        sx={{
          flex: 1,
          py: { xs: 10, md: 15 },
          px: { xs: 3, md: 8 },
          textAlign: 'center',
          background: `linear-gradient(135deg, ${BLACK} 0%, ${RED_DARK} 100%)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          borderRight: { md: `1px solid ${alpha('#fff', 0.1)}` },
          borderBottom: { xs: `1px solid ${alpha('#fff', 0.1)}`, md: 'none' }
        }}
      >
        <m.div variants={varFade().inUp}>
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={1.5} sx={{ mb: 2 }}>
              <Box sx={{ width: 20, height: 2, bgcolor: RED }} />
              <Typography sx={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: 4, textTransform: 'uppercase', color: RED, fontFamily: 'monospace' }}>
                {content.trial_eyebrow}
              </Typography>
          </Stack>
          <Typography variant="h2" sx={{ color: '#fff', mb: 2, fontWeight: 800, textTransform: 'uppercase', fontFamily: "'Poppins', sans-serif", letterSpacing: -2, lineHeight: 0.95 }}>
            {content.trial_title} <br /> <Box component="span" sx={{ fontStyle: 'italic', color: RED }}>{content.trial_title_highlight}</Box>
          </Typography>
          <Typography sx={{ color: alpha('#fff', 0.6), mb: 5, maxWidth: 320, mx: 'auto', fontSize: '0.9rem' }}>
            {content.trial_description}
          </Typography>
          
          <Button
            variant="contained"
            size="large"
            endIcon={<Iconify icon="solar:arrow-right-up-bold" />}
            sx={{
                bgcolor: '#fff',
                color: BLACK,
                borderRadius: 0, // Sharp
                px: 5,
                py: 1.75,
                fontWeight: 800,
                fontFamily: 'monospace',
                letterSpacing: 2,
                textTransform: 'uppercase',
                boxShadow: 'none',
                '&:hover': { bgcolor: alpha('#fff', 0.9), boxShadow: 'none' }
            }}
          >
            {content.trial_button}
          </Button>
        </m.div>
      </Box>

      {/* BAGIAN KANAN: CORPORATE DEAL */}
      <Box
        sx={{
          flex: 1,
          py: { xs: 10, md: 15 },
          px: { xs: 3, md: 8 },
          textAlign: 'center',
          bgcolor: '#080808',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <m.div variants={varFade().inUp}>
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={1.5} sx={{ mb: 2 }}>
              <Typography sx={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: 4, textTransform: 'uppercase', color: RED, fontFamily: 'monospace' }}>
                {content.corp_eyebrow}
              </Typography>
              <Box sx={{ width: 20, height: 2, bgcolor: RED }} />
          </Stack>
          <Typography variant="h2" sx={{ color: '#fff', mb: 2, fontWeight: 800, textTransform: 'uppercase', fontFamily: "'Poppins', sans-serif", letterSpacing: -2, lineHeight: 0.95 }}>
            {content.corp_title} <br /> <Box component="span" sx={{ fontStyle: 'italic', color: RED }}>{content.corp_title_highlight}</Box>
          </Typography>
          <Typography sx={{ color: alpha('#fff', 0.6), mb: 5, maxWidth: 320, mx: 'auto', fontSize: '0.9rem' }}>
            {content.corp_description}
          </Typography>
          
          <Button
            variant="contained"
            size="large"
            endIcon={<Iconify icon="solar:arrow-right-up-bold" />}
            sx={{
                bgcolor: RED,
                color: '#fff',
                borderRadius: 0, // Sharp
                px: 5,
                py: 1.75,
                fontWeight: 800,
                fontFamily: 'monospace',
                letterSpacing: 2,
                textTransform: 'uppercase',
                boxShadow: 'none',
                '&:hover': { bgcolor: RED_DARK, boxShadow: 'none' }
            }}
          >
            {content.corp_button}
          </Button>
        </m.div>
      </Box>

    </Box>
  );

  return (
    <Box sx={{ bgcolor: BLACK, overflow: 'hidden' }}>
      {renderGoalsSection}
      {renderDualCTA}
    </Box>
  );
}
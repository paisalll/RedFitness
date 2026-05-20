import { m } from 'framer-motion';
// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
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
const BLACK = '#060606';

export default function PersonalTrainingQuality() {
  const content = useSectionContent('contact', 'fact');
  return (
    <Box sx={{ bgcolor: BLACK, py: { xs: 10, md: 15 }, overflow: 'hidden', borderTop: `1px solid ${alpha(RED, 0.15)}` }}>
      <Container component={MotionViewport} maxWidth="lg">
        
        {/* SECTION 1: DID YOU KNOW? */}
        <Grid container spacing={{ xs: 5, md: 10 }} alignItems="center" sx={{ mb: { xs: 10, md: 20 } }}>
          <Grid xs={12} md={6}>
            <m.div variants={varFade().inLeft}>
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
                  <Box sx={{ width: 28, height: 2, bgcolor: RED }} />
                  <Typography sx={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: 4, textTransform: 'uppercase', color: RED, fontFamily: 'monospace' }}>
                    {content.s1_eyebrow}
                  </Typography>
              </Stack>
              <Typography variant="h2" sx={{ color: '#fff', fontWeight: 800, mb: 3, textTransform: 'uppercase', lineHeight: 0.95, letterSpacing: -2, fontFamily: "'Poppins', sans-serif" }}>
                {content.s1_title} <br />
                <Box component="span" sx={{ color: RED, fontStyle: 'italic' }}>{content.s1_title_highlight}</Box>
              </Typography>

              <Typography sx={{ color: alpha('#fff', 0.6), mb: 5, fontSize: '0.9rem', lineHeight: 1.8 }}>
                {content.s1_description}
              </Typography>

              <Box
                sx={{
                  p: 4,
                  borderRadius: 0, // Sharp
                  bgcolor: '#080808',
                  border: `1px solid ${alpha(RED, 0.2)}`,
                  borderLeft: `3px solid ${RED}`,
                  position: 'relative'
                }}
              >
                <Typography variant="overline" sx={{ color: RED, fontWeight: 800, mb: 3, display: 'block', letterSpacing: 2, fontFamily: 'monospace' }}>
                  {content.s1_label}
                </Typography>

                <Stack spacing={3}>
                  <Stack direction="row" spacing={2.5}>
                    <Iconify icon="solar:star-bold" sx={{ color: RED, mt: 0.2, flexShrink: 0 }} width={20} />
                    <Typography sx={{ color: alpha('#fff', 0.9), fontSize: '0.85rem', lineHeight: 1.6 }}>
                      {content.s1_point1}
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={2.5}>
                    <Iconify icon="solar:star-bold" sx={{ color: RED, mt: 0.2, flexShrink: 0 }} width={20} />
                    <Typography sx={{ color: alpha('#fff', 0.9), fontSize: '0.85rem', lineHeight: 1.6 }}>
                      {content.s1_point2}
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
            </m.div>
          </Grid>

          <Grid xs={12} md={6}>
            <m.div variants={varFade().inRight}>
              <Box sx={{ position: 'relative' }}>
                <Image
                  alt="trainer feedback"
                  src="public/assets/images/people-working-out-indoors-together-with-dumbbells.jpg"
                  sx={{
                    borderRadius: 0, // Sharp
                    border: `1px solid ${alpha(RED, 0.2)}`,
                    boxShadow: `-24px 24px 72px ${alpha(RED, 0.15)}`,
                  }}
                />
                 <Box sx={{ position: 'absolute', top: 0, left: 0, width: 1, height: 1, background: `linear-gradient(to right, ${alpha(BLACK, 0.6)} 0%, transparent 100%)` }} />
              </Box>
            </m.div>
          </Grid>
        </Grid>

        {/* SECTION 2: COMMITTED TO QUALITY */}
        <Grid container spacing={{ xs: 5, md: 10 }} alignItems="center" direction={{ xs: 'column-reverse', md: 'row' }}>
          <Grid xs={12} md={6}>
            <m.div variants={varFade().inLeft}>
                <Box sx={{ position: 'relative' }}>
                    <Image
                        alt="quality assessment"
                        src="public/assets/images/people-working-out-indoors-together-with-dumbbells.jpg"
                        sx={{
                        borderRadius: 0, // Sharp
                        border: `1px solid ${alpha(RED, 0.2)}`,
                        boxShadow: `24px 24px 72px ${alpha(RED, 0.15)}`,
                        }}
                    />
                     <Box sx={{ position: 'absolute', top: 0, left: 0, width: 1, height: 1, background: `linear-gradient(to left, ${alpha(BLACK, 0.6)} 0%, transparent 100%)` }} />
                </Box>
            </m.div>
          </Grid>

          <Grid xs={12} md={6} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
            <m.div variants={varFade().inRight}>
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2, justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                  <Typography sx={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: 4, textTransform: 'uppercase', color: RED, fontFamily: 'monospace' }}>
                    {content.s2_eyebrow}
                  </Typography>
                  <Box sx={{ width: 28, height: 2, bgcolor: RED }} />
              </Stack>
              <Typography variant="h2" sx={{ color: '#fff', fontWeight: 800, mb: 3, textTransform: 'uppercase', lineHeight: 0.95, letterSpacing: -2, fontFamily: "'Poppins', sans-serif" }}>
                {content.s2_title} <br />
                <Box component="span" sx={{ color: RED, fontStyle: 'italic' }}>{content.s2_title_highlight}</Box>
              </Typography>

              <Typography sx={{ color: alpha('#fff', 0.6), lineHeight: 1.8, fontSize: '0.9rem' }}>
                {content.s2_description}
              </Typography>
            </m.div>
          </Grid>
        </Grid>

      </Container>
    </Box>
  );
}
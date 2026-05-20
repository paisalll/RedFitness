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

const COLORS = {
  red: '#DF2026',
  black: '#000000',
  white: '#FFFFFF',
};

const PLAYBOOK_ICONS = [
  'solar:hand-shake-bold-duotone',
  'solar:star-fall-bold-duotone',
  'solar:graph-up-bold-duotone',
];

const CULTURE_ICONS = [
  'solar:users-group-rounded-bold',
  'solar:rocket-bold',
  'solar:heart-bold',
  'solar:flag-bold',
  'solar:emoji-funny-circle-bold',
];

export default function CareersCulture() {
  const content = useSectionContent('career', 'culture');
  const PLAYBOOK = PLAYBOOK_ICONS.map((icon, i) => ({
    icon,
    title: content[`playbook${i + 1}_title`] || '',
    description: content[`playbook${i + 1}_desc`] || '',
  }));
  const CULTURE_LIST = CULTURE_ICONS.map((icon, i) => ({ icon, text: content[`culture${i + 1}`] || '' }));
  return (
    <Box sx={{ bgcolor: COLORS.black, py: { xs: 10, md: 15 }, color: COLORS.white }}>
      <Container component={MotionViewport}>
        
        {/* SECTION 1: OUR PLAYBOOK */}
        <Grid container spacing={{ xs: 5, md: 8 }} sx={{ mb: { xs: 15, md: 20 } }}>
          <Grid xs={12} md={4}>
            <m.div variants={varFade().inLeft}>
              <Typography variant="h2" sx={{ fontWeight: 900, textTransform: 'uppercase', lineHeight: 1 }}>
                {content.playbook_heading}
              </Typography>
            </m.div>
          </Grid>

          <Grid xs={12} md={8}>
            <Grid container spacing={4}>
              {PLAYBOOK.map((item, index) => (
                <Grid key={item.title} xs={12} sm={6} md={4}>
                  <m.div variants={varFade().inUp} transition={{ delay: index * 0.1 }}>
                    <Box
                      sx={{
                        p: 4,
                        height: 1,
                        borderRadius: 2,
                        border: `1px solid ${alpha(COLORS.white, 0.1)}`,
                        bgcolor: alpha(COLORS.white, 0.02),
                        transition: 'all 0.3s',
                        '&:hover': {
                          borderColor: COLORS.red,
                          transform: 'translateY(-8px)',
                        }
                      }}
                    >
                      <Iconify icon={item.icon} width={40} sx={{ color: COLORS.red, mb: 3 }} />
                      <Typography variant="h6" sx={{ fontWeight: 800, textTransform: 'uppercase', mb: 2 }}>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.7 }}>
                        {item.description}
                      </Typography>
                    </Box>
                  </m.div>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        {/* SECTION 2: OUR SUCCESS CULTURE */}
        <Grid container spacing={{ xs: 5, md: 10 }} alignItems="center">
          
          {/* IMAGE LEFT */}
          <Grid xs={12} md={6}>
            <m.div variants={varFade().inLeft}>
              <Box sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden' }}>
                <Image
                  alt="Success Culture"
                  src="/assets/background/CAREERS/carrer1.png" // Ganti dengan gambar tim gym
                  sx={{ width: 1, height: 1, objectFit: 'cover' }}
                />
                
                {/* Overlay Gradient */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: 1,
                    height: 1,
                    background: `linear-gradient(to top, ${alpha(COLORS.black, 0.6)} 0%, transparent 100%)`,
                  }}
                />
              </Box>
            </m.div>
          </Grid>

          {/* CONTENT RIGHT */}
          <Grid xs={12} md={6}>
            <m.div variants={varFade().inRight}>
              <Typography variant="h2" sx={{ fontWeight: 900, textTransform: 'uppercase', mb: 1, lineHeight: 1 }}>
                {content.success_title_l1}
              </Typography>
              <Typography variant="h2" sx={{ fontWeight: 900, textTransform: 'uppercase', color: COLORS.red, mb: 4 }}>
                {content.success_title_l2}
              </Typography>

              <Typography sx={{ color: 'text.secondary', mb: 6 }}>
                {content.success_description}
              </Typography>

              <Stack spacing={4}>
                {CULTURE_LIST.map((item, index) => (
                  <Stack key={item.text} direction="row" alignItems="center" spacing={3}>
                    <Iconify icon={item.icon} width={32} sx={{ color: COLORS.white }} />
                    <Typography variant="h5" sx={{ fontWeight: 800, textTransform: 'uppercase' }}>
                      {item.text}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </m.div>
          </Grid>

        </Grid>

      </Container>
    </Box>
  );
}
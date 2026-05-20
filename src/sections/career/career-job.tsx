import { useState } from 'react';
import { m } from 'framer-motion';
// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
// components
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';
// hooks
import { useSectionContent } from 'src/hooks/use-page-content';

// ----------------------------------------------------------------------

const COLORS = {
  red: '#D40000',
  black: '#000000',
  white: '#FFFFFF',
};

const CATEGORIES = ['ALL', 'FITNESS', 'FRONT OF HOUSE', 'MANAGEMENT'];

export default function CareersJobs() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const content = useSectionContent('career', 'jobs');
  const JOBS = [1, 2, 3, 4].map((n) => ({
    title: content[`job${n}_title`] || '',
    department: content[`job${n}_dept`] || '',
    location: content[`job${n}_location`] || '',
    type: content[`job${n}_type`] || '',
    isNew: false,
  }));
  const STEPS = [
    { id: '01', title: content.step1_title || '', description: content.step1_desc || '' },
    {
      id: '02',
      title: content.step2_title || '',
      description: (
        <>
          {content.step2_desc}{' '}
          <Link href={`mailto:${content.step2_email}`} sx={{ color: COLORS.red, textDecoration: 'underline' }}>
            {content.step2_email}
          </Link>
        </>
      ),
    },
    { id: '03', title: content.step3_title || '', description: content.step3_desc || '' },
  ];

  return (
    <Box sx={{ bgcolor: COLORS.black, py: { xs: 10, md: 15 }, color: COLORS.white }}>
      <Container component={MotionViewport}>
        
        {/* SECTION 1: JOBS WITH US */}
        <Stack spacing={5} sx={{ mb: 15 }}>
          
          {/* Header & Filters */}
          <Stack 
            direction={{ xs: 'column', md: 'row' }} 
            alignItems="center" 
            justifyContent="space-between" 
            spacing={3}
          >
            <m.div variants={varFade().inRight}>
              <Typography variant="h2" sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1 }}>
                {content.jobs_title_base} <Box component="span" sx={{ color: COLORS.red }}>{content.jobs_title_highlight}</Box>
              </Typography>
            </m.div>

            <m.div variants={varFade().inLeft}>
              <Stack direction="row" spacing={1} alignItems="center">
                <IconButton size="small" sx={{ color: COLORS.white, border: `1px solid ${alpha(COLORS.white, 0.2)}` }}>
                   <Iconify icon="eva:arrow-ios-back-fill" />
                </IconButton>
                
                {CATEGORIES.map((cat) => (
                  <Button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    sx={{
                      borderRadius: 1,
                      px: 2,
                      py: 0.5,
                      color: activeCategory === cat ? COLORS.white : alpha(COLORS.white, 0.6),
                      bgcolor: activeCategory === cat ? COLORS.red : 'transparent',
                      fontWeight: 'bold',
                      fontSize: '0.75rem',
                      border: `1px solid ${activeCategory === cat ? COLORS.red : alpha(COLORS.white, 0.2)}`,
                      '&:hover': {
                         bgcolor: activeCategory === cat ? COLORS.red : alpha(COLORS.white, 0.1)
                      }
                    }}
                  >
                    {cat}
                  </Button>
                ))}

                <IconButton size="small" sx={{ color: COLORS.white, border: `1px solid ${alpha(COLORS.white, 0.2)}` }}>
                   <Iconify icon="eva:arrow-ios-forward-fill" />
                </IconButton>
              </Stack>
            </m.div>
          </Stack>

          {/* Jobs Grid */}
          <Grid container spacing={3}>
            {JOBS.map((job, index) => (
              <Grid key={index} xs={12} md={6} lg={3}>
                <m.div variants={varFade().inUp} transition={{ delay: index * 0.1 }}>
                  <Card
                    sx={{
                      p: 4,
                      height: 1,
                      bgcolor: alpha(COLORS.white, 0.03),
                      border: `1px solid ${alpha(COLORS.white, 0.1)}`,
                      borderRadius: 2,
                      position: 'relative',
                      transition: 'all 0.3s',
                      cursor: 'pointer',
                      '&:hover': {
                        borderColor: COLORS.red,
                        transform: 'translateY(-5px)',
                        bgcolor: alpha(COLORS.white, 0.05),
                      }
                    }}
                  >
                    {job.isNew && (
                      <Chip 
                        label="NEW" 
                        size="small" 
                        sx={{ 
                          bgcolor: '#ff0055', // Hot Pink/Red untuk badge NEW agar mencolok
                          color: COLORS.white, 
                          fontWeight: 'bold',
                          borderRadius: 0.5,
                          mb: 2
                        }} 
                      />
                    )}

                    <Typography variant="h6" sx={{ fontWeight: 800, textTransform: 'uppercase', mb: 4, lineHeight: 1.3 }}>
                      {job.title}
                    </Typography>

                    <Stack spacing={1.5} sx={{ opacity: 0.7 }}>
                      <Stack direction="row" alignItems="center" spacing={1.5}>
                        <Iconify icon="solar:dumbbells-bold" width={18} />
                        <Typography variant="body2">{job.department}</Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" spacing={1.5}>
                        <Iconify icon="solar:map-point-bold" width={18} />
                        <Typography variant="body2">{job.location}</Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" spacing={1.5}>
                        <Iconify icon="solar:shop-bold" width={18} />
                        <Typography variant="body2">{job.type}</Typography>
                      </Stack>
                    </Stack>

                    <Box sx={{ position: 'absolute', bottom: 24, right: 24 }}>
                      <Iconify icon="solar:arrow-right-up-bold" sx={{ color: COLORS.red }} width={24} />
                    </Box>
                  </Card>
                </m.div>
              </Grid>
            ))}
          </Grid>
        </Stack>


        {/* SECTION 2: LIKE IT SO FAR? */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <m.div variants={varFade().inDown}>
            <Typography variant="h2" sx={{ fontWeight: 900, textTransform: 'uppercase' }}>
              {content.steps_title_base} <Box component="span" sx={{ color: COLORS.red }}>{content.steps_title_highlight}</Box>
            </Typography>
          </m.div>
        </Box>

        <Grid container spacing={4}>
          {STEPS.map((step, index) => (
            <Grid key={step.id} xs={12} md={4}>
              <m.div variants={varFade().inUp} transition={{ delay: index * 0.2 }}>
                <Box 
                  sx={{ 
                    p: 5, 
                    height: 1,
                    border: `1px solid ${alpha(COLORS.white, 0.1)}`,
                    borderRadius: 2,
                    bgcolor: alpha(COLORS.white, 0.02),
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <Typography 
                    variant="h1" 
                    sx={{ 
                      color: 'transparent', 
                      WebkitTextStroke: `1px ${alpha(COLORS.red, 0.5)}`, // Outline text Merah
                      opacity: 0.5,
                      fontWeight: 900,
                      fontSize: '4rem',
                      mb: 2
                    }}
                  >
                    {step.id}
                  </Typography>

                  <Typography variant="h5" sx={{ fontWeight: 800, textTransform: 'uppercase', mb: 2 }}>
                    {step.title}
                  </Typography>

                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                    {step.description}
                  </Typography>
                </Box>
              </m.div>
            </Grid>
          ))}
        </Grid>

      </Container>
    </Box>
  );
}
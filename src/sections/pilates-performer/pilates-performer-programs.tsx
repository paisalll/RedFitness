import { m } from 'framer-motion';
// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// components
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

const RED = '#DF2026';
const RED_DARK = '#A8171C';
const BLACK = '#060606';

const PROGRAMS = [
  {
    num: '01',
    title: 'Reformer Pilates',
    level: 'All Levels',
    duration: '50 mins',
    desc: 'Using the Pilates Reformer machine to provide resistance-based training. Ideal for building functional strength with controlled, fluid motion.',
    tags: ['Reformer Machine', 'Resistance', 'Strength'],
  },
  {
    num: '02',
    title: 'Mat Pilates',
    level: 'Beginner – Intermediate',
    duration: '45 mins',
    desc: 'The foundation of Pilates. Body-weight exercises performed on a mat, focusing on core engagement, breath control, and spinal alignment.',
    tags: ['Mat', 'Core', 'Alignment'],
  },
  {
    num: '03',
    title: 'Pilates Flow',
    level: 'Intermediate – Advanced',
    duration: '55 mins',
    desc: 'A dynamic class linking Pilates movements in a smooth sequence. Builds endurance, coordination, and full-body control.',
    tags: ['Dynamic', 'Endurance', 'Flow'],
  },
  {
    num: '04',
    title: 'Private Session',
    level: 'Personalised',
    duration: '60 mins',
    desc: '1-on-1 sessions with a certified Pilates instructor. Perfect for rehabilitation, specific goals, or learning correct technique.',
    tags: ['Private', '1-on-1', 'Custom'],
  },
];

// ----------------------------------------------------------------------

export default function PilatesPerformerPrograms() {
  return (
    <Box
      sx={{
        bgcolor: '#080808',
        py: { xs: 10, md: 15 },
        borderTop: `1px solid ${alpha(RED, 0.15)}`,
        borderBottom: `1px solid ${alpha(RED, 0.15)}`,
      }}
    >
      <Container component={MotionViewport}>
        {/* HEADER */}
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ md: 'flex-end' }}
          justifyContent="space-between"
          spacing={3}
          sx={{ mb: 8 }}
        >
          <Box>
            <m.div variants={varFade().inLeft}>
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
                <Box sx={{ width: 28, height: 2, bgcolor: RED }} />
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
                  Our Programs
                </Typography>
              </Stack>

              <Typography
                variant="h2"
                sx={{
                  color: '#fff',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  fontFamily: "'Poppins', sans-serif",
                  letterSpacing: -2,
                  lineHeight: 0.9,
                }}
              >
                Choose Your{' '}
                <Box component="span" sx={{ color: RED, fontStyle: 'italic' }}>
                  Program.
                </Box>
              </Typography>
            </m.div>
          </Box>

          <m.div variants={varFade().inRight}>
            <Typography sx={{ color: alpha('#fff', 0.5), maxWidth: 360, fontSize: '0.875rem', lineHeight: 1.8 }}>
              From beginner mat classes to advanced reformer sessions — find the program that fits your level and goals.
            </Typography>
          </m.div>
        </Stack>

        {/* PROGRAMS LIST */}
        <Stack spacing={2}>
          {PROGRAMS.map((prog, index) => (
            <m.div key={prog.num} variants={varFade().inUp}>
              <Box
                sx={{
                  p: { xs: 3, md: 4 },
                  border: `1px solid ${alpha('#fff', 0.07)}`,
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  alignItems: { md: 'center' },
                  gap: 4,
                  transition: 'border-color 0.3s, background 0.3s',
                  cursor: 'default',
                  '&:hover': {
                    borderColor: alpha(RED, 0.4),
                    bgcolor: alpha(RED, 0.03),
                  },
                }}
              >
                {/* Number */}
                <Typography
                  sx={{
                    fontFamily: 'monospace',
                    fontSize: '2.5rem',
                    fontWeight: 900,
                    color: alpha(RED, 0.25),
                    lineHeight: 1,
                    flexShrink: 0,
                    width: { md: 64 },
                  }}
                >
                  {prog.num}
                </Typography>

                {/* Main info */}
                <Box sx={{ flex: 1 }}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ sm: 'center' }} spacing={2} sx={{ mb: 1.5 }}>
                    <Typography
                      variant="h5"
                      sx={{
                        color: '#fff',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        fontFamily: "'Poppins', sans-serif",
                        letterSpacing: -0.5,
                      }}
                    >
                      {prog.title}
                    </Typography>

                    <Stack direction="row" spacing={1}>
                      {prog.tags.map((tag) => (
                        <Box
                          key={tag}
                          sx={{
                            px: 1.25,
                            py: 0.4,
                            fontSize: '0.6rem',
                            fontWeight: 800,
                            fontFamily: 'monospace',
                            letterSpacing: 1,
                            textTransform: 'uppercase',
                            color: alpha(RED, 0.9),
                            border: `1px solid ${alpha(RED, 0.25)}`,
                            bgcolor: alpha(RED, 0.06),
                          }}
                        >
                          {tag}
                        </Box>
                      ))}
                    </Stack>
                  </Stack>

                  <Typography sx={{ color: alpha('#fff', 0.5), fontSize: '0.875rem', lineHeight: 1.8, maxWidth: 600 }}>
                    {prog.desc}
                  </Typography>
                </Box>

                {/* Meta */}
                <Stack spacing={1.5} sx={{ flexShrink: 0, textAlign: { xs: 'left', md: 'right' } }}>
                  <Stack direction="row" alignItems="center" spacing={1} justifyContent={{ md: 'flex-end' }}>
                    <Iconify icon="solar:clock-circle-bold" width={14} sx={{ color: RED }} />
                    <Typography sx={{ color: alpha('#fff', 0.6), fontSize: '0.8rem', fontFamily: 'monospace' }}>
                      {prog.duration}
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1} justifyContent={{ md: 'flex-end' }}>
                    <Iconify icon="solar:diploma-bold" width={14} sx={{ color: RED }} />
                    <Typography sx={{ color: alpha('#fff', 0.6), fontSize: '0.8rem', fontFamily: 'monospace' }}>
                      {prog.level}
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
            </m.div>
          ))}
        </Stack>

        {/* CTA */}
        <Box sx={{ textAlign: 'center', mt: 10 }}>
          <m.div variants={varFade().inUp}>
            <Button
              variant="contained"
              size="large"
              endIcon={<Iconify icon="solar:arrow-right-up-bold" />}
              href="/join/select-club"
              sx={{
                bgcolor: RED,
                color: '#fff',
                borderRadius: 0,
                px: 6,
                py: 1.75,
                fontSize: '0.72rem',
                fontWeight: 800,
                letterSpacing: 2,
                textTransform: 'uppercase',
                fontFamily: 'monospace',
                boxShadow: 'none',
                '&:hover': { bgcolor: RED_DARK, boxShadow: 'none' },
              }}
            >
              Start Your Program
            </Button>
          </m.div>
        </Box>
      </Container>
    </Box>
  );
}

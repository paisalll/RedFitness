import { m } from 'framer-motion';
// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
// components
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';
// hooks
import { useSectionContent } from 'src/hooks/use-page-content';

// ----------------------------------------------------------------------

const RED = '#DF2026';
const RED_DARK = '#A8171C';
const BLACK = '#060606';

const inputSx = {
    '& .MuiFilledInput-root': {
      borderRadius: 0, // Sharp
      color: '#fff',
      fontFamily: 'monospace',
      bgcolor: alpha('#fff', 0.05),
      borderBottom: `2px solid ${alpha('#fff', 0.2)}`,
      '&:hover': { bgcolor: alpha('#fff', 0.08) },
      '&.Mui-focused': { bgcolor: alpha('#fff', 0.1), borderBottomColor: RED },
    },
    '& .MuiInputLabel-root': { color: alpha('#fff', 0.4), fontFamily: 'monospace', fontSize: '0.8rem' },
    '& .MuiInputLabel-root.Mui-focused': { color: RED },
};

export default function PersonalTrainingFinal() {
  const content = useSectionContent('contact', 'form');
  const BENEFITS = [1, 2, 3, 4, 5, 6].map((n) => content[`benefit${n}`] || '');
  const FAQ = [1, 2, 3, 4].map((n) => ({ question: content[`faq${n}_q`] || '', answer: content[`faq${n}_a`] || '' }));

  return (
    <Box sx={{ bgcolor: BLACK, py: { xs: 10, md: 15 }, color: '#fff', borderTop: `1px solid ${alpha(RED, 0.15)}` }}>
      <Container component={MotionViewport}>
        
        {/* SECTION: JOIN THE PROGRAM */}
        <Grid container spacing={{ xs: 5, md: 10 }} alignItems="center" sx={{ mb: { xs: 15, md: 20 } }}>
          
          {/* Kolom Kiri: Form Sign Up */}
          <Grid xs={12} md={5}>
            <m.div variants={varFade().inLeft}>
              <Box
                sx={{
                  p: 4,
                  borderRadius: 0, // Sharp
                  bgcolor: '#080808',
                  border: `1px solid ${alpha(RED, 0.2)}`,
                  boxShadow: `-20px 20px 60px -8px ${alpha(BLACK, 0.8)}`,
                }}
              >
                <Stack direction="row" alignItems="center" justifyContent="center" spacing={1.5} sx={{ mb: 2 }}>
                    <Box sx={{ width: 20, height: 2, bgcolor: RED }} />
                    <Typography sx={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: 4, textTransform: 'uppercase', color: RED, fontFamily: 'monospace' }}>
                        {content.form_eyebrow}
                    </Typography>
                </Stack>
                <Typography variant="h4" sx={{ mb: 1, fontWeight: 800, textAlign: 'center', fontFamily: "'Poppins', sans-serif", textTransform: 'uppercase', letterSpacing: -1 }}>
                  {content.form_title} <br />
                  <Box component="span" sx={{ color: RED, fontStyle: 'italic' }}>{content.form_title_highlight}</Box>
                </Typography>
                <Typography variant="body2" sx={{ mb: 4, textAlign: 'center', opacity: 0.6, fontFamily: 'monospace' }}>
                  {content.form_description}
                </Typography>

                <Stack spacing={2.5}>
                  <TextField fullWidth label="First Name" variant="filled" sx={inputSx} />
                  <TextField fullWidth label="Last Name" variant="filled" sx={inputSx} />
                  <TextField fullWidth label="Email Address" variant="filled" sx={inputSx} />
                  <TextField fullWidth label="Phone Number" variant="filled" sx={inputSx} />
                  
                  <FormControlLabel
                    control={<Checkbox sx={{ color: alpha('#fff', 0.3), '&.Mui-checked': { color: RED } }} />}
                    label={
                      <Typography variant="caption" sx={{ opacity: 0.7, fontFamily: 'monospace' }}>
                        I agree to the <span style={{ color: RED, textDecoration: 'underline' }}>Terms</span> and Data Privacy policy.
                      </Typography>
                    }
                  />

                  <Button
                    fullWidth
                    size="large"
                    variant="contained"
                    endIcon={<Iconify icon="solar:arrow-right-up-bold" />}
                    sx={{
                      bgcolor: RED,
                      color: '#fff',
                      fontWeight: 800,
                      py: 1.75,
                      borderRadius: 0, // Sharp
                      fontFamily: 'monospace',
                      letterSpacing: 2,
                      textTransform: 'uppercase',
                      boxShadow: 'none',
                      '&:hover': { bgcolor: RED_DARK, boxShadow: 'none' }
                    }}
                  >
                    {content.form_button}
                  </Button>
                </Stack>
              </Box>
            </m.div>
          </Grid>

          {/* Kolom Kanan: Benefit List */}
          <Grid xs={12} md={7}>
            <m.div variants={varFade().inRight}>
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
                  <Box sx={{ width: 28, height: 2, bgcolor: RED }} />
                  <Typography sx={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: 4, textTransform: 'uppercase', color: RED, fontFamily: 'monospace' }}>
                    {content.program_eyebrow}
                  </Typography>
              </Stack>
              <Typography variant="h2" sx={{ fontWeight: 800, textTransform: 'uppercase', mb: 3, fontFamily: "'Poppins', sans-serif", letterSpacing: -2, lineHeight: 0.95 }}>
                {content.program_title} <br /> <Box component="span" sx={{ fontStyle: 'italic', color: RED }}>{content.program_title_highlight}</Box>
              </Typography>
              <Typography sx={{ color: alpha('#fff', 0.6), mb: 5, fontSize: '0.9rem', lineHeight: 1.8 }}>
                {content.program_description}
              </Typography>

              <Box sx={{ p: 4, bgcolor: '#080808', borderRadius: 0, border: `1px solid ${alpha('#fff', 0.1)}`, borderLeft: `3px solid ${RED}` }}>
                <Typography variant="overline" sx={{ mb: 3, fontWeight: 800, color: RED, display: 'block', letterSpacing: 2 }}>{content.program_benefits_label}</Typography>
                <Stack spacing={2.5}>
                  {BENEFITS.filter(Boolean).map((text, index) => (
                    <Stack key={index} direction="row" spacing={2} alignItems="center">
                      <Iconify icon="solar:star-bold" width={18} sx={{ color: RED }} />
                      <Typography variant="body2" sx={{ opacity: 0.9, fontFamily: 'monospace', fontSize: '0.8rem' }}>{text.toUpperCase()}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            </m.div>
          </Grid>
        </Grid>

        {/* SECTION: FAQ */}
        <Box>
          <m.div variants={varFade().inDown}>
             <Stack direction="row" alignItems="center" justifyContent="center" spacing={1.5} sx={{ mb: 2 }}>
                <Box sx={{ width: 28, height: 2, bgcolor: RED }} />
                <Typography sx={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: 4, textTransform: 'uppercase', color: RED, fontFamily: 'monospace' }}>
                    {content.faq_eyebrow}
                </Typography>
                <Box sx={{ width: 28, height: 2, bgcolor: RED }} />
            </Stack>
            <Typography variant="h2" sx={{ textAlign: 'center', fontWeight: 800, mb: 8, textTransform: 'uppercase', fontFamily: "'Poppins', sans-serif", letterSpacing: -2, lineHeight: 0.95 }}>
              {content.faq_title} <br /> <Box component="span" sx={{ color: RED, fontStyle: 'italic' }}>{content.faq_title_highlight}</Box>
            </Typography>
          </m.div>

          <Stack spacing={2} sx={{ maxWidth: 800, mx: 'auto' }}>
            {FAQ.map((item, index) => (
              <m.div key={index} variants={varFade().inUp}>
                <Accordion 
                  sx={{ 
                    bgcolor: '#080808', 
                    color: '#fff',
                    borderRadius: 0, // Sharp
                    border: `1px solid ${alpha('#fff', 0.1)}`,
                    '&:before': { display: 'none' },
                    '&.Mui-expanded': { border: `1px solid ${RED}`, bgcolor: '#0c0c0c' }
                  }}
                >
                  <AccordionSummary expandIcon={<Iconify icon="solar:alt-arrow-down-bold" sx={{ color: RED }} />}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 800, fontFamily: "'Poppins', sans-serif", letterSpacing: 0.5 }}>{item.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography sx={{ opacity: 0.7, fontSize: '0.9rem', lineHeight: 1.8 }}>{item.answer}</Typography>
                  </AccordionDetails>
                </Accordion>
              </m.div>
            ))}
          </Stack>
        </Box>

      </Container>
    </Box>
  );
}
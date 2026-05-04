import { m } from 'framer-motion';
// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// components
import Iconify from 'src/components/iconify';
import { varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

const RED = '#DF2026';
const RED_DARK = '#A8171C';
const BLACK = '#060606';

export default function TimeTableDualCTA() {
  return (
    <Box sx={{ bgcolor: BLACK, overflow: 'hidden', borderTop: `1px solid ${alpha(RED, 0.15)}` }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, width: 1 }}>
        
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
            borderRight: { md: `1px solid ${alpha('#fff', 0.1)}` },
            position: 'relative'
          }}
        >
          <m.div variants={varFade().inUp}>
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={1.5} sx={{ mb: 2 }}>
              <Box sx={{ width: 20, height: 2, bgcolor: RED }} />
              <Typography sx={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: 4, textTransform: 'uppercase', color: RED, fontFamily: 'monospace' }}>
                Trial Access
              </Typography>
            </Stack>

            <Typography variant="h2" sx={{ color: '#fff', mb: 2, fontWeight: 800, textTransform: 'uppercase', fontFamily: "'Poppins', sans-serif", letterSpacing: -2, lineHeight: 0.95 }}>
              Try Us <br /> For <Box component="span" sx={{ fontStyle: 'italic', color: RED }}>Free.</Box>
            </Typography>
            
            <Typography sx={{ color: alpha('#fff', 0.6), mb: 5, maxWidth: 320, fontSize: '0.9rem' }}>
              Experience the standard of elite training with an exclusive trial.
            </Typography>

            <Button
              variant="contained"
              size="large"
              endIcon={<Iconify icon="solar:arrow-right-up-bold" />}
              sx={{ 
                borderRadius: 0, 
                px: 5, 
                py: 1.75,
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: 2,
                fontFamily: 'monospace',
                bgcolor: '#fff',
                color: BLACK,
                '&:hover': { bgcolor: alpha('#fff', 0.9) }
              }}
            >
              Claim Free Trial
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
                B2B Solutions
              </Typography>
              <Box sx={{ width: 20, height: 2, bgcolor: RED }} />
            </Stack>

            <Typography variant="h2" sx={{ color: '#fff', mb: 2, fontWeight: 800, textTransform: 'uppercase', fontFamily: "'Poppins', sans-serif", letterSpacing: -2, lineHeight: 0.95 }}>
              Corporate <br /> <Box component="span" sx={{ fontStyle: 'italic', color: RED }}>Deal.</Box>
            </Typography>

            <Typography sx={{ color: alpha('#fff', 0.6), mb: 5, maxWidth: 320, fontSize: '0.9rem' }}>
              Elevate your team&apos;s performance with our tailored corporate memberships.
            </Typography>

            <Button
              variant="contained"
              size="large"
              endIcon={<Iconify icon="solar:arrow-right-up-bold" />}
              sx={{ 
                borderRadius: 0, 
                px: 5, 
                py: 1.75,
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: 2,
                fontFamily: 'monospace',
                bgcolor: RED,
                color: '#fff',
                '&:hover': { bgcolor: RED_DARK }
              }}
            >
              Get Proposal
            </Button>
          </m.div>
        </Box>
      </Box>
    </Box>
  );
}
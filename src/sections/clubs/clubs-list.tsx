import { useEffect, useState } from 'react';
import { m } from 'framer-motion';
// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';
import { supabase } from 'src/utils/supabase';

// ----------------------------------------------------------------------

const RED = '#DF2026';
const BLACK = '#060606';

export default function ClubsGrid() {
  const [clubs, setClubs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchClubs = async () => {
      setIsLoading(true);
      const { data, error } = await supabase.from('clubs').select('*');
      
      if (!error && data) {
        setClubs(data);
      } else {
        console.error('Error fetching clubs:', error);
      }
      setIsLoading(false);
    };
    fetchClubs();
  }, []);

  return (
    <Box sx={{ bgcolor: BLACK, py: { xs: 10, md: 15 }, color: '#fff', borderTop: `1px solid ${alpha(RED, 0.15)}` }}>
      <Container component={MotionViewport}>
        
        {/* HEADER & SEARCH */}
        <Stack spacing={5} sx={{ mb: 8 }} alignItems="center">
          <m.div variants={varFade().inDown}>
             <Stack direction="row" alignItems="center" justifyContent="center" spacing={1.5} sx={{ mb: 2 }}>
              <Box sx={{ width: 28, height: 2, bgcolor: RED }} />
              <Typography sx={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: 4, textTransform: 'uppercase', color: RED, fontFamily: 'monospace' }}>
                Our Locations
              </Typography>
              <Box sx={{ width: 28, height: 2, bgcolor: RED }} />
            </Stack>
            <Typography variant="h2" sx={{ fontWeight: 800, textTransform: 'uppercase', textAlign: 'center', fontFamily: "'Poppins', sans-serif", letterSpacing: -2, lineHeight: 0.9 }}>
              All Gym <Box component="span" sx={{ color: RED, fontStyle: 'italic' }}>Clubs.</Box>
            </Typography>
          </m.div>

          <m.div variants={varFade().inUp}>
            <TextField
              placeholder="ENTER SEARCH TERMS"
              variant="outlined"
              sx={{
                width: { xs: 1, md: 480 },
                '& .MuiOutlinedInput-root': {
                  color: '#fff',
                  fontFamily: 'monospace',
                  fontSize: '0.8rem',
                  bgcolor: '#080808', // Dark fill
                  borderRadius: 0, // Sharp
                  border: `1px solid ${alpha('#fff', 0.1)}`,
                  transition: 'all 0.3s',
                  '& fieldset': { border: 'none' },
                  '&:hover': { 
                      borderColor: alpha('#fff', 0.3) 
                  },
                  '&.Mui-focused': { 
                      borderColor: RED,
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="solar:settings-bold-duotone" width={24} sx={{ color: alpha('#fff', 0.4), mr: 1 }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" sx={{ color: RED, borderRadius: 0, '&:hover': { bgcolor: alpha(RED, 0.1) } }}>
                       <Iconify icon="eva:search-fill" />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </m.div>
        </Stack>

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress sx={{ color: RED }} />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {clubs.map((club, index) => (
              <Grid key={club.id || index} xs={12} sm={6} md={3}>
                <m.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                >
                  <Card
                    sx={{
                      bgcolor: '#080808',
                      borderRadius: 0, // Sharp
                      border: `1px solid ${alpha(RED, 0.15)}`,
                      borderLeft: `3px solid ${RED}`,
                      overflow: 'hidden',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        borderColor: alpha(RED, 0.5),
                        bgcolor: '#0c0c0c',
                        '& .club-img': { transform: 'scale(1.05)' },
                        '& .arrow-icon': { bgcolor: RED, color: '#fff', borderColor: RED }
                      }
                    }}
                  >
                    {/* Image Container */}
                    <Box sx={{ position: 'relative', pt: '65%', overflow: 'hidden' }}>
                      <Image
                        alt={club.name}
                        src={club.image_url} 
                        className="club-img"
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: 1,
                          height: 1,
                          transition: 'transform 0.5s ease',
                        }}
                      />
                       {/* Overlay Gradien pada gambar agar tidak terlalu terang */}
                       <Box sx={{ position: 'absolute', top: 0, left: 0, width: 1, height: 1, background: `linear-gradient(to bottom, transparent 40%, ${BLACK} 100%)` }} />
                    </Box>

                    {/* Content Container */}
                    <Box sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', bgcolor: '#080808' }}>
                      <Box>
                          <Typography variant="overline" sx={{ color: RED, fontFamily: 'monospace', mb: 0.5, display: 'block', letterSpacing: 2 }}>
                            {club.city || 'LOCATION'}
                          </Typography>
                          <Typography variant="h5" sx={{ fontWeight: 800, textTransform: 'uppercase', mb: 1, lineHeight: 1.1, fontFamily: "'Poppins', sans-serif" }}>
                            {club.name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: alpha('#fff', 0.5), lineHeight: 1.5, mb: 3, display: 'block', fontFamily: 'monospace' }}>
                            {club.address}
                          </Typography>
                      </Box>

                      {/* Arrow Icon Button */}
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                           <Typography sx={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: 1.5, fontFamily: 'monospace', color: RED, mr: 1, textTransform: 'uppercase' }}>
                              View Detail
                           </Typography>
                           <IconButton 
                              className="arrow-icon"
                              size="small"
                              sx={{ 
                                  bgcolor: BLACK,
                                  color: alpha('#fff', 0.5),
                                  transition: 'all 0.3s',
                                  border: `1px solid ${alpha('#fff', 0.1)}`,
                                  borderRadius: 0, // Sharp
                              }}
                           >
                              <Iconify icon="solar:arrow-right-up-bold" width={18} />
                           </IconButton>
                      </Box>
                    </Box>
                  </Card>
                </m.div>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
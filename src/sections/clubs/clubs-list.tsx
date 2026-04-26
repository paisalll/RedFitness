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
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';
import { useEffect, useState } from 'react';
import { supabase } from 'src/utils/supabase';

// ----------------------------------------------------------------------

const COLORS = {
  red: '#D40000',
  black: '#000000',
  white: '#FFFFFF',
};

export default function ClubsGrid() {
  const [clubs, setClubs] = useState<any[]>([]);
  // (Opsional) Tambahkan state loading agar lebih rapi
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchClubs = async () => {
      setIsLoading(true);
      const { data, error } = await supabase.from('clubs').select('*');
      
      // Pastikan data tidak null sebelum set ke state
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
    <Box sx={{ bgcolor: COLORS.black, py: { xs: 10, md: 15 }, color: COLORS.white }}>
      <Container component={MotionViewport}>
        
        {/* HEADER & SEARCH */}
        <Stack spacing={5} sx={{ mb: 8 }} alignItems="center">
          <m.div variants={varFade().inDown}>
            <Typography variant="h2" sx={{ fontWeight: 900, textTransform: 'uppercase', textAlign: 'center' }}>
              ALL GYM <Box component="span" sx={{ color: COLORS.red }}>CLUBS</Box>
            </Typography>
          </m.div>

          <m.div variants={varFade().inUp}>
            <TextField
              placeholder="Enter Search Terms"
              variant="outlined"
              sx={{
                width: { xs: 1, md: 480 },
                '& .MuiOutlinedInput-root': {
                  color: COLORS.white,
                  bgcolor: alpha(COLORS.white, 0.05),
                  borderRadius: 2,
                  border: `1px solid ${alpha(COLORS.white, 0.2)}`,
                  transition: 'all 0.3s',
                  '& fieldset': { border: 'none' },
                  '&:hover': { 
                      bgcolor: alpha(COLORS.white, 0.08),
                      borderColor: COLORS.white 
                  },
                  '&.Mui-focused': { 
                      borderColor: COLORS.red,
                      boxShadow: `0 0 0 2px ${alpha(COLORS.red, 0.2)}`
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="solar:settings-bold-duotone" width={24} sx={{ color: COLORS.white, mr: 1, cursor: 'pointer' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end">
                       <Iconify icon="eva:search-fill" sx={{ color: COLORS.red }} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </m.div>
        </Stack>

        {/* LOADING STATE (Opsional) */}
        {isLoading && (
          <Typography textAlign="center" sx={{ color: 'text.secondary', mt: 5 }}>
            Loading clubs data...
          </Typography>
        )}

        {/* CLUBS GRID */}
        <Grid container spacing={4}>
          {clubs.map((club, index) => (
            // Gunakan club.id sebagai key jika ada, jangan index
            <Grid key={club.id || index} xs={12} sm={6} md={3}>
              {/* PERBAIKAN DI SINI: Gunakan animasi manual alih-alih varFade dari parent */}
              <m.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
              >
                <Card
                  sx={{
                    bgcolor: alpha(COLORS.white, 0.03),
                    borderRadius: 2,
                    border: `1px solid ${alpha(COLORS.white, 0.05)}`,
                    overflow: 'hidden',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      borderColor: COLORS.red,
                      bgcolor: alpha(COLORS.white, 0.05),
                      '& .club-img': { transform: 'scale(1.1)' },
                      '& .arrow-icon': { bgcolor: COLORS.red, color: COLORS.white }
                    }
                  }}
                >
                  {/* Image Container */}
                  <Box sx={{ position: 'relative', pt: '65%', overflow: 'hidden' }}>
                    <Image
                      alt={club.name}
                      src={club.image_url} // Pastikan field di database bernama image_url (bukan img)
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
                  </Box>

                  {/* Content Container */}
                  <Box sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 800, textTransform: 'uppercase', mb: 1, lineHeight: 1.2 }}>
                        {club.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.85rem', lineHeight: 1.5, mb: 3 }}>
                        {club.address}
                        </Typography>
                    </Box>

                    {/* Arrow Icon Button */}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                         <IconButton 
                            className="arrow-icon"
                            size="small"
                            sx={{ 
                                bgcolor: 'transparent',
                                color: COLORS.red,
                                transition: 'all 0.3s',
                                border: `1px solid ${alpha(COLORS.red, 0.3)}`,
                                '&:hover': { bgcolor: COLORS.red, color: COLORS.white }
                            }}
                         >
                            <Iconify icon="solar:arrow-right-up-bold" width={20} />
                         </IconButton>
                    </Box>
                  </Box>
                </Card>
              </m.div>
            </Grid>
          ))}
        </Grid>

      </Container>
    </Box>
  );
}
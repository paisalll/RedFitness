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

// ----------------------------------------------------------------------

const COLORS = {
  red: '#D40000',
  black: '#000000',
  white: '#FFFFFF',
};

const CLUBS = [
  { name: 'ARTHA GADING - JAKARTA', address: 'Jl. Artha Gading Selatan No. 01, Jakarta', img: '/assets/images/clubs/artha_gading.jpg' },
  { name: 'BOTANI SQUARE', address: 'Botani Square 2nd Floor, Jl. Pajajaran, 16127 Bogor, West Java', img: '/assets/images/clubs/botani.jpg' },
  { name: 'CENTRAL PARK MALL', address: 'Central Park Mall 3rd Floor Unit 113, Jl. Letjen S. Parman Kav 28, 11470, Jakarta', img: '/assets/images/clubs/central_park.jpg' },
  { name: 'FX', address: 'Jl. Jendral Sudirman, Pintu Senayan 1, Jakarta 10270', img: '/assets/images/clubs/fx.jpg' },
  { name: 'FOOD CENTRUM', address: 'Food Centrum 2nd Floor, Jl. Sunter Kemayoran, Jakarta', img: '/assets/images/clubs/food_centrum.jpg' },
  { name: 'GALAXY MALL', address: 'Jl. Dharmahusada Indah Timur 35-37, Surabaya', img: '/assets/images/clubs/galaxy_mall.jpg' },
  { name: 'GANDARIA CITY', address: 'Jl. Sultan Iskandar Muda, Kebayoran Lama, Jakarta', img: '/assets/images/clubs/gandaria_city.jpg' },
  { name: 'KOTA KASABLANKA', address: 'Jl. Casablanca Raya Kav 88, Jakarta', img: '/assets/images/clubs/kota_kasablanka.jpg' },
];

export default function ClubsGrid() {
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
                  borderRadius: 2, // Rounded box seperti referensi
                  border: `1px solid ${alpha(COLORS.white, 0.2)}`,
                  transition: 'all 0.3s',
                  '& fieldset': { border: 'none' }, // Hapus default border MUI
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

        {/* CLUBS GRID */}
        <Grid container spacing={4}>
          {CLUBS.map((club, index) => (
            <Grid key={index} xs={12} sm={6} md={3}>
              <m.div variants={varFade().inUp}>
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
                      src={club.img}
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
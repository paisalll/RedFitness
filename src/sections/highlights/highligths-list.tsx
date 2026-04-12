import { m } from 'framer-motion';
// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
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

const HIGHLIGHTS = [
  { 
    title: 'FUN RUN COMMUNITY GATHERING SPONSORED BY METROPOLITAN MALL', 
    image: '/assets/background/HIGHLIGHT/36.png' 
  },
  { 
    title: 'RED FITNESS CSR & DONATION AT MIZAN AMANAH KALIDERES', 
    image: '/assets/background/HIGHLIGHT/35.png' 
  },
  { 
    title: 'RED FITNESS ZUMBA GLOW UP EVENT AT HOTEL NEO+ AIRPORT JAKARTA', 
    image: '/assets/background/HIGHLIGHT/34.png' 
  }
];

export default function HighlightsList() {
    return (
        <Box sx={{ bgcolor: COLORS.black, py: { xs: 10, md: 15 }, color: COLORS.white }}>
        <Container component={MotionViewport}>
            
            {/* HEADER */}
            <Box sx={{ textAlign: 'center', mb: 8 }}>
            <m.div variants={varFade().inDown}>
                <Typography 
                variant="h2" 
                sx={{ 
                    fontWeight: 900, 
                    textTransform: 'uppercase', 
                    letterSpacing: 1
                }}
                >
                CHECK OUT OUR <Box component="span" sx={{ color: COLORS.red }}>HIGHLIGHTS</Box>
                </Typography>
            </m.div>
            </Box>

            {/* HIGHLIGHTS GRID */}
            <Grid container spacing={4}>
            {HIGHLIGHTS.map((item, index) => (
                <Grid key={index} xs={12} sm={6} md={3}>
                <m.div variants={varFade().inUp}>
                    <Card
                    sx={{
                        bgcolor: alpha(COLORS.white, 0.05),
                        borderRadius: 2,
                        border: `1px solid ${alpha(COLORS.white, 0.05)}`,
                        boxShadow: 'none',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        '&:hover': {
                        transform: 'translateY(-8px)',
                        bgcolor: alpha(COLORS.white, 0.08),
                        borderColor: alpha(COLORS.red, 0.3),
                        '& .arrow-box': {
                            bgcolor: COLORS.red,
                            color: COLORS.white,
                        }
                        }
                    }}
                    >
                    {/* Image Area */}
                    <Box sx={{ position: 'relative', pt: '65%', overflow: 'hidden' }}>
                        <Image
                        alt={item.title}
                        src={item.image}
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: 1,
                            height: 1,
                            transition: 'transform 0.5s ease',
                            '&:hover': { transform: 'scale(1.1)' }
                        }}
                        />
                    </Box>

                    {/* Content Area */}
                    <CardContent 
                        sx={{ 
                        flexGrow: 1, 
                        display: 'flex', 
                        flexDirection: 'column', 
                        justifyContent: 'space-between',
                        p: 3 
                        }}
                    >
                        <Typography 
                        variant="subtitle2" 
                        sx={{ 
                            fontWeight: 800, 
                            textTransform: 'uppercase', 
                            lineHeight: 1.5,
                            mb: 3,
                            color: COLORS.white
                        }}
                        >
                        {item.title}
                        </Typography>

                        <Stack direction="row" justifyContent="flex-end">
                        <Box
                            className="arrow-box"
                            sx={{
                            width: 36,
                            height: 36,
                            borderRadius: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: alpha(COLORS.white, 0.1),
                            color: COLORS.red,
                            transition: 'all 0.3s ease',
                            }}
                        >
                            <Iconify icon="solar:arrow-right-up-bold" width={20} />
                        </Box>
                        </Stack>
                    </CardContent>
                    </Card>
                </m.div>
                </Grid>
            ))}
            </Grid>

        </Container>
        </Box>
    );
}
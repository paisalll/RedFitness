import { useState } from 'react';
import { m } from 'framer-motion';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
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

const CATEGORIES = ['ALL', 'CARDIO', 'DANCE', 'MIND AND BODY', 'STRENGTH'];

// ✅ DATA LENGKAP — 35 kelas unik dari master Excel (FormatDataRedFitness.xlsx), tanpa duplikasi
// Kategori disesuaikan dengan getClassCategory di timetable-section
const CLASSES = [
  // ── CARDIO & HIIT ──────────────────────────────────────────────────────
  { title: 'AERO STEP',        category: 'Cardio | 60mins',  filterCat: 'CARDIO',       image: '/assets/background/CLASSES/22.png' },
  { title: 'AEROBIC',          category: 'Cardio | 60mins',  filterCat: 'CARDIO',       image: '/assets/background/CLASSES/23.png' },
  { title: 'AEROBOXING',       category: 'Cardio | 60mins',  filterCat: 'CARDIO',       image: '/assets/background/CLASSES/24.png' },
  { title: 'FIT CAMP',         category: 'Cardio | 60mins',  filterCat: 'CARDIO',       image: '/assets/background/CLASSES/22.png' },
  { title: 'POUNDFIT',         category: 'Cardio | 60mins',  filterCat: 'CARDIO',       image: '/assets/background/CLASSES/23.png' },
  { title: 'POWER STEP',       category: 'Cardio | 60mins',  filterCat: 'CARDIO',       image: '/assets/background/CLASSES/24.png' },

  // ── DANCE ──────────────────────────────────────────────────────────────
  { title: 'BELLY DANCE',      category: 'Dance | 60mins',   filterCat: 'DANCE',        image: '/assets/background/CLASSES/22.png' },
  { title: 'BOLLY X',          category: 'Dance | 60mins',   filterCat: 'DANCE',        image: '/assets/background/CLASSES/23.png' },
  { title: 'CARDIO DANCE',     category: 'Dance | 60mins',   filterCat: 'DANCE',        image: '/assets/background/CLASSES/24.png' },
  { title: 'CARDIO K-POP',     category: 'Dance | 60mins',   filterCat: 'DANCE',        image: '/assets/background/CLASSES/22.png' },
  { title: 'CID',              category: 'Dance | 60mins',   filterCat: 'DANCE',        image: '/assets/background/CLASSES/23.png' },
  { title: 'MODERN DANCE',     category: 'Dance | 60mins',   filterCat: 'DANCE',        image: '/assets/background/CLASSES/24.png' },
  { title: 'STYLE DANCE',      category: 'Dance | 60mins',   filterCat: 'DANCE',        image: '/assets/background/CLASSES/22.png' },
  { title: 'TWERKOUT',         category: 'Dance | 60mins',   filterCat: 'DANCE',        image: '/assets/background/CLASSES/23.png' },
  { title: 'URBAN DANCE',      category: 'Dance | 60mins',   filterCat: 'DANCE',        image: '/assets/background/CLASSES/24.png' },
  { title: 'ZUMBA',            category: 'Dance | 60mins',   filterCat: 'DANCE',        image: '/assets/background/CLASSES/22.png' },

  // ── MIND AND BODY ──────────────────────────────────────────────────────
  { title: 'BASIC YOGA',       category: 'Mind and Body | 60mins',  filterCat: 'MIND AND BODY', image: '/assets/background/CLASSES/23.png' },
  { title: 'FLOW YOGA',        category: 'Mind and Body | 60mins',  filterCat: 'MIND AND BODY', image: '/assets/background/CLASSES/24.png' },
  { title: 'GENTLE YOGA',      category: 'Mind and Body | 60mins',  filterCat: 'MIND AND BODY', image: '/assets/background/CLASSES/22.png' },
  { title: 'HATHA YOGA',       category: 'Mind and Body | 60mins',  filterCat: 'MIND AND BODY', image: '/assets/background/CLASSES/23.png' },
  { title: 'MAT PILATES',      category: 'Mind and Body | 60mins',  filterCat: 'MIND AND BODY', image: '/assets/background/CLASSES/24.png' },
  { title: 'PILATES',          category: 'Mind and Body | 60mins',  filterCat: 'MIND AND BODY', image: '/assets/background/CLASSES/22.png' },
  { title: 'PILATES ABS & GLUTES', category: 'Mind and Body | 60mins', filterCat: 'MIND AND BODY', image: '/assets/background/CLASSES/23.png' },
  { title: 'PILATES BASIC',    category: 'Mind and Body | 60mins',  filterCat: 'MIND AND BODY', image: '/assets/background/CLASSES/24.png' },
  { title: 'PILATES FLOW',     category: 'Mind and Body | 60mins',  filterCat: 'MIND AND BODY', image: '/assets/background/CLASSES/22.png' },
  { title: 'POWER YOGA',       category: 'Mind and Body | 60mins',  filterCat: 'MIND AND BODY', image: '/assets/background/CLASSES/23.png' },
  { title: 'VINYASA YOGA',     category: 'Mind and Body | 90mins',  filterCat: 'MIND AND BODY', image: '/assets/background/CLASSES/24.png' },
  { title: 'YIN YOGA',         category: 'Mind and Body | 60mins',  filterCat: 'MIND AND BODY', image: '/assets/background/CLASSES/22.png' },
  { title: 'YOGA',             category: 'Mind and Body | 60mins',  filterCat: 'MIND AND BODY', image: '/assets/background/CLASSES/23.png' },

  // ── STRENGTH & MARTIAL ARTS ────────────────────────────────────────────
  { title: 'BOXING DRILL',     category: 'Strength & Martial Arts | 60mins', filterCat: 'STRENGTH', image: '/assets/background/CLASSES/24.png' },
  { title: 'BOXING PAD',       category: 'Strength & Martial Arts | 60mins', filterCat: 'STRENGTH', image: '/assets/background/CLASSES/22.png' },
  { title: 'CORE EXERCISES',   category: 'Strength & Martial Arts | 60mins', filterCat: 'STRENGTH', image: '/assets/background/CLASSES/23.png' },
  { title: 'MUAYTHAI',         category: 'Strength & Martial Arts | 60mins', filterCat: 'STRENGTH', image: '/assets/background/CLASSES/24.png' },
  { title: 'PUMP CONDITIONING',category: 'Strength & Martial Arts | 60mins', filterCat: 'STRENGTH', image: '/assets/background/CLASSES/22.png' },
  { title: 'STRONG NATION',    category: 'Strength & Martial Arts | 60mins', filterCat: 'STRENGTH', image: '/assets/background/CLASSES/23.png' },
];

export default function ClassesExplore() {
    const [activeCategory, setActiveCategory] = useState('ALL');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredClasses = CLASSES.filter((item) => {
      const matchCat = activeCategory === 'ALL' || item.filterCat === activeCategory;
      const matchSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchSearch;
    });

    return (
        <Box sx={{ bgcolor: COLORS.black, py: { xs: 10, md: 15 }, color: COLORS.white }}>
        <Container component={MotionViewport}>
            
            {/* HEADER: TITLE & SEARCH */}
            <Stack spacing={5} sx={{ mb: 8 }}>
            <m.div variants={varFade().inDown}>
                <Typography variant="h2" sx={{ textAlign: 'center', fontWeight: 900, textTransform: 'uppercase' }}>
                EXPLORE <Box component="span" sx={{ color: COLORS.red }}>ALL CLASSES</Box>
                </Typography>
            </m.div>

            <Stack 
                direction={{ xs: 'column', md: 'row' }} 
                alignItems="center" 
                justifyContent="space-between" 
                spacing={3}
            >
                {/* Search Bar */}
                <TextField
                placeholder="Enter Search Terms"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{
                    width: { xs: 1, md: 320 },
                    '& .MuiOutlinedInput-root': {
                    color: COLORS.white,
                    bgcolor: alpha(COLORS.white, 0.05),
                    borderRadius: 50,
                    '& fieldset': { borderColor: alpha(COLORS.white, 0.2) },
                    '&:hover fieldset': { borderColor: COLORS.white },
                    '&.Mui-focused fieldset': { borderColor: COLORS.red },
                    },
                }}
                InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">
                        <Iconify icon="solar:settings-bold-duotone" sx={{ color: COLORS.white }} />
                    </InputAdornment>
                    ),
                    endAdornment: (
                    <InputAdornment position="end">
                        <IconButton size="small">
                        <Iconify icon="eva:search-fill" sx={{ color: COLORS.red }} />
                        </IconButton>
                    </InputAdornment>
                    )
                }}
                />

                {/* Filter Categories */}
                <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', pb: 1, maxWidth: 1 }}>
                <IconButton size="small" sx={{ color: COLORS.white }}>
                    <Iconify icon="eva:arrow-ios-back-fill" />
                </IconButton>
                
                {CATEGORIES.map((cat) => (
                    <Button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    sx={{
                        borderRadius: 0,
                        minWidth: 'auto',
                        px: 2,
                        py: 0.5,
                        color: activeCategory === cat ? COLORS.black : COLORS.white,
                        bgcolor: activeCategory === cat ? '#00FFCC' : 'transparent', // Hijau Tosca aktif
                        border: `1px solid ${activeCategory === cat ? '#00FFCC' : alpha(COLORS.white, 0.2)}`,
                        fontWeight: 'bold',
                        fontSize: '0.75rem',
                        '&:hover': {
                        bgcolor: activeCategory === cat ? '#00FFCC' : alpha(COLORS.white, 0.1)
                        }
                    }}
                    >
                    {cat}
                    </Button>
                ))}

                <IconButton size="small" sx={{ color: COLORS.white }}>
                    <Iconify icon="eva:arrow-ios-forward-fill" />
                </IconButton>
                </Stack>
            </Stack>
            </Stack>

            {/* CLASS GRID */}
            <Grid key={`${activeCategory}-${searchTerm}`} container spacing={3}>
            {filteredClasses.map((item, index) => (
                <Grid key={`${item.title}-${index}`} xs={12} sm={6} md={3}>
                <m.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.04, ease: 'easeOut' }}
                >
                    <Box 
                    sx={{ 
                        position: 'relative', 
                        borderRadius: 1, 
                        overflow: 'hidden', 
                        bgcolor: '#1a1a1a',
                        cursor: 'pointer',
                        '&:hover .class-img': { transform: 'scale(1.1)' },
                        '&:hover .arrow-icon': { color: COLORS.red }
                    }}
                    >
                    {/* Image */}
                    <Box sx={{ overflow: 'hidden', position: 'relative', pt: '65%' }}>
                        <Image
                        src={item.image}
                        alt={item.title}
                        className="class-img"
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

                    {/* Content */}
                    <Box sx={{ p: 2 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.5 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                            {item.title}
                        </Typography>
                        <Iconify icon="solar:arrow-right-up-bold" className="arrow-icon" sx={{ color: '#00FFCC', transition: 'color 0.3s' }} />
                        </Stack>
                        
                        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                        {item.category}
                        </Typography>
                    </Box>
                    </Box>
                </m.div>
                </Grid>
            ))}
            </Grid>

            {/* PAGINATION */}
            <Stack alignItems="center" sx={{ mt: 10 }}>
            <Pagination
                count={4}
                renderItem={(item) => (
                <PaginationItem
                    {...item}
                    // --- FIX: Override variant dan color secara eksplisit ---
                    variant="text" 
                    color="standard"
                    // -------------------------------------------------------
                    sx={{
                    color: COLORS.white,
                    '&.Mui-selected': {
                        bgcolor: '#00FFCC',
                        color: COLORS.black,
                        fontWeight: 'bold',
                        '&:hover': { bgcolor: '#00FFCC' }
                    },
                    }}
                />
                )}
            />
            </Stack>

        </Container>
        </Box>
    );
}
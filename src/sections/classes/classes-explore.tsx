import { useState, useEffect, useMemo } from 'react';
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
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import CircularProgress from '@mui/material/CircularProgress';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';
// supabase
import { supabase } from 'src/utils/supabase';

// ----------------------------------------------------------------------

const COLORS = {
  red: '#D40000',
  black: '#000000',
  white: '#FFFFFF',
};

const ITEMS_PER_PAGE = 8; // Jumlah kelas yang tampil per halaman

export default function ClassesExplore() {
  // --- STATE ---
  const [classesData, setClassesData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filter & Pagination State
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchClasses = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('classes')
        .select('*')
        .order('title', { ascending: true }); // Urutkan berdasarkan abjad
      
      if (!error && data) {
        setClassesData(data);
      } else {
        console.error('Error fetching classes:', error);
      }
      setIsLoading(false);
    };

    fetchClasses();
  }, []);

  // --- DYNAMIC CATEGORIES ---
  // Membuat daftar kategori secara otomatis berdasarkan data yang ada di database
  const CATEGORIES = useMemo(() => {
    const uniqueCategories = Array.from(new Set(classesData.map(item => item.category_filter)));
    return ['ALL', ...uniqueCategories].filter(Boolean); // Filter Boolean mencegah ada kategori null/undefined
  }, [classesData]);

  // --- FILTERING & SEARCHING LOGIC ---
  const filteredClasses = useMemo(() => {
    return classesData.filter((item) => {
      // 1. Cek Kategori
      const matchCategory = activeCategory === 'ALL' || item.category_filter === activeCategory;
      // 2. Cek Search Query
      const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchCategory && matchSearch;
    });
  }, [classesData, activeCategory, searchQuery]);

  // --- PAGINATION LOGIC ---
  const pageCount = Math.ceil(filteredClasses.length / ITEMS_PER_PAGE);
  const paginatedClasses = filteredClasses.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  // Reset page ke 1 jika user mengganti kategori atau mengetik di pencarian
  useEffect(() => {
    setPage(1);
  }, [activeCategory, searchQuery]);

  return (
    <Box sx={{ bgcolor: COLORS.black, py: { xs: 10, md: 15 }, color: COLORS.white, minHeight: '100vh' }}>
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
                    bgcolor: activeCategory === cat ? '#00FFCC' : 'transparent',
                    border: `1px solid ${activeCategory === cat ? '#00FFCC' : alpha(COLORS.white, 0.2)}`,
                    fontWeight: 'bold',
                    fontSize: '0.75rem',
                    flexShrink: 0,
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

        {/* LOADING & CLASS GRID */}
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress color="error" />
          </Box>
        ) : filteredClasses.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography variant="h6" sx={{ color: 'text.secondary' }}>
              Tidak ada kelas yang ditemukan.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {paginatedClasses.map((item, index) => (
              <Grid key={item.id || index} xs={12} sm={6} md={3}>
                {/* Gunakan animasi manual dengan delay agar transisi mulus saat data masuk */}
                <m.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05, ease: 'easeOut' }}
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
                        src={item.image_url} // Diubah dari item.image menjadi item.image_url
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
                        {item.category_full} {/* Diubah dari item.category menjadi item.category_full */}
                      </Typography>
                    </Box>
                  </Box>
                </m.div>
              </Grid>
            ))}
          </Grid>
        )}

        {/* PAGINATION */}
        {!isLoading && pageCount > 1 && (
          <Stack alignItems="center" sx={{ mt: 10 }}>
            <Pagination
              count={pageCount}
              page={page}
              onChange={(event, value) => setPage(value)}
              renderItem={(item) => (
                <PaginationItem
                  {...item}
                  variant="text" 
                  color="standard"
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
        )}

      </Container>
    </Box>
  );
}
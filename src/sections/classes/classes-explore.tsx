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

const RED = '#DF2026';
const BLACK = '#060606';
const RED_DARK = '#A8171C';

const ITEMS_PER_PAGE = 8;

export default function ClassesExplore() {
  const [classesData, setClassesData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchClasses = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('classes')
        .select('*')
        .order('title', { ascending: true });
      
      if (!error && data) {
        setClassesData(data);
      } else {
        console.error('Error fetching classes:', error);
      }
      setIsLoading(false);
    };

    fetchClasses();
  }, []);

  const CATEGORIES = useMemo(() => {
    const uniqueCategories = Array.from(new Set(classesData.map(item => item.category_filter)));
    return ['ALL', ...uniqueCategories].filter(Boolean);
  }, [classesData]);

  const filteredClasses = useMemo(() => {
    return classesData.filter((item) => {
      const matchCategory = activeCategory === 'ALL' || item.category_filter === activeCategory;
      const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [classesData, activeCategory, searchQuery]);

  const pageCount = Math.ceil(filteredClasses.length / ITEMS_PER_PAGE);
  const paginatedClasses = filteredClasses.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setPage(1);
  }, [activeCategory, searchQuery]);

  return (
    <Box sx={{ bgcolor: BLACK, py: { xs: 10, md: 15 }, color: '#fff', minHeight: '100vh', borderTop: `1px solid ${alpha(RED, 0.15)}` }}>
      <Container component={MotionViewport}>
        
        {/* HEADER: TITLE & SEARCH */}
        <Stack spacing={5} sx={{ mb: 8 }}>
          <m.div variants={varFade().inDown}>
             <Stack direction="row" alignItems="center" justifyContent="center" spacing={1.5} sx={{ mb: 2 }}>
              <Box sx={{ width: 28, height: 2, bgcolor: RED }} />
              <Typography sx={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: 4, textTransform: 'uppercase', color: RED, fontFamily: 'monospace' }}>
                Discover
              </Typography>
              <Box sx={{ width: 28, height: 2, bgcolor: RED }} />
            </Stack>
            <Typography variant="h2" sx={{ textAlign: 'center', fontWeight: 800, textTransform: 'uppercase', fontFamily: "'Poppins', sans-serif", letterSpacing: -2, lineHeight: 0.9 }}>
              Explore <br /> <Box component="span" sx={{ color: RED, fontStyle: 'italic' }}>All Classes.</Box>
            </Typography>
          </m.div>

          <Stack direction={{ xs: 'column', md: 'row' }} alignItems="center" justifyContent="space-between" spacing={3}>
            {/* Search Bar */}
            <TextField
              placeholder="ENTER SEARCH TERMS"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                width: { xs: 1, md: 320 },
                '& .MuiOutlinedInput-root': {
                  color: '#fff',
                  bgcolor: '#080808',
                  borderRadius: 0, // Sharp
                  fontFamily: 'monospace',
                  fontSize: '0.8rem',
                  border: `1px solid ${alpha('#fff', 0.1)}`,
                  '& fieldset': { border: 'none' },
                  '&:hover': { borderColor: alpha('#fff', 0.3) },
                  '&.Mui-focused': { borderColor: RED, boxShadow: `0 0 0 1px ${RED}` },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="solar:settings-bold-duotone" sx={{ color: alpha('#fff', 0.4) }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small" sx={{ borderRadius: 0, '&:hover': { bgcolor: alpha(RED, 0.1) } }}>
                      <Iconify icon="eva:search-fill" sx={{ color: RED }} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            {/* Filter Categories */}
            <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', pb: 1, maxWidth: 1 }}>
              <IconButton size="small" sx={{ color: '#fff', borderRadius: 0 }}>
                <Iconify icon="eva:arrow-ios-back-fill" />
              </IconButton>
              
              {CATEGORIES.map((cat) => (
                <Button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  sx={{
                    borderRadius: 0, // Sharp
                    minWidth: 'auto',
                    px: 3,
                    py: 1,
                    color: activeCategory === cat ? '#fff' : alpha('#fff', 0.5),
                    bgcolor: activeCategory === cat ? RED : 'transparent',
                    border: `1px solid ${activeCategory === cat ? RED : alpha('#fff', 0.1)}`,
                    fontWeight: 800,
                    fontSize: '0.7rem',
                    fontFamily: 'monospace',
                    letterSpacing: 1,
                    flexShrink: 0,
                    '&:hover': {
                      bgcolor: activeCategory === cat ? RED : alpha(RED, 0.1),
                      color: '#fff',
                      borderColor: RED
                    }
                  }}
                >
                  {cat.toUpperCase()}
                </Button>
              ))}

              <IconButton size="small" sx={{ color: '#fff', borderRadius: 0 }}>
                <Iconify icon="eva:arrow-ios-forward-fill" />
              </IconButton>
            </Stack>
          </Stack>
        </Stack>

        {/* LOADING & CLASS GRID */}
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress sx={{ color: RED }} />
          </Box>
        ) : filteredClasses.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography variant="h6" sx={{ color: alpha('#fff', 0.4), fontFamily: 'monospace' }}>
              NO CLASSES FOUND.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {paginatedClasses.map((item, index) => (
              <Grid key={item.id || index} xs={12} sm={6} md={3}>
                <m.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05, ease: 'easeOut' }}
                  style={{ height: '100%' }}
                >
                  <Box 
                    sx={{ 
                      position: 'relative', 
                      borderRadius: 0, // Sharp
                      overflow: 'hidden', 
                      bgcolor: '#080808',
                      border: `1px solid ${alpha(RED, 0.15)}`,
                      borderLeft: `3px solid ${RED}`,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': { 
                          transform: 'translateY(-8px)',
                          borderColor: alpha(RED, 0.5),
                          bgcolor: '#0c0c0c'
                      },
                      '&:hover .class-img': { transform: 'scale(1.05)' },
                      '&:hover .arrow-icon': { bgcolor: RED, color: '#fff', borderColor: RED }
                    }}
                  >
                    {/* Image */}
                    <Box sx={{ overflow: 'hidden', position: 'relative', pt: '65%' }}>
                      <Image
                        src={item.image_url} 
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
                      <Box sx={{ position: 'absolute', top: 0, left: 0, width: 1, height: 1, background: `linear-gradient(to bottom, transparent 40%, ${BLACK} 100%)` }} />
                    </Box>

                    {/* Content */}
                    <Box sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="overline" sx={{ color: RED, fontFamily: 'monospace', mb: 0.5, display: 'block', letterSpacing: 2 }}>
                            {item.category_full || item.category_filter}
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 800, textTransform: 'uppercase', mb: 3, lineHeight: 1.1, fontFamily: "'Poppins', sans-serif" }}>
                          {item.title}
                        </Typography>
                      </Box>
                      
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                         <Typography sx={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: 1.5, fontFamily: 'monospace', color: RED, textTransform: 'uppercase' }}>
                            View Detail
                         </Typography>
                         <IconButton
                            className="arrow-icon"
                            size="small"
                            sx={{
                                borderRadius: 0,
                                bgcolor: BLACK,
                                color: alpha('#fff', 0.5),
                                transition: 'all 0.3s ease',
                                border: `1px solid ${alpha('#fff', 0.1)}`,
                            }}
                         >
                            <Iconify icon="solar:arrow-right-up-bold" width={18} />
                         </IconButton>
                      </Stack>
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
                    color: '#fff',
                    borderRadius: 0, // Sharp
                    fontFamily: 'monospace',
                    fontWeight: 800,
                    margin: '0 4px',
                    '&.Mui-selected': {
                      bgcolor: RED,
                      color: '#fff',
                      '&:hover': { bgcolor: RED_DARK }
                    },
                    '&:hover': { bgcolor: alpha(RED, 0.2) }
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
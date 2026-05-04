import { useState, useMemo, useEffect } from 'react';
import { m } from 'framer-motion';
// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress'; // Tambahan untuk loading state
// hooks
import { useResponsive } from 'src/hooks/use-responsive'; // Pastikan path ini benar sesuai strukturmu
// components
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';
// supabase
import { supabase } from 'src/utils/supabase';

// ----------------------------------------------------------------------

const RED = '#DF2026';
const BLACK = '#060606';

// Category Colors (Menggunakan warna dari codebase awal)
const COLORS = {
  mindBody: '#A020F0',
  strength: '#00FF00',
  hiit: '#CCFF00',
  cycling: '#0000FF',
  cardio: '#D40000',
  dance: '#00FFFF',
  white: '#FFFFFF',
};

const CATEGORIES = {
  MIND_BODY: { label: 'MIND AND BODY', color: COLORS.mindBody },
  STRENGTH: { label: 'STRENGTH & MARTIAL ARTS', color: COLORS.strength },
  CARDIO: { label: 'CARDIO & HIIT', color: COLORS.cardio },
  DANCE: { label: 'DANCE', color: COLORS.dance },
  GENERAL: { label: 'GENERAL FITNESS', color: COLORS.white },
};

const DAYS = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

// Deteksi kategori berdasarkan nama kelas
const getClassCategory = (className: string = '') => {
  const name = className.toUpperCase();

  if (name.includes('YOGA') || name.includes('PILATES') || name.includes('MAT PILATES')) return CATEGORIES.MIND_BODY;
  if (name.includes('MUAYTHAI') || name.includes('BOXING') || name.includes('BOXING PAD') || name.includes('BOXING DRILL') || name.includes('PUMP CONDITIONING') || name.includes('STRONG NATION') || name.includes('CORE EXERCISES')) return CATEGORIES.STRENGTH;
  if (name.includes('FITCAMP') || name.includes('FIT CAMP') || name.includes('AEROBIC') || name.includes('AEROBOXING') || name.includes('AERO STEP') || name.includes('POWER STEP') || name.includes('POUNDFIT') || name.includes('HIIT')) return CATEGORIES.CARDIO;
  if (name.includes('ZUMBA') || name.includes('DANCE') || name.includes('BOLLY') || name.includes('CID') || name.includes('TWERKOUT') || name.includes('CARDIO K-POP') || name.includes('URBAN DANCE') || name.includes('BELLY DANCE') || name.includes('STYLE DANCE')) return CATEGORIES.DANCE;

  return CATEGORIES.GENERAL;
};

const inputSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 0, // Sharp edges
    color: 'common.white',
    fontFamily: 'monospace',
    bgcolor: alpha('#fff', 0.03),
    '& fieldset': { borderColor: alpha('#fff', 0.12) },
    '&:hover fieldset': { borderColor: alpha('#fff', 0.25) },
    '&.Mui-focused fieldset': { borderColor: RED },
  },
  '& .MuiInputLabel-root': { color: alpha('#fff', 0.4), fontFamily: 'monospace', fontSize: '0.75rem' },
  '& .MuiInputLabel-root.Mui-focused': { color: RED },
  '& .MuiSelect-icon': { color: alpha('#fff', 0.4) },
};

export default function TimetableSection() {
  const mdUp = useResponsive('up', 'md');
  
  // --- STATE ---
  const [clubs, setClubs] = useState<any[]>([]);
  const [schedules, setSchedules] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [selectedClubId, setSelectedClubId] = useState<string | number>('');
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  // --- FETCH DATA SUPABASE ---
  useEffect(() => {
    const fetchTimetableData = async () => {
      setIsLoading(true);
      
      const [clubsResponse, schedulesResponse] = await Promise.all([
        supabase.from('clubs').select('*'),
        supabase.from('schedules').select(`
          *,
          classes ( title ),
          clubs ( name, club_key )
        `)
      ]);

      if (clubsResponse.data) {
        setClubs(clubsResponse.data);
        if (clubsResponse.data.length > 0) {
          setSelectedClubId(clubsResponse.data[0].id);
        }
      }
      
      if (schedulesResponse.data) {
        setSchedules(schedulesResponse.data);
      }

      setIsLoading(false);
    };

    fetchTimetableData();
  }, []);

  const selectedDayName = DAYS[selectedDayIndex];
  const currentClub = clubs.find((c) => c.id === selectedClubId);

  // --- GROUPING LOGIC ---
  const groupedSchedule = useMemo(() => {
    const filtered = schedules.filter(
      (item) => item.clubs?.club_key === currentClub?.club_key && item.day_of_week === selectedDayName
    );

    const groups = {
      MORNING: { timeSlot: 'MORNING (Classes before 12:00pm)', classes: [] as any[] },
      AFTERNOON: { timeSlot: 'AFTERNOON (12:00pm - 04:00pm)', classes: [] as any[] },
      EVENING: { timeSlot: 'EVENING (Classes from 04:00pm)', classes: [] as any[] },
    };

    filtered.forEach((item) => {
      const timeStr = item.start_time;
      const hour = parseInt(timeStr.split(':')[0], 10);
      const className = item.classes?.title || 'Unknown Class';
      const category = getClassCategory(className);

      const enrichedClass = {
        name: className,
        time: timeStr.substring(0, 5),
        duration: '60 min',
        instructor: item.trainer_name,
        location: currentClub?.name,
        type: category.label,
        color: category.color,
        sortTime: timeStr,
      };

      if (hour < 12) groups.MORNING.classes.push(enrichedClass);
      else if (hour < 16) groups.AFTERNOON.classes.push(enrichedClass);
      else groups.EVENING.classes.push(enrichedClass);
    });

    Object.values(groups).forEach((group) => {
      group.classes.sort((a, b) => a.sortTime.localeCompare(b.sortTime));
    });

    return [groups.MORNING, groups.AFTERNOON, groups.EVENING];
  }, [schedules, currentClub, selectedDayName]);

  return (
    <Box sx={{ bgcolor: BLACK, py: { xs: 10, md: 15 }, color: '#fff', position: 'relative' }}>
      <Container component={MotionViewport}>

        {/* HEADER TITLE */}
        <Box sx={{ textAlign: 'center', mb: 10 }}>
          <m.div variants={varFade().inDown}>
             <Stack direction="row" alignItems="center" justifyContent="center" spacing={1.5} sx={{ mb: 2 }}>
              <Box sx={{ width: 28, height: 2, bgcolor: RED }} />
              <Typography sx={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: 4, textTransform: 'uppercase', color: RED, fontFamily: 'monospace' }}>
                Weekly Planner
              </Typography>
              <Box sx={{ width: 28, height: 2, bgcolor: RED }} />
            </Stack>
            <Typography variant="h2" sx={{ fontWeight: 800, textTransform: 'uppercase', fontFamily: "'Poppins', sans-serif", letterSpacing: -3, lineHeight: 0.9, fontSize: { xs: '2.5rem', md: '4rem' } }}>
              Class <Box component="span" sx={{ color: RED, fontStyle: 'italic', display: 'block' }}>Schedule.</Box>
            </Typography>
          </m.div>
        </Box>

        {/* CONTROLS SECTION */}
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={4} sx={{ mb: 8 }}>
          <m.div variants={varFade().inLeft}>
            <TextField
              select
              label="SELECT CLUB"
              value={selectedClubId}
              onChange={(e) => setSelectedClubId(e.target.value)}
              disabled={isLoading}
              fullWidth={!mdUp}
              sx={{ ...inputSx, minWidth: { xs: '100%', md: 300 } }}
            >
              {clubs.map((club) => (
                <MenuItem key={club.id} value={club.id} sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
                  {club.name.toUpperCase()}
                </MenuItem>
              ))}
            </TextField>
          </m.div>

          <m.div variants={varFade().inRight}>
            <Stack direction="row" alignItems="center" spacing={1}>
                {/* Arrow Kiri - Opsional, bisa dihilangkan jika Stack overflow sudah cukup */}
                {/* <IconButton onClick={() => setSelectedDayIndex((prev) => Math.max(0, prev - 1))} sx={{ color: '#fff', borderRadius: 0 }}>
                    <Iconify icon="eva:arrow-ios-back-fill" />
                </IconButton> */}

                <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', pb: 1 }}>
                {DAYS.map((day, index) => {
                    const isSelected = selectedDayIndex === index;
                    return (
                    <Button
                        key={index}
                        onClick={() => setSelectedDayIndex(index)}
                        sx={{
                        borderRadius: 0, // Sharp edges
                        minWidth: 90,
                        py: 1.5,
                        fontFamily: 'monospace',
                        bgcolor: isSelected ? RED : 'transparent',
                        color: isSelected ? '#fff' : alpha('#fff', 0.4),
                        border: `1px solid ${isSelected ? RED : alpha('#fff', 0.1)}`,
                        '&:hover': { bgcolor: isSelected ? RED : alpha(RED, 0.1), borderColor: RED },
                        }}
                    >
                        <Stack spacing={0}>
                        <Typography variant="caption" sx={{ fontWeight: 800, fontSize: '0.7rem' }}>{day.toUpperCase()}</Typography>
                        <Typography variant="caption" sx={{ fontSize: '0.6rem', opacity: 0.5 }}>VIEW</Typography>
                        </Stack>
                    </Button>
                    );
                })}
                </Stack>

                {/* Arrow Kanan - Opsional */}
                {/* <IconButton onClick={() => setSelectedDayIndex((prev) => Math.min(DAYS.length - 1, prev + 1))} sx={{ color: '#fff', borderRadius: 0 }}>
                    <Iconify icon="eva:arrow-ios-forward-fill" />
                </IconButton> */}
            </Stack>
          </m.div>
        </Stack>

        {/* LEGEND - Sharp boxes */}
        <Stack direction="row" flexWrap="wrap" gap={3} sx={{ mb: 5, justifyContent: 'center' }}>
          {Object.values(CATEGORIES).map((type) => (
            <Stack key={type.label} direction="row" alignItems="center" spacing={1}>
              <Box sx={{ width: 10, height: 10, bgcolor: type.color, borderRadius: 0 }} />
              <Typography sx={{ fontSize: '0.65rem', fontWeight: 800, color: alpha('#fff', 0.5), fontFamily: 'monospace', textTransform: 'uppercase' }}>
                {type.label}
              </Typography>
            </Stack>
          ))}
        </Stack>

        {/* TIMETABLE GRID */}
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress sx={{ color: RED }} />
          </Box>
        ) : (
          <Stack spacing={8}>
            {groupedSchedule.map((section) => (
              <Box key={section.timeSlot}>
                <Typography variant="overline" sx={{ color: RED, fontFamily: 'monospace', letterSpacing: 3, mb: 3, display: 'block', borderBottom: `1px solid ${alpha(RED, 0.2)}`, pb: 1 }}>
                  {section.timeSlot}
                </Typography>

                {section.classes.length === 0 ? (
                  <Typography variant="body2" sx={{ color: alpha('#fff', 0.4), fontStyle: 'italic', fontFamily: 'monospace' }}>
                    No classes scheduled for this time slot.
                  </Typography>
                ) : (
                  <Grid container spacing={2}>
                    {section.classes.map((cls, idx) => (
                      <Grid key={`${cls.name}-${cls.time}-${idx}`} xs={12} sm={6} md={4}>
                         <m.div
                          initial={{ opacity: 0, y: 24 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: idx * 0.05, ease: 'easeOut' }}
                        >
                            <Box
                            sx={{
                                p: 3,
                                bgcolor: '#080808',
                                border: `1px solid ${alpha('#fff', 0.05)}`,
                                borderLeft: `4px solid ${cls.color}`,
                                borderRadius: 0, // Sharp
                                transition: 'all 0.3s',
                                '&:hover': {
                                bgcolor: '#0c0c0c',
                                borderColor: alpha(cls.color, 0.4),
                                transform: 'translateY(-4px)'
                                },
                            }}
                            >
                            <Typography sx={{ color: cls.color, fontSize: '0.65rem', fontWeight: 800, fontFamily: 'monospace', mb: 1, textTransform: 'uppercase' }}>
                                {cls.type}
                            </Typography>
                            <Typography variant="h5" sx={{ fontWeight: 800, fontFamily: "'Poppins', sans-serif", textTransform: 'uppercase', mb: 0.5, lineHeight: 1.1 }}>
                                {cls.name}
                            </Typography>
                            <Typography variant="h4" sx={{ fontWeight: 900, mb: 3, color: alpha('#fff', 0.9), fontFamily: 'monospace' }}>
                                {cls.time}
                            </Typography>

                            <Stack spacing={1.5}>
                                <Stack direction="row" alignItems="center" spacing={1.5} sx={{ color: alpha('#fff', 0.4) }}>
                                    <Iconify icon="solar:clock-circle-bold" width={16} />
                                    <Typography sx={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>{cls.duration}</Typography>
                                </Stack>
                                <Stack direction="row" alignItems="center" spacing={1.5} sx={{ color: alpha('#fff', 0.4) }}>
                                    <Iconify icon="solar:map-point-bold" width={16} />
                                    <Typography sx={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>{cls.location}</Typography>
                                </Stack>
                                <Stack direction="row" alignItems="center" spacing={1.5} sx={{ color: alpha('#fff', 0.4) }}>
                                    <Iconify icon="solar:user-bold" width={16} sx={{ color: RED }} />
                                    <Typography sx={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>COACH {cls.instructor.toUpperCase()}</Typography>
                                </Stack>
                            </Stack>
                            </Box>
                        </m.div>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Box>
            ))}
          </Stack>
        )}
      </Container>
    </Box>
  );
}
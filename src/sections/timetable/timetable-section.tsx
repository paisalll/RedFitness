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
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress'; // Tambahan untuk loading state
// components
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';
// supabase
import { supabase } from 'src/utils/supabase';

// ----------------------------------------------------------------------

const COLORS = {
  red: '#D40000',
  black: '#000000',
  white: '#FFFFFF',
  // Category Colors
  mindBody: '#A020F0', // Purple
  strength: '#00FF00', // Green
  hiit: '#CCFF00',     // Lime
  cycling: '#0000FF',  // Blue
  cardio: '#D40000',   // Red
  dance: '#00FFFF',    // Cyan
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

export default function TimetableSection() {
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
      
      // Fetch Club dan Jadwal secara paralel agar lebih cepat
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
        // Set default pilihan gym ke gym pertama di database
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
    // Filter berdasarkan club_key dan day_of_week dari database
    const filtered = schedules.filter(
      (item) => item.clubs?.club_key === currentClub?.club_key && item.day_of_week === selectedDayName
    );

    const groups = {
      MORNING: { timeSlot: 'MORNING (Classes before 12:00pm)', classes: [] as any[] },
      AFTERNOON: { timeSlot: 'AFTERNOON (12:00pm - 04:00pm)', classes: [] as any[] },
      EVENING: { timeSlot: 'EVENING (Classes from 04:00pm)', classes: [] as any[] },
    };

    filtered.forEach((item) => {
      const timeStr = item.start_time; // format dari DB: "19:30:00"
      const hour = parseInt(timeStr.split(':')[0], 10);
      const className = item.classes?.title || 'Unknown Class';
      const category = getClassCategory(className);

      const enrichedClass = {
        name: className,
        time: timeStr.substring(0, 5), // Ambil "19:30" dari "19:30:00"
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

    // Urutkan kelas berdasarkan jam di masing-masing grup
    Object.values(groups).forEach((group) => {
      group.classes.sort((a, b) => a.sortTime.localeCompare(b.sortTime));
    });

    return [groups.MORNING, groups.AFTERNOON, groups.EVENING];
  }, [schedules, currentClub, selectedDayName]);

  return (
    <Box sx={{ bgcolor: COLORS.black, py: { xs: 10, md: 15 }, color: COLORS.white }}>
      <Container component={MotionViewport}>

        {/* HEADER TITLE */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <m.div variants={varFade().inDown}>
            <Typography variant="h2" sx={{ fontWeight: 900, textTransform: 'uppercase' }}>
              CLASS <Box component="span" sx={{ color: COLORS.red }}>SCHEDULE</Box>
            </Typography>
          </m.div>
        </Box>

        {/* CONTROLS SECTION */}
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'stretch', md: 'center' }}
          spacing={5}
          sx={{ mb: 8 }}
        >
          {/* Club Selector */}
          <m.div variants={varFade().inLeft}>
            <Stack spacing={1}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Iconify icon="solar:settings-bold-duotone" sx={{ color: COLORS.white }} />
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 'bold', textTransform: 'uppercase' }}>
                  Select Club
                </Typography>
              </Stack>
              
              <TextField
                select
                value={selectedClubId}
                onChange={(e) => setSelectedClubId(e.target.value)}
                disabled={isLoading}
                sx={{
                  minWidth: 280,
                  '& .MuiOutlinedInput-root': {
                    color: COLORS.white,
                    bgcolor: alpha(COLORS.white, 0.05),
                    borderRadius: 1,
                    '& fieldset': { borderColor: alpha(COLORS.white, 0.2) },
                    '&:hover fieldset': { borderColor: COLORS.white },
                    '&.Mui-focused fieldset': { borderColor: COLORS.red },
                  },
                  '& .MuiSvgIcon-root': { color: COLORS.white },
                }}
              >
                {clubs.length === 0 && (
                  <MenuItem disabled value="">Loading clubs...</MenuItem>
                )}
                {clubs.map((club) => (
                  <MenuItem key={club.id} value={club.id}>
                    {club.name}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          </m.div>

          {/* Date Navigation (Using Days) */}
          <m.div variants={varFade().inRight}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconButton
                onClick={() => setSelectedDayIndex((prev) => Math.max(0, prev - 1))}
                sx={{ color: COLORS.white }}
              >
                <Iconify icon="eva:arrow-ios-back-fill" />
              </IconButton>

              <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', maxWidth: { xs: 300, md: 'unset' } }}>
                {DAYS.map((day, index) => {
                  const isSelected = selectedDayIndex === index;
                  return (
                    <Button
                      key={index}
                      onClick={() => setSelectedDayIndex(index)}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        minWidth: 80,
                        py: 1.5,
                        borderRadius: 1,
                        bgcolor: isSelected ? COLORS.red : 'transparent',
                        color: COLORS.white,
                        border: `1px solid ${isSelected ? COLORS.red : alpha(COLORS.white, 0.2)}`,
                        '&:hover': {
                          bgcolor: isSelected ? COLORS.red : alpha(COLORS.white, 0.1),
                        },
                      }}
                    >
                      <Typography variant="caption" sx={{ fontWeight: 800, textTransform: 'uppercase' }}>
                        {day}
                      </Typography>
                      <Typography variant="caption" sx={{ opacity: 0.8 }}>JADWAL</Typography>
                    </Button>
                  );
                })}
              </Stack>

              <IconButton
                onClick={() => setSelectedDayIndex((prev) => Math.min(DAYS.length - 1, prev + 1))}
                sx={{ color: COLORS.white }}
              >
                <Iconify icon="eva:arrow-ios-forward-fill" />
              </IconButton>
            </Stack>
          </m.div>
        </Stack>

        {/* LEGEND */}
        <Stack direction="row" flexWrap="wrap" gap={3} sx={{ mb: 8, justifyContent: { xs: 'center', md: 'flex-end' } }}>
          {Object.values(CATEGORIES).map((type) => (
            <Stack key={type.label} direction="row" alignItems="center" spacing={1}>
              <Box sx={{ width: 12, height: 12, borderRadius: 0.5, bgcolor: type.color }} />
              <Typography variant="caption" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                {type.label}
              </Typography>
            </Stack>
          ))}
        </Stack>

        {/* TIMETABLE GRID */}
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress color="error" />
          </Box>
        ) : (
          <Stack spacing={6}>
            {groupedSchedule.map((section) => (
              <Box key={section.timeSlot}>
                <Typography
                  variant="h6"
                  sx={{
                    borderBottom: `1px solid ${alpha(COLORS.white, 0.1)}`,
                    pb: 2,
                    mb: 3,
                    opacity: 0.7,
                  }}
                >
                  {section.timeSlot}
                </Typography>

                {section.classes.length === 0 ? (
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                    No classes scheduled for this time slot.
                  </Typography>
                ) : (
                  <Grid container spacing={3}>
                    {section.classes.map((cls, idx) => (
                      <Grid key={`${cls.name}-${cls.time}-${idx}`} xs={12} sm={6} md={4}>
                        <m.div
                          initial={{ opacity: 0, y: 24 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: idx * 0.05, ease: 'easeOut' }}
                        >
                          <Card
                            sx={{
                              p: 3,
                              bgcolor: alpha(COLORS.white, 0.03),
                              color: COLORS.white,
                              borderRadius: 2,
                              position: 'relative',
                              overflow: 'hidden',
                              borderLeft: `6px solid ${cls.color}`,
                              transition: 'all 0.3s',
                              '&:hover': {
                                bgcolor: alpha(COLORS.white, 0.06),
                                transform: 'translateY(-4px)',
                                boxShadow: `0 8px 24px ${alpha(cls.color, 0.2)}`,
                              },
                            }}
                          >
                            <Typography variant="h6" sx={{ fontWeight: 800, color: cls.color, mb: 1 }}>
                              {cls.name}
                            </Typography>

                            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                              {cls.time}
                            </Typography>

                            <Stack spacing={1}>
                              <Stack direction="row" alignItems="center" spacing={1} sx={{ opacity: 0.7 }}>
                                <Iconify icon="solar:clock-circle-bold" width={16} />
                                <Typography variant="caption">{cls.duration}</Typography>
                              </Stack>
                              <Stack direction="row" alignItems="center" spacing={1} sx={{ opacity: 0.7 }}>
                                <Iconify icon="solar:map-point-bold" width={16} />
                                <Typography variant="caption">{cls.location}</Typography>
                              </Stack>
                              <Stack direction="row" alignItems="center" spacing={1} sx={{ opacity: 0.7 }}>
                                <Iconify icon="solar:user-bold" width={16} />
                                <Typography variant="caption">Coach {cls.instructor}</Typography>
                              </Stack>
                            </Stack>
                          </Card>
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
import { useState } from 'react';
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
// components
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';

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

const CLUBS = ['Artha Gading - Jakarta', 'Grand Indonesia - Jakarta', 'Gandaria City - Jakarta'];

const CLASS_TYPES = [
  { label: 'MIND AND BODY', color: COLORS.mindBody },
  { label: 'STRENGTH AND CONDITIONING', color: COLORS.strength },
  { label: 'HIIT', color: COLORS.hiit },
  { label: 'CYCLING', color: COLORS.cycling },
  { label: 'CARDIO', color: COLORS.cardio },
  { label: 'DANCE', color: COLORS.dance },
];

const DATES = [
  { label: 'TODAY', sub: '15 FEB' },
  { label: 'MON', sub: '16 FEB' },
  { label: 'TUE', sub: '17 FEB' },
  { label: 'WED', sub: '18 FEB' },
  { label: 'THU', sub: '19 FEB' },
];

const SCHEDULE = [
  {
    timeSlot: 'MORNING (Classes from 07:00am)',
    classes: [], // Empty state example
  },
  {
    timeSlot: 'AFTERNOON (Classes from 12:00pm)',
    classes: [
      {
        name: 'BODYPUMP®',
        time: '03:00pm - 04:00pm',
        duration: '60 min',
        instructor: 'Andre Yunes',
        location: 'Artha Gading - Jakarta',
        type: 'STRENGTH AND CONDITIONING',
        color: COLORS.strength,
      },
    ],
  },
  {
    timeSlot: 'EVENING (Classes from 04:00pm)',
    classes: [
      {
        name: 'BODYBALANCE®',
        time: '05:30pm - 06:30pm',
        duration: '60 min',
        instructor: 'Andre Yunes',
        location: 'Artha Gading - Jakarta',
        type: 'MIND AND BODY',
        color: COLORS.mindBody,
      },
      {
        name: 'ZUMBA®',
        time: '07:00pm - 08:00pm',
        duration: '60 min',
        instructor: 'Sarah Jenkins',
        location: 'Artha Gading - Jakarta',
        type: 'DANCE',
        color: COLORS.dance,
      },
    ],
  },
];

export default function TimetableSection() {
  const [selectedClub, setSelectedClub] = useState(CLUBS[0]);
  const [selectedDate, setSelectedDate] = useState(0);

  return (
    <Box sx={{ bgcolor: COLORS.black, py: { xs: 10, md: 15 }, color: COLORS.white }}>
      <Container component={MotionViewport}>
        
        {/* HEADER TITLE */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <m.div variants={varFade().inDown}>
            <Typography variant="h2" sx={{ fontWeight: 900, textTransform: 'uppercase' }}>
              PARTY <Box component="span" sx={{ color: COLORS.red }}>SCHEDULE</Box>
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
                 <Typography variant="caption" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>PREFERRED CLUB</Typography>
              </Stack>
              
              <TextField
                select
                value={selectedClub}
                onChange={(e) => setSelectedClub(e.target.value)}
                variant="outlined"
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
                {CLUBS.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          </m.div>

          {/* Date Navigation */}
          <m.div variants={varFade().inRight}>
             <Stack direction="row" alignItems="center" spacing={1}>
                <IconButton sx={{ color: COLORS.white }}>
                    <Iconify icon="eva:arrow-ios-back-fill" />
                </IconButton>

                <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', maxWidth: { xs: 300, md: 'unset' } }}>
                    {DATES.map((date, index) => {
                        const isSelected = selectedDate === index;
                        return (
                            <Button
                                key={index}
                                onClick={() => setSelectedDate(index)}
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
                                        bgcolor: isSelected ? COLORS.red : alpha(COLORS.white, 0.1)
                                    }
                                }}
                            >
                                <Typography variant="caption" sx={{ fontWeight: 800 }}>{date.label}</Typography>
                                <Typography variant="caption" sx={{ opacity: 0.8 }}>{date.sub}</Typography>
                            </Button>
                        );
                    })}
                </Stack>

                <IconButton sx={{ color: COLORS.white }}>
                    <Iconify icon="eva:arrow-ios-forward-fill" />
                </IconButton>
             </Stack>
          </m.div>
        </Stack>

        {/* LEGEND */}
        <Stack direction="row" flexWrap="wrap" gap={3} sx={{ mb: 8, justifyContent: { xs: 'center', md: 'flex-end' } }}>
            {CLASS_TYPES.map((type) => (
                <Stack key={type.label} direction="row" alignItems="center" spacing={1}>
                    <Box sx={{ width: 12, height: 12, borderRadius: 0.5, bgcolor: type.color }} />
                    <Typography variant="caption" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                        {type.label}
                    </Typography>
                </Stack>
            ))}
        </Stack>

        {/* TIMETABLE GRID */}
        <Stack spacing={6}>
            {SCHEDULE.map((section) => (
                <Box key={section.timeSlot}>
                    <Typography 
                        variant="h6" 
                        sx={{ 
                            borderBottom: `1px solid ${alpha(COLORS.white, 0.1)}`, 
                            pb: 2, 
                            mb: 3, 
                            opacity: 0.7 
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
                                <Grid key={idx} xs={12} sm={6} md={4}>
                                    <m.div variants={varFade().inUp}>
                                        <Card
                                            sx={{
                                                p: 3,
                                                bgcolor: alpha(COLORS.white, 0.03),
                                                color: COLORS.white,
                                                borderRadius: 2,
                                                position: 'relative',
                                                overflow: 'hidden',
                                                borderLeft: `6px solid ${cls.color}`, // Color indicator strip
                                                transition: 'all 0.3s',
                                                '&:hover': {
                                                    bgcolor: alpha(COLORS.white, 0.06),
                                                    transform: 'translateY(-4px)',
                                                    boxShadow: `0 8px 24px ${alpha(cls.color, 0.2)}`
                                                }
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
                                                    <Typography variant="caption">{cls.instructor}</Typography>
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

      </Container>
    </Box>
  );
}
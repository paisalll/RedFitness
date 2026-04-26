import { useState, useMemo } from 'react';
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

const CATEGORIES = {
  MIND_BODY: { label: 'MIND AND BODY', color: COLORS.mindBody },
  STRENGTH: { label: 'STRENGTH & MARTIAL ARTS', color: COLORS.strength },
  CARDIO: { label: 'CARDIO & HIIT', color: COLORS.cardio },
  DANCE: { label: 'DANCE', color: COLORS.dance },
  GENERAL: { label: 'GENERAL FITNESS', color: COLORS.white },
};

const CLUBS = [
  { id: 1, name: 'Red Fitness Taman Palem', clubKey: 'Taman Palem' },
  { id: 2, name: 'Red Fitness Kramat Jati', clubKey: 'Kramat Jati' },
  { id: 3, name: 'Red Fitness Cileungsi', clubKey: 'Cileungsi' },
  { id: 4, name: 'Red Fitness Bogor', clubKey: 'Bogor' },
  { id: 5, name: 'Red Fitness Tambun', clubKey: 'Tambun' },
  { id: 6, name: 'Red Fitness Graha Raya Bintaro', clubKey: 'Graha Raya' },
  { id: 7, name: 'Red Fitness Green Pramuka', clubKey: 'Green Pramuka' },
  { id: 8, name: 'Red Fitness Citra 8', clubKey: 'Citra 8' },
];

// ✅ DATA LENGKAP — diambil dari master Excel (FormatDataRedFitness.xlsx)
const SCHEDULE_RAW = [
  { nama_kelas: 'STYLE DANCE', trainer: 'AGHAM', club: 'Taman Palem', jam: '19:30:00', hari: 'Jumat' },
  { nama_kelas: 'STYLE DANCE', trainer: 'AGHAM', club: 'Taman Palem', jam: '17:30:00', hari: 'Rabu' },
  { nama_kelas: 'MUAYTHAI', trainer: 'AJIE', club: 'Tambun', jam: '18:30:00', hari: 'Senin' },
  { nama_kelas: 'BOXING PAD', trainer: 'AJIE', club: 'Tambun', jam: '19:30:00', hari: 'Rabu' },
  { nama_kelas: 'PILATES BASIC', trainer: 'ANI', club: 'Cileungsi', jam: '08:00:00', hari: 'Senin' },
  { nama_kelas: 'PILATES FLOW', trainer: 'ANI', club: 'Cileungsi', jam: '09:00:00', hari: 'Senin' },
  { nama_kelas: 'AEROBIC', trainer: 'ANGGI', club: 'Bogor', jam: '09:00:00', hari: 'Rabu' },
  { nama_kelas: 'ZUMBA', trainer: 'ANGGI', club: 'Bogor', jam: '09:00:00', hari: 'Rabu' },
  { nama_kelas: 'MAT PILATES', trainer: 'ANGGI', club: 'Bogor', jam: '08:00:00', hari: 'Rabu' },
  { nama_kelas: 'ZUMBA', trainer: 'ANGGI', club: 'Cileungsi', jam: '20:30:00', hari: 'Senin' },
  { nama_kelas: 'CID', trainer: 'ANGGI', club: 'Cileungsi', jam: '19:30:00', hari: 'Selasa' },
  { nama_kelas: 'ZUMBA', trainer: 'ANGGI', club: 'Cileungsi', jam: '18:30:00', hari: 'Selasa' },
  { nama_kelas: 'PILATES BASIC', trainer: 'ANGGI', club: 'Cileungsi', jam: '18:30:00', hari: 'Rabu' },
  { nama_kelas: 'PILATES ABS & GLUTES', trainer: 'ANGGI', club: 'Cileungsi', jam: '19:30:00', hari: 'Rabu' },
  { nama_kelas: 'ZUMBA', trainer: 'ANGGI', club: 'Cileungsi', jam: '19:30:00', hari: 'Jumat' },
  { nama_kelas: 'ZUMBA', trainer: 'ANGGI', club: 'Tambun', jam: '09:00:00', hari: 'Sabtu' },
  { nama_kelas: 'MAT PILATES', trainer: 'ANGGI', club: 'Tambun', jam: '10:00:00', hari: 'Sabtu' },
  { nama_kelas: 'BELLY DANCE', trainer: 'ANJANY', club: 'Tambun', jam: '09:00:00', hari: 'Senin' },
  { nama_kelas: 'ZUMBA', trainer: 'ANTY', club: 'Tambun', jam: '17:30:00', hari: 'Selasa' },
  { nama_kelas: 'YIN YOGA', trainer: 'ANTHEA', club: 'Taman Palem', jam: '18:30:00', hari: 'Selasa' },
  { nama_kelas: 'GENTLE YOGA', trainer: 'ANTHEA', club: 'Taman Palem', jam: '19:30:00', hari: 'Rabu' },
  { nama_kelas: 'MAT PILATES', trainer: 'ANTHEA', club: 'Taman Palem', jam: '08:00:00', hari: 'Rabu' },
  { nama_kelas: 'YIN YOGA', trainer: 'ANTHEA', club: 'Taman Palem', jam: '08:00:00', hari: 'Kamis' },
  { nama_kelas: 'STRONG NATION', trainer: 'ASTRI', club: 'Cileungsi', jam: '08:00:00', hari: 'Senin' },
  { nama_kelas: 'ZUMBA', trainer: 'AYAS', club: 'Taman Palem', jam: '15:00:00', hari: 'Sabtu' },
  { nama_kelas: 'AEROBOXING', trainer: 'CITRA', club: 'Bogor', jam: '18:30:00', hari: 'Kamis' },
  { nama_kelas: 'YOGA', trainer: 'DANN', club: 'Tambun', jam: '08:00:00', hari: 'Senin' },
  { nama_kelas: 'FIT CAMP', trainer: 'EAS', club: 'Tambun', jam: '08:00:00', hari: 'Selasa' },
  { nama_kelas: 'BOXING DRILL', trainer: 'EAS', club: 'Tambun', jam: '09:00:00', hari: 'Selasa' },
  { nama_kelas: 'MUAYTHAI', trainer: 'DENNY', club: 'Kramat Jati', jam: '17:00:00', hari: 'Sabtu' },
  { nama_kelas: 'ZUMBA', trainer: 'DOMINIC', club: 'Taman Palem', jam: '09:00:00', hari: 'Senin' },
  { nama_kelas: 'PILATES BASIC', trainer: 'DWI', club: 'Cileungsi', jam: '18:30:00', hari: 'Kamis' },
  { nama_kelas: 'PILATES FLOW', trainer: 'DWI', club: 'Cileungsi', jam: '19:30:00', hari: 'Kamis' },
  { nama_kelas: 'ZUMBA', trainer: 'EGA', club: 'Bogor', jam: '18:30:00', hari: 'Senin' },
  { nama_kelas: 'URBAN DANCE', trainer: 'EGA', club: 'Bogor', jam: '19:30:00', hari: 'Senin' },
  { nama_kelas: 'URBAN DANCE', trainer: 'EGA', club: 'Cileungsi', jam: '09:00:00', hari: 'Rabu' },
  { nama_kelas: 'ZUMBA', trainer: 'EGA', club: 'Cileungsi', jam: '08:00:00', hari: 'Rabu' },
  { nama_kelas: 'ZUMBA', trainer: 'EGA', club: 'Cileungsi', jam: '17:30:00', hari: 'Kamis' },
  { nama_kelas: 'URBAN DANCE', trainer: 'EGA', club: 'Cileungsi', jam: '19:30:00', hari: 'Kamis' },
  { nama_kelas: 'URBAN DANCE', trainer: 'EGA', club: 'Kramat Jati', jam: '19:30:00', hari: 'Selasa' },
  { nama_kelas: 'ZUMBA', trainer: 'EGA', club: 'Kramat Jati', jam: '18:30:00', hari: 'Selasa' },
  { nama_kelas: 'URBAN DANCE', trainer: 'EGA', club: 'Kramat Jati', jam: '09:00:00', hari: 'Sabtu' },
  { nama_kelas: 'ZUMBA', trainer: 'EGA', club: 'Kramat Jati', jam: '08:00:00', hari: 'Sabtu' },
  { nama_kelas: 'ZUMBA', trainer: 'EGA', club: 'Tambun', jam: '08:00:00', hari: 'Kamis' },
  { nama_kelas: 'URBAN DANCE', trainer: 'EGA', club: 'Tambun', jam: '09:00:00', hari: 'Kamis' },
  { nama_kelas: 'ZUMBA', trainer: 'EGA', club: 'Tambun', jam: '19:30:00', hari: 'Jumat' },
  { nama_kelas: 'URBAN DANCE', trainer: 'EGA', club: 'Tambun', jam: '19:30:00', hari: 'Jumat' },
  { nama_kelas: 'BASIC YOGA', trainer: 'ENDAH', club: 'Bogor', jam: '16:00:00', hari: 'Sabtu' },
  { nama_kelas: 'POWER YOGA', trainer: 'ENDAH', club: 'Bogor', jam: '17:00:00', hari: 'Sabtu' },
  { nama_kelas: 'GENTLE YOGA', trainer: 'ENDAH', club: 'Cileungsi', jam: '08:00:00', hari: 'Kamis' },
  { nama_kelas: 'VINYASA YOGA', trainer: 'ENDAH', club: 'Cileungsi', jam: '18:30:00', hari: 'Kamis' },
  { nama_kelas: 'GENTLE YOGA', trainer: 'ENDAH', club: 'Kramat Jati', jam: '08:00:00', hari: 'Selasa' },
  { nama_kelas: 'ZUMBA', trainer: 'EPISA', club: 'Taman Palem', jam: '19:30:00', hari: 'Selasa' },
  { nama_kelas: 'PILATES BASIC', trainer: 'ERVIN', club: 'Cileungsi', jam: '08:00:00', hari: 'Jumat' },
  { nama_kelas: 'PILATES FLOW', trainer: 'ERVIN', club: 'Cileungsi', jam: '09:00:00', hari: 'Jumat' },
  { nama_kelas: 'STRONG NATION', trainer: 'FENNY', club: 'Bogor', jam: '19:30:00', hari: 'Rabu' },
  { nama_kelas: 'STRONG NATION', trainer: 'FENNY', club: 'Bogor', jam: '18:30:00', hari: 'Rabu' },
  { nama_kelas: 'AEROBOXING', trainer: 'FRANKY', club: 'Cileungsi', jam: '09:00:00', hari: 'Jumat' },
  { nama_kelas: 'CID', trainer: 'FRANKY', club: 'Tambun', jam: '19:30:00', hari: 'Kamis' },
  { nama_kelas: 'AEROBIC', trainer: 'GANDI', club: 'Taman Palem', jam: '18:30:00', hari: 'Kamis' },
  { nama_kelas: 'HATHA YOGA', trainer: 'GINA', club: 'Bogor', jam: '09:00:00', hari: 'Jumat' },
  { nama_kelas: 'GENTLE YOGA', trainer: 'GINA', club: 'Bogor', jam: '10:00:00', hari: 'Jumat' },
  { nama_kelas: 'AEROBIC', trainer: 'HENI', club: 'Taman Palem', jam: '09:00:00', hari: 'Kamis' },
  { nama_kelas: 'POWER STEP', trainer: 'HERY', club: 'Kramat Jati', jam: '17:30:00', hari: 'Kamis' },
  { nama_kelas: 'MAT PILATES', trainer: 'INOY', club: 'Tambun', jam: '08:00:00', hari: 'Rabu' },
  { nama_kelas: 'MAT PILATES', trainer: 'IRMA', club: 'Cileungsi', jam: '08:00:00', hari: 'Jumat' },
  { nama_kelas: 'PILATES', trainer: 'IRMA', club: 'Cileungsi', jam: '10:00:00', hari: 'Sabtu' },
  { nama_kelas: 'POUNDFIT', trainer: 'IVY', club: 'Taman Palem', jam: '08:00:00', hari: 'Senin' },
  { nama_kelas: 'BOLLY X', trainer: 'JESSY', club: 'Kramat Jati', jam: '17:30:00', hari: 'Senin' },
  { nama_kelas: 'CARDIO DANCE', trainer: 'JESSY', club: 'Tambun', jam: '19:30:00', hari: 'Kamis' },
  { nama_kelas: 'MODERN DANCE', trainer: 'JOEL', club: 'Taman Palem', jam: '17:30:00', hari: 'Senin' },
  { nama_kelas: 'CARDIO DANCE', trainer: 'JOEL', club: 'Taman Palem', jam: '17:30:00', hari: 'Kamis' },
  { nama_kelas: 'ZUMBA', trainer: 'KIFAN', club: 'Cileungsi', jam: '09:00:00', hari: 'Senin' },
  { nama_kelas: 'PUMP CONDITIONING', trainer: 'LUKI', club: 'Taman Palem', jam: '08:00:00', hari: 'Selasa' },
  { nama_kelas: 'AERO STEP', trainer: 'LUKI', club: 'Taman Palem', jam: '09:00:00', hari: 'Selasa' },
  { nama_kelas: 'POUNDFIT', trainer: 'LARAS', club: 'Kramat Jati', jam: '19:30:00', hari: 'Jumat' },
  { nama_kelas: 'POUNDFIT', trainer: 'KIKA', club: 'Cileungsi', jam: '19:30:00', hari: 'Rabu' },
  { nama_kelas: 'CID', trainer: 'MIA', club: 'Tambun', jam: '18:30:00', hari: 'Senin' },
  { nama_kelas: 'TWERKOUT', trainer: 'MEY', club: 'Kramat Jati', jam: '17:30:00', hari: 'Jumat' },
  { nama_kelas: 'CARDIO K-POP', trainer: 'MEGA D', club: 'Kramat Jati', jam: '19:30:00', hari: 'Kamis' },
  { nama_kelas: 'BELLY DANCE', trainer: 'NOVITA', club: 'Cileungsi', jam: '18:30:00', hari: 'Jumat' },
  { nama_kelas: 'BELLY DANCE', trainer: 'NOVITA', club: 'Kramat Jati', jam: '17:30:00', hari: 'Rabu' },
  { nama_kelas: 'PILATES FLOW', trainer: 'OCTA', club: 'Cileungsi', jam: '09:00:00', hari: 'Sabtu' },
  { nama_kelas: 'PILATES BASIC', trainer: 'OCTA', club: 'Cileungsi', jam: '08:00:00', hari: 'Sabtu' },
  { nama_kelas: 'ZUMBA', trainer: 'PRIMA', club: 'Taman Palem', jam: '18:30:00', hari: 'Rabu' },
  { nama_kelas: 'POUNDFIT', trainer: 'RARA', club: 'Tambun', jam: '09:00:00', hari: 'Jumat' },
  { nama_kelas: 'ZUMBA', trainer: 'RENNY', club: 'Kramat Jati', jam: '18:30:00', hari: 'Kamis' },
  { nama_kelas: 'ZUMBA', trainer: 'RIA', club: 'Kramat Jati', jam: '09:00:00', hari: 'Senin' },
  { nama_kelas: 'FIT CAMP', trainer: 'RIKA', club: 'Tambun', jam: '09:00:00', hari: 'Rabu' },
  { nama_kelas: 'HATHA YOGA', trainer: 'RIN', club: 'Taman Palem', jam: '09:00:00', hari: 'Rabu' },
  { nama_kelas: 'ZUMBA', trainer: 'RINA', club: 'Taman Palem', jam: '19:30:00', hari: 'Senin' },
  { nama_kelas: 'ZUMBA', trainer: 'RUDI', club: 'Kramat Jati', jam: '09:00:00', hari: 'Selasa' },
  { nama_kelas: 'ZUMBA', trainer: 'RUDI', club: 'Kramat Jati', jam: '18:30:00', hari: 'Rabu' },
  { nama_kelas: 'ZUMBA', trainer: 'RUDI', club: 'Taman Palem', jam: '07:00:00', hari: 'Senin' },
  { nama_kelas: 'ZUMBA', trainer: 'RUDI', club: 'Taman Palem', jam: '19:30:00', hari: 'Kamis' },
  { nama_kelas: 'ZUMBA', trainer: 'RUDI', club: 'Taman Palem', jam: '08:00:00', hari: 'Jumat' },
  { nama_kelas: 'ZUMBA', trainer: 'RUMI', club: 'Bogor', jam: '19:30:00', hari: 'Rabu' },
  { nama_kelas: 'ZUMBA', trainer: 'RUMI', club: 'Tambun', jam: '19:30:00', hari: 'Selasa' },
  { nama_kelas: 'PILATES BASIC', trainer: 'SARI', club: 'Cileungsi', jam: '08:00:00', hari: 'Selasa' },
  { nama_kelas: 'PILATES ABS & GLUTES', trainer: 'SARI', club: 'Cileungsi', jam: '09:00:00', hari: 'Selasa' },
  { nama_kelas: 'PILATES BASIC', trainer: 'SHERLY', club: 'Cileungsi', jam: '18:30:00', hari: 'Senin' },
  { nama_kelas: 'PILATES ABS & GLUTES', trainer: 'SHERLY', club: 'Cileungsi', jam: '19:30:00', hari: 'Senin' },
  { nama_kelas: 'PILATES FLOW', trainer: 'SHERLY', club: 'Cileungsi', jam: '08:00:00', hari: 'Rabu' },
  { nama_kelas: 'PILATES ABS & GLUTES', trainer: 'SHERLY', club: 'Cileungsi', jam: '09:00:00', hari: 'Rabu' },
  { nama_kelas: 'AEROBOXING', trainer: 'SHIERLY', club: 'Taman Palem', jam: '18:30:00', hari: 'Senin' },
  { nama_kelas: 'FIT CAMP', trainer: 'VIAR', club: 'Bogor', jam: '08:00:00', hari: 'Kamis' },
  { nama_kelas: 'MUAYTHAI', trainer: 'VIAR', club: 'Bogor', jam: '09:00:00', hari: 'Kamis' },
  { nama_kelas: 'MUAYTHAI', trainer: 'VIAR', club: 'Bogor', jam: '19:30:00', hari: 'Jumat' },
  { nama_kelas: 'FITCAMP', trainer: 'VIAR', club: 'Bogor', jam: '18:30:00', hari: 'Jumat' },
  { nama_kelas: 'MUAYTHAI', trainer: 'VIAR', club: 'Cileungsi', jam: '17:30:00', hari: 'Senin' },
  { nama_kelas: 'FITCAMP', trainer: 'VIAR', club: 'Cileungsi', jam: '18:30:00', hari: 'Senin' },
  { nama_kelas: 'MUAYTHAI', trainer: 'VIAR', club: 'Kramat Jati', jam: '19:30:00', hari: 'Rabu' },
  { nama_kelas: 'BOLLY X', trainer: 'VIDHIA', club: 'Taman Palem', jam: '08:00:00', hari: 'Rabu' },
  { nama_kelas: 'AERO STEP', trainer: 'WANTO', club: 'Taman Palem', jam: '09:00:00', hari: 'Jumat' },
  { nama_kelas: 'ZUMBA', trainer: 'WICI', club: 'Cileungsi', jam: '09:00:00', hari: 'Selasa' },
  { nama_kelas: 'CID', trainer: 'WICI', club: 'Cileungsi', jam: '09:00:00', hari: 'Sabtu' },
  { nama_kelas: 'CID', trainer: 'WICI', club: 'Kramat Jati', jam: '08:00:00', hari: 'Senin' },
  { nama_kelas: 'CID', trainer: 'WICI', club: 'Kramat Jati', jam: '08:00:00', hari: 'Kamis' },
  { nama_kelas: 'BASIC YOGA', trainer: 'WINA', club: 'Taman Palem', jam: '20:30:00', hari: 'Jumat' },
  { nama_kelas: 'ZUMBA', trainer: 'YANI', club: 'Cileungsi', jam: '09:00:00', hari: 'Kamis' },
  { nama_kelas: 'ZUMBA', trainer: 'YANI', club: 'Kramat Jati', jam: '18:30:00', hari: 'Jumat' },
  { nama_kelas: 'FLOW YOGA', trainer: 'YUDI', club: 'Bogor', jam: '18:30:00', hari: 'Kamis' },
  { nama_kelas: 'FIT CAMP', trainer: 'YUDI', club: 'Bogor', jam: '19:30:00', hari: 'Kamis' },
  { nama_kelas: 'FIT CAMP', trainer: 'YUDI', club: 'Cileungsi', jam: '16:00:00', hari: 'Sabtu' },
  { nama_kelas: 'PILATES', trainer: 'YUDI', club: 'Cileungsi', jam: '17:00:00', hari: 'Sabtu' },
  { nama_kelas: 'MAT PILATES', trainer: 'YUDI', club: 'Cileungsi', jam: '17:30:00', hari: 'Rabu' },
  { nama_kelas: 'FITCAMP', trainer: 'YUDI', club: 'Cileungsi', jam: '18:30:00', hari: 'Rabu' },
  { nama_kelas: 'FLOW YOGA', trainer: 'YUDI', club: 'Kramat Jati', jam: '18:30:00', hari: 'Senin' },
  { nama_kelas: 'FIT CAMP', trainer: 'YUDI', club: 'Kramat Jati', jam: '19:30:00', hari: 'Senin' },
  { nama_kelas: 'FIT CAMP', trainer: 'YUDI', club: 'Kramat Jati', jam: '09:00:00', hari: 'Rabu' },
  { nama_kelas: 'FLOW YOGA', trainer: 'YUDI', club: 'Kramat Jati', jam: '08:00:00', hari: 'Rabu' },
  { nama_kelas: 'MAT PILATES', trainer: 'YUDI', club: 'Kramat Jati', jam: '08:00:00', hari: 'Jumat' },
  { nama_kelas: 'FIT CAMP', trainer: 'YUDI', club: 'Kramat Jati', jam: '09:00:00', hari: 'Jumat' },
];

const DAYS = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

// Deteksi kategori berdasarkan nama kelas — diperluas sesuai data master
const getClassCategory = (className: string) => {
  const name = className.toUpperCase();

  // MIND & BODY — yoga & pilates
  if (
    name.includes('YOGA') ||
    name.includes('PILATES') ||
    name.includes('MAT PILATES')
  ) return CATEGORIES.MIND_BODY;

  // STRENGTH & MARTIAL ARTS
  if (
    name.includes('MUAYTHAI') ||
    name.includes('BOXING') ||
    name.includes('BOXING PAD') ||
    name.includes('BOXING DRILL') ||
    name.includes('PUMP CONDITIONING') ||
    name.includes('STRONG NATION') ||
    name.includes('CORE EXERCISES')
  ) return CATEGORIES.STRENGTH;

  // CARDIO & HIIT
  if (
    name.includes('FITCAMP') ||
    name.includes('FIT CAMP') ||
    name.includes('AEROBIC') ||
    name.includes('AEROBOXING') ||
    name.includes('AERO STEP') ||
    name.includes('POWER STEP') ||
    name.includes('POUNDFIT') ||
    name.includes('HIIT')
  ) return CATEGORIES.CARDIO;

  // DANCE
  if (
    name.includes('ZUMBA') ||
    name.includes('DANCE') ||
    name.includes('BOLLY') ||
    name.includes('CID') ||
    name.includes('TWERKOUT') ||
    name.includes('CARDIO K-POP') ||
    name.includes('URBAN DANCE') ||
    name.includes('BELLY DANCE') ||
    name.includes('STYLE DANCE')
  ) return CATEGORIES.DANCE;

  return CATEGORIES.GENERAL;
};

export default function TimetableSection() {
  const [selectedClubId, setSelectedClubId] = useState(CLUBS[0].id);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  const selectedDayName = DAYS[selectedDayIndex];
  const currentClub = CLUBS.find((c) => c.id === selectedClubId);

  // Proses data sesuai klub dan hari yang dipilih, lalu kelompokkan berdasarkan waktu
  const groupedSchedule = useMemo(() => {
    const filtered = SCHEDULE_RAW.filter(
      (item) => item.club === currentClub?.clubKey && item.hari === selectedDayName
    );

    const groups = {
      MORNING: { timeSlot: 'MORNING (Classes before 12:00pm)', classes: [] as any[] },
      AFTERNOON: { timeSlot: 'AFTERNOON (12:00pm - 04:00pm)', classes: [] as any[] },
      EVENING: { timeSlot: 'EVENING (Classes from 04:00pm)', classes: [] as any[] },
    };

    filtered.forEach((item) => {
      const hour = parseInt(item.jam.split(':')[0], 10);
      const category = getClassCategory(item.nama_kelas);

      const enrichedClass = {
        name: item.nama_kelas,
        time: item.jam.substring(0, 5),
        duration: '60 min',
        instructor: item.trainer,
        location: currentClub?.name,
        type: category.label,
        color: category.color,
        sortTime: item.jam,
      };

      if (hour < 12) groups.MORNING.classes.push(enrichedClass);
      else if (hour < 16) groups.AFTERNOON.classes.push(enrichedClass);
      else groups.EVENING.classes.push(enrichedClass);
    });

    Object.values(groups).forEach((group) => {
      group.classes.sort((a, b) => a.sortTime.localeCompare(b.sortTime));
    });

    return [groups.MORNING, groups.AFTERNOON, groups.EVENING];
  }, [currentClub, selectedDayName]);

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
                onChange={(e) => setSelectedClubId(Number(e.target.value))}
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
                {CLUBS.map((club) => (
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

      </Container>
    </Box>
  );
}
// src/pages/join/select-club.tsx

import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
// components
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

// ----------------------------------------------------------------------

const COLORS = {
  red: '#D40000',
  black: '#000000',
  white: '#FFFFFF',
  cyan: '#00FFCC',
};

const STEPS = [
  { label: 'YOUR CLUB', icon: 'solar:map-point-bold', active: true },
  { label: 'YOUR PLAN', icon: 'solar:clipboard-list-bold', active: false },
  { label: 'YOUR DETAILS', icon: 'solar:user-id-bold', active: false },
  { label: 'PAYMENT', icon: 'solar:card-bold', active: false },
];

const CLUBS = [
  { id: 1, name: 'RF Artha Gading - Jakarta', address: 'Jl. Artha Gading Selatan No.1 3rd Floor, Jakarta Utara' },
  { id: 2, name: 'RF Botani - Bogor', address: 'Botani Square 1st, 2nd & 3rd Floor, Kota Bogor' },
  { id: 3, name: 'RF Central Park - Jakarta', address: 'Central Park, 3rd Floor, Jakarta Barat' },
  { id: 4, name: 'RF Food Centrum - Jakarta', address: 'Food Centrum, Level 2, Jakarta Utara' },
  { id: 5, name: 'RF FX - Jakarta', address: 'FX Sudirman, f7, Jakarta Pusat' },
];

export default function SelectClubView() {
    const router = useRouter();
    
    const [search, setSearch] = useState('');
    const [selectedClub, setSelectedClub] = useState<number | null>(null);

    // Filter klub berdasarkan pencarian
    const filteredClubs = CLUBS.filter((club) => 
        club.name.toLowerCase().includes(search.toLowerCase()) || 
        club.address.toLowerCase().includes(search.toLowerCase())
    );

    const handleSelectClub = (id: number) => {
        setSelectedClub(id === selectedClub ? null : id); // Toggle select/deselect
    };

    const handleNext = () => {
        router.push(paths.join.plan);
    };

  return (
    <Box sx={{ pb: 20 }}> {/* Padding bawah ekstra untuk tombol sticky */}
        <Container component={MotionViewport} sx={{ py: 10, color: COLORS.white }}>
        
        {/* 1. STEPPER WIZARD */}
        <Stack 
            direction="row" 
            justifyContent="center" 
            alignItems="flex-start" 
            spacing={{ xs: 2, md: 8 }} 
            sx={{ mb: 10, position: 'relative' }}
        >
            <Box 
                sx={{ 
                    position: 'absolute', 
                    top: 24, 
                    left: '10%', 
                    right: '10%', 
                    height: 2, 
                    bgcolor: alpha(COLORS.white, 0.2), 
                    zIndex: 0 
                }} 
            />

            {STEPS.map((step, index) => (
            <Stack key={index} alignItems="center" sx={{ zIndex: 1, position: 'relative' }}>
                <Box
                sx={{
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    bgcolor: step.active ? COLORS.red : COLORS.black,
                    border: `2px solid ${step.active ? COLORS.red : alpha(COLORS.white, 0.3)}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 1,
                    boxShadow: step.active ? `0 0 20px ${COLORS.red}` : 'none',
                }}
                >
                <Iconify 
                    icon={step.icon} 
                    width={24} 
                    color={step.active ? COLORS.white : alpha(COLORS.white, 0.5)} 
                />
                </Box>
                <Typography 
                    variant="caption" 
                    sx={{ 
                        fontWeight: 'bold', 
                        color: step.active ? COLORS.white : alpha(COLORS.white, 0.5) 
                    }}
                >
                {step.label}
                </Typography>
            </Stack>
            ))}
        </Stack>

        {/* 2. TITLE */}
        <m.div variants={varFade().inUp}>
            <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 900, mb: 2, textTransform: 'uppercase' }}>
            1 - SELECT YOUR <Box component="span" sx={{ color: COLORS.red }}>PREFERRED CLUB</Box>
            </Typography>
            
            {/* Indikator Pilihan (Jika ada yang dipilih) */}
            <Typography variant="h6" sx={{ textAlign: 'center', mb: 8, color: COLORS.cyan, minHeight: 28 }}>
                {selectedClub 
                    ? `Selected: ${CLUBS.find(c => c.id === selectedClub)?.name}` 
                    : 'Please select a club to continue'}
            </Typography>
        </m.div>

        {/* 3. CLUB SELECTION BOX */}
        <m.div variants={varFade().inUp}>
            <Box 
                sx={{ 
                    maxWidth: 800, 
                    mx: 'auto',
                    border: `1px solid ${alpha(COLORS.white, 0.2)}`,
                    borderRadius: 2,
                    p: 3,
                    bgcolor: alpha(COLORS.white, 0.02)
                }}
            >
                <TextField
                    fullWidth
                    placeholder="Enter a location..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{
                        mb: 4,
                        '& .MuiOutlinedInput-root': {
                            color: COLORS.white,
                            '& fieldset': { borderColor: alpha(COLORS.white, 0.3) },
                            '&:hover fieldset': { borderColor: COLORS.white },
                            '&.Mui-focused fieldset': { borderColor: COLORS.red },
                        }
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Iconify icon="eva:search-fill" sx={{ color: alpha(COLORS.white, 0.5) }} />
                            </InputAdornment>
                        )
                    }}
                />

                <Stack spacing={2} sx={{ maxHeight: 500, overflowY: 'auto', pr: 1 }}>
                    {filteredClubs.map((club) => {
                        const isSelected = selectedClub === club.id;

                        return (
                            <Stack 
                                key={club.id}
                                direction={{ xs: 'column', sm: 'row' }}
                                alignItems="center"
                                justifyContent="space-between"
                                spacing={2}
                                onClick={() => handleSelectClub(club.id)}
                                sx={{
                                    p: 3,
                                    borderRadius: 1,
                                    cursor: 'pointer',
                                    border: `1px solid ${isSelected ? COLORS.red : alpha(COLORS.white, 0.1)}`,
                                    bgcolor: isSelected ? alpha(COLORS.red, 0.1) : 'transparent', // Highlight Merah jika dipilih
                                    transition: 'all 0.3s',
                                    '&:hover': {
                                        bgcolor: isSelected ? alpha(COLORS.red, 0.15) : alpha(COLORS.white, 0.05),
                                        borderColor: COLORS.red
                                    }
                                }}
                            >
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: isSelected ? COLORS.red : COLORS.white }}>
                                        {club.name}
                                    </Typography>
                                    <Typography variant="body2" sx={{ opacity: 0.7 }}>{club.address}</Typography>
                                </Box>

                                <Button 
                                    variant="contained" 
                                    startIcon={isSelected ? <Iconify icon="solar:check-circle-bold" /> : null}
                                    sx={{ 
                                        bgcolor: isSelected ? COLORS.red : COLORS.cyan, 
                                        color: isSelected ? COLORS.white : COLORS.black,
                                        fontWeight: 'bold',
                                        borderRadius: 50,
                                        minWidth: 120,
                                        px: 3,
                                        boxShadow: isSelected ? `0 8px 16px ${alpha(COLORS.red, 0.24)}` : 'none',
                                        '&:hover': { 
                                            bgcolor: isSelected ? alpha(COLORS.red, 0.8) : alpha(COLORS.cyan, 0.8) 
                                        }
                                    }}
                                >
                                    {isSelected ? 'SELECTED' : 'SELECT'}
                                </Button>
                            </Stack>
                        );
                    })}
                </Stack>
            </Box>
        </m.div>

        {/* 4. STICKY NEXT BUTTON */}
        <AnimatePresence>
            {selectedClub && (
                <m.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    style={{
                        position: 'fixed',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        zIndex: 99,
                    }}
                >
                    <Box
                        sx={{
                            bgcolor: alpha(COLORS.black, 0.9), // Glass effect background
                            backdropFilter: 'blur(10px)',
                            borderTop: `1px solid ${alpha(COLORS.white, 0.1)}`,
                            py: 3,
                            px: 2,
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    >
                        <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Button
                                size="large"
                                variant="contained"
                                onClick={handleNext}
                                endIcon={<Iconify icon="solar:arrow-right-bold" />}
                                sx={{
                                    bgcolor: COLORS.cyan,
                                    color: COLORS.black,
                                    borderRadius: 50,
                                    px: 6,
                                    py: 1.5,
                                    fontSize: '1.1rem',
                                    fontWeight: '900',
                                    '&:hover': {
                                        bgcolor: alpha(COLORS.cyan, 0.8),
                                        transform: 'scale(1.05)'
                                    },
                                    transition: 'all 0.3s'
                                }}
                            >
                                NEXT
                            </Button>
                        </Container>
                    </Box>
                </m.div>
            )}
        </AnimatePresence>

        </Container>
    </Box>
  );
}
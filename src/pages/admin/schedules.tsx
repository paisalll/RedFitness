import { useState } from 'react';
import {
  Box, Typography, Button, Stack, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, IconButton, Dialog,
  DialogTitle, DialogContent, DialogActions, TextField, CircularProgress,
  FormControl, InputLabel, Select, MenuItem,
} from '@mui/material';
import Iconify from 'src/components/iconify';
import { supabase } from 'src/utils/supabase';
import { useSchedules, useClubOptions, useClassOptions, mutate, KEYS } from 'src/api/admin';

const DAYS = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

const inputDarkSx = {
  '& .MuiOutlinedInput-root': {
    color: '#fff',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.12)' },
    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
    '&.Mui-focused fieldset': { borderColor: '#DF2026' },
  },
  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.4)' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#DF2026' },
  '& .MuiSvgIcon-root': { color: 'rgba(255,255,255,0.4)' },
};

export default function AdminSchedulesPage() {
  const { schedules: data, isLoading: loading } = useSchedules();
  const { clubOptions } = useClubOptions();
  const { classOptions } = useClassOptions();
  const [openDialog, setOpenDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = { ...formData };
      delete payload.clubs;
      delete payload.classes;
      if (isEdit) {
        const { error } = await supabase.from('schedules').update(payload).eq('id', payload.id);
        if (error) throw error;
      } else {
        delete payload.id;
        const { error } = await supabase.from('schedules').insert([payload]);
        if (error) throw error;
      }
      setOpenDialog(false);
      mutate(KEYS.schedules);
      mutate(KEYS.counts);
    } catch (err: any) {
      alert('Error: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: any) => {
    if (!window.confirm('Delete this schedule?')) return;
    await supabase.from('schedules').delete().eq('id', id);
    mutate(KEYS.schedules);
    mutate(KEYS.counts);
  };

  const openNew = () => { setFormData({}); setIsEdit(false); setOpenDialog(true); };
  const openEdit = (row: any) => { setFormData(row); setIsEdit(true); setOpenDialog(true); };

  return (
    <Box sx={{ p: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ color: '#fff', fontWeight: 800, fontFamily: "'Poppins', sans-serif" }}>
            Schedules
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.875rem', mt: 0.5 }}>
            Manage class timetables
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={openNew}
          sx={{ bgcolor: '#DF2026', '&:hover': { bgcolor: '#A8171C' }, boxShadow: 'none' }}
        >
          Add Schedule
        </Button>
      </Stack>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
          <CircularProgress sx={{ color: '#DF2026' }} />
        </Box>
      ) : (
        <TableContainer
          component={Paper}
          sx={{ bgcolor: '#1A1A1A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2, boxShadow: 'none' }}
        >
          <Table>
            <TableHead>
              <TableRow>
                {['Class', 'Club', 'Day', 'Time', 'Trainer', 'Actions'].map((h) => (
                  <TableCell
                    key={h}
                    align={h === 'Actions' ? 'right' : 'left'}
                    sx={{ color: 'rgba(255,255,255,0.4)', borderColor: 'rgba(255,255,255,0.06)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: 1.5 }}
                  >
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.06)' }}>{row.classes?.title}</TableCell>
                  <TableCell sx={{ color: 'rgba(255,255,255,0.55)', borderColor: 'rgba(255,255,255,0.06)' }}>{row.clubs?.name}</TableCell>
                  <TableCell sx={{ color: 'rgba(255,255,255,0.55)', borderColor: 'rgba(255,255,255,0.06)' }}>{row.day_of_week}</TableCell>
                  <TableCell sx={{ color: 'rgba(255,255,255,0.55)', borderColor: 'rgba(255,255,255,0.06)', fontFamily: 'monospace' }}>{row.start_time}</TableCell>
                  <TableCell sx={{ color: 'rgba(255,255,255,0.55)', borderColor: 'rgba(255,255,255,0.06)' }}>{row.trainer_name}</TableCell>
                  <TableCell align="right" sx={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                    <IconButton size="small" onClick={() => openEdit(row)} sx={{ color: 'rgba(255,255,255,0.4)', '&:hover': { color: '#fff' } }}>
                      <Iconify icon="eva:edit-fill" />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(row.id)} sx={{ color: 'rgba(255,255,255,0.4)', '&:hover': { color: '#DF2026' } }}>
                      <Iconify icon="eva:trash-2-fill" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{ sx: { bgcolor: '#1A1A1A', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 2 } }}
      >
        <DialogTitle sx={{ color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          {isEdit ? 'Edit Schedule' : 'Add Schedule'}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2.5} sx={{ mt: 2.5 }}>
            <FormControl fullWidth sx={inputDarkSx}>
              <InputLabel>Class</InputLabel>
              <Select
                value={formData.class_id || ''}
                onChange={(e) => setFormData({ ...formData, class_id: e.target.value })}
                label="Class"
                MenuProps={{ PaperProps: { sx: { bgcolor: '#222' } } }}
              >
                {classOptions.map((opt) => (
                  <MenuItem key={opt.id} value={opt.id} sx={{ color: '#fff' }}>{opt.title}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={inputDarkSx}>
              <InputLabel>Club</InputLabel>
              <Select
                value={formData.club_id || ''}
                onChange={(e) => setFormData({ ...formData, club_id: e.target.value })}
                label="Club"
                MenuProps={{ PaperProps: { sx: { bgcolor: '#222' } } }}
              >
                {clubOptions.map((opt) => (
                  <MenuItem key={opt.id} value={opt.id} sx={{ color: '#fff' }}>{opt.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Trainer Name"
              value={formData.trainer_name || ''}
              onChange={(e) => setFormData({ ...formData, trainer_name: e.target.value })}
              fullWidth
              sx={inputDarkSx}
            />

            <FormControl fullWidth sx={inputDarkSx}>
              <InputLabel>Day</InputLabel>
              <Select
                value={formData.day_of_week || ''}
                onChange={(e) => setFormData({ ...formData, day_of_week: e.target.value })}
                label="Day"
                MenuProps={{ PaperProps: { sx: { bgcolor: '#222' } } }}
              >
                {DAYS.map((day) => (
                  <MenuItem key={day} value={day} sx={{ color: '#fff' }}>{day}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Start Time (HH:MM:SS)"
              placeholder="19:30:00"
              value={formData.start_time || ''}
              onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
              fullWidth
              sx={inputDarkSx}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2.5, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <Button onClick={() => setOpenDialog(false)} disabled={isSaving} sx={{ color: 'rgba(255,255,255,0.4)' }}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={isSaving}
            sx={{ bgcolor: '#DF2026', '&:hover': { bgcolor: '#A8171C' }, boxShadow: 'none' }}
          >
            {isSaving ? <CircularProgress size={20} color="inherit" /> : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

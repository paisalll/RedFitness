import React, { useState, useEffect } from 'react';
// @mui
import {
  Box, Container, Typography, Card, TextField, Button, Stack,
  Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, IconButton, Dialog, DialogTitle, DialogContent,
  DialogActions, MenuItem, Select, InputLabel, FormControl, CircularProgress,
  Switch, FormControlLabel
} from '@mui/material';
// components
import Iconify from 'src/components/iconify';
// supabase
import { supabase } from 'src/utils/supabase';

// --- MOCK CREDENTIALS ---
const MOCK_USER = 'admin';
const MOCK_PASS = 'admin123';

export default function AdminDashboard() {
  const [isAuth, setIsAuth] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [activeTab, setActiveTab] = useState(0); 
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [clubOptions, setClubOptions] = useState<any[]>([]);
  const [classOptions, setClassOptions] = useState<any[]>([]);

  const [openDialog, setOpenDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState<any>({});
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === MOCK_USER && password === MOCK_PASS) {
      setIsAuth(true);
    } else {
      alert('Username atau Password salah!');
    }
  };

  const fetchData = async () => {
    setLoading(true);
    let tableName = activeTab === 0 ? 'clubs' : activeTab === 1 ? 'classes' : 'schedules';
    
    let query = supabase.from(tableName).select('*').order('id', { ascending: true });
    
    if (activeTab === 2) {
      query = supabase.from('schedules').select(`
        *,
        clubs ( name ),
        classes ( title )
      `).order('id', { ascending: true });
    }

    const { data: result, error } = await query;
    if (!error && result) setData(result);
    setLoading(false);
  };

  const fetchOptions = async () => {
    const { data: clubs } = await supabase.from('clubs').select('id, name');
    const { data: classes } = await supabase.from('classes').select('id, title');
    if (clubs) setClubOptions(clubs);
    if (classes) setClassOptions(classes);
  };

  useEffect(() => {
    if (isAuth) {
      fetchData();
      if (activeTab === 2) fetchOptions();
    }
  }, [isAuth, activeTab]);

  const handleOpenNew = () => {
    setFormData({});
    setSelectedFile(null); 
    setIsEdit(false);
    setOpenDialog(true);
  };

  const handleOpenEdit = (item: any) => {
    setFormData(item);
    setSelectedFile(null); 
    setIsEdit(true);
    setOpenDialog(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Yakin ingin menghapus data ini?')) return;
    const tableName = activeTab === 0 ? 'clubs' : activeTab === 1 ? 'classes' : 'schedules';
    const { error } = await supabase.from(tableName).delete().eq('id', id);
    if (error) {
      alert('Gagal menghapus: ' + error.message);
    } else {
      fetchData();
    }
  };

  const uploadImage = async (file: File) => {
    try {
      console.log("1. Memulai proses upload gambar ke Storage...");
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const folder = activeTab === 0 ? 'clubs' : 'classes'; 
      const filePath = `${folder}/${fileName}`;

      const { data, error: uploadError } = await supabase.storage
        .from('fitness-assets') 
        .upload(filePath, file, { cacheControl: '3600', upsert: false });

      if (uploadError) throw uploadError;
      console.log("2. Gambar berhasil terupload!", data);

      const { data: publicUrlData } = supabase.storage
        .from('fitness-assets')
        .getPublicUrl(filePath);

      console.log("3. URL Publik gambar didapatkan:", publicUrlData.publicUrl);
      return publicUrlData.publicUrl;
    } catch (err: any) {
      console.error("GAGAL UPLOAD GAMBAR:", err);
      throw new Error(`Upload gambar gagal: ${err.message}`);
    }
  };

  const handleSave = async () => {
    setIsUploading(true);
    const tableName = activeTab === 0 ? 'clubs' : activeTab === 1 ? 'classes' : 'schedules';
    
    try {
      // 1. Siapkan Payload dasar dari formData
      const payload = { ...formData };
      
      // Bersihkan object relasi hasil fetch agar tidak error
      delete payload.clubs;
      delete payload.classes;

      // 2. Penanganan khusus gambar (HANYA untuk Clubs dan Classes)
      if (activeTab === 0 || activeTab === 1) {
        let finalImageUrl = formData.image_url;
        
        // Upload gambar baru jika ada
        if (selectedFile) {
          finalImageUrl = await uploadImage(selectedFile);
        }
        
        payload.image_url = finalImageUrl;
      } else {
        // Jika sedang di tab Schedules, HAPUS properti yang tidak ada di tabel schedules
        delete payload.image_url;
        delete payload.is_featured;
        delete payload.selectedFile; // Berjaga-jaga jika ada
      }

      console.log("Payload yang akan disimpan:", payload);

      // 3. Proses Update atau Insert ke database
      if (isEdit) {
        const { data, error } = await supabase
          .from(tableName)
          .update(payload)
          .eq('id', payload.id)
          .select(); 

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from(tableName)
          .insert([payload])
          .select();
          
        if (error) throw error;
      }
      
      setOpenDialog(false);
      alert('Data berhasil disimpan!');
      fetchData(); 
    } catch (error: any) {
      console.error('ERROR SYSTEM:', error);
      alert(`Gagal menyimpan data: ${error.message}`); 
    } finally {
      setIsUploading(false);
    }
  };

  // ================= RENDER LOGIN =================
  if (!isAuth) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', bgcolor: '#f4f6f8' }}>
        <Card sx={{ p: 5, width: 1, maxWidth: 400 }}>
          <Typography variant="h4" sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
            Admin Login
          </Typography>
          <form onSubmit={handleLogin}>
            <Stack spacing={3}>
              <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth />
              <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth />
              <Button type="submit" variant="contained" size="large" sx={{ bgcolor: '#D40000', '&:hover': { bgcolor: '#b30000' } }}>
                Login
              </Button>
            </Stack>
          </form>
        </Card>
      </Box>
    );
  }

  // ================= RENDER DASHBOARD =================
  return (
    <Container sx={{ py: 5 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>Dashboard Admin</Typography>
        <Button variant="outlined" color="error" onClick={() => setIsAuth(false)}>Logout</Button>
      </Stack>

      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={(e, val) => setActiveTab(val)}>
            <Tab label="Clubs" />
            <Tab label="Classes" />
            <Tab label="Schedules" />
          </Tabs>
        </Box>

        <Box sx={{ p: 3 }}>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenNew} sx={{ mb: 3, bgcolor: '#D40000' }}>
            Add New Data
          </Button>

          {loading ? (
             <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
               <CircularProgress />
             </Box>
          ) : (
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    {activeTab === 0 && <><TableCell>Name</TableCell><TableCell>City</TableCell><TableCell>Image</TableCell></>}
                    {activeTab === 1 && <><TableCell>Title</TableCell><TableCell>Featured</TableCell><TableCell>Image</TableCell></>}
                    {activeTab === 2 && <><TableCell>Class</TableCell><TableCell>Club</TableCell><TableCell>Day</TableCell><TableCell>Time</TableCell></>}
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row) => (
                    <TableRow key={row.id}>
                      {activeTab === 0 && (
                        <><TableCell>{row.name}</TableCell><TableCell>{row.city}</TableCell><TableCell><img src={row.image_url} alt="img" width={50} style={{ borderRadius: 4 }} /></TableCell></>
                      )}
                      {activeTab === 1 && (
                        <>
                          <TableCell>{row.title}</TableCell>
                          <TableCell>{row.is_featured ? 'Yes' : 'No'}</TableCell>
                          <TableCell><img src={row.image_url} alt="img" width={50} style={{ borderRadius: 4 }} /></TableCell>
                        </>
                      )}
                      {activeTab === 2 && (
                        <>
                          <TableCell>{row.classes?.title}</TableCell>
                          <TableCell>{row.clubs?.name}</TableCell>
                          <TableCell>{row.day_of_week}</TableCell>
                          <TableCell>{row.start_time}</TableCell>
                        </>
                      )}
                      
                      <TableCell align="right">
                        <IconButton color="primary" onClick={() => handleOpenEdit(row)}>
                          <Iconify icon="eva:edit-fill" />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDelete(row.id)}>
                          <Iconify icon="eva:trash-2-fill" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Card>

      {/* ================= DYNAMIC MODAL FORM ================= */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>{isEdit ? 'Edit Data' : 'Add New Data'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            
            {/* Input Gambar */}
            {(activeTab === 0 || activeTab === 1) && (
              <Box sx={{ p: 2, border: '1px dashed grey', borderRadius: 1, textAlign: 'center' }}>
                <Button component="label" variant="outlined" startIcon={<Iconify icon="eva:cloud-upload-fill" />}>
                  {selectedFile ? 'Change Image' : 'Upload Image'}
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setSelectedFile(file);
                      // Reset value agar bisa upload file yang sama jika dihapus/diubah lagi
                      e.target.value = ''; 
                    }}
                  />
                </Button>
                
                {selectedFile && (
                  <Typography variant="caption" display="block" sx={{ mt: 1, color: 'primary.main', fontWeight: 'bold' }}>
                    File Terpilih: {selectedFile.name}
                  </Typography>
                )}

                {!selectedFile && formData.image_url && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="caption" display="block" sx={{ mb: 1 }}>Gambar Saat Ini:</Typography>
                    <img src={formData.image_url} alt="Current" style={{ width: '150px', borderRadius: '8px', border: '1px solid #ddd' }} />
                  </Box>
                )}
              </Box>
            )}

            {/* Form Clubs */}
            {activeTab === 0 && (
              <>
                <TextField label="Name" value={formData.name || ''} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                <TextField label="Club Key" value={formData.club_key || ''} onChange={(e) => setFormData({...formData, club_key: e.target.value})} />
                <TextField label="City" value={formData.city || ''} onChange={(e) => setFormData({...formData, city: e.target.value})} />
                <TextField label="Address" multiline rows={3} value={formData.address || ''} onChange={(e) => setFormData({...formData, address: e.target.value})} />
              </>
            )}

            {/* Form Classes */}
            {activeTab === 1 && (
              <>
                <TextField label="Title" value={formData.title || ''} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                <TextField label="Category Full (e.g. Dance | 60mins)" value={formData.category_full || ''} onChange={(e) => setFormData({...formData, category_full: e.target.value})} />
                <TextField label="Category Filter (e.g. DANCE)" value={formData.category_filter || ''} onChange={(e) => setFormData({...formData, category_filter: e.target.value})} />
                
                {/* Tambahan Switch untuk Featured Classes */}
                <FormControlLabel
                  control={
                    <Switch 
                      checked={!!formData.is_featured} 
                      onChange={(e) => setFormData({...formData, is_featured: e.target.checked})} 
                      color="primary"
                    />
                  }
                  label="Jadikan Featured Class (Tampil di Home)"
                />
              </>
            )}

            {/* Form Schedules */}
            {activeTab === 2 && (
              <>
                <FormControl fullWidth>
                  <InputLabel>Class</InputLabel>
                  <Select value={formData.class_id || ''} onChange={(e) => setFormData({...formData, class_id: e.target.value})} label="Class">
                    {classOptions.map(opt => <MenuItem key={opt.id} value={opt.id}>{opt.title}</MenuItem>)}
                  </Select>
                </FormControl>
                
                <FormControl fullWidth>
                  <InputLabel>Club</InputLabel>
                  <Select value={formData.club_id || ''} onChange={(e) => setFormData({...formData, club_id: e.target.value})} label="Club">
                    {clubOptions.map(opt => <MenuItem key={opt.id} value={opt.id}>{opt.name}</MenuItem>)}
                  </Select>
                </FormControl>

                <TextField label="Trainer Name" value={formData.trainer_name || ''} onChange={(e) => setFormData({...formData, trainer_name: e.target.value})} />
                
                <FormControl fullWidth>
                  <InputLabel>Day</InputLabel>
                  <Select value={formData.day_of_week || ''} onChange={(e) => setFormData({...formData, day_of_week: e.target.value})} label="Day">
                    {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'].map(day => (
                      <MenuItem key={day} value={day}>{day}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField label="Start Time (HH:MM:SS)" placeholder="19:30:00" value={formData.start_time || ''} onChange={(e) => setFormData({...formData, start_time: e.target.value})} />
              </>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} disabled={isUploading}>Cancel</Button>
          <Button variant="contained" onClick={handleSave} disabled={isUploading} sx={{ bgcolor: '#D40000' }}>
            {isUploading ? <CircularProgress size={24} color="inherit" /> : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
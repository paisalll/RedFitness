import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Card, TextField, Button, Typography, Stack, CircularProgress, Alert,
} from '@mui/material';
import Iconify from 'src/components/iconify';
import { useAdminAuth } from 'src/contexts/admin-auth-context';

const inputDarkSx = {
  '& .MuiOutlinedInput-root': {
    color: '#fff',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.12)' },
    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
    '&.Mui-focused fieldset': { borderColor: '#DF2026' },
  },
  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.4)' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#DF2026' },
};

export default function AdminLoginPage() {
  const { signIn, user, loading } = useAdminAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      navigate('/rf-admin/dashboard', { replace: true });
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    const err = await signIn(email, password);
    setSubmitting(false);
    if (err) {
      setError(err);
    } else {
      navigate('/rf-admin/dashboard', { replace: true });
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', bgcolor: '#0A0A0A' }}>
        <CircularProgress sx={{ color: '#DF2026' }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: '#0A0A0A',
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(223,32,38,0.07) 0%, transparent 55%)',
      }}
    >
      <Card
        sx={{
          p: 5,
          width: 1,
          maxWidth: 420,
          bgcolor: '#141414',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 2,
          boxShadow: 'none',
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 5 }}>
          <Box sx={{ width: 5, height: 28, bgcolor: '#DF2026', borderRadius: 0.5, flexShrink: 0 }} />
          <Box>
            <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '1.1rem', fontFamily: "'Poppins', sans-serif", lineHeight: 1.2 }}>
              Admin Portal
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.6rem', letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'monospace' }}>
              Red Fitness
            </Typography>
          </Box>
        </Stack>

        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 3,
              bgcolor: 'rgba(223,32,38,0.08)',
              color: '#ff8585',
              border: '1px solid rgba(223,32,38,0.25)',
              '& .MuiAlert-icon': { color: '#DF2026' },
            }}
          >
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              sx={inputDarkSx}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              sx={inputDarkSx}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={submitting}
              endIcon={
                submitting ? (
                  <CircularProgress size={18} color="inherit" />
                ) : (
                  <Iconify icon="solar:arrow-right-bold" />
                )
              }
              sx={{
                bgcolor: '#DF2026',
                '&:hover': { bgcolor: '#A8171C' },
                borderRadius: 1,
                py: 1.5,
                fontWeight: 700,
                letterSpacing: 1,
                boxShadow: 'none',
              }}
            >
              {submitting ? 'Signing in...' : 'Sign In'}
            </Button>
          </Stack>
        </form>
      </Card>
    </Box>
  );
}

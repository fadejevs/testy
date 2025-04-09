import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Alert, 
  CircularProgress,
  Paper
} from '@mui/material';
import { supabase } from '../utils/supabaseClient';
import { toast } from 'react-hot-toast';

const MagicLinkAuth = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleMagicLinkLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    
    setLoading(true);
    setError('');
    setMessage('');
    
    try {
      // Send magic link email
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin + '/dashboard',
        }
      });
      
      if (error) throw error;
      
      setMessage('Check your email for the login link!');
      toast.success('Magic link sent! Check your email.');
    } catch (err) {
      console.error('Magic link error:', err);
      setError(err.message || 'Failed to send magic link');
      toast.error('Failed to send magic link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: '1px solid rgba(0, 0, 0, 0.08)' }}>
      <Typography variant="h5" align="center" gutterBottom>
        Login with Magic Link
      </Typography>
      
      <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
        We'll email you a magic link for password-free sign in
      </Typography>
      
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
      {message && <Alert severity="success" sx={{ mb: 3 }}>{message}</Alert>}
      
      <Box component="form" onSubmit={handleMagicLinkLogin}>
        <TextField
          fullWidth
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          sx={{ mb: 3 }}
        />
        
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          disabled={loading}
          sx={{ py: 1.5 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Send Magic Link'}
        </Button>
      </Box>
    </Paper>
  );
};

export default MagicLinkAuth; 
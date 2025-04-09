import React, { useState } from 'react';
import { 
  Button, 
  Typography, 
  Alert, 
  CircularProgress,
  Paper,
  Box
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { supabase } from '../utils/supabaseClient';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const GoogleAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/dashboard',
        }
      });
      
      if (error) throw error;
      
      // The redirect will happen automatically
      toast.success('Redirecting to Google...');
    } catch (err) {
      console.error('Google login error:', err);
      setError(err.message || 'Failed to sign in with Google');
      toast.error('Failed to sign in with Google');
      setLoading(false);
    }
  };

  return (
    <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: '1px solid rgba(0, 0, 0, 0.08)' }}>
      <Typography variant="h5" align="center" gutterBottom>
        Sign in with Google
      </Typography>
      
      <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
        Quick and easy login with your Google account
      </Typography>
      
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
      
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="outlined"
          size="large"
          startIcon={<GoogleIcon />}
          onClick={handleGoogleLogin}
          disabled={loading}
          sx={{ py: 1.5, px: 4 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Continue with Google'}
        </Button>
      </Box>
    </Paper>
  );
};

export default GoogleAuth; 
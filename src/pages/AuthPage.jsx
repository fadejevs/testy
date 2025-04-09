import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Divider,
  Paper,
  Button
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { supabase } from '../utils/supabaseClient';
import MagicLinkAuth from '../components/MagicLinkAuth';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const AuthPage = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  
  // Get the redirect destination from location state
  const from = location.state?.from || { pathname: '/dashboard' };
  
  const handleGoogleLogin = async () => {
    setLoading(true);
    
    try {
      console.log("Attempting Google login...");
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
      toast.error('Failed to sign in with Google');
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Welcome to Testy
        </Typography>
        
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
          Choose how you'd like to sign in
        </Typography>
        
        {/* Google Sign In - Direct implementation */}
        <Paper elevation={0} sx={{ p: 4, mb: 4, borderRadius: 3, border: '1px solid rgba(0, 0, 0, 0.08)' }}>
          <Typography variant="h5" align="center" gutterBottom>
            Sign in with Google
          </Typography>
          
          <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
            Quick and easy login with your Google account
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="outlined"
              size="large"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleLogin}
              disabled={loading}
              sx={{ py: 1.5, px: 4 }}
            >
              {loading ? 'Connecting...' : 'Continue with Google'}
            </Button>
          </Box>
        </Paper>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Divider sx={{ flex: 1 }} />
          <Typography variant="body2" color="text.secondary" sx={{ px: 2 }}>
            OR
          </Typography>
          <Divider sx={{ flex: 1 }} />
        </Box>
        
        <MagicLinkAuth />
        
        <Typography variant="body2" align="center" color="text.secondary" sx={{ mt: 4 }}>
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </Typography>
      </Box>
    </Container>
  );
};

export default AuthPage; 
import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Button, 
  Paper,
  CircularProgress,
  Alert
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { supabase } from '../utils/supabaseClient';
import { toast } from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';

const SimpleAuthPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  
  // Always redirect to dashboard after auth
  const redirectTo = window.location.origin + '/dashboard';
  
  useEffect(() => {
    // Check if there's any lingering session and clear it
    const clearExistingSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        
        if (data.session) {
          console.log("Found existing session on auth page, signing out...");
          await supabase.auth.signOut();
          console.log("Signed out existing session");
        }
      } catch (err) {
        console.error("Error clearing existing session:", err);
      }
    };
    
    clearExistingSession();
  }, []);
  
  // Check if we're in a payment flow
  useEffect(() => {
    const isPaymentFlow = new URLSearchParams(location.search).get('payment') === 'true';
    
    if (isPaymentFlow) {
      localStorage.setItem('paymentFlow', 'true');
    }
  }, [location]);
  
  const handleGoogleAuth = async () => {
    setLoading(true);
    setError('');
    
    try {
      console.log("Starting Google authentication...");
      
      // Check if we're in a payment flow
      const isPaymentFlow = localStorage.getItem('paymentFlow') === 'true';
      
      // Make sure we're using the full URL for the redirect
      const redirectUrl = new URL(
        isPaymentFlow ? '/payment' : '/dashboard', 
        window.location.origin
      ).toString();
      
      console.log("Redirect URL:", redirectUrl);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
        }
      });
      
      if (error) throw error;
      
      console.log("OAuth response:", data);
      toast.success('Connecting to Google...');
    } catch (err) {
      console.error('Google authentication error:', err);
      setError(err.message || 'Failed to authenticate with Google');
      toast.error('Failed to authenticate with Google');
      setLoading(false);
    }
  };

  const handleClearCache = () => {
    try {
      // Clear localStorage
      localStorage.clear();
      
      // Clear sessionStorage
      sessionStorage.clear();
      
      // Sign out from Supabase
      supabase.auth.signOut();
      
      toast.success("Cache cleared successfully");
      
      // Force reload the page
      window.location.reload(true);
    } catch (err) {
      console.error("Error clearing cache:", err);
      toast.error("Failed to clear cache");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 8 }}>
        <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: '1px solid rgba(0, 0, 0, 0.08)' }}>
          <Typography variant="h4" align="center" gutterBottom>
            Welcome to Testy
          </Typography>
          
          <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
            Continue with your Google account
          </Typography>
          
          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
          
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleAuth}
              disabled={loading}
              sx={{ py: 1.5, px: 4 }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Continue with Google'}
            </Button>
          </Box>
          
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Having trouble signing in?
            </Typography>
            <Button 
              variant="text" 
              color="primary" 
              size="small"
              onClick={handleClearCache}
            >
              Clear Cache and Retry
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default SimpleAuthPage; 
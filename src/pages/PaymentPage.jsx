import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  CircularProgress,
  Alert,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { getCurrentUser, markUserAsPaid } from '../utils/userStorage';
import { toast } from 'react-hot-toast';
import { supabase } from '../utils/supabaseClient';


const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentProcessed, setPaymentProcessed] = useState(false);
  
  // Check if this is a return from payment
  const query = new URLSearchParams(location.search);
  const success = query.get('success') === 'true';
  
  useEffect(() => {
    // Get current user
    const currentUser = getCurrentUser();
    setUser(currentUser);
    
    // Redirect to signup if not authenticated
    if (!currentUser) {
      navigate('/signup', { 
        state: { 
          from: { pathname: '/payment' }
        } 
      });
      toast.error('Please create an account to continue with your purchase');
      return;
    }
    
    // Handle successful payment return
    if (success && currentUser && !paymentProcessed) {
      console.log('Processing successful payment for user:', currentUser.id);
      handleSuccessfulPayment(currentUser.id);
      setPaymentProcessed(true);
    }
  }, [navigate, success, paymentProcessed]);
  
  useEffect(() => {
    // Check if we're returning from a successful payment
    const query = new URLSearchParams(location.search);
    const success = query.get('success');
    
    if (success === 'true' && user) {
      handleSuccessfulPayment(user.id);
    }
  }, [location.search, user]);
  
  const handleSuccessfulPayment = async (userId) => {
    setLoading(true);
    
    try {
      // Mark user as paid in Supabase
      const { data, error } = await supabase
        .from('users')
        .update({ 
          is_paid: true, 
          payment_date: new Date().toISOString(),
          testimonial_limit: 999999 // Unlimited testimonials
        })
        .eq('id', userId)
        .select();
      
      if (error) throw error;
      
      // Also update local user data if you're using localStorage
      markUserAsPaid(userId);
      
      // Show success message
      toast.success('Payment successful! You now have access to all premium features.');
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error('Error processing payment:', err);
      setError('There was a problem activating your premium features. Please contact support.');
    } finally {
      setLoading(false);
    }
  };
  
  const handlePayment = () => {
    setLoading(true);
    
    try {
      // For now, directly redirect to your Stripe payment link
      window.location.href = 'https://buy.stripe.com/test_7sI7tk9Go6sa3Go8wA';
      
      // Store that we're in a payment flow (useful for redirects after auth)
      localStorage.setItem('paymentFlow', 'true');
    } catch (err) {
      console.error('Error initiating payment:', err);
      setError('Failed to initiate payment. Please try again.');
      setLoading(false);
    }
  };
  
  // If we're in a loading state after payment
  if (success && loading) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <CircularProgress size={60} sx={{ mb: 4 }} />
          <Typography variant="h5" gutterBottom>
            Processing your payment...
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Please wait while we update your account.
          </Typography>
        </Box>
      </Container>
    );
  }
  
  if (!user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  // If user is already paid, show a different message
  if (user.isPaid) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ py: 8 }}>
          <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: '1px solid rgba(0, 0, 0, 0.08)', textAlign: 'center' }}>
            <Box sx={{ color: 'success.main', fontSize: 64, mb: 2 }}>
              <CheckCircleIcon fontSize="inherit" />
            </Box>
            
            <Typography variant="h4" gutterBottom>
              You're Already a Premium User!
            </Typography>
            
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              You already have access to all premium features.
            </Typography>
            
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate('/dashboard')}
              sx={{ py: 1.5 }}
            >
              Go to Dashboard
            </Button>
          </Paper>
        </Box>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Upgrade to Premium
        </Typography>
        
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
          One-time payment for lifetime access to premium features
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 4 }}>{error}</Alert>}
        
        <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: '1px solid rgba(0, 0, 0, 0.08)', mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Premium Access
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2 }}>
            <Typography variant="h3" component="span">
              $49
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="span">
              one-time payment
            </Typography>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <List>
            <ListItem disableGutters>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Unlimited AI-enhanced testimonials" />
            </ListItem>
            <ListItem disableGutters>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="One-click client approval" />
            </ListItem>
            <ListItem disableGutters>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Advanced exports (PDF, HTML, JSON)" />
            </ListItem>
            <ListItem disableGutters>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Custom brand tone" />
            </ListItem>
            <ListItem disableGutters>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Remove Testy branding" />
            </ListItem>
            <ListItem disableGutters>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Priority support" />
            </ListItem>
          </List>
        </Paper>
        
        <Button
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          disabled={loading}
          onClick={handlePayment}
          sx={{ py: 1.5 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Pay $49 Now'}
        </Button>
        
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Secure payment processed by Stripe
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default PaymentPage; 
import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  CircularProgress,
  Alert
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { getCurrentUser, updateUser } from '../utils/userStorage';
import { toast } from 'react-hot-toast';

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Get the session ID from URL query params
  const query = new URLSearchParams(location.search);
  const sessionId = query.get('session_id');
  
  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        setError('Invalid session ID');
        setLoading(false);
        return;
      }
      
      try {
        // In a real app, you'd verify the session with your backend
        // For now, we'll simulate a successful payment
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const user = getCurrentUser();
        if (!user) {
          setError('User not found');
          setLoading(false);
          return;
        }
        
        // Update user plan based on the URL or a default
        const planType = query.get('plan') || 'pro';
        
        // Update user subscription
        updateUser(user.id, {
          plan: planType,
          testimonialLimit: planType === 'pro' ? 999999 : 999999, // Unlimited for both pro and team
          subscriptionDate: new Date().toISOString(),
          subscriptionRenewal: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
        });
        
        setLoading(false);
      } catch (err) {
        console.error('Error verifying payment:', err);
        setError('Failed to verify payment. Please contact support.');
        setLoading(false);
      }
    };
    
    verifyPayment();
  }, [sessionId, query]);
  
  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 8 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: '1px solid rgba(0, 0, 0, 0.08)' }}>
            <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => navigate('/dashboard')}
            >
              Return to Dashboard
            </Button>
          </Paper>
        ) : (
          <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: '1px solid rgba(0, 0, 0, 0.08)', textAlign: 'center' }}>
            <Box sx={{ color: 'success.main', fontSize: 64, mb: 2 }}>
              <CheckCircleIcon fontSize="inherit" />
            </Box>
            
            <Typography variant="h4" gutterBottom>
              Payment Successful!
            </Typography>
            
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Thank you for your purchase. Your subscription has been activated.
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
        )}
      </Box>
    </Container>
  );
};

export default PaymentSuccessPage; 
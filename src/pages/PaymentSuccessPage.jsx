import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  CircularProgress,
  Alert,
  Divider
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { supabase } from '../utils/supabaseClient';
import { toast } from 'react-hot-toast';

const PaymentSuccessPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get session_id from URL if present
  const query = new URLSearchParams(location.search);
  const sessionId = query.get('session_id');
  
  useEffect(() => {
    const processPayment = async () => {
      try {
        console.log("PaymentSuccessPage: Processing payment...");
        
        // First check if user is authenticated
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Session check error:", error);
          // Don't redirect yet, we might be in a guest payment flow
        }
        
        let userId = null;
        
        if (data.session) {
          console.log("User is authenticated:", data.session.user);
          setUser(data.session.user);
          userId = data.session.user.id;
        } else {
          console.log("No active session found, checking for guest payment");
          // Check if we're in a payment flow
          const isPaymentFlow = localStorage.getItem('paymentFlow') === 'true';
          
          if (!isPaymentFlow && !sessionId) {
            // Not a payment flow and no session ID, redirect to auth
            navigate('/auth', { state: { from: location } });
            return;
          }
        }
        
        // If we have a session ID, verify the payment with your backend
        if (sessionId) {
          console.log("Verifying payment session:", sessionId);
          
          const response = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              sessionId,
              userId, // This might be null for guest payments
            }),
          });
          
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to verify payment');
          }
          
          const paymentData = await response.json();
          setPaymentDetails(paymentData);
          
          // If this was a guest payment and we have an email, offer to create an account
          if (!userId && paymentData.customerEmail) {
            // Store email temporarily for account creation
            localStorage.setItem('guestPaymentEmail', paymentData.customerEmail);
          }
          
          // Clear payment flow flag
          localStorage.removeItem('paymentFlow');
          
          toast.success('Payment successful!');
        } else {
          // No session ID but user is logged in, might be a direct visit
          console.log("No session ID found, might be a direct visit");
        }
      } catch (err) {
        console.error('Payment verification error:', err);
        setError(err.message || 'Failed to verify payment. Please contact support.');
        toast.error('Payment verification failed.');
      } finally {
        setLoading(false);
      }
    };
    
    processPayment();
  }, [navigate, location, sessionId]);
  
  const handleContinueToDashboard = () => {
    navigate('/dashboard');
  };
  
  const handleCreateAccount = async () => {
    const email = localStorage.getItem('guestPaymentEmail');
    
    if (!email) {
      toast.error('Email not found. Please sign up manually.');
      navigate('/auth');
      return;
    }
    
    // Redirect to auth page with email prefilled
    navigate('/auth', { state: { email, isPostPayment: true } });
  };
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 8 }}>
        <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: '1px solid rgba(0, 0, 0, 0.08)' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
            <CheckCircleIcon color="success" sx={{ fontSize: 64, mb: 2 }} />
            <Typography variant="h4" align="center" gutterBottom>
              Payment Successful!
            </Typography>
            
            <Typography variant="body1" align="center" color="text.secondary">
              Thank you for your purchase
            </Typography>
          </Box>
          
          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
          
          {paymentDetails && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" gutterBottom>
                Payment Details:
              </Typography>
              <Box sx={{ bgcolor: 'background.default', p: 2, borderRadius: 1 }}>
                <Typography variant="body2">
                  Amount: ${paymentDetails.amount / 100}
                </Typography>
                {paymentDetails.customerEmail && (
                  <Typography variant="body2">
                    Email: {paymentDetails.customerEmail}
                  </Typography>
                )}
                <Typography variant="body2">
                  Date: {new Date().toLocaleDateString()}
                </Typography>
              </Box>
            </Box>
          )}
          
          <Divider sx={{ my: 3 }} />
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {user ? (
              <Button
                variant="contained"
                size="large"
                onClick={handleContinueToDashboard}
                sx={{ py: 1.5 }}
              >
                Continue to Dashboard
              </Button>
            ) : (
              <>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleCreateAccount}
                  sx={{ py: 1.5 }}
                >
                  Create Account
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/')}
                  sx={{ py: 1.5 }}
                >
                  Return to Home
                </Button>
              </>
            )}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default PaymentSuccessPage; 
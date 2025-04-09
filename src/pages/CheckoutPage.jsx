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
import { useLocation, useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { getCurrentUser } from '../utils/userStorage';
import { toast } from 'react-hot-toast';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Get the plan from location state
  const plan = location.state?.plan || 'pro';
  
  // Plan details
  const planDetails = {
    pro: {
      name: 'Premium Plan',
      price: '$19',
      period: '/month',
      features: [
        'Unlimited AI-enhanced testimonials',
        'One-click client approval',
        'Advanced exports (PDF, HTML, JSON)',
        'Custom brand tone',
        'Remove Testy branding',
        'Priority support'
      ],
      priceId: process.env.REACT_APP_STRIPE_PRO_PRICE_ID || 'price_test_pro'
    },
    team: {
      name: 'Team Plan',
      price: '$99',
      period: '/month',
      features: [
        'Everything in Premium',
        'Up to 5 team members',
        'Team collaboration tools',
        'Advanced analytics',
        'Custom integrations',
        'Dedicated account manager'
      ],
      priceId: process.env.REACT_APP_STRIPE_TEAM_PRICE_ID || 'price_test_team'
    }
  };
  
  // Selected plan
  const selectedPlan = planDetails[plan];
  
  useEffect(() => {
    // Get current user
    const currentUser = getCurrentUser();
    setUser(currentUser);
    
    // Redirect to signup if not authenticated
    if (!currentUser) {
      navigate('/signup', { 
        state: { 
          from: { pathname: '/checkout' },
          plan: plan
        } 
      });
      toast.error('Please create an account to continue with your purchase');
    }
  }, [navigate, plan]);
  
  const handleCheckout = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Call the backend to create a Stripe checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: selectedPlan.priceId,
          userId: user.id,
          customerEmail: user.email,
          planType: plan
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }
      
      const { url } = await response.json();
      
      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (err) {
      console.error('Error creating checkout session:', err);
      setError('Failed to process your request. Please try again.');
      toast.error('Payment processing failed. Please try again.');
      setLoading(false);
    }
  };
  
  if (!selectedPlan) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Plan Not Found
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => navigate('/pricing')}
          >
            View Available Plans
          </Button>
        </Box>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Complete Your Purchase
        </Typography>
        
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
          You're just one step away from unlocking premium features
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 4 }}>{error}</Alert>}
        
        <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: '1px solid rgba(0, 0, 0, 0.08)', mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            {selectedPlan.name}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2 }}>
            <Typography variant="h3" component="span">
              {selectedPlan.price}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="span">
              {selectedPlan.period}
            </Typography>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <List>
            {selectedPlan.features.map((feature, index) => (
              <ListItem key={index} disableGutters>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <CheckCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary={feature} />
              </ListItem>
            ))}
          </List>
        </Paper>
        
        <Button
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          disabled={loading}
          onClick={handleCheckout}
          sx={{ py: 1.5 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Proceed to Payment'}
        </Button>
        
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            You'll be redirected to Stripe's secure payment page
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default CheckoutPage; 
import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  CircularProgress,
  Alert
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useAuth } from '../components/auth/AuthProvider';
import { supabase } from '../lib/supabaseClient';

const PricingPage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubscribe = async (priceId) => {
    if (!user) return;
    
    setLoading(true);
    setError('');
    
    try {
      // In a real app, you'd call your backend to create a Stripe checkout session
      // For demo purposes, we'll simulate it
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          userId: user.id,
          customerEmail: user.email
        }),
      });
      
      const { url } = await response.json();
      
      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (err) {
      console.error('Error creating checkout session:', err);
      setError('Failed to process your request. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const plans = [
    {
      name: 'Free',
      price: '$0',
      description: 'Perfect for trying out the service',
      features: [
        '5 AI-enhanced testimonials',
        'Client verification',
        'Basic editing tools',
        'Email support'
      ],
      buttonText: 'Current Plan',
      buttonVariant: 'outlined',
      priceId: 'free'
    },
    {
      name: 'Pro',
      price: '$19',
      period: '/month',
      description: 'For growing businesses',
      features: [
        'Unlimited testimonials',
        'Advanced AI enhancements',
        'Custom branding',
        'Priority support',
        'Analytics dashboard'
      ],
      buttonText: 'Subscribe',
      buttonVariant: 'contained',
      priceId: 'price_1234567890'
    },
    {
      name: 'Business',
      price: '$49',
      period: '/month',
      description: 'For teams and agencies',
      features: [
        'Everything in Pro',
        'Team collaboration',
        'API access',
        'White-label options',
        'Dedicated account manager'
      ],
      buttonText: 'Subscribe',
      buttonVariant: 'contained',
      priceId: 'price_0987654321'
    }
  ];
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Choose Your Plan
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 6 }}>
          Upgrade to unlock unlimited testimonials and premium features
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 4 }}>{error}</Alert>}
        
        <Grid container spacing={4} justifyContent="center">
          {plans.map((plan) => (
            <Grid item key={plan.name} xs={12} sm={6} md={4}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  borderRadius: 3,
                  ...(plan.name === 'Pro' ? {
                    border: '2px solid',
                    borderColor: 'primary.main'
                  } : {})
                }}
                elevation={plan.name === 'Pro' ? 4 : 1}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {plan.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2 }}>
                    <Typography variant="h3" component="span">
                      {plan.price}
                    </Typography>
                    {plan.period && (
                      <Typography variant="subtitle1" color="text.secondary" component="span">
                        {plan.period}
                      </Typography>
                    )}
                  </Box>
                  <Typography variant="subtitle1" color="text.secondary" paragraph>
                    {plan.description}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <List dense>
                    {plan.features.map((feature) => (
                      <ListItem key={feature} disableGutters>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CheckIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={feature} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
                <CardActions sx={{ p: 2 }}>
                  <Button
                    fullWidth
                    variant={plan.buttonVariant}
                    color="primary"
                    disabled={loading || plan.name === 'Free'}
                    onClick={() => handleSubscribe(plan.priceId)}
                  >
                    {loading ? <CircularProgress size={24} /> : plan.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default PricingPage; 
import React from 'react';
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
  Divider
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../utils/userStorage';
import { toast } from 'react-hot-toast';

const PricingPage = () => {
  const user = getCurrentUser();
  const navigate = useNavigate();
  
  const handleSubscribe = () => {
    if (!user) {
      // Redirect to signup with return destination
      navigate('/signup', { 
        state: { 
          from: { pathname: '/payment' }
        } 
      });
      toast.success('Create an account to continue with your purchase');
      return;
    }
    
    // User is logged in, redirect to payment page
    navigate('/payment');
  };
  
  const pricingPlans = [
    {
      title: 'Free',
      price: '$0',
      period: '/month',
      description: 'Basic features for individuals',
      features: [
        'Up to 5 testimonials',
        'Basic AI enhancement',
        'Standard exports',
        'Email support'
      ],
      buttonText: 'Get Started',
      buttonVariant: 'outlined'
    },
    {
      title: 'Premium',
      price: '$19',
      period: '/month',
      description: 'Everything you need for professional testimonials',
      features: [
        'Unlimited testimonials',
        'Advanced AI enhancement',
        'All export formats',
        'Custom branding',
        'Priority support',
        'Client approval workflow'
      ],
      buttonText: 'Subscribe Now',
      buttonVariant: 'contained',
      highlighted: true
    }
  ];
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        <Typography 
          variant="h3" 
          align="center" 
          gutterBottom
          sx={{ fontWeight: 700 }}
        >
          Simple Pricing
        </Typography>
        
        <Typography 
          variant="h6" 
          align="center" 
          color="text.secondary"
          sx={{ mb: 6, maxWidth: 700, mx: 'auto' }}
        >
          Get started for free or upgrade to premium for unlimited access.
        </Typography>
        
        <Grid container spacing={4} justifyContent="center">
          {pricingPlans.map((plan, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card 
                elevation={0}
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  borderRadius: 3,
                  border: '1px solid rgba(0, 0, 0, 0.08)'
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {plan.title}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2 }}>
                    <Typography variant="h3" component="span">
                      {plan.price}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="span">
                      {plan.period}
                    </Typography>
                  </Box>
                  
                  <Typography color="text.secondary" sx={{ mb: 3 }}>
                    {plan.description}
                  </Typography>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <List>
                    {plan.features.map((feature, featureIndex) => (
                      <ListItem disableGutters key={featureIndex}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CheckIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={feature} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
                
                <CardActions sx={{ p: 3, pt: 0 }}>
                  <Button
                    fullWidth
                    variant={plan.buttonVariant}
                    color="primary"
                    onClick={() => navigate('/signup')}
                  >
                    {plan.buttonText}
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
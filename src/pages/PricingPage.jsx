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
          {/* Free Plan */}
          <Grid item xs={12} md={4}>
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
                  Free
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2 }}>
                  <Typography variant="h3" component="span">
                    $0
                  </Typography>
                </Box>
                
                <Typography color="text.secondary" sx={{ mb: 3 }}>
                  Perfect for getting started
                </Typography>
                
                <Divider sx={{ my: 2 }} />
                
                <List>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="5 AI-enhanced testimonials" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Basic exports (text)" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Standard support" />
                  </ListItem>
                </List>
              </CardContent>
              
              <CardActions sx={{ p: 3, pt: 0 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  onClick={() => navigate('/signup')}
                >
                  Get Started
                </Button>
              </CardActions>
            </Card>
          </Grid>
          
          {/* Premium Plan */}
          <Grid item xs={12} md={4}>
            <Card 
              elevation={0}
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                borderRadius: 3,
                border: '1px solid rgba(0, 0, 0, 0.08)',
                bgcolor: 'primary.50',
                position: 'relative',
                overflow: 'visible'
              }}
            >
              <Box 
                sx={{ 
                  position: 'absolute', 
                  top: -12, 
                  left: '50%', 
                  transform: 'translateX(-50%)',
                  bgcolor: 'primary.main',
                  color: 'white',
                  py: 0.5,
                  px: 2,
                  borderRadius: 5,
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: 1
                }}
              >
                Most Popular
              </Box>
              
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  Premium
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2 }}>
                  <Typography variant="h3" component="span">
                    $49
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" component="span">
                    one-time
                  </Typography>
                </Box>
                
                <Typography color="text.secondary" sx={{ mb: 3 }}>
                  Lifetime access to premium features
                </Typography>
                
                <Divider sx={{ my: 2 }} />
                
                <List>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Unlimited AI-enhanced testimonials" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="One-click client approval" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Advanced exports (PDF, HTML, JSON)" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Custom brand tone" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Remove Testy branding" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Priority support" />
                  </ListItem>
                </List>
              </CardContent>
              
              <CardActions sx={{ p: 3, pt: 0 }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleSubscribe}
                >
                  Upgrade Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default PricingPage; 
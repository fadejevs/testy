import React, { useState, useRef } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  TextField, 
  Paper, 
  Stepper, 
  Step, 
  StepLabel, 
  StepButton,
  Fade,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CardActions
} from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Verified as VerifiedIcon,
  AutoAwesome as AutoAwesomeIcon,
  Edit as EditIcon,
  Send as SendIcon,
  PlayArrow as PlayArrowIcon,
  ExpandMore as ExpandMoreIcon
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import TestimonialGallery from '../components/testimonials/TestimonialGallery';
import { toast } from 'react-hot-toast';
import { getCurrentUser } from '../utils/userStorage';

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [spotlightActive, setSpotlightActive] = useState(false);
  const auth = useAuth();
  const user = getCurrentUser();
  const demoRef = useRef(null);
  const navigate = useNavigate();
  
  // Sample data for the demo
  const originalText = "Thank you for your help with my business!";
  const enhancedText = "Before working with you, I was struggling to convert leads into clients. Your strategic guidance helped me close 3 new high-value clients worth $15,000 in my first month alone. My ROI has been over 500% - easily the best business investment I've made this year.";
  
  // Sample steps for the demo
  const steps = [
    { 
      title: 'Input', 
      description: 'Enter your clients original feedback, even if it\'s brief or vague.' 
    },
    { 
      title: 'Enhance', 
      description: 'Our AI transforms the feedback into a compelling, detailed testimonial.' 
    },
    { 
      title: 'Verify', 
      description: 'Your client approves the enhanced version with one click.' 
    }
  ];
  
  // Sample testimonials for the gallery
  const exampleTestimonials = [
    {
      id: 1,
      original: "Good service, helped my business.",
      enhanced: "The service provided was exceptional and truly transformative for my business. Within just 3 months, we saw a 40% increase in customer engagement and a significant boost in our online presence. Their team was responsive, professional, and genuinely invested in our success.",
      author: "Sarah Johnson",
      company: "Bright Ideas Marketing",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      id: 2,
      original: "Fixed our website issues quickly.",
      enhanced: "When our e-commerce platform crashed during our busiest sales season, their team responded within minutes. Not only did they resolve our critical website issues with remarkable speed, but they also implemented new security measures that have prevented any similar problems since. Their technical expertise and dedication to customer service are unmatched in the industry.",
      author: "Michael Chen",
      company: "TechSolutions Inc.",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
      id: 3,
      original: "Good coaching, learned a lot.",
      enhanced: "The coaching program exceeded all my expectations. Through their structured approach and personalized guidance, I gained invaluable insights into strategic leadership that I've been able to apply immediately. Within 6 weeks, my team's productivity increased by 35%, and I've developed confidence in areas that previously challenged me. This investment in my professional development has already paid dividends multiple times over.",
      author: "Jessica Williams",
      company: "Growth Mindset Consulting",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg"
    }
  ];
  
  // Functions for the interactive demo
  const handleNext = () => {
    const newActiveStep = activeStep + 1;
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    setActiveStep(newActiveStep);
    
    if (newActiveStep === 1) {
      setSpotlightActive(true);
      setTimeout(() => {
        setSpotlightActive(false);
      }, 2000);
    }
  };
  
  const handleStep = (step) => () => {
    setActiveStep(step);
  };
  
  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/signup');
    }
  };
  
  const handlePricingClick = (planType) => {
    if (!user) {
      // Redirect to signup with return destination
      navigate('/signup', { 
        state: { 
          from: { pathname: '/payment' }
        } 
      });
      toast.success('Create an account to continue with your purchase');
    } else {
      // User is logged in, redirect to payment page
      navigate('/payment');
    }
  };

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Hero Section - Minimalist Style */}
      <Box 
        sx={{
          pt: { xs: 8, md: 12 },
          pb: { xs: 8, md: 10 },
          position: 'relative',
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          background: '#FCFCFC'
        }}
      >
        {/* Subtle decorative elements */}
        <Box 
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100%',
            zIndex: 0,
            opacity: 0.4,
            background: 'radial-gradient(circle at 10% 20%, rgba(216, 180, 154, 0.2) 0%, transparent 20%), radial-gradient(circle at 90% 80%, rgba(93, 95, 239, 0.1) 0%, transparent 20%)'
          }}
        />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            {/* Left side - Hero text */}
            <Grid item xs={12} md={6}>
              <Box sx={{ maxWidth: 600, mx: 'auto'}}>
                <Typography 
                  variant="h1" 
                  component="h1" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 800,
                    fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                    lineHeight: 1.1,
                    mb: 3,
                    color: '#3A3A3A'
                  }}
                >
                  Turn <Box component="span" sx={{ color: theme.palette.primary.main }}>weak feedback</Box> into testimonials that actually sell
                </Typography>
                
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    mb: 4, 
                    fontSize: '1.2rem', 
                    color: '#666',
                    lineHeight: 1.5,
                    maxWidth: '90%'
                  }}
                >
                  83% of prospects trust detailed testimonials. But your clients give you one-liners. We fix that gap.
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 4 }}>
                  <Button 
                    variant="contained" 
                    color="primary"
                    size="large"
                    onClick={handleGetStarted}
                    sx={{ 
                      px: 4, 
                      py: 1.5, 
                      borderRadius: 2,
                      fontSize: '1rem',
                      fontWeight: 600,
                      boxShadow: 'none',
                      textTransform: 'none'
                    }}
                  >
                    Get Started Free
                  </Button>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <VerifiedIcon sx={{ color: '#B89B7D', mr: 1, fontSize: 20 }} />
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    No credit card required
                  </Typography>
                </Box>
              </Box>
            </Grid>
            
            {/* Right side - Interactive Demo */}
            <Grid item xs={12} md={6}>
              <Card 
                ref={demoRef}
                elevation={3}
                sx={{ 
                  width: '100%', 
                  maxWidth: 420,
                  overflow: 'visible',
                  bgcolor: '#FCFCFF',
                  p: 3,
                  borderRadius: 4,
                  boxShadow: spotlightActive ? '0 0 30px rgba(99, 102, 241, 0.6)' : '0 10px 40px rgba(0, 0, 0, 0.08)',
                  border: '1px solid rgba(99, 102, 241, 0.1)',
                  transition: 'all 0.5s ease',
                  transform: spotlightActive ? 'scale(1.05)' : 'scale(1)',
                  position: 'relative',
                  zIndex: spotlightActive ? 1200 : 1,
                  mx: 'auto'
                }}
              >
                <CardContent sx={{ p: 0 }}>
                  {/* Demo Header */}
                  <Box sx={{ 
                    p: 2, 
                    borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Try It Yourself
                    </Typography>
                    <Button 
                      size="small" 
                      onClick={handleReset}
                      startIcon={<PlayArrowIcon />}
                    >
                      Restart
                    </Button>
                  </Box>
                  
                  {/* Stepper */}
                  <Stepper 
                    activeStep={activeStep} 
                    sx={{ 
                      px: 3, 
                      py: 2,
                      '& .MuiStepConnector-line': {
                        borderColor: theme.palette.primary.light
                      }
                    }}
                    alternativeLabel
                  >
                    {steps.map((step, index) => (
                      <Step key={step.title} completed={completed[index]}>
                        <StepButton onClick={handleStep(index)}>
                          <StepLabel StepIconProps={{
                            sx: {
                              '&.Mui-active': {
                                color: theme.palette.primary.main
                              },
                              '&.Mui-completed': {
                                color: '#4CAF50'
                              }
                            }
                          }}>
                            {step.title}
                          </StepLabel>
                        </StepButton>
                      </Step>
                    ))}
                  </Stepper>
                  
                  {/* Step Content */}
                  <Box sx={{ p: 3, minHeight: 300 }}>
                    {activeStep === 0 && (
                      <Fade in={activeStep === 0}>
                        <Box>
                          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                            Original Client Testimonial
                          </Typography>
                          <TextField
                            fullWidth
                            multiline
                            rows={4}
                            variant="outlined"
                            value={originalText}
                            placeholder="Enter your client's original testimonial here..."
                            sx={{ mb: 3 }}
                          />
                          <Button
                            variant="contained"
                            color="primary"
                            endIcon={<AutoAwesomeIcon />}
                            onClick={handleNext}
                            fullWidth
                            sx={{ py: 1.5 }}
                          >
                            Enhance Testimonial
                          </Button>
                        </Box>
                      </Fade>
                    )}
                    
                    {activeStep === 1 && (
                      <Fade in={activeStep === 1}>
                        <Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <AutoAwesomeIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
                            <Typography variant="subtitle2" color="primary.main">
                              AI-Enhanced Testimonial
                            </Typography>
                          </Box>
                          
                          <Paper 
                            elevation={0} 
                            sx={{ 
                              p: 2, 
                              mb: 3, 
                              bgcolor: 'rgba(93, 95, 239, 0.05)',
                              border: '1px solid rgba(93, 95, 239, 0.2)',
                              borderRadius: 2
                            }}
                          >
                            <Typography variant="body1">
                              {enhancedText}
                            </Typography>
                          </Paper>
                          
                          <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button
                              variant="outlined"
                              color="primary"
                              startIcon={<EditIcon />}
                              onClick={handleStep(0)}
                              sx={{ flexGrow: 1 }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="contained"
                              color="primary"
                              endIcon={<SendIcon />}
                              onClick={handleNext}
                              sx={{ flexGrow: 2 }}
                            >
                              Send for Approval
                            </Button>
                          </Box>
                        </Box>
                      </Fade>
                    )}
                    
                    {activeStep === 2 && (
                      <Fade in={activeStep === 2}>
                        <Box>
                          <Box 
                            sx={{ 
                              p: 3, 
                              mb: 3, 
                              bgcolor: 'rgba(76, 175, 80, 0.05)',
                              border: '1px solid rgba(76, 175, 80, 0.2)',
                              borderRadius: 2,
                              textAlign: 'center'
                            }}
                          >
                            <CheckCircleIcon sx={{ fontSize: 48, color: '#4CAF50', mb: 1 }} />
                            <Typography variant="h6" gutterBottom>
                              Testimonial Approved!
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                              Client-approved. Ready to post.
                            </Typography>
                          </Box>
                          
                          <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button
                              variant="outlined"
                              color="primary"
                              onClick={handleReset}
                              sx={{ flexGrow: 1 }}
                            >
                              Try Again
                            </Button>
                            <Button
                              variant="contained"
                              color="primary"
                              component={RouterLink}
                              to="/enhance"
                              sx={{ flexGrow: 2 }}
                            >
                              Create Your Own
                            </Button>
                          </Box>
                        </Box>
                      </Fade>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>


      {/* How It Works Section - Minimalist Style */}
      <Box sx={{ py: 10, bgcolor: '#F9F9F9' }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            align="center" 
            gutterBottom
            sx={{ 
              fontWeight: 800,
              fontSize: { xs: '2rem', md: '2.75rem' },
              color: '#3A3A3A',
              mb: 6
            }}
          >
            How It Works
          </Typography>
          
          <Grid container spacing={4} justifyContent="center">
            {steps.map((step, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Box sx={{ p: 3, height: '100%' }}>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    gutterBottom
                    sx={{ 
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      mb: 2
                    }}
                  >
                    <Box 
                      component="span" 
                      sx={{ 
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        bgcolor: '#B89B7D',
                        color: 'white',
                        mr: 2,
                        fontSize: '1rem'
                      }}
                    >
                      {index + 1}
                    </Box>
                    {step.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#666' }}>
                    {step.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonial Showcase Section - Minimalist Style */}
      <Box sx={{ py: 10, bgcolor: '#FFFFFF' }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            align="center" 
            gutterBottom
            sx={{ 
              fontWeight: 800,
              fontSize: { xs: '2rem', md: '2.75rem' },
              color: '#3A3A3A',
              mb: 2
            }}
          >
            Showcase Your Testimonials
          </Typography>
          <Typography 
            variant="subtitle1" 
            align="center" 
            sx={{ 
              color: '#666', 
              mb: 6, 
              maxWidth: 700, 
              mx: 'auto' 
            }}
          >
            Testy transforms basic client feedback into professional testimonials ready for any platform.
          </Typography>
          
          <TestimonialGallery testimonials={exampleTestimonials} />
          
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button 
              variant="contained" 
              color="primary"
              size="large"
              component={RouterLink}
              to={user ? "/enhance" : "/signup"}
              state={!user ? { from: { pathname: "/enhance" } } : undefined}
              onClick={() => !user && toast.success('Sign up for free to get started')}
              sx={{ 
                px: 4, 
                py: 1.5,
                borderRadius: 2,
                fontSize: '1rem',
                fontWeight: 600,
                boxShadow: 'none',
                textTransform: 'none'
              }}
            >
              Get Started Free
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Pricing Section */}
      <Box sx={{ py: 10, bgcolor: '#F9F9F9' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 700,
                mb: 2
              }}
            >
              Simple, Transparent Pricing
            </Typography>
            
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'text.secondary',
                maxWidth: 700,
                mx: 'auto'
              }}
            >
              Start for free, upgrade when you need more power
            </Typography>
          </Box>
          
          <Grid container spacing={4} justifyContent="center">
            {/* Free Plan */}
            <Grid item xs={12} md={5}>
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
                    <Typography variant="subtitle1" color="text.secondary" component="span">
                      forever
                    </Typography>
                  </Box>
                  
                  <Typography color="text.secondary" sx={{ mb: 3 }}>
                    Perfect for trying out Testy
                  </Typography>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <List>
                    <ListItem disableGutters>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircleIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="5 AI-enhanced testimonials" />
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
                      <ListItemText primary="Basic exports (Text)" />
                    </ListItem>
                    <ListItem disableGutters>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircleIcon color="primary" />
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
                    onClick={handleGetStarted}
                  >
                    Get Started
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            
            {/* Premium Plan */}
            <Grid item xs={12} md={5}>
              <Card 
                elevation={0}
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  borderRadius: 3,
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  position: 'relative',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.08)'
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    bgcolor: 'secondary.main',
                    color: 'secondary.contrastText',
                    py: 0.5,
                    px: 2,
                    borderRadius: 1,
                    fontSize: '0.75rem',
                    fontWeight: 600
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
                      $19
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="span">
                      /month
                    </Typography>
                  </Box>
                  
                  <Typography color="text.secondary" sx={{ mb: 3 }}>
                    Get unlimited AI-enhanced testimonials
                  </Typography>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <List>
                    <ListItem disableGutters>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircleIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Unlimited testimonials" />
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
                </CardContent>
                
                <CardActions sx={{ p: 3, pt: 0 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => handlePricingClick('premium')}
                  >
                    Upgrade Now
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section - Minimalist Style */}
      <Box sx={{ py: 10, bgcolor: '#FFFFFF' }}>
        <Container maxWidth="md">
          <Box 
            sx={{ 
              p: { xs: 4, md: 6 },
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 4,
              border: '1px solid #B89B7D',
              background: 'linear-gradient(135deg, rgba(184, 155, 125, 0.05) 0%, rgba(184, 155, 125, 0.1) 100%)',
            }}
          >
            <Typography 
              variant="h3" 
              gutterBottom
              sx={{ 
                fontWeight: 800,
                fontSize: { xs: '1.75rem', md: '2.5rem' },
                color: '#3A3A3A'
              }}
            >
              Turn client feedback into sales
            </Typography>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                mb: 4, 
                color: '#666', 
                maxWidth: 600, 
                mx: 'auto' 
              }}
            >
              Join 2,347 businesses already using AI-enhanced testimonials to close deals 3.2x faster. Start free, upgrade when you're winning.
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Button 
                variant="contained" 
                color="primary"
                size="large"
                component={RouterLink}
                to={user ? "/enhance" : "/signup"}
                state={!user ? { from: { pathname: "/enhance" } } : undefined}
                onClick={() => !user && toast.success('Sign up for free to get started')}
                sx={{ 
                  px: 4, 
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: '1rem',
                  fontWeight: 600,
                  boxShadow: 'none',
                  textTransform: 'none'
                }}
              >
                Get Started Free
              </Button>
            </Box>
            
            <Typography 
              variant="subtitle2" 
              sx={{ 
                mt: 4, 
                fontStyle: 'italic',
                color: '#B89B7D',
                fontWeight: 500
              }}
            >
              P.S. Your clients already love you. They just suck at writing.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* FAQ Section - Minimalist Style */}
      <Box sx={{ py: 10, bgcolor: '#F9F9F9' }}>
        <Container maxWidth="md">
          <Typography 
            variant="h2" 
            align="center" 
            gutterBottom
            sx={{ 
              fontWeight: 800,
              fontSize: { xs: '2rem', md: '2.75rem' },
              color: '#3A3A3A',
              mb: 2
            }}
          >
            Frequently Asked Questions
          </Typography>
          <Typography 
            variant="subtitle1" 
            align="center" 
            sx={{ 
              color: '#666', 
              mb: 6, 
              maxWidth: 700, 
              mx: 'auto' 
            }}
          >
            Everything you need to know about Testy
          </Typography>
          
          <Accordion 
            elevation={0}
            sx={{ 
              mb: 2, 
              border: '1px solid rgba(0, 0, 0, 0.08)',
              borderRadius: '12px !important',
              '&:before': {
                display: 'none',
              },
              '&.Mui-expanded': {
                margin: '0 0 16px 0',
              }
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>How does the AI enhancement work?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" sx={{ color: '#666' }}>
                Our AI analyzes your client's original testimonial to identify key themes, outcomes, and emotional impacts. It then expands these elements into a compelling narrative that highlights the transformation and results while maintaining authenticity.
              </Typography>
            </AccordionDetails>
          </Accordion>
          
          <Accordion 
            elevation={0}
            sx={{ 
              mb: 2, 
              border: '1px solid rgba(0, 0, 0, 0.08)',
              borderRadius: '12px !important',
              '&:before': {
                display: 'none',
              },
              '&.Mui-expanded': {
                margin: '0 0 16px 0',
              }
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>Is client verification really necessary?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" sx={{ color: '#666' }}>
                Yes! Client verification ensures authenticity and builds trust with your audience. It also protects you legally by confirming your client approves the enhanced version. Our one-click verification makes this process seamless.
              </Typography>
            </AccordionDetails>
          </Accordion>
          
          <Accordion 
            elevation={0}
            sx={{ 
              mb: 2, 
              border: '1px solid rgba(0, 0, 0, 0.08)',
              borderRadius: '12px !important',
              '&:before': {
                display: 'none',
              },
              '&.Mui-expanded': {
                margin: '0 0 16px 0',
              }
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>Can I customize the enhanced testimonials?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" sx={{ color: '#666' }}>
                Absolutely. After the AI generates the enhanced version, you can edit it to match your brand voice or add specific details. The client will always verify the final version.
              </Typography>
            </AccordionDetails>
          </Accordion>
          
          <Accordion 
            elevation={0}
            sx={{ 
              mb: 2, 
              border: '1px solid rgba(0, 0, 0, 0.08)',
              borderRadius: '12px !important',
              '&:before': {
                display: 'none',
              },
              '&.Mui-expanded': {
                margin: '0 0 16px 0',
              }
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>What happens after the free plan limit?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" sx={{ color: '#666' }}>
                Once you reach the limit of 5 testimonials on the free plan, you'll need to upgrade to continue creating new enhanced testimonials. Your existing testimonials will remain accessible.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Container>
      </Box>

    </Box>
  );
};

export default HomePage; 
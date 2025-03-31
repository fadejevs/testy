import React, { useState, useRef, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  Paper,
  useTheme,
  Avatar,
  Chip,
  Fade,
  Divider,
  IconButton,
  useMediaQuery,
  TextField,
  Stepper,
  Step,
  StepLabel,
  StepButton,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import StarIcon from '@mui/icons-material/Star';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import VerifiedIcon from '@mui/icons-material/Verified';
import CelebrationOutlinedIcon from '@mui/icons-material/CelebrationOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { keyframes } from '@mui/system';
import clumsyDoodle from '../assets/clumsy.png';
import TestimonialGallery from '../components/testimonials/TestimonialGallery';
import { useAuth } from '../components/auth/AuthProvider';

const TestimonialMascot = ({ size = 'medium', color = 'primary' }) => {
  const theme = useTheme();
  const sizeMap = {
    small: { width: 40, height: 40, quoteSize: 'small' },
    medium: { width: 60, height: 60, quoteSize: 'medium' },
    large: { width: 80, height: 80, quoteSize: 'large' }
  };
  
  const dims = sizeMap[size];
  
  return (
    <Box
      sx={{
        position: 'relative',
        width: dims.width,
        height: dims.height,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Speech bubble shape */}
      <Box
        sx={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: theme => theme.palette[color].main,
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-10px',
            right: '10px',
            width: '20px',
            height: '20px',
            background: theme => theme.palette[color].main,
            borderRadius: '50%',
            transform: 'scale(0.5)'
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            bottom: '-18px',
            right: '0',
            width: '15px',
            height: '15px',
            background: theme => theme.palette[color].main,
            borderRadius: '50%',
            transform: 'scale(0.3)'
          }
        }}
      />
      
      {/* Quote icon */}
      <FormatQuoteIcon 
        sx={{ 
          position: 'absolute', 
          color: 'white',
          transform: 'rotate(180deg)',
          fontSize: dims.quoteSize === 'small' ? '1.5rem' : 
                   dims.quoteSize === 'medium' ? '2rem' : '2.5rem'
        }} 
      />
      
      {/* Eyes */}
      <Box
        sx={{
          position: 'absolute',
          top: '30%',
          left: '25%',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: 'white'
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '30%',
          right: '25%',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: 'white'
        }}
      />
      
      {/* Smile */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '30%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '20px',
          height: '10px',
          borderBottomLeftRadius: '10px',
          borderBottomRightRadius: '10px',
          border: '2px solid white',
          borderTop: 'none'
        }}
      />
    </Box>
  );
};

const TestimonialStarMascot = ({ size = 'medium', color = 'primary' }) => {
  const sizeMap = {
    small: { width: 40, height: 40 },
    medium: { width: 60, height: 60 },
    large: { width: 80, height: 80 }
  };
  
  const dims = sizeMap[size];
  
  return (
    <Box
      sx={{
        position: 'relative',
        width: dims.width,
        height: dims.height,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Star shape */}
      <StarIcon 
        sx={{ 
          position: 'absolute',
          width: '100%',
          height: '100%',
          color: theme => theme.palette[color].main,
          filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.2))'
        }} 
      />
      
      {/* Eyes */}
      <Box
        sx={{
          position: 'absolute',
          top: '35%',
          left: '30%',
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: 'white'
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '35%',
          right: '30%',
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: 'white'
        }}
      />
      
      {/* Smile */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '35%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '16px',
          height: '8px',
          borderBottomLeftRadius: '8px',
          borderBottomRightRadius: '8px',
          border: '2px solid white',
          borderTop: 'none'
        }}
      />
    </Box>
  );
};

const subtleShakeAnimation = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-2px); }
  50% { transform: translateX(0); }
  75% { transform: translateX(2px); }
  100% { transform: translateX(0); }
`;

const exampleTestimonials = [
  {
    name: "Sarah Johnson",
    title: "Marketing Director",
    company: "TechGrowth Inc.",
    text: "Working with this team transformed our entire marketing approach. We saw a 43% increase in qualified leads within just 30 days. Their strategic insights and execution were flawless."
  },
  {
    name: "Michael Chen",
    title: "Founder & CEO",
    company: "Startup Ventures",
    text: "As a startup founder, I was skeptical about investing in coaching. But this was the best decision I've made. My productivity doubled, and I secured funding within 3 months of implementing their strategies."
  },
  {
    name: "Jessica Williams",
    title: "Fitness Instructor",
    company: "Elevate Fitness",
    text: "The website they designed for my fitness business perfectly captures my brand essence. Client bookings increased by 78% in the first month, and I'm now fully booked with a waiting list!"
  }
];

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [originalScores, setOriginalScores] = useState({ emotional: 0, specificity: 0, credibility: 0 });
  const [enhancedScores, setEnhancedScores] = useState({ emotional: 0, specificity: 0, credibility: 0 });
  const [spotlightActive, setSpotlightActive] = useState(false);
  const [shakeEnhanceButton, setShakeEnhanceButton] = useState(false);
  const auth = useAuth();
  const user = auth?.user;
  
  const steps = [
    {
      title: "Submit raw testimonial",
      description: "Paste your client's original words, no matter how brief or bland they might be.",
      icon: <AutoAwesomeIcon />
    },
    {
      title: "Get AI-enhanced version",
      description: "Our AI extracts the transformation, emotion, and impact from your client's experience.",
      icon: <AutoAwesomeIcon />
    },
    {
      title: "One-click client approval",
      description: "Send a verification link to your client for instant approval with a single click.",
      icon: <VerifiedUserIcon />
    }
  ];
  
  const originalText = "The coaching was good. I learned some things that helped me.";
  const enhancedText = "Working with Sarah transformed my approach to challenges. I went from feeling stuck to landing two major clients in just 3 weeks. Her coaching didn't just teach me tactics—it changed my entire mindset about what's possible.";
  
  const handleStep = (step) => () => {
    setActiveStep(step);
    
    // Mark previous steps as completed
    const newCompleted = {...completed};
    for (let i = 0; i < step; i++) {
      newCompleted[i] = true;
    }
    setCompleted(newCompleted);
  };
  
  const handleNext = () => {
    const newCompleted = {...completed};
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  
  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
    setOriginalScores({ emotional: 0, specificity: 0, credibility: 0 });
    setEnhancedScores({ emotional: 0, specificity: 0, credibility: 0 });
    setSpotlightActive(false);
  };

  const getScoreColor = (score) => {
    if (score < 50) return 'error.main';
    if (score < 75) return 'warning.main';
    return 'success.main';
  };

  const handleTryDemo = () => {
    setSpotlightActive(true);
    
    // Shake the enhance button
    setShakeEnhanceButton(true);
    setTimeout(() => setShakeEnhanceButton(false), 1500);
    
    // Scroll to demo on mobile
    if (isMobile && demoRef.current) {
      demoRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }
    
    // Auto-dismiss spotlight after 3 seconds
    setTimeout(() => {
      setSpotlightActive(false);
    }, 3000);
  };

  const demoRef = useRef(null);

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Hero Section */}
      <Box 
        sx={{
          pt: { xs: 6, md: 8 },
          pb: { xs: 8, md: 10 },
          position: 'relative',
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {/* Background gradient */}
        <Box 
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(180deg, rgba(93, 95, 239, 0.05) 0%, rgba(93, 95, 239, 0) 100%)',
            zIndex: -1
          }}
        />
        
        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center' }}>
            {/* Left side - Hero text */}
            <Box sx={{ width: { xs: '100%', md: '50%' }, pr: { md: 6 }, mb: { xs: 6, md: 0 } }}>
              <Chip
                icon={<AutoAwesomeIcon />}
                label="AI-Powered Testimonials"
                sx={{ 
                  mb: 3, 
                  bgcolor: 'primary.light', 
                  color: 'primary.dark',
                  fontWeight: 600,
                  '& .MuiChip-icon': { color: 'primary.main' }
                }}
              />
              
              <Typography 
                variant="h2" 
                component="h1" 
                gutterBottom
                sx={{ 
                  fontWeight: 700,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  lineHeight: 1.2
                }}
              >
                Turn <Box component="span" sx={{ color: 'primary.main' }}>"It was good"</Box> into testimonials that sell
              </Typography>
              
              <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4, fontSize: '1.1rem' }}>
                Enhance bland client feedback into compelling stories that showcase your true impact—with AI that captures transformation, emotion, and results.
              </Typography>
              
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button 
                  variant="contained" 
                  color="primary"
                  size="large"
                  component={RouterLink}
                  to="/enhance"
                  sx={{ px: 3, py: 1.5 }}
                  endIcon={<ArrowForwardIcon />}
                >
                  Enhance a Testimonial
                </Button>

                
                
                <Button 
                  variant="outlined" 
                  color="primary"
                  size="large"
                  startIcon={<PlayArrowIcon />}
                  sx={{ px: 3, py: 1.5 }}
                  onClick={handleReset}
                >
                  Try Demo
                </Button>
              </Stack>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 4 }}>
                <Box sx={{ display: 'flex', mr: 1.5 }}>
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} sx={{ color: '#FFD700', fontSize: 20 }} />
                  ))}
                </Box>
                <Typography variant="body2" color="text.secondary">
                  <Box component="span" sx={{ fontWeight: 600, color: 'text.primary' }}>4.9/5</Box> from 200+ users
                </Typography>
              </Box>
            </Box>
            
          
            {/* Right side - Interactive Demo */}
            <Box 
              sx={{ 
                width: { xs: '100%', md: '50%' },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                mt: { xs: 2, md: 0 }
              }}
            >
              <Card 
                ref={demoRef}
                elevation={3}
                sx={{ 
                  width: '100%', 
                  maxWidth: 450,
                  borderRadius: 3,
                  overflow: 'visible',
                  bgcolor: '#FCFCFF',
                  p: 3,
                  borderRadius: 4,
                  boxShadow: spotlightActive ? '0 0 30px rgba(99, 102, 241, 0.6)' : '0 10px 40px rgba(0, 0, 0, 0.08)',
                  border: '1px solid rgba(99, 102, 241, 0.1)',
                  transition: 'all 0.5s ease',
                  transform: spotlightActive ? 'scale(1.05)' : 'scale(1)',
                  position: 'relative',
                  overflow: 'visible',
                  zIndex: spotlightActive ? 1200 : 1
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
                            <Typography variant="body2" color="text.secondary">
                              Your client has verified this testimonial and it's ready to use.
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
            </Box>
          </Box>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box sx={{ py: 10, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography 
              variant="h2" 
              gutterBottom
              sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(90deg, #5D5FEF 0%, #7879F1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              How It Works
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Transform bland testimonials into powerful stories in just three simple steps
            </Typography>
          </Box>
          
          <Grid container spacing={4} justifyContent="center">
            {steps.map((step, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card 
                  elevation={0}
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    borderRadius: 3,
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    textAlign: 'center',
                    p: 3
                  }}
                >
                  <Box 
                    sx={{ 
                      width: 80, 
                      height: 80, 
                      borderRadius: '50%', 
                      bgcolor: 'primary.light', 
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                      mx: 'auto'
                    }}
                  >
                    {step.icon}
                  </Box>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {step.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ flexGrow: 1 }}>
                    {step.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonial Showcase Section */}
      <Box 
        sx={{ 
          py: 10,
          background: 'linear-gradient(to bottom, #f8f9fa, #ffffff)'
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 700 }}>
            Showcase Your Testimonials
          </Typography>
          <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 6, maxWidth: 700, mx: 'auto' }}>
            Testy transforms basic client feedback into professional testimonials ready for any platform. 
            See how your testimonials can look with our different formats.
          </Typography>
          
          <TestimonialGallery testimonials={exampleTestimonials} />
          
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button 
              variant="contained" 
              color="primary"
              size="large"
              component={RouterLink}
              to={user ? "/enhance" : "/login"}
              state={!user ? { from: { pathname: "/enhance" } } : undefined}
              sx={{ px: 4, py: 1.5 }}
            >
              Create Your First Testimonial
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Pricing Section */}
      <Box 
        id="pricing" 
        sx={{ 
          py: 10,
          background: 'linear-gradient(to bottom, rgba(93, 95, 239, 0.05), rgba(93, 95, 239, 0))'
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 700 }}>
            Simple, transparent pricing
          </Typography>
          <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 6 }}>
            Start free, upgrade when you need more. No hidden fees.
          </Typography>
          
          <Grid container spacing={4} justifyContent="center">
            {/* Free Plan */}
            <Grid item xs={12} sm={6} md={4}>
              <Card 
                elevation={0}
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  position: 'relative',
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  borderRadius: 3,
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: theme.shadows[2]
                  }
                }}
              >
                <CardContent sx={{ p: 4, flexGrow: 1 }}>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Free
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h3" component="span">
                      $0
                    </Typography>
                    <Typography variant="subtitle1" component="span" color="text.secondary">
                      &nbsp;one-time
                    </Typography>
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Perfect for trying out Testy
                  </Typography>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <List sx={{ mb: 2 }}>
                    <ListItem sx={{ px: 0, py: 1 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircleIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="5 enhanced testimonials" />
                    </ListItem>
                    <ListItem sx={{ px: 0, py: 1 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircleIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Client verification" />
                    </ListItem>
                    <ListItem sx={{ px: 0, py: 1 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircleIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Basic export options" />
                    </ListItem>
                    <ListItem sx={{ px: 0, py: 1 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircleIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Email support" />
                    </ListItem>
                  </List>
                </CardContent>
                
                <Box sx={{ p: 3, pt: 0 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    component={RouterLink}
                    to="/enhance"
                    sx={{ py: 1.5 }}
                  >
                    Get Started
                  </Button>
                </Box>
              </Card>
            </Grid>
            
            {/* Pro Plan */}
            <Grid item xs={12} sm={6} md={4}>
              <Card 
                elevation={0}
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  position: 'relative',
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  borderRadius: 3,
                  border: `2px solid ${theme.palette.primary.main}`,
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: theme.shadows[6]
                  }
                }}
              >
                <Chip 
                  label="Most Popular" 
                  color="secondary"
                  sx={{ 
                    position: 'absolute',
                    top: -12,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontWeight: 600
                  }}
                />
                
                <CardContent sx={{ p: 4, flexGrow: 1 }}>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Pro
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h3" component="span">
                      $79
                    </Typography>
                    <Typography variant="subtitle1" component="span" color="text.secondary">
                      &nbsp;one-time
                    </Typography>
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    For growing businesses
                  </Typography>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <List sx={{ mb: 2 }}>
                    <ListItem sx={{ px: 0, py: 1 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircleIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Unlimited testimonials" />
                    </ListItem>
                    <ListItem sx={{ px: 0, py: 1 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircleIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Client verification" />
                    </ListItem>
                    <ListItem sx={{ px: 0, py: 1 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircleIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="All export options" />
                    </ListItem>
                    <ListItem sx={{ px: 0, py: 1 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircleIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Priority support" />
                    </ListItem>
                    <ListItem sx={{ px: 0, py: 1 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircleIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Remove Testy branding" />
                    </ListItem>
                  </List>
                </CardContent>
                
                <Box sx={{ p: 3, pt: 0 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    sx={{ py: 1.5 }}
                  >
                    Upgrade to Pro
                  </Button>
                </Box>
              </Card>
            </Grid>
            
            {/* Team Plan */}
            <Grid item xs={12} sm={6} md={4}>
              <Card 
                elevation={0}
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  position: 'relative',
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  borderRadius: 3,
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: theme.shadows[2]
                  }
                }}
              >
                <CardContent sx={{ p: 4, flexGrow: 1 }}>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Team
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h3" component="span">
                      $199
                    </Typography>
                    <Typography variant="subtitle1" component="span" color="text.secondary">
                      &nbsp;one-time
                    </Typography>
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    For agencies and teams
                  </Typography>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <List sx={{ mb: 2 }}>
                    <ListItem sx={{ px: 0, py: 1 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircleIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Everything in Pro" />
                    </ListItem>
                    <ListItem sx={{ px: 0, py: 1 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircleIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="5 team members" />
                    </ListItem>
                    <ListItem sx={{ px: 0, py: 1 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircleIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Client portal" />
                    </ListItem>
                    <ListItem sx={{ px: 0, py: 1 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircleIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="White-label solution" />
                    </ListItem>
                    <ListItem sx={{ px: 0, py: 1 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircleIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="API access" />
                    </ListItem>
                  </List>
                </CardContent>
                
                <Box sx={{ p: 3, pt: 0 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    sx={{ py: 1.5 }}
                  >
                    Contact Sales
                  </Button>
                </Box>
              </Card>
            </Grid>
          </Grid>
          
          {/* FAQ Section */}
          <Box sx={{ mt: 10, maxWidth: 800, mx: 'auto' }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 600 }}>
              Frequently Asked Questions
            </Typography>
            <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4 }}>
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
                <Typography variant="h6">How does the AI enhancement work?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" color="text.secondary">
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
                <Typography variant="h6">Is client verification really necessary?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" color="text.secondary">
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
                <Typography variant="h6">Can I customize the enhanced testimonials?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" color="text.secondary">
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
                <Typography variant="h6">What happens after the free plan limit?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" color="text.secondary">
                  Once you reach the limit of 5 testimonials on the free plan, you'll need to upgrade to continue creating new enhanced testimonials. Your existing testimonials will remain accessible.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box 
        sx={{ 
          py: 10,
          transition: 'all 0.5s ease',
          filter: spotlightActive ? 'blur(2px)' : 'none',
          opacity: spotlightActive ? 0.3 : 1
        }}
      >
        <Container maxWidth="md">
          <Card 
            sx={{ 
              p: { xs: 4, md: 6 },
              background: 'linear-gradient(135deg, #5D5FEF 0%, #7879F1 100%)',
              color: 'white',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 4
            }}
          >
            <Box 
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: 0.1,
                backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}
            />
            
            <Typography variant="h3" gutterBottom>
              Ready to transform your testimonials?
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 4, opacity: 0.9, maxWidth: 600, mx: 'auto' }}>
              Start free, no credit card required. Upgrade when you need more.
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Button 
                variant="contained" 
                color="secondary"
                size="large"
                component={RouterLink}
                to={user ? "/enhance" : "/login"}
                state={!user ? { from: { pathname: "/enhance" } } : undefined}
                sx={{ 
                  px: 4, 
                  py: 1.5,
                  bgcolor: 'white',
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                  }
                }}
              >
                Get Started Free
              </Button>
            </Box>
          </Card>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage; 
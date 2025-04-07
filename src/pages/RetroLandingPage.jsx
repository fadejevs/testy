import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Card,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAuth } from '../components/auth/AuthProvider';

const RetroLandingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const auth = useAuth();
  const user = auth?.user;
  
  // Color palette based on the retro design
  const colors = {
    background: '#FFF2D9', // Cream/beige background
    darkBlue: '#003A4F',   // Dark blue-green for text and accents
    orange: '#D84315',     // Orange for CTAs and highlights
    cream: '#FFF2D9',      // Cream for text on dark backgrounds
    green: '#4CAF50'       // Green for verification badges
  };
  
  // Features list
  const features = [
    "Transform vague praise into specific results",
    "Get client approval with one click",
    "Use on your website, proposals, and social media",
    "No design skills needed"
  ];

  return (
    <Box sx={{ overflow: 'hidden', bgcolor: colors.background }}>
      {/* Hero Section */}
      <Box 
        sx={{
          pt: { xs: 4, md: 6 },
          pb: { xs: 6, md: 8 },
          position: 'relative'
        }}
      >
        <Container maxWidth="lg">
          {/* Header/Logo area */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: { xs: 4, md: 6 }
          }}>
            <Typography 
              variant="h3" 
              component="h1" 
              sx={{ 
                fontWeight: 800, 
                color: colors.darkBlue,
                fontSize: { xs: '2.5rem', md: '3rem' },
                fontFamily: '"Playfair Display", serif'
              }}
            >
              Testy
            </Typography>
            
            <Button 
              variant="contained" 
              component={RouterLink}
              to={user ? "/enhance" : "/login"}
              sx={{ 
                bgcolor: colors.orange,
                color: 'white',
                fontWeight: 600,
                fontSize: '1.1rem',
                px: 3,
                py: 1.5,
                borderRadius: 2,
                boxShadow: '0px 4px 0px rgba(0,0,0,0.2)',
                '&:hover': {
                  bgcolor: '#BF360C',
                  transform: 'translateY(2px)',
                  boxShadow: '0px 2px 0px rgba(0,0,0,0.2)',
                }
              }}
            >
              Get Started
            </Button>
          </Box>
          
          {/* Main hero content */}
          <Box sx={{ maxWidth: { xs: '100%', md: '80%' }, mx: 'auto', textAlign: 'center' }}>
            <Typography 
              variant="h2" 
              component="h2" 
              sx={{ 
                fontWeight: 800,
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                lineHeight: 1.1,
                color: colors.orange,
                mb: 3,
                fontFamily: '"Playfair Display", serif'
              }}
            >
              Turn "It was good" into testimonials that sell
            </Typography>
            
            <Typography 
              variant="h6" 
              sx={{ 
                color: colors.darkBlue,
                mb: 4,
                fontWeight: 500,
                fontSize: { xs: '1rem', md: '1.25rem' }
              }}
            >
              Boring testimonials don't sell. Use AI to transform lukewarm feedback into persuasive social proof.
            </Typography>
            
            {/* Before/After Testimonial Example - Retro Style */}
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', md: 'row' },
              gap: 2,
              mb: 4,
              position: 'relative'
            }}>
              {/* "Before" testimonial */}
              <Box sx={{ 
                bgcolor: colors.darkBlue,
                color: colors.cream,
                p: 4,
                borderRadius: 3,
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '4px solid #002A3F',
                boxShadow: '8px 8px 0px rgba(0,0,0,0.2)',
                position: 'relative',
                zIndex: 1
              }}>
                <Typography variant="h3" sx={{ 
                  fontWeight: 700, 
                  fontStyle: 'italic',
                  fontFamily: '"Playfair Display", serif'
                }}>
                  "It was good."
                </Typography>
              </Box>
              
              {/* "After" testimonial - Retro style with illustration */}
              <Box sx={{ 
                bgcolor: colors.orange,
                color: 'white',
                p: 3,
                borderRadius: 3,
                flex: 2,
                position: 'relative',
                border: '4px solid #C13600',
                boxShadow: '8px 8px 0px rgba(0,0,0,0.2)',
                zIndex: 1
              }}>
                {/* Retro style verified badge */}
                <Box sx={{ 
                  position: 'absolute',
                  top: { xs: -20, md: 20 },
                  right: 20,
                  bgcolor: colors.darkBlue,
                  color: 'white',
                  px: 2,
                  py: 0.5,
                  borderRadius: 1,
                  transform: 'rotate(5deg)',
                  border: '2px solid #002A3F',
                  boxShadow: '2px 2px 0px rgba(0,0,0,0.2)',
                  zIndex: 2
                }}>
                  <Typography variant="body2" sx={{ 
                    fontWeight: 800,
                    letterSpacing: 1,
                    fontFamily: '"Courier New", monospace'
                  }}>
                    VERIFIED
                  </Typography>
                </Box>
                
                {/* Retro style illustration of a businessman */}
                <Box sx={{ 
                  position: 'absolute',
                  top: -30,
                  right: 60,
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  bgcolor: colors.orange,
                  border: '4px solid #C13600',
                  overflow: 'hidden',
                  zIndex: 2,
                  display: { xs: 'none', md: 'block' }
                }}>
                  {/* This would be replaced with an actual SVG illustration */}
                  <Box sx={{ 
                    width: '100%', 
                    height: '100%', 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Typography sx={{ fontSize: '3rem', transform: 'translateY(-5px)' }}>
                      😃
                    </Typography>
                  </Box>
                </Box>
                
                {/* Green verification checkmark */}
                <Box sx={{ 
                  position: 'absolute',
                  top: 10,
                  right: 180,
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  bgcolor: colors.green,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '3px solid #3D8B40',
                  zIndex: 3,
                  display: { xs: 'none', md: 'flex' }
                }}>
                  <Typography sx={{ color: 'white', fontWeight: 'bold' }}>✓</Typography>
                </Box>
                
                <Typography variant="h5" sx={{ 
                  fontWeight: 700, 
                  mb: 1,
                  mt: { xs: 0, md: 4 },
                  fontFamily: '"Playfair Display", serif'
                }}>
                  The coaching was great. I learned some things that helped me.
                </Typography>
                
                {/* Small retro illustration at bottom */}
                <Box sx={{ 
                  position: 'absolute',
                  bottom: -20,
                  right: 20,
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  bgcolor: colors.orange,
                  border: '3px solid #C13600',
                  display: { xs: 'none', md: 'flex' },
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 2
                }}>
                  <Typography sx={{ fontSize: '2rem', transform: 'translateY(-3px)' }}>
                    😊
                  </Typography>
                </Box>
              </Box>
            </Box>
            
            {/* CTA Button - Retro style */}
            <Button 
              variant="contained" 
              component={RouterLink}
              to={user ? "/enhance" : "/login"}
              sx={{ 
                bgcolor: colors.orange,
                color: 'white',
                fontWeight: 600,
                fontSize: '1.25rem',
                px: 4,
                py: 2,
                borderRadius: 2,
                width: '100%',
                maxWidth: 500,
                mb: 3,
                border: '4px solid #C13600',
                boxShadow: '0px 6px 0px rgba(0,0,0,0.2)',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: '#BF360C',
                  transform: 'translateY(2px)',
                  boxShadow: '0px 4px 0px rgba(0,0,0,0.2)',
                }
              }}
            >
              Fix My Testimonials Now
            </Button>
            
            {/* Rating - Retro style */}
            <Typography 
              variant="body1" 
              sx={{ 
                color: colors.darkBlue,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1
              }}
            >
              <Box component="span" sx={{ 
                display: 'inline-flex',
                color: colors.orange,
                fontWeight: 800
              }}>
                ★★★★★
              </Box>
              4.9/5 based on 200+ users
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Features Section - Retro Style */}
      <Box sx={{ py: 10, bgcolor: 'white' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography 
              variant="h2" 
              gutterBottom
              sx={{ 
                fontWeight: 700,
                color: colors.darkBlue,
                fontFamily: '"Playfair Display", serif'
              }}
            >
              How It Works
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              5-minute process = testimonials that drive 3x more sales
            </Typography>
          </Box>
          
          <Grid container spacing={4} justifyContent="center">
            {/* Step 1 */}
            <Grid item xs={12} md={4}>
              <Card 
                elevation={0}
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  borderRadius: 3,
                  border: '3px solid rgba(0, 0, 0, 0.1)',
                  textAlign: 'center',
                  p: 3,
                  position: 'relative',
                  overflow: 'visible',
                  boxShadow: '6px 6px 0px rgba(0,0,0,0.1)'
                }}
              >
                <Box sx={{ 
                  position: 'absolute',
                  top: -20,
                  left: 20,
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  bgcolor: colors.darkBlue,
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  border: '3px solid #002A3F'
                }}>
                  1
                </Box>
                
                <Box 
                  sx={{ 
                    width: 100, 
                    height: 100, 
                    borderRadius: '50%', 
                    bgcolor: colors.darkBlue, 
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                    mx: 'auto',
                    border: '4px solid #002A3F'
                  }}
                >
                  <Typography sx={{ fontSize: '3rem' }}>📝</Typography>
                </Box>
                
                <Typography variant="h5" component="h3" gutterBottom sx={{ 
                  color: colors.darkBlue,
                  fontFamily: '"Playfair Display", serif'
                }}>
                  Paste any client feedback
                </Typography>
                
                <Typography variant="body1" color="text.secondary" sx={{ flexGrow: 1 }}>
                  Even a 6-word text message becomes gold. Our AI works with everything from quick DMs to rambling emails.
                </Typography>
              </Card>
            </Grid>
            
            {/* Step 2 */}
            <Grid item xs={12} md={4}>
              <Card 
                elevation={0}
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  borderRadius: 3,
                  border: '3px solid rgba(0, 0, 0, 0.1)',
                  textAlign: 'center',
                  p: 3,
                  bgcolor: colors.cream,
                  position: 'relative',
                  overflow: 'visible',
                  boxShadow: '6px 6px 0px rgba(0,0,0,0.1)',
                  zIndex: 1,
                  transform: 'scale(1.05)'
                }}
              >
                <Box sx={{ 
                  position: 'absolute',
                  top: -20,
                  left: 20,
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  bgcolor: colors.orange,
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  border: '3px solid #C13600'
                }}>
                  2
                </Box>
                
                <Box 
                  sx={{ 
                    width: 100, 
                    height: 100, 
                    borderRadius: '50%', 
                    bgcolor: colors.orange, 
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                    mx: 'auto',
                    border: '4px solid #C13600'
                  }}
                >
                  <Typography sx={{ fontSize: '3rem' }}>✨</Typography>
                </Box>
                
                <Typography variant="h5" component="h3" gutterBottom sx={{ 
                  color: colors.darkBlue,
                  fontFamily: '"Playfair Display", serif'
                }}>
                  Watch AI extract pure gold
                </Typography>
                
                <Typography variant="body1" color="text.secondary" sx={{ flexGrow: 1 }}>
                  See vague praise become specific: "43% more sales in 30 days", "Closed 6-figure deal within week 3".
                </Typography>
              </Card>
            </Grid>
            
            {/* Step 3 */}
            <Grid item xs={12} md={4}>
              <Card 
                elevation={0}
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  borderRadius: 3,
                  border: '3px solid rgba(0, 0, 0, 0.1)',
                  textAlign: 'center',
                  p: 3,
                  position: 'relative',
                  overflow: 'visible',
                  boxShadow: '6px 6px 0px rgba(0,0,0,0.1)'
                }}
              >
                <Box sx={{ 
                  position: 'absolute',
                  top: -20,
                  left: 20,
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  bgcolor: colors.darkBlue,
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  border: '3px solid #002A3F'
                }}>
                  3
                </Box>
                
                <Box 
                  sx={{ 
                    width: 100, 
                    height: 100, 
                    borderRadius: '50%', 
                    bgcolor: colors.darkBlue, 
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                    mx: 'auto',
                    border: '4px solid #002A3F'
                  }}
                >
                  <Typography sx={{ fontSize: '3rem' }}>✅</Typography>
                </Box>
                
                <Typography variant="h5" component="h3" gutterBottom sx={{ 
                  color: colors.darkBlue,
                  fontFamily: '"Playfair Display", serif'
                }}>
                  Get instant client approval
                </Typography>
                
                <Typography variant="body1" color="text.secondary" sx={{ flexGrow: 1 }}>
                  Your client gets a beautiful page and approves with one tap. 94% approval rate, average response time: 47 minutes.
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section - Retro Style */}
      <Box sx={{ py: 10, bgcolor: colors.cream }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h3" 
                gutterBottom 
                sx={{ 
                  fontWeight: 700, 
                  color: colors.darkBlue,
                  fontFamily: '"Playfair Display", serif'
                }}
              >
                Testimonials that actually convert visitors
              </Typography>
              
              <Typography variant="body1" paragraph sx={{ color: colors.darkBlue, mb: 4 }}>
                Most testimonials are too vague to be believable. Our AI transforms generic praise into specific, persuasive stories that build trust and drive sales.
              </Typography>
              
              <Box sx={{ mb: 4 }}>
                {features.map((feature, index) => (
                  <Box 
                    key={index} 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      mb: 2,
                      gap: 2
                    }}
                  >
                    <Box sx={{ 
                      width: 30, 
                      height: 30, 
                      borderRadius: '50%', 
                      bgcolor: colors.orange,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      border: '2px solid #C13600'
                    }}>
                      <CheckCircleIcon sx={{ color: 'white', fontSize: '1rem' }} />
                    </Box>
                    <Typography variant="h6" sx={{ color: colors.darkBlue }}>
                      {feature}
                    </Typography>
                  </Box>
                ))}
              </Box>
              
              <Button 
                variant="contained" 
                component={RouterLink}
                to={user ? "/enhance" : "/login"}
                sx={{ 
                  bgcolor: colors.orange,
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  border: '3px solid #C13600',
                  boxShadow: '0px 4px 0px rgba(0,0,0,0.2)',
                  '&:hover': {
                    bgcolor: '#BF360C',
                    transform: 'translateY(2px)',
                    boxShadow: '0px 2px 0px rgba(0,0,0,0.2)',
                  }
                }}
              >
                Try It Free
              </Button>
            </Grid>
            
            <Grid item xs={12} md={6}>
              {/* Example testimonial showcase - Retro style */}
              <Box sx={{ 
                position: 'relative',
                p: 2
              }}>
                <Card sx={{ 
                  p: 3,
                  borderRadius: 3,
                  border: '4px solid #C13600',
                  bgcolor: colors.orange,
                  color: 'white',
                  boxShadow: '8px 8px 0px rgba(0,0,0,0.2)',
                  position: 'relative',
                  zIndex: 2
                }}>
                  <Box sx={{ 
                    position: 'absolute',
                    top: -15,
                    right: 20,
                    bgcolor: colors.green,
                    color: 'white',
                    px: 2,
                    py: 0.5,
                    borderRadius: 1,
                    transform: 'rotate(5deg)',
                    border: '2px solid #3D8B40',
                    boxShadow: '2px 2px 0px rgba(0,0,0,0.2)',
                    zIndex: 3
                  }}>
                    <Typography variant="body2" sx={{ 
                      fontWeight: 800,
                      letterSpacing: 1,
                      fontFamily: '"Courier New", monospace'
                    }}>
                      VERIFIED
                    </Typography>
                  </Box>
                  
                  <Typography variant="h5" sx={{ 
                    fontWeight: 700, 
                    mb: 2,
                    fontFamily: '"Playfair Display", serif'
                  }}>
                    "Working with Sarah transformed my approach to challenges. I went from feeling stuck to landing two major clients in just 3 weeks."
                  </Typography>
                  
                  <Box sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2
                  }}>
                    <Box sx={{ 
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      bgcolor: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px solid #C13600'
                    }}>
                      <Typography sx={{ fontSize: '1.5rem' }}>👨</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 700 }}>
                        Michael Chen
                      </Typography>
                      <Typography variant="body2">
                        Founder & CEO, Startup Ventures
                      </Typography>
                    </Box>
                  </Box>
                </Card>
                
                {/* Decorative elements */}
                <Box sx={{ 
                  position: 'absolute',
                  top: -20,
                  left: -20,
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  bgcolor: colors.darkBlue,
                  zIndex: 1,
                  border: '4px solid #002A3F',
                  display: { xs: 'none', md: 'block' }
                }} />
                
                <Box sx={{ 
                  position: 'absolute',
                  bottom: -15,
                  right: -15,
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  bgcolor: colors.darkBlue,
                  zIndex: 1,
                  border: '4px solid #002A3F',
                  display: { xs: 'none', md: 'block' }
                }} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section - Retro Style */}
      <Box sx={{ py: 10, bgcolor: 'white' }}>
        <Container maxWidth="md">
          <Card 
            sx={{ 
              p: { xs: 4, md: 6 },
              background: colors.orange,
              color: 'white',
              textAlign: 'center',
              position: 'relative',
              overflow: 'visible',
              borderRadius: 4,
              border: '4px solid #C13600',
              boxShadow: '10px 10px 0px rgba(0,0,0,0.2)'
            }}
          >
            {/* Decorative elements */}
            <Box sx={{ 
              position: 'absolute',
              top: -30,
              left: -20,
              width: 80,
              height: 80,
              borderRadius: '50%',
              bgcolor: colors.darkBlue,
              border: '4px solid #002A3F',
              display: { xs: 'none', md: 'block' },
              zIndex: 1
            }} />
            
            <Box sx={{ 
              position: 'absolute',
              bottom: -20,
              right: -20,
              width: 60,
              height: 60,
              borderRadius: '50%',
              bgcolor: colors.darkBlue,
              border: '4px solid #002A3F',
              display: { xs: 'none', md: 'block' },
              zIndex: 1
            }} />
            
            <Typography variant="h3" gutterBottom sx={{ 
              fontWeight: 700,
              fontFamily: '"Playfair Display", serif',
              position: 'relative',
              zIndex: 2
            }}>
              Turn 5 minutes into $47,000 in new sales
            </Typography>
            
            <Typography variant="subtitle1" sx={{ 
              mb: 4, 
              opacity: 0.9, 
              maxWidth: 600, 
              mx: 'auto',
              position: 'relative',
              zIndex: 2
            }}>
              Join 2,347 businesses already using AI-enhanced testimonials to close deals 3.2x faster. Start free, upgrade when you're winning.
            </Typography>
            
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: 2, 
              flexWrap: 'wrap',
              position: 'relative',
              zIndex: 2
            }}>
              <Button 
                variant="contained" 
                size="large"
                component={RouterLink}
                to={user ? "/enhance" : "/login"}
                state={!user ? { from: { pathname: "/enhance" } } : undefined}
                sx={{ 
                  px: 4, 
                  py: 1.5,
                  bgcolor: 'white',
                  color: colors.orange,
                  fontWeight: 700,
                  border: '3px solid rgba(0,0,0,0.1)',
                  boxShadow: '0px 4px 0px rgba(0,0,0,0.2)',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                    transform: 'translateY(2px)',
                    boxShadow: '0px 2px 0px rgba(0,0,0,0.2)',
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

export default RetroLandingPage; 
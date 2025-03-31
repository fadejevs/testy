import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  InputAdornment,
  IconButton
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../components/auth/AuthProvider';
import EmailIcon from '@mui/icons-material/Email';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  
  // Get the page user was trying to access
  const from = location.state?.from?.pathname || '/dashboard';
  
  const handleSendMagicLink = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // For development, just use the demo login
      if (process.env.NODE_ENV === 'development') {
        // Simulate a delay
        await new Promise(resolve => setTimeout(resolve, 800));
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        navigate(from);
        return;
      }
      
      const { success, error } = await login(email);
      
      if (!success) throw error;
      
      setSent(true);
    } catch (err) {
      console.error('Login error:', err);
      setError('Failed to send magic link. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // For demo purposes only
  const handleVerifyDemo = () => {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
    navigate(from);
  };
  
  console.log("LoginPage rendering");
  
  return (
    <Box 
      sx={{ 
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        py: 8,
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)'
      }}
    >
      <Container maxWidth="sm">
        <Card 
          elevation={3} 
          sx={{ 
            borderRadius: 3,
            overflow: 'hidden',
          }}
        >
          <Box 
            sx={{ 
              p: 3, 
              background: 'linear-gradient(90deg, #6366F1 0%, #818CF8 100%)',
              color: 'white'
            }}
          >
            <Typography variant="h4" fontWeight="bold">
              Welcome to Testy
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
              Transform bland testimonials into powerful stories
            </Typography>
          </Box>
          
          <CardContent sx={{ p: 4 }}>
            {!sent ? (
              <>
                <Typography variant="h5" gutterBottom>
                  Sign in
                </Typography>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  We'll send you a magic link to your email
                </Typography>
                
                {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
                
                <form onSubmit={handleSendMagicLink}>
                  <TextField
                    fullWidth
                    label="Email address"
                    variant="outlined"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    sx={{ mb: 3 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                  
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={loading}
                    sx={{ py: 1.5 }}
                  >
                    {loading ? (
                      <>
                        <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
                        Sending...
                      </>
                    ) : (
                      'Send Magic Link'
                    )}
                  </Button>
                </form>
              </>
            ) : (
              <>
                <Box sx={{ textAlign: 'center', mb: 3 }}>
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
                      mx: 'auto',
                      mb: 2
                    }}
                  >
                    <EmailIcon sx={{ fontSize: 40 }} />
                  </Box>
                  
                  <Typography variant="h5" gutterBottom>
                    Check your email
                  </Typography>
                  
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    We've sent a login link to <strong>{email}</strong>
                  </Typography>
                  
                  {process.env.NODE_ENV === 'development' && (
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={handleVerifyDemo}
                      sx={{ py: 1.5 }}
                    >
                      Demo: Click to simulate email link
                    </Button>
                  )}
                </Box>
              </>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default LoginPage; 
import React, { useState } from 'react';
import { Box, Button, Typography, Divider, CircularProgress } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';

// In a real app, you'd import and initialize Firebase here
// import { initializeApp } from "firebase/app";
// import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const FirebaseAuth = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  // Get the page user was trying to access
  const from = location.state?.from?.pathname || '/dashboard';
  
  const handleGoogleSignIn = async () => {
    setLoading(true);
    
    try {
      // In a real app with Firebase:
      // const provider = new GoogleAuthProvider();
      // const auth = getAuth();
      // const result = await signInWithPopup(auth, provider);
      
      // For demo purposes:
      await new Promise(resolve => setTimeout(resolve, 1500));
      login('demo@example.com');
      navigate(from);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleGithubSignIn = async () => {
    setLoading(true);
    
    try {
      // In a real app with Firebase:
      // const provider = new GithubAuthProvider();
      // const auth = getAuth();
      // const result = await signInWithPopup(auth, provider);
      
      // For demo purposes:
      await new Promise(resolve => setTimeout(resolve, 1500));
      login('demo@example.com');
      navigate(from);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Box>
      <Button
        fullWidth
        variant="outlined"
        startIcon={loading ? <CircularProgress size={20} /> : <GoogleIcon />}
        onClick={handleGoogleSignIn}
        disabled={loading}
        sx={{ mb: 2, py: 1.5 }}
      >
        Continue with Google
      </Button>
      
      <Button
        fullWidth
        variant="outlined"
        startIcon={loading ? <CircularProgress size={20} /> : <GitHubIcon />}
        onClick={handleGithubSignIn}
        disabled={loading}
        sx={{ py: 1.5 }}
      >
        Continue with GitHub
      </Button>
      
      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" color="text.secondary">
          OR
        </Typography>
      </Divider>
    </Box>
  );
};

export default FirebaseAuth; 
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Alert, CircularProgress } from '@mui/material';
import { supabase } from '../utils/supabaseClient';

const DirectSignupTest = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('Ready');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  
  const testSignup = async () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    setLoading(true);
    setStatus('Attempting signup...');
    setError(null);
    setUserData(null);
    
    try {
      // Direct signup with Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) throw error;
      
      setStatus('Signup successful!');
      setUserData(data);
      
      // Create user record in users table
      if (data.user) {
        const { error: insertError } = await supabase
          .from('users')
          .insert([{ 
            id: data.user.id, 
            email: data.user.email 
          }]);
        
        if (insertError) {
          setStatus('Signup successful, but failed to create user record');
          setError(insertError.message);
        } else {
          setStatus('Signup and user record creation successful!');
        }
      }
    } catch (err) {
      console.error('Signup error:', err);
      setStatus('Signup failed');
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };
  
  const testLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    setLoading(true);
    setStatus('Attempting login...');
    setError(null);
    setUserData(null);
    
    try {
      // Direct login with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      setStatus('Login successful!');
      setUserData(data);
    } catch (err) {
      console.error('Login error:', err);
      setStatus('Login failed');
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Direct Supabase Auth Test
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
      </Box>
      
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2">
          Status: {status}
        </Typography>
        {loading && <CircularProgress size={24} sx={{ ml: 2 }} />}
        {error && (
          <Alert severity="error" sx={{ mt: 1 }}>
            {error}
          </Alert>
        )}
        {userData && (
          <Box sx={{ mt: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
            <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
              {JSON.stringify(userData, null, 2)}
            </Typography>
          </Box>
        )}
      </Box>
      
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="contained" onClick={testSignup} disabled={loading}>
          Test Signup
        </Button>
        <Button variant="outlined" onClick={testLogin} disabled={loading}>
          Test Login
        </Button>
      </Box>
    </Paper>
  );
};

export default DirectSignupTest; 
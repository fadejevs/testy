import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Paper, Alert } from '@mui/material';
import { supabase } from '../utils/supabaseClient';

const SupabaseTest = () => {
  const [status, setStatus] = useState('Not tested');
  const [error, setError] = useState(null);
  const [envVars, setEnvVars] = useState({});
  
  useEffect(() => {
    // Check environment variables
    setEnvVars({
      SUPABASE_URL: process.env.REACT_APP_SUPABASE_URL ? 'Set ✓' : 'Not set ✗',
      SUPABASE_KEY: process.env.REACT_APP_SUPABASE_ANON_KEY ? 'Set ✓' : 'Not set ✗'
    });
  }, []);
  
  const testConnection = async () => {
    setStatus('Testing...');
    setError(null);
    
    try {
      // Test if we can connect to Supabase
      const { data, error } = await supabase.from('users').select('count()', { count: 'exact' });
      
      if (error) throw error;
      
      setStatus('Connection successful! Count: ' + data[0].count);
    } catch (err) {
      console.error('Supabase connection error:', err);
      setStatus('Connection failed');
      setError(err.message || 'Unknown error');
    }
  };
  
  const testAuth = async () => {
    setStatus('Testing auth...');
    setError(null);
    
    try {
      // Test if auth is working
      const { data, error } = await supabase.auth.getSession();
      
      if (error) throw error;
      
      setStatus('Auth check successful! Session: ' + (data.session ? 'Active' : 'None'));
    } catch (err) {
      console.error('Supabase auth error:', err);
      setStatus('Auth check failed');
      setError(err.message || 'Unknown error');
    }
  };
  
  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Supabase Connection Test
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2">
          Environment Variables:
        </Typography>
        <Typography variant="body2">
          SUPABASE_URL: {envVars.SUPABASE_URL}
        </Typography>
        <Typography variant="body2">
          SUPABASE_KEY: {envVars.SUPABASE_KEY}
        </Typography>
      </Box>
      
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2">
          Status: {status}
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mt: 1 }}>
            {error}
          </Alert>
        )}
      </Box>
      
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="outlined" onClick={testConnection}>
          Test Database
        </Button>
        <Button variant="outlined" onClick={testAuth}>
          Test Auth
        </Button>
      </Box>
    </Paper>
  );
};

export default SupabaseTest; 
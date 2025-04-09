import React from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import { supabase } from '../../utils/supabaseClient';

const DebugPanel = () => {
  const handleForceLogout = async () => {
    try {
      console.log("DEBUG: Force logout initiated");
      
      // Clear all storage
      localStorage.clear();
      sessionStorage.clear();
      
      // Sign out from Supabase
      await supabase.auth.signOut();
      
      console.log("DEBUG: Storage cleared, signed out from Supabase");
      
      // Force reload
      window.location.href = '/auth?forcedLogout=true';
    } catch (err) {
      console.error("Force logout error:", err);
    }
  };

  return (
    <Paper sx={{ p: 2, mt: 4, bgcolor: '#f8f9fa' }}>
      <Typography variant="h6" gutterBottom>
        Debug Tools
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Button 
          variant="outlined" 
          color="error" 
          onClick={handleForceLogout}
        >
          Force Complete Logout
        </Button>
        
        <Button 
          variant="outlined" 
          onClick={() => console.log("Current localStorage:", { ...localStorage })}
        >
          Log Storage to Console
        </Button>
      </Box>
    </Paper>
  );
};

export default DebugPanel; 
import React from 'react';
import { Button } from '@mui/material';
import { supabase } from '../../utils/supabaseClient';

const LogoutButton = ({ children, ...props }) => {
  const handleLogout = async () => {
    console.log("LogoutButton: Direct logout initiated");
    
    try {
      // First, clear all local storage
      localStorage.clear();
      sessionStorage.clear();
      
      // Then sign out with Supabase
      await supabase.auth.signOut();
      
      console.log("LogoutButton: Signed out successfully");
      
      // Force a complete page reload to the root URL
      // This is the most reliable way to reset the application state
      window.location.replace('/');
      
    } catch (error) {
      console.error("LogoutButton: Error during logout process:", error);
      // Even if there's an error, still try to redirect
      window.location.replace('/');
    }
  };

  return (
    <Button onClick={handleLogout} {...props}>
      {children || 'Logout'}
    </Button>
  );
};

export default LogoutButton; 
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Box, CircularProgress, Typography, Button } from '@mui/material';
import { supabase } from '../../utils/supabaseClient';
import { toast } from 'react-hot-toast';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [verificationTimeout, setVerificationTimeout] = useState(false);
  const [verificationAttempts, setVerificationAttempts] = useState(0);

  useEffect(() => {
    console.log("ProtectedRoute: Mounting component");
    let isMounted = true;
    
    // Set a timeout to show a retry button if verification takes too long
    const timeoutId = setTimeout(() => {
      if (isMounted) {
        console.log("ProtectedRoute: Verification timeout reached");
        setVerificationTimeout(true);
      }
    }, 5000); // 5 seconds timeout

    const checkSession = async () => {
      if (!isMounted) return;
      
      console.log("ProtectedRoute: Checking session directly with Supabase");
      try {
        // Get current session
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Session check error:", error);
          if (isMounted) setLoading(false);
          return;
        }
        
        console.log("Session data:", data);
        
        if (data.session) {
          console.log("User is authenticated:", data.session.user);
          if (isMounted) {
            setUser(data.session.user);
            setLoading(false);
          }
        } else {
          console.log("No active session found");
          if (isMounted) setLoading(false);
        }
      } catch (err) {
        console.error("Error checking session:", err);
        if (isMounted) setLoading(false);
      }
    };
    
    checkSession();
    
    // Set up auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed in ProtectedRoute:", event, session);
      if (!isMounted) return;
      
      if (session) {
        setUser(session.user);
      } else {
        setUser(null);
      }
      setLoading(false);
      clearTimeout(timeoutId);
    });
    
    return () => {
      console.log("ProtectedRoute: Unmounting component");
      isMounted = false;
      clearTimeout(timeoutId);
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const handleRetry = async () => {
    console.log("ProtectedRoute: Retrying verification");
    setLoading(true);
    setVerificationTimeout(false);
    setVerificationAttempts(prev => prev + 1);
    
    try {
      // Force refresh the session
      const { data, error } = await supabase.auth.refreshSession();
      
      if (error) {
        console.error("Session refresh error:", error);
        toast.error("Failed to refresh session. Please try logging in again.");
        return <Navigate to="/auth" state={{ from: location }} replace />;
      }
      
      if (data.session) {
        setUser(data.session.user);
      } else {
        return <Navigate to="/auth" state={{ from: location }} replace />;
      }
    } catch (err) {
      console.error("Error refreshing session:", err);
      toast.error("An error occurred. Please try logging in again.");
      return <Navigate to="/auth" state={{ from: location }} replace />;
    } finally {
      setLoading(false);
    }
  };

  const handleForceLogout = async () => {
    console.log("ProtectedRoute: Forcing logout");
    try {
      // Clear any local storage
      localStorage.clear();
      sessionStorage.clear();
      
      // Sign out from Supabase
      await supabase.auth.signOut();
      toast.success("Logged out successfully");
      
      // Force a full page reload to clear any cached state
      window.location.href = '/auth';
    } catch (err) {
      console.error("Error during forced logout:", err);
      toast.error("Error during logout");
      window.location.href = '/auth'; // Redirect anyway
    }
  };

  // If we've tried verification multiple times and still loading, force a logout
  useEffect(() => {
    if (verificationAttempts >= 3 && loading) {
      console.log("ProtectedRoute: Too many verification attempts, forcing logout");
      handleForceLogout();
    }
  }, [verificationAttempts, loading]);

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <CircularProgress size={40} />
        <Typography variant="body1" sx={{ mt: 2, mb: verificationTimeout ? 3 : 0 }}>
          Verifying your session...
        </Typography>
        
        {verificationTimeout && (
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button variant="contained" color="primary" onClick={handleRetry}>
              Retry Verification
            </Button>
            <Button variant="outlined" color="error" onClick={handleForceLogout}>
              Logout and Sign In Again
            </Button>
          </Box>
        )}
      </Box>
    );
  }

  if (!user) {
    console.log("User not authenticated, redirecting to auth page");
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  console.log("User authenticated, rendering protected content");
  return children;
};

export default ProtectedRoute; 
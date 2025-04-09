import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// import { supabase } from '../../lib/supabaseClient';
import { supabase } from '../../utils/supabaseClient';
import { toast } from 'react-hot-toast';
import { Button } from '@mui/material';

// Create context with default values
const AuthContext = createContext({
  user: null,
  loading: true,
  login: () => {},
  logout: () => {}
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log("AuthProvider useEffect running");
    
    // For development, check localStorage first
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userEmail = localStorage.getItem('userEmail');
    
    if (isLoggedIn && userEmail) {
      setUser({ email: userEmail });
      setLoading(false);
      return;
    }
    
    // Check if user is logged in with Supabase
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, session);
        if (session) {
          setUser(session.user);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );
    
    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session check:", session);
      if (session) {
        setUser(session.user);
      }
      setLoading(false);
    });
    
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);
  
  const login = async (email) => {
    try {
      // For development, use localStorage
      if (process.env.NODE_ENV === 'development') {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        setUser({ email });
        return { success: true };
      }
      
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin + '/dashboard'
        }
      });
      
      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Error sending magic link:', error);
      return { success: false, error };
    }
  };
  
  const handleLogout = async () => {
    try {
      console.log("AuthProvider: Attempting to log out...");
      
      // Set loading state
      setLoading(true);
      
      // Clear any local storage
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('supabase.auth.token');
      localStorage.removeItem('paymentFlow');
      
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Logout error:", error);
        toast.error("Failed to log out. Please try again.");
        throw error;
      }
      
      // Update state
      setUser(null);
      
      // Show success message
      toast.success("Successfully logged out");
      
      // Force a full page reload to clear any cached state
      window.location.href = '/auth';
    } catch (err) {
      console.error("Error during logout:", err);
      toast.error("Error during logout");
    } finally {
      setLoading(false);
    }
  };
  
  const handleForceLogout = async () => {
    try {
      // Clear all storage
      localStorage.clear();
      sessionStorage.clear();
      
      // Sign out from Supabase
      await supabase.auth.signOut();
      
      // Force reload
      window.location.href = '/auth?forcedLogout=true';
    } catch (err) {
      console.error("Force logout error:", err);
    }
  };
  
  const value = {
    user,
    loading,
    login,
    logout: handleLogout
  };
  
  console.log("AuthProvider rendering, user:", user);
  
  return (
    <AuthContext.Provider value={value}>
      {children}
      <Button 
        variant="outlined" 
        color="error" 
        onClick={handleForceLogout}
        sx={{ mt: 2 }}
      >
        Force Complete Logout
      </Button>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 
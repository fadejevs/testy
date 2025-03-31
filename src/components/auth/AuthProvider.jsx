import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

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
  
  const logout = async () => {
    try {
      // For development, clear localStorage
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userEmail');
      
      await supabase.auth.signOut();
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  
  const value = {
    user,
    loading,
    login,
    logout
  };
  
  console.log("AuthProvider rendering, user:", user);
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 
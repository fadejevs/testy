import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// Create the context
const AuthContext = createContext({
  user: null,
  loading: true,
  login: () => {},
  logout: () => {}
});

// Hook to use the auth context
export function useAuth() {
  return useContext(AuthContext);
}

// Provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // This function will be called when a user signs in
  const handleUserSignIn = async (user) => {
    if (!user) return;
    
    try {
      console.log("Handling user sign in:", user.email);
      // Check if this user already exists in our 'users' table
      const { data: existingUser, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (fetchError && fetchError.code !== 'PGRST116') {
        // PGRST116 is the error code for "no rows returned" - that's expected for new users
        console.error('Error checking if user exists:', fetchError);
        return;
      }
      
      // If user doesn't exist, create a new record
      if (!existingUser) {
        console.log('Creating new user record for:', user.email);
        
        const { error: insertError } = await supabase
          .from('users')
          .insert([{ 
            id: user.id, 
            email: user.email,
            created_at: new Date().toISOString(),
            is_paid: false,
            testimonial_limit: 5 // Default limit for free users
          }]);
        
        if (insertError) {
          console.error('Error creating user record:', insertError);
        }
      }
    } catch (err) {
      console.error('Error in handleUserSignIn:', err);
    }
  };

  // Handle redirects after authentication
  const handleAuthRedirect = (session) => {
    console.log("AuthContext: Handling redirect after authentication");
    
    // Check if we're in a payment flow
    const isPaymentFlow = localStorage.getItem('paymentFlow') === 'true';
    
    if (isPaymentFlow) {
      console.log("AuthContext: Redirecting to payment page");
      // Clear the payment flow flag to prevent redirect loops
      localStorage.removeItem('paymentFlow');
      // Redirect to payment page
      window.location.href = '/payment';
    } else {
      console.log("AuthContext: Redirecting to dashboard");
      // Default redirect to dashboard
      window.location.href = '/dashboard';
    }
  };

  useEffect(() => {
    console.log("AuthProvider: Initializing auth state...");
    
    // Check for existing session
    const checkSession = async () => {
      console.log("Checking for existing session...");
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        console.log("Found existing session, setting user");
        setUser(session.user);
      }
      setLoading(false);
    };
    
    checkSession();
    
    // Set up auth listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, session ? "SIGNED_IN" : "SIGNED_OUT");
        
        if (session) {
          console.log("User authenticated:", session.user);
          setUser(session.user);
        } else {
          console.log("User signed out");
          setUser(null);
        }
      }
    );
    
    return () => {
      console.log("Cleaning up auth listener");
      authListener?.subscription.unsubscribe();
    };
  }, []);

  // Sign up with email
  async function signup(email, password) {
    const { data, error } = await supabase.auth.signUp({ 
      email, 
      password 
    });
    
    if (error) throw error;
    
    // Create user record in our users table
    if (data.user) {
      const { error: dbError } = await supabase
        .from('users')
        .insert([{ id: data.user.id, email: data.user.email }]);
      
      if (dbError) throw dbError;
    }
    
    return data.user;
  }

  // Sign in with email
  async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ 
      email, 
      password 
    });
    
    if (error) throw error;
    
    // Update last login
    if (data.user) {
      await supabase
        .from('users')
        .update({ last_login: new Date() })
        .eq('id', data.user.id);
    }
    
    return data.user;
  }

  // Definitive logout function
  const logout = async () => {
    try {
      console.log("Logging out user...");
      
      // Clear all storage
      localStorage.clear();
      sessionStorage.clear();
      
      // Sign out from Supabase
      await supabase.auth.signOut();
      
      // Set user to null
      setUser(null);
      
      // Show success message
      toast.success("Logged out successfully");
      
      // Force a complete page reload to clear all state
      window.location.href = '/';
      
    } catch (error) {
      console.error("Error during logout:", error.message);
      toast.error(`Logout failed: ${error.message}`);
    }
  };

  // Mark user as paid
  async function markUserAsPaid(userId) {
    const { data, error } = await supabase
      .from('users')
      .update({ 
        is_paid: true, 
        payment_date: new Date(),
        testimonial_limit: 999999 // Unlimited
      })
      .eq('id', userId)
      .select();
    
    if (error) throw error;
    return data[0];
  }

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
    markUserAsPaid
  };
  
  console.log("AuthProvider rendering, user:", user);
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
} 
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

// Create the context
const AuthContext = createContext();

// Hook to use the auth context
export function useAuth() {
  return useContext(AuthContext);
}

// Provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const session = supabase.auth.session();
    setUser(session?.user || null);
    setLoading(false);

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  // Sign up with email
  async function signup(email, password) {
    const { user, error } = await supabase.auth.signUp({ email, password });
    
    if (error) throw error;
    
    // Create user record in our users table
    if (user) {
      const { error: dbError } = await supabase
        .from('users')
        .insert([{ id: user.id, email: user.email }]);
      
      if (dbError) throw dbError;
    }
    
    return user;
  }

  // Sign in with email
  async function login(email, password) {
    const { user, error } = await supabase.auth.signIn({ email, password });
    
    if (error) throw error;
    
    // Update last login
    if (user) {
      await supabase
        .from('users')
        .update({ last_login: new Date() })
        .eq('id', user.id);
    }
    
    return user;
  }

  // Sign out
  async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

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
    signup,
    login,
    logout,
    markUserAsPaid
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 
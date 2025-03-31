import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

// Hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // This would connect to your actual auth service
  useEffect(() => {
    // Simulate checking auth state
    const checkAuth = () => {
      // For demo, let's just set a mock user
      const user = localStorage.getItem('user');
      if (user) {
        setCurrentUser(JSON.parse(user));
      }
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  // Auth functions
  const login = (email, password) => {
    // This would be your actual login logic
    const mockUser = { id: '123', email, name: 'Demo User' };
    setCurrentUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    return Promise.resolve();
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
    return Promise.resolve();
  };

  const value = {
    currentUser,
    login,
    logout,
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 
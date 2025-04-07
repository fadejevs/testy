// Simple user storage utility for MVP
// In a production app, this would connect to a backend database

const USERS_KEY = 'testy_users';
const CURRENT_USER_KEY = 'testy_current_user';

// Get all users
export const getUsers = () => {
  const usersJson = localStorage.getItem(USERS_KEY);
  return usersJson ? JSON.parse(usersJson) : [];
};

// Save all users
const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Get current user
export const getCurrentUser = () => {
  const userJson = localStorage.getItem(CURRENT_USER_KEY);
  console.log('getCurrentUser called, found:', userJson);
  return userJson ? JSON.parse(userJson) : null;
};

// Set current user
export const setCurrentUser = (user) => {
  console.log('setCurrentUser called with:', user);
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  // Also set a flag for easier checking
  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('userEmail', user.email);
};

// Clear current user
export const clearCurrentUser = () => {
  console.log('clearCurrentUser called');
  localStorage.removeItem(CURRENT_USER_KEY);
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userEmail');
};

// Clear all users (for testing)
export const clearAllUsers = () => {
  localStorage.removeItem(USERS_KEY);
  localStorage.removeItem(CURRENT_USER_KEY);
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userEmail');
};

// Create a new user
export const createUser = (email) => {
  const users = getUsers();
  
  // Check if user already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return existingUser;
  }
  
  // Create new user
  const newUser = {
    id: `user_${Date.now()}`,
    email,
    createdAt: new Date().toISOString(),
    isPaid: false,
    testimonialLimit: 5,
    testimonialUsed: 0
  };
  
  // Save to "database"
  users.push(newUser);
  saveUsers(users);
  
  return newUser;
};

// Get user by email
export const getUserByEmail = (email) => {
  const users = getUsers();
  return users.find(user => user.email === email);
};

// Update user
export const updateUser = (userId, updates) => {
  const users = getUsers();
  const userIndex = users.findIndex(user => user.id === userId);
  
  if (userIndex === -1) return null;
  
  // Update user
  users[userIndex] = { ...users[userIndex], ...updates };
  saveUsers(users);
  
  // If this is the current user, update current user too
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.id === userId) {
    setCurrentUser(users[userIndex]);
  }
  
  return users[userIndex];
};

// Mark user as paid
export const markUserAsPaid = (userId) => {
  return updateUser(userId, {
    isPaid: true,
    testimonialLimit: 999999, // Unlimited testimonials
    paymentDate: new Date().toISOString()
  });
}; 
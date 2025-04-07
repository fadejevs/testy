import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  useMediaQuery,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useAuth } from '../../contexts/AuthContext';
import { getCurrentUser, clearCurrentUser } from '../../utils/userStorage';
import { toast } from 'react-hot-toast';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  
  // Use a more direct approach to check login status
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('isLoggedIn'));
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '');
  
  // Check login status on mount and when location changes
  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = !!localStorage.getItem('isLoggedIn');
      const email = localStorage.getItem('userEmail');
      
      console.log('Login status check:', { loggedIn, email });
      
      setIsLoggedIn(loggedIn);
      setUserEmail(email || '');
    };
    
    // Check immediately
    checkLoginStatus();
    
    // Set up an interval to check periodically
    const interval = setInterval(checkLoginStatus, 1000);
    
    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [location.pathname]);
  
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  
  const handleUserMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleLogout = () => {
    clearCurrentUser();
    setIsLoggedIn(false);
    setUserEmail('');
    handleUserMenuClose();
    toast.success('Logged out successfully');
    navigate('/');
  };
  
  const handleLogin = () => {
    navigate('/login');
    if (isMobile) {
      setDrawerOpen(false);
    }
  };
  
  const handleSignup = () => {
    navigate('/signup');
    if (isMobile) {
      setDrawerOpen(false);
    }
  };
  
  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setDrawerOpen(false);
    }
  };
  
  // Get first letter of email for avatar
  const getInitial = (email) => {
    return email ? email.charAt(0).toUpperCase() : 'U';
  };
  
  // Debug - log current login state
  console.log("Current login state:", { isLoggedIn, userEmail });
  
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Pricing', path: '/pricing' },
    ...(isLoggedIn ? [{ label: 'Dashboard', path: '/dashboard' }] : [])
  ];
  
  const drawer = (
    <Box sx={{ width: 250, p: 2 }} role="presentation">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" component={RouterLink} to="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
          <AutoAwesomeIcon sx={{ mr: 1, color: 'primary.main' }} />
          Testy
        </Typography>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      
      <Divider sx={{ mb: 2 }} />
      
      <List>
        {navItems.map((item) => (
          <ListItem 
            button 
            key={item.label} 
            onClick={() => handleNavigation(item.path)}
            sx={{ borderRadius: 1 }}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
      
      <Divider sx={{ my: 2 }} />
      
      {isLoggedIn ? (
        <Box>
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
              {getInitial(userEmail)}
            </Avatar>
            <Typography variant="body2" noWrap sx={{ maxWidth: 150 }}>
              {userEmail}
            </Typography>
          </Box>
          <Button 
            fullWidth 
            variant="outlined" 
            color="primary" 
            onClick={handleLogout}
          >
            Log Out
          </Button>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button 
            fullWidth 
            variant="contained" 
            color="primary" 
            onClick={handleSignup}
          >
            Sign Up
          </Button>
          <Button 
            fullWidth 
            variant="outlined" 
            color="primary" 
            onClick={handleLogin}
          >
            Log In
          </Button>
        </Box>
      )}
    </Box>
  );
  
  return (
    <AppBar position="sticky" color="default" elevation={0} sx={{ bgcolor: 'background.paper', borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <Typography 
            variant="h6" 
            component={RouterLink} 
            to="/" 
            sx={{ 
              textDecoration: 'none', 
              color: 'inherit',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <AutoAwesomeIcon sx={{ mr: 1, color: 'primary.main' }} />
            Testy
          </Typography>
          
          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {navItems.map((item) => (
                <Button 
                  key={item.label}
                  component={RouterLink}
                  to={item.path}
                  color="inherit"
                  sx={{ mx: 1 }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}
          
          {/* Auth Buttons or User Menu */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {isLoggedIn ? (
                <>
                  <Button
                    color="inherit"
                    onClick={handleUserMenuOpen}
                    startIcon={
                      <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                        {getInitial(userEmail)}
                      </Avatar>
                    }
                    sx={{ textTransform: 'none' }}
                  >
                    {userEmail.split('@')[0]}
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleUserMenuClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                  >
                    <MenuItem onClick={() => {
                      handleUserMenuClose();
                      navigate('/dashboard');
                    }}>
                      Dashboard
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Button 
                    color="inherit" 
                    component={RouterLink} 
                    to="/login"
                    sx={{ mr: 1 }}
                  >
                    Log In
                  </Button>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    component={RouterLink} 
                    to="/signup"
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </Box>
          )}
          
          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </Container>
      
      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar; 
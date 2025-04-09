import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Container,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  ListItemIcon,
  useMediaQuery,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import StarIcon from '@mui/icons-material/Star'; // Using star icon for the logo
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../utils/supabaseClient';

const Navbar = () => {
  const { user } = useAuth();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchorEl(null);
  };

  // Direct logout function with debugging
  const handleDirectLogout = async () => {
    console.log("Navbar: Direct logout initiated");
    try {
      // Close all menus
      handleCloseUserMenu();
      handleMobileMenuClose();
      
      // Clear all storage
      localStorage.clear();
      sessionStorage.clear();
      
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Supabase signOut error:", error);
      }
      
      console.log("Navbar: Signed out successfully, redirecting to /");
      
      // Force a complete page reload to the root URL using the most direct method
      window.location.href = '/';
      
      // As a fallback, set a timeout to force reload if the redirect doesn't happen
      setTimeout(() => {
        console.log("Forcing hard reload after timeout");
        window.location.replace('/');
      }, 500);
    } catch (error) {
      console.error("Navbar: Logout failed:", error);
      // Even if there's an error, still try to redirect
      window.location.href = '/';
    }
  };

  // Add a click handler to the menu item
  const handleLogoutClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log("Logout menu item clicked");
    handleDirectLogout();
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* Logo with Star Icon */}
          <RouterLink to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
              <StarIcon sx={{ color: 'primary.main', mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  fontWeight: 700,
                  color: 'primary.main',
                  textDecoration: 'none',
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                Testy
              </Typography>
            </Box>
          </RouterLink>

          {/* Desktop Navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              component={RouterLink}
              to="/"
              sx={{ my: 2, color: 'text.primary', display: 'block' }}
            >
              Home
            </Button>
            <Button
              component={RouterLink}
              to="/pricing"
              sx={{ my: 2, color: 'text.primary', display: 'block' }}
            >
              Pricing
            </Button>
          </Box>

          {/* Mobile Menu Button */}
          {isMobile && (
            <Box sx={{ flexGrow: 1 }}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleMobileMenuOpen}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          )}

          {/* Auth Button or User Menu */}
          {!user ? (
            <Button
              variant="contained"
              color="primary"
              component={RouterLink}
              to="/auth"
              startIcon={<LoginIcon />}
            >
              Login
            </Button>
          ) : (
            <Box>
              <IconButton
                onClick={handleOpenUserMenu}
                size="large"
                edge="end"
                aria-label="account menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <Avatar 
                  alt={user.email} 
                  src={user.user_metadata?.avatar_url || ''} 
                  sx={{ width: 32, height: 32 }}
                />
              </IconButton>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem component={RouterLink} to="/dashboard" onClick={handleCloseUserMenu}>
                  <ListItemIcon>
                    <DashboardIcon fontSize="small" />
                  </ListItemIcon>
                  <Typography textAlign="center">Dashboard</Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogoutClick}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>

      {/* Mobile Menu */}
      <Menu
        anchorEl={mobileMenuAnchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(mobileMenuAnchorEl)}
        onClose={handleMobileMenuClose}
      >
        <MenuItem component={RouterLink} to="/" onClick={handleMobileMenuClose}>
          Home
        </MenuItem>
        <MenuItem component={RouterLink} to="/pricing" onClick={handleMobileMenuClose}>
          Pricing
        </MenuItem>
        {user && (
          <MenuItem component={RouterLink} to="/dashboard" onClick={handleMobileMenuClose}>
            Dashboard
          </MenuItem>
        )}
        <Divider />
        {user ? (
          <MenuItem onClick={handleLogoutClick}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        ) : (
          <MenuItem component={RouterLink} to="/auth" onClick={handleMobileMenuClose}>
            <ListItemIcon>
              <LoginIcon fontSize="small" />
            </ListItemIcon>
            Login
          </MenuItem>
        )}
      </Menu>
    </AppBar>
  );
};

export default Navbar; 
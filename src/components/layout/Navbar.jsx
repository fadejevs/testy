import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useAuth } from '../auth/AuthProvider';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = React.useState(null);
  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchorEl(null);
  };
  
  const handleLogout = () => {
    logout();
    handleClose();
    handleMobileMenuClose();
  };
  
  const handleNavigate = (path) => {
    navigate(path);
    handleClose();
    handleMobileMenuClose();
  };
  
  return (
    <AppBar 
      position="sticky" 
      color="default" 
      elevation={0}
      sx={{ 
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box 
            component={RouterLink} 
            to="/" 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              textDecoration: 'none',
              color: 'primary.main',
              mr: 3
            }}
          >
            <AutoAwesomeIcon sx={{ mr: 1 }} />
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(90deg, #6366F1 0%, #818CF8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Testy
            </Typography>
          </Box>
          
          {!isMobile && (
            <Box sx={{ flexGrow: 1, display: 'flex' }}>
              <Button 
                component={RouterLink} 
                to="/" 
                color="inherit"
                sx={{ mx: 1 }}
              >
                Home
              </Button>
              <Button 
                component={RouterLink} 
                to="/pricing" 
                color="inherit"
                sx={{ mx: 1 }}
              >
                Pricing
              </Button>
              {user && (
                <Button 
                  component={RouterLink} 
                  to="/dashboard" 
                  color="inherit"
                  sx={{ mx: 1 }}
                >
                  Dashboard
                </Button>
              )}
            </Box>
          )}
          
          <Box sx={{ flexGrow: { xs: 1, md: 0 } }} />
          
          {isMobile && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMobileMenuOpen}
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          {user ? (
            <>
              <Button
                variant="contained"
                color="primary"
                component={RouterLink}
                to="/enhance"
                sx={{ 
                  display: { xs: 'none', md: 'flex' },
                  mr: 2
                }}
              >
                Create Testimonial
              </Button>
              
              <IconButton
                onClick={handleMenu}
                size="small"
                sx={{ ml: 1 }}
              >
                <Avatar 
                  sx={{ 
                    width: 32, 
                    height: 32,
                    bgcolor: 'primary.main'
                  }}
                >
                  {user.email ? user.email.charAt(0).toUpperCase() : 'U'}
                </Avatar>
              </IconButton>
              
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                PaperProps={{
                  elevation: 3,
                  sx: { 
                    mt: 1.5,
                    minWidth: 180,
                    borderRadius: 2
                  }
                }}
              >
                <MenuItem onClick={() => handleNavigate('/dashboard')}>
                  Dashboard
                </MenuItem>
                <MenuItem onClick={() => handleNavigate('/enhance')}>
                  Create Testimonial
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              variant="contained"
              color="primary"
              component={RouterLink}
              to="/login"
              sx={{ display: { xs: 'none', md: 'block' } }}
            >
              Sign In
            </Button>
          )}
          
          <Menu
            anchorEl={mobileMenuAnchorEl}
            open={Boolean(mobileMenuAnchorEl)}
            onClose={handleMobileMenuClose}
            PaperProps={{
              elevation: 3,
              sx: { 
                mt: 1.5,
                minWidth: 200,
                borderRadius: 2
              }
            }}
          >
            <MenuItem onClick={() => handleNavigate('/')}>
              Home
            </MenuItem>
            <MenuItem onClick={() => handleNavigate('/pricing')}>
              Pricing
            </MenuItem>
            
            {user ? (
              <>
                <MenuItem onClick={() => handleNavigate('/dashboard')}>
                  Dashboard
                </MenuItem>
                <MenuItem onClick={() => handleNavigate('/enhance')}>
                  Create Testimonial
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  Logout
                </MenuItem>
              </>
            ) : (
              <MenuItem onClick={() => handleNavigate('/login')}>
                Sign In
              </MenuItem>
            )}
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 
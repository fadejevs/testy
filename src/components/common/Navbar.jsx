import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const scrollToPricing = (event) => {
    event.preventDefault();
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      const yOffset = -80; // Adjust based on navbar height
      const y = pricingSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({top: y, behavior: 'smooth'});
    }
    handleClose(); // Close mobile menu if open
  };

  return (
    <AppBar position="static" color="default" elevation={0} sx={{ 
      backgroundColor: 'white',
      borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
    }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              fontWeight: 700,
              color: 'text.primary',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <AutoAwesomeIcon sx={{ mr: 1, color: 'primary.main' }} />
            Testy
          </Typography>

          {isMobile ? (
            <>
              <Box sx={{ flexGrow: 1 }} />
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem component={RouterLink} to="/" onClick={handleClose}>Home</MenuItem>
                <MenuItem onClick={scrollToPricing}>Pricing</MenuItem>
                <MenuItem component={RouterLink} to="/dashboard" onClick={handleClose}>Dashboard</MenuItem>
                <MenuItem component={RouterLink} to="/enhance" onClick={handleClose}>Create Testimonial</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Box sx={{ flexGrow: 1, display: 'flex', ml: 4 }}>
                <Button 
                  component={RouterLink} 
                  to="/"
                  sx={{ color: 'text.secondary', mr: 2 }}
                >
                  Home
                </Button>
                <Button 
                  onClick={scrollToPricing}
                  sx={{ color: 'text.secondary', mr: 2 }}
                >
                  Pricing
                </Button>
                <Button 
                  component={RouterLink} 
                  to="/dashboard"
                  sx={{ color: 'text.secondary' }}
                >
                  Dashboard
                </Button>
              </Box>
              <Button 
                variant="contained" 
                color="primary"
                component={RouterLink}
                to="/enhance"
              >
                Create Testimonial
              </Button>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 
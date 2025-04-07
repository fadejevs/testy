import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  LinearProgress,
  Divider,
  Menu,
  MenuItem
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import CancelIcon from '@mui/icons-material/Cancel';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from '../components/auth/AuthProvider';
import { supabase } from '../lib/supabaseClient';
import { getCurrentUser, clearCurrentUser, clearAllUsers } from '../utils/userStorage';
import UserSubscriptionStatus from '../components/user/UserSubscriptionStatus';
import { toast } from 'react-hot-toast';

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [testimonials, setTestimonials] = useState([]);
  const [userLimits, setUserLimits] = useState(null);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Get current user
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      try {
        // Fetch testimonials
        const { data: testimonialsData, error: testimonialsError } = await supabase
          .from('testimonials')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        
        if (testimonialsError) throw testimonialsError;
        
        // Fetch user limits
        const { data: limitsData, error: limitsError } = await supabase
          .from('user_limits')
          .select('*')
          .eq('user_id', user.id)
          .single();
        
        if (limitsError && limitsError.code !== 'PGRST116') throw limitsError;
        
        setTestimonials(testimonialsData || []);
        setUserLimits(limitsData || { testimonials_used: 0, testimonials_limit: 5, plan: 'free' });
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load your data. Please refresh the page.');
      }
    };
    
    fetchData();
  }, [user]);
  
  const handleCopyLink = (token) => {
    const link = `${window.location.origin}/verify/${token}`;
    navigator.clipboard.writeText(link);
    setCopySuccess('Link copied to clipboard!');
    setTimeout(() => setCopySuccess(''), 3000);
  };
  
  const getStatusChip = (status) => {
    switch (status) {
      case 'verified':
        return <Chip icon={<CheckCircleIcon />} label="Verified" color="success" size="small" />;
      case 'rejected':
        return <Chip icon={<CancelIcon />} label="Rejected" color="error" size="small" />;
      default:
        return <Chip icon={<PendingIcon />} label="Pending" color="warning" size="small" />;
    }
  };
  
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleLogout = () => {
    clearCurrentUser();
    toast.success('Logged out successfully');
    navigate('/');
  };
  
  const handleClearAllUsers = () => {
    if (window.confirm('Are you sure you want to clear all users? This is for testing only.')) {
      clearAllUsers();
      toast.success('All users cleared');
      navigate('/');
    }
  };
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (!user) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Please Sign In
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            You need to be signed in to view your dashboard
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/login"
            sx={{ mr: 2 }}
          >
            Sign In
          </Button>
          <Button
            variant="outlined"
            component={RouterLink}
            to="/signup"
          >
            Sign Up
          </Button>
        </Box>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4">
            Welcome, {user.email.split('@')[0]}
          </Typography>
          
          <IconButton onClick={handleMenuOpen}>
            <AccountCircleIcon fontSize="large" />
          </IconButton>
          
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
            <MenuItem onClick={handleClearAllUsers}>Clear All Users (Testing)</MenuItem>
          </Menu>
        </Box>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Manage your testimonials and account settings
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid rgba(0, 0, 0, 0.08)' }}>
              <Typography variant="h6" gutterBottom>
                Account Overview
              </Typography>
              
              <Divider sx={{ my: 2 }} />
              
              <UserSubscriptionStatus />
              
              <Box sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  component={RouterLink}
                  to="/enhance"
                  fullWidth
                >
                  Create New Testimonial
                </Button>
              </Box>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={8}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid rgba(0, 0, 0, 0.08)' }}>
              <Typography variant="h6" gutterBottom>
                Your Testimonials
              </Typography>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ py: 4, textAlign: 'center' }}>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  You haven't created any testimonials yet
                </Typography>
                
                <Button
                  variant="contained"
                  color="primary"
                  component={RouterLink}
                  to="/enhance"
                  sx={{ mt: 2 }}
                >
                  Create Your First Testimonial
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default DashboardPage; 
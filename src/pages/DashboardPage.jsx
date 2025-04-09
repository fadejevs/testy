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
import { Link as RouterLink, useNavigate, Navigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import CancelIcon from '@mui/icons-material/Cancel';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../utils/supabaseClient';
import { getCurrentUser, clearCurrentUser, clearAllUsers } from '../utils/userStorage';
import UserSubscriptionStatus from '../components/user/UserSubscriptionStatus';
import { toast } from 'react-hot-toast';
import DebugPanel from '../components/debug/DebugPanel';
import PremiumBadge from '../components/dashboard/PremiumBadge';

const DashboardPage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [sessionChecked, setSessionChecked] = useState(false);
  const [sessionUser, setSessionUser] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [userLimits, setUserLimits] = useState(null);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const [sessionChecking, setSessionChecking] = useState(true);
  const [data, setData] = useState(null);
  
  useEffect(() => {
    console.log("DashboardPage: Mounting component");
    
    const fetchDashboardData = async () => {
      try {
        console.log("DashboardPage: Checking session...");
        
        if (!user) {
          console.log("DashboardPage: No user found in context");
          setError("Please log in to view your dashboard");
          setLoading(false);
          return;
        }
        
        console.log("DashboardPage: User found, fetching data for:", user.email);
        
        // Try to fetch user data from Supabase
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .maybeSingle(); // Use maybeSingle() instead of single() to avoid errors when no rows are found
        
        if (userError && userError.code !== 'PGRST116') {
          // Handle errors other than "no rows found"
          console.error("Error fetching user data:", userError);
          throw userError;
        }
        
        if (!userData) {
          console.log("User not found in database, creating user record");
          
          // Create a basic user profile
          const newUserData = {
            id: user.id,
            email: user.email,
            name: user.user_metadata?.full_name || user.email.split('@')[0],
            created_at: new Date().toISOString()
          };
          
          // Insert the new user into the database
          const { data: insertedUser, error: insertError } = await supabase
            .from('users')
            .insert([newUserData])
            .select()
            .single();
          
          if (insertError) {
            console.error("Error creating user record:", insertError);
            // Still show the dashboard with basic data even if insert fails
            setData(newUserData);
          } else {
            console.log("Created new user record:", insertedUser);
            setData(insertedUser);
          }
        } else {
          console.log("DashboardPage: User data fetched:", userData);
          setData(userData);
        }
        
      } catch (err) {
        console.error("Dashboard error:", err);
        setError("Error loading dashboard data");
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
    
    return () => {
      console.log("DashboardPage: Unmounting component");
    };
  }, [user]);
  
  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      try {
        if (!user) {
          console.log("No user found, cannot fetch dashboard data");
          if (isMounted) {
            setError("Please log in to view your dashboard");
            setLoading(false);
          }
          return;
        }
        
        console.log("Fetching dashboard data for user:", user.email);
        
        // Simulate data fetching or fetch real data
        // For now, let's just set some dummy data after a delay
        setTimeout(() => {
          if (isMounted) {
            setData({
              name: user.user_metadata?.full_name || user.email,
              email: user.email,
              // Add other data as needed
            });
            setLoading(false);
          }
        }, 1000);
        
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        if (isMounted) {
          setError("Failed to load dashboard data");
          setLoading(false);
        }
      }
    };
    
    fetchData();
    
    return () => {
      isMounted = false;
    };
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

  const handleClearAllUsers = () => {
    if (window.confirm('Are you sure you want to clear all users? This is for testing only.')) {
      clearAllUsers();
      toast.success('All users cleared');
      navigate('/');
    }
  };
  
  const handleUpgradeClick = () => {
    // If user is already authenticated, go directly to payment
    if (user) {
      // Option 1: Go to payment page
      navigate('/payment');
      
      // Option 2 (alternative): Go directly to Stripe checkout
      // window.location.href = 'https://buy.stripe.com/test_7sI7tk9Go6sa3Go8wA';
    } else {
      // This shouldn't happen in a protected route, but just in case
      navigate('/signup', { 
        state: { 
          from: { pathname: '/payment' }
        } 
      });
    }
  };
  
  const handleDirectPayment = () => {
    // Show loading toast
    toast.loading('Preparing payment...', { id: 'payment-loading' });
    
    // Redirect directly to Stripe checkout
    window.location.href = 'https://buy.stripe.com/test_7sI7tk9Go6sa3Go8wA';
    
    // Note: The toast will be dismissed when the page unloads
  };
  
  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh' }}>
          <CircularProgress size={60} sx={{ mb: 4 }} />
          <Typography variant="h5" gutterBottom>
            Loading dashboard...
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Please wait while we fetch your data.
          </Typography>
        </Box>
      </Container>
    );
  }
  
  if (error) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh' }}>
          <Typography variant="h5" color="error" gutterBottom>
            {error}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Please try refreshing the page or contact support.
          </Typography>
        </Box>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {user && user.isPaid && <PremiumBadge user={user} />}
        
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        
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
        
        <Button
          variant="contained"
          color="primary"
          startIcon={<ShoppingCartIcon />}
          onClick={handleDirectPayment}
          sx={{ mt: 2 }}
        >
          Upgrade Account
        </Button>
      </Box>
    </Container>
  );
};

export default DashboardPage; 
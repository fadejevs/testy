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
  LinearProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import CancelIcon from '@mui/icons-material/Cancel';
import { useAuth } from '../components/auth/AuthProvider';
import { supabase } from '../lib/supabaseClient';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [testimonials, setTestimonials] = useState([]);
  const [userLimits, setUserLimits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState('');
  
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
      } finally {
        setLoading(false);
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
  
  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              Your Testimonials
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Manage and track all your enhanced testimonials
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, alignItems: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => navigate('/enhance')}
              disabled={userLimits && userLimits.testimonials_used >= userLimits.testimonials_limit}
            >
              New Testimonial
            </Button>
          </Grid>
        </Grid>
        
        {error && <Alert severity="error" sx={{ mb: 4 }}>{error}</Alert>}
        {copySuccess && <Alert severity="success" sx={{ mb: 4 }}>{copySuccess}</Alert>}
        
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Usage
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="body2" sx={{ flexGrow: 1 }}>
                {userLimits ? `${userLimits.testimonials_used} of ${userLimits.testimonials_limit} testimonials used` : 'Loading...'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {userLimits ? `${Math.round((userLimits.testimonials_used / userLimits.testimonials_limit) * 100)}%` : ''}
              </Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={userLimits ? (userLimits.testimonials_used / userLimits.testimonials_limit) * 100 : 0} 
            />
            
            {userLimits && userLimits.testimonials_used >= userLimits.testimonials_limit && (
              <Box sx={{ mt: 2 }}>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={() => navigate('/pricing')}
                >
                  Upgrade Plan
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
        
        {testimonials.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              No testimonials yet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Create your first enhanced testimonial to get started
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => navigate('/enhance')}
            >
              Create Testimonial
            </Button>
          </Paper>
        ) : (
          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Client</TableCell>
                  <TableCell>Testimonial</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {testimonials.map((testimonial) => (
                  <TableRow key={testimonial.id}>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        {testimonial.client_name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.client_company}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {testimonial.enhanced_testimonial}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {getStatusChip(testimonial.status)}
                    </TableCell>
                    <TableCell>
                      {testimonial.status === 'pending' && (
                        <Tooltip title="Copy verification link">
                          <IconButton 
                            size="small" 
                            onClick={() => handleCopyLink(testimonial.verification_token)}
                          >
                            <ContentCopyIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Container>
  );
};

export default DashboardPage; 
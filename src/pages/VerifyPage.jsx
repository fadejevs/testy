import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  CircularProgress,
  Alert,
  Divider
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { supabase } from '../lib/supabaseClient';

const VerifyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [testimonial, setTestimonial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState('');
  const [verified, setVerified] = useState(false);
  const [rejected, setRejected] = useState(false);
  
  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .eq('verification_token', id)
          .single();
        
        if (error) throw error;
        
        if (data.status !== 'pending') {
          // Already verified or rejected
          if (data.status === 'verified') {
            setVerified(true);
          } else if (data.status === 'rejected') {
            setRejected(true);
          }
        }
        
        setTestimonial(data);
      } catch (err) {
        console.error('Error fetching testimonial:', err);
        setError('Invalid or expired verification link.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTestimonial();
  }, [id]);
  
  const handleVerify = async (approve) => {
    setVerifying(true);
    
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({ status: approve ? 'verified' : 'rejected' })
        .eq('verification_token', id);
      
      if (error) throw error;
      
      if (approve) {
        setVerified(true);
      } else {
        setRejected(true);
      }
    } catch (err) {
      console.error('Error verifying testimonial:', err);
      setError('Failed to process your response. Please try again.');
    } finally {
      setVerifying(false);
    }
  };
  
  if (loading) {
    return (
      <Container maxWidth="md">
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }
  
  if (error) {
    return (
      <Container maxWidth="md">
        <Box sx={{ py: 8 }}>
          <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: '1px solid rgba(0, 0, 0, 0.08)', textAlign: 'center' }}>
            <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
            <Button variant="contained" color="primary" onClick={() => navigate('/')}>
              Go to Homepage
            </Button>
          </Paper>
        </Box>
      </Container>
    );
  }
  
  if (verified) {
    return (
      <Container maxWidth="md">
        <Box sx={{ py: 8 }}>
          <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: '1px solid rgba(0, 0, 0, 0.08)', textAlign: 'center' }}>
            <CheckCircleIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h4" gutterBottom>
              Thank You for Verifying!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Your testimonial has been approved and will be displayed.
            </Typography>
            <Button variant="contained" color="primary" onClick={() => navigate('/')}>
              Visit Our Website
            </Button>
          </Paper>
        </Box>
      </Container>
    );
  }
  
  if (rejected) {
    return (
      <Container maxWidth="md">
        <Box sx={{ py: 8 }}>
          <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: '1px solid rgba(0, 0, 0, 0.08)', textAlign: 'center' }}>
            <CancelIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h4" gutterBottom>
              Testimonial Declined
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Thank you for your feedback. The testimonial will not be used.
            </Typography>
            <Button variant="contained" color="primary" onClick={() => navigate('/')}>
              Visit Our Website
            </Button>
          </Paper>
        </Box>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="md">
      <Box sx={{ py: 8 }}>
        <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: '1px solid rgba(0, 0, 0, 0.08)' }}>
          <Typography variant="h4" gutterBottom>
            Verify Your Testimonial
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Hi {testimonial.client_name}, please review the testimonial below and confirm if you approve it.
          </Typography>
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Original Testimonial
            </Typography>
            <Paper variant="outlined" sx={{ p: 2, mb: 3, bgcolor: 'background.default' }}>
              <Typography variant="body1">
                {testimonial.original_testimonial}
              </Typography>
            </Paper>
            
            <Typography variant="h6" gutterBottom>
              Enhanced Testimonial
            </Typography>
            <Paper variant="outlined" sx={{ p: 2, bgcolor: 'background.default' }}>
              <Typography variant="body1">
                {testimonial.enhanced_testimonial}
              </Typography>
            </Paper>
          </Box>
          
          <Divider sx={{ mb: 4 }} />
          
          <Typography variant="body1" gutterBottom>
            Do you approve this testimonial?
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button
              variant="contained"
              color="success"
              disabled={verifying}
              onClick={() => handleVerify(true)}
              startIcon={verifying ? <CircularProgress size={20} color="inherit" /> : <CheckCircleIcon />}
            >
              Yes, I Approve
            </Button>
            
            <Button
              variant="outlined"
              color="error"
              disabled={verifying}
              onClick={() => handleVerify(false)}
              startIcon={verifying ? <CircularProgress size={20} color="inherit" /> : <CancelIcon />}
            >
              No, I Decline
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default VerifyPage; 
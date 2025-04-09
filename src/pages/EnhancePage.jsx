import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Fade,
  Divider,
  Alert,
  Grid,
  LinearProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useAuth } from '../components/auth/AuthProvider';
// import { supabase } from '../lib/supabaseClient';
import { supabase } from '../utils/supabaseClient';
import { enhanceTestimonial } from '../services/openaiService';
import { v4 as uuidv4 } from 'uuid';

const EnhancePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState('');
  const [userLimits, setUserLimits] = useState(null);
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientCompany: '',
    clientTitle: '',
    testimonial: '',
    enhancedTestimonial: ''
  });
  
  useEffect(() => {
    // Check user limits
    const checkUserLimits = async () => {
      if (!user) return;
      
      try {
        // Check if user has a limits record
        let { data, error } = await supabase
          .from('user_limits')
          .select('*')
          .eq('user_id', user.id)
          .single();
        
        if (error && error.code !== 'PGRST116') {
          throw error;
        }
        
        // If no record exists, create one
        if (!data) {
          const { data: newData, error: insertError } = await supabase
            .from('user_limits')
            .insert([
              { 
                user_id: user.id, 
                testimonials_used: 0,
                testimonials_limit: 5,
                plan: 'free'
              }
            ])
            .select()
            .single();
          
          if (insertError) throw insertError;
          data = newData;
        }
        
        setUserLimits(data);
      } catch (err) {
        console.error('Error checking user limits:', err);
        setError('Failed to check your account limits. Please try again.');
      }
    };
    
    checkUserLimits();
  }, [user]);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleEnhance = async () => {
    if (userLimits && userLimits.testimonials_used >= userLimits.testimonials_limit) {
      setError('You have reached your limit of testimonials. Please upgrade your plan.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const clientInfo = {
        name: formData.clientName,
        title: formData.clientTitle,
        company: formData.clientCompany
      };
      
      const enhanced = await enhanceTestimonial(formData.testimonial, clientInfo);
      
      setFormData({
        ...formData,
        enhancedTestimonial: enhanced
      });
      
      setActiveStep(1);
    } catch (err) {
      console.error('Error enhancing testimonial:', err);
      setError('Failed to enhance testimonial. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    
    try {
      const verificationToken = uuidv4();
      
      // Save testimonial to database
      const { error } = await supabase
        .from('testimonials')
        .insert([
          {
            user_id: user.id,
            client_name: formData.clientName,
            client_email: formData.clientEmail,
            client_company: formData.clientCompany,
            client_title: formData.clientTitle,
            original_testimonial: formData.testimonial,
            enhanced_testimonial: formData.enhancedTestimonial,
            status: 'pending',
            verification_token: verificationToken
          }
        ]);
      
      if (error) throw error;
      
      // Update user limits
      const { error: limitsError } = await supabase
        .from('user_limits')
        .update({ testimonials_used: userLimits.testimonials_used + 1 })
        .eq('user_id', user.id);
      
      if (limitsError) throw limitsError;
      
      // In a real app, you'd send an email to the client with the verification link
      // For demo purposes, we'll just simulate it
      console.log(`Verification link: ${window.location.origin}/verify/${verificationToken}`);
      
      setComplete(true);
    } catch (err) {
      console.error('Error saving testimonial:', err);
      setError('Failed to save testimonial. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const steps = ['Enhance Testimonial', 'Review & Submit'];
  
  if (!userLimits) {
    return (
      <Container maxWidth="md">
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="md">
      <Box sx={{ py: 8 }}>
        <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: '1px solid rgba(0, 0, 0, 0.08)' }}>
          <Typography variant="h4" gutterBottom>
            Enhance Your Testimonial
          </Typography>
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="body2" color="text.secondary">
              {userLimits.testimonials_used} of {userLimits.testimonials_limit} testimonials used
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={(userLimits.testimonials_used / userLimits.testimonials_limit) * 100} 
              sx={{ mt: 1 }}
            />
          </Box>
          
          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
          
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
          {complete ? (
            <Fade in={complete}>
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <CheckCircleOutlineIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                  Testimonial Sent for Verification!
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  We've sent a verification request to {formData.clientEmail}. You'll be notified once they approve it.
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={() => navigate('/dashboard')}
                >
                  Go to Dashboard
                </Button>
              </Box>
            </Fade>
          ) : (
            <>
              {activeStep === 0 ? (
                <Box>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Client Name"
                        name="clientName"
                        value={formData.clientName}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Client Email"
                        name="clientEmail"
                        type="email"
                        value={formData.clientEmail}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Client Company"
                        name="clientCompany"
                        value={formData.clientCompany}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Client Title"
                        name="clientTitle"
                        value={formData.clientTitle}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Original Testimonial"
                        name="testimonial"
                        multiline
                        rows={4}
                        value={formData.testimonial}
                        onChange={handleChange}
                        required
                        placeholder="Paste your client's original testimonial here, no matter how brief."
                      />
                    </Grid>
                  </Grid>
                  
                  <Box sx={{ mt: 4, textAlign: 'right' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleEnhance}
                      disabled={loading || !formData.clientName || !formData.clientEmail || !formData.testimonial}
                    >
                      {loading ? <CircularProgress size={24} color="inherit" /> : 'Enhance Testimonial'}
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Original Testimonial
                  </Typography>
                  <Paper 
                    variant="outlined" 
                    sx={{ p: 2, mb: 3, bgcolor: 'background.default' }}
                  >
                    <Typography variant="body1">
                      {formData.testimonial}
                    </Typography>
                  </Paper>
                  
                  <Typography variant="h6" gutterBottom>
                    Enhanced Testimonial
                  </Typography>
                  <Paper 
                    variant="outlined" 
                    sx={{ p: 2, mb: 3, bgcolor: 'background.default' }}
                  >
                    <TextField
                      fullWidth
                      multiline
                      rows={6}
                      value={formData.enhancedTestimonial}
                      onChange={(e) => setFormData({...formData, enhancedTestimonial: e.target.value})}
                      variant="standard"
                      InputProps={{
                        disableUnderline: true
                      }}
                    />
                  </Paper>
                  
                  <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                      variant="outlined"
                      onClick={() => setActiveStep(0)}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                      disabled={loading}
                    >
                      {loading ? <CircularProgress size={24} color="inherit" /> : 'Send for Verification'}
                    </Button>
                  </Box>
                </Box>
              )}
            </>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default EnhancePage; 
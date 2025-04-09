import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  Chip,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../utils/userStorage';
import { supabase } from '../../utils/supabaseClient';
import { markUserAsPaid } from '../../utils/userStorage';

const UserSubscriptionStatus = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Move useEffect to the top of the component, before any conditional returns
  useEffect(() => {
    // Check if user is paid in Supabase
    const checkUserStatus = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('users')
          .select('is_paid, testimonial_limit, payment_date')
          .eq('id', user.id)
          .single();
        
        if (error) throw error;
        
        // Update local user data if needed
        if (data.is_paid && !user.isPaid) {
          markUserAsPaid(user.id);
        }
      } catch (err) {
        console.error('Error checking user status:', err);
      }
    };
    
    checkUserStatus();
  }, [user]);
  
  // Now we can have the conditional return
  if (!user) {
    return null;
  }
  
  const handleUpgrade = () => {
    navigate('/payment');
  };
  
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="subtitle1" fontWeight={600}>
          Account Status
        </Typography>
        <Chip 
          label={user.isPaid ? 'Premium' : 'Free'} 
          color={user.isPaid ? 'primary' : 'default'}
          size="small"
        />
      </Box>
      
      {!user.isPaid ? (
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            You've used {user.testimonialUsed || 0} of {user.testimonialLimit} testimonials
          </Typography>
          <Button 
            variant="outlined" 
            color="primary" 
            size="small"
            onClick={handleUpgrade}
          >
            Upgrade to Premium
          </Button>
        </Box>
      ) : (
        <Box>
          <Typography variant="body2" color="text.secondary">
            You have unlimited access to all premium features
          </Typography>
          {user.paymentDate && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Purchased on {formatDate(user.paymentDate)}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default UserSubscriptionStatus; 
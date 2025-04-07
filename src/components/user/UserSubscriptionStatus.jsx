import React from 'react';
import {
  Box,
  Typography,
  Chip,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../utils/userStorage';

const UserSubscriptionStatus = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  
  if (!user) {
    return null;
  }
  
  const handleUpgrade = () => {
    navigate('/payment');
  };
  
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
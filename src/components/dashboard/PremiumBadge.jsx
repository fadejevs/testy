import React from 'react';
import { Box, Typography, Chip, Paper } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const PremiumBadge = ({ user }) => {
  if (!user?.isPaid) return null;
  
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
    <Paper 
      elevation={0}
      sx={{ 
        p: 2, 
        mb: 3, 
        border: '1px solid #B89B7D',
        borderRadius: 2,
        background: 'linear-gradient(135deg, rgba(184, 155, 125, 0.05) 0%, rgba(184, 155, 125, 0.1) 100%)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <StarIcon sx={{ color: '#B89B7D', mr: 1 }} />
        <Typography variant="h6" fontWeight={600}>
          Premium Account
        </Typography>
        <Chip 
          label="Active" 
          color="primary"
          size="small"
          sx={{ ml: 2 }}
        />
      </Box>
      <Typography variant="body2" color="text.secondary">
        You have unlimited access to all premium features
      </Typography>
      {user.paymentDate && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Subscription started on {formatDate(user.paymentDate)}
        </Typography>
      )}
    </Paper>
  );
};

export default PremiumBadge; 
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Avatar,
  Chip,
  IconButton,
  CircularProgress
} from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import VerifiedIcon from '@mui/icons-material/Verified';
import StarIcon from '@mui/icons-material/Star';

const EmbedPage = () => {
  const { id } = useParams();
  const [testimonial, setTestimonial] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch testimonial
    setTimeout(() => {
      setTestimonial({
        id,
        clientName: 'Michael Thompson',
        clientTitle: 'Marketing Director',
        clientCompany: 'Acme Inc.',
        clientImage: null,
        enhanced: 'Working with this team transformed our entire marketing approach. We saw a 43% increase in qualified leads within just 30 days. Their strategic insights and execution were flawless.',
        rating: 5,
        date: '2023-05-15',
        verified: true
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        height: '100vh'
      }}>
        <CircularProgress size={40} />
      </Box>
    );
  }

  return (
    <Box sx={{ 
      p: 3, 
      borderRadius: 3,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <Box sx={{ position: 'relative', mb: 3 }}>
        <FormatQuoteIcon 
          sx={{ 
            position: 'absolute',
            top: -10,
            left: -5,
            color: '#5D5FEF',
            opacity: 0.2,
            fontSize: 40,
            transform: 'rotate(180deg)'
          }}
        />
        <Typography variant="body1" sx={{ pl: 4, fontStyle: 'italic' }}>
          "{testimonial.enhanced}"
        </Typography>
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ mr: 2 }}>
            {testimonial.clientName.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {testimonial.clientName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {testimonial.clientTitle}, {testimonial.clientCompany}
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {testimonial.verified && (
            <Chip 
              icon={<VerifiedIcon fontSize="small" />} 
              label="Verified" 
              size="small"
              sx={{ 
                bgcolor: 'rgba(46, 125, 50, 0.1)', 
                color: 'success.main',
                mr: 1,
                fontWeight: 500
              }}
            />
          )}
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {[...Array(5)].map((_, i) => (
              <StarIcon 
                key={i} 
                sx={{ 
                  fontSize: 16, 
                  color: i < testimonial.rating ? '#FFB400' : 'grey.300'
                }} 
              />
            ))}
          </Box>
        </Box>
      </Box>
      
      <Typography 
        variant="caption" 
        align="right" 
        sx={{ 
          mt: 2, 
          color: 'text.secondary',
          display: 'block'
        }}
      >
        Powered by Testy
      </Typography>
    </Box>
  );
};

export default EmbedPage; 
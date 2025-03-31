import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  useTheme
} from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import VerifiedIcon from '@mui/icons-material/Verified';
import StarIcon from '@mui/icons-material/Star';

const TestimonialWall = ({ testimonials }) => {
  const theme = useTheme();
  
  return (
    <Box sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {testimonials.map((testimonial, index) => (
          <Grid 
            item 
            xs={12} 
            sm={6} 
            md={4} 
            key={index}
            sx={{
              transform: index % 2 === 0 ? 'translateY(20px)' : 'none',
            }}
          >
            <Card
              elevation={0}
              sx={{
                height: '100%',
                borderRadius: 3,
                border: '1px solid rgba(0, 0, 0, 0.08)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: theme.shadows[4]
                }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar 
                      src={testimonial.image} 
                      sx={{ width: 48, height: 48, mr: 2 }}
                    >
                      {testimonial.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.title}, {testimonial.company}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Chip 
                    icon={<VerifiedIcon fontSize="small" />} 
                    label="Verified" 
                    size="small"
                    sx={{ 
                      bgcolor: 'rgba(46, 125, 50, 0.1)', 
                      color: 'success.main',
                      height: 24
                    }}
                  />
                </Box>
                
                <Box sx={{ display: 'flex', mb: 2 }}>
                  {[...Array(5)].map((_, i) => (
                    <StarIcon 
                      key={i} 
                      sx={{ 
                        fontSize: 18, 
                        color: i < testimonial.rating ? '#FFB400' : 'grey.300'
                      }} 
                    />
                  ))}
                </Box>
                
                <Box sx={{ position: 'relative' }}>
                  <FormatQuoteIcon 
                    sx={{ 
                      position: 'absolute',
                      top: -10,
                      left: -5,
                      color: theme.palette.primary.main,
                      opacity: 0.2,
                      fontSize: 40,
                      transform: 'rotate(180deg)'
                    }}
                  />
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      pl: 4,
                      minHeight: 100,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 5,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {testimonial.text}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TestimonialWall; 
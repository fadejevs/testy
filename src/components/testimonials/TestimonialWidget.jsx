import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Chip,
  TextField,
  Button,
  Paper
} from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import VerifiedIcon from '@mui/icons-material/Verified';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import StarIcon from '@mui/icons-material/Star';

const TestimonialWidget = ({ testimonials, onCopy }) => {
  const [copied, setCopied] = useState(false);
  const testimonial = testimonials[0]; // Simplify to just use the first testimonial
  
  const embedCode = `<iframe src="https://testy.app/embed/${testimonial.id}" width="100%" height="300" frameborder="0"></iframe>`;
  
  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    if (onCopy) onCopy();
  };
  
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Card 
          elevation={0}
          sx={{ 
            borderRadius: 3,
            border: '1px solid rgba(0, 0, 0, 0.08)',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <CardContent sx={{ p: 3 }}>
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
              
              {testimonial.status === 'verified' && (
                <Chip 
                  icon={<VerifiedIcon fontSize="small" />} 
                  label="Verified" 
                  size="small"
                  sx={{ 
                    bgcolor: 'rgba(46, 125, 50, 0.1)', 
                    color: 'success.main',
                    fontWeight: 500
                  }}
                />
              )}
            </Box>
            
            {testimonial.rating > 0 && (
              <Box sx={{ display: 'flex', mt: 2 }}>
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
            )}
            
            <Box sx={{ mt: 2, textAlign: 'right' }}>
              <Typography variant="caption" color="text.secondary">
                Powered by Testy
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
      
      <Typography variant="subtitle2" gutterBottom>
        Embed this testimonial on your website
      </Typography>
      
      <Paper 
        elevation={0}
        sx={{ 
          p: 2,
          borderRadius: 2,
          border: '1px solid rgba(0, 0, 0, 0.08)',
          mb: 2
        }}
      >
        <Box sx={{ display: 'flex' }}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={embedCode}
            InputProps={{
              readOnly: true,
            }}
          />
          <Button
            variant="contained"
            color={copied ? "success" : "primary"}
            startIcon={<ContentCopyIcon />}
            onClick={handleCopy}
            sx={{ ml: 1 }}
          >
            {copied ? "Copied!" : "Copy"}
          </Button>
        </Box>
      </Paper>
      
      <Typography variant="caption" color="text.secondary">
        This widget will display your testimonial exactly as shown above.
      </Typography>
    </Box>
  );
};

export default TestimonialWidget; 
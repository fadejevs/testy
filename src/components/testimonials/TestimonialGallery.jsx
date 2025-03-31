import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  useTheme
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import TestimonialTemplate from './TestimonialTemplate';

const TestimonialGallery = ({ testimonials }) => {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [templateType, setTemplateType] = useState('quote');
  
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  const handleTemplateChange = (type) => {
    setTemplateType(type);
  };
  
  return (
    <Box sx={{ position: 'relative', py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Button 
          variant={templateType === 'quote' ? 'contained' : 'outlined'}
          onClick={() => handleTemplateChange('quote')}
          sx={{ mx: 1 }}
        >
          Quote Card
        </Button>
        <Button 
          variant={templateType === 'social' ? 'contained' : 'outlined'}
          onClick={() => handleTemplateChange('social')}
          sx={{ mx: 1 }}
        >
          Social Post
        </Button>
      </Box>
      
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'center',
          mb: 4
        }}
      >
        <IconButton 
          onClick={handlePrev}
          sx={{ 
            bgcolor: 'background.paper',
            boxShadow: theme.shadows[2],
            '&:hover': { bgcolor: 'background.paper' }
          }}
        >
          <NavigateBeforeIcon />
        </IconButton>
        
        <Box sx={{ mx: 2, flex: 1, maxWidth: 800 }}>
          <TestimonialTemplate
            type={templateType}
            text={testimonials[currentIndex].text}
            clientName={testimonials[currentIndex].name}
            clientTitle={testimonials[currentIndex].title}
            companyName={testimonials[currentIndex].company}
            verified={true}
            date={new Date().toISOString()}
            rating={5}
          />
        </Box>
        
        <IconButton 
          onClick={handleNext}
          sx={{ 
            bgcolor: 'background.paper',
            boxShadow: theme.shadows[2],
            '&:hover': { bgcolor: 'background.paper' }
          }}
        >
          <NavigateNextIcon />
        </IconButton>
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {testimonials.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: index === currentIndex ? 'primary.main' : 'grey.300',
              mx: 0.5,
              cursor: 'pointer'
            }}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default TestimonialGallery; 
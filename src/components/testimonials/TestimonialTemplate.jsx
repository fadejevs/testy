import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Chip,
  Button
} from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import VerifiedIcon from '@mui/icons-material/Verified';
import StarIcon from '@mui/icons-material/Star';

const TestimonialTemplate = ({ 
  type = 'quote', 
  text, 
  clientName, 
  clientTitle, 
  clientImage,
  companyName,
  companyLogo,
  rating = 5,
  verified = true,
  date,
  brandColor = '#5D5FEF'
}) => {
  
  // Quote Card Template
  if (type === 'quote') {
    return (
      <Box 
        sx={{ 
          p: 4, 
          borderRadius: 3, 
          bgcolor: `${brandColor}10`,
          border: '1px solid',
          borderColor: `${brandColor}30`,
          position: 'relative',
          overflow: 'hidden',
          minHeight: 200,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '100%'
        }}
      >
        <FormatQuoteIcon 
          sx={{ 
            fontSize: 80, 
            color: brandColor, 
            opacity: 0.2,
            position: 'absolute',
            top: 10,
            left: 10,
            transform: 'rotate(180deg)'
          }} 
        />
        
        <Typography 
          variant="h6" 
          sx={{ 
            maxWidth: 600, 
            mx: 'auto', 
            fontStyle: 'italic',
            color: 'text.primary',
            fontWeight: 500,
            mb: 3,
            zIndex: 1
          }}
        >
          "{text}"
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
          {clientImage ? (
            <Avatar src={clientImage} alt={clientName} sx={{ mr: 2 }} />
          ) : (
            <Avatar sx={{ mr: 2, bgcolor: brandColor }}>
              {clientName?.charAt(0) || 'C'}
            </Avatar>
          )}
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {clientName || 'Client Name'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {clientTitle || 'Position'}{companyName ? `, ${companyName}` : ''}
            </Typography>
          </Box>
        </Box>
        
        {verified && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
            <Chip 
              icon={<VerifiedIcon fontSize="small" />} 
              label="Verified Testimonial" 
              size="small"
              sx={{ 
                bgcolor: 'success.light', 
                color: 'success.dark',
                '& .MuiChip-icon': { color: 'success.main' }
              }}
            />
          </Box>
        )}
        
        <Box 
          sx={{ 
            position: 'absolute', 
            bottom: 10, 
            right: 10,
            opacity: 0.5
          }}
        >
          <Typography variant="caption">
            Powered by Testy
          </Typography>
        </Box>
      </Box>
    );
  }
  
  // Social Post Template
  if (type === 'social') {
    return (
      <Box sx={{ width: '100%' }}>
        <Paper 
          elevation={2}
          sx={{ 
            borderRadius: 3,
            overflow: 'hidden',
            maxWidth: 500,
            mx: 'auto'
          }}
        >
          {/* Header - like LinkedIn or Twitter */}
          <Box sx={{ 
            p: 2, 
            borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Avatar 
              src={clientImage} 
              sx={{ width: 48, height: 48, mr: 2 }}
            >
              {clientName?.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {clientName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {clientTitle} at {companyName}
              </Typography>
            </Box>
          </Box>
          
          {/* Content */}
          <Box sx={{ p: 2 }}>
            <Typography variant="body1" sx={{ mb: 2, whiteSpace: 'pre-wrap' }}>
              I just had to share my experience with {companyName ? companyName : 'this amazing service'}! 
              
              {text}
              
              #HighlyRecommended #CustomerExperience
            </Typography>
            
            {/* Engagement metrics */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              borderTop: '1px solid rgba(0, 0, 0, 0.08)',
              pt: 2,
              color: 'text.secondary'
            }}>
              <Typography variant="body2">❤️ 42 likes</Typography>
              <Typography variant="body2">💬 8 comments</Typography>
              <Typography variant="body2">🔄 5 shares</Typography>
            </Box>
          </Box>
        </Paper>
        
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mt: 3,
          gap: 2
        }}>
          <Button 
            variant="contained" 
            sx={{ 
              bgcolor: '#1DA1F2',
              '&:hover': { bgcolor: '#1a91da' }
            }}
          >
            Share on Twitter
          </Button>
          <Button 
            variant="contained"
            sx={{ 
              bgcolor: '#0A66C2',
              '&:hover': { bgcolor: '#0958a7' }
            }}
          >
            Share on LinkedIn
          </Button>
        </Box>
      </Box>
    );
  }
  
  // Video Script Template
  if (type === 'video') {
    return (
      <Box sx={{ width: '100%' }}>
        <Paper 
          elevation={1} 
          sx={{ 
            p: 3, 
            borderRadius: 3,
            overflow: 'hidden',
            mb: 2
          }}
        >
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
            Video Testimonial Script
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              INTRO (5-10 seconds)
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, pl: 2 }}>
              "Hi, I'm {clientName || '[Client Name]'}{clientTitle ? `, ${clientTitle}` : ''}{companyName ? ` at ${companyName}` : ''}."
            </Typography>
            
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              TESTIMONIAL (30-45 seconds)
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, pl: 2 }}>
              "{text}"
            </Typography>
            
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              CLOSING (5-10 seconds)
            </Typography>
            <Typography variant="body2" sx={{ pl: 2 }}>
              "I highly recommend their services to anyone looking to achieve similar results."
            </Typography>
          </Box>
          
          <Box 
            sx={{ 
              p: 2, 
              borderRadius: 2, 
              bgcolor: 'info.light',
              border: '1px solid',
              borderColor: 'info.main',
              mb: 2
            }}
          >
            <Typography variant="caption" color="info.dark">
              <strong>Pro Tip:</strong> Keep the video under 60 seconds for maximum engagement. 
              Look directly at the camera and speak naturally.
            </Typography>
          </Box>
        </Paper>
        
        <Typography variant="caption" color="text.secondary">
          This script is ready for recording or can be used with our AI video generation feature.
        </Typography>
      </Box>
    );
  }
  
  // Add a website testimonial carousel template
  if (type === 'carousel') {
    return (
      <Box 
        sx={{ 
          width: '100%',
          borderRadius: 3,
          bgcolor: 'background.paper',
          boxShadow: 3,
          overflow: 'hidden'
        }}
      >
        <Box sx={{ 
          p: 3, 
          bgcolor: brandColor,
          color: 'white',
          textAlign: 'center'
        }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            What Our Clients Say
          </Typography>
        </Box>
        
        <Box sx={{ p: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Avatar 
              src={clientImage}
              sx={{ 
                width: 80, 
                height: 80, 
                mx: 'auto',
                mb: 2,
                border: '3px solid',
                borderColor: brandColor
              }}
            >
              {clientName?.charAt(0)}
            </Avatar>
            
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {clientName}
            </Typography>
            
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {clientTitle}, {companyName}
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              {[...Array(5)].map((_, i) => (
                <StarIcon 
                  key={i} 
                  sx={{ 
                    fontSize: 20, 
                    color: i < rating ? '#FFB400' : 'grey.300'
                  }} 
                />
              ))}
            </Box>
          </Box>
          
          <Typography 
            variant="body1" 
            align="center"
            sx={{ 
              fontStyle: 'italic',
              position: 'relative',
              '&:before': {
                content: '"""',
                fontSize: 60,
                position: 'absolute',
                top: -30,
                left: -10,
                color: `${brandColor}30`,
                fontFamily: 'serif'
              }
            }}
          >
            {text}
          </Typography>
        </Box>
        
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center',
          p: 2,
          borderTop: '1px solid rgba(0, 0, 0, 0.08)'
        }}>
          <Box 
            sx={{ 
              width: 10, 
              height: 10, 
              borderRadius: '50%', 
              bgcolor: brandColor,
              mx: 0.5
            }}
          />
          <Box 
            sx={{ 
              width: 10, 
              height: 10, 
              borderRadius: '50%', 
              bgcolor: 'grey.300',
              mx: 0.5
            }}
          />
          <Box 
            sx={{ 
              width: 10, 
              height: 10, 
              borderRadius: '50%', 
              bgcolor: 'grey.300',
              mx: 0.5
            }}
          />
        </Box>
      </Box>
    );
  }
  
  // Default fallback
  return (
    <Box sx={{ p: 3, border: '1px dashed grey', borderRadius: 2 }}>
      <Typography>Unknown template type: {type}</Typography>
    </Box>
  );
};

export default TestimonialTemplate; 
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel
} from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import VerifiedIcon from '@mui/icons-material/Verified';
import StarIcon from '@mui/icons-material/Star';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const TestimonialCollection = ({ testimonials }) => {
  const [open, setOpen] = useState(false);
  const [collectionName, setCollectionName] = useState('My Testimonial Collection');
  const [selectedTestimonials, setSelectedTestimonials] = useState([]);
  const [layout, setLayout] = useState('grid');
  const [theme, setTheme] = useState('light');
  const [showRatings, setShowRatings] = useState(true);
  const [embedCode, setEmbedCode] = useState('');
  const [copied, setCopied] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setSelectedTestimonials(testimonials.slice(0, 3).map(t => t.id));
    generateEmbedCode();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggleTestimonial = (id) => {
    setSelectedTestimonials(prev => 
      prev.includes(id) 
        ? prev.filter(t => t !== id)
        : [...prev, id]
    );
  };

  const generateEmbedCode = () => {
    const ids = selectedTestimonials.join(',');
    const code = `<iframe src="https://testy.app/collection?ids=${ids}&layout=${layout}&theme=${theme}&ratings=${showRatings}" width="100%" height="600" frameborder="0"></iframe>`;
    setEmbedCode(code);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box>
      <Button 
        variant="contained" 
        color="primary"
        onClick={handleOpen}
        sx={{ mb: 3 }}
      >
        Create Collection
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Create Testimonial Collection
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 4 }}>
            <TextField
              fullWidth
              label="Collection Name"
              value={collectionName}
              onChange={(e) => setCollectionName(e.target.value)}
              sx={{ mb: 3 }}
            />
            
            <Typography variant="subtitle1" gutterBottom>
              Select Testimonials
            </Typography>
            
            <Grid container spacing={2} sx={{ mb: 3 }}>
              {testimonials.map(testimonial => (
                <Grid item xs={12} sm={6} md={4} key={testimonial.id}>
                  <Card 
                    sx={{ 
                      border: selectedTestimonials.includes(testimonial.id) 
                        ? '2px solid #5D5FEF' 
                        : '1px solid rgba(0, 0, 0, 0.08)',
                      borderRadius: 2,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      '&:hover': {
                        boxShadow: 3
                      }
                    }}
                    onClick={() => handleToggleTestimonial(testimonial.id)}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar sx={{ mr: 1 }}>
                          {testimonial.clientName.charAt(0)}
                        </Avatar>
                        <Typography variant="subtitle2" noWrap>
                          {testimonial.clientName}
                        </Typography>
                      </Box>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {testimonial.enhanced}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            
            <Typography variant="subtitle1" gutterBottom>
              Customize Display
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Layout</InputLabel>
                <Select
                  value={layout}
                  label="Layout"
                  onChange={(e) => setLayout(e.target.value)}
                >
                  <MenuItem value="grid">Grid</MenuItem>
                  <MenuItem value="carousel">Carousel</MenuItem>
                  <MenuItem value="list">List</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Theme</InputLabel>
                <Select
                  value={theme}
                  label="Theme"
                  onChange={(e) => setTheme(e.target.value)}
                >
                  <MenuItem value="light">Light</MenuItem>
                  <MenuItem value="dark">Dark</MenuItem>
                  <MenuItem value="branded">Branded</MenuItem>
                </Select>
              </FormControl>
              
              <FormControlLabel
                control={
                  <Switch 
                    checked={showRatings} 
                    onChange={(e) => setShowRatings(e.target.checked)} 
                  />
                }
                label="Show Ratings"
              />
            </Box>
            
            <Typography variant="subtitle1" gutterBottom>
              Embed Code
            </Typography>
            
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
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default TestimonialCollection; 
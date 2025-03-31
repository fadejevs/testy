import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const TestPage = () => {
  console.log("TestPage rendering");
  
  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4">
          Test Page Loaded Successfully
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          If you can see this, routing is working correctly.
        </Typography>
      </Box>
    </Container>
  );
};

export default TestPage; 
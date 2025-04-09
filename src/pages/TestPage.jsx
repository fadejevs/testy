import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import SupabaseTest from '../components/SupabaseTest';
import DirectSignupTest from '../components/DirectSignupTest';

const TestPage = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Supabase Integration Tests
        </Typography>
        
        <SupabaseTest />
        <DirectSignupTest />
      </Box>
    </Container>
  );
};

export default TestPage; 
// This file would handle all API calls to your backend
// For now, it's mostly placeholder functions

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Simulate a delay for development
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Enhance a testimonial with AI
  enhanceTestimonial: async (originalText) => {
    try {
      // Simulate API call
      await delay(2000);
      
      // Return a sample enhanced testimonial
      return {
        original: originalText,
        enhanced: `Working with this coach transformed how I approach challenges. Their methods didn't just provide temporary solutions—they fundamentally changed my perspective. I went from feeling overwhelmed to confident and accomplished, with measurable results in just weeks.`
      };
    } catch (error) {
      console.error('Error enhancing testimonial:', error);
      throw error;
    }
  },
  
  // Save a testimonial
  saveTestimonial: async (testimonialData) => {
    try {
      // Simulate API call
      await delay(1000);
      
      // Return the saved testimonial with an ID
      return {
        ...testimonialData,
        id: Math.random().toString(36).substring(2, 15),
        createdAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error saving testimonial:', error);
      throw error;
    }
  },
  
  // Verify a testimonial
  verifyTestimonial: async (testimonialId, isApproved) => {
    try {
      // Simulate API call
      await delay(1000);
      
      return { 
        success: true, 
        message: isApproved ? 'Testimonial approved' : 'Testimonial rejected' 
      };
    } catch (error) {
      console.error('Error verifying testimonial:', error);
      throw error;
    }
  },
  
  // Get user testimonials
  getUserTestimonials: async () => {
    try {
      // Simulate API call
      await delay(1000);
      
      // Return sample testimonials
      return [
        {
          id: '1',
          clientName: 'John Doe',
          original: 'The coaching was good. I learned some things.',
          enhanced: 'Working with this coach transformed my approach to business. I went from feeling stuck to landing new clients within weeks!',
          status: 'approved',
          date: '2023-10-15'
        },
        {
          id: '2',
          clientName: 'Jane Smith',
          original: 'Nice service, helped me with my problems.',
          enhanced: 'The service provided exactly what I needed during a critical time. I went from struggling to thriving in just one month!',
          status: 'pending',
          date: '2023-10-10'
        }
      ];
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      throw error;
    }
  }
}; 
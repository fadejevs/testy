import { useState } from 'react';
import { supabase } from '../services/supabase';

export const useTestimonial = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Enhance a testimonial with AI
  const enhanceTestimonial = async (originalText) => {
    try {
      setLoading(true);
      setError(null);
      
      // This would call your API endpoint for AI enhancement
      // For now, we'll simulate with a timeout
      return new Promise((resolve) => {
        setTimeout(() => {
          // Example enhanced text
          const enhanced = `Working with this coach transformed how I approach challenges. Their methods didn't just provide temporary solutions—they fundamentally changed my perspective. I went from feeling overwhelmed to confident and accomplished, with measurable results in just weeks.`;
          
          resolve(enhanced);
          setLoading(false);
        }, 2000);
      });
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  // Save a testimonial to the database
  const saveTestimonial = async (testimonialData) => {
    try {
      setLoading(true);
      setError(null);
      
      // In real app, this would save to Supabase
      // For demo, just return a fake ID
      return new Promise((resolve) => {
        setTimeout(() => {
          const savedTestimonial = {
            ...testimonialData,
            id: Math.random().toString(36).substring(2, 15),
            createdAt: new Date().toISOString()
          };
          
          resolve(savedTestimonial);
          setLoading(false);
        }, 1000);
      });
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  // Get all testimonials for a user
  const getUserTestimonials = async (userId) => {
    try {
      setLoading(true);
      setError(null);
      
      // In real app, this would query Supabase
      // For demo, return fake data
      return new Promise((resolve) => {
        setTimeout(() => {
          const testimonials = [
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
          
          resolve(testimonials);
          setLoading(false);
        }, 1000);
      });
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  return {
    loading,
    error,
    enhanceTestimonial,
    saveTestimonial,
    getUserTestimonials
  };
}; 
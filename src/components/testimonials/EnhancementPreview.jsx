import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

const EnhancementPreview = ({ original, enhanced }) => {
  return (
    <PreviewContainer>
      <h2>Compare Your Testimonials</h2>
      <Comparison>
        <TestimonialBox>
          <h3>Original</h3>
          <TestimonialText>{original}</TestimonialText>
        </TestimonialBox>
        
        <TestimonialBox enhanced>
          <h3>Enhanced</h3>
          <TestimonialText>{enhanced}</TestimonialText>
          <EditButton>Edit</EditButton>
        </TestimonialBox>
      </Comparison>
    </PreviewContainer>
  );
};

const PreviewContainer = styled.div`
  margin: 40px 0;
  
  h2 {
    text-align: center;
    margin-bottom: 24px;
  }
`;

const Comparison = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TestimonialBox = styled.div`
  padding: 24px;
  border-radius: 8px;
  background: ${props => props.enhanced ? '#ebf3ff' : '#f7f9fc'};
  position: relative;
  
  h3 {
    margin-top: 0;
    margin-bottom: 16px;
    color: ${props => props.enhanced ? '#1a56db' : '#4a5568'};
  }
`;

const TestimonialText = styled.p`
  font-size: 16px;
  line-height: 1.6;
`;

const EditButton = styled(Button)`
  position: absolute;
  top: 16px;
  right: 16px;
  padding: 4px 12px;
  font-size: 14px;
`;

export default EnhancementPreview; 
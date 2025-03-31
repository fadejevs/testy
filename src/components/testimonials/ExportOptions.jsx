import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

const ExportOptions = ({ testimonial }) => {
  return (
    <ExportContainer>
      <h3>Export Your Testimonial</h3>
      
      <OptionsGrid>
        <ExportOption>
          <h4>Website</h4>
          <p>Add to your website or landing page</p>
          <Button>Copy HTML</Button>
        </ExportOption>
        
        <ExportOption>
          <h4>Social Media</h4>
          <p>Share on LinkedIn, Twitter, or Facebook</p>
          <Button>Share Now</Button>
        </ExportOption>
        
        <ExportOption>
          <h4>Image</h4>
          <p>Download as PNG with your branding</p>
          <Button>Download</Button>
        </ExportOption>
        
        <ExportOption>
          <h4>Text</h4>
          <p>Simple text format for easy copying</p>
          <Button>Copy Text</Button>
        </ExportOption>
      </OptionsGrid>
    </ExportContainer>
  );
};

const ExportContainer = styled.div`
  margin: 40px 0;
  
  h3 {
    margin-bottom: 24px;
    text-align: center;
  }
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ExportOption = styled.div`
  background: #f8fafc;
  padding: 24px;
  border-radius: 8px;
  
  h4 {
    margin-top: 0;
    margin-bottom: 8px;
  }
  
  p {
    margin-bottom: 16px;
    color: #718096;
  }
`;

export default ExportOptions; 
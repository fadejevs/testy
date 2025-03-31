import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

const TestimonialInput = ({ onSubmit, isProcessing }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label>Paste your client's testimonial below:</Label>
      <TextArea 
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Example: The coaching was good. I learned some things that helped me."
        rows={6}
      />
      <ButtonContainer>
        <Button 
          type="submit" 
          primary 
          disabled={isProcessing || !text.trim()}
        >
          {isProcessing ? 'Enhancing...' : 'Enhance Testimonial'}
        </Button>
      </ButtonContainer>
    </Form>
  );
};

const Form = styled.form`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  font-family: inherit;
  margin-bottom: 24px;
  
  &:focus {
    outline: none;
    border-color: #4a90e2;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export default TestimonialInput; 
import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  
  background-color: ${props => props.primary ? '#4A90E2' : 'transparent'};
  color: ${props => props.primary ? 'white' : '#4A90E2'};
  border: ${props => props.primary ? 'none' : '1px solid #4A90E2'};
  
  &:hover {
    background-color: ${props => props.primary ? '#357ABD' : 'rgba(74, 144, 226, 0.1)'};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Button = ({ children, ...props }) => {
  return (
    <StyledButton {...props}>
      {children}
    </StyledButton>
  );
};

export default Button; 
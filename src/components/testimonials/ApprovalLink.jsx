import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

const ApprovalLink = ({ link }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <ApprovalLinkContainer>
      <h3>Get Client Approval</h3>
      <p>Send this link to your client to verify this enhanced testimonial:</p>
      
      <LinkContainer>
        <LinkText>{link}</LinkText>
        <Button onClick={handleCopy}>
          {copied ? 'Copied!' : 'Copy Link'}
        </Button>
      </LinkContainer>
      
      <HelpText>
        Your client will see both versions and can approve with one click
      </HelpText>
      
      <ActionButtons>
        <Button primary>
          Download as Image
        </Button>
        <Button>
          Share Testimonial
        </Button>
      </ActionButtons>
    </ApprovalLinkContainer>
  );
};

const ApprovalLinkContainer = styled.div`
  margin: 40px 0;
  background: #f8fafc;
  padding: 24px;
  border-radius: 8px;
  text-align: center;
`;

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: white;
  padding: 8px 16px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  margin: 20px 0;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const LinkText = styled.div`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
`;

const HelpText = styled.p`
  color: #718096;
  font-size: 14px;
  margin-bottom: 24px;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export default ApprovalLink; 
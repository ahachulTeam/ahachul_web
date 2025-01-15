import { useState } from 'react';

import styled from '@emotion/styled';
import { CheckIcon, CopyIcon } from '@radix-ui/react-icons';
import { AnimatePresence, motion } from 'framer-motion';

export function CopyButton() {
  const variants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  };

  const [copied, setCopied] = useState(false);

  const copy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <StyledButton type="button" aria-label="Copy code snippet" onClick={copy}>
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <IconWrapper
            key="checkmark"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <CheckIcon />
          </IconWrapper>
        ) : (
          <IconWrapper
            key="copy"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <CopyIcon />
          </IconWrapper>
        )}
      </AnimatePresence>
    </StyledButton>
  );
}

const StyledButton = styled.button`
  display: flex;
  width: 48px;
  height: 48px;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background-color: #f9fafb;
  color: #1f2937;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition:
    background-color 0.2s,
    color 0.2s;

  &:hover {
    background-color: #f3f4f6;
    color: #111827;
  }
`;

const IconWrapper = styled(motion.span)`
  svg {
    width: 24px;
    height: 24px;
  }
`;

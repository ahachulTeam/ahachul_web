import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styled from '@emotion/styled';

export function ToggleBox() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <>
      <Container>
        <AnimatePresence>
          {isVisible ? (
            <AnimatedBox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          ) : null}
        </AnimatePresence>
      </Container>
      <ToggleButton type="button" onClick={() => setIsVisible((prev) => !prev)}>
        {isVisible ? 'Hide' : 'Show'}
      </ToggleButton>
    </>
  );
}

const Container = styled.div`
  height: 48px;
`;

const AnimatedBox = styled(motion.div)`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: #eab308; // Tailwind's yellow-500
`;

const ToggleButton = styled.button`
  border-radius: 8px;
  background-color: white;
  padding: 8px 16px;
  font-size: 14px;
`;

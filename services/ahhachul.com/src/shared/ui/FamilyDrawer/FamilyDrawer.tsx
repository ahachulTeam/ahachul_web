import React, { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useMeasure from 'react-use-measure';
import { Drawer } from 'vaul';
import styled from '@emotion/styled';

import { DefaultView, Key, Phrase, RemoveArticle } from './components';
import { CloseIcon } from './icons';
import { EllipsisIcon } from 'shared/static/icons/ellipsis';

export function FamilyDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState('default');
  const [elementRef, bounds] = useMeasure();
  const previousHeightRef = useRef<number>(0);

  const content = useMemo(() => {
    switch (view) {
      case 'default':
        return <DefaultView setView={setView} />;
      case 'remove':
        return <RemoveArticle setView={setView} />;
      case 'phrase':
        return <Phrase setView={setView} />;
      case 'key':
        return <Key setView={setView} />;
    }
  }, [view]);

  const opacityDuration = useMemo(() => {
    const MIN_DURATION = 0.15;
    const MAX_DURATION = 0.27;

    if (!previousHeightRef.current) {
      previousHeightRef.current = bounds.height;
      return MIN_DURATION;
    }

    const heightDifference = Math.abs(
      bounds.height - previousHeightRef.current,
    );
    previousHeightRef.current = bounds.height;

    const duration = Math.min(
      Math.max(heightDifference / 500, MIN_DURATION),
      MAX_DURATION,
    );

    return duration;
  }, [bounds.height]);

  return (
    <>
      <DrawerButton onClick={() => setIsOpen(true)}>
        <EllipsisIcon />
      </DrawerButton>
      <Drawer.Root open={isOpen} onOpenChange={setIsOpen}>
        <Drawer.Portal>
          <DrawerOverlay onClick={() => setIsOpen(false)} />
          <Drawer.Content asChild>
            <DrawerContentWrapper
              animate={{
                height: bounds.height,
                transition: {
                  duration: 0.27,
                  ease: [0.25, 1, 0.5, 1],
                },
              }}
            >
              <Drawer.Close asChild>
                <CloseButton>
                  <CloseIcon />
                </CloseButton>
              </Drawer.Close>
              <ContentWrapper ref={elementRef}>
                <AnimatePresence initial={false} mode="popLayout" custom={view}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    key={view}
                    transition={{
                      duration: opacityDuration,
                      ease: [0.26, 0.08, 0.25, 1],
                    }}
                  >
                    {content}
                  </motion.div>
                </AnimatePresence>
              </ContentWrapper>
            </DrawerContentWrapper>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
}

const DrawerButton = styled.button`
  height: 24px;
  background-color: #141517;
  font-weight: 500;
  color: black;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-end;
  &:focus-visible {
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.5);
  }
`;

const DrawerOverlay = styled(Drawer.Overlay)`
  position: fixed;
  inset: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.3);
  transition: opacity 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
`;

const DrawerContentWrapper = styled(motion.div)`
  position: fixed;
  left: 16px;
  right: 16px;
  bottom: 16px;
  z-index: 10;
  max-width: 361px;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
  border-radius: 36px;
  background-color: #fefffe;
  outline: none;
  transition: transform 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 28px;
  right: 32px;
  z-index: 10;
  display: flex;
  height: 32px;
  width: 32px;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background-color: #f7f8f9;
  color: #949595;
  transition: transform 0.2s;
  &:focus {
    transform: scale(0.95);
  }
  &:active {
    transform: scale(0.75);
  }
`;

const ContentWrapper = styled.div`
  padding: 10px 24px 24px;
`;

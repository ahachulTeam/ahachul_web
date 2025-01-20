import { type ComponentProps } from 'react';

import { AnimatePresence } from 'motion/react';

import Portal from '../portal/Portal.component';

interface Props extends ComponentProps<typeof Portal> {
  /**
   * framer-motion AnimatePresence의 mode
   * @default 'wait'
   */
  mode?: ComponentProps<typeof AnimatePresence>['mode'];
}

/**
 * @description Portal을 AnimatePresence 와 함께 사용합니다
 */
const AnimatePortal = ({ children, mounted, mode = 'wait' }: Props) => {
  return (
    <Portal mounted={mounted}>
      <AnimatePresence mode={mode}>{mounted && children}</AnimatePresence>
    </Portal>
  );
};

export default AnimatePortal;

import { type ComponentProps, type MouseEventHandler } from "react";
import { css } from "@emotion/react";
import { m, type Variants } from "framer-motion";

import AnimatePortal from "~/components/shared/portal/AnimatePortal";
import { defaultEasing, defaultFadeInVariants } from "~/constants/motions";

interface Props extends ComponentProps<typeof AnimatePortal> {
  /**
   * scrim을 클릭했을 때 실행되는 함수이며, 기본적으로 target을 확인한 후 실행됩니다
   */
  onClickOutside?: VoidFunction;
}

const BottomSheet = ({ onClickOutside, isShowing, children, mode }: Props) => {
  const onClickOutsideDefault: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target !== e.currentTarget) return;
    if (onClickOutside) onClickOutside();
  };

  return (
    <AnimatePortal isShowing={isShowing} mode={mode}>
      <m.div
        onClick={onClickOutsideDefault}
        css={scrimCss}
        variants={defaultFadeInVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <m.div css={contentCss} variants={bottomSheetVariants}>
          {children}
        </m.div>
      </m.div>
    </AnimatePortal>
  );
};

export default BottomSheet;

const scrimCss = css`
  position: fixed;
  z-index: var(--z-indexes-bottom-sheet);
  top: 0;
  left: 0;

  overflow: hidden;

  width: 100vw;
  height: 100%;

  background-color: rgb(0 0 0 / 30%);
`;

const contentCss = () => css`
  position: absolute;
  top: 100%;
  left: 0;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  min-height: 300px;

  background-color: #fff;
  border-radius: 16px 16px 0 0;
`;

const bottomSheetVariants: Variants = {
  initial: {
    y: 0,
    transition: { duration: 0.3, ease: defaultEasing },
    willChange: "transform",
  },
  animate: {
    y: "-100%",
    transition: { duration: 0.3, ease: defaultEasing },
    willChange: "transform",
  },
  exit: {
    y: 0,
    transition: { duration: 0.3, ease: defaultEasing },
    willChange: "transform",
  },
};

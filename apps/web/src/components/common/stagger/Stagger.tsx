import { type Interpolation, type Theme } from "@emotion/react";
import { m, type Variants } from "framer-motion";
import { Children, type PropsWithChildren } from "react";
import { defaultEasing, stagger } from "@/constants/motions";

interface Props extends PropsWithChildren {
  overrideCss?: Interpolation<Theme>;
  /**
   * @description
   * @default stagger(0.5)
   */
  staggerVariants?: Variants;
  /**
   * @description
   * @default fadeInUpVariants
   */
  paragraphVariants?: Variants;
}

/**
 * @description children 노드 각각을 stagger가 적용된 div로 감싸 줍니다.
 */
export const Stagger = ({
  children,
  overrideCss,
  staggerVariants = stagger(0.7),
  paragraphVariants = fadeInUpVariants,
}: Props) => {
  return (
    <m.article
      css={overrideCss}
      variants={staggerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {Children.toArray(children).map((child, index) => (
        <m.div key={index} variants={paragraphVariants}>
          {child}
        </m.div>
      ))}
    </m.article>
  );
};

const fadeInUpVariants: Variants = {
  initial: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.5, ease: defaultEasing },
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: defaultEasing },
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.5, ease: defaultEasing },
  },
};

import { Children, type PropsWithChildren, useEffect } from 'react';
import { css, type Interpolation, type Theme } from '@emotion/react';
import { motion, stagger, useAnimate, type Variants } from 'framer-motion';
import { defaultEasing } from 'shared/data/motion';

interface SkipStaggerWrapperProps extends PropsWithChildren {
  wrapperOverrideCss?: Interpolation<Theme>;
  staggerDelay?: number;
  paragraphVariants?: Variants;
}

const SkipStaggerWrapper = ({
  children,
  wrapperOverrideCss,
  staggerDelay = 0.4,
  paragraphVariants = fadeInUpVariants,
}: SkipStaggerWrapperProps) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate('div', { opacity: 1, scale: 1, y: [12, 0] }, { duration: staggerDelay, delay: stagger(staggerDelay) });
  }, [animate, staggerDelay]);

  return (
    <motion.article ref={scope} css={[wrapperCss, wrapperOverrideCss]}>
      {Children.toArray(children).map((paragraph, index) => (
        <motion.div key={index} css={headFont} variants={paragraphVariants}>
          {paragraph}
        </motion.div>
      ))}
    </motion.article>
  );
};

export default SkipStaggerWrapper;

const wrapperCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
`;

const fadeInUpVariants: Variants = {
  initial: {
    opacity: 0,
    y: 12,
    transition: { duration: 0.4, ease: defaultEasing },
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: defaultEasing },
  },
  exit: {
    opacity: 0,
    y: 12,
    transition: { duration: 0.4, ease: defaultEasing },
  },
};

const headFont = {
  opacity: 0,
  color: '#fff',
  fontSize: '18px',
  fontWeight: 500,
  lineHeight: '171%',
  letterSpacing: '0.3px',
};

import { Children, type PropsWithChildren, useEffect } from 'react';
import { css, type Interpolation, type Theme } from '@emotion/react';
import { m, stagger, useAnimate, type Variants } from 'framer-motion';
import { defaultEasing } from 'data/motion';

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
    <m.article ref={scope} css={[wrapperCss, wrapperOverrideCss]}>
      {Children.toArray(children).map((paragraph, index) => (
        <m.div key={index} css={headFont} variants={paragraphVariants}>
          {paragraph}
        </m.div>
      ))}
    </m.article>
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
  color: '#fff',
  fontSize: '20px',
  fontWeight: 500,
  lineHeight: '185%',
  letterSpacing: '0.3px',
};

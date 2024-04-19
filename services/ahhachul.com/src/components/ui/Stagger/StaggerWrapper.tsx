import { Children, type PropsWithChildren } from 'react';
import { motion, type Variants } from 'framer-motion';
import { CSSObject } from '@emotion/react';
import { staggerFadeInUpVariants } from 'data/motion';

export const stagger = (delay = 0.3): Variants => ({
  animate: { transition: { staggerChildren: delay } },
});

interface Props extends PropsWithChildren {
  /**
   * @description wrapper에 적용될 css 입니다.
   * @default ```css
   *  display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
    ```
   */
  wrapperOverrideCss?: string;
  /**
   * @description wrapper에 적용될 variants 입니다.
   * @default stagger(0.3)
   */
  staggerVariants?: Variants;
  /**
   * @description paragraph에 적용될 variants 입니다.
   * @default fadeInUpVariants
   */
  itemVariants?: Variants;
}

/**
 * @description children 노드 각각을 stagger가 적용된 div로 감싸 줍니다.
 */
const StaggerWrapper = ({
  children,
  wrapperOverrideCss,
  staggerVariants = stagger(0.3),
  itemVariants = staggerFadeInUpVariants,
}: Props) => {
  return (
    <motion.article
      css={[wrapperCss, wrapperOverrideCss]}
      variants={staggerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {Children.toArray(children).map((paragraph, index) => (
        <motion.div key={index} variants={itemVariants}>
          {paragraph}
        </motion.div>
      ))}
    </motion.article>
  );
};

export default StaggerWrapper;

const wrapperCss: CSSObject = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
};

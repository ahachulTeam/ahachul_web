import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { f } from 'styles';
import { useCTAButtonVisible, useParagraphStep } from './hooks';
import SkipStaggerWrapper from './SkipStaggerWrapper';
import { css, CSSObject, Theme } from '@emotion/react';
import { CTAMotionVariants, defaultFadeInVariants } from 'data/motion';
import { useFlow } from 'stackflow';

const Introduce = () => {
  const { replace } = useFlow();
  const goHome = () => replace('Home', {});
  const { currentStep } = useParagraphStep();
  const { isCTAButtonVisible } = useCTAButtonVisible();

  if (currentStep === 4) {
    return (
      <motion.section css={sectionCss} variants={defaultFadeInVariants} initial="initial" animate="animate" exit="exit">
        <article css={article}>
          <AnimatePresence mode="wait">{currentStep === 4 && <Paragraph4 key="4" />}</AnimatePresence>
        </article>

        {isCTAButtonVisible && (
          <motion.div css={fixedBottomCss} variants={CTAMotionVariants} initial="initial" animate="animate" exit="exit">
            <button css={cancelBtn} onClick={goHome}>
              돌아가기
            </button>
            <button css={submitBtn} onClick={() => {}}>
              생성하기
            </button>
          </motion.div>
        )}
      </motion.section>
    );
  }

  return (
    <motion.section css={wrap}>
      <article css={article}>
        <AnimatePresence mode="wait">
          {[1, 2, 3].includes(currentStep) && (
            <>
              {currentStep === 1 && <Paragraph1 key="1" />}
              {currentStep === 2 && <Paragraph2 key="2" />}
              {currentStep === 3 && <Paragraph3 key="3" />}
            </>
          )}
        </AnimatePresence>
      </article>
    </motion.section>
  );
};

const Paragraph1 = () => {
  return (
    <SkipStaggerWrapper>
      <p>안녕하세요!</p>
      <p>아하철에서</p>
    </SkipStaggerWrapper>
  );
};

const Paragraph2 = () => {
  return (
    <SkipStaggerWrapper>
      <p>블라인드 데이트와</p>
      <p>
        사진을 통해서 <strong>인연</strong>를 찾는
      </p>
      <p>기회를 잡아보세요</p>
    </SkipStaggerWrapper>
  );
};

const Paragraph3 = () => {
  return (
    <SkipStaggerWrapper>
      <p>아하철만의</p>
      <p>
        <strong>강력한 기능</strong>으로
      </p>
      <p>새로운 인연을 만날 수 있어요</p>
    </SkipStaggerWrapper>
  );
};

const Paragraph4 = () => {
  return (
    <SkipStaggerWrapper>
      <p>지금, 바로</p>
      <p>
        <strong>나의 정보</strong>를 입력해보세요!
      </p>
    </SkipStaggerWrapper>
  );
};

const wrap = [
  f.sideGutter,
  f.fullWidth,
  f.flexColumn,
  ({
    color: {
      static: {
        dark: { gray },
      },
    },
  }: Theme) => ({
    paddingTop: '28px',
    backgroundColor: gray[200],
  }),
];

const article = {
  marginBottom: '42px',
  paddingTop: '26px',
};

const sectionCss = css`
  position: relative;
  z-index: 1000;

  width: 100%;
  height: 100%;
`;

const fixedBottomCss: CSSObject[] = [
  f.fullWidth,
  {
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#141517',
    padding: '16px 20px 24px',
  },
];

const cancelBtn = ({ typography: { fontSize, fontWeight } }: Theme): CSSObject => ({
  padding: '0 14px',
  fontSize: fontSize[14],
  width: '100%',
  color: '#ffffff',
  fontWeight: fontWeight[600],
  borderRadius: '8px',
  marginBottom: '24px',
});

const submitBtn = ({ typography: { fontSize, fontWeight } }: Theme): CSSObject => ({
  padding: '0 14px',
  fontSize: fontSize[14],
  width: '100%',
  height: '48px',
  background: 'rgb(196, 212, 252)',
  color: '#141517',
  fontWeight: fontWeight[600],
  borderRadius: '8px',
});

export default Introduce;

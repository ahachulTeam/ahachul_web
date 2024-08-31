import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { f } from '@/src/styles';
import { useCTAButtonVisible, useParagraphStep } from './hooks';
import SkipStaggerWrapper from './SkipStaggerWrapper';
import { CSSObject, Theme } from '@emotion/react';
import { CTAMotionVariants } from '@/src/data/motion';
// import { useFlow } from 'stackflow';
import { useDispatch } from 'react-redux';
import { setAcceptUsingBlindDate } from '@/src/stores/blindDate';

const Introduce = () => {
  // const { replace } = useFlow();
  const dispatch = useDispatch();
  // const goHome = () => replace('Home', {});
  const goFormForBlindDate = () => {
    dispatch(setAcceptUsingBlindDate());
  };
  const { currentStep } = useParagraphStep();
  const { isCTAButtonVisible } = useCTAButtonVisible();

  return (
    <motion.section css={wrap}>
      <article css={article}>
        <AnimatePresence mode="wait">
          {[1, 2, 3, 4].includes(currentStep) && (
            <>
              {currentStep === 1 && <Paragraph1 key="1" />}
              {currentStep === 2 && <Paragraph2 key="2" />}
              {currentStep === 3 && <Paragraph3 key="3" />}
              {currentStep === 4 && <Paragraph4 key="4" />}
            </>
          )}
        </AnimatePresence>
      </article>
      {isCTAButtonVisible && (
        <motion.div css={fixedBottomCss} variants={CTAMotionVariants} initial="initial" animate="animate" exit="exit">
          <button css={cancelBtn}>돌아가기</button>
          <button css={submitBtn} onClick={goFormForBlindDate}>
            시작하기
          </button>
        </motion.div>
      )}
    </motion.section>
  );
};

const Paragraph1 = () => {
  return (
    <SkipStaggerWrapper staggerDelay={0}>
      <p>안녕하세요!</p>
    </SkipStaggerWrapper>
  );
};

const Paragraph2 = () => {
  return (
    <SkipStaggerWrapper>
      <p>소개팅과 미팅을</p>
      <p>
        <strong>매일 한번씩</strong>
      </p>
      <p>매칭시켜드릴게요</p>
    </SkipStaggerWrapper>
  );
};

const Paragraph3 = () => {
  return (
    <SkipStaggerWrapper>
      <p>아하철만의</p>
      <p>
        특별한 <strong>소개팅</strong>으로
      </p>
      <p>새로운 인연을 만나보세요</p>
    </SkipStaggerWrapper>
  );
};

const Paragraph4 = () => {
  return (
    <SkipStaggerWrapper>
      <p>
        <strong>지금</strong>
      </p>
      <p>
        <strong>바로</strong>
      </p>
      <p>
        <strong>시작해보세요!</strong>
      </p>
    </SkipStaggerWrapper>
  );
};

const wrap = [
  f.sideGutter,
  f.fullWidth,
  f.flexColumn,
  ({ color: { gray } }: Theme) => ({
    paddingTop: '28px',
    backgroundColor: gray[200],
  }),
];

const article = {
  marginBottom: '42px',
  paddingTop: '26px',
};

// const sectionCss = css`
//   position: relative;
//   z-index: 1000;

//   width: 100%;
//   height: 100%;
// `;

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

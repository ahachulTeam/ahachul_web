import useBoolean from 'hooks/useBoolean';
import { useState, useEffect } from 'react';

const 문구_수 = 4;
const 매_문구_지속시간 = 2500;

export const useParagraphStep = () => {
  const { currentStep, next: paragraphStep } = useStep({ initial: 1, max: 문구_수 });

  useEffect(() => {
    const interval = setInterval(paragraphStep, 매_문구_지속시간);

    return () => {
      clearInterval(interval);
    };
  }, [paragraphStep]);

  return {
    currentStep,
    paragraphStep,
  };
};

export const useCTAButtonVisible = () => {
  const [isCTAButtonVisible, , setTrue] = useBoolean(false);

  useEffect(() => {
    const timeout = setTimeout(setTrue, 문구_수 * 매_문구_지속시간 - 800);

    return () => {
      clearTimeout(timeout);
    };
  }, [setTrue]);

  return { isCTAButtonVisible, skip: setTrue };
};

type UseStepProps = {
  initial?: number;
  max?: number;
};

const useStep = ({ initial = 0, max }: UseStepProps) => {
  const [currentStep, setCurrentStep] = useState(initial);

  function prev(n?: number) {
    if (0 >= currentStep) return;
    setCurrentStep((prevStep) => prevStep - (n ? n : 1));
  }

  function next(n?: number) {
    if (currentStep >= (max || Infinity)) return;
    setCurrentStep((prevStep) => {
      if (prevStep === (max || Infinity)) return prevStep;

      return prevStep + (n ? n : 1);
    });
  }

  return { currentStep, setCurrentStep, prev, next };
};

export default useStep;

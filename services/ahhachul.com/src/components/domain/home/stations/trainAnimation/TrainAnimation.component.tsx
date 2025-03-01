import { useLayoutEffect, useRef, useState } from 'react';

import { useThrottle } from '@/hooks';

import * as S from './TrainAnimation.styled';
import { TrainEachSection } from './TrainEachSection';
import { TrainIcon } from './TrainIcon';

const TrainAnimation = () => {
  const container = useRef<HTMLDivElement | null>(null);

  const [width, setWidth] = useState(0);

  const detectionViewport = () => {
    const width = (container.current as HTMLElement)?.getBoundingClientRect().width;
    setWidth(width);
  };

  const handleDetectViewport = useThrottle(detectionViewport, 1000);

  useLayoutEffect(() => {
    detectionViewport();

    window.addEventListener('resize', handleDetectViewport);

    return () => {
      window.removeEventListener('resize', handleDetectViewport);
    };
  }, []);

  return (
    <div css={S.trainCongestions} ref={container}>
      {width && <TrainIcon width={width} />}
      {width && (
        <ul>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, idx) => (
            <li key={`${item}-${idx}`}>
              <TrainEachSection roomNumber={item} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TrainAnimation;

import styled, { CSSObject } from '@emotion/styled';
import { useIsomorphicLayoutEffect } from 'framer-motion';
import { useRef, useState } from 'react';
import throttle from 'lodash-es/throttle';
import TrainEachBox from './Box';
import TrainSvg from './SVG';
import { useGetTrainCongestionInfo } from 'queries/train/useGetTrainCongestionInfo';
import { formatCongestionColorToHexColor } from 'utils/export';

interface TrainProps {
  trainNo: string;
  subwayLineId: string;
  calculatedCrowdRatings?: string[];
}

function Train({ trainNo, subwayLineId }: TrainProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  console.log('trainNo:', trainNo);

  const { data } = useGetTrainCongestionInfo({ trainNo, subwayLineId });

  useIsomorphicLayoutEffect(() => {
    const detectionViewport = () => {
      const fullWidth = (containerRef.current as HTMLElement)?.getBoundingClientRect().width;
      setContainerWidth(fullWidth);
    };

    detectionViewport();

    const handleDetectViewport = throttle(detectionViewport, 1000);
    window.addEventListener('resize', handleDetectViewport);

    return () => {
      window.removeEventListener('resize', handleDetectViewport);
    };
  }, []);

  return (
    <Container ref={containerRef}>
      <TrainSvg width={containerWidth} />
      {containerWidth && (
        <ul>
          {data?.congestions?.map((item, i) => (
            <li key={i}>
              <TrainEachBox color={formatCongestionColorToHexColor(item?.congestionColor)} roomNumber={i + 1} />
              {item?.congestionColor === 'SMOOTH' && (
                <div css={tooltip}>
                  <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M11.5 20.125C16.2635 20.125 20.125 16.2635 20.125 11.5C20.125 6.73654 16.2635 2.875 11.5 2.875C6.73654 2.875 2.875 6.73654 2.875 11.5C2.875 16.2635 6.73654 20.125 11.5 20.125Z"
                      fill="#6FDA74"
                    />
                    <path
                      d="M14.375 9.58333L10.5417 13.4167L8.625 11.5"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>추천</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;

  & > ul {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    column-gap: 4px;
    width: calc(100% - 32px);
    position: absolute;
    top: 4px;

    & > li {
      width: 100%;
      height: 26px;
      position: relative;
      left: 8px;
    }
  }
`;

const tooltip: CSSObject = {
  marginTop: '10px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '4px',
  color: '#ffffff',
  fontSize: '12px',
  letterSpacing: '-0.2px',
};

export default Train;

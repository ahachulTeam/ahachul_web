import styled from '@emotion/styled';
import { useIsomorphicLayoutEffect } from 'framer-motion';
import { useRef, useState } from 'react';
import throttle from 'lodash-es/throttle';
import TrainEachBox from './Box';
import TrainSvg from './SVG';

interface TrainProps {
  calculatedCrowdRatings?: string[];
}

function Train({
  calculatedCrowdRatings = [
    '#EE6161',
    '#FFC44D',
    '#6FDA74',
    '#FF884D',
    '#EE6161',
    '#FF884D',
    '#FFC44D',
    '#6FDA74',
    '#6FDA74',
    '#EE6161',
  ],
}: TrainProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
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
          {calculatedCrowdRatings?.map((item, i) => (
            <li key={i}>
              <TrainEachBox color={item} roomNumber={i + 1} />
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

export default Train;

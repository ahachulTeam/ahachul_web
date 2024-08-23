import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styled from '@emotion/styled';
import { exportHexColorWidthLineName } from 'utils/export';
import { defaultFadeInVariants } from 'shared/data/motion';

const ThickBorderArea = () => {
  return (
    <ThickBorder tabIndex={-1} backColor={exportHexColorWidthLineName(subwayLineIds[0])}>
      <StationLabel
        css={{
          transition: 'border-color 0.4s ease-in-out',
          borderColor: exportHexColorWidthLineName(subwayLineIds[0]),
        }}
      >
        건대입구
      </StationLabel>
      <AnimatePresence mode="wait">
        {!isLoading && (
          <DirectionLabel variants={defaultFadeInVariants} initial="initial" animate="animate" exit="exit">
            {data?.trainRealTimes?.[selectedIdx]?.nextStationDirection}
          </DirectionLabel>
        )}
      </AnimatePresence>
    </ThickBorder>
  );
};

const ThickBorder = styled.div<{ backColor: string }>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 25px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: ${({ backColor }) => backColor};
  transition: background-color 0.4s ease-in-out;
`;

const StationLabel = styled.span`
  font-size: 16px;
  font-weight: 600;
  position: absolute;
  top: 50%;
  left: 27px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  border: 3px solid #20b154;
  border-radius: 21px;
  padding: 8px 32px;
  background-color: #ffffff;
  transform: translateY(-50%);
`;

const DirectionLabel = styled(motion.span)`
  font-size: 14px;
  font-weight: 600;
  position: absolute;
  top: 50%;
  left: 157px;
  transform: translateY(-50%);
  color: #ffffff;
`;

export default ThickBorderArea;

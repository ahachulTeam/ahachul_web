import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { SVGProps } from 'react';

interface TrainEachSvgProps extends SVGProps<SVGSVGElement> {
  /**
   * @description fill 색상 값입니다. `isUsingFill`로 사용하지 않을 수 있습니다.
   * @default `currentColor`
   */
  color?: string;
  roomNumber?: number;
}

const TrainEachSvg = ({ color, roomNumber }: TrainEachSvgProps) => {
  return <EachBox color={color}>{roomNumber}</EachBox>;
};

const EachBox = styled.div`
  ${({ color }) => css`
    font-size: 14px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 115%;
    border-radius: 6px;
    background-color: ${color};
    color: #ffffff;
    box-shadow: 0px 3px 1px 0px #585858;
  `}
`;
export default TrainEachSvg;

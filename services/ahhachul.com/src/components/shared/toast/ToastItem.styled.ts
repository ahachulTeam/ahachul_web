import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/react";

interface ToastItemProps {
  isClosing: boolean;
}

const scaleUp = keyframes`
  from { max-height: 0;}
  to {max-height: 100px;}
`;

const scaleDown = keyframes`
  from { max-height: 100px;}
  to { max-height: 0;}
 `;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-50%);}
  to { opacity: 1; transform: translateY(0)}
`;

const fadeOut = keyframes`
  from { opacity: 1; transform: translateY(0)}
  to { opacity: 0; transform: translateY(50%)}
 `;

export const ToastItem = styled.div<ToastItemProps>`
  ${({ isClosing }) => css`
    max-height: 0;
    overflow: visible;
    animation: 0.6s forwards ${isClosing ? scaleDown : scaleUp};

    & > div {
      animation: 0.3s forwards ${isClosing ? fadeOut : fadeIn};
    }
  `}
`;

export const Item = styled.div`
  display: flex;
  column-gap: 14px;
  align-items: center;
  width: 320px;
  border-radius: 5px;
  padding: 20px 24px;
  background-color: white;
  box-shadow: 0 4px 16px 0 rgba(25, 31, 40, 0.12);

  & > svg {
    width: 40px;
  }

  & > p {
    font-size: 14px;
    color: #000;
  }

  &[data-type="warning"] {
    svg {
      fill: red;
    }
  }
`;

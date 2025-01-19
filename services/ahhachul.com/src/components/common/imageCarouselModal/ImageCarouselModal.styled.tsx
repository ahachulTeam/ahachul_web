import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  background-color: #000;
`;

export const Header = styled.div<{ headerShown: boolean; isPanEnabled: boolean }>`
  width: 100%;
  height: 58px;
  padding: 0 16px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  background-color: ${props => (props.isPanEnabled ? 'rgba(0,0,0,0)' : '#000')};

  & > span,
  & > div {
    opacity: ${props => (props.headerShown ? 1 : 0)};
    transition: opacity 0.3s ease-in-out;
  }
`;

export const Title = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.headlineSmall}
    color: ${theme.colors.white};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `}
`;

export const Body = styled.div<{ isPanEnabled: boolean }>`
  width: 100%;
  height: 100%;
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => (props.isPanEnabled ? '0' : '58px 0')};
  transition: padding 0.3s ease-in-out;
`;

export const swiperCss = css`
  width: 100%;
  height: 100%;

  & .slide {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Container = styled.nav`
  display: grid;
  grid-template-columns: repeat(2, 36px);
  align-items: center;
  gap: 2px;
`;

export const navigationButtonStyle = css`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const FilterList = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
  overflow: overlay;
`;

export const resetCss = () => css`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e7e7e7;
  width: 30px;
  height: 30px;
  border-radius: 50%;

  & > svg > g > path {
  }
`;

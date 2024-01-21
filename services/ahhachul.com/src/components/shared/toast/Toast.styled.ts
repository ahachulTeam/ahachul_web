import styled from "@emotion/styled";

export const Toast = styled.div`
  position: fixed;
  top: 60px;
  left: 50%;
  height: max-content;
  pointer-events: none;
  transform: translateX(-50%);
  z-index: var(--z-indexes-toast);

  & > div:not(:first-of-type) {
    margin-top: 8px;
  }
`;

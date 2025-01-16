import styled from '@emotion/styled';

/* z-index: ${({ theme }: { theme: Theme }) => theme.dimensions.zIndexes.nav - 1}; */
export const BottomDim = styled.div`
  width: 100vw;
  max-width: 520px;
  margin: 0 auto;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  height: 200px;
  background: linear-gradient(
    180deg,
    rgba(24, 24, 29, 0) 0%,
    rgba(24, 24, 29, 0.09) 7.58%,
    rgba(24, 24, 29, 0.59) 34.59%,
    rgba(24, 24, 29, 0.69) 41.18%,
    rgba(24, 24, 29, 0.83) 51.39%,
    #18181d 63.25%
  );
`;

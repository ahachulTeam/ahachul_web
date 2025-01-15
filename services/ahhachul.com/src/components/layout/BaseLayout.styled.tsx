import styled from '@emotion/styled';

import mixins from '@/styles/mixins';

export const Main = styled.main`
  ${mixins.top0}
  ${mixins.posAbsFull}
  ${mixins.rootLineHeight}
  ${mixins.flexColumn}
  ${mixins.fullWidth}
  ${mixins.maxWidth}
`;

interface ScrollableProps {
  navigationSlot?: boolean;
}

// padding-top: ${({ dimensions }: Theme) => dimensions.size.height.header};
// padding-bottom: ${({ dimensions, navigationSlot = false }: Theme & ScrollableProps) =>
//   navigationSlot ? dimensions.size.height.navbar : 0};
export const Scrollable = styled.div<ScrollableProps>`
  ${mixins.flex1}
  ${mixins.overflowScroll}
`;

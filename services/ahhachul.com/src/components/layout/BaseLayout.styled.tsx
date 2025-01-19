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
export const Scrollable = styled.div<ScrollableProps>`
  ${mixins.flex1}
  ${mixins.overflowYScroll}
  
  padding-bottom: ${({ theme, navigationSlot }) =>
    navigationSlot ? theme.size.navbar.height_m : 0};
`;

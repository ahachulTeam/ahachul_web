import styled from '@emotion/styled';

import { StackFlow } from '@/stackflow';

export const Container = styled.nav`
  display: grid;
  grid-template-columns: repeat(2, 36px);
  align-items: center;
  gap: 8px;
`;

export const NavigationButton = styled(StackFlow.Link)`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

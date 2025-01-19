import styled from '@emotion/styled';

import { mixins } from '@/styles';

export const ViewMore = styled.div`
  & > span {
    ${mixins.visuallyHidden};
  }
`;

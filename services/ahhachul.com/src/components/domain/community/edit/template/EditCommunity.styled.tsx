import styled from '@emotion/styled';

import { mixins } from '@/styles';

export const FormContainer = styled.div`
  ${mixins.fullWidth};
  ${mixins.flexColumn};
  ${mixins.pagePaddingTop};
  ${mixins.pagePaddingBottom};
`;

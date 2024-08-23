import { theme } from 'shared/style';

const selector = 'cupertino';

export const defaultOptions = {
  theme: selector,
  appBar: {
    borderSize: '0',
    height: theme.dimensions.size.height.header,
  },
} as const;

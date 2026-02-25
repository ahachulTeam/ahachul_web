import localFont from 'next/font/local';

import { fontSansFallback } from '@ahhachul/design-system';

const Pretendard = localFont({
  src: './pretendard-variable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
  fallback: [...fontSansFallback],
});

export { Pretendard };

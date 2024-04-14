import { useRouter } from 'next/router';

import { IHeaderProps } from '@/src/types';
import { PATH } from '@/src/data';
import IconHeaderBack from '@/src/static/icons/system/IconHeaderBack';
import { headerWrap, titleCss } from './style';
import { isHistoryExist } from '@/src/utils/appEnv';

const BackButtonHeader = ({ title }: IHeaderProps) => {
  const router = useRouter();

  const handleBackIconClick = () => {
    const storage = globalThis?.sessionStorage;
    if (!storage) router.replace(PATH.home);
    else {
      const hasBackHistory = isHistoryExist(storage);
      if (hasBackHistory) {
        const history = storage.getItem('prevPath') as string;
        router.replace(history, history, { shallow: true });
      } else router.replace(PATH.home);
    }
  };

  return (
    <header css={headerWrap}>
      <IconHeaderBack css={{ height: '100%', padding: '0 8px', width: '52px' }} onClick={handleBackIconClick} />
      {title && <h1 css={titleCss}>{title}</h1>}
    </header>
  );
};

export default BackButtonHeader;

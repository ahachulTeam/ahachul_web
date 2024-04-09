import { useRouter } from 'next/navigation';

import { IHeaderProps } from '@/src/types';
import { PATH } from '@/src/data';
import IconHeaderBack from '@/src/static/icons/system/IconHeaderBack';
import { headerWrap, titleCss } from './style';

const BackButtonHeader = ({ title }: IHeaderProps) => {
  const router = useRouter();

  const handleBackIconClick = () => {
    let prevPathIsNotThisApp = false;

    if (prevPathIsNotThisApp) router.push(PATH.home);
    else router.back();
  };

  return (
    <header css={headerWrap}>
      <IconHeaderBack css={{ height: '100%', padding: '0 8px', width: '52px' }} onClick={handleBackIconClick} />
      {title && <h1 css={titleCss}>{title}</h1>}
    </header>
  );
};

export default BackButtonHeader;

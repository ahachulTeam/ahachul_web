import { IHeaderProps } from '@/src/types';
import BackButtonHeader from './BackButtonHeader';
import DefaultHeader from './DefaultHeader';
import SearchHeader from './SearchHeader';

function Header({ headerType, title }: IHeaderProps) {
  switch (headerType) {
    case 'default':
      return <DefaultHeader />;
    case 'search':
      return <SearchHeader />;
    case 'back':
      return <BackButtonHeader title={title} />;
    default:
      return <DefaultHeader />;
  }
}

export default Header;

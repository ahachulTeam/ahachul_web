import { useRouter } from 'next/navigation';
import { throttle } from 'lodash-es';

import { useAppSelector } from '@/src//stores';
import { PATH } from '@/src/data';
import IconLogo from '@/src/static/icons/system/IconLogo';
import IconBellActive from '@/src/static/icons/system/IconBellActive';
import IconSearch from '@/src/static/icons/system/IconSearch';
import mockProfile from '@/src/static/img/mocks/mock3.png';
import { headerWrap, left, right } from './style';
import { useDispatch } from 'react-redux';
import { showModal } from '@/src/stores/search/reducer';

const SearchHeader = () => {
  const { push, replace } = useRouter();
  const { auth } = useAppSelector((state) => state.auth);

  const dispatch = useDispatch();
  const handleSearchModalOpen = () => dispatch(showModal());

  const handleLogoClick = throttle(() => replace(PATH.home), 1000);

  const clickAlarmBtn = throttle(() => {
    push(PATH.alarm);
  }, 1000);

  const clickMeBtn = throttle(() => {
    push(auth?.accessToken ? PATH.me : PATH.signin);
  }, 1000);

  return (
    <header css={headerWrap}>
      <IconLogo css={left} onClick={handleLogoClick} />
      <div css={right(true)}>
        <IconBellActive onClick={clickAlarmBtn} />
        <IconSearch onClick={handleSearchModalOpen} css={{ position: 'relative', top: '-1px' }} />
        <img src={mockProfile.src} alt="" onClick={clickMeBtn} />
      </div>
    </header>
  );
};

export default SearchHeader;

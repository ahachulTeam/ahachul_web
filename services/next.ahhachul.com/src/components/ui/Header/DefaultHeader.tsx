import { useRouter } from 'next/navigation';

import { useAppSelector } from '@/src//stores';
import { PATH } from '@/src/data';
import mockProfile from '@/src/static/img/mocks/mock3.png';
import IconLogo from '@/src/static/icons/system/IconLogo';
import { throttle } from 'lodash-es';
import IconBellActive from '@/src/static/icons/system/IconBellActive';
import { headerWrap, left, right } from './style';

const DefaultHeader = () => {
  const { push, replace } = useRouter();
  const { auth } = useAppSelector((state) => state.auth);

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
      <div css={right(false)}>
        <IconBellActive onClick={clickAlarmBtn} />
        <img src={mockProfile.src} alt="" onClick={clickMeBtn} />
      </div>
    </header>
  );
};

export default DefaultHeader;

import { throttle } from 'lodash-es';
import React from 'react';
import { useDispatch } from 'react-redux';

import { TypeActivities, useFlow } from 'stackflow';
import IconBellActive from 'shared/static/icons/system/IconBellActive';
import IconBlindDate from 'shared/static/icons/system/IconBlindDate';
import IconLogo from 'shared/static/icons/system/IconLogo';
import IconSearch from 'shared/static/icons/system/IconSearch';
import mockProfile from 'static/img/mocks/mock3.png';
import { hideNavbar, showNavbar } from 'stores/blindDate';
import { showModal } from 'stores/search/reducer';
import { KeyOf } from 'types';
import { left, right } from './style';

const useDefaultAppBar = ({
  activeTab,
  hasSearch,
  isDate,
}: {
  activeTab?: KeyOf<TypeActivities> | false;
  hasSearch: boolean;
  isDate: boolean;
}) => {
  const { push, replace } = useFlow();
  const dispatch = useDispatch();
  const handleSearchModalOpen = () => dispatch(showModal());

  const appBarLeft = () => (
    <div css={left} onClick={clickLogoBtn}>
      {isDate ? <IconBlindDate /> : <IconLogo />}
    </div>
  );

  const clickLogoBtn = throttle(() => {
    if (activeTab === 'Home') return;
    if (isDate) {
      dispatch(hideNavbar());
      setTimeout(() => {
        replace('Home', {}, { animate: true });
        dispatch(showNavbar());
      }, 750);
    } else {
      replace('Home', {}, { animate: false });
    }
  }, 1000);

  const clickAlarmBtn = throttle(() => {
    push('Alarm', {});
  }, 1000);

  const clickMeBtn = throttle(() => {
    push('MyProfile', {});
  }, 1000);

  const appBarRight = () => (
    <div css={right(hasSearch)}>
      <IconBellActive onClick={clickAlarmBtn} />
      {hasSearch && <IconSearch onClick={handleSearchModalOpen} css={{ position: 'relative', top: '-1px' }} />}
      <img src={mockProfile} alt="" onClick={clickMeBtn} />
    </div>
  );

  return {
    defaultAppBar: {
      renderLeft: appBarLeft,
      renderRight: isDate ? null : appBarRight,
    },
  };
};

export default useDefaultAppBar;

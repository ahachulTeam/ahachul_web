import React from 'react';
import { useDispatch } from 'react-redux';

import { TypeActivities, useFlow } from 'stackflow';
import IconBellActive from 'static/icons/system/IconBellActive';
import IconLogo from 'static/icons/system/IconLogo';
import IconSearch from 'static/icons/system/IconSearch';
import mockProfile from 'static/img/mocks/mock3.png';
import { showModal } from 'stores/search/reducer';
import { KeyOf } from 'types';
import { left, right } from './style';

const useDefaultAppBar = ({
  activeTab,
  hasSearch,
  isDate,
  hasRightBtns,
}: {
  activeTab?: KeyOf<TypeActivities> | false;
  hasSearch: boolean;
  isDate: boolean;
  hasRightBtns: boolean;
}) => {
  const { push, replace } = useFlow();
  const dispatch = useDispatch();
  const handleSearchModalOpen = () => dispatch(showModal());

  const appBarLeft = () => (
    <div css={left} onClick={clickLogoBtn}>
      <IconLogo />
    </div>
  );

  const clickLogoBtn = () => {
    if (activeTab === 'Home') return;
    replace('Home', {});
  };

  const clickAlarmBtn = () => {
    if (isDate) {
      alert('go to date alarms');
    } else {
      push('Alarm', {});
    }
  };

  const clickMeBtn = () => {
    if (isDate) {
      alert('go to date MyProfile');
    } else {
      push('MyProfile', {});
    }
  };

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
      renderRight: hasRightBtns ? appBarRight : null,
    },
  };
};

export default useDefaultAppBar;

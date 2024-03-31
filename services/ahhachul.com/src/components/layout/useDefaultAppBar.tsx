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

const useDefaultAppBar = (hasSearch: boolean) => {
  const { push, replace } = useFlow();
  const dispatch = useDispatch();
  const handleModalOpen = () => dispatch(showModal());

  const appBarLeft = () => (
    <div css={left}>
      <IconLogo />
    </div>
  );

  const appBarRight = () => (
    <div css={right(hasSearch)}>
      <IconBellActive onClick={() => push('Alarm', {})} />
      {hasSearch && <IconSearch onClick={handleModalOpen} css={{ position: 'relative', top: '-1px' }} />}
      <img src={mockProfile} alt="" onClick={() => push('MyProfile', {})} />
    </div>
  );

  const pushTo = React.useCallback((tab: KeyOf<TypeActivities>) => push(tab, {}), [push]);
  const navigate = React.useCallback((tab: KeyOf<TypeActivities>) => replace(tab, {}, { animate: false }), [replace]);

  return {
    push: pushTo,
    replace: navigate,
    defaultAppBar: {
      renderLeft: appBarLeft,
      renderRight: appBarRight,
    },
  };
};

export default useDefaultAppBar;

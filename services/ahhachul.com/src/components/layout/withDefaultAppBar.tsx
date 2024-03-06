import React from 'react';
import { useFlow } from 'stackflow';

import IconBellActive from 'static/icons/system/IconBellActive';
import IconLogo from 'static/icons/system/IconLogo';
import mockProfile from 'static/img/mocks/mock3.png';
import { left, right } from './style';

const withDefaultAppBar = () => {
  const { push, replace } = useFlow();

  const appBarLeft = () => (
    <div css={left}>
      <IconLogo />
    </div>
  );

  const appBarRight = () => (
    <div css={right}>
      <IconBellActive onClick={() => push('Alarm', {})} />
      <img src={mockProfile} alt="" onClick={() => push('MyProfile', {})} />
    </div>
  );

  return {
    replace,
    defaultAppBar: {
      renderLeft: appBarLeft,
      renderRight: appBarRight,
    },
  };
};

export default withDefaultAppBar;

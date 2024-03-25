import React from 'react';

import { useFlow } from 'stackflow';
// import IconBellActive from 'static/icons/system/IconBellActive';
import IconLogo from 'static/icons/system/IconLogo';
import IconSearch from 'static/icons/system/IconSearch';
// import mockProfile from 'static/img/mocks/mock3.png';
import { left, right } from './style';

const withDefaultAppBar = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { replace } = useFlow();

  const appBarLeft = () => (
    <div css={left}>
      <IconLogo />
    </div>
  );

  const appBarRight = () => (
    <div css={right}>
      <IconSearch />
      {/* <IconBellActive onClick={() => push('Alarm', {})} /> */}
      {/* <img src={mockProfile} alt="" onClick={() => push('MyProfile', {})} /> */}
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

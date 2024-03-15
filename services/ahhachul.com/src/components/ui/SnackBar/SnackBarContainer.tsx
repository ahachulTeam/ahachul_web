import React from 'react';
import { container } from './style';
import { useAppSelector } from 'stores';
import SnackBar from './SnackBar';

function SnackBarContainer() {
  const {
    snackBars: { posBottom, list },
  } = useAppSelector((state) => state.ui);

  return (
    <div css={container(posBottom)}>
      {list.map((snackBar) => (
        <SnackBar key={snackBar.id} {...snackBar} />
      ))}
    </div>
  );
}

export default SnackBarContainer;

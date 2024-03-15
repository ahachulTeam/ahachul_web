import React from 'react';
import { container } from './style';
import SnackBar from './SnackBar';
import { ISnackBar } from 'types';

function SnackBarContainer({ list, posBottom }: ISnackBar) {
  return (
    <div css={container(posBottom)}>
      {list.map((snackBar) => (
        <SnackBar key={snackBar.id} {...snackBar} />
      ))}
    </div>
  );
}

export default SnackBarContainer;

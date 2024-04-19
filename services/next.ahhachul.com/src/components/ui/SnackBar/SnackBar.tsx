import React from 'react';

import { wrap, toast, text } from './style';
import { ISnackBarPayload } from '@/src/types';
import { useDispatch } from 'react-redux';
import { removeSnackBar } from '@/src/stores/ui';
import { useTimeout } from '@/src/hooks';

function SnackBar({ id, message }: ISnackBarPayload) {
  const dispatch = useDispatch();

  useTimeout(() => {
    dispatch(removeSnackBar({ id }));
  }, 2000);

  return (
    <div css={wrap}>
      <div css={toast}>
        <pre css={text}>{message}</pre>
      </div>
    </div>
  );
}

export default SnackBar;

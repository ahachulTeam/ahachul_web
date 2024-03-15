import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { wrap, toast, text, closeBtn } from './style';
import { delay, fromEvent, interval, merge, take, tap } from 'rxjs';
import { removeSnackBar } from 'stores/ui';
import IconClose from 'static/icons/system/IconClose';
import { ISnackBarPayload } from 'types';

const TOAST_DURATION = 3000;
const TRANSITION_DURATION = 1000;
const timer = interval(TOAST_DURATION).pipe(take(1));

function SnackBar({ id, message }: ISnackBarPayload) {
  const dispatch = useDispatch();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [isClosing, setIsClosing] = useState<boolean>(false);

  useEffect(() => {
    const subscription = merge(timer, fromEvent(buttonRef.current as HTMLButtonElement, 'click'))
      .pipe(
        take(1),
        tap(() => setIsClosing(true)),
        delay(TRANSITION_DURATION),
      )
      .subscribe(() => {
        dispatch(removeSnackBar({ id }));
      });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div css={wrap(isClosing)}>
      <div css={toast}>
        <p css={text}>{message}</p>
        <button ref={buttonRef} type="button">
          <IconClose css={closeBtn} />
        </button>
      </div>
    </div>
  );
}

export default SnackBar;

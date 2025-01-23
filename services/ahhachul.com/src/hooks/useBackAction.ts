import { useEffect, useRef } from 'react';

import { useActivity } from '@stackflow/react';

import { WebViewMessage } from '@/types';

const DEFAULT_EXIT_DELAY = 2000;

interface UseBackActionOptions {
  mainActivities: string[];
  exitDelay?: number;
  onExit?: () => void;
  onBack?: () => void;
  onExitWarning?: () => void;
}

const useBackAction = ({
  mainActivities,
  exitDelay = DEFAULT_EXIT_DELAY,
  onExit,
  onBack,
  onExitWarning,
}: UseBackActionOptions) => {
  const { name } = useActivity();
  const isExitConfirmationPending = useRef<boolean>(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (typeof event.data !== 'string') return;

      try {
        const data: WebViewMessage = JSON.parse(event.data);
        if (data.name !== 'backAction') return;

        handleBackAction();
      } catch (error) {
        console.error('Failed to parse message data:', error);
      }
    };

    const handleBackAction = () => {
      if (mainActivities.includes(name)) {
        if (isExitConfirmationPending.current) {
          onExit?.();
          return;
        }

        isExitConfirmationPending.current = true;
        onExitWarning?.();

        setTimeout(() => {
          isExitConfirmationPending.current = false;
        }, exitDelay);
      } else {
        onBack?.();
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [name, mainActivities, exitDelay, onExit, onBack, onExitWarning]);
};

export default useBackAction;

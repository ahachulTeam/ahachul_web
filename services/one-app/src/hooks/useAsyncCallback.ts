import { useCallback, useMemo, useRef } from 'react';

import { createActionLogger } from '@/lib/observability';

interface AsyncCallbackOptions<E = Error> {
  onSuccess?: () => void;
  onError?: (error: E) => void;
  onSettled?: () => void;
  logScope?: string;
  actionName?: string;
  logContext?: () => Record<string, unknown> | undefined;
}

export function useAsyncCallback<T, E = Error>(
  callback: () => Promise<T>,
  options: AsyncCallbackOptions<E> = {},
) {
  const { onSuccess, onError, onSettled, logScope, actionName = 'execute', logContext } = options;
  const isLoadingRef = useRef(false);
  const logger = useMemo(
    () => (logScope ? createActionLogger(`async-callback:${logScope}`) : null),
    [logScope],
  );

  const execute = useCallback(async () => {
    if (isLoadingRef.current) {
      logger?.warn('skip-while-loading', logContext?.());
      return;
    }

    try {
      isLoadingRef.current = true;
      logger?.start(actionName, logContext?.());
      const result = await callback();
      onSuccess?.();
      logger?.success(actionName, logContext?.());
      return result;
    } catch (error) {
      onError?.(error as E);
      logger?.fail(actionName, error, logContext?.(), '비동기 작업을 처리하지 못했습니다.');
      throw error;
    } finally {
      isLoadingRef.current = false;
      onSettled?.();
    }
  }, [actionName, callback, logContext, logger, onError, onSettled, onSuccess]);

  return {
    execute,
    isLoading: isLoadingRef.current,
  };
}

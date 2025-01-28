import { useCallback, useRef } from 'react';

interface AsyncCallbackOptions<E = Error> {
  onSuccess?: () => void;
  onError?: (error: E) => void;
  onSettled?: () => void;
}

export function useAsyncCallback<T, E = Error>(
  callback: () => Promise<T>,
  options: AsyncCallbackOptions<E> = {},
) {
  const { onSuccess, onError, onSettled } = options;
  const isLoadingRef = useRef(false);

  const execute = useCallback(async () => {
    if (isLoadingRef.current) {
      return;
    }

    try {
      isLoadingRef.current = true;
      const result = await callback();
      onSuccess?.();
      return result;
    } catch (error) {
      onError?.(error as E);
      throw error;
    } finally {
      isLoadingRef.current = false;
      onSettled?.();
    }
  }, [callback, onSuccess, onError, onSettled]);

  return {
    execute,
    isLoading: isLoadingRef.current,
  };
}

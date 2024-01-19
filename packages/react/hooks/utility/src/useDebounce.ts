import { useEffect, useState } from "react";

function useDebounce<T = any>(value: T, delay = 800) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [delay, value]);

  return debouncedValue;
}

export default useDebounce;

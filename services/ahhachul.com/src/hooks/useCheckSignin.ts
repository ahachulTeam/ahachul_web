import { useTimeout } from 'hooks';
import { useState } from 'react';

function useCheckSignin() {
  const [isLoading, setIsLoading] = useState(true);

  useTimeout(() => setIsLoading(false), 700);

  return { isLoading };
}

export default useCheckSignin;

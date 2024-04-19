import { useTimeout } from '.';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loaded, loading } from 'stores/ui';

function useLoading(ms: number = 750) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loading());
  }, []);

  useTimeout(() => dispatch(loaded()), ms);

  return null;
}

export default useLoading;

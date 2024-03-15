import { useTimeout } from '.';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loaded, loading } from 'stores/ui';

function useLoading() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loading());
  }, []);

  useTimeout(() => dispatch(loaded()), 700);

  return null;
}

export default useLoading;

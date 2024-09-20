import { useEffect } from 'react';

export const useScrollEffect = (
  el: any,
  listener: (scrollY: number) => void,
  deps: any[] = [],
) => {
  useEffect(() => {
    const element = el.current;
    if (!element) return;

    const onScroll = () => {
      console.log(element.getBoundingClientRect());
      listener(element.scrollY);
    };
    element.addEventListener('scroll', onScroll);

    return () => {
      element.removeEventListener('scroll', onScroll);
    };
  }, deps);
};

<<<<<<<< HEAD:services/ahhachul.com/src/hooks/useTimemout.ts
import { useEffect, useRef } from 'react';

import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';
========
'use client';
>>>>>>>> develop:services/one-app/src/common/hooks/useTimemout.ts

import { useEffect, useRef } from 'react';

import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

export const useTimeout = (fn: () => void, ms: number) => {
  const fnRef = useRef(fn);

  useIsomorphicLayoutEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  useEffect(() => {
    const id = setTimeout(fnRef.current, ms);
    return () => clearTimeout(id);
  }, [ms]);
};

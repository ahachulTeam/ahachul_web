import { type EffectCallback, useEffect, useRef } from "react";

const useDidMount = (callback: EffectCallback) => {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) return;
    didMountRef.current = true;

    callback();
  }, []);
};

export default useDidMount;

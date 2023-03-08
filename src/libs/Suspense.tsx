"use client";

import { isValidElement, Suspense as ReactSuspense, useEffect, useState } from "react";
import type { SuspenseProps } from "react";

export default function Suspense({ fallback, children }: SuspenseProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (isMounted) {
    return <ReactSuspense fallback={fallback}>{children}</ReactSuspense>;
  }

  if (!isValidElement(fallback)) {
    return <span>{fallback}</span>;
  }

  return fallback;
}

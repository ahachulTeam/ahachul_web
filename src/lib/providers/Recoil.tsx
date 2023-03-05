"use client";

import { PropsWithChildren } from "react";
import { RecoilRoot } from "recoil";

export default function Recoil({ children }: PropsWithChildren) {
  return <RecoilRoot>{children}</RecoilRoot>;
}

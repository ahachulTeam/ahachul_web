"use client";

import { PropsWithChildren } from "react";

import ReactQuery from "./ReactQuery";
import Recoil from "./Recoil";

export default function AppProvider({ children }: PropsWithChildren) {
  return (
    <Recoil>
      <ReactQuery>{children}</ReactQuery>
    </Recoil>
  );
}

"use client";

import { PropsWithChildren } from "react";

import * as S from "./Main.styled";

export default function Main({ children }: PropsWithChildren) {
  return <S.Main>{children}</S.Main>;
}

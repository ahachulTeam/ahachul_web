import { PropsWithChildren } from "react";

import * as S from "./styled";

import { Header } from "./header";
import { Navbar } from "./navbar";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <S.Main>{children}</S.Main>
      <Navbar />
    </>
  );
}

"use client";

import * as S from "./styled";

export default function Toast() {
  return (
    <S.Toast position="top-center" limit={1} closeButton={false} autoClose={2500} hideProgressBar />
  );
}

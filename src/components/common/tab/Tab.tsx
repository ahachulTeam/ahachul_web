/* eslint-disable react/require-default-props */
import React from "react";

import * as S from "./styled";

export default function Tab() {
  return (
    <S.TabsRoot defaultValue="tab1">
      <S.TabsList aria-label="Manage your account">
        <S.TabsTrigger value="tab1">잠원방면</S.TabsTrigger>
        <S.TabsTrigger value="tab2">교대방면</S.TabsTrigger>
      </S.TabsList>
      <S.TabsContent className="TabsContent" value="tab1">
        hello world
      </S.TabsContent>
      <S.TabsContent className="TabsContent" value="tab2">
        hello korea
      </S.TabsContent>
    </S.TabsRoot>
  );
}

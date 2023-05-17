import { useViewAtom } from "@/atoms/view";

import { QuiltIcon, MenuIcon } from "@/assets/icons";

import * as S from "./styled";

export default function ChangeView() {
  const { view, handleChangeListView, handleChangeGridView } = useViewAtom();
  return (
    <S.ChangeView>
      {view === "list" && (
        <S.ChangeBtn type="button" aria-label="그리드로 보기" onClick={handleChangeGridView}>
          <QuiltIcon />
        </S.ChangeBtn>
      )}
      {view === "grid" && (
        <S.ChangeBtn type="button" aria-label="리스트로 보기" onClick={handleChangeListView}>
          <MenuIcon />
        </S.ChangeBtn>
      )}
    </S.ChangeView>
  );
}

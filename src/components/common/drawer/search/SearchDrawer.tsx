import { type ComponentProps } from "react";
import { m } from "framer-motion";

import { defaultFadeInVariants } from "@/constants/motions";
import { AnimatePortal } from "@/components/common/portal";

import * as S from "./styled";
import { CloseIcon, SearchIcon } from "@/assets/icons";

interface Props extends ComponentProps<typeof AnimatePortal> {
  onClose: () => void;
}

function SearchDrawer({ onClose, isMounted, mode }: Props) {
  return (
    <AnimatePortal isMounted={isMounted} mode={mode}>
      <m.div
        css={S.overlayCss}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={defaultFadeInVariants}
      >
        <m.div css={S.contentCss} variants={S.searchDrawerVariants}>
          <S.ModalHeader>
            <S.SearchModalForm>
              <S.InputGroup>
                <S.IconBtn>
                  <SearchIcon aria-label="검색 버튼" />
                </S.IconBtn>
                <S.Input type="text" placeholder="검색" />
              </S.InputGroup>
              <S.CancelButton type="button" aria-label="닫기" onClick={onClose}>
                취소
              </S.CancelButton>
            </S.SearchModalForm>
          </S.ModalHeader>

          <S.SearchHistory>
            <S.SearchHistoryHeader>
              <span>최근 검색어</span>
              <button type="button">전체 삭제</button>
            </S.SearchHistoryHeader>
          </S.SearchHistory>
        </m.div>
      </m.div>
    </AnimatePortal>
  );
}

export default SearchDrawer;

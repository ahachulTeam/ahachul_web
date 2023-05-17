import { useViewAtom } from "@/atoms/view";

import * as S from "./styled";

import LostFoundItem from "./item/LostItem";

export default function LostFoundList() {
  const { view } = useViewAtom();

  return (
    <S.LostFoundList data-view={view}>
      <li>
        <LostFoundItem view={view} />
      </li>
      <li>
        <LostFoundItem view={view} />
      </li>
      <li>
        <LostFoundItem view={view} />
      </li>
      <li>
        <LostFoundItem view={view} />
      </li>
      <li>
        <LostFoundItem view={view} />
      </li>
    </S.LostFoundList>
  );
}

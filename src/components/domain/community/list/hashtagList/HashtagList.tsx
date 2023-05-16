/* eslint-disable react/no-array-index-key */
import { HASH_TAG_DUMMY_LIST } from "@/assets/dummy/community";
import { TagBtn } from "@/components/common";
import * as S from "./styled";

function HashtagList() {
  return (
    <S.HashtagList>
      {HASH_TAG_DUMMY_LIST.map((data, i) => (
        <li key={i}>
          <TagBtn label={`#${data}`} variant="primary" onClick={() => console.log("click!")} />
        </li>
      ))}
    </S.HashtagList>
  );
}

export default HashtagList;

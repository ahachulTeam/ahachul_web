/* eslint-disable react/no-array-index-key */
import { HASH_TAG_DUMMY_LIST } from "@/assets/dummy/community";
import { TagBtn } from "@/components/common";
import * as S from "./styled";

function HashtagList() {
  return (
    <S.HashtagList>
      {HASH_TAG_DUMMY_LIST.map((data, i) => (
<<<<<<< HEAD
        <li key={i}>
          <TagBtn label={`#${data}`} variant="primary" onClick={() => console.log("click!")} />
        </li>
=======
        <TagBtn
          key={i}
          label={`#${data}`}
          variant="primary"
          onClick={() => console.log("click!")}
        />
>>>>>>> develop
      ))}
    </S.HashtagList>
  );
}

export default HashtagList;

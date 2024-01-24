import {
  InputGroup,
  Input,
  InputLeftAddon,
} from "@ahhachul/react-components-input";

import ResetButton from "../../../ResetButton";

import { SearchSVG } from "~/assets/icons";

function SearchGroup() {
  return (
    <InputGroup style={{ padding: "15px 20px" }}>
      <InputLeftAddon>
        <ResetButton ItemComponent={<SearchSVG />} onClick={() => {}} />
      </InputLeftAddon>
      <Input variant="filled" placeholder="검색어를 입력해주세요." />
    </InputGroup>
  );
}

export default SearchGroup;

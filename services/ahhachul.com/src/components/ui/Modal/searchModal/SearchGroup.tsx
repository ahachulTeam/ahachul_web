import React from 'react';
import { InputGroup, Input, InputLeftAddon } from '@ahhachul/react-components-input';

import IconSearch from 'static/icons/system/IconSearch';

function SearchGroup() {
  return (
    <InputGroup style={{ padding: '15px 20px', display: 'flex', gap: '8px' }}>
      <InputLeftAddon>
        <IconSearch />
      </InputLeftAddon>
      <Input placeholder="검색어를 입력해주세요." color="#fff" variant="filled" />
    </InputGroup>
  );
}

export default SearchGroup;

import '@ahhachul/themes/themes.css';

import '@ahhachul/react-components-button/style.css';
import { Button } from '@ahhachul/react-components-button';

import '@ahhachul/react-components-layout/style.css';
import { Flex, Divider, Heading } from '@ahhachul/react-components-layout';

import '@ahhachul/react-components-input/style.css';
import {
  Input,
  InputGroup,
  InputLeftAddon,
} from '@ahhachul/react-components-input';

import '@ahhachul/react-components-toast/style.css';
import { useToast } from '@ahhachul/react-components-toast';

import '@ahhachul/react-components-select/style.css';
import { Select } from '@ahhachul/react-components-select';

import { ChevronDownIcon } from '@radix-ui/react-icons';

import './App.css';
import { 전체Icon } from './assets/전체';
import { SearchIcon } from './assets/SearchIcon';

function App() {
  const { toast } = useToast();

  return (
    <>
      <Flex align="center" direction="column" gap={24} marginTop={4}>
        <Flex direction="column" marginTop={4}>
          <Heading fontSize="2xl" color="white">
            Ahhachul Playground
          </Heading>
        </Flex>
        <InputGroup size="sm" className="full-width">
          <InputLeftAddon>
            <SearchIcon />
          </InputLeftAddon>
          <Input placeholder="검색" variant="filled" />
        </InputGroup>
        <Divider color="rgb(196, 212, 252, 0.37)" />
        <Input placeholder="제목" />
        <Input placeholder="제목" isInvalid={true} />
        <Input placeholder="제목" isDisabled={true} />
        <Divider color="rgb(196, 212, 252, 0.37)" />
        <Select>
          <option value="1">1</option>
          <option value="2">2</option>
        </Select>
        <Select isInvalid>
          <option value="1">1</option>
          <option value="2">2</option>
        </Select>
        <Select isDisabled>
          <option value="1">1</option>
          <option value="2">2</option>
        </Select>
        <Divider color="rgb(196, 212, 252, 0.37)" />
        <Button
          size="xs"
          rightIcon={
            <ChevronDownIcon className="arrow-down-img" stroke="#4C5874" />
          }
          borderRadius="18px"
          style={{
            border: '1px solid hsla(0, 0%, 100%, .06)',
          }}
        >
          작성자
        </Button>
        <Button variant="outline" size="sm" leftIcon={<전체Icon />}>
          전체
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() =>
            toast({
              payload: {
                message: 'Hello, World!',
              },
            })
          }
        >
          토스트
        </Button>
      </Flex>
    </>
  );
}

export default App;

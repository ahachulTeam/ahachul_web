import './App.css';
import { SearchIcon } from './assets/SearchIcon';

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
        <Divider color="rgb(196, 212, 252, 0.37)" />
        <Button
          onClick={() =>
            toast({
              payload: {
                message: 'Hello, World!',
              },
            })
          }
        >
          Toast Button
        </Button>
      </Flex>
    </>
  );
}

export default App;

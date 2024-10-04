import '@ahhachul/react-components-input/style.css';
import {
  Input,
  InputGroup,
  InputLeftAddon,
} from '@ahhachul/react-components-input';
import { SearchIcon } from '../../../assets/SearchIcon';

export default {
  title: 'React Components/Input',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const InputStory = {
  render: () => <Input placeholder="검색" />,
};

export const InputGroupStory = {
  render: () => (
    <InputGroup size="md" color="red">
      <InputLeftAddon>
        <SearchIcon />
      </InputLeftAddon>
      <Input variant="filled" placeholder="검색" />
    </InputGroup>
  ),
};

export const InputVariantFilledStory = {
  render: () => <Input variant="filled" placeholder="검색" />,
};

export const InputFocusVisibleState = {
  render: () => <Input placeholder="검색" focusBorderColor="#025FAC" />,
  parameters: {
    pseudo: { focusVisible: true },
  },
};

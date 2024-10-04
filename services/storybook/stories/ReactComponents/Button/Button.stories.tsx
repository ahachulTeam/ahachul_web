import '@ahhachul/react-components-button/style.css';
import '@ahhachul/react-components-layout/style.css';
import { vars } from '@ahhachul/themes';
import { Text } from '@ahhachul/react-components-layout';
import { Button as _Button } from '@ahhachul/react-components-button';
import { useButton, useToggleButton } from '@ahhachul/react-hooks-button';

export default {
  title: 'React Components/Button',
  component: _Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['xs', 'sm', 'md', 'lg'],
      control: 'select',
    },
    color: {
      options: Object.keys(vars.colors.$scale),
      control: 'select',
    },
    variant: {
      options: ['solid', 'outline', 'ghost'],
      control: 'select',
    },
  },
};

export const ButtonStory = {
  args: {
    size: 'lg',
    children: 'Button',
    variant: 'outline',
    isDisabled: false,
    isLoading: false,
    leftIcon: '😀',
  },
};

export const SolidButtonStory = {
  args: {
    size: 'lg',
    children: 'Button',
    variant: 'solid',
    isDisabled: false,
    isLoading: false,
    rightIcon: '😀',
    enableColor: 'black',
    hoverColor: '#025FAC',
    activeColor: '#0276ac',
  },
};

export const TextButtonStory = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { buttonProps } = useButton({
      elementType: 'div',
      onClick: () => {
        console.log('ttt');
      },
    });

    return (
      <Text
        {...buttonProps}
        as="div"
        fontSize="md"
        color="black"
        style={{
          userSelect: 'none',
          cursor: 'pointer',
        }}
      >
        텍스트 버튼
      </Text>
    );
  },
};

export const ToggleButtonStory = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { buttonProps, isSelected } = useToggleButton(
      { elementType: 'button' },
      false,
    );

    return (
      <_Button {...buttonProps} variant={isSelected ? 'solid' : 'outline'}>
        {isSelected ? '😀' : '😂'}
      </_Button>
    );
  },
};

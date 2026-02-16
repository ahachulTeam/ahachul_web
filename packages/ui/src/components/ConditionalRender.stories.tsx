import type { Meta, StoryObj } from '@storybook/react-vite';

import { ConditionalRender } from './ConditionalRender';

const meta = {
  title: 'Utility/ConditionalRender',
  component: ConditionalRender,
  tags: ['autodocs'],
  args: {
    isRender: true,
  },
  argTypes: {
    children: { control: false },
  },
} satisfies Meta<typeof ConditionalRender>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: args => (
    <ConditionalRender {...args}>
      <div
        style={{
          padding: '12px 16px',
          borderRadius: 10,
          backgroundColor: 'var(--ah-color-secondary-secondary)',
          color: 'var(--ah-color-gray-90)',
        }}
      >
        조건이 true일 때만 렌더링됩니다.
      </div>
    </ConditionalRender>
  ),
};

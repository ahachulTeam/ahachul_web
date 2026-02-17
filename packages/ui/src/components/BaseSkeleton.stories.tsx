import type { Meta, StoryObj } from '@storybook/react-vite';

import { BaseSkeleton } from './BaseSkeleton';

const meta = {
  title: 'Service/Loading/BaseSkeleton',
  component: BaseSkeleton,
  tags: ['autodocs'],
  args: {
    radius: 8,
  },
} satisfies Meta<typeof BaseSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: args => <BaseSkeleton {...args} width={240} height={20} />,
};

export const ArticleListPreset: Story = {
  render: args => (
    <div style={{ width: 320, display: 'flex', flexDirection: 'column', gap: 14 }}>
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          style={{
            borderBottom: '1px solid var(--ah-color-gray-20)',
            paddingBottom: 14,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          <BaseSkeleton {...args} width="55%" height={20} />
          <BaseSkeleton {...args} width="85%" height={16} />
          <BaseSkeleton {...args} width="35%" height={16} />
        </div>
      ))}
    </div>
  ),
};

import type { Meta, StoryObj } from '@storybook/react-vite';

import { SearchEmptyState } from './SearchEmptyState';

const RailIllustration = () => (
  <div
    style={{
      width: 88,
      height: 88,
      borderRadius: '50%',
      background: 'var(--ah-color-secondary-secondary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 36,
    }}
  >
    🚇
  </div>
);

const meta = {
  title: 'Service/Empty/SearchEmptyState',
  component: SearchEmptyState,
  tags: ['autodocs'],
  args: {
    title: '검색 결과가 없어요.',
    description: '필터를 변경하거나 다른 키워드로 시도해보세요.',
  },
} satisfies Meta<typeof SearchEmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: args => (
    <SearchEmptyState
      {...args}
      illustration={<RailIllustration />}
      style={{ padding: '60px 24px', maxWidth: 360 }}
    />
  ),
};

export const QuietMode: Story = {
  render: () => <SearchEmptyState title="검색 결과가 없어요." style={{ padding: '60px 24px' }} />,
};

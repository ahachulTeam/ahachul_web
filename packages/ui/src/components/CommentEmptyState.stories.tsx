import type { Meta, StoryObj } from '@storybook/react-vite';

import { CommentEmptyState } from './CommentEmptyState';

const meta = {
  title: 'Service/Empty/CommentEmptyState',
  component: CommentEmptyState,
  tags: ['autodocs'],
} satisfies Meta<typeof CommentEmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <CommentEmptyState />,
};

export const WithPrompt: Story = {
  render: () => (
    <CommentEmptyState
      primaryText="아직 댓글이 없어요."
      secondaryText="지하철 이용 팁을 첫 댓글로 남겨주세요."
      style={{ minHeight: 220 }}
    />
  ),
};

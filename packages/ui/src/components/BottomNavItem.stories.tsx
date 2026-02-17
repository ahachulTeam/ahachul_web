import type { Meta, StoryObj } from '@storybook/react-vite';

import { colors } from '@ahhachul/design-system';

import { BottomNavItem } from './BottomNavItem';

const DotIcon = ({ color }: { color: string }) => (
  <span
    style={{
      width: 20,
      height: 20,
      borderRadius: '50%',
      backgroundColor: color,
      display: 'inline-block',
    }}
  />
);

const meta = {
  title: 'Service/Navigation/BottomNavItem',
  component: BottomNavItem,
  tags: ['autodocs'],
  args: {
    label: '홈',
    icon: <DotIcon color={colors.gray[50]} />,
    activeIcon: <DotIcon color={colors['key-color']} />,
    isActive: false,
  },
} satisfies Meta<typeof BottomNavItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Active: Story = {
  args: {
    isActive: true,
  },
};

import type { Meta, StoryObj } from '@storybook/react-vite';

import { colors } from '@ahhachul/design-system';

import { BottomNav } from './BottomNav';
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
  title: 'Service/Navigation/BottomNav',
  component: BottomNav,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof BottomNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ServiceTabs: Story = {
  render: () => (
    <div style={{ minHeight: 220, backgroundColor: 'var(--ah-color-background)' }}>
      <BottomNav itemCount={5}>
        <BottomNavItem
          label="홈"
          isActive
          icon={<DotIcon color={colors.gray[50]} />}
          activeIcon={<DotIcon color={colors['key-color']} />}
        />
        <BottomNavItem label="커뮤니티" icon={<DotIcon color={colors.gray[50]} />} />
        <BottomNavItem label="유실물" icon={<DotIcon color={colors.gray[50]} />} />
        <BottomNavItem label="민원" icon={<DotIcon color={colors.gray[50]} />} />
        <BottomNavItem label="마이" icon={<DotIcon color={colors.gray[50]} />} />
      </BottomNav>
    </div>
  ),
};

export const WithBottomInset: Story = {
  render: () => (
    <div style={{ minHeight: 220, backgroundColor: 'var(--ah-color-background)' }}>
      <BottomNav
        itemCount={5}
        bottomInset={
          <div
            style={{
              width: '100%',
              height: 24,
              backgroundColor: 'var(--ah-color-white)',
            }}
          />
        }
      >
        <BottomNavItem label="홈" icon={<DotIcon color={colors.gray[50]} />} />
        <BottomNavItem label="커뮤니티" icon={<DotIcon color={colors.gray[50]} />} />
        <BottomNavItem label="유실물" icon={<DotIcon color={colors.gray[50]} />} />
        <BottomNavItem label="민원" icon={<DotIcon color={colors.gray[50]} />} />
        <BottomNavItem label="마이" icon={<DotIcon color={colors.gray[50]} />} />
      </BottomNav>
    </div>
  ),
};

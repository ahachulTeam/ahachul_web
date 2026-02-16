import type { Meta, StoryObj } from '@storybook/react-vite';

import { ServiceBadge } from './ServiceBadge';

const meta = {
  title: 'Service/Badge',
  component: ServiceBadge,
  tags: ['autodocs'],
  args: {
    label: '지하철 민원',
    tone: 'service',
  },
  argTypes: {
    tone: {
      control: { type: 'select' },
      options: ['service', 'neutral', 'positive', 'danger'],
    },
  },
} satisfies Meta<typeof ServiceBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const ServiceTaxonomy: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <ServiceBadge label="커뮤니티" tone="service" />
      <ServiceBadge label="민원" tone="service" />
      <ServiceBadge label="분실물" tone="service" />
      <ServiceBadge label="정상 운영" tone="positive" />
      <ServiceBadge label="주의" tone="danger" />
      <ServiceBadge label="안내" tone="neutral" />
    </div>
  ),
};

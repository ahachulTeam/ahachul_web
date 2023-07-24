import { SubwayLine } from '@ahhachul/lib'
import styled from '@emotion/styled'
import type { Meta, StoryObj } from '@storybook/react'

import { Badge, type BadgeProps } from './Badge'
import { StoryLayout } from '@/components/storyLayout'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    controls: { exclude: ['className', 'label'] },
    componentSource: {
      language: 'typescript',
    },
  },
}

export default meta

type Story = StoryObj<typeof Badge>

const Container = styled(StoryLayout)`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`

const StoryBadgeGroup = (args: BadgeProps) => {
  return (
    <Container>
      {Object.keys(SubwayLine).map(line => (
        <Badge {...args} key={line} variant={line} />
      ))}
    </Container>
  )
}

export const SubwayBadge: Story = {
  args: {
    isHottest: false,
  },
  render: args => StoryBadgeGroup(args),
}

export const FoundBadge: Story = {
  args: {
    variant: '찾기완료',
    isHottest: false,
  },
}

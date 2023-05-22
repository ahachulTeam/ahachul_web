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

const subwayLine = [
  '1호선',
  '2호선',
  '3호선',
  '4호선',
  '5호선',
  '6호선',
  '7호선',
  '8호선',
  '9호선',
  '공항',
  '경의중앙',
  '경춘',
  '수인분당',
  '신분당',
]

const Container = styled(StoryLayout)`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`

const StoryBadgeGroup = (args: BadgeProps) => {
  return (
    <Container>
      {subwayLine.map(line => (
        <Badge {...args} key={line} label={line} />
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
    label: '찾기완료',
  },
}

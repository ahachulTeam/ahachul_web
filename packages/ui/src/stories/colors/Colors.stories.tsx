import { colors } from '@ahhachul/design-system'
import styled from '@emotion/styled'

import type { Meta, StoryObj } from '@storybook/react'

import { ColorGroup, type Color } from './ColorGroup'

const meta: Meta = {
  title: 'Foundation/Colors',
}

export default meta

const palette = Object.entries(colors).reduce((acc, [key, value]) => {
  if (typeof value === 'object') {
    const colors = Object.entries(value).map(([label, hex]) => ({ label: `${key}_${label}`, hex }))
    return [...acc, ...colors]
  }
  return [...acc, { label: key, hex: value }]
}, [] as Color[])

const filterGroup = (filters: string[]) =>
  palette.filter(({ label }) => filters.some(filter => label.indexOf(filter) === 0))

type Story = StoryObj<typeof ColorGroup>

const Group = styled.div`
  &:not(:last-of-type) {
    margin-bottom: 24px;
  }

  & > h3 {
    margin-bottom: 12px;
    font-size: 18px;
    font-weight: 500;
  }
`

export const Default: Story = {
  render: () => (
    <>
      <Group>
        <h3>Primary Color</h3>
        <ColorGroup group={filterGroup(['primary'])} />
      </Group>
      <Group>
        <h3>Secondary Color</h3>
        <ColorGroup group={filterGroup(['secondary'])} />
      </Group>
      <Group>
        <h3>Subway Color</h3>
        <ColorGroup group={filterGroup(['subway'])} />
      </Group>
      <Group>
        <h3>Gray Scale</h3>
        <ColorGroup group={filterGroup(['white', 'black', 'gray'])} />
      </Group>
    </>
  ),
}

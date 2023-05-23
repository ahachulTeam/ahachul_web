import { colors } from '@ahhachul/design-system'
import styled from '@emotion/styled'

import type { Meta, StoryObj } from '@storybook/react'

import { ColorBox } from './ColorBox'

const meta: Meta = {
  title: 'Foundation/Colors',
}

export default meta

interface Color {
  label: string
  hex: string
}

const palette = Object.entries(colors).reduce((acc, [key, value]) => {
  if (typeof value === 'object') {
    const colors = Object.entries(value).map(([label, hex]) => ({ label: `${key}_${label}`, hex }))
    return [...acc, ...colors]
  }
  return [...acc, { label: key, hex: value }]
}, [] as Color[])

const ColorPalette = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(121px, 1fr));
  grid-auto-rows: max-content;
  gap: 16px;
`

type Story = StoryObj<typeof ColorBox>

export const Default: Story = {
  render: () => (
    <ColorPalette>
      {palette.map(color => (
        <ColorBox key={color.label} label={color.label} hex={color.hex} />
      ))}
    </ColorPalette>
  ),
}

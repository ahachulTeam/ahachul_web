import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'

import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    controls: { exclude: ['className', 'variant', 'onClick'] },
    componentSource: {
      language: 'typescript',
    },
  },
}

export default meta

type Story = StoryObj<typeof Button>

export const Pirmary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    label: 'Primary Button',
    onClick: action('clicked'),
  },
}

export const Secondary: Story = {
  args: {
    ...Pirmary.args,
    variant: 'secondary',
    label: 'Secondary Button',
  },
}
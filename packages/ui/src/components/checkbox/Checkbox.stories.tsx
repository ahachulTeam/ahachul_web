import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'

import { Checkbox, type CheckboxProps } from './Checkbox'
import { StoryLayout } from '@/components/storyLayout'

const meta: Meta<typeof Checkbox> = {
  title: 'Forms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    controls: { exclude: ['className', 'onChange'] },
    componentSource: {
      language: 'typescript',
    },
  },
}

export default meta

type Story = StoryObj<typeof Checkbox>

const StoryCheckbox = (args: CheckboxProps) => {
  return (
    <StoryLayout>
      <Checkbox {...args} />
    </StoryLayout>
  )
}

export const Default: Story = {
  args: {
    disabled: false,
    label: '아하철이형 약관 모두 동의',
    onChange: action('changed'),
  },
  render: args => StoryCheckbox(args),
}

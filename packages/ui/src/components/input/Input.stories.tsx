import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import Input, { type InputProps } from './Input'
import { StoryLayout } from '@/components/storyLayout'

const meta: Meta<typeof Input> = {
  title: 'Forms/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    controls: { exclude: ['className', 'value', 'onChange'] },
    componentSource: {
      language: 'typescript',
    },
  },
}

export default meta

type Story = StoryObj<typeof Input>

const StoryInput = (args: InputProps) => {
  const [value, setValue] = useState(args.value)

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <StoryLayout>
      <Input {...args} value={value} onChange={handleChangeValue} />
    </StoryLayout>
  )
}

export const Default: Story = {
  args: {
    label: 'Label',
    hideLabel: false,
    placeholder: 'Place Holder',
    disabled: false,
    onChange: action('changed'),
  },
  render: args => StoryInput(args),
}

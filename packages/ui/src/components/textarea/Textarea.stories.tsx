import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import Textarea, { type TextareaProps } from './Textarea'
import { StoryLayout } from '@/components/storyLayout'

const meta: Meta<typeof Textarea> = {
  title: 'Forms/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    controls: { exclude: ['className', 'size', 'value', 'onChange'] },
    componentSource: {
      language: 'typescript',
    },
  },
}

export default meta

type Story = StoryObj<typeof Textarea>

const StoryTextarea = (args: TextareaProps) => {
  const [value, setValue] = useState(args.value)

  const handleChangeValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }

  return (
    <StoryLayout>
      <Textarea {...args} value={value} onChange={handleChangeValue} />
    </StoryLayout>
  )
}

export const Default: Story = {
  args: {
    label: 'Label',
    hideLabel: false,
    placeholder: 'Placeholder',
    disabled: false,
    size: 'md',
    onChange: action('changed'),
  },
  render: args => StoryTextarea(args),
}

export const Small: Story = {
  args: {
    label: 'Label',
    hideLabel: false,
    placeholder: 'Placeholder',
    disabled: false,
    size: 'sm',
    onChange: action('changed'),
  },
  render: args => StoryTextarea(args),
}

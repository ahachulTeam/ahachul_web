import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import SearchInput, { type SearchInputProps } from './SearchInput'
import { StoryLayout } from '@/components/storyLayout'

const meta: Meta<typeof SearchInput> = {
  title: 'Forms/Search',
  component: SearchInput,
  tags: ['autodocs'],
  parameters: {
    controls: { exclude: ['className', 'value', 'label', 'onChange', 'onDelete', 'onSearch'] },
    componentSource: {
      language: 'typescript',
    },
  },
}

export default meta

type Story = StoryObj<typeof SearchInput>

const StorySearch = (args: SearchInputProps) => {
  const [value, setValue] = useState(args.value)

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleDeleteValue = () => {
    setValue('')
  }

  return (
    <StoryLayout>
      <SearchInput {...args} value={value} onChange={handleChangeValue} onDelete={handleDeleteValue} />
    </StoryLayout>
  )
}

export const Default: Story = {
  args: {
    placeholder: 'Search',
    onChange: action('changed'),
    onDelete: action('deleted'),
    onSearch: action('searched'),
  },
  render: args => StorySearch(args),
}

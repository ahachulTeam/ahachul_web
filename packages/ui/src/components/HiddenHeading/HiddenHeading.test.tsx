import { render, screen } from '@testing-library/react'

import HiddenHeading, { type Props } from './HiddenHeading'

const context = describe

describe('HiddenHeading', () => {
  function renderHiddenHeading(props: Props = {}) {
    return render(<HiddenHeading {...props} />)
  }

  context('without as props', () => {
    it('default render h1 tag', () => {
      renderHiddenHeading()

      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    })
  })

  context('with as props', () => {
    it('rendered as tag', () => {
      renderHiddenHeading({ as: 'h2' })

      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    })
  })

  context('with prop children', () => {
    it('rendered children', () => {
      renderHiddenHeading({ children: 'awesome ahhachul' })

      expect(screen.getByText(/awesome ahhachul/)).toBeInTheDocument()
    })
  })
})

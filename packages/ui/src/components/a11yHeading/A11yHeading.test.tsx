import { render, screen } from '@testing-library/react'

import { A11yHeading, type Props } from './A11yHeading'

const context = describe

describe('A11yHeading', () => {
  function renderA11yHeading(props: Props = {}) {
    return render(<A11yHeading {...props} />)
  }

  context('without as props', () => {
    it('default render h1 tag', () => {
      renderA11yHeading()

      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    })
  })

  context('with as props', () => {
    it('rendered as tag', () => {
      renderA11yHeading({ as: 'h2' })

      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    })
  })

  context('with prop children', () => {
    it('rendered children', () => {
      renderA11yHeading({ children: 'awesome ahhachul' })

      expect(screen.getByText(/awesome ahhachul/)).toBeInTheDocument()
    })
  })
})

import { render, screen } from '@testing-library/react';
import Page from '@/app/(site)/page';

it.skip('App Router: Works with Server Components', () => {
  render(<Page />);
  expect(screen.getByRole('heading', { name: /App Router/i })).toHaveTextContent('App Router');
});
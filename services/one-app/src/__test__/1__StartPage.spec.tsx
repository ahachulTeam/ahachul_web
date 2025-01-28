import { render, screen } from '@testing-library/react';

import Home from '@/app/page';

describe('Home Page', () => {
  it('renders welcome message', () => {
    render(<Home />);
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByText('아하철님,')).toBeInTheDocument();
  });

  it('has correct styling', () => {
    render(<Home />);
    const main = screen.getByRole('main');
    expect(main).toHaveClass('flex', 'min-h-screen', 'flex-col', 'text-black', 'bg-white', 'pt-4');
  });
});

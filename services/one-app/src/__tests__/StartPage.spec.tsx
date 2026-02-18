import { render, screen } from '@testing-library/react';

import Home from '@/app/page';

jest.mock('next/headers', () => ({
  headers: jest.fn(async () => new Headers([['x-ahhachul-locale', 'ko']])),
  cookies: jest.fn(async () => ({
    get: jest.fn(() => undefined),
  })),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn(), refresh: jest.fn() })),
  usePathname: jest.fn(() => '/'),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

describe('Home Page', () => {
  it('renders welcome message', async () => {
    render(await Home());
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByText('아하철님,')).toBeInTheDocument();
  });

  it('has correct styling', async () => {
    render(await Home());
    const main = screen.getByRole('main');
    expect(main).toHaveClass('flex', 'min-h-screen', 'flex-col', 'text-black', 'bg-white', 'pt-4');
  });
});

import { render, screen } from '@testing-library/react';

import Home from '@/app/page';

jest.mock('@/app/_components/HomeViteParity', () => ({
  __esModule: true,
  default: ({ locale }: { locale: string }) => (
    <main className="min-h-screen bg-gray-10 pb-24 pt-4">home-vite-parity-{locale}</main>
  ),
}));

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
  it('renders vite parity home component', async () => {
    render(await Home());
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByText('home-vite-parity-ko')).toBeInTheDocument();
  });

  it('uses the parity root layout class', async () => {
    render(await Home());
    const main = screen.getByRole('main');
    expect(main).toHaveClass('min-h-screen', 'bg-gray-10', 'pb-24', 'pt-4');
  });
});

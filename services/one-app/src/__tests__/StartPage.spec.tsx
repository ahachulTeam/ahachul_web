import { render, screen } from '@testing-library/react';

import Home from '@/app/page';

jest.mock('@/app/_components/HomeRenewal', () => ({
  __esModule: true,
  default: ({ locale }: { locale: string }) => (
    <main className="min-h-screen px-5 pb-28 pt-5">home-renewal-{locale}</main>
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
  it('renders renewal home component', async () => {
    render(await Home());
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByText('home-renewal-ko')).toBeInTheDocument();
  });

  it('uses the renewal root layout class', async () => {
    render(await Home());
    const main = screen.getByRole('main');
    expect(main).toHaveClass('min-h-screen', 'px-5', 'pb-28', 'pt-5');
  });
});

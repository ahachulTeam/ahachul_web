import type { SVGProps } from 'react';

import { render, screen } from '@testing-library/react';

jest.mock(
  '@/assets/icon',
  () => ({
    HeaderLogoIcon: (props: SVGProps<SVGSVGElement>) => (
      <svg data-testid="header-logo-icon" {...props} />
    ),
    HeaderMessageIcon: (props: SVGProps<SVGSVGElement>) => (
      <svg data-testid="header-message-icon" {...props} />
    ),
    HeaderNotificationIcon: (props: SVGProps<SVGSVGElement>) => (
      <svg data-testid="header-notification-icon" {...props} />
    ),
  }),
  { virtual: true },
);

jest.mock(
  '@/i18n/server',
  () => ({
    getServerLocale: jest.fn(async () => 'en'),
  }),
  { virtual: true },
);

jest.mock('@/i18n', () => ({
  getLocaleMessages: () => ({
    header: {
      homeAria: 'home-link',
      homeTitle: 'home-title',
      messagesAria: 'messages-link',
      messagesTitle: 'messages-title',
      notificationsAria: 'notifications-link',
      notificationsTitle: 'notifications-title',
    },
  }),
  localizePathname: (pathname: string, locale: string) => {
    if (locale !== 'en') {
      return pathname;
    }

    if (pathname === '/') {
      return '/en';
    }

    return `/en${pathname}`;
  },
}));

describe('Header', () => {
  it('로케일 기준 링크와 aria/title을 렌더링한다', async () => {
    const { default: Header } = await import('./Header');

    render(await Header());

    expect(screen.getByRole('link', { name: 'home-link' })).toHaveAttribute('href', '/en');
    expect(screen.getByRole('link', { name: 'messages-link' })).toHaveAttribute(
      'href',
      '/en/messages',
    );
    expect(screen.getByRole('link', { name: 'notifications-link' })).toHaveAttribute(
      'href',
      '/en/notifications',
    );
    expect(screen.getByTestId('header-logo-icon')).toBeInTheDocument();
    expect(screen.getByTestId('header-message-icon')).toBeInTheDocument();
    expect(screen.getByTestId('header-notification-icon')).toBeInTheDocument();
  });
});

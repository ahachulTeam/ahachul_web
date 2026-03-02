import type { SVGProps } from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

const mockUseSearchParams = jest.fn();
const mockUsePathname = jest.fn();
const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useSearchParams: () => mockUseSearchParams(),
  usePathname: () => mockUsePathname(),
}));

jest.mock('nextjs-toploader/app', () => ({
  useRouter: () => ({ push: mockPush }),
}));

jest.mock('next/form', () => ({
  __esModule: true,
  default: ({ action, children, ...props }: any) => (
    <form
      {...props}
      onSubmit={event => {
        event.preventDefault();

        if (typeof action === 'function') {
          action(new FormData(event.currentTarget));
        }
      }}
    >
      {children}
    </form>
  ),
}));

jest.mock(
  '@/assets/icon',
  () => ({
    SearchIcon: (props: SVGProps<SVGSVGElement>) => <svg data-testid="search-icon" {...props} />,
  }),
  { virtual: true },
);

describe('SearchForm', () => {
  beforeEach(() => {
    mockUseSearchParams.mockReset();
    mockUsePathname.mockReset();
    mockPush.mockReset();
    mockUsePathname.mockReturnValue('/community');
  });

  it('search param 기본값을 표시하고 submit 시 router.push를 호출한다', async () => {
    const { default: SearchForm } = await import('./SearchForm');

    mockUseSearchParams.mockReturnValue(new URLSearchParams('keyword=old&page=2'));

    render(<SearchForm />);

    const input = screen.getByRole('searchbox');
    expect(input).toHaveValue('old');

    fireEvent.change(input, { target: { value: 'new-keyword' } });
    fireEvent.submit(input.closest('form') as HTMLFormElement);

    expect(mockPush).toHaveBeenCalledTimes(1);

    const pushedValue = mockPush.mock.calls[0][0] as string;
    const [, queryString = ''] = pushedValue.split('?');
    const pushedParams = new URLSearchParams(queryString);

    expect(pushedValue.startsWith('/community?')).toBe(true);
    expect(pushedParams.get('keyword')).toBe('new-keyword');
    expect(pushedParams.get('page')).toBe('2');
  });

  it('name prop에 맞는 query key를 사용한다', async () => {
    const { default: SearchForm } = await import('./SearchForm');

    mockUseSearchParams.mockReturnValue(new URLSearchParams('query=seoul&sort=latest'));

    render(<SearchForm name="query" />);

    const input = screen.getByRole('searchbox');
    expect(input).toHaveValue('seoul');

    fireEvent.change(input, { target: { value: 'gangnam' } });
    fireEvent.submit(input.closest('form') as HTMLFormElement);

    const pushedValue = mockPush.mock.calls[0][0] as string;
    const [, queryString = ''] = pushedValue.split('?');
    const pushedParams = new URLSearchParams(queryString);

    expect(pushedParams.get('query')).toBe('gangnam');
    expect(pushedParams.get('sort')).toBe('latest');
  });
});

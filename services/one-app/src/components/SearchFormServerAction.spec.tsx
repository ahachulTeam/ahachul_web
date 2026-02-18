import type { ReactNode, SVGProps } from 'react';

import { render, screen } from '@testing-library/react';

jest.mock('next/form', () => ({
  __esModule: true,
  default: ({
    action,
    children,
    ...props
  }: {
    action: string | ((formData: FormData) => void);
    children: ReactNode;
  }) => (
    <form {...props} action={typeof action === 'string' ? action : undefined}>
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

describe('SearchFormServerAction', () => {
  it('서버 action 경로와 hidden 필드를 렌더링한다', async () => {
    const { default: SearchFormServerAction } = await import('./SearchFormServerAction');

    const { container } = render(
      <SearchFormServerAction
        searchTo="/community"
        keyword="강남"
        category="DAILY"
        subwayLineId="2"
      />,
    );

    const form = container.querySelector('form');
    expect(form).toHaveAttribute('action', '/community');

    const keywordInput = screen.getByRole('searchbox');
    expect(keywordInput).toHaveValue('강남');

    const categoryInput = container.querySelector('input[name="category"]') as HTMLInputElement;
    const subwayLineInput = container.querySelector(
      'input[name="subwayLineId"]',
    ) as HTMLInputElement;

    expect(categoryInput).toBeInTheDocument();
    expect(categoryInput.value).toBe('DAILY');
    expect(subwayLineInput).toBeInTheDocument();
    expect(subwayLineInput.value).toBe('2');
  });

  it('옵션 값이 없으면 hidden 필드를 만들지 않는다', async () => {
    const { default: SearchFormServerAction } = await import('./SearchFormServerAction');

    const { container } = render(<SearchFormServerAction searchTo="/lost-found" keyword="지갑" />);

    expect(container.querySelector('input[name="category"]')).toBeNull();
    expect(container.querySelector('input[name="subwayLineId"]')).toBeNull();
  });
});

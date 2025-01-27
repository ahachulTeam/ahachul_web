import { render, screen } from '@testing-library/react';

import Page from '@/app/page';

describe('Home Page', () => {
  it('renders navigation links correctly', () => {
    render(<Page />);

    // Check if all links are present with exact text content
    expect(screen.getByText('로그인 페이지')).toBeInTheDocument();
    expect(screen.getByText('유실물 페이지')).toBeInTheDocument();
    expect(screen.getByText('유실물 등록하기')).toBeInTheDocument();

    // Optionally, verify the href attributes
    expect(screen.getByText('로그인 페이지')).toHaveAttribute('href', '/login');
    expect(screen.getByText('유실물 페이지')).toHaveAttribute('href', '/lost-found');
    expect(screen.getByText('유실물 등록하기')).toHaveAttribute('href', '/lost-found/create');
  });
});

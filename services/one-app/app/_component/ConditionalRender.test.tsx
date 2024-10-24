import React from 'react';
import { render, screen } from '@testing-library/react';
import ConditionalRender from './ConditionalRender';

describe('ConditionalRender 컴포넌트', () => {
  it('isRender가 true일 때 children을 렌더링한다', () => {
    render(
      <ConditionalRender isRender={true}>
        <div data-testid="test-child">Hello, World!</div>
      </ConditionalRender>,
    );
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
  });

  it('isRender가 false일 때 children을 렌더링하지 않는다', () => {
    render(
      <ConditionalRender isRender={false}>
        <div data-testid="test-child">Hello, World!</div>
      </ConditionalRender>,
    );
    expect(screen.queryByTestId('test-child')).not.toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';

import WelcomeMessage from './WelcomeMessage';

describe('WelcomeMessage', () => {
  it('renders username correctly', () => {
    render(<WelcomeMessage />);
    expect(screen.getByText('아하철님,')).toBeInTheDocument();
  });

  it('renders a greeting phrase', () => {
    render(<WelcomeMessage />);

    // Check if any of the greeting phrases is rendered
    const greetingPhrases = [
      '멋진 오늘을 응원해요',
      '정말 잘하고 있어요',
      '언제나 늘 응원할게요',
      '매일매일 반가워요!',
      '힘차게 시작해볼까요?',
      '활짝 웃는 하루되세요',
      '하나씩 이뤄가볼까요?',
      '목표에 한 걸음 다가가요!',
    ];

    const greeting = screen.getByText(content => greetingPhrases.includes(content));
    expect(greeting).toBeInTheDocument();
  });
});

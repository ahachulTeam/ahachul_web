import type { AnchorHTMLAttributes, SVGProps } from 'react';

import { describe, expect, it, vi } from 'vitest';

import { render, screen, userEvent } from '@/lib/test-utils';
import type { UserStation } from '@/types';

import SubwayLineFilter from './SubwayLineFilter.component';

vi.mock('@/constants', () => ({
  subwayLineOptions: {
    '2': '2호선',
    '18': '신분당선',
  },
}));

vi.mock('@/assets/icons/system', () => ({
  ChevronRightWhiteIcon: (props: SVGProps<SVGSVGElement>) => (
    <svg data-testid="chevron-right" {...props} />
  ),
}));

vi.mock('@/stackflow', () => ({
  StackFlow: {
    Link: ({ children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <a data-testid="stackflow-link" {...props}>
        {children}
      </a>
    ),
  },
}));

describe('SubwayLineFilter', () => {
  const currentStation: UserStation = {
    label: '회사',
    stationId: 557,
    stationName: '강남',
    subwayLineInfoList: [
      { subwayLineId: '2', subwayLineName: '2호선' },
      { subwayLineId: '18', subwayLineName: '신분당선' },
    ],
  };

  it('노선 버튼 클릭 시 선택한 노선이 앞으로 정렬된다', async () => {
    const setUserStations = vi.fn();

    render(
      <SubwayLineFilter
        currentStation={currentStation}
        userStations={[currentStation]}
        setUserStations={setUserStations}
      />,
    );

    await userEvent.click(screen.getByRole('button', { name: '신분당' }));

    expect(setUserStations).toHaveBeenCalledTimes(1);

    const updatedStations = setUserStations.mock.calls[0][0] as UserStation[];
    expect(updatedStations[0].subwayLineInfoList[0].subwayLineId).toBe('18');
    expect(updatedStations[0].subwayLineInfoList[1].subwayLineId).toBe('2');
  });

  it('전체 노선도 링크를 렌더링한다', () => {
    render(
      <SubwayLineFilter
        currentStation={currentStation}
        userStations={[currentStation]}
        setUserStations={vi.fn()}
      />,
    );

    expect(screen.getByText('전체 노선도 보기')).toBeInTheDocument();
    expect(screen.getByTestId('stackflow-link')).toBeInTheDocument();
    expect(screen.getByTestId('chevron-right')).toBeInTheDocument();
  });
});

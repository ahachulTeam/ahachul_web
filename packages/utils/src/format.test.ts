import { describe, expect, it } from 'vitest';

import { formatDisplayDate } from './date';
import { parseFileExtOfName } from './file';
import { formatDisplayNumber, formatDisplayPrice } from './number';
import {
  formatLost112Content,
  formatSubwayArrivalTime,
  formatSubwayFilterOption,
  formatSubwayLineInfo,
  getFirstParentLineId,
} from './subway';

describe('format utils', () => {
  it('parses file extension safely', () => {
    expect(parseFileExtOfName('foo/bar.png')).toBe('png');
    expect(parseFileExtOfName('README')).toBe('');
    expect(parseFileExtOfName('archive.')).toBe('');
  });

  it('formats display number and price', () => {
    expect(formatDisplayNumber(10000)).toBe('10,000');
    expect(formatDisplayNumber('12,345')).toBe('12,345');
    expect(formatDisplayNumber('invalid')).toBe('-');

    expect(formatDisplayPrice(10000)).toBe('10,000원');
    expect(formatDisplayPrice(10000, { style: 'currency' })).toContain('10,000');
  });

  it('formats display date with deterministic invalid and recent output', () => {
    const now = Date.parse('2026-01-01T00:01:00Z');
    expect(formatDisplayDate('invalid-date')).toBe('알 수 없음');
    expect(formatDisplayDate(now - 30 * 1000, { now })).toBe('방금 전');
    expect(formatDisplayDate(now - 3 * 24 * 60 * 60 * 1000, { format: 'short', now })).toMatch(
      /\d{2}월 \d{2}일/,
    );
  });

  it('formats subway filter option and line info map', () => {
    expect(formatSubwayFilterOption('ALL_LINES', '1,2')).toBe(0);
    expect(formatSubwayFilterOption('ONLY_MY_LINE', '1,2')).toBe('1,2');
    expect(
      formatSubwayFilterOption('3', 3, {
        allLinesOption: '0',
        onlyMyLineOption: '3',
      }),
    ).toBe(3);

    expect(
      formatSubwayLineInfo({
        subwayLines: [
          {
            id: 1,
            name: '1호선',
            stations: [
              { id: 10, name: '시청' },
              { id: 11, name: '종각' },
            ],
          },
          {
            id: 2,
            name: '2호선',
            stations: [{ id: 20, name: '시청' }],
          },
        ],
      }),
    ).toEqual({
      시청: [
        { stationId: 10, parentLineId: 1, parentLineNames: '1호선' },
        { stationId: 20, parentLineId: 2, parentLineNames: '2호선' },
      ],
      종각: [{ stationId: 11, parentLineId: 1, parentLineNames: '1호선' }],
    });
  });

  it('formats station id group, lost112 text, and arrival time labels', () => {
    expect(
      getFirstParentLineId([
        {
          subwayLineInfoList: [{ subwayLineId: 2 }, { subwayLineId: 7 }],
        },
      ]),
    ).toBe('2,7');
    expect(getFirstParentLineId([])).toBe('');

    expect(formatLost112Content('신고하였습니다. 확인 바랍니다.')).toBe(
      '신고하였습니다.\n\n확인 바랍니다.',
    );

    expect(
      formatSubwayArrivalTime(40, { arrivalThresholdSeconds: 60, arrivalText: '곧 도착' }),
    ).toBe('곧 도착');
    expect(formatSubwayArrivalTime(120)).toBe('2분');
    expect(formatSubwayArrivalTime(125)).toBe('2분 5초');
    expect(formatSubwayArrivalTime(-1)).toBe('알 수 없음');
  });
});

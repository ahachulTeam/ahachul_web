import { describe, expect, it } from 'vitest';

import { resolveMinutesToLastTrainText } from './lastTrainRisk';

describe('resolveMinutesToLastTrainText', () => {
  it('음수 분이면 막차 시간 정보 없음 문구를 반환한다', () => {
    expect(resolveMinutesToLastTrainText(-1)).toBe('막차 시간 정보 없음');
  });

  it('0 이상 분이면 남은 시간 문구를 반환한다', () => {
    expect(resolveMinutesToLastTrainText(7)).toBe('막차까지 7분');
  });
});

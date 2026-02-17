import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import { API_PATHS, API_SERVICE_PATHS } from '@ahhachul/http';

import { createMockUnhandledRequestStrategy, mockApiHandlers, resetMockApiState } from './index';

const BASE_URL = 'http://localhost:3000/api';

const server = setupServer(...mockApiHandlers);

beforeAll(() => {
  server.listen({
    onUnhandledRequest: createMockUnhandledRequestStrategy(),
  });
});

afterEach(() => {
  server.resetHandlers();
  resetMockApiState();
});

afterAll(() => {
  server.close();
});

describe('@ahhachul/mock-api', () => {
  it('covers shared API contract endpoints with concrete handlers', async () => {
    const checks: Array<{
      method: string;
      path: string;
      body?: BodyInit | null;
      headers?: Record<string, string>;
    }> = [
      { method: 'GET', path: `${API_PATHS.auth.redirectUrl}?providerType=KAKAO` },
      { method: 'GET', path: `${API_PATHS.auth.login}?providerType=KAKAO&providerCode=mock-code` },
      {
        method: 'POST',
        path: API_PATHS.auth.login,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ providerType: 'KAKAO', providerCode: 'mock-code' }),
      },
      {
        method: 'POST',
        path: API_PATHS.auth.refreshToken,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: 'mock-refresh-token' }),
      },
      { method: 'POST', path: API_PATHS.auth.signOut },
      { method: 'GET', path: API_PATHS.user.profile },
      {
        method: 'PATCH',
        path: API_PATHS.user.profile,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname: '테스트닉네임' }),
      },
      { method: 'GET', path: API_PATHS.user.favoriteStations },
      {
        method: 'POST',
        path: API_PATHS.user.favoriteStations,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stations: [] }),
      },
      {
        method: 'POST',
        path: API_PATHS.user.checkNickname,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname: '아차철러' }),
      },
      { method: 'GET', path: `${API_PATHS.community.list}?pageSize=3` },
      { method: 'GET', path: `${API_PATHS.community.hotList}?pageSize=3` },
      { method: 'GET', path: API_PATHS.community.detail(1001) },
      { method: 'GET', path: API_PATHS.community.comments(1001) },
      { method: 'GET', path: `${API_PATHS.complaint.list}?pageSize=3` },
      { method: 'GET', path: API_PATHS.complaint.detail(2001) },
      { method: 'GET', path: API_PATHS.complaint.comments(2001) },
      { method: 'GET', path: `${API_PATHS.lostFound.list}?pageSize=3` },
      { method: 'GET', path: API_PATHS.lostFound.detail(3001) },
      { method: 'GET', path: API_PATHS.lostFound.comments(3001) },
      {
        method: 'PATCH',
        path: API_PATHS.lostFound.status(3001),
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'COMPLETE' }),
      },
      { method: 'GET', path: API_PATHS.subway.lines },
      { method: 'GET', path: `${API_PATHS.subway.trainRealTimes}?subwayLineId=2&stationId=201` },
      { method: 'GET', path: API_PATHS.common.s3Presigned('mock-file') },
      { method: 'POST', path: API_PATHS.common.s3Presigned('mock-file') },
    ];

    for (const check of checks) {
      const response = await fetch(`${BASE_URL}${check.path}`, {
        method: check.method,
        headers: check.headers,
        body: check.body,
      });
      expect(response.status).toBeLessThan(500);
      expect(response.status).not.toBe(404);
    }
  });

  it('mocks auth and user profile endpoints', async () => {
    const loginResponse = await fetch(
      `${BASE_URL}${API_PATHS.auth.login}?providerType=KAKAO&providerCode=mock-code`,
    );
    const loginBody = await loginResponse.json();

    expect(loginResponse.ok).toBe(true);
    expect(loginBody.code).toBe('100');
    expect(loginBody.result.accessToken).toContain('mock-access-token');

    const profileResponse = await fetch(`${BASE_URL}${API_PATHS.user.profile}`);
    const profileBody = await profileResponse.json();

    expect(profileResponse.ok).toBe(true);
    expect(profileBody.result.nickname).toBe('아차철러');

    const refreshResponse = await fetch(`${BASE_URL}${API_PATHS.auth.refreshToken}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: 'mock-refresh-token' }),
    });
    const refreshBody = await refreshResponse.json();

    expect(refreshResponse.ok).toBe(true);
    expect(refreshBody.result.accessToken).toContain('mock-access-token');
  });

  it('supports community list pagination and comment mutations', async () => {
    const listResponse = await fetch(
      `${BASE_URL}${API_PATHS.community.list}?pageSize=3&sort=createdAt,desc`,
    );
    const listBody = await listResponse.json();

    expect(listResponse.ok).toBe(true);
    expect(listBody.result.data).toHaveLength(3);
    expect(typeof listBody.result.hasNext).toBe('boolean');

    const targetPostId = listBody.result.data[0].id;

    const createCommentResponse = await fetch(
      `${BASE_URL}/${API_SERVICE_PATHS.community}/${targetPostId}/comments`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: '테스트 댓글', upperCommentId: null }),
      },
    );
    const createCommentBody = await createCommentResponse.json();

    expect(createCommentResponse.ok).toBe(true);
    expect(createCommentBody.result.content).toBe('테스트 댓글');

    const commentsResponse = await fetch(
      `${BASE_URL}/${API_SERVICE_PATHS.community}/${targetPostId}/comments`,
    );
    const commentsBody = await commentsResponse.json();

    expect(commentsResponse.ok).toBe(true);
    expect(commentsBody.result.comments.length).toBeGreaterThan(0);
  });

  it('supports lost-found create/edit/status/delete flow', async () => {
    const createBody = new FormData();
    createBody.append(
      'content',
      new Blob(
        [
          JSON.stringify({
            title: '유실물 생성 테스트',
            content: '생성 본문',
            subwayLineId: 2,
            lostType: 'LOST',
          }),
        ],
        { type: 'application/json' },
      ),
    );

    const createResponse = await fetch(`${BASE_URL}${API_PATHS.lostFound.list}`, {
      method: 'POST',
      body: createBody,
    });
    const createResult = await createResponse.json();

    expect(createResponse.ok).toBe(true);
    expect(typeof createResult.result.id).toBe('number');

    const createdId = createResult.result.id as number;

    const editBody = new FormData();
    editBody.append(
      'content',
      new Blob(
        [
          JSON.stringify({
            title: '유실물 수정 테스트',
            content: '수정 본문',
            subwayLineId: 3,
            lostType: 'ACQUIRE',
          }),
        ],
        { type: 'application/json' },
      ),
    );

    const editResponse = await fetch(`${BASE_URL}${API_PATHS.lostFound.detail(createdId)}`, {
      method: 'POST',
      body: editBody,
    });

    expect(editResponse.ok).toBe(true);

    const statusResponse = await fetch(`${BASE_URL}${API_PATHS.lostFound.status(createdId)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'COMPLETE' }),
    });

    expect(statusResponse.ok).toBe(true);

    const detailResponse = await fetch(`${BASE_URL}${API_PATHS.lostFound.detail(createdId)}`);
    const detailBody = await detailResponse.json();

    expect(detailResponse.ok).toBe(true);
    expect(detailBody.result.status).toBe('COMPLETE');

    const deleteResponse = await fetch(`${BASE_URL}${API_PATHS.lostFound.detail(createdId)}`, {
      method: 'DELETE',
    });
    expect(deleteResponse.ok).toBe(true);
  });

  it('supports nickname check and profile update compatibility responses', async () => {
    const checkResponse = await fetch(`${BASE_URL}${API_PATHS.user.checkNickname}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nickname: '아차철러' }),
    });
    const checkBody = await checkResponse.json();

    expect(checkResponse.ok).toBe(true);
    expect(checkBody.payload).toBe(true);

    const updateResponse = await fetch(`${BASE_URL}${API_PATHS.user.profile}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nickname: '새닉네임' }),
    });
    const updateBody = await updateResponse.json();

    expect(updateResponse.ok).toBe(true);
    expect(updateBody.nickname).toBe('새닉네임');
  });

  it('supports subway and presigned upload endpoints', async () => {
    const subwayResponse = await fetch(`${BASE_URL}${API_PATHS.subway.lines}`);
    const subwayBody = await subwayResponse.json();

    expect(subwayResponse.ok).toBe(true);
    expect(subwayBody.result.subwayLines.length).toBeGreaterThan(0);

    const trainResponse = await fetch(
      `${BASE_URL}${API_PATHS.subway.trainRealTimes}?subwayLineId=2&stationId=201`,
    );
    const trainBody = await trainResponse.json();

    expect(trainResponse.ok).toBe(true);
    expect(trainBody.result.trainRealTimes.length).toBeGreaterThan(0);

    const presignedResponse = await fetch(
      `${BASE_URL}/common/presigned/mock-file?fileName=test.png`,
    );
    const presignedBody = await presignedResponse.json();

    expect(presignedResponse.ok).toBe(true);
    expect(typeof presignedBody.url).toBe('string');

    const uploadResponse = await fetch(presignedBody.url, {
      method: 'POST',
      body: new FormData(),
    });

    expect(uploadResponse.status).toBe(201);
  });
});

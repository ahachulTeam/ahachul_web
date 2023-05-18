import 'whatwg-fetch'

import server from './mocks/server'
// 테스트 전 목킹한 msw 서버와 연결
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
// 각 테스트 후 다른 테스트에 영향을 미치지 않기 위해 연결된 핸들러 초기화
afterEach(() => server.resetHandlers())
// 모든 테스트 완료 후 연결 끊기
afterAll(() => server.close())

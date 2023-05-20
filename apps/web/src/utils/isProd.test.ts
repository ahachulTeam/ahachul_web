import { isProd } from './common'

const context = describe

describe('isProd', () => {
  context('env가 production인 경우', () => {
    it('true를 반환한다.', () => {
      expect(isProd('production')).toBeTruthy()
    })
  })
})

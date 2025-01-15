import { http, HttpResponse, type PathParams } from 'msw'

import { PHONE_NUMBER_REGEX } from '@allwagelab/constants'

const createURL = (url: string) => {
  const baseURL = import.meta.env.VITE_BASE_URL
  const fullURL = new URL(url, baseURL)
  return fullURL.href
}

const DB = {
  BUSINESS_NUMBERS: ['123-45-67890'],
  PHONE_NUMBERS: ['010-1234-5678'],
}

// 로그인 mock
const login = http.post<PathParams, { email: string; password: string }>(
  createURL('/auth/login/email'),
  async ({ request }) => {
    const { email, password } = await request.json()

    if (email === 'test@test.com' && password === 'test1234!') {
      return new HttpResponse(null, {
        status: 401,
      })
    }

    return HttpResponse.json({
      data: {
        id: 1,
        email: 'test1@test.com',
        name: '홍길동',
        level: 3,
        isCompany: true,
        isCompanyInfo: true,
        accessToken: 'accessToken값',
      },
    })
  },
)

// 이메일 중복 체크 mock
const checkEmailDuplicate = http.post<PathParams, { email: string }>(
  createURL('/auth/check/email'),
  async ({ request }) => {
    const { email } = await request.json()

    // test@test.com은 이미 존재하는 이메일로 가정
    if (email === 'test@test.com') {
      return new HttpResponse(null, {
        status: 401,
      })
    }

    return new HttpResponse(null, {
      status: 201,
    })
  },
)

// 회원가입 mock
const signup = http.post(createURL('/auth/signup/email'), async ({ request }) => {
  const data = await request.json()
  console.log('signup:mock', data)

  return new HttpResponse(null, {
    status: 201,
  })
})

// 사업자 등록번호 확인 mock
const verifyBusinessNumber = http.post<PathParams, { registration: string }>(
  createURL('/auth/check/registration'),
  async ({ request }) => {
    const { registration } = await request.json()

    if (DB.BUSINESS_NUMBERS.includes(registration)) {
      return new HttpResponse(null, {
        status: 401,
      })
    }

    return new HttpResponse(null, {
      status: 201,
    })
  },
)

// 휴대폰 인증번호 요청 mock
const requestPhoneVerification = http.post<PathParams, { hp: string }>(
  createURL('/auth/signup/send/code'),
  async ({ request }) => {
    const { hp } = await request.json()

    if (DB.PHONE_NUMBERS.includes(hp)) {
      return new HttpResponse(null, {
        status: 401,
      })
    }

    if (!PHONE_NUMBER_REGEX.test(hp)) {
      return new HttpResponse(null, {
        status: 400,
      })
    }

    return new HttpResponse(null, {
      status: 201,
    })
  },
)

// 휴대폰 인증번호 확인 mock
const verifyPhoneNumber = http.post<PathParams, { code: string }>(
  createURL('/auth/signup/verify/code'),
  async ({ request }) => {
    const { code } = await request.json()
    // 1234는 올바른 인증번호로 가정
    if (code === '1234') {
      return new HttpResponse(null, {
        status: 201,
      })
    }

    return new HttpResponse(null, { status: 401 })
  },
)

// 휴대폰 인증번호 요청 mock (아이디 찾기)
const requestPhoneVerificationFindId = http.post<PathParams, { hp: string }>(
  createURL('/auth/email/send/code'),
  async ({ request }) => {
    const { hp } = await request.json()

    if (!DB.PHONE_NUMBERS.includes(hp)) {
      return new HttpResponse(null, {
        status: 401,
      })
    }

    if (!PHONE_NUMBER_REGEX.test(hp)) {
      return new HttpResponse(null, {
        status: 400,
      })
    }

    return new HttpResponse(null, {
      status: 201,
    })
  },
)

// 휴대폰 인증번호 확인 mock (아이디 찾기)
const verifyPhoneNumberFindId = http.post<PathParams, { code: string }>(
  createURL('/auth/email/verify/code'),
  async ({ request }) => {
    const { code } = await request.json()
    // 1234는 올바른 인증번호로 가정
    if (code === '1234') {
      return HttpResponse.json({
        data: {
          name: '올웨이지 시청점',
          email: 'test1@test.com',
        },
      })
    }

    return new HttpResponse(null, { status: 401 })
  },
)

// 임시 비밀번호 발급 mock
const sendTempPassword = http.post<PathParams, { email: string }>(
  createURL('/auth/password/send/code'),
  async ({ request }) => {
    const { email } = await request.json()

    if (email === 'test@test.com') {
      return new HttpResponse(null, {
        status: 201,
      })
    }

    return new HttpResponse(null, {
      status: 401,
    })
  },
)

export const handlers = [
  login,
  checkEmailDuplicate,
  signup,
  verifyBusinessNumber,
  requestPhoneVerification,
  verifyPhoneNumber,
  requestPhoneVerificationFindId,
  verifyPhoneNumberFindId,
  sendTempPassword,
]

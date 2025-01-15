import { AxiosError } from 'axios'

import { axiosInstance, axiosCredentialsInstance } from './index'

import type { LoginRequest, LoginResponse, SignupRequest, SignupResponse } from '../types/auth'

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await axiosCredentialsInstance.post<LoginResponse>('/auth/login/email', data)
    return response.data
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      throw new Error('이메일과 비밀번호가 일치하지 않습니다.')
    }
    throw new Error('로그인 중 오류가 발생했습니다')
  }
}

export const checkEmailDuplicate = async (email: string) => {
  try {
    await axiosInstance.post<boolean>('/auth/check/email', { email })
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      throw new Error('이미 사용 중인 이메일입니다.')
    }
    throw new Error('이메일 중복 확인 중 오류가 발생했습니다.')
  }
}

export const signup = async (data: SignupRequest): Promise<SignupResponse> => {
  try {
    const response = await axiosInstance.post<SignupResponse>('/auth/signup/email', data)
    return response.data
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      throw new Error('회원가입에 실패했습니다.')
    }
    throw new Error('회원가입 중 오류가 발생했습니다.')
  }
}

export const verifyBusinessNumber = async (businessNumber: string) => {
  try {
    await axiosInstance.post('/auth/check/registration', {
      registration: businessNumber,
    })
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      if (error.response.status === 400) {
        throw new Error('잘못된 형식의 사업자 등록 번호입니다.')
      }
      if (error.response.status === 401) {
        throw new Error('이미 등록된 사업자 등록 번호입니다.')
      }
      if (error.response.status === 404) {
        throw new Error('유효하지 않은 사업자 등록 번호입니다.')
      }
    }
    throw new Error('사업자 등록 번호 확인 중 오류가 발생했습니다.')
  }
}

export const requestPhoneVerification = async (phoneNumber: string) => {
  try {
    await axiosInstance.post('/auth/signup/send/code', {
      hp: phoneNumber,
    })
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      if (error.response.status === 400) {
        throw new Error('잘못된 형식의 휴대폰 번호입니다.')
      }
      if (error.response.status === 401) {
        throw new Error('이미 존재하는 휴대폰 번호입니다.')
      }
    }
    throw new Error('휴대폰 인증 요청 중 오류가 발생했습니다.')
  }
}

export const verifyPhoneNumber = async (phoneNumber: string, code: string) => {
  try {
    await axiosInstance.post('/auth/signup/verify/code', {
      hp: phoneNumber,
      code,
    })
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      if (error.response.status === 401) {
        throw new Error('인증번호를 확인해 주세요.')
      }
    }
    throw new Error('휴대폰 인증번호 확인 중 오류가 발생했습니다')
  }
}

export const requestPhoneVerificationFindId = async (phoneNumber: string) => {
  try {
    await axiosInstance.post('/auth/email/send/code', {
      hp: phoneNumber,
    })
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      if (error.response.status === 400) {
        throw new Error('잘못된 형식의 휴대폰 번호입니다.')
      }
      if (error.response.status === 401) {
        throw new Error('존재하지 않는 휴대폰 번호입니다.')
      }
    }
    throw new Error('휴대폰 인증 요청 중 오류가 발생했습니다.')
  }
}

export const verifyPhoneNumberFindId = async (phoneNumber: string, code: string) => {
  try {
    const response = await axiosInstance.post('/auth/email/verify/code', {
      hp: phoneNumber,
      code,
    })

    return response.data.data
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      if (error.response.status === 401) {
        throw new Error('인증번호를 확인해 주세요.')
      }
    }
    throw new Error('휴대폰 인증번호 확인 중 오류가 발생했습니다')
  }
}

export const sendTempPassword = async (email: string) => {
  try {
    await axiosInstance.post('/auth/password/send/code', {
      email,
    })
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      throw new Error('가입된 정보가 없습니다. 이메일을 한번 더 확인해주세요.')
    }
    throw new Error('임시 비밀번호 발급 중 오류가 발생했습니다.')
  }
}

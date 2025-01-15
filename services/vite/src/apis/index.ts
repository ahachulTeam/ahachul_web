import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'

const baseURL = import.meta.env.VITE_BASE_URL

interface AxiosInstanceOptions extends AxiosRequestConfig {
  withCredentials?: boolean
}

const defaultOptions: AxiosInstanceOptions = {
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
}

const createAxiosInstance = (options: AxiosInstanceOptions = {}): AxiosInstance =>
  axios.create({
    ...defaultOptions,
    ...options,
  })

export const axiosInstance: AxiosInstance = createAxiosInstance()

export const axiosPrivateInstance: AxiosInstance = createAxiosInstance({
  withCredentials: true,
})

export const axiosCredentialsInstance: AxiosInstance = createAxiosInstance({
  withCredentials: true,
})

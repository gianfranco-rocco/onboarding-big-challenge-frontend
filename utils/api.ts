import axios from 'axios'

export const getErrorMessage = (err: unknown, fallback: string = 'Something went wrong.'): string => {
  let message = fallback

  if (axios.isAxiosError(err)) {
    message = err?.response?.data.message || message
  }

  return message
}

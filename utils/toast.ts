import { ToastOptions, ToastPosition, UpdateOptions } from 'react-toastify'

export const position: ToastPosition = 'bottom-right'

export const config: ToastOptions = {
  position,
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined
}

export const updateConfig: UpdateOptions = {
  isLoading: false,
  autoClose: 3000,
  render: '',
  type: 'default',
  position
}

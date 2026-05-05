import toast from 'react-hot-toast'

export const showSuccess = (message: string) => {
  toast.success(message)
}

export const showError = (message: string) => {
  toast.error(message)
}

export const showLoading = (message: string) => {
  return toast.loading(message)
}

export const showPromise = <T>(
  promise: Promise<T>,
  messages: {
    loading: string
    success: string
    error: string
  }
) => {
  return toast.promise(promise, messages)
}

export const dismissToast = (toastId: string) => {
  toast.dismiss(toastId)
}

export default {
  success: showSuccess,
  error: showError,
  loading: showLoading,
  promise: showPromise,
  dismiss: dismissToast,
}
import { toast, ToastOptions, TypeOptions } from 'react-toastify'

import ToastErrorIcon from '#shared/assets/toast/errorToastIcon.svg?react'
import ToastSuccessIcon from '#shared/assets/toast/successToastIcon.svg?react'
import WarningSuccessIcon from '#shared/assets/toast/warningToastIcon.svg?react'
import ToastIcon from '#shared/ui/toast/ToastIcon'

const defaultOptions: Record<string, ToastOptions> = {
	success: {
		autoClose: 3000,
		icon: () => <ToastIcon icon={ToastSuccessIcon} />,
	},
	error: {
		autoClose: 3000,
		icon: () => <ToastIcon icon={ToastErrorIcon} />,
	},
	warning: {
		autoClose: 3000,
		icon: () => <ToastIcon icon={WarningSuccessIcon} />,
	},
	info: {
		autoClose: 3000,
	},
} as const

const notify = (type: TypeOptions, message: string, options?: ToastOptions) => {
	if (type === 'default') return

	const mergedOptions: ToastOptions = {
		...defaultOptions[type as keyof typeof defaultOptions],
		...options,
	}

	return toast[type](message, mergedOptions)
}

export const toastUtils = {
	success: (message: string, options?: ToastOptions) =>
		notify('success', message, options),

	error: (message: string, options?: ToastOptions) =>
		notify('error', message, options),

	warning: (message: string, options?: ToastOptions) =>
		notify('warning', message, options),

	info: (message: string, options?: ToastOptions) =>
		notify('info', message, options),
}

import {
	type BaseQueryApi,
	type FetchArgs,
	type FetchBaseQueryError,
	type QueryReturnValue,
	FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query'
import { Mutex } from 'async-mutex'

import { getBaseQuery } from './baseQuery.ts'
import {
	STORAGE_TOKEN_KEY,
	SCRIPT_RETRY_COUNT,
} from '#shared/consts/localStorage.ts'
import { RootState } from '#app/store/appStore'
import { setTokens } from '#entities/auth/slice.ts'

export const getBaseQueryWIthReauth = (baseUrl: string) => {
	const baseQuery = getBaseQuery(baseUrl)
	console.log(baseUrl, 'random')

	const mutex = new Mutex()
	const AUTH_ERROR_CODES = new Set([401])

	const baseQueryWithReauth = async (
		args: string | FetchArgs,
		api: BaseQueryApi,
		extraOptions: object,
	): Promise<
		QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>
	> => {
		// Ждем, пока освободится mutex (если другой запрос уже обновляет токен)
		await mutex.waitForUnlock()

		let result = await baseQuery(args, api, extraOptions)

		// Если получили 401 ошибку
		if (
			typeof result.error?.status === 'number' &&
			AUTH_ERROR_CODES.has(result.error.status)
		) {
			if (!mutex.isLocked()) {
				const release = await mutex.acquire()
				try {
					// Не пытаемся обновить токен, если ошибка произошла на самих ручках логина/рефреша
					const url = (args as FetchArgs)?.url || (args as string)
					if (
						url.includes('auth/login') ||
						url.includes('auth/refresh')
					) {
						return result
					}

					const localAuthState = (api.getState() as RootState).auth
					const refreshToken =
						localAuthState?.refreshToken ||
						localStorage.getItem(SCRIPT_RETRY_COUNT)

					if (refreshToken) {
						const refreshResult = await baseQuery(
							{
								url: '/api/admin/auth/refresh',
								body: { refreshToken },
								method: 'POST',
								headers: { Authorization: 'exclude' },
							},
							api,
							extraOptions,
						)

						if (refreshResult.data) {
							const data = refreshResult.data as any
							const newTokens = {
								token: data.token,
								refreshToken: data.refreshToken,
							}

							// 1. Обновляем Redux
							api.dispatch(setTokens(newTokens))

							// 2. Обновляем LocalStorage (как в LoginPage)
							if (newTokens.token)
								localStorage.setItem(
									STORAGE_TOKEN_KEY,
									newTokens.token,
								)
							if (newTokens.refreshToken)
								localStorage.setItem(
									SCRIPT_RETRY_COUNT,
									newTokens.refreshToken,
								)

							// 3. Повторяем изначальный запрос с новым токеном
							result = await baseQuery(args, api, extraOptions)
						} else {
							// Если refresh не удался — принудительно разлогиниваем
							// Здесь можно вызвать экшен очистки токенов
							// api.dispatch(logoutAction())
							localStorage.clear()
							window.location.href = '/login'
						}
					}
				} finally {
					release()
				}
			} else {
				// Если mutex был заблокирован, значит токен уже обновляется.
				// Ждем завершения и повторяем запрос.
				await mutex.waitForUnlock()
				result = await baseQuery(args, api, extraOptions)
			}
		}

		return result
	}

	return baseQueryWithReauth
}

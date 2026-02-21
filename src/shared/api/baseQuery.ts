// src/shared/api/baseQuery.ts
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '#app/store/appStore'
import { STORAGE_TOKEN_KEY } from '#shared/consts/localStorage'

export const getBaseQuery = (baseUrl: string) =>
	fetchBaseQuery({
		baseUrl,
		prepareHeaders: (headers, { getState }) => {
			const token =
				(getState() as RootState).auth.token ||
				localStorage.getItem(STORAGE_TOKEN_KEY)

			if (token && headers.get('Authorization') !== 'exclude') {
				headers.set('Authorization', `Bearer ${token}`)
			}

			// Удаляем служебный заголовок
			if (headers.get('Authorization') === 'exclude') {
				headers.delete('Authorization')
			}

			return headers
		},
	})

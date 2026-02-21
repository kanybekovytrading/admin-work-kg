import { configureStore } from '@reduxjs/toolkit'

import { rootReducer } from './rootReducer'
import { workBaseApi } from '#shared/api/workBaseApi'
import { invalidateAccessTokenListener } from '#features/authentication/logout/logout'

export function buildStore() {
	return configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(
				workBaseApi.middleware,
				invalidateAccessTokenListener.middleware,
			),
	})
}

export const appStore = buildStore()

export type RootState = ReturnType<typeof appStore.getState>
export type AppDispatch = typeof appStore.dispatch

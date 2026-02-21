import {
	createListenerMiddleware,
	type TypedStartListening,
} from '@reduxjs/toolkit'

import { AppDispatch, RootState } from '#app/store/appStore.tsx'
import { invalidateAccessToken } from '#shared/api/invalidateTokenEvent'
import {
	// STORAGE_LEGAL_ID_KEY,
	STORAGE_TOKEN_KEY,
} from '#shared/consts/localStorage.ts'
import { workBaseApi } from '#shared/api/workBaseApi'
import { clearAuthData } from '#entities/auth/slice'

// NOTE: Code below is used to log out user.
// Why we didn't use simple logout function like thunk ?
// Because it breaks rules of FSD.

// Why using thunk in this case is wrong:
// In the ~/shared folder we have api, which have refresh-token related code
// If refresh-token fails - we should log out user. Logout thunk is located in features.
// And as you know lower layers can't import higher layers.

export const invalidateAccessTokenListener = createListenerMiddleware()

// @see https://redux-toolkit.js.org/api/createListenerMiddleware#typescript-usage
export type TypedListening = TypedStartListening<RootState, AppDispatch>

export const startInvalidateAccessTokenListener =
	invalidateAccessTokenListener.startListening as TypedListening

startInvalidateAccessTokenListener({
	actionCreator: invalidateAccessToken,
	effect: async (_, api) => {
		// In the future here may be logic with refresh access token
		// @see https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#preventing-multiple-unauthorized-errors
		try {
			// logout api will be used here
		} catch (e) {
			console.warn(e)
		} finally {
			sessionStorage.removeItem(STORAGE_TOKEN_KEY)
			// sessionStorage.removeItem(STORAGE_LEGAL_ID_KEY)
			sessionStorage.removeItem('@PROJECT_CHOICE_KEY')
			localStorage.clear()
			api.dispatch(clearAuthData())
			api.dispatch(workBaseApi.util.resetApiState())
		}
	},
})

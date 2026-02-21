import { combineReducers } from '@reduxjs/toolkit'

import { workBaseApi } from '#shared/api/workBaseApi'
import { authSlice } from '#entities/auth/slice'

export const rootReducer = combineReducers({
	[workBaseApi.reducerPath]: workBaseApi.reducer,
	[authSlice.name]: authSlice.reducer,
	// [headerSlice.name]: headerSlice.reducer,
})

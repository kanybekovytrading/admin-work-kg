import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '#app/store/appStore.tsx'
import { LoginResponse } from './api/generated'

type State = {
	isAuthorized: boolean
	token?: string
	refreshToken?: string
	legalUserId?: string
	user?: LoginResponse
	legalId?: string
}

const initialState: State = {
	isAuthorized: false,
	user: {},
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		clearAuthData: (state) => {
			state.isAuthorized = false
			state.token = undefined
			state.refreshToken = undefined
			state.legalUserId = undefined
		},
		setTokens: (state, { payload }) => {
			state.token = payload.token
			state.refreshToken = payload.refreshToken
			state.legalUserId = payload.legalUserId
		},
		setAuthData: (state, { payload }) => {
			state.isAuthorized = true
			state.user = payload
		},
		// setLegalData: (state, { payload }) => {
		// 	state.legal = payload
		// },
		setLegalId: (state, { payload }) => {
			state.legalId = payload
		},
		setIsAuthorized(state, { payload }) {
			state.isAuthorized = payload
		},
	},
})

export const selectIsAuthorized = (state: RootState) => state.auth?.isAuthorized

export const selectUserToken = (state: RootState) => state.auth?.token

export const selectUser = (state: RootState) => state?.auth ?? ({} as State)

// export const selectLegalId = (state: RootState) => state?.auth?.legalId

export const {
	clearAuthData,
	setTokens,
	// setLegalData,
	setLegalId,
	setAuthData,
	setIsAuthorized,
} = authSlice.actions

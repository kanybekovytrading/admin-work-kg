import { createAction } from '@reduxjs/toolkit'

export const invalidateAccessToken = createAction(
	'authentication/invalidateAccessToken',
)

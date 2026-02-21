import { createApi } from '@reduxjs/toolkit/query/react'

import { config } from './config'
import { getBaseQueryWIthReauth } from './baseQueryWithReauth'

export const workBaseApi = createApi({
	tagTypes: [],
	reducerPath: 'workBaseApi',
	baseQuery: getBaseQueryWIthReauth(config.WORK_BASE_URL),
	refetchOnMountOrArgChange: true,
	endpoints: () => ({}),
}).enhanceEndpoints({ addTagTypes: ['CurrentUser', 'I18N'] })

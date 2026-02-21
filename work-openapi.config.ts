import type { ConfigFile } from '@rtk-query/codegen-openapi'

const config: ConfigFile = {
	schemaFile: `${process.env.VITE_WORK_BACKEND_URL}/v3/api-docs`,
	apiFile: './src/shared/api/workBaseApi.ts',
	apiImport: 'workBaseApi',
	exportName: 'clientEndpoints',

	outputFiles: {
		'./src/entities/vacancies/api/generated.ts': {
			filterEndpoints: (_, endpoint) => {
				return endpoint.path.startsWith('/api/admin/vacancies')
			},
			exportName: 'legalApi',
			flattenArg: true,
		},
		'./src/entities/auth/api/generated.ts': {
			filterEndpoints: (_, endpoint) => {
				return endpoint.path.startsWith('/api/admin/auth')
			},
			exportName: 'authApi',
			flattenArg: true,
		},
		'./src/entities/dashboard/api/generated.ts': {
			filterEndpoints: (_, endpoint) => {
				return endpoint.path.startsWith('/api/admin/dashboard')
			},
			exportName: 'dashboardApi',
			flattenArg: true,
		},
		'./src/entities/resumes/api/generated.ts': {
			filterEndpoints: (_, endpoint) => {
				return endpoint.path.startsWith('/api/admin/resumes')
			},
			exportName: 'dashboardApi',
			flattenArg: true,
		},
		'./src/entities/categories/api/generated.ts': {
			filterEndpoints: (_, endpoint) => {
				return endpoint.path.startsWith('/api/admin/categories')
			},
			exportName: 'categoriesApi',
			flattenArg: true,
		},
		'./src/entities/cities/api/generated.ts': {
			filterEndpoints: (_, endpoint) => {
				return endpoint.path.startsWith('/api/admin/cities')
			},
			exportName: 'citiesApi',
			flattenArg: true,
		},
		'./src/entities/users/api/generated.ts': {
			filterEndpoints: (_, endpoint) => {
				return endpoint.path.startsWith('/api/admin/users')
			},
			exportName: 'usersApi',
			flattenArg: true,
		},
		'./src/entities/subscriptions/api/generated.ts': {
			filterEndpoints: (_, endpoint) => {
				return endpoint.path.startsWith('/api/admin/subscriptions')
			},
			exportName: 'subscriptionsApi',
			flattenArg: true,
		},
		'./src/entities/points/api/generated.ts': {
			filterEndpoints: (_, endpoint) => {
				return endpoint.path.startsWith('/api/admin/points')
			},
			exportName: 'pointsApi',
			flattenArg: true,
		},
		'./src/entities/social-task/api/generated.ts': {
			filterEndpoints: (_, endpoint) => {
				return endpoint.path.startsWith('/api/admin/social-tasks')
			},
			exportName: 'socialApi',
			flattenArg: true,
		},
		'./src/entities/feedback/api/generated.ts': {
			filterEndpoints: (_, endpoint) => {
				return endpoint.path.startsWith('/api/admin/feedback')
			},
			exportName: 'feedbackApi',
			flattenArg: true,
		},
		'./src/entities/bot/api/generated.ts': {
			filterEndpoints: (_, endpoint) => {
				return endpoint.path.startsWith('/api/bot')
			},
			exportName: 'botApi',
			flattenArg: true,
		},
	},
}

export default config

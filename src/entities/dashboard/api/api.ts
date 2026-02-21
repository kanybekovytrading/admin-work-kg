import { workBaseApi as api } from '../../../shared/api/workBaseApi'
const injectedRtkApi = api.injectEndpoints({
	endpoints: (build) => ({
		getDashboardStats: build.query<
			GetDashboardStatsApiResponse,
			GetDashboardStatsApiArg
		>({
			query: () => ({ url: `/api/admin/dashboard/stats` }),
		}),
	}),
	overrideExisting: false,
})
export { injectedRtkApi as dashboardApi }

export const { useGetDashboardStatsQuery } = injectedRtkApi

export type GetDashboardStatsApiResponse =
	/** status 200 OK */ DashboardResponse
export type GetDashboardStatsApiArg = void
export type User = {
	id?: number
	telegramId?: number
	username?: string
	firstName?: string
	lastName?: string
	phone?: string
	language?: 'RU' | 'KY' | 'EN'
	balance?: number
	referralCode?: string
	isBanned?: boolean
	createdAt?: string
	updatedAt?: string
}
export type City = {
	id?: number
	nameRu?: string
	nameEn?: string
	isActive?: boolean
	createdAt?: string
}
export type Category = {
	id?: number
	nameRu?: string
	nameKy?: string
	nameEn?: string
	icon?: string
	isActive?: boolean
	createdAt?: string
}
export type Subcategory = {
	id?: number
	category?: Category
	nameRu?: string
	nameKy?: string
	nameEn?: string
	isActive?: boolean
	createdAt?: string
}
export type Vacancy = {
	id?: number
	user?: User
	title?: string
	description?: string
	salary?: string
	companyName?: string
	phone?: string
	city?: City
	category?: Category
	subcategory?: Subcategory
	isActive?: boolean
	createdAt?: string
	updatedAt?: string
}
export type DashboardResponse = {
	totalUsers?: number
	newUsersToday?: number
	totalResumes?: number
	activeResumes?: number
	totalVacancies?: number
	activeVacancies?: number
	activeSubscriptions?: number
	totalPointsInSystem?: number
	pendingFeedback?: number
	pendingWithdrawals?: number
	recentVacancies?: Vacancy[]
}

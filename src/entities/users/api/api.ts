import { workBaseApi as api } from '../../../shared/api/workBaseApi'
const injectedRtkApi = api.injectEndpoints({
	endpoints: (build) => ({
		unbanUser: build.mutation<UnbanUserApiResponse, UnbanUserApiArg>({
			query: (queryArg) => ({
				url: `/api/admin/users/${queryArg}/unban`,
				method: 'PUT',
			}),
		}),
		banUser: build.mutation<BanUserApiResponse, BanUserApiArg>({
			query: (queryArg) => ({
				url: `/api/admin/users/${queryArg}/ban`,
				method: 'PUT',
			}),
		}),
		getAllUsers: build.mutation<GetAllUsersApiResponse, GetAllUsersApiArg>({
			query: (queryArg) => ({
				url: `/api/admin/users/search`,
				method: 'POST',
				body: queryArg,
			}),
		}),
		getUserById: build.query<GetUserByIdApiResponse, GetUserByIdApiArg>({
			query: (queryArg) => ({ url: `/api/admin/users/${queryArg}` }),
		}),
		deleteUser: build.mutation<DeleteUserApiResponse, DeleteUserApiArg>({
			query: (queryArg) => ({
				url: `/api/admin/users/${queryArg}`,
				method: 'DELETE',
			}),
		}),
	}),
	overrideExisting: false,
})
export { injectedRtkApi as usersApi }

export const {
	useBanUserMutation,
	useDeleteUserMutation,
	useGetAllUsersMutation,
	useGetUserByIdQuery,
	useUnbanUserMutation,
} = injectedRtkApi

export type UnbanUserApiResponse = /** status 200 OK */ User
export type UnbanUserApiArg = number
export type BanUserApiResponse = /** status 200 OK */ User
export type BanUserApiArg = number
export type GetAllUsersApiResponse = /** status 200 OK */ PageUser
export type GetAllUsersApiArg = PageRequestDto
export type GetUserByIdApiResponse = /** status 200 OK */ User
export type GetUserByIdApiArg = number
export type DeleteUserApiResponse = unknown
export type DeleteUserApiArg = number
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
export type SortObject = {
	sorted?: boolean
	unsorted?: boolean
	empty?: boolean
}
export type PageableObject = {
	paged?: boolean
	pageSize?: number
	pageNumber?: number
	unpaged?: boolean
	offset?: number
	sort?: SortObject
}
export type PageUser = {
	totalElements?: number
	totalPages?: number
	pageable?: PageableObject
	numberOfElements?: number
	first?: boolean
	last?: boolean
	size?: number
	content?: User[]
	number?: number
	sort?: SortObject
	empty?: boolean
}
export type PageRequestDto = {
	page?: number
	size?: number
	sort?: string[]
}

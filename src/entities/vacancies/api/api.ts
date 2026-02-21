import { workBaseApi as api } from '../../../shared/api/workBaseApi'
const injectedRtkApi = api
	.enhanceEndpoints({
		addTagTypes: ['Vacancies'],
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getVacancyById: build.query<
				GetVacancyByIdApiResponse,
				GetVacancyByIdApiArg
			>({
				query: (queryArg) => ({
					url: `/api/admin/vacancies/${queryArg}`,
				}),
				providesTags: ['Vacancies'],
			}),
			updateVacancy: build.mutation<
				UpdateVacancyApiResponse,
				UpdateVacancyApiArg
			>({
				query: (queryArg) => ({
					url: `/api/admin/vacancies/${queryArg.id}`,
					method: 'PUT',
					body: queryArg.updateVacancyRequest,
				}),
				invalidatesTags: ['Vacancies'],
			}),
			deleteVacancy: build.mutation<
				DeleteVacancyApiResponse,
				DeleteVacancyApiArg
			>({
				query: (queryArg) => ({
					url: `/api/admin/vacancies/${queryArg}`,
					method: 'DELETE',
				}),
				invalidatesTags: ['Vacancies'],
			}),
			getAllVacancies: build.query<
				GetAllVacanciesApiResponse,
				GetAllVacanciesApiArg
			>({
				query: (queryArg) => ({
					url: `/api/admin/vacancies`,
					params: {
						pageable: queryArg,
					},
				}),
				providesTags: ['Vacancies'],
			}),
			createVacancy1: build.mutation<
				CreateVacancy1ApiResponse,
				CreateVacancy1ApiArg
			>({
				query: (queryArg) => ({
					url: `/api/admin/vacancies`,
					method: 'POST',
					body: queryArg.createVacancyAdminRequest,
					params: {
						adminUserId: queryArg.adminUserId,
					},
				}),
				invalidatesTags: ['Vacancies'],
			}),
		}),
		overrideExisting: false,
	})
export { injectedRtkApi as legalApi }

export const {
	useCreateVacancy1Mutation,
	useDeleteVacancyMutation,
	useGetAllVacanciesQuery,
	useGetVacancyByIdQuery,
	useUpdateVacancyMutation,
} = injectedRtkApi

export type GetVacancyByIdApiResponse = /** status 200 OK */ VacancyResponse
export type GetVacancyByIdApiArg = number
export type UpdateVacancyApiResponse = /** status 200 OK */ VacancyResponse
export type UpdateVacancyApiArg = {
	id: number
	updateVacancyRequest: UpdateVacancyRequest
}
export type DeleteVacancyApiResponse = unknown
export type DeleteVacancyApiArg = number
export type GetAllVacanciesApiResponse =
	/** status 200 OK */ PageVacancyResponse
export type GetAllVacanciesApiArg = Pageable
export type CreateVacancy1ApiResponse = /** status 200 OK */ VacancyResponse
export type CreateVacancy1ApiArg = {
	adminUserId: number
	createVacancyAdminRequest: CreateVacancyAdminRequest
}
export type VacancyResponse = {
	id?: number
	title?: string
	description?: string
	salary?: number
	companyName?: string
	phone?: string
	isActive?: boolean
	createdAt?: string
	updatedAt?: string
	userId?: number
	userName?: string
	cityId?: number
	cityName?: string
	categoryId?: number
	categoryName?: string
	subcategoryId?: number
	subcategoryName?: string
}
export type UpdateVacancyRequest = {
	title?: string
	description?: string
	salary?: string
	companyName?: string
	phone?: string
	isActive?: boolean
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
export type PageVacancyResponse = {
	totalElements?: number
	totalPages?: number
	pageable?: PageableObject
	numberOfElements?: number
	first?: boolean
	last?: boolean
	size?: number
	content?: VacancyResponse[]
	number?: number
	sort?: SortObject
	empty?: boolean
}
export type Pageable = {
	page?: number
	size?: number
	sort?: string[]
}
export type CreateVacancyAdminRequest = {
	title?: string
	description?: string
	salary?: string
	companyName?: string
	phone?: string
	cityId?: number
	categoryId?: number
	subcategoryId?: number
}

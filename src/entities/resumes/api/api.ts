import { workBaseApi as api } from '../../../shared/api/workBaseApi'
const injectedRtkApi = api.injectEndpoints({
	endpoints: (build) => ({
		getAllResumes: build.query<
			GetAllResumesApiResponse,
			GetAllResumesApiArg
		>({
			query: (queryArg) => ({
				url: `/api/admin/resumes`,
				params: {
					pageable: queryArg,
				},
			}),
		}),
		getResumeById: build.query<
			GetResumeByIdApiResponse,
			GetResumeByIdApiArg
		>({
			query: (queryArg) => ({ url: `/api/admin/resumes/${queryArg}` }),
		}),
		deleteResume: build.mutation<
			DeleteResumeApiResponse,
			DeleteResumeApiArg
		>({
			query: (queryArg) => ({
				url: `/api/admin/resumes/${queryArg}`,
				method: 'DELETE',
			}),
		}),
		countActiveResumes: build.query<
			CountActiveResumesApiResponse,
			CountActiveResumesApiArg
		>({
			query: () => ({ url: `/api/admin/resumes/stats/active-count` }),
		}),
	}),
	overrideExisting: false,
})
export { injectedRtkApi as dashboardApi }

export const {
	useCountActiveResumesQuery,
	useGetResumeByIdQuery,
	useDeleteResumeMutation,
	useGetAllResumesQuery,
} = injectedRtkApi

export type GetAllResumesApiResponse = /** status 200 OK */ PageResume
export type GetAllResumesApiArg = Pageable
export type GetResumeByIdApiResponse = /** status 200 OK */ Resume
export type GetResumeByIdApiArg = number
export type DeleteResumeApiResponse = unknown
export type DeleteResumeApiArg = number
export type CountActiveResumesApiResponse = /** status 200 OK */ number
export type CountActiveResumesApiArg = void
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
export type Resume = {
	id?: number
	name?: string
	age?: number
	gender?: 'MALE' | 'FEMALE'
	city?: City
	category?: Category
	subcategory?: Subcategory
	experience?: number
	description?: string
	isActive?: boolean
	createdAt?: string
	updatedAt?: string
}
export type PageResume = {
	totalElements?: number
	totalPages?: number
	pageable?: PageableObject
	numberOfElements?: number
	first?: boolean
	last?: boolean
	size?: number
	content?: Resume[]
	number?: number
	sort?: SortObject
	empty?: boolean
}
export type Pageable = {
	page?: number
	size?: number
	sort?: string[]
}

import { workBaseApi as api } from '../../../shared/api/workBaseApi'
const injectedRtkApi = api
	.enhanceEndpoints({
		addTagTypes: ['Categories'],
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getCategoryById: build.query<
				GetCategoryByIdApiResponse,
				GetCategoryByIdApiArg
			>({
				query: (queryArg) => ({
					url: `/api/admin/categories/${queryArg}`,
				}),
				providesTags: ['Categories'],
			}),
			updateCategory: build.mutation<
				UpdateCategoryApiResponse,
				UpdateCategoryApiArg
			>({
				query: (queryArg) => ({
					url: `/api/admin/categories/${queryArg.id}`,
					method: 'PUT',
					body: queryArg.createCategoryRequest,
				}),
				invalidatesTags: ['Categories'],
			}),
			deleteCategory: build.mutation<
				DeleteCategoryApiResponse,
				DeleteCategoryApiArg
			>({
				query: (queryArg) => ({
					url: `/api/admin/categories/${queryArg}`,
					method: 'DELETE',
				}),
				invalidatesTags: ['Categories'],
			}),
			updateSubcategory: build.mutation<
				UpdateSubcategoryApiResponse,
				UpdateSubcategoryApiArg
			>({
				query: (queryArg) => ({
					url: `/api/admin/categories/subcategories/${queryArg.id}`,
					method: 'PUT',
					body: queryArg.createSubcategoryRequest,
				}),
				invalidatesTags: ['Categories'],
			}),
			deleteSubcategory: build.mutation<
				DeleteSubcategoryApiResponse,
				DeleteSubcategoryApiArg
			>({
				query: (queryArg) => ({
					url: `/api/admin/categories/subcategories/${queryArg}`,
					method: 'DELETE',
				}),
				invalidatesTags: ['Categories'],
			}),
			getAllCategories: build.query<
				GetAllCategoriesApiResponse,
				GetAllCategoriesApiArg
			>({
				query: () => ({ url: `/api/admin/categories` }),
				providesTags: ['Categories'],
			}),

			createCategory: build.mutation<
				CreateCategoryApiResponse,
				CreateCategoryApiArg
			>({
				query: (queryArg) => ({
					url: `/api/admin/categories`,
					method: 'POST',
					body: queryArg,
				}),
				invalidatesTags: ['Categories'],
			}),
			createSubcategory: build.mutation<
				CreateSubcategoryApiResponse,
				CreateSubcategoryApiArg
			>({
				query: (queryArg) => ({
					url: `/api/admin/categories/subcategories`,
					method: 'POST',
					body: queryArg,
				}),
				invalidatesTags: ['Categories'],
			}),
			getSubcategoriesByCategory1: build.query<
				GetSubcategoriesByCategory1ApiResponse,
				GetSubcategoriesByCategory1ApiArg
			>({
				query: (queryArg) => ({
					url: `/api/admin/categories/${queryArg}/subcategories`,
				}),
				providesTags: ['Categories'],
			}),
		}),
		overrideExisting: false,
	})
export { injectedRtkApi as categoriesApi }

export const {
	useCreateCategoryMutation,
	useCreateSubcategoryMutation,
	useDeleteCategoryMutation,
	useDeleteSubcategoryMutation,
	useGetAllCategoriesQuery,
	useGetCategoryByIdQuery,
	useGetSubcategoriesByCategory1Query,
	useUpdateCategoryMutation,
	useUpdateSubcategoryMutation,
} = injectedRtkApi

export type GetCategoryByIdApiResponse = /** status 200 OK */ Category
export type GetCategoryByIdApiArg = number
export type UpdateCategoryApiResponse = /** status 200 OK */ Category
export type UpdateCategoryApiArg = {
	id: number
	createCategoryRequest: CreateCategoryRequest
}
export type DeleteCategoryApiResponse = unknown
export type DeleteCategoryApiArg = number
export type UpdateSubcategoryApiResponse =
	/** status 200 OK */ SubcategoryResponse
export type UpdateSubcategoryApiArg = {
	id: number
	createSubcategoryRequest: CreateSubcategoryRequest
}
export type DeleteSubcategoryApiResponse = unknown
export type DeleteSubcategoryApiArg = number
export type GetAllCategoriesApiResponse = /** status 200 OK */ Category[]
export type GetAllCategoriesApiArg = void
export type CreateCategoryApiResponse = /** status 200 OK */ Category
export type CreateCategoryApiArg = CreateCategoryRequest
export type CreateSubcategoryApiResponse =
	/** status 200 OK */ SubcategoryResponse
export type CreateSubcategoryApiArg = CreateSubcategoryRequest
export type GetSubcategoriesByCategory1ApiResponse =
	/** status 200 OK */ SubcategoryResponse[]
export type GetSubcategoriesByCategory1ApiArg = number
export type Category = {
	id?: number
	nameRu?: string
	nameKy?: string
	nameEn?: string
	icon?: string
	isActive?: boolean
	createdAt?: string
}
export type CreateCategoryRequest = {
	nameRu?: string
	nameKy?: string
	nameEn?: string
	icon?: string
	isActive?: boolean
}
export type SubcategoryResponse = {
	id?: number
	nameRu?: string
	nameKy?: string
	nameEn?: string
	isActive?: boolean
}
export type CreateSubcategoryRequest = {
	categoryId?: number
	nameRu?: string
	nameKy?: string
	nameEn?: string
	isActive?: boolean
}

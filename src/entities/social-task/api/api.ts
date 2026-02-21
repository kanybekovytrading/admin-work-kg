import { workBaseApi as api } from '../../../shared/api/workBaseApi'

const injectedRtkApi = api
	.enhanceEndpoints({
		addTagTypes: ['SocialTasks'],
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getTaskById: build.query<GetTaskByIdApiResponse, GetTaskByIdApiArg>(
				{
					query: (queryArg) => ({
						url: `/api/admin/social-tasks/${queryArg}`,
					}),
					providesTags: ['SocialTasks'],
				},
			),
			updateTask: build.mutation<UpdateTaskApiResponse, UpdateTaskApiArg>(
				{
					query: (queryArg) => ({
						url: `/api/admin/social-tasks/${queryArg.id}`,
						method: 'PUT',
						body: queryArg.createSocialTaskRequest,
					}),
					invalidatesTags: ['SocialTasks'],
				},
			),
			deleteTask: build.mutation<DeleteTaskApiResponse, DeleteTaskApiArg>(
				{
					query: (queryArg) => ({
						url: `/api/admin/social-tasks/${queryArg}`,
						method: 'DELETE',
					}),
					invalidatesTags: ['SocialTasks'],
				},
			),
			getAllTasks: build.query<GetAllTasksApiResponse, GetAllTasksApiArg>(
				{
					query: () => ({ url: `/api/admin/social-tasks` }),
					providesTags: ['SocialTasks'],
				},
			),
			createTask: build.mutation<CreateTaskApiResponse, CreateTaskApiArg>(
				{
					query: (queryArg) => ({
						url: `/api/admin/social-tasks`,
						method: 'POST',
						body: queryArg,
					}),
					invalidatesTags: ['SocialTasks'],
				},
			),
			countCompletions: build.query<
				CountCompletionsApiResponse,
				CountCompletionsApiArg
			>({
				query: (queryArg) => ({
					url: `/api/admin/social-tasks/${queryArg}/completions`,
				}),
				providesTags: ['SocialTasks'],
			}),
		}),
		overrideExisting: false,
	})

export { injectedRtkApi as socialApi }

export const {
	useCountCompletionsQuery,
	useCreateTaskMutation,
	useDeleteTaskMutation,
	useGetAllTasksQuery,
	useGetTaskByIdQuery,
	useUpdateTaskMutation,
} = injectedRtkApi

export type GetTaskByIdApiResponse = /** status 200 OK */ SocialTask
export type GetTaskByIdApiArg = number
export type UpdateTaskApiResponse = /** status 200 OK */ SocialTask
export type UpdateTaskApiArg = {
	id: number
	createSocialTaskRequest: CreateSocialTaskRequest
}
export type DeleteTaskApiResponse = unknown
export type DeleteTaskApiArg = number
export type GetAllTasksApiResponse = /** status 200 OK */ SocialTask[]
export type GetAllTasksApiArg = void
export type CreateTaskApiResponse = /** status 200 OK */ SocialTask
export type CreateTaskApiArg = CreateSocialTaskRequest
export type CountCompletionsApiResponse = /** status 200 OK */ number
export type CountCompletionsApiArg = number
export type SocialTask = {
	id?: number
	type?: 'TELEGRAM' | 'INSTAGRAM' | 'FACEBOOK' | 'TIKTOK' | 'YOUTUBE'
	title?: string
	link?: string
	channelId?: string
	reward?: number
	isActive?: boolean
	createdAt?: string
}
export type CreateSocialTaskRequest = {
	type?: 'TELEGRAM' | 'INSTAGRAM' | 'FACEBOOK' | 'TIKTOK' | 'YOUTUBE'
	title?: string
	link?: string
	channelId?: string
	reward?: number
	isActive?: boolean
}

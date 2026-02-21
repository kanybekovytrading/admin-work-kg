import { workBaseApi as api } from '../../../shared/api/workBaseApi'
const injectedRtkApi = api.injectEndpoints({
	endpoints: (build) => ({
		updateVacancyStatus: build.mutation<
			UpdateVacancyStatusApiResponse,
			UpdateVacancyStatusApiArg
		>({
			query: (queryArg) => ({
				url: `/api/bot/vacancies/${queryArg.vacancyId}/status`,
				method: 'PUT',
				params: {
					telegramId: queryArg.telegramId,
					isActive: queryArg.isActive,
				},
			}),
		}),
		updateLanguage: build.mutation<
			UpdateLanguageApiResponse,
			UpdateLanguageApiArg
		>({
			query: (queryArg) => ({
				url: `/api/bot/users/${queryArg.telegramId}/language`,
				method: 'PUT',
				params: {
					language: queryArg.language,
				},
			}),
		}),
		updateResumeStatus: build.mutation<
			UpdateResumeStatusApiResponse,
			UpdateResumeStatusApiArg
		>({
			query: (queryArg) => ({
				url: `/api/bot/resumes/${queryArg.resumeId}/status`,
				method: 'PUT',
				params: {
					telegramId: queryArg.telegramId,
					isActive: queryArg.isActive,
				},
			}),
		}),
		createVacancy: build.mutation<
			CreateVacancyApiResponse,
			CreateVacancyApiArg
		>({
			query: (queryArg) => ({
				url: `/api/bot/vacancies`,
				method: 'POST',
				body: queryArg.createVacancyRequest,
				params: {
					telegramId: queryArg.telegramId,
				},
			}),
		}),
		registerUser: build.mutation<
			RegisterUserApiResponse,
			RegisterUserApiArg
		>({
			query: (queryArg) => ({
				url: `/api/bot/users/register`,
				method: 'POST',
				body: queryArg,
			}),
		}),
		completeTask: build.mutation<
			CompleteTaskApiResponse,
			CompleteTaskApiArg
		>({
			query: (queryArg) => ({
				url: `/api/bot/tasks/complete`,
				method: 'POST',
				body: queryArg.completeTaskRequest,
				params: {
					telegramId: queryArg.telegramId,
				},
			}),
		}),
		searchVacancies: build.mutation<
			SearchVacanciesApiResponse,
			SearchVacanciesApiArg
		>({
			query: (queryArg) => ({
				url: `/api/bot/search/vacancies`,
				method: 'POST',
				body: queryArg.searchRequest,
				params: {
					telegramId: queryArg.telegramId,
				},
			}),
		}),
		searchResumes: build.mutation<
			SearchResumesApiResponse,
			SearchResumesApiArg
		>({
			query: (queryArg) => ({
				url: `/api/bot/search/resumes`,
				method: 'POST',
				body: queryArg.searchRequest,
				params: {
					telegramId: queryArg.telegramId,
				},
			}),
		}),
		createResume: build.mutation<
			CreateResumeApiResponse,
			CreateResumeApiArg
		>({
			query: (queryArg) => ({
				url: `/api/bot/resumes`,
				method: 'POST',
				body: queryArg.createResumeRequest,
				params: {
					telegramId: queryArg.telegramId,
				},
			}),
		}),
		processReferral: build.mutation<
			ProcessReferralApiResponse,
			ProcessReferralApiArg
		>({
			query: (queryArg) => ({
				url: `/api/bot/referrals/process`,
				method: 'POST',
				params: {
					referrerId: queryArg.referrerId,
					newUserId: queryArg.newUserId,
				},
			}),
		}),
		handleWebhook: build.mutation<
			HandleWebhookApiResponse,
			HandleWebhookApiArg
		>({
			query: (queryArg) => ({
				url: `/api/bot/payments/webhook`,
				method: 'POST',
				body: queryArg,
			}),
		}),
		handleWebhook1: build.mutation<
			HandleWebhook1ApiResponse,
			HandleWebhook1ApiArg
		>({
			query: (queryArg) => ({
				url: `/api/bot/payments/finik`,
				method: 'POST',
				body: queryArg,
			}),
		}),
		createPayment: build.mutation<
			CreatePaymentApiResponse,
			CreatePaymentApiArg
		>({
			query: (queryArg) => ({
				url: `/api/bot/payments/create/${queryArg.telegramId}`,
				method: 'POST',
				body: queryArg.createPaymentRequest,
			}),
		}),
		saveMessage: build.mutation<SaveMessageApiResponse, SaveMessageApiArg>({
			query: (queryArg) => ({
				url: `/api/bot/messages`,
				method: 'POST',
				body: queryArg,
			}),
		}),
		createFeedback: build.mutation<
			CreateFeedbackApiResponse,
			CreateFeedbackApiArg
		>({
			query: (queryArg) => ({
				url: `/api/bot/feedback`,
				method: 'POST',
				body: queryArg.feedbackRequest,
				params: {
					telegramId: queryArg.telegramId,
				},
			}),
		}),
		getUserChatHistory: build.query<
			GetUserChatHistoryApiResponse,
			GetUserChatHistoryApiArg
		>({
			query: (queryArg) => ({
				url: `/api/bot/${queryArg.userId}/chat`,
				params: {
					page: queryArg.page,
					size: queryArg.size,
				},
			}),
		}),
		getVacancyById1: build.query<
			GetVacancyById1ApiResponse,
			GetVacancyById1ApiArg
		>({
			query: (queryArg) => ({ url: `/api/bot/vacancies/${queryArg}` }),
		}),
		deleteVacancy1: build.mutation<
			DeleteVacancy1ApiResponse,
			DeleteVacancy1ApiArg
		>({
			query: (queryArg) => ({
				url: `/api/bot/vacancies/${queryArg.vacancyId}`,
				method: 'DELETE',
				params: {
					telegramId: queryArg.telegramId,
				},
			}),
		}),
		getUserVacancies: build.query<
			GetUserVacanciesApiResponse,
			GetUserVacanciesApiArg
		>({
			query: (queryArg) => ({
				url: `/api/bot/vacancies/user/${queryArg}`,
			}),
		}),
		getUserVacancyStats: build.query<
			GetUserVacancyStatsApiResponse,
			GetUserVacancyStatsApiArg
		>({
			query: (queryArg) => ({
				url: `/api/bot/vacancies/user/${queryArg}/stats`,
			}),
		}),
		getUserByTelegramId: build.query<
			GetUserByTelegramIdApiResponse,
			GetUserByTelegramIdApiArg
		>({
			query: (queryArg) => ({ url: `/api/bot/users/${queryArg}` }),
		}),
		getUserProfile: build.query<
			GetUserProfileApiResponse,
			GetUserProfileApiArg
		>({
			query: (queryArg) => ({
				url: `/api/bot/users/${queryArg}/profile`,
			}),
		}),
		getAvailableTasks: build.query<
			GetAvailableTasksApiResponse,
			GetAvailableTasksApiArg
		>({
			query: (queryArg) => ({ url: `/api/bot/tasks/${queryArg}` }),
		}),
		isTaskCompleted: build.query<
			IsTaskCompletedApiResponse,
			IsTaskCompletedApiArg
		>({
			query: (queryArg) => ({
				url: `/api/bot/tasks/${queryArg.telegramId}/check/${queryArg.taskId}`,
			}),
		}),
		getSubscriptionStatus: build.query<
			GetSubscriptionStatusApiResponse,
			GetSubscriptionStatusApiArg
		>({
			query: (queryArg) => ({
				url: `/api/bot/subscriptions/${queryArg}/status`,
			}),
		}),
		hasActiveSubscription: build.query<
			HasActiveSubscriptionApiResponse,
			HasActiveSubscriptionApiArg
		>({
			query: (queryArg) => ({
				url: `/api/bot/subscriptions/${queryArg}/check`,
			}),
		}),
		getResumeById: build.query<
			GetResumeByIdApiResponse,
			GetResumeByIdApiArg
		>({
			query: (queryArg) => ({ url: `/api/bot/resumes/${queryArg}` }),
		}),
		deleteResume: build.mutation<
			DeleteResumeApiResponse,
			DeleteResumeApiArg
		>({
			query: (queryArg) => ({
				url: `/api/bot/resumes/${queryArg.resumeId}`,
				method: 'DELETE',
				params: {
					telegramId: queryArg.telegramId,
				},
			}),
		}),
		getUserResumes: build.query<
			GetUserResumesApiResponse,
			GetUserResumesApiArg
		>({
			query: (queryArg) => ({ url: `/api/bot/resumes/user/${queryArg}` }),
		}),
		getUserResumeStats: build.query<
			GetUserResumeStatsApiResponse,
			GetUserResumeStatsApiArg
		>({
			query: (queryArg) => ({
				url: `/api/bot/resumes/user/${queryArg}/stats`,
			}),
		}),
		getReferralInfo: build.query<
			GetReferralInfoApiResponse,
			GetReferralInfoApiArg
		>({
			query: (queryArg) => ({
				url: `/api/bot/referrals/${queryArg}/info`,
			}),
		}),
		hasEnoughPoints: build.query<
			HasEnoughPointsApiResponse,
			HasEnoughPointsApiArg
		>({
			query: (queryArg) => ({
				url: `/api/bot/points/${queryArg.telegramId}/check`,
				params: {
					amount: queryArg.amount,
				},
			}),
		}),
		getBalance: build.query<GetBalanceApiResponse, GetBalanceApiArg>({
			query: (queryArg) => ({
				url: `/api/bot/points/${queryArg}/balance`,
			}),
		}),
		getPayment: build.query<GetPaymentApiResponse, GetPaymentApiArg>({
			query: (queryArg) => ({ url: `/api/bot/payments/${queryArg}` }),
		}),
		checkAccess: build.query<CheckAccessApiResponse, CheckAccessApiArg>({
			query: (queryArg) => ({ url: `/api/bot/access/${queryArg}/check` }),
		}),
	}),
	overrideExisting: false,
})

export { injectedRtkApi as botApi }

export const {
	useCheckAccessQuery,
	useCompleteTaskMutation,
	useCreateFeedbackMutation,
	useCreatePaymentMutation,
	useCreateResumeMutation,
	useCreateVacancyMutation,
	useDeleteResumeMutation,
	useDeleteVacancy1Mutation,
	useGetAvailableTasksQuery,
	useGetBalanceQuery,
	useGetPaymentQuery,
	useGetReferralInfoQuery,
	useGetResumeByIdQuery,
	useGetSubscriptionStatusQuery,
	useGetUserByTelegramIdQuery,
	useGetUserChatHistoryQuery,
	useGetUserProfileQuery,
	useGetUserResumeStatsQuery,
	useGetUserResumesQuery,
	useGetUserVacanciesQuery,
	useGetUserVacancyStatsQuery,
	useGetVacancyById1Query,
	useHandleWebhook1Mutation,
	useHandleWebhookMutation,
	useHasActiveSubscriptionQuery,
	useHasEnoughPointsQuery,
	useIsTaskCompletedQuery,
	useSaveMessageMutation,
} = injectedRtkApi

export type UpdateVacancyStatusApiResponse = /** status 200 OK */ Vacancy
export type UpdateVacancyStatusApiArg = {
	vacancyId: number
	telegramId: number
	isActive: boolean
}
export type UpdateLanguageApiResponse = unknown
export type UpdateLanguageApiArg = {
	telegramId: number
	language: string
}
export type UpdateResumeStatusApiResponse = /** status 200 OK */ Resume
export type UpdateResumeStatusApiArg = {
	resumeId: number
	telegramId: number
	isActive: boolean
}
export type CreateVacancyApiResponse = /** status 200 OK */ Vacancy
export type CreateVacancyApiArg = {
	telegramId: number
	createVacancyRequest: CreateVacancyRequest
}
export type RegisterUserApiResponse = /** status 200 OK */ User
export type RegisterUserApiArg = UserRegistrationRequest
export type CompleteTaskApiResponse = /** status 200 OK */ UserTask
export type CompleteTaskApiArg = {
	telegramId: number
	completeTaskRequest: CompleteTaskRequest
}
export type SearchVacanciesApiResponse =
	/** status 200 OK */ SearchResultResponseVacancyResponse
export type SearchVacanciesApiArg = {
	telegramId: number
	searchRequest: SearchRequest
}
export type SearchResumesApiResponse =
	/** status 200 OK */ SearchResultResponseResumeResponse
export type SearchResumesApiArg = {
	telegramId: number
	searchRequest: SearchRequest
}
export type CreateResumeApiResponse = /** status 200 OK */ Resume
export type CreateResumeApiArg = {
	telegramId: number
	createResumeRequest: CreateResumeRequest
}
export type ProcessReferralApiResponse = unknown
export type ProcessReferralApiArg = {
	referrerId: number
	newUserId: number
}
export type HandleWebhookApiResponse = unknown
export type HandleWebhookApiArg = {
	[key: string]: any
}
export type HandleWebhook1ApiResponse = unknown
export type HandleWebhook1ApiArg = WebhookData
export type CreatePaymentApiResponse =
	/** status 200 OK */ CreatePaymentResponse
export type CreatePaymentApiArg = {
	telegramId: number
	createPaymentRequest: CreatePaymentRequest
}
export type SaveMessageApiResponse = unknown
export type SaveMessageApiArg = SaveMessageRequest
export type CreateFeedbackApiResponse = /** status 200 OK */ Feedback
export type CreateFeedbackApiArg = {
	telegramId: number
	feedbackRequest: FeedbackRequest
}
export type GetUserChatHistoryApiResponse =
	/** status 200 OK */ ChatHistoryResponse
export type GetUserChatHistoryApiArg = {
	userId: number
	page?: number
	size?: number
}
export type GetVacancyById1ApiResponse = /** status 200 OK */ VacancyResponse
export type GetVacancyById1ApiArg = number
export type DeleteVacancy1ApiResponse = unknown
export type DeleteVacancy1ApiArg = {
	vacancyId: number
	telegramId: number
}
export type GetUserVacanciesApiResponse = /** status 200 OK */ VacancyResponse[]
export type GetUserVacanciesApiArg = number
export type GetUserVacancyStatsApiResponse =
	/** status 200 OK */ VacancyStatsResponse
export type GetUserVacancyStatsApiArg = number
export type GetUserByTelegramIdApiResponse = /** status 200 OK */ User
export type GetUserByTelegramIdApiArg = number
export type GetUserProfileApiResponse = /** status 200 OK */ UserProfileResponse
export type GetUserProfileApiArg = number
export type GetAvailableTasksApiResponse = /** status 200 OK */ TaskListResponse
export type GetAvailableTasksApiArg = number
export type IsTaskCompletedApiResponse = /** status 200 OK */ boolean
export type IsTaskCompletedApiArg = {
	telegramId: number
	taskId: number
}
export type GetSubscriptionStatusApiResponse =
	/** status 200 OK */ SubscriptionStatusResponse
export type GetSubscriptionStatusApiArg = number
export type HasActiveSubscriptionApiResponse = /** status 200 OK */ boolean
export type HasActiveSubscriptionApiArg = number
export type GetResumeByIdApiResponse = /** status 200 OK */ ResumeResponseDto
export type GetResumeByIdApiArg = number
export type DeleteResumeApiResponse = unknown
export type DeleteResumeApiArg = {
	resumeId: number
	telegramId: number
}
export type GetUserResumesApiResponse = /** status 200 OK */ ResumeResponse[]
export type GetUserResumesApiArg = number
export type GetUserResumeStatsApiResponse =
	/** status 200 OK */ ResumeStatsResponse
export type GetUserResumeStatsApiArg = number
export type GetReferralInfoApiResponse =
	/** status 200 OK */ ReferralInfoResponse
export type GetReferralInfoApiArg = number
export type HasEnoughPointsApiResponse = /** status 200 OK */ boolean
export type HasEnoughPointsApiArg = {
	telegramId: number
	amount: number
}
export type GetBalanceApiResponse = /** status 200 OK */ BalanceResponse
export type GetBalanceApiArg = number
export type GetPaymentApiResponse = /** status 200 OK */ PaymentResponse
export type GetPaymentApiArg = string
export type CheckAccessApiResponse = /** status 200 OK */ AccessCheckResponse
export type CheckAccessApiArg = number
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
export type CreateVacancyRequest = {
	title?: string
	description?: string
	salary?: string
	companyName?: string
	phone?: string
	cityId?: number
	categoryId?: number
	subcategoryId?: number
}
export type UserRegistrationRequest = {
	telegramId?: number
	username?: string
	firstName?: string
	lastName?: string
	phone?: string
	language?: 'RU' | 'KY' | 'EN'
	referralCode?: string
}
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
export type UserTask = {
	id?: number
	user?: User
	task?: SocialTask
	rewardGiven?: number
	completedAt?: string
}
export type CompleteTaskRequest = {
	taskId?: number
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
export type SearchResultResponseVacancyResponse = {
	results?: VacancyResponse[]
	total?: number
}
export type SearchRequest = {
	cityId?: number
	categoryId?: number
	subcategoryId?: number
}
export type ResumeResponse = {
	id?: number
	name?: string
	age?: number
	gender?: 'MALE' | 'FEMALE'
	cityName?: string
	categoryName?: string
	subcategoryName?: string
	experience?: number
	description?: string
	telegramUsername?: string
	isActive?: boolean
	createdAt?: string
}
export type SearchResultResponseResumeResponse = {
	results?: ResumeResponse[]
	total?: number
}
export type CreateResumeRequest = {
	name?: string
	age?: number
	gender?: 'MALE' | 'FEMALE'
	cityId?: number
	categoryId?: number
	subcategoryId?: number
	experience?: number
	description?: string
	isActive?: boolean
}
export type WebhookData = {
	id?: string
	status?: string
	amount?: number
	net?: number
	fields?: {
		[key: string]: any
	}
	transactionId?: string
	accountId?: string
	requestDate?: number
	transactionDate?: number
	transactionType?: string
	receiptNumber?: string
}
export type CreatePaymentResponse = {
	paymentId?: string
	paymentUrl?: string
	status?: string
}
export type CreatePaymentRequest = {
	planType?: 'ONE_WEEK' | 'ONE_MONTH' | 'THREE_MONTHS'
	redirectUrl?: string
}
export type SaveMessageRequest = {
	telegramUserId?: number
	senderType?: string
	messageText?: string
	telegramMessageId?: number
	messageType?: string
}
export type Admin = {
	id?: number
	email?: string
	passwordHash?: string
	name?: string
	role?: 'ADMIN'
	isActive?: boolean
	createdAt?: string
	lastLogin?: string
}
export type Feedback = {
	id?: number
	message?: string
	status?: 'PENDING' | 'ANSWERED'
	adminResponse?: string
	answeredBy?: Admin
	createdAt?: string
	answeredAt?: string
}
export type FeedbackRequest = {
	message?: string
}
export type ChatMessageDto = {
	id?: number
	senderType?: string
	messageText?: string
	createdAt?: string
}
export type ChatHistoryResponse = {
	messages?: ChatMessageDto[]
	currentPage?: number
	totalPages?: number
	totalMessages?: number
}
export type VacancyStatsResponse = {
	totalCount?: number
	activeCount?: number
	inactiveCount?: number
}
export type UserProfileResponse = {
	id?: number
	telegramId?: number
	username?: string
	firstName?: string
	phone?: string
	balance?: number
	referralCode?: string
}
export type TaskListResponse = {
	availableTasks?: SocialTask[]
	completedTasks?: UserTask[]
}
export type SubscriptionStatusResponse = {
	hasActiveSubscription?: boolean
	planType?: 'ONE_WEEK' | 'ONE_MONTH' | 'THREE_MONTHS'
	startDate?: string
	endDate?: string
	daysLeft?: number
}
export type ResumeResponseDto = {
	id?: number
	name?: string
	age?: number
	gender?: string
	city?: string
	category?: string
	subcategory?: string
	experience?: number
	description?: string
	phone?: string
	isActive?: boolean
	createdAt?: string
	updatedAt?: string
}
export type ResumeStatsResponse = {
	totalCount?: number
	activeCount?: number
	inactiveCount?: number
}
export type ReferralInfoResponse = {
	referralCode?: string
	referralLink?: string
	referralsCount?: number
	rewardPerReferral?: number
}
export type PointsTransaction = {
	id?: number
	amount?: number
	type?:
		| 'REFERRAL'
		| 'TASK'
		| 'SEARCH_ACCESS'
		| 'ADMIN_GRANT'
		| 'REGISTRATION'
		| 'SUBSCRIPTION'
	description?: string
	relatedId?: number
	createdAt?: string
}
export type BalanceResponse = {
	balance?: number
	transactions?: PointsTransaction[]
}
export type PaymentResponse = {
	id?: number
	paymentId?: string
	paymentUrl?: string
	amount?: number
	status?: 'PENDING' | 'SUCCESS' | 'FAILED' | 'EXPIRED'
	transactionId?: string
	createdAt?: string
	paidAt?: string
}
export type AccessCheckResponse = {
	hasActiveSubscription?: boolean
	canSearchJobs?: boolean
	canSearchEmployees?: boolean
	pointForSearchAccess?: number
}

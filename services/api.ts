import {
	Application,
	Vacancy,
	User,
	AppStatus,
	UserRole,
	Feedback,
	PointsEntry,
	SocialLink,
	Payout,
} from '../types'

const mockApplications: Application[] = [
	{
		id: 6,
		telegram: '@bekacoder',
		name: 'random',
		phone: '+996700212070',
		city: 'Бишкек',
		specialty: 'Хостес',
		experience: 18,
		updated: '20.01.2026',
	},
	{
		id: 3,
		telegram: '@Xmas_67',
		name: 'jj',
		phone: '+996706833483',
		city: 'Бишкек',
		specialty: 'Монолитчик',
		experience: 15,
		updated: '19.01.2026',
	},
]

const mockVacancies: Vacancy[] = [
	{
		id: 1,
		title: 'Маркетолог',
		category: 'Маркетинг',
		city: 'Бишкек',
		salary: '50000',
		source: 'Telegram',
		status: AppStatus.ACTIVE,
	},
]

const mockUsers: User[] = [
	{
		id: 215,
		telegramId: '5226787208',
		name: 'Dosbol Algaziev',
		username: '@algazziev',
		phone: '+996709362360',
		city: 'Бишкек',
		role: UserRole.USER,
		registrationDate: '19.01.2026',
	},
	{
		id: 207,
		telegramId: '1821652777',
		name: 'Даниел',
		username: '@DoniSydyk',
		phone: '+996555829363',
		city: 'Ош',
		role: UserRole.ADMIN,
		registrationDate: '18.01.2026',
	},
]

const mockPoints: PointsEntry[] = [
	{
		id: 1,
		telegramId: '5226787208',
		type: 'Начисление',
		amount: 500,
		reason: 'Бонус за регистрацию',
		date: '20.01.2026',
	},
	{
		id: 2,
		telegramId: '1821652777',
		type: 'Списание',
		amount: 100,
		reason: 'Продление доступа',
		date: '19.01.2026',
	},
]

const mockFeedback: Feedback[] = [
	{
		id: 1,
		user: '@algazziev',
		message: 'Не могу войти в бот',
		status: 'Новое',
		date: '20.01.2026',
	},
	{
		id: 2,
		user: '@DoniSydyk',
		message: 'Спасибо за сервис!',
		status: 'Решено',
		date: '18.01.2026',
	},
]

const mockSocials: SocialLink[] = [
	{
		id: 1,
		platform: 'Instagram',
		url: 'https://instagram.com/workkg',
		isActive: true,
	},
	{
		id: 2,
		platform: 'TikTok',
		url: 'https://tiktok.com/@workkg',
		isActive: true,
	},
]

const mockPayouts: Payout[] = [
	{
		id: 1,
		user: 'Dosbol',
		telegramId: '5226787208',
		amount: 1500,
		points: 1500,
		method: 'M-Bank',
		status: 'Выплачено',
		date: '15.01.2026',
	},
]

export const api = {
	getApplications: async () => mockApplications,
	getVacancies: async () => mockVacancies,
	getUsers: async () => mockUsers,
	getSubscriptions: async () => [],
	getPoints: async () => mockPoints,
	getFeedback: async () => mockFeedback,
	getSocials: async () => mockSocials,
	getPayouts: async () => mockPayouts,
	getStats: async () => ({
		applicationsCount: 4,
		vacanciesCount: 1,
		usersCount: 12,
		botStatus: 'Онлайн',
	}),
}

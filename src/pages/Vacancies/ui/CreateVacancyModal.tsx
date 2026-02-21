import { create, useModal } from '@ebay/nice-modal-react'
import { useState } from 'react'
import { Box, Button, TextField, CircularProgress } from '@mui/material'
import { useTranslation } from 'react-i18next'

// Импорты API

// UI Компоненты
import Select from '../../../shared/ui/select/Select' // Ваш Select
import StatusDialog from '../../../shared/ui/status-dialog/StatusDialog'
import { toastUtils } from '../../../shared/lib/toster' // Ваш тостер
import { getErrorMessage } from '../../../shared/lib/error.helper'
import {
	useGetAllCategoriesQuery,
	useGetSubcategoriesByCategory1Query,
} from '#entities/categories/api/api'
import { useCreateVacancy1Mutation } from '#entities/vacancies/api/api'
import { Category } from '#entities/dashboard/api/api'
import { SubcategoryResponse } from '#entities/categories/api/generated'
import { useGetAllCitiesQuery } from '#entities/cities/api/api'

// Тип для формы
type CreateVacancyForm = {
	title: string
	description: string
	salary: string
	companyName: string
	phone: string
	cityId: number | null
	categoryId: number | null
	subcategoryId: number | null
}

const CreateVacancyModal = create(() => {
	const modal = useModal()
	const { t } = useTranslation(['common', 'vacancies'])

	// --- Состояние формы ---
	const [form, setForm] = useState<CreateVacancyForm>({
		title: '',
		description: '',
		salary: '',
		companyName: '',
		phone: '',
		cityId: null,
		categoryId: null,
		subcategoryId: null,
	})

	// ID админа (хардкод или из контекста авторизации)
	const ADMIN_USER_ID = 1

	// --- API Хуки ---

	// 1. Создание вакансии
	const [createVacancy, { reset, status }] = useCreateVacancy1Mutation()

	// 2. Справочники
	const { data: cities = [] } = useGetAllCitiesQuery() // Нужно добавить этот эндпоинт в API если нет
	const { data: categories = [], isLoading: isCatsLoading } =
		useGetAllCategoriesQuery()

	// 3. Подкатегории (зависят от выбранной категории)
	// skip: true, если categoryId не выбран
	const { data: subcategories = [], isFetching: isSubsFetching } =
		useGetSubcategoriesByCategory1Query(form.categoryId!, {
			skip: !form.categoryId,
		})

	// --- Хендлеры ---

	const handleInputChange = (field: keyof CreateVacancyForm, value: any) => {
		setForm((prev) => ({ ...prev, [field]: value }))
	}

	// Спец. хендлер для категории, чтобы сбрасывать подкатегорию
	const handleCategoryChange = (selectedCategory: Category) => {
		setForm((prev) => ({
			...prev,
			categoryId: selectedCategory.id || null,
			subcategoryId: null, // Сброс подкатегории при смене категории
		}))
	}

	const onConfirm = async () => {
		try {
			// Валидация (простая)
			if (!form.title || !form.categoryId || !form.cityId) {
				toastUtils.error('Заполните обязательные поля')
				return
			}

			await createVacancy({
				adminUserId: ADMIN_USER_ID,
				createVacancyAdminRequest: {
					title: form.title,
					description: form.description,
					salary: form.salary,
					companyName: form.companyName,
					phone: form.phone,
					cityId: form.cityId || undefined,
					categoryId: form.categoryId || undefined,
					subcategoryId: form.subcategoryId || undefined,
				},
			}).unwrap()

			toastUtils.success(t('vacancies:createSuccess', 'Вакансия создана'))
			modal.resolve() // Если кто-то ждет promise
			modal.hide()
		} catch (e) {
			toastUtils.error(getErrorMessage(e))
		}
	}

	const onCancel = () => {
		modal.hide()
	}

	// --- Опции для селектов ---
	// Преобразуем данные API в формат { label, value } для React-Select,
	// но ваш компонент Select принимает generic T, так что можно передавать объекты целиком,
	// если настроить getOptionLabel / getOptionValue.
	// Ниже пример, если Select ожидает объекты и мы используем getOptionLabel prop.

	const content = (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: 2,
				mt: 1,
				minWidth: 400,
			}}
		>
			{/* Название */}
			<TextField
				label='Название вакансии'
				fullWidth
				required
				size='small'
				value={form.title}
				onChange={(e) => handleInputChange('title', e.target.value)}
			/>

			{/* Город */}
			<Select<any> // Замените any на CityType
				label='Город'
				required
				options={cities}
				getOptionLabel={(opt) => opt.nameRu}
				getOptionValue={(opt) => opt.id}
				value={cities.find((c) => c.id === form.cityId)}
				onChange={(val) => handleInputChange('cityId', val?.id)}
				placeholder='Выберите город'
			/>

			{/* Категория */}
			<Select<Category>
				label='Категория'
				required
				isLoading={isCatsLoading}
				options={categories}
				getOptionLabel={(opt) => opt.nameRu || ''}
				getOptionValue={(opt) => opt.id?.toString() || ''}
				value={categories.find((c) => c.id === form.categoryId)}
				onChange={(val) => handleCategoryChange(val)}
				placeholder='Выберите категорию'
			/>

			{/* Подкатегория (Disabled если нет категории) */}
			<Select<SubcategoryResponse>
				label='Подкатегория'
				isDisabled={!form.categoryId} // Блокируем
				isLoading={isSubsFetching}
				options={subcategories}
				getOptionLabel={(opt) => opt.nameRu || ''}
				getOptionValue={(opt) => opt.id?.toString() || ''}
				value={subcategories.find((s) => s.id === form.subcategoryId)}
				onChange={(val) => handleInputChange('subcategoryId', val?.id)}
				placeholder={
					!form.categoryId
						? 'Сначала выберите категорию'
						: 'Выберите подкатегорию'
				}
			/>

			{/* Зарплата */}
			<TextField
				label='Зарплата'
				fullWidth
				size='small'
				value={form.salary}
				onChange={(e) => handleInputChange('salary', e.target.value)}
			/>

			{/* Описание */}
			<TextField
				label='Описание'
				fullWidth
				multiline
				rows={3}
				size='small'
				value={form.description}
				onChange={(e) =>
					handleInputChange('description', e.target.value)
				}
			/>

			{/* Компания и Телефон (в одну строку для компактности) */}
			<Box sx={{ display: 'flex', gap: 2 }}>
				<TextField
					label='Название компании'
					fullWidth
					size='small'
					value={form.companyName}
					onChange={(e) =>
						handleInputChange('companyName', e.target.value)
					}
				/>
				<TextField
					label='Телефон'
					fullWidth
					size='small'
					value={form.phone}
					onChange={(e) => handleInputChange('phone', e.target.value)}
				/>
			</Box>

			{/* Кнопки действий */}
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'flex-end',
					gap: 2,
					mt: 2,
				}}
			>
				<Button onClick={onCancel} color='inherit'>
					{t('common:cancel', 'Отмена')}
				</Button>
				<Button
					onClick={onConfirm}
					variant='contained'
					disabled={status === 'pending'}
					startIcon={
						status === 'pending' ? (
							<CircularProgress size={20} />
						) : null
					}
				>
					{t('common:create', 'Создать')}
				</Button>
			</Box>
		</Box>
	)

	return (
		<StatusDialog
			title='Создание вакансии' // Заголовок
			disableRestoreFocus
			open={modal.visible}
			onClose={onCancel}
			slotProps={{ transition: { onExited: reset } }}
			status={status} // RTK Query статус (pending/fulfilled/rejected)
			content={{
				uninitialized: {
					// Т.к. StatusDialog ожидает определенную структуру,
					// мы передаем наш контент как 'actions' или 'description',
					// либо адаптируем StatusDialog, чтобы он принимал children.
					// Если StatusDialog строгий, можно передать форму в description:
					description: content,
					actions: null, // Кнопки уже внутри формы
				},
				// Можно добавить кастомные экраны для success/error если StatusDialog их поддерживает
			}}
			// Если StatusDialog поддерживает maxWidth
			maxWidth='sm'
		/>
	)
})

export default CreateVacancyModal

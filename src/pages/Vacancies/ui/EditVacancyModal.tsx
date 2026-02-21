import { create, useModal } from '@ebay/nice-modal-react'
import { useState } from 'react'
import {
	Box,
	Button,
	TextField,
	CircularProgress,
	FormControlLabel,
	Switch,
} from '@mui/material'
import { useTranslation } from 'react-i18next'

// Импорты API
import { useUpdateVacancyMutation } from '#entities/vacancies/api/api' // Поправьте путь
import { VacancyResponse } from '#entities/vacancies/api/generated'
import {
	useGetAllCategoriesQuery,
	useGetSubcategoriesByCategory1Query,
	Category,
	SubcategoryResponse,
} from '#entities/categories/api/api' // Поправьте путь
import { useGetAllCitiesQuery } from '#entities/cities/api/api' // Предполагаемый путь

// UI Компоненты
import Select from '#shared/ui/select/Select'
import StatusDialog from '#shared/ui/status-dialog/StatusDialog'
import { toastUtils } from '#shared/lib/toster'
import { getErrorMessage } from '#shared/lib/error.helper'

type Props = {
	vacancy: VacancyResponse
}

// Тип формы редактирования
type EditVacancyForm = {
	title: string
	description: string
	salary: string
	companyName: string
	phone: string
	isActive: boolean
	cityId: number | null
	categoryId: number | null
	subcategoryId: number | null
}

const EditVacancyModal = create<Props>(({ vacancy }: any) => {
	const modal = useModal()
	const { t } = useTranslation(['common', 'vacancies'])

	// --- 1. Инициализация состояния из пропсов ---
	const [form, setForm] = useState<any>({
		title: vacancy.title || '',
		description: vacancy.description || '',
		salary: vacancy.salary ? String(vacancy.salary) : '',
		companyName: vacancy.companyName || '',
		phone: vacancy.phone || '',
		isActive: vacancy.isActive ?? true,
		cityId: vacancy.cityId || null,
		categoryId: vacancy.categoryId || null,
		subcategoryId: vacancy.subcategoryId || null,
	})

	// --- 2. API Хуки ---
	const [updateVacancy, { reset, status }] = useUpdateVacancyMutation()

	// Справочники
	const { data: cities = [] } = useGetAllCitiesQuery()
	const { data: categories = [], isLoading: isCatsLoading } =
		useGetAllCategoriesQuery()

	// Подгрузка подкатегорий
	// Если categoryId уже есть (при открытии), запрос выполнится сразу
	const { data: subcategories = [], isFetching: isSubsFetching } =
		useGetSubcategoriesByCategory1Query(form.categoryId!, {
			skip: !form.categoryId,
		})

	// --- 3. Хендлеры ---

	const handleInputChange = (field: keyof EditVacancyForm, value: any) => {
		setForm((prev: any) => ({ ...prev, [field]: value }))
	}

	const handleCategoryChange = (selectedCategory: Category) => {
		setForm((prev: any) => ({
			...prev,
			categoryId: selectedCategory.id || null,
			subcategoryId: null, // Сбрасываем подкатегорию при смене категории
		}))
	}

	const onConfirm = async () => {
		try {
			if (!form.title || !form.categoryId || !form.cityId) {
				toastUtils.error('Заполните обязательные поля')
				return
			}

			if (!vacancy.id) return

			// Формируем payload
			// Внимание: TypeScript может ругаться, если в типе UpdateVacancyRequest нет cityId/categoryId.
			// Вам нужно обновить типы на фронте (generated.ts) или бэке, если вы хотите менять эти поля.
			await updateVacancy({
				id: vacancy.id,
				updateVacancyRequest: {
					title: form.title,
					description: form.description,
					salary: form.salary,
					companyName: form.companyName,
					phone: form.phone,
					isActive: form.isActive,
					// @ts-ignore: Если типы еще не обновлены, игнорируем ошибку TS, чтобы отправить данные
					cityId: form.cityId,
					// @ts-ignore
					categoryId: form.categoryId,
					// @ts-ignore
					subcategoryId: form.subcategoryId,
				},
			}).unwrap()

			toastUtils.success(t('vacancies:editSuccess', 'Вакансия обновлена'))
			modal.resolve()
			modal.hide()
		} catch (e) {
			toastUtils.error(getErrorMessage(e))
		}
	}

	const onCancel = () => {
		modal.hide()
	}

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

			{/* Статус (Активна/Скрыта) - Только для редактирования */}
			<FormControlLabel
				control={
					<Switch
						checked={form.isActive}
						onChange={(e) =>
							handleInputChange('isActive', e.target.checked)
						}
						color='primary'
					/>
				}
				label={form.isActive ? 'Вакансия активна' : 'Вакансия скрыта'}
			/>

			{/* Город */}
			<Select<any>
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

			{/* Подкатегория */}
			<Select<SubcategoryResponse>
				label='Подкатегория'
				isDisabled={!form.categoryId}
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

			{/* Компания и Телефон */}
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
					{t('common:save', 'Сохранить')}
				</Button>
			</Box>
		</Box>
	)

	return (
		<StatusDialog
			title='Редактирование вакансии'
			disableRestoreFocus
			open={modal.visible}
			onClose={onCancel}
			slotProps={{ transition: { onExited: reset } }}
			status={status}
			content={{
				uninitialized: { description: content, actions: null },
			}}
			maxWidth='sm'
		/>
	)
})

export default EditVacancyModal

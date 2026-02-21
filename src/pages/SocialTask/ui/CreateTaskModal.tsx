import { create, useModal } from '@ebay/nice-modal-react'
import { useState } from 'react'
import {
	Box,
	Button,
	TextField,
	CircularProgress,
	Typography,
} from '@mui/material'
import { useTranslation } from 'react-i18next'

// Импорты API и типов

// UI Компоненты
import Select from '../../../shared/ui/select/Select'
import StatusDialog from '../../../shared/ui/status-dialog/StatusDialog'
import { toastUtils } from '../../../shared/lib/toster'
import { getErrorMessage } from '../../../shared/lib/error.helper'
import {
	CreateSocialTaskRequest,
	useCreateTaskMutation,
} from '#entities/social-task/api/api'

const PLATFORM_OPTIONS = [
	{ label: 'Telegram', value: 'TELEGRAM' },
	{ label: 'Instagram', value: 'INSTAGRAM' },
	{ label: 'TikTok', value: 'TIKTOK' },
	{ label: 'YouTube', value: 'YOUTUBE' },
	{ label: 'Facebook', value: 'FACEBOOK' },
]

const CreateTaskModal = create(() => {
	const modal = useModal()
	const { t } = useTranslation(['common'])

	// --- Состояние формы ---
	const [form, setForm] = useState<CreateSocialTaskRequest>({
		type: 'TELEGRAM',
		title: '',
		link: '',
		channelId: '',
		reward: 50,
		isActive: true,
	})

	// --- API Хук ---
	const [createTask, { reset, status }] = useCreateTaskMutation()

	// --- Хендлеры ---
	const handleInputChange = (
		field: keyof CreateSocialTaskRequest,
		value: any,
	) => {
		setForm((prev) => ({ ...prev, [field]: value }))
	}

	const onConfirm = async () => {
		try {
			// Простая валидация
			if (!form.title || !form.link || !form.reward) {
				toastUtils.error('Заполните обязательные поля')
				return
			}

			await createTask(form).unwrap()

			toastUtils.success('Задание успешно создано')
			modal.resolve()
			modal.hide()
		} catch (e) {
			toastUtils.error(getErrorMessage(e))
		}
	}

	const content = (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: 2.5,
				mt: 1,
			}}
		>
			<Typography variant='body2' color='text.secondary'>
				Создайте новое задание для пользователей социальных сетей
			</Typography>

			{/* Выбор платформы */}
			<Select<any>
				label='Платформа'
				required
				options={PLATFORM_OPTIONS}
				getOptionLabel={(opt) => opt.label}
				getOptionValue={(opt) => opt.value}
				value={PLATFORM_OPTIONS.find((p) => p.value === form.type)}
				onChange={(val) => handleInputChange('type', val?.value)}
			/>

			{/* Заголовок задания */}
			<TextField
				label='Заголовок задания'
				placeholder='Например: Подписаться на канал'
				fullWidth
				required
				size='small'
				value={form.title}
				onChange={(e) => handleInputChange('title', e.target.value)}
			/>

			{/* Ссылка */}
			<TextField
				label='Ссылка на ресурс'
				placeholder='https://t.me/...'
				fullWidth
				required
				size='small'
				value={form.link}
				onChange={(e) => handleInputChange('link', e.target.value)}
			/>

			<Box sx={{ display: 'flex', gap: 2 }}>
				{/* Награда */}
				<TextField
					label='Награда (баллы)'
					fullWidth
					required
					type='number'
					size='small'
					value={form.reward}
					onChange={(e) =>
						handleInputChange('reward', Number(e.target.value))
					}
				/>
				{/* Channel ID (опционально) */}
				<TextField
					label='Channel ID (для ботов)'
					fullWidth
					size='small'
					value={form.channelId}
					onChange={(e) =>
						handleInputChange('channelId', e.target.value)
					}
				/>
			</Box>

			{/* Кнопки действий */}
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'flex-end',
					gap: 2,
					mt: 1,
				}}
			>
				<Button onClick={() => modal.hide()} color='inherit'>
					{t('common:cancel', 'Отмена')}
				</Button>
				<Button
					onClick={onConfirm}
					variant='contained'
					disabled={status === 'pending'}
					sx={{ bgcolor: '#0f172a' }}
					startIcon={
						status === 'pending' ? (
							<CircularProgress size={20} color='inherit' />
						) : null
					}
				>
					Создать
				</Button>
			</Box>
		</Box>
	)

	return (
		<StatusDialog
			title='✨ Новое задание'
			open={modal.visible}
			onClose={() => modal.hide()}
			slotProps={{ transition: { onExited: reset } }}
			status={status}
			content={{
				uninitialized: {
					description: content,
					actions: null,
				},
			}}
			maxWidth='sm'
		/>
	)
})

export default CreateTaskModal

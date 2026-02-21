import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import {
	DeleteOutline,
	Telegram,
	Verified,
	VerifiedOutlined,
	Man,
	Woman,
} from '@mui/icons-material'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
// Убедитесь, что путь к типам правильный

const columnHelper = createColumnHelper<any>()

// --- Вспомогательные функции ---

const formatDate = (dateString?: string) => {
	if (!dateString) return '-'
	return new Date(dateString).toLocaleDateString('ru-RU', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	})
}

const formatGender = (gender?: 'MALE' | 'FEMALE') => {
	if (gender === 'MALE')
		return {
			text: 'М',
			icon: <Man sx={{ color: '#2563eb' }} fontSize='small' />,
		}
	if (gender === 'FEMALE')
		return {
			text: 'Ж',
			icon: <Woman sx={{ color: '#e11d48' }} fontSize='small' />,
		}
	return { text: '-', icon: null }
}

// --- Типы ---

type ColumnsProps = {
	onDelete: (id: number) => void
	onContact: (row: any) => void
}

// --- Конфигурация колонок ---

export const getApplicationsColumns = ({
	onDelete,
	onContact,
}: ColumnsProps): ColumnDef<any, any>[] => {
	// <--- Важно: any во втором аргументе исправляет ошибку типов
	return [
		columnHelper.accessor('id', {
			header: 'ID',
			meta: { styles: { width: '50px' } },
		}),
		columnHelper.accessor('isActive', {
			header: 'Статус',
			cell: ({ getValue }) => (
				<Tooltip title={getValue() ? 'Активна' : 'Скрыта'}>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						{getValue() ? (
							<Verified sx={{ color: '#10b981' }} />
						) : (
							<VerifiedOutlined sx={{ color: '#94a3b8' }} />
						)}
					</Box>
				</Tooltip>
			),
			meta: { styles: { width: '60px', textAlign: 'center' } },
		}),
		columnHelper.accessor('name', {
			header: 'Имя',
			cell: ({ getValue }) => (
				<Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
					{getValue() || 'Без имени'}
				</Typography>
			),
		}),
		columnHelper.accessor('gender', {
			header: 'Пол',
			cell: ({ getValue }) => {
				const { text, icon } = formatGender(getValue())
				return (
					<Box
						sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
					>
						{icon}
						<Typography variant='body2'>{text}</Typography>
					</Box>
				)
			},
			meta: { styles: { width: '60px' } },
		}),
		columnHelper.accessor('age', {
			header: 'Возраст',
			cell: ({ getValue }) => (getValue() ? `${getValue()} лет` : '-'),
			meta: { styles: { width: '80px' } },
		}),
		columnHelper.accessor('city', {
			header: 'Город',
			cell: ({ row }) => row.original.city?.nameRu || '-',
		}),
		columnHelper.accessor('category', {
			header: 'Специальность',
			cell: ({ row }) => (
				<Box>
					<Typography variant='body2' sx={{ fontSize: '0.875rem' }}>
						{row.original.category?.nameRu || '-'}
					</Typography>
					{row.original.subcategory && (
						<Typography variant='caption' color='textSecondary'>
							{row.original.subcategory.nameRu}
						</Typography>
					)}
				</Box>
			),
		}),
		columnHelper.accessor('experience', {
			header: 'Опыт',
			cell: ({ getValue }) =>
				getValue() ? `${getValue()} лет` : 'Не указан',
		}),
		columnHelper.accessor('description', {
			header: 'О себе',
			cell: ({ getValue }) => (
				<Tooltip title={getValue() || ''}>
					<Typography
						variant='body2'
						sx={{
							maxWidth: '180px',
							whiteSpace: 'nowrap',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							color: '#555',
							cursor: 'help',
						}}
					>
						{getValue() || '-'}
					</Typography>
				</Tooltip>
			),
		}),
		columnHelper.accessor('createdAt', {
			header: 'Создано',
			cell: ({ getValue }) => formatDate(getValue()),
		}),
		columnHelper.accessor('updatedAt', {
			header: 'Обновлено',
			cell: ({ getValue }) => formatDate(getValue()),
		}),
		columnHelper.display({
			id: 'actions',
			header: 'Действия',
			cell: ({ row }) => (
				<Box sx={{ display: 'flex', gap: 1 }}>
					<Tooltip title='Связаться (в разработке)'>
						<IconButton
							size='small'
							onClick={(e) => {
								e.stopPropagation()
								onContact(row.original)
							}}
							sx={{ color: '#2563eb', bgcolor: '#eff6ff' }}
						>
							<Telegram fontSize='small' />
						</IconButton>
					</Tooltip>

					<Tooltip title='Удалить'>
						<IconButton
							size='small'
							onClick={(e) => {
								e.stopPropagation()
								if (row.original.id) onDelete(row.original.id)
							}}
							sx={{
								color: '#ef4444',
								'&:hover': { bgcolor: '#fef2f2' },
							}}
						>
							<DeleteOutline fontSize='small' />
						</IconButton>
					</Tooltip>
				</Box>
			),
			meta: { styles: { width: '100px' } },
		}),
	]
}

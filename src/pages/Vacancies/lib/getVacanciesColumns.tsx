import { Box, IconButton, Chip, Typography } from '@mui/material'
import { Edit, Delete } from '@mui/icons-material'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'

// Импортируем тип из вашего API (поправьте путь)
import { VacancyResponse } from '#entities/vacancies/api/generated'

const columnHelper = createColumnHelper<any>()

type ColumnsProps = {
	onEdit: (row: VacancyResponse) => void
	onDelete: (id: number) => void
}

export const getVacanciesColumns = ({
	onEdit,
	onDelete,
}: ColumnsProps): ColumnDef<any, any>[] => {
	return [
		columnHelper.accessor('id', {
			header: 'ID',
			meta: { styles: { width: '50px' } },
		}),
		columnHelper.accessor('title', {
			header: 'Название',
			cell: ({ getValue }) => (
				<Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
					{getValue() || 'Без названия'}
				</Typography>
			),
		}),
		columnHelper.accessor('categoryName', {
			header: 'Категория',
			cell: ({ getValue }) => getValue() || '-',
		}),
		columnHelper.accessor('cityName', {
			header: 'Город',
			cell: ({ getValue }) => getValue() || '-',
		}),
		columnHelper.accessor('salary', {
			header: 'Зарплата',
			cell: ({ getValue }) => {
				const val = getValue()
				return val ? `${val} сом` : 'Не указана'
			},
		}),
		// Так как поля source в API нет, делаем display колонку-заглушку
		columnHelper.display({
			id: 'source',
			header: 'Источник',
			cell: () => (
				<Box
					component='span'
					sx={{
						px: 1,
						py: 0.5,
						bgcolor: '#f1f5f9',
						borderRadius: 1,
						fontSize: 11,
						fontFamily: 'monospace',
					}}
				>
					admin
				</Box>
			),
		}),
		columnHelper.accessor('isActive', {
			header: 'Статус',
			cell: ({ getValue }) => {
				const isActive = getValue()
				return (
					<Chip
						label={isActive ? 'Активна' : 'Скрыта'}
						size='small'
						sx={{
							bgcolor: isActive ? '#0f172a' : '#e2e8f0',
							color: isActive ? '#fff' : '#64748b',
							fontWeight: 700,
							borderRadius: 1.5,
							height: 24,
						}}
					/>
				)
			},
		}),
		columnHelper.display({
			id: 'actions',
			header: 'Действия',
			cell: ({ row }) => (
				<Box sx={{ display: 'flex', gap: 1 }}>
					<IconButton
						size='small'
						onClick={(e) => {
							e.stopPropagation()
							onEdit(row.original)
						}}
						sx={{
							color: '#94a3b8',
							'&:hover': { color: '#2563eb' },
						}}
					>
						<Edit fontSize='small' />
					</IconButton>
					<IconButton
						size='small'
						onClick={(e) => {
							e.stopPropagation()
							if (row.original.id) onDelete(row.original.id)
						}}
						sx={{
							color: '#94a3b8',
							'&:hover': { color: '#ef4444' },
						}}
					>
						<Delete fontSize='small' />
					</IconButton>
				</Box>
			),
			meta: { styles: { width: '80px' } },
		}),
	]
}

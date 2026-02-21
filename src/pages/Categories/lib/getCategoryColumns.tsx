import { Box, IconButton, Chip, Typography } from '@mui/material'
import { Edit, Delete, ChevronRight } from '@mui/icons-material'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { Category } from '#entities/dashboard/api/api'
import { SubcategoryResponse } from '#entities/categories/api/api'

const catHelper = createColumnHelper<Category>()
const subHelper = createColumnHelper<SubcategoryResponse>()

export const getCategoryColumns = (
	onEdit: (cat: Category) => void,
	onDelete: (id: number) => void,
): ColumnDef<Category, any>[] => [
	catHelper.accessor('nameRu', {
		header: 'Название (RU)',
		cell: ({ getValue }) => (
			<Typography sx={{ fontWeight: 600 }}>{getValue()}</Typography>
		),
	}),
	catHelper.accessor('isActive', {
		header: 'Статус',
		cell: ({ getValue }) => (
			<Chip
				label={getValue() ? 'Активна' : 'Скрыта'}
				size='small'
				color={getValue() ? 'success' : 'default'}
			/>
		),
	}),
	catHelper.display({
		id: 'actions',
		header: '',
		cell: ({ row }) => (
			<Box sx={{ display: 'flex' }}>
				<IconButton size='small' onClick={() => onEdit(row.original)}>
					<Edit fontSize='small' />
				</IconButton>
				<IconButton
					size='small'
					color='error'
					onClick={() => onDelete(row.original.id!)}
				>
					<Delete fontSize='small' />
				</IconButton>
				<ChevronRight color='action' />
			</Box>
		),
	}),
]

export const getSubcategoryColumns = (
	onEdit: (sub: SubcategoryResponse) => void,
	onDelete: (id: number) => void,
): ColumnDef<SubcategoryResponse, any>[] => [
	subHelper.accessor('nameRu', { header: 'Подкатегория' }),
	subHelper.accessor('isActive', {
		header: 'Статус',
		cell: ({ getValue }) => (
			<Chip
				label={getValue() ? 'Активна' : 'Скрыта'}
				size='small'
				color={getValue() ? 'success' : 'default'}
			/>
		),
	}),
	subHelper.display({
		id: 'actions',
		cell: ({ row }) => (
			<Box sx={{ display: 'flex' }}>
				<IconButton size='small' onClick={() => onEdit(row.original)}>
					<Edit fontSize='small' />
				</IconButton>
				<IconButton
					size='small'
					color='error'
					onClick={() => onDelete(row.original.id!)}
				>
					<Delete fontSize='small' />
				</IconButton>
			</Box>
		),
	}),
]

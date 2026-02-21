import { PointsTransaction } from '#entities/points/api/api'
import { Chip, Typography } from '@mui/material'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'

const columnHelper = createColumnHelper<PointsTransaction>()

const typeLabels: Record<
	PointsTransaction['type'] & string,
	{
		label: string
		color: 'success' | 'error' | 'info' | 'warning' | 'default'
	}
> = {
	REFERRAL: { label: 'Реферал', color: 'success' },
	TASK: { label: 'Задание', color: 'success' },
	REGISTRATION: { label: 'Регистрация', color: 'info' },
	ADMIN_GRANT: { label: 'От админа', color: 'warning' },
	SEARCH_ACCESS: { label: 'Поиск', color: 'error' },
}

export const getPointsColumns = (): ColumnDef<PointsTransaction, any>[] => {
	return [
		columnHelper.accessor('id', {
			header: 'ID',
			meta: { styles: { width: '60px' } },
		}),
		columnHelper.accessor('type', {
			header: 'Тип',
			cell: ({ getValue }) => {
				const type = getValue()
				const config = typeLabels[type as keyof typeof typeLabels] || {
					label: type,
					color: 'default',
				}
				return (
					<Chip
						label={config.label}
						color={config.color}
						size='small'
						sx={{ fontWeight: 700, fontSize: 10 }}
					/>
				)
			},
		}),
		columnHelper.accessor('amount', {
			header: 'Количество',
			cell: ({ row, getValue }) => {
				const amount = getValue()
				const isNegative = row.original.type === 'SEARCH_ACCESS'
				return (
					<Typography
						sx={{
							fontWeight: 800,
							color: isNegative ? '#ef4444' : '#10b981',
						}}
					>
						{isNegative ? '-' : '+'}
						{Math.abs(amount || 0)}
					</Typography>
				)
			},
		}),
		columnHelper.accessor('description', {
			header: 'Описание',
			cell: ({ getValue }) => getValue() || '-',
		}),
		columnHelper.accessor('createdAt', {
			header: 'Дата',
			cell: ({ getValue }) =>
				getValue()
					? new Date(getValue() as string).toLocaleString()
					: '-',
		}),
	]
}

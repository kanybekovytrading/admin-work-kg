import { Box, IconButton, Chip, Typography, Tooltip } from '@mui/material'
import { Block, Person, Computer } from '@mui/icons-material'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { Subscription } from '#entities/subscriptions/api/api'

const columnHelper = createColumnHelper<Subscription>()

// Маппинг для типов планов
const planNames: Record<string, string> = {
	ONE_WEEK: '1 Неделя',
	ONE_MONTH: '1 Месяц',
	THREE_MONTHS: '3 Месяца',
}

type ColumnsProps = {
	onDeactivate: (id: number) => void
}

export const getSubscriptionsColumns = ({
	onDeactivate,
}: ColumnsProps): ColumnDef<Subscription, any>[] => {
	return [
		columnHelper.accessor('id', {
			header: 'ID',
			meta: { styles: { width: '60px' } },
		}),
		columnHelper.accessor('user', {
			header: 'Пользователь',
			cell: ({ getValue }) => {
				const user = getValue()
				return (
					<Box>
						<Typography
							sx={{ fontWeight: 600, fontSize: '0.875rem' }}
						>
							{user?.firstName} {user?.lastName}
						</Typography>
						<Typography variant='caption' color='primary'>
							@{user?.username || 'no_tg'}
						</Typography>
					</Box>
				)
			},
		}),
		columnHelper.accessor('planType', {
			header: 'Тариф',
			cell: ({ getValue }) => (
				<Chip
					label={planNames[getValue() as string] || getValue()}
					size='small'
					variant='outlined'
					sx={{ fontWeight: 800, fontSize: 10, height: 20 }}
				/>
			),
		}),
		columnHelper.accessor('startDate', {
			header: 'Начало',
			cell: ({ getValue }) =>
				getValue()
					? new Date(getValue() as string).toLocaleDateString()
					: '-',
		}),
		columnHelper.accessor('endDate', {
			header: 'Окончание',
			cell: ({ getValue }) =>
				getValue()
					? new Date(getValue() as string).toLocaleDateString()
					: '-',
		}),
		columnHelper.accessor('isActive', {
			header: 'Статус',
			cell: ({ getValue }) => {
				const active = getValue()
				return (
					<Chip
						label={active ? 'Активна' : 'Истекла'}
						size='small'
						sx={{
							bgcolor: active ? '#10b981' : '#94a3b8',
							color: '#fff',
							fontWeight: 700,
							borderRadius: 1.5,
						}}
					/>
				)
			},
		}),
		columnHelper.display({
			id: 'source',
			header: 'Источник',
			cell: ({ row }) => {
				const isAdmin = !!row.original.grantedByAdmin
				return (
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: 0.5,
							color: '#64748b',
							fontSize: '0.75rem',
						}}
					>
						{isAdmin ? (
							<Person sx={{ fontSize: 14 }} />
						) : (
							<Computer sx={{ fontSize: 14 }} />
						)}
						{isAdmin
							? `Админ (${row.original.grantedByAdmin?.name})`
							: 'Система'}
					</Box>
				)
			},
		}),
		columnHelper.display({
			id: 'actions',
			header: 'Действия',
			cell: ({ row }) =>
				row.original.isActive && (
					<Tooltip title='Деактивировать'>
						<IconButton
							size='small'
							color='error'
							onClick={() => onDeactivate(row.original.id!)}
						>
							<Block fontSize='small' />
						</IconButton>
					</Tooltip>
				),
			meta: { styles: { width: '50px' } },
		}),
	]
}

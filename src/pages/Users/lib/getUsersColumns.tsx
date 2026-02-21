import { Box, IconButton, Chip, Typography, Tooltip } from '@mui/material'
import { Edit, Delete, Block, CheckCircle, Chat } from '@mui/icons-material'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { User } from '#entities/dashboard/api/api'

const columnHelper = createColumnHelper<User>()

type ColumnsProps = {
	onEdit: (row: User) => void
	onDelete: (id: number) => void
	onToggleBan: (id: number, isBanned: boolean) => void
	onChat: (user: User) => void // <--- Добавляем проп
}

export const getUsersColumns = ({
	onEdit,
	onDelete,
	onToggleBan,
	onChat,
}: ColumnsProps): ColumnDef<User, any>[] => {
	return [
		columnHelper.accessor('id', {
			header: 'ID',
			meta: { styles: { width: '60px' } },
		}),
		columnHelper.accessor('telegramId', {
			header: 'Телеграм Id',
			meta: { styles: { width: '100px' } },
		}),
		columnHelper.accessor('username', {
			header: 'Пользователь',
			cell: ({ row }) => (
				<Box>
					<Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
						{`${row.original.firstName || ''} ${row.original.lastName || ''}`}
					</Typography>
					<Typography variant='caption' color='primary'>
						@{row.original.username}
					</Typography>
				</Box>
			),
		}),
		columnHelper.accessor('phone', {
			header: 'Телефон',
			cell: ({ getValue }) => getValue() || '-',
		}),

		columnHelper.accessor('balance', {
			header: 'Баланс',
			cell: ({ getValue }) => `${getValue() || 0} сом`,
		}),
		columnHelper.accessor('isBanned', {
			header: 'Статус',
			cell: ({ getValue }) => {
				const isBanned = getValue()
				return (
					<Chip
						label={isBanned ? 'Забанен' : 'Активен'}
						size='small'
						sx={{
							bgcolor: isBanned ? '#ef4444' : '#10b981',
							color: '#fff',
							fontWeight: 700,
							borderRadius: 1.5,
						}}
					/>
				)
			},
		}),
		columnHelper.display({
			id: 'actions',
			header: 'Действия',
			cell: ({ row }) => (
				<Box sx={{ display: 'flex', gap: 0.5 }}>
					<Tooltip title='Редактировать'>
						<IconButton
							size='small'
							onClick={() => onEdit(row.original)}
							sx={{
								color: '#94a3b8',
								'&:hover': { color: '#2563eb' },
							}}
						>
							<Edit fontSize='small' />
						</IconButton>
					</Tooltip>

					<Tooltip title='Чат с ботом'>
						<IconButton
							color='primary'
							onClick={() => onChat(row.original)}
							size='small'
						>
							<Chat />
						</IconButton>
					</Tooltip>
					<Tooltip
						title={
							row.original.isBanned
								? 'Разблокировать'
								: 'Заблокировать'
						}
					>
						<IconButton
							size='small'
							onClick={() =>
								onToggleBan(
									row.original.id!,
									row.original.isBanned!,
								)
							}
							sx={{
								color: '#94a3b8',
								'&:hover': {
									color: row.original.isBanned
										? '#10b981'
										: '#f59e0b',
								},
							}}
						>
							{row.original.isBanned ? (
								<CheckCircle fontSize='small' />
							) : (
								<Block fontSize='small' />
							)}
						</IconButton>
					</Tooltip>

					<Tooltip title='Удалить'>
						<IconButton
							size='small'
							onClick={() => onDelete(row.original.id!)}
							sx={{
								color: '#94a3b8',
								'&:hover': { color: '#ef4444' },
							}}
						>
							<Delete fontSize='small' />
						</IconButton>
					</Tooltip>
				</Box>
			),
			meta: { styles: { width: '120px' } },
		}),
	]
}

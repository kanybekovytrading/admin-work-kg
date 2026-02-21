import { Box, IconButton, Chip, Typography, Switch, Link } from '@mui/material'
import { Delete, Assessment, OpenInNew } from '@mui/icons-material'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { SocialTask } from '#entities/social-task/api/api'

const columnHelper = createColumnHelper<SocialTask>()

type ColumnsProps = {
	onDelete: (id: number) => void
	onToggleActive: (task: SocialTask) => void
	onViewStats: (id: number) => void
}

export const getSocialTasksColumns = ({
	onDelete,
	onToggleActive,
	onViewStats,
}: ColumnsProps): ColumnDef<SocialTask, any>[] => {
	return [
		columnHelper.accessor('id', {
			header: 'ID',
			meta: { styles: { width: '50px' } },
		}),
		columnHelper.accessor('title', {
			header: 'Задание',
			cell: ({ row }) => (
				<Box>
					<Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
						{row.original.title}
					</Typography>
					<Link
						href={row.original.link}
						target='_blank'
						sx={{
							fontSize: '0.75rem',
							display: 'flex',
							alignItems: 'center',
							gap: 0.5,
						}}
					>
						Перейти <OpenInNew sx={{ fontSize: 12 }} />
					</Link>
				</Box>
			),
		}),
		columnHelper.accessor('type', {
			header: 'Платформа',
			cell: ({ getValue }) => (
				<Chip
					label={getValue()}
					size='small'
					variant='outlined'
					sx={{ fontWeight: 700, fontSize: 10 }}
				/>
			),
		}),
		columnHelper.accessor('reward', {
			header: 'Награда',
			cell: ({ getValue }) => (
				<Typography sx={{ fontWeight: 700, color: '#10b981' }}>
					+{getValue()} Б
				</Typography>
			),
		}),
		columnHelper.accessor('isActive', {
			header: 'Статус',
			cell: ({ row, getValue }) => (
				<Switch
					size='small'
					checked={getValue()}
					onChange={() => onToggleActive(row.original)}
				/>
			),
		}),
		columnHelper.display({
			id: 'actions',
			header: 'Действия',
			cell: ({ row }) => (
				<Box sx={{ display: 'flex', gap: 1 }}>
					<IconButton
						size='small'
						onClick={() => onViewStats(row.original.id!)}
						sx={{
							color: '#94a3b8',
							'&:hover': { color: '#2563eb' },
						}}
					>
						<Assessment fontSize='small' />
					</IconButton>
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
				</Box>
			),
			meta: { styles: { width: '100px' } },
		}),
	]
}

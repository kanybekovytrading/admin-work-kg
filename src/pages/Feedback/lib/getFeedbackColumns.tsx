import { Feedback } from '#entities/feedback/api/api'
import { Chip, Typography, Button } from '@mui/material'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'

const columnHelper = createColumnHelper<Feedback>()

type ColumnsProps = {
	onAnswer: (row: Feedback) => void
}

export const getFeedbackColumns = ({
	onAnswer,
}: ColumnsProps): ColumnDef<Feedback, any>[] => {
	return [
		columnHelper.accessor('id', {
			header: 'ID',
			meta: { styles: { width: '60px' } },
		}),
		columnHelper.accessor('message', {
			header: 'Сообщение',
			cell: ({ getValue }) => (
				<Typography
					variant='body2'
					sx={{ maxWidth: 300, whiteSpace: 'normal' }}
				>
					{getValue()}
				</Typography>
			),
		}),
		columnHelper.accessor('status', {
			header: 'Статус',
			cell: ({ getValue }) => {
				const status = getValue()
				const isPending = status === 'PENDING'
				return (
					<Chip
						label={isPending ? 'Новое' : 'Отвечено'}
						size='small'
						color={isPending ? 'error' : 'success'}
						variant={isPending ? 'filled' : 'outlined'}
						sx={{ fontWeight: 700, fontSize: 10 }}
					/>
				)
			},
		}),
		columnHelper.accessor('createdAt', {
			header: 'Дата создания',
			cell: ({ getValue }) =>
				getValue()
					? new Date(getValue() as string).toLocaleString()
					: '-',
		}),
		columnHelper.accessor('answeredAt', {
			header: 'Дата ответа',
			cell: ({ getValue }) =>
				getValue()
					? new Date(getValue() as string).toLocaleString()
					: '-',
		}),
		columnHelper.display({
			id: 'actions',
			header: 'Действия',
			cell: ({ row }) => (
				<Button
					variant='outlined'
					size='small'
					onClick={() => onAnswer(row.original)}
					sx={{
						textTransform: 'none',
						borderRadius: 2,
						fontSize: 12,
					}}
					disabled={row.original.status === 'ANSWERED'}
				>
					{row.original.status === 'ANSWERED'
						? 'Отвечено'
						: 'Ответить'}
				</Button>
			),
		}),
	]
}

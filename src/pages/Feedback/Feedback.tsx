import React, { useState, useMemo } from 'react'
import {
	Box,
	Typography,
	Paper,
	TablePagination,
	useMediaQuery,
	useTheme,
} from '@mui/material'
import NiceModal from '@ebay/nice-modal-react'

import Table from '#shared/ui/table/Table'
import AnswerFeedbackModal from './ui/AnswerFeedbackModal'
import { Feedback, useGetAllFeedbackQuery } from '#entities/feedback/api/api'
import { getFeedbackColumns } from './lib/getFeedbackColumns'

export const FeedbackPage: React.FC = () => {
	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)

	const { data, isLoading, isFetching } = useGetAllFeedbackQuery({
		page,
		size: rowsPerPage,
		sort: ['createdAt,desc'],
	})

	const handleAnswer = (feedback: Feedback) => {
		NiceModal.show(AnswerFeedbackModal, { feedback })
	}

	const columns = useMemo(
		() => getFeedbackColumns({ onAnswer: handleAnswer }),
		[],
	)

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
			<Typography
				variant='h5'
				sx={{
					fontWeight: 800,
					color: '#1e293b',
					fontSize: { xs: '1.2rem', sm: '1.5rem' },
				}}
			>
				Обращения пользователей
			</Typography>

			<Paper
				sx={{
					boxShadow: 'none',
					backgroundColor: 'transparent',
					width: '100%',
				}}
			>
				<Box
					sx={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}
				>
					<Table<Feedback>
						columns={columns}
						data={data?.content || []}
						loading={isLoading || isFetching}
					/>
				</Box>

				<TablePagination
					component='div'
					count={data?.totalElements || 0}
					page={page}
					onPageChange={(_, newPage) => setPage(newPage)}
					rowsPerPage={rowsPerPage}
					onRowsPerPageChange={(e) => {
						setRowsPerPage(parseInt(e.target.value, 10))
						setPage(0)
					}}
					labelRowsPerPage={isMobile ? '' : 'Строк на странице:'}
					sx={{
						'.MuiTablePagination-selectLabel': {
							display: { xs: 'none', sm: 'block' },
						},
					}}
				/>
			</Paper>
		</Box>
	)
}

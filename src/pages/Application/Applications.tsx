import React, { useMemo, useState } from 'react'
import {
	Box,
	Typography,
	TablePagination,
	Paper,
	useMediaQuery,
	useTheme,
} from '@mui/material'

import {
	useDeleteResumeMutation,
	useGetAllResumesQuery,
} from '#entities/resumes/api/api'

import Table from '#shared/ui/table/Table'
import { getApplicationsColumns } from './lib/getApplicationsColumns'

export const Applications: React.FC = () => {
	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)

	const { data, isLoading, isFetching } = useGetAllResumesQuery({
		page,
		size: rowsPerPage,
	})

	const [deleteResume] = useDeleteResumeMutation()

	const handleChangePage = (_: unknown, newPage: number) => setPage(newPage)

	const handleChangeRowsPerPage = (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		setRowsPerPage(parseInt(e.target.value, 10))
		setPage(0)
	}

	const handleDelete = async (id: number) => {
		if (window.confirm('Вы уверены, что хотите удалить эту анкету?')) {
			await deleteResume(id)
		}
	}

	const handleContact = (row: string) => {
		console.log('Contacting:', row)
	}

	const columns = useMemo(
		() =>
			getApplicationsColumns({
				onDelete: handleDelete,
				onContact: handleContact,
			}),
		[],
	)

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: { xs: 'flex-start', sm: 'center' },
					flexDirection: { xs: 'column', sm: 'row' },
					gap: 1,
				}}
			>
				<Typography
					variant='h5'
					sx={{
						fontWeight: 800,
						color: '#1e293b',
						fontSize: { xs: '1.2rem', sm: '1.5rem' },
					}}
				>
					Анкеты соискателей
				</Typography>
				<Typography variant='body2' color='textSecondary'>
					Всего анкет: {data?.totalElements || 0}
				</Typography>
			</Box>

			<Paper
				sx={{
					boxShadow: 'none',
					backgroundColor: 'transparent',
					width: '100%',
				}}
			>
				{/* Горизонтальный скролл таблицы на мобайл */}
				<Box
					sx={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}
				>
					<Table
						data={data?.content || []}
						columns={columns}
						loading={isLoading || isFetching}
					/>
				</Box>

				<TablePagination
					component='div'
					count={data?.totalElements || 0}
					page={page}
					onPageChange={handleChangePage}
					rowsPerPage={rowsPerPage}
					onRowsPerPageChange={handleChangeRowsPerPage}
					labelRowsPerPage={isMobile ? '' : 'Строк на странице:'}
					sx={{
						mt: 1,
						'.MuiTablePagination-selectLabel': {
							display: { xs: 'none', sm: 'block' },
						},
					}}
				/>
			</Paper>
		</Box>
	)
}

import React, { useState, useMemo } from 'react'
import {
	Box,
	Typography,
	Button,
	Paper,
	TablePagination,
	useMediaQuery,
	useTheme,
} from '@mui/material'
import { Add } from '@mui/icons-material'
import NiceModal from '@ebay/nice-modal-react'

import {
	useGetAllVacanciesQuery,
	useDeleteVacancyMutation,
} from '#entities/vacancies/api/api'
import { VacancyResponse } from '#entities/vacancies/api/generated'

import Table from '#shared/ui/table/Table'
import { getVacanciesColumns } from './lib/getVacanciesColumns'
import CreateVacancyModal from './ui/CreateVacancyModal'
import EditVacancyModal from './ui/EditVacancyModal'

export const Vacancies: React.FC = () => {
	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)

	const { data, isLoading, isFetching } = useGetAllVacanciesQuery({
		page,
		size: rowsPerPage,
	})
	const [deleteVacancy] = useDeleteVacancyMutation()

	const handleEdit = (row: VacancyResponse) =>
		NiceModal.show(EditVacancyModal, { vacancy: row })
	const handleCreate = () => NiceModal.show(CreateVacancyModal)

	const handleDelete = async (id: number) => {
		if (window.confirm('Вы уверены, что хотите удалить эту вакансию?')) {
			try {
				await deleteVacancy(id).unwrap()
			} catch (error) {
				alert('Не удалось удалить вакансию')
			}
		}
	}

	const columns = useMemo(
		() =>
			getVacanciesColumns({ onEdit: handleEdit, onDelete: handleDelete }),
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
					gap: 2,
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
					Управление вакансиями
				</Typography>
				<Button
					variant='contained'
					startIcon={<Add />}
					disableElevation
					sx={{
						bgcolor: '#0f172a',
						borderRadius: 2,
						px: 3,
						alignSelf: { xs: 'flex-start', sm: 'auto' },
					}}
					onClick={handleCreate}
				>
					{isMobile ? 'Добавить' : 'Добавить вакансию'}
				</Button>
			</Box>

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
					<Table<VacancyResponse>
						columns={columns as any}
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

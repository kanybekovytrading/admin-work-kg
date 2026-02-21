import React, { useState, useMemo, useEffect } from 'react'
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

import Table from '#shared/ui/table/Table'
import { getUsersColumns } from './lib/getUsersColumns'
import {
	useBanUserMutation,
	useDeleteUserMutation,
	useGetAllUsersMutation,
	useUnbanUserMutation,
} from '#entities/users/api/api'
import { User } from '#entities/dashboard/api/api'
import ChatUserModal from './ui/ChatUserModal'

export const Users: React.FC = () => {
	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)

	const [fetchUsers, { data, isLoading }] = useGetAllUsersMutation()
	const [deleteUser] = useDeleteUserMutation()
	const [banUser] = useBanUserMutation()
	const [unbanUser] = useUnbanUserMutation()

	const loadData = () =>
		fetchUsers({ page, size: rowsPerPage, sort: ['id,desc'] })

	useEffect(() => {
		loadData()
	}, [page, rowsPerPage])

	const handleEdit = (user: User) => console.log('Edit user', user)

	const handleDelete = async (id: number) => {
		if (window.confirm('Вы уверены, что хотите удалить пользователя?')) {
			await deleteUser(id).unwrap()
			loadData()
		}
	}

	const handleToggleBan = async (id: number, isBanned: boolean) => {
		if (isBanned) {
			await unbanUser(id).unwrap()
		} else {
			await banUser(id).unwrap()
		}
		loadData()
	}

	const handleChat = (user: User) => NiceModal.show(ChatUserModal, { user })

	const columns = useMemo(
		() =>
			getUsersColumns({
				onEdit: handleEdit,
				onDelete: handleDelete,
				onToggleBan: handleToggleBan,
				onChat: handleChat,
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
					Управление пользователями
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
				>
					{isMobile ? 'Добавить' : 'Добавить пользователя'}
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
					<Table<User>
						columns={columns}
						data={data?.content || []}
						loading={isLoading}
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

import React, { useState, useMemo } from 'react'
import {
	Box,
	Typography,
	Button,
	Grid,
	Card,
	Paper,
	TablePagination,
	useMediaQuery,
	useTheme,
} from '@mui/material'
import { Add } from '@mui/icons-material'

import Table from '#shared/ui/table/Table'
import {
	useDeactivateSubscriptionMutation,
	useGetAllSubscriptionsQuery,
} from '#entities/subscriptions/api/api'
import { getSubscriptionsColumns } from './lib/getSubscriptionsColumns'
import GrantSubscriptionModal from './ui/GrantSubscriptionModal'
import NiceModal from '@ebay/nice-modal-react'

export const Subscriptions: React.FC = () => {
	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)

	const { data, isLoading, isFetching } = useGetAllSubscriptionsQuery({
		page,
		size: rowsPerPage,
	})
	const [deactivateSubscription] = useDeactivateSubscriptionMutation()

	const handleDeactivate = async (id: number) => {
		if (
			window.confirm(
				'Вы уверены, что хотите досрочно прекратить подписку?',
			)
		) {
			try {
				await deactivateSubscription(id).unwrap()
			} catch (e) {
				console.error(e)
			}
		}
	}

	const handleGrant = () => NiceModal.show(GrantSubscriptionModal)

	const columns = useMemo(
		() => getSubscriptionsColumns({ onDeactivate: handleDeactivate }),
		[],
	)

	const plans = [
		{
			name: '1 неделя',
			price: '150 сом',
			duration: '7 дней доступа',
			icon: '👑',
		},
		{
			name: '1 месяц',
			price: '500 сом',
			duration: '30 дней доступа',
			icon: '👑',
		},
		{
			name: '3 месяца',
			price: '1200 сом',
			duration: '90 дней доступа',
			icon: '👑',
		},
	]

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
			{/* Карточки планов */}
			<Box>
				<Typography
					variant='h5'
					sx={{
						fontWeight: 800,
						color: '#1e293b',
						mb: 3,
						fontSize: { xs: '1.2rem', sm: '1.5rem' },
					}}
				>
					Управление подписками
				</Typography>
				<Grid container spacing={2}>
					{plans.map((plan, i) => (
						<Grid item xs={12} sm={4} key={i}>
							<Card
								sx={{
									p: { xs: 2, sm: 3 },
									borderRadius: 4,
									position: 'relative',
									border: '1px solid #f1f5f9',
									boxShadow: 'none',
									// На мобайле — горизонтальная карточка
									display: { xs: 'flex', sm: 'block' },
									alignItems: { xs: 'center', sm: 'unset' },
									gap: { xs: 2, sm: 0 },
								}}
							>
								<Typography
									sx={{
										position: {
											xs: 'static',
											sm: 'absolute',
										},
										top: 16,
										right: 16,
										opacity: 0.3,
										fontSize: { xs: 28, sm: 24 },
										flexShrink: 0,
									}}
								>
									{plan.icon}
								</Typography>
								<Box>
									<Typography
										variant='subtitle2'
										sx={{
											fontWeight: 700,
											mb: { xs: 0, sm: 0.5 },
										}}
									>
										{plan.name}
									</Typography>
									<Typography
										variant='h4'
										sx={{
											fontWeight: 800,
											color: '#2563eb',
											mb: 0.5,
											fontSize: {
												xs: '1.5rem',
												sm: '2.125rem',
											},
										}}
									>
										{plan.price}
									</Typography>
									<Typography
										variant='caption'
										sx={{ color: '#94a3b8' }}
									>
										{plan.duration}
									</Typography>
								</Box>
							</Card>
						</Grid>
					))}
				</Grid>
			</Box>

			{/* История подписок */}
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
						variant='h6'
						sx={{ fontWeight: 800, color: '#1e293b' }}
					>
						История подписок
					</Typography>
					<Button
						variant='contained'
						startIcon={<Add />}
						disableElevation
						sx={{
							bgcolor: '#0f172a',
							borderRadius: 2,
							alignSelf: { xs: 'flex-start', sm: 'auto' },
						}}
						onClick={handleGrant}
					>
						{isMobile ? 'Выдать' : 'Выдать подписку'}
					</Button>
				</Box>

				<Paper
					sx={{ boxShadow: 'none', backgroundColor: 'transparent' }}
				>
					<Box
						sx={{
							overflowX: 'auto',
							WebkitOverflowScrolling: 'touch',
						}}
					>
						<Table
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
		</Box>
	)
}

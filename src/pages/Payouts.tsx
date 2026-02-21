import React, { useEffect, useState } from 'react'
import {
	Box,
	Chip,
	Typography,
	Grid,
	Card,
	Button,
	Stack,
	IconButton,
} from '@mui/material'
import {
	AccessTime,
	CheckCircleOutline,
	AttachMoney,
	Refresh,
	Check,
	Close,
	Visibility,
} from '@mui/icons-material'
import { api } from '../../services/api'
import { DataTable } from '../../components/DataTable'
import { Payout } from '../../types'

export const Payouts: React.FC = () => {
	const [data, setData] = useState<Payout[]>([])

	useEffect(() => {
		api.getPayouts().then(setData)
	}, [])

	const stats = {
		waiting: data.filter((p) => p.status === 'Ожидает').length,
		approved: data.filter((p) => p.status === 'Выплачено').length,
		totalSum: data
			.filter((p) => p.status === 'Выплачено')
			.reduce((sum, p) => sum + p.amount, 0),
	}

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'flex-start',
				}}
			>
				<Box>
					<Typography
						variant='h5'
						sx={{ fontWeight: 800, color: '#1e293b' }}
					>
						Заявки на вывод средств
					</Typography>
					<Typography
						variant='body2'
						sx={{ color: '#64748b', mt: 0.5 }}
					>
						Ожидают:{' '}
						<span style={{ fontWeight: 700 }}>{stats.waiting}</span>{' '}
						| Одобрено:{' '}
						<span style={{ fontWeight: 700 }}>
							{stats.approved}
						</span>
					</Typography>
				</Box>
				<Button
					variant='outlined'
					startIcon={<Refresh />}
					size='small'
					sx={{
						borderRadius: 2,
						textTransform: 'none',
						fontWeight: 700,
						borderColor: '#e2e8f0',
						color: '#1e293b',
					}}
				>
					Обновить
				</Button>
			</Box>

			<Grid container spacing={3}>
				<Grid item xs={12} md={4}>
					<Card
						sx={{
							p: 3,
							borderRadius: 4,
							display: 'flex',
							alignItems: 'center',
							gap: 2,
						}}
					>
						<Box
							sx={{
								p: 1.5,
								borderRadius: 3,
								bgcolor: '#fef3c7',
								color: '#f59e0b',
							}}
						>
							<AccessTime sx={{ fontSize: 32 }} />
						</Box>
						<Box>
							<Typography
								variant='caption'
								sx={{ color: '#64748b', fontWeight: 600 }}
							>
								Ожидают проверки
							</Typography>
							<Typography variant='h4' sx={{ fontWeight: 800 }}>
								{stats.waiting}
							</Typography>
						</Box>
					</Card>
				</Grid>
				<Grid item xs={12} md={4}>
					<Card
						sx={{
							p: 3,
							borderRadius: 4,
							display: 'flex',
							alignItems: 'center',
							gap: 2,
						}}
					>
						<Box
							sx={{
								p: 1.5,
								borderRadius: 3,
								bgcolor: '#dcfce7',
								color: '#10b981',
							}}
						>
							<CheckCircleOutline sx={{ fontSize: 32 }} />
						</Box>
						<Box>
							<Typography
								variant='caption'
								sx={{ color: '#64748b', fontWeight: 600 }}
							>
								Выплачено
							</Typography>
							<Typography variant='h4' sx={{ fontWeight: 800 }}>
								{stats.approved}
							</Typography>
						</Box>
					</Card>
				</Grid>
				<Grid item xs={12} md={4}>
					<Card
						sx={{
							p: 3,
							borderRadius: 4,
							display: 'flex',
							alignItems: 'center',
							gap: 2,
						}}
					>
						<Box
							sx={{
								p: 1.5,
								borderRadius: 3,
								bgcolor: '#dbeafe',
								color: '#2563eb',
							}}
						>
							<AttachMoney sx={{ fontSize: 32 }} />
						</Box>
						<Box>
							<Typography
								variant='caption'
								sx={{ color: '#64748b', fontWeight: 600 }}
							>
								Всего выплат (сом)
							</Typography>
							<Typography variant='h4' sx={{ fontWeight: 800 }}>
								{stats.totalSum}
							</Typography>
						</Box>
					</Card>
				</Grid>
			</Grid>

			<DataTable
				data={data}
				columns={[
					{ header: 'ID', accessor: 'id' },
					{
						header: 'Telegram ID',
						accessor: (p) => (
							<span style={{ color: '#2563eb', fontWeight: 600 }}>
								{p.telegramId}
							</span>
						),
					},
					{
						header: 'Сумма (сом)',
						accessor: (p) => (
							<span style={{ fontWeight: 800 }}>{p.amount}</span>
						),
					},
					{ header: 'Баллы', accessor: 'points' },
					{ header: 'Метод оплаты', accessor: 'method' },
					{
						header: 'Статус',
						accessor: (p) => (
							<Chip
								label={p.status}
								color={
									p.status === 'Выплачено'
										? 'success'
										: p.status === 'Ожидает'
											? 'warning'
											: 'error'
								}
								size='small'
								sx={{ fontWeight: 700, borderRadius: 1.5 }}
							/>
						),
					},
					{ header: 'Дата', accessor: 'date' },
				]}
				actions={(p) => (
					<Stack direction='row' spacing={1}>
						<Tooltip title='Просмотреть'>
							<IconButton size='small' sx={{ color: '#64748b' }}>
								<Visibility fontSize='small' />
							</IconButton>
						</Tooltip>
						{p.status === 'Ожидает' && (
							<>
								<Tooltip title='Одобрить'>
									<IconButton
										size='small'
										sx={{ color: '#10b981' }}
									>
										<Check fontSize='small' />
									</IconButton>
								</Tooltip>
								<Tooltip title='Отклонить'>
									<IconButton
										size='small'
										sx={{ color: '#ef4444' }}
									>
										<Close fontSize='small' />
									</IconButton>
								</Tooltip>
							</>
						)}
					</Stack>
				)}
			/>
		</Box>
	)
}

// Helper for tooltip imports if missing
import { Tooltip } from '@mui/material'

import React, { useMemo } from 'react'
import { Box, Grid, Card, Typography, Paper, Skeleton } from '@mui/material'

import Table from '#shared/ui/table/Table'
import { getPointsColumns } from './lib/getPointsColumns'
import { useGetPointsStatsQuery } from '#entities/points/api/api'
import { PointsTransaction } from '#entities/points/api/generated'

export const Points: React.FC = () => {
	// 1. Получаем статистику по системе
	const { data: stats, isLoading: isStatsLoading } = useGetPointsStatsQuery()

	// 2. Колонки
	const columns = useMemo(() => getPointsColumns(), [])

	// Примечание: так как в API нет getAllTransactions,
	// здесь должен быть вызов транзакций. Пока оставим пустым массивом
	// или данными конкретного юзера, если страница контекстная.

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
			<Typography variant='h5' sx={{ fontWeight: 800, color: '#1e293b' }}>
				Управление баллами
			</Typography>

			{/* Карточки статистики */}
			<Grid container spacing={3}>
				<Grid item xs={12} md={4}>
					<Card
						sx={{
							p: 3,
							borderRadius: 4,
							bgcolor: '#0f172a',
							color: '#fff',
							boxShadow: 'none',
						}}
					>
						<Typography variant='subtitle2' sx={{ opacity: 0.7 }}>
							Всего в системе
						</Typography>
						<Typography variant='h3' sx={{ fontWeight: 800 }}>
							{isStatsLoading ? (
								<Skeleton
									width='60%'
									sx={{ bgcolor: 'grey.800' }}
								/>
							) : (
								<>
									{stats?.totalInSystem?.toLocaleString()}
									<span
										style={{ fontSize: 20, marginLeft: 8 }}
									>
										Баллов
									</span>
								</>
							)}
						</Typography>
					</Card>
				</Grid>

				<Grid item xs={12} md={4}>
					<Card
						sx={{
							p: 3,
							borderRadius: 4,
							border: '1px solid #e2e8f0',
							boxShadow: 'none',
						}}
					>
						<Typography variant='subtitle2' color='text.secondary'>
							Всего заработано
						</Typography>
						<Typography
							variant='h4'
							sx={{ fontWeight: 800, color: '#10b981' }}
						>
							{isStatsLoading ? (
								<Skeleton width='50%' />
							) : (
								`+${stats?.totalEarned?.toLocaleString()}`
							)}
						</Typography>
					</Card>
				</Grid>

				<Grid item xs={12} md={4}>
					<Card
						sx={{
							p: 3,
							borderRadius: 4,
							border: '1px solid #e2e8f0',
							boxShadow: 'none',
						}}
					>
						<Typography variant='subtitle2' color='text.secondary'>
							Всего потрачено
						</Typography>
						<Typography
							variant='h4'
							sx={{ fontWeight: 800, color: '#ef4444' }}
						>
							{isStatsLoading ? (
								<Skeleton width='50%' />
							) : (
								`-${stats?.totalSpent?.toLocaleString()}`
							)}
						</Typography>
					</Card>
				</Grid>
			</Grid>

			{/* Таблица транзакций */}
			<Box>
				<Typography
					variant='h6'
					sx={{ fontWeight: 800, color: '#1e293b', mb: 2 }}
				>
					История операций
				</Typography>
				<Paper
					sx={{ boxShadow: 'none', backgroundColor: 'transparent' }}
				>
					<Table
						columns={columns as any}
						data={stats as PointsTransaction[]} // Сюда передаются данные транзакций
						loading={false}
					/>
				</Paper>
			</Box>
		</Box>
	)
}

import { useMemo } from 'react'
import {
	Grid,
	Paper,
	Typography,
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Skeleton,
	useMediaQuery,
	useTheme,
} from '@mui/material'
import { styled } from '@mui/material/styles'

import DescriptionIcon from '@mui/icons-material/DescriptionOutlined'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline'
import { useGetDashboardStatsQuery } from '#entities/dashboard/api/api'

const RootContainer = styled(Box)(() => ({
	display: 'flex',
	minHeight: '100vh',
	backgroundColor: '#F3F4F6',
}))

const MainContent = styled(Box)(({ theme }) => ({
	flexGrow: 1,
	padding: theme.spacing(2),
	[theme.breakpoints.up('sm')]: {
		padding: theme.spacing(3),
	},
	display: 'flex',
	flexDirection: 'column',
	overflowX: 'hidden',
}))

const StyledCard = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(2),
	[theme.breakpoints.up('sm')]: {
		padding: theme.spacing(2.5),
	},
	borderRadius: 8,
	boxShadow: '0px 2px 4px rgba(0,0,0,0.05)',
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
	position: 'relative',
}))

const SourceChip = styled('span')(() => ({
	backgroundColor: '#f5f5f5',
	color: '#333',
	padding: '4px 8px',
	borderRadius: 4,
	fontSize: '0.75rem',
	fontWeight: 500,
	border: '1px solid #e0e0e0',
	textTransform: 'lowercase',
	whiteSpace: 'nowrap',
}))

const StatusChip = styled('span')<{ isActive?: boolean }>(({ isActive }) => ({
	backgroundColor: isActive ? '#000' : '#e0e0e0',
	color: isActive ? '#fff' : '#666',
	padding: '4px 12px',
	borderRadius: 16,
	fontSize: '0.75rem',
	fontWeight: 500,
	whiteSpace: 'nowrap',
}))

export const Dashboard = () => {
	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
	const isTablet = useMediaQuery(theme.breakpoints.down('md'))

	const { data, isLoading, error } = useGetDashboardStatsQuery()

	const statsList = useMemo(
		() => [
			{
				title: 'Анкеты',
				value: data?.totalResumes ?? 0,
				subtext: `${data?.activeResumes ?? 0} активных`,
				icon: <DescriptionIcon fontSize='small' />,
			},
			{
				title: 'Вакансии',
				value: data?.totalVacancies ?? 0,
				subtext: `${data?.activeVacancies ?? 0} активных`,
				icon: <WorkOutlineIcon fontSize='small' />,
			},
			{
				title: 'Пользователи',
				value: data?.totalUsers ?? 0,
				subtext: `${data?.newUsersToday ?? 0} сегодня`,
				icon: <PeopleOutlineIcon fontSize='small' />,
			},
			{
				title: 'Статус бота',
				value: 'Онлайн',
				subtext: 'Telegram бот',
				icon: null,
				isStatus: true,
			},
		],
		[data],
	)

	if (error) {
		return (
			<RootContainer>
				<MainContent>
					<Typography color='error'>
						Ошибка загрузки данных
					</Typography>
				</MainContent>
			</RootContainer>
		)
	}

	return (
		<RootContainer>
			<MainContent>
				{/* STATS CARDS */}
				<Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: 4 }}>
					{isLoading
						? Array.from(new Array(4)).map((_, index) => (
								<Grid item xs={6} sm={6} md={3} key={index}>
									<StyledCard>
										<Skeleton variant='text' width='60%' />
										<Skeleton
											variant='rectangular'
											height={40}
											sx={{ mt: 2 }}
										/>
										<Skeleton variant='text' width='40%' />
									</StyledCard>
								</Grid>
							))
						: statsList.map((stat, index) => (
								<Grid item xs={6} sm={6} md={3} key={index}>
									<StyledCard>
										<Box
											sx={{
												display: 'flex',
												justifyContent: 'space-between',
												alignItems: 'flex-start',
											}}
										>
											<Typography
												variant='body2'
												color='textSecondary'
												sx={{
													fontSize: {
														xs: '0.75rem',
														sm: '0.875rem',
													},
												}}
											>
												{stat.title}
											</Typography>
											{stat.icon && (
												<Box sx={{ color: '#999' }}>
													{stat.icon}
												</Box>
											)}
										</Box>
										<Box sx={{ mt: 1 }}>
											<Typography
												variant='h4'
												sx={{
													fontWeight: 700,
													fontSize: {
														xs: '1.5rem',
														sm: '2rem',
														md: '2.125rem',
													},
												}}
											>
												{stat.value}
											</Typography>
											<Typography
												variant='caption'
												color='textSecondary'
												sx={{
													fontSize: {
														xs: '0.7rem',
														sm: '0.75rem',
													},
												}}
											>
												{stat.subtext}
											</Typography>
										</Box>
									</StyledCard>
								</Grid>
							))}
				</Grid>

				{/* TABLE SECTION */}
				<Paper
					sx={{
						borderRadius: 2,
						boxShadow: '0px 2px 4px rgba(0,0,0,0.05)',
						overflow: 'hidden',
					}}
				>
					<Box sx={{ p: 2.5, borderBottom: '1px solid #f0f0f0' }}>
						<Typography
							variant='subtitle1'
							sx={{ fontWeight: 600 }}
						>
							Последние вакансии
						</Typography>
					</Box>
					{/* Горизонтальный скролл на мобайле */}
					<TableContainer
						sx={{
							overflowX: 'auto',
							WebkitOverflowScrolling: 'touch',
						}}
					>
						<Table
							sx={{ minWidth: isMobile ? 500 : 650 }}
							aria-label='simple table'
						>
							<TableHead>
								<TableRow>
									<TableCell
										sx={{
											color: '#777',
											fontSize: '0.8rem',
										}}
									>
										Название
									</TableCell>
									{/* Скрываем менее важные колонки на мобайле */}
									{!isMobile && (
										<TableCell
											sx={{
												color: '#777',
												fontSize: '0.8rem',
											}}
										>
											Категория
										</TableCell>
									)}
									<TableCell
										sx={{
											color: '#777',
											fontSize: '0.8rem',
										}}
									>
										Город
									</TableCell>
									{!isTablet && (
										<TableCell
											sx={{
												color: '#777',
												fontSize: '0.8rem',
											}}
										>
											Источник
										</TableCell>
									)}
									<TableCell
										sx={{
											color: '#777',
											fontSize: '0.8rem',
										}}
									>
										Статус
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{isLoading
									? Array.from(new Array(5)).map((_, i) => (
											<TableRow key={i}>
												<TableCell
													colSpan={isMobile ? 3 : 5}
												>
													<Skeleton animation='wave' />
												</TableCell>
											</TableRow>
										))
									: data?.recentVacancies?.map((row) => (
											<TableRow
												key={row.id}
												sx={{
													'&:last-child td, &:last-child th':
														{ border: 0 },
												}}
											>
												<TableCell
													component='th'
													scope='row'
													sx={{
														fontSize: '0.875rem',
														fontWeight: 500,
													}}
												>
													{row.title ||
														'Без названия'}
												</TableCell>
												{!isMobile && (
													<TableCell
														sx={{
															fontSize:
																'0.875rem',
														}}
													>
														{row.category?.nameRu ||
															'-'}
													</TableCell>
												)}
												<TableCell
													sx={{
														fontSize: '0.875rem',
													}}
												>
													{row.city?.nameRu || '-'}
												</TableCell>
												{!isTablet && (
													<TableCell>
														<SourceChip>
															telegram
														</SourceChip>
													</TableCell>
												)}
												<TableCell>
													<StatusChip
														isActive={row.isActive}
													>
														{row.isActive
															? 'Активна'
															: 'Скрыта'}
													</StatusChip>
												</TableCell>
											</TableRow>
										))}

								{!isLoading &&
									(!data?.recentVacancies ||
										data.recentVacancies.length === 0) && (
										<TableRow>
											<TableCell
												colSpan={isMobile ? 3 : 5}
												align='center'
												sx={{ py: 3, color: '#999' }}
											>
												Нет данных
											</TableCell>
										</TableRow>
									)}
							</TableBody>
						</Table>
					</TableContainer>
				</Paper>
			</MainContent>
		</RootContainer>
	)
}

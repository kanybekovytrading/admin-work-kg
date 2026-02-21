import React, { useState } from 'react'
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	Box,
	TextField,
	InputAdornment,
	Chip,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { Search } from '@mui/icons-material'

const StyledTableContainer = styled(TableContainer)(() => ({
	borderRadius: 16,
	boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
	border: '1px solid #edf2f7',
	overflow: 'hidden',
	backgroundColor: '#fff',
}))

const StyledHeaderCell = styled(TableCell)(() => ({
	backgroundColor: '#f8fafc',
	color: '#64748b',
	fontWeight: 700,
	fontSize: '0.75rem',
	textTransform: 'uppercase',
	letterSpacing: '0.05em',
	padding: '16px 24px',
}))

const StyledRow = styled(TableRow)(() => ({
	'&:hover': {
		backgroundColor: '#f1f5f9',
	},
	'&:last-child td': {
		borderBottom: 0,
	},
}))

const StyledCell = styled(TableCell)(() => ({
	padding: '16px 24px',
	color: '#334155',
	fontSize: '0.875rem',
}))

interface Column<T> {
	header: string
	accessor: keyof T | ((item: T) => React.ReactNode)
	align?: 'left' | 'right' | 'center'
}

interface DataTableProps<T> {
	columns: Column<T>[]
	data: T[]
	title?: string
	actions?: (item: T) => React.ReactNode
	searchable?: boolean
}

export function DataTable<T extends { id: number | string }>({
	columns,
	data,
	title,
	actions,
	searchable = true,
}: DataTableProps<T>) {
	const [searchQuery, setSearchQuery] = useState('')

	const filteredData = data.filter((item) => {
		return Object.values(item).some((val) =>
			String(val).toLowerCase().includes(searchQuery.toLowerCase()),
		)
	})

	return (
		<Box sx={{ mb: 4 }}>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					mb: 2,
					flexWrap: 'wrap',
					gap: 2,
				}}
			>
				{title && (
					<Typography
						variant='h6'
						sx={{ fontWeight: 800, color: '#1e293b' }}
					>
						{title}{' '}
						<Chip
							label={filteredData.length}
							size='small'
							sx={{ ml: 1, fontWeight: 700, bgcolor: '#f1f5f9' }}
						/>
					</Typography>
				)}
				{searchable && (
					<TextField
						size='small'
						placeholder='Поиск по таблице...'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						sx={{
							width: { xs: '100%', sm: 300 },
							'& .MuiOutlinedInput-root': {
								borderRadius: 2,
								bgcolor: '#fff',
							},
						}}
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<Search
										sx={{ color: '#94a3b8', fontSize: 20 }}
									/>
								</InputAdornment>
							),
						}}
					/>
				)}
			</Box>
			<StyledTableContainer>
				<Table sx={{ minWidth: 650 }}>
					<TableHead>
						<TableRow>
							{columns.map((col, idx) => (
								<StyledHeaderCell
									key={idx}
									align={col.align || 'left'}
								>
									{col.header}
								</StyledHeaderCell>
							))}
							{actions && (
								<StyledHeaderCell align='right'>
									Действия
								</StyledHeaderCell>
							)}
						</TableRow>
					</TableHead>
					<TableBody>
						{filteredData.length > 0 ? (
							filteredData.map((item) => (
								<StyledRow key={item.id}>
									{columns.map((col, idx) => (
										<StyledCell
											key={idx}
											align={col.align || 'left'}
										>
											{typeof col.accessor === 'function'
												? col.accessor(item)
												: (item[
														col.accessor
													] as React.ReactNode)}
										</StyledCell>
									))}
									{actions && (
										<StyledCell align='right'>
											<Box
												sx={{
													display: 'flex',
													justifyContent: 'flex-end',
													gap: 1,
												}}
											>
												{actions(item)}
											</Box>
										</StyledCell>
									)}
								</StyledRow>
							))
						) : (
							<TableRow>
								<StyledCell
									colSpan={columns.length + (actions ? 1 : 0)}
									align='center'
									sx={{ py: 6, color: '#94a3b8' }}
								>
									Ничего не найдено
								</StyledCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</StyledTableContainer>
		</Box>
	)
}

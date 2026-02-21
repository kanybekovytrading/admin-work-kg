import styled from '@emotion/styled'
import {
	Box,
	IconButton,
	Chip,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material'
import { LogOutIcon, Menu } from 'lucide-react'
import { Button } from '#shared/ui/button/Button'
import { useNavigate } from 'react-router-dom'
import { keyPaths } from '#shared/consts/routing.ts'
import { useDispatch } from 'react-redux'
import { invalidateAccessToken } from '#shared/api/invalidateTokenEvent'

interface HeaderProps {
	onDrawerToggle?: () => void
}

export const Header = ({ onDrawerToggle }: HeaderProps) => {
	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down('md'))
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const handleClose = () => {
		console.log('random')

		dispatch(invalidateAccessToken())
	}

	return (
		<TopBar>
			<LeftSection>
				{/* Бургер только на мобайл */}
				{isMobile && (
					<IconButton
						onClick={onDrawerToggle}
						edge='start'
						sx={{ mr: 1, color: '#333' }}
					>
						<Menu size={22} />
					</IconButton>
				)}
				<Typography
					variant='h6'
					sx={{
						fontWeight: 500,
						fontSize: { xs: '1rem', sm: '1.25rem' },
						whiteSpace: 'nowrap',
					}}
				>
					Панель управления
				</Typography>
			</LeftSection>

			<Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
				<Chip
					label='admin'
					size='small'
					sx={{
						bgcolor: '#eee',
						borderRadius: 1,
						display: { xs: 'none', sm: 'flex' },
					}}
				/>
				<Button
					variant='outlined'
					color='inherit'
					size='small'
					endIcon={<LogOutIcon size={14} />}
					onClick={() => navigate(keyPaths.login())}
					sx={{
						borderColor: '#ddd',
						color: '#333',
						textTransform: 'none',
						minWidth: 0,
						px: { xs: 1, sm: 2 },
						'& .MuiButton-endIcon': {
							display: { xs: 'none', sm: 'flex' },
						},
					}}
				>
					<Box
						onClick={handleClose}
						component='span'
						sx={{ display: { xs: 'none', sm: 'inline' } }}
					>
						Выйти
					</Box>
					<Box
						onClick={handleClose}
						component='span'
						sx={{ display: { xs: 'inline', sm: 'none' } }}
					>
						<LogOutIcon size={16} />
					</Box>
				</Button>
			</Box>
		</TopBar>
	)
}

const TopBar = styled(Box)(() => ({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	width: '100%',
}))

const LeftSection = styled(Box)(() => ({
	display: 'flex',
	alignItems: 'center',
}))

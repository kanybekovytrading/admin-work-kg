import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import { invalidateAccessToken } from '#shared/api/invalidateTokenEvent'
import OpenMenu from '#shared/assets/open-menu.svg?react'
import { useToggleDropdownMenu } from '#shared/lib/hooks/menu'
import { Button } from '#shared/ui/button/Button'

import ProfileIcon from '../assets/profile.svg?react'

const LogoutMenu = () => {
	const dispatch = useDispatch()
	const { t } = useTranslation('common')
	const {
		isMenuOpen,
		openHandler,
		closeHandler,
		anchorEl,
		anchorOrigin,
		transformOrigin,
	} = useToggleDropdownMenu()

	const handleClose = () => {
		closeHandler()
		dispatch(invalidateAccessToken())
	}

	return (
		<Container id='profile-menu-container'>
			<ProfileButton
				id='profile-menu-btn'
				disableRipple
				startIcon={<ProfileIcon />}
				endIcon={<OpenMenu />}
				variant='outlined'
				onClick={openHandler}
			>
				<div>
					<Typography align='left' fontSize={14}></Typography>
					<Typography
						align='left'
						fontSize={12}
						color='#59636D'
					></Typography>
				</div>
			</ProfileButton>
			<StyledMenu
				id='profile-menu'
				anchorEl={anchorEl}
				open={isMenuOpen}
				onClose={closeHandler}
				anchorOrigin={anchorOrigin}
				transformOrigin={transformOrigin}
			>
				<MenuItem onClick={handleClose} id='logout-btn'>
					{t('logout')}
				</MenuItem>
			</StyledMenu>
		</Container>
	)
}

export default LogoutMenu

const Container = styled('div')`
	display: flex;
	column-gap: 24px;
`

const ProfileButton = styled(Button)`
	&.MuiButtonBase-root {
		padding-left: 0;
		padding-right: 0;
		:hover {
			background: transparent;
		}
		color: black;
	}
`

const StyledMenu = styled(Menu)`
	& .MuiMenu-list {
		padding: 0px;
	}
`

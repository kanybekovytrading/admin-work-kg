import Stack from '@mui/material/Stack'
import Link from '#shared/ui/link/Link'
import { useTheme } from '@mui/material'

const LoginPageHeader = () => {
	const theme = useTheme()

	return (
		<Stack
			id='auth-header'
			flexDirection='row'
			alignItems='center'
			justifyContent='space-between'
			position='fixed'
			top='0px'
			component='header'
			bgcolor={theme.palette.background.paper}
			width='100%'
			padding='18px 100px 18px 100px'
		>
			<Link id='logo-link' to='/'>
				{/* <LogoKg /> */}
			</Link>
			{/* <LanguageSwitcher /> */}
		</Stack>
	)
}

export default LoginPageHeader

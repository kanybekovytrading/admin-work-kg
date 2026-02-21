import { Box } from '@mui/material'

const LoginPageFooter = () => {
	return (
		<Box
			display='flex'
			alignItems='center'
			justifyContent='center'
			gap='11px'
			width='100%'
			position='fixed'
			bottom='0'
			paddingBottom='24px'
			paddingTop='24px'
			sx={{ pointerEvents: 'none' }}
			borderTop='1px solid #dfe7ef'
		></Box>
	)
}

export default LoginPageFooter

import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import { FC, type ReactNode, Suspense } from 'react'
import { Outlet } from 'react-router-dom'

type Props = {
	headerSlot?: ReactNode
	sidebarSlot?: ReactNode
}

const Layout: FC<Props> = ({ headerSlot, sidebarSlot }) => {
	return (
		<Stack minHeight='100vh' minWidth={'100%'}>
			{headerSlot}
			<Stack direction='row' paddingBottom={'0'} height='100%'>
				{sidebarSlot}
				<Stack
					marginTop='64px'
					padding='20px 20px 0 20px'
					width='100%'
					bgcolor='#f4f6f8'
					component='main'
				>
					<Suspense fallback={<CircularProgress />}>
						<Outlet />
					</Suspense>
				</Stack>
			</Stack>
			<Box
				position='static'
				display='flex'
				alignItems='center'
				justifyContent='center'
				gap='11px'
				marginLeft='auto'
				width='calc(100% - 180px)'
				padding='24px 0'
			>
				{/* {language === "kg" ? <LogoKg /> : <Logo />} */}
				{/* <LogoKg /> */}
				{/* <Icon /> */}
			</Box>
		</Stack>
	)
}

export default Layout

import { Box } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import React from 'react'

function CloseToastButton({
	closeToast,
}: {
	readonly closeToast: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
}): React.ReactElement {
	return (
		<Box>
			<IconButton onClick={closeToast}>
				{/* <CloseToastIcon /> */}
			</IconButton>
		</Box>
	)
}

export default CloseToastButton

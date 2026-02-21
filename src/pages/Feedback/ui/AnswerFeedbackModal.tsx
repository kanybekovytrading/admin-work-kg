import { create, useModal } from '@ebay/nice-modal-react'
import { useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import StatusDialog from '../../../shared/ui/status-dialog/StatusDialog'
import { toastUtils } from '../../../shared/lib/toster'
import { Feedback, useAnswerFeedbackMutation } from '#entities/feedback/api/api'

interface Props {
	feedback: Feedback
}

const AnswerFeedbackModal = create(({ feedback }: Props) => {
	const modal = useModal()
	const [response, setResponse] = useState('')
	const [answerFeedback, { status, reset }] = useAnswerFeedbackMutation()

	const onConfirm = async () => {
		if (!response.trim()) {
			toastUtils.error('Введите текст ответа')
			return
		}

		try {
			await answerFeedback({
				id: feedback.id!,
				answerFeedbackRequest: { response },
			}).unwrap()

			toastUtils.success('Ответ отправлен')
			modal.hide()
		} catch (e) {
			console.error(e)
		}
	}

	const content = (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: 2,
				mt: 1,
				minWidth: 400,
			}}
		>
			<Box
				sx={{
					bgcolor: '#f8fafc',
					p: 2,
					borderRadius: 2,
					border: '1px solid #e2e8f0',
				}}
			>
				<Typography variant='caption' color='text.secondary'>
					Сообщение пользователя:
				</Typography>
				<Typography variant='body2'>{feedback.message}</Typography>
			</Box>

			<TextField
				label='Ваш ответ'
				multiline
				rows={4}
				fullWidth
				value={response}
				onChange={(e) => setResponse(e.target.value)}
				placeholder='Введите текст ответа пользователю...'
			/>

			<Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
				<Button onClick={() => modal.hide()} color='inherit'>
					Отмена
				</Button>
				<Button
					variant='contained'
					onClick={onConfirm}
					disabled={status === 'pending'}
				>
					Отправить ответ
				</Button>
			</Box>
		</Box>
	)

	return (
		<StatusDialog
			title='Ответ на обращение'
			open={modal.visible}
			onClose={() => modal.hide()}
			status={status}
			slotProps={{ transition: { onExited: reset } }}
			content={{
				uninitialized: { description: content, actions: null },
			}}
		/>
	)
})

export default AnswerFeedbackModal

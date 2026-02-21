import { create, useModal } from '@ebay/nice-modal-react'
import React, { useEffect, useRef, useState } from 'react'
import {
	Box,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Typography,
	IconButton,
	TextField,
	Button,
	Avatar,
	Paper,
	CircularProgress,
	Stack,
} from '@mui/material'
import { Close, Send, SmartToy, Person } from '@mui/icons-material'
import {
	useGetUserChatHistoryQuery,
	useSaveMessageMutation,
} from '#entities/bot/api/api'
import { User } from '#entities/dashboard/api/api'

export interface ChatUserModalProps {
	user: User
}

const ChatUserModal = create(({ user }: ChatUserModalProps) => {
	const modal = useModal()
	const [messageText, setMessageText] = useState('')
	const scrollRef = useRef<HTMLDivElement>(null)

	// --- API Хуки ---

	// Получаем историю чата
	// skip: true, если модалка закрыта (чтобы не спамить запросами)
	// pollingInterval: 3000 - обновляем каждые 3 сек, чтобы видеть ответы юзера
	const {
		data: chatData,
		isLoading,
		refetch,
	} = useGetUserChatHistoryQuery(
		{
			userId: user.id!,
			page: 0,
			size: 100,
		},
		{
			skip: !modal.visible || !user.id,
			pollingInterval: modal.visible ? 3000 : 0,
		},
	)

	// Мутация отправки
	const [sendMessage, { isLoading: isSending }] = useSaveMessageMutation()

	// --- Эффекты ---

	// Автоскролл вниз при открытии или новых сообщениях
	useEffect(() => {
		if (scrollRef.current && modal.visible) {
			setTimeout(() => {
				if (scrollRef.current) {
					scrollRef.current.scrollTop = scrollRef.current.scrollHeight
				}
			}, 100) // Небольшая задержка для рендера
		}
	}, [chatData, modal.visible])

	// --- Хендлеры ---

	const handleClose = () => {
		modal.hide()
	}

	const handleSend = async () => {
		if (!messageText.trim() || !user.telegramId) return

		try {
			await sendMessage({
				telegramUserId: user.telegramId,
				senderType: 'BOT', // Админ пишет от имени бота
				messageText: messageText,
				messageType: 'TEXT',
			}).unwrap()

			setMessageText('')
			refetch() // Обновляем список сразу
		} catch (error) {
			console.error('Failed to send message:', error)
		}
	}

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault()
			handleSend()
		}
	}

	// Подготовка сообщений (разворачиваем, если API отдает новые сверху)
	const messages = [...(chatData?.messages || [])].reverse()

	return (
		<Dialog
			open={modal.visible}
			onClose={handleClose}
			TransitionProps={{
				onExited: () => modal.remove(), // Удаляем из DOM после закрытия
			}}
			maxWidth='md'
			fullWidth
			PaperProps={{
				sx: {
					height: '85vh',
					display: 'flex',
					flexDirection: 'column',
				},
			}}
		>
			{/* --- Header --- */}
			<DialogTitle
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					borderBottom: '1px solid #e2e8f0',
					bgcolor: '#f8fafc',
					py: 1.5,
				}}
			>
				<Stack direction='row' spacing={2} alignItems='center'>
					<Avatar sx={{ bgcolor: '#0f172a' }}>
						{user.firstName?.[0]?.toUpperCase() || 'U'}
					</Avatar>
					<Box>
						<Typography
							variant='subtitle1'
							fontWeight={600}
							lineHeight={1.2}
						>
							{user.firstName} {user.lastName}
						</Typography>
						<Typography variant='caption' color='text.secondary'>
							@{user.username || 'no_username'} • ID:{' '}
							{user.telegramId}
						</Typography>
					</Box>
				</Stack>
				<IconButton onClick={handleClose}>
					<Close />
				</IconButton>
			</DialogTitle>

			{/* --- Chat Body --- */}
			<DialogContent
				ref={scrollRef}
				sx={{
					flex: 1,
					bgcolor: '#f1f5f9',
					p: 3,
					display: 'flex',
					flexDirection: 'column',
					gap: 2,
					overflowY: 'auto',
				}}
			>
				{isLoading ? (
					<Box
						display='flex'
						justifyContent='center'
						alignItems='center'
						height='100%'
					>
						<CircularProgress />
					</Box>
				) : messages.length === 0 ? (
					<Box
						display='flex'
						justifyContent='center'
						alignItems='center'
						height='100%'
						color='text.secondary'
					>
						<Typography variant='body2'>
							История сообщений пуста
						</Typography>
					</Box>
				) : (
					messages.map((msg, index) => {
						const isBot = msg.senderType === 'BOT' // BOT = Админ
						return (
							<Box
								key={msg.id || index}
								sx={{
									display: 'flex',
									justifyContent: isBot
										? 'flex-end'
										: 'flex-start',
									gap: 1.5,
								}}
							>
								{/* Аватар юзера слева */}
								{!isBot && (
									<Avatar
										sx={{
											width: 32,
											height: 32,
											bgcolor: '#94a3b8',
										}}
									>
										<Person sx={{ fontSize: 18 }} />
									</Avatar>
								)}

								<Box
									sx={{
										maxWidth: '70%',
										display: 'flex',
										flexDirection: 'column',
										alignItems: isBot
											? 'flex-end'
											: 'flex-start',
									}}
								>
									<Paper
										elevation={0}
										sx={{
											p: 1.5,
											borderRadius: 2,
											bgcolor: isBot
												? '#3b82f6'
												: '#ffffff',
											color: isBot ? '#fff' : '#1e293b',
											// Скругление уголков для стиля "баббла"
											borderTopLeftRadius: !isBot ? 0 : 2,
											borderTopRightRadius: isBot ? 0 : 2,
											boxShadow:
												'0 1px 2px rgba(0,0,0,0.05)',
										}}
									>
										<Typography
											variant='body2'
											sx={{ whiteSpace: 'pre-wrap' }}
										>
											{msg.messageText}
										</Typography>
									</Paper>
									<Typography
										variant='caption'
										sx={{
											mt: 0.5,
											color: 'text.secondary',
											fontSize: '0.7rem',
										}}
									>
										{msg.createdAt
											? new Date(
													msg.createdAt,
												).toLocaleString('ru-RU', {
													day: '2-digit',
													month: '2-digit',
													hour: '2-digit',
													minute: '2-digit',
												})
											: ''}
									</Typography>
								</Box>

								{/* Аватар бота справа */}
								{isBot && (
									<Avatar
										sx={{
											width: 32,
											height: 32,
											bgcolor: '#3b82f6',
										}}
									>
										<SmartToy sx={{ fontSize: 18 }} />
									</Avatar>
								)}
							</Box>
						)
					})
				)}
			</DialogContent>

			{/* --- Footer (Input) --- */}
			<DialogActions
				sx={{
					p: 2,
					borderTop: '1px solid #e2e8f0',
					bgcolor: '#fff',
				}}
			>
				<TextField
					fullWidth
					placeholder='Написать сообщение...'
					variant='outlined'
					size='small'
					multiline
					maxRows={3}
					value={messageText}
					onChange={(e) => setMessageText(e.target.value)}
					onKeyDown={handleKeyDown}
					disabled={isSending}
					sx={{
						'& .MuiOutlinedInput-root': {
							borderRadius: 3,
						},
					}}
				/>
				<Button
					variant='contained'
					onClick={handleSend}
					disabled={!messageText.trim() || isSending}
					sx={{
						borderRadius: 3,
						height: 40,
						minWidth: 50,
						bgcolor: '#0f172a',
					}}
				>
					{isSending ? (
						<CircularProgress size={20} color='inherit' />
					) : (
						<Send />
					)}
				</Button>
			</DialogActions>
		</Dialog>
	)
})

export default ChatUserModal

import { create, useModal } from '@ebay/nice-modal-react'
import { useState } from 'react'
import {
	Box,
	Button,
	TextField,
	CircularProgress,
	Typography,
	Divider,
} from '@mui/material'
import { useTranslation } from 'react-i18next'

import Select from '../../../shared/ui/select/Select'
import StatusDialog from '../../../shared/ui/status-dialog/StatusDialog'
import { toastUtils } from '../../../shared/lib/toster'
import { getErrorMessage } from '../../../shared/lib/error.helper'
import {
	GrantSubscriptionRequest,
	useGrantSubscriptionMutation,
} from '#entities/subscriptions/api/api'

const PLAN_OPTIONS = [
	{ label: '1 неделя (150 сом)', value: 'ONE_WEEK' },
	{ label: '1 месяц (500 сом)', value: 'ONE_MONTH' },
	{ label: '3 месяца (1200 сом)', value: 'THREE_MONTHS' },
] as const

const GrantSubscriptionModal = create(() => {
	const modal = useModal()
	const { t } = useTranslation(['common'])

	const [form, setForm] = useState<GrantSubscriptionRequest>({
		telegramId: undefined,
		username: '',
		planType: 'ONE_WEEK',
		reason: '',
	})

	const [grantSubscription, { reset, status }] =
		useGrantSubscriptionMutation()

	const handleInputChange = (
		field: keyof GrantSubscriptionRequest,
		value: any,
	) => {
		setForm((prev) => ({ ...prev, [field]: value }))
	}

	const onConfirm = async () => {
		try {
			if (!form.telegramId && !form.username) {
				toastUtils.error('Введите Telegram ID или Username')
				return
			}
			if (!form.planType) {
				toastUtils.error('Выберите тип подписки')
				return
			}

			const requestData: GrantSubscriptionRequest = {
				...form,
				telegramId: form.telegramId
					? Number(form.telegramId)
					: undefined,
				username: form.username || undefined,
			}

			await grantSubscription(requestData).unwrap()
			toastUtils.success('Подписка успешно выдана')
			modal.resolve()
			modal.hide()
		} catch (e) {
			toastUtils.error(getErrorMessage(e))
		}
	}

	const onCancel = () => modal.hide()

	const content = (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: 2.5,
				mt: 1,
				// fullWidth на мобайле, фиксированная ширина на десктопе
				width: '100%',
				minWidth: { sm: 400 },
			}}
		>
			<Typography variant='body2' color='text.secondary'>
				Выдайте подписку пользователю бесплатно
			</Typography>

			<TextField
				label='Telegram ID'
				placeholder='Например: 123456789'
				fullWidth
				size='small'
				type='number'
				value={form.telegramId || ''}
				onChange={(e) =>
					handleInputChange('telegramId', e.target.value)
				}
			/>

			<Divider sx={{ fontSize: '0.75rem', color: 'text.disabled' }}>
				или
			</Divider>

			<TextField
				label='Username'
				placeholder='Например: @username'
				fullWidth
				size='small'
				value={form.username}
				onChange={(e) => handleInputChange('username', e.target.value)}
			/>

			<Select<any>
				label='Тип подписки'
				required
				options={PLAN_OPTIONS}
				getOptionLabel={(opt) => opt.label}
				getOptionValue={(opt) => opt.value}
				value={PLAN_OPTIONS.find((p) => p.value === form.planType)}
				onChange={(val) => handleInputChange('planType', val?.value)}
			/>

			<TextField
				label='Причина (опционально)'
				placeholder='Например: Бонус за приглашение друзей'
				fullWidth
				multiline
				rows={3}
				size='small'
				value={form.reason}
				onChange={(e) => handleInputChange('reason', e.target.value)}
			/>

			<Box
				sx={{
					display: 'flex',
					justifyContent: 'flex-end',
					gap: 2,
					mt: 1,
					// На мобайле — кнопки во всю ширину
					flexDirection: { xs: 'column-reverse', sm: 'row' },
				}}
			>
				<Button
					onClick={onCancel}
					color='inherit'
					fullWidth={false}
					sx={{ width: { xs: '100%', sm: 'auto' } }}
				>
					{t('common:cancel', 'Отмена')}
				</Button>
				<Button
					onClick={onConfirm}
					variant='contained'
					disabled={status === 'pending'}
					sx={{
						bgcolor: '#0f172a',
						width: { xs: '100%', sm: 'auto' },
					}}
					startIcon={
						status === 'pending' ? (
							<CircularProgress size={20} color='inherit' />
						) : null
					}
				>
					Выдать подписку
				</Button>
			</Box>
		</Box>
	)

	return (
		<StatusDialog
			title='🎁 Выдать подписку'
			open={modal.visible}
			onClose={onCancel}
			slotProps={{ transition: { onExited: reset } }}
			status={status}
			content={{
				uninitialized: { description: content, actions: null },
			}}
			maxWidth='sm'
			// fullScreen на очень маленьких экранах можно включить через sx если StatusDialog поддерживает
		/>
	)
})

export default GrantSubscriptionModal

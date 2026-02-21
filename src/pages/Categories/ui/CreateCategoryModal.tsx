import { create, useModal } from '@ebay/nice-modal-react'
import { useState } from 'react'
import { Box, Button, TextField, FormControlLabel, Switch } from '@mui/material'
import StatusDialog from '../../../shared/ui/status-dialog/StatusDialog'
import { toastUtils } from '../../../shared/lib/toster'
import { getErrorMessage } from '../../../shared/lib/error.helper'
import { useCreateCategoryMutation } from '#entities/categories/api/api'

const CreateCategoryModal = create(() => {
	const modal = useModal()
	const [createCategory, { status, reset }] = useCreateCategoryMutation()

	const [form, setForm] = useState({
		nameRu: '',
		nameKy: '',
		nameEn: '',
		icon: '',
		isActive: true,
	})

	const handleConfirm = async () => {
		if (!form.nameRu)
			return toastUtils.error('Название на русском обязательно')
		try {
			await createCategory(form).unwrap()
			toastUtils.success('Категория создана')
			modal.hide()
		} catch (e) {
			toastUtils.error(getErrorMessage(e))
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
			<TextField
				label='Название (RU)'
				fullWidth
				size='small'
				value={form.nameRu}
				onChange={(e) => setForm({ ...form, nameRu: e.target.value })}
			/>
			<TextField
				label='Название (KY)'
				fullWidth
				size='small'
				value={form.nameKy}
				onChange={(e) => setForm({ ...form, nameKy: e.target.value })}
			/>
			<TextField
				label='Иконка (Emoji или класс)'
				fullWidth
				size='small'
				value={form.icon}
				onChange={(e) => setForm({ ...form, icon: e.target.value })}
				placeholder='например: 💼'
			/>
			<FormControlLabel
				control={
					<Switch
						checked={form.isActive}
						onChange={(e) =>
							setForm({ ...form, isActive: e.target.checked })
						}
					/>
				}
				label='Активна'
			/>
			<Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
				<Button onClick={() => modal.hide()} color='inherit'>
					Отмена
				</Button>
				<Button variant='contained' onClick={handleConfirm}>
					Создать
				</Button>
			</Box>
		</Box>
	)

	return (
		<StatusDialog
			title='Новая категория'
			open={modal.visible}
			onClose={() => modal.hide()}
			status={status}
			slotProps={{ transition: { onExited: reset } }}
			content={{ uninitialized: { description: content, actions: null } }}
		/>
	)
})

export default CreateCategoryModal

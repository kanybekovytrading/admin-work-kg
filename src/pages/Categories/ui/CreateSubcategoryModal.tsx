import { create, useModal } from '@ebay/nice-modal-react'
import { useState } from 'react'
import { Box, Button, TextField, FormControlLabel, Switch } from '@mui/material'
import StatusDialog from '../../../shared/ui/status-dialog/StatusDialog'
import { toastUtils } from '../../../shared/lib/toster'
import { useCreateSubcategoryMutation } from '#entities/categories/api/api'

interface Props {
	categoryId: number
}

const CreateSubcategoryModal = create(({ categoryId }: Props) => {
	const modal = useModal()
	const [createSubcategory, { status, reset }] =
		useCreateSubcategoryMutation()

	const [form, setForm] = useState({
		nameRu: '',
		nameKy: '',
		nameEn: '',
		isActive: true,
	})

	const handleConfirm = async () => {
		if (!form.nameRu) return toastUtils.error('Название обязательно')
		try {
			await createSubcategory({ ...form, categoryId }).unwrap()
			toastUtils.success('Подкатегория добавлена')
			modal.hide()
		} catch (e) {
			toastUtils.error('Ошибка при создании')
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
				label='Название подкатегории (RU)'
				fullWidth
				size='small'
				value={form.nameRu}
				onChange={(e) => setForm({ ...form, nameRu: e.target.value })}
			/>
			<TextField
				label='Название подкатегории (KY)'
				fullWidth
				size='small'
				value={form.nameKy}
				onChange={(e) => setForm({ ...form, nameKy: e.target.value })}
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
					Добавить
				</Button>
			</Box>
		</Box>
	)

	return (
		<StatusDialog
			title='Новая подкатегория'
			open={modal.visible}
			onClose={() => modal.hide()}
			status={status}
			slotProps={{ transition: { onExited: reset } }}
			content={{ uninitialized: { description: content, actions: null } }}
		/>
	)
})

export default CreateSubcategoryModal

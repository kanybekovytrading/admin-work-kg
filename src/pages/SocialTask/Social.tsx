import React, { useMemo } from 'react'
import { Box, Typography, Button, Paper } from '@mui/material'
import { Add } from '@mui/icons-material'

// UI компоненты
import Table from '#shared/ui/table/Table'
import {
	SocialTask,
	useDeleteTaskMutation,
	useGetAllTasksQuery,
	useUpdateTaskMutation,
} from '#entities/social-task/api/api'
import { toastUtils } from '#shared/lib/toster'
import { getSocialTasksColumns } from './lib/getSocialTasksColumns'
import NiceModal from '@ebay/nice-modal-react'
import CreateTaskModal from './ui/CreateTaskModal'

export const Social: React.FC = () => {
	const { data: tasks = [], isLoading, isFetching } = useGetAllTasksQuery()
	const [updateTask] = useUpdateTaskMutation()
	const [deleteTask] = useDeleteTaskMutation()

	const handleToggleActive = async (task: SocialTask) => {
		try {
			await updateTask({
				id: task.id!,
				createSocialTaskRequest: {
					...task,
					isActive: !task.isActive,
				},
			}).unwrap()
			toastUtils.success('Статус изменен')
		} catch (e) {
			toastUtils.error('Ошибка при обновлении')
		}
	}

	const handleDelete = async (id: number) => {
		if (window.confirm('Удалить задание?')) {
			await deleteTask(id).unwrap()
			toastUtils.success('Удалено')
		}
	}

	const handleViewStats = (id: number) => {
		console.log('Просмотр статистики для задачи:', id)
		// Здесь можно открыть модалку со счетчиком выполнений
	}

	const handleCreate = () => {
		NiceModal.show(CreateTaskModal)
	}
	const columns = useMemo(
		() =>
			getSocialTasksColumns({
				onDelete: handleDelete,
				onToggleActive: handleToggleActive,
				onViewStats: handleViewStats,
			}),
		[],
	)

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<Typography
					variant='h5'
					sx={{ fontWeight: 800, color: '#1e293b' }}
				>
					Социальные задания
				</Typography>
				<Button
					variant='contained'
					startIcon={<Add />}
					sx={{ bgcolor: '#0f172a', borderRadius: 2 }}
					onClick={handleCreate}
				>
					Добавить задание
				</Button>
			</Box>

			<Paper sx={{ boxShadow: 'none', backgroundColor: 'transparent' }}>
				<Table<SocialTask>
					columns={columns}
					data={tasks}
					loading={isLoading || isFetching}
				/>
			</Paper>
		</Box>
	)
}

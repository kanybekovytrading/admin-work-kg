import React, { useState, useMemo } from 'react'
import {
	Grid,
	Paper,
	Typography,
	Box,
	Button,
	Divider,
	useMediaQuery,
	useTheme,
	IconButton,
} from '@mui/material'
import { Add, ArrowBack } from '@mui/icons-material'

import Table from '#shared/ui/table/Table'
import {
	useDeleteCategoryMutation,
	useDeleteSubcategoryMutation,
	useGetAllCategoriesQuery,
	useGetSubcategoriesByCategory1Query,
} from '#entities/categories/api/api'
import { toastUtils } from '#shared/lib/toster'
import {
	getCategoryColumns,
	getSubcategoryColumns,
} from './lib/getCategoryColumns'
import CreateSubcategoryModal from './ui/CreateSubcategoryModal'
import NiceModal from '@ebay/nice-modal-react'
import CreateCategoryModal from './ui/CreateCategoryModal'

export const Categories: React.FC = () => {
	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down('md'))

	const [selectedCatId, setSelectedCatId] = useState<number | null>(null)
	// На мобайле показываем либо категории, либо подкатегории
	const [mobileView, setMobileView] = useState<
		'categories' | 'subcategories'
	>('categories')

	const { data: categories = [], isLoading: isCatsLoading } =
		useGetAllCategoriesQuery()
	const { data: subcategories = [], isFetching: isSubsLoading } =
		useGetSubcategoriesByCategory1Query(selectedCatId!, {
			skip: !selectedCatId,
		})

	const [deleteCategory] = useDeleteCategoryMutation()
	const [deleteSubcategory] = useDeleteSubcategoryMutation()

	const handleDeleteCat = async (id: number) => {
		if (window.confirm('Удалить категорию и все её подкатегории?')) {
			await deleteCategory(id).unwrap()
			if (selectedCatId === id) {
				setSelectedCatId(null)
				setMobileView('categories')
			}
			toastUtils.success('Категория удалена')
		}
	}

	const handleDeleteSub = async (id: number) => {
		if (window.confirm('Удалить подкатегорию?')) {
			await deleteSubcategory(id).unwrap()
			toastUtils.success('Подкатегория удалена')
		}
	}

	const handleCatRowClick = (row: any) => {
		setSelectedCatId(row.id!)
		if (isMobile) setMobileView('subcategories')
	}

	const handleBackToCategories = () => {
		setMobileView('categories')
		setSelectedCatId(null)
	}

	const catColumns = useMemo(
		() => getCategoryColumns(() => {}, handleDeleteCat),
		[selectedCatId],
	)

	const subColumns = useMemo(
		() => getSubcategoryColumns(() => {}, handleDeleteSub),
		[],
	)

	const selectedCatName = categories.find(
		(c) => c.id === selectedCatId,
	)?.nameRu

	return (
		<Box sx={{ p: 1 }}>
			<Typography
				variant='h5'
				sx={{
					fontWeight: 800,
					mb: 4,
					fontSize: { xs: '1.2rem', sm: '1.5rem' },
				}}
			>
				Настройка категорий
			</Typography>

			<Grid container spacing={3}>
				{/* ЛЕВАЯ ПАНЕЛЬ: КАТЕГОРИИ */}
				{/* На мобайле скрываем если смотрим подкатегории */}
				<Grid
					item
					xs={12}
					md={5}
					sx={{
						display:
							isMobile && mobileView === 'subcategories'
								? 'none'
								: 'block',
					}}
				>
					<Paper
						sx={{
							p: 0,
							borderRadius: 4,
							overflow: 'hidden',
							border: '1px solid #e2e8f0',
							boxShadow: 'none',
						}}
					>
						<Box
							sx={{
								p: 2,
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							<Typography variant='h6' sx={{ fontWeight: 700 }}>
								Категории
							</Typography>
							<Button
								variant='contained'
								size='small'
								startIcon={<Add />}
								onClick={() =>
									NiceModal.show(CreateCategoryModal)
								}
							>
								Добавить
							</Button>
						</Box>
						<Divider />
						<Box sx={{ overflowX: 'auto' }}>
							<Table
								columns={catColumns}
								data={categories}
								loading={isCatsLoading}
								onRowClick={handleCatRowClick}
							/>
						</Box>
					</Paper>
				</Grid>

				{/* ПРАВАЯ ПАНЕЛЬ: ПОДКАТЕГОРИИ */}
				{/* На мобайле скрываем если смотрим категории */}
				<Grid
					item
					xs={12}
					md={7}
					sx={{
						display:
							isMobile && mobileView === 'categories'
								? 'none'
								: 'block',
					}}
				>
					<Paper
						sx={{
							p: 0,
							borderRadius: 4,
							overflow: 'hidden',
							border: '1px solid #e2e8f0',
							boxShadow: 'none',
							minHeight: 400,
						}}
					>
						{selectedCatId ? (
							<>
								<Box
									sx={{
										p: 2,
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
										bgcolor: '#f8fafc',
										flexWrap: 'wrap',
										gap: 1,
									}}
								>
									<Box
										sx={{
											display: 'flex',
											alignItems: 'center',
											gap: 1,
										}}
									>
										{/* Кнопка "назад" только на мобайле */}
										{isMobile && (
											<IconButton
												size='small'
												onClick={handleBackToCategories}
											>
												<ArrowBack fontSize='small' />
											</IconButton>
										)}
										<Box>
											<Typography
												variant='h6'
												sx={{
													fontWeight: 700,
													fontSize: {
														xs: '1rem',
														sm: '1.25rem',
													},
												}}
											>
												{selectedCatName}
											</Typography>
											<Typography
												variant='caption'
												color='text.secondary'
											>
												Управление подкатегориями
											</Typography>
										</Box>
									</Box>
									<Button
										variant='outlined'
										size='small'
										startIcon={<Add />}
										onClick={() =>
											NiceModal.show(
												CreateSubcategoryModal,
												{ categoryId: selectedCatId },
											)
										}
									>
										{isMobile
											? 'Добавить'
											: 'Добавить подкатегорию'}
									</Button>
								</Box>
								<Divider />
								<Box sx={{ overflowX: 'auto' }}>
									<Table
										columns={subColumns}
										data={subcategories}
										loading={isSubsLoading}
									/>
								</Box>
							</>
						) : (
							<Box
								sx={{
									height: '100%',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									flexDirection: 'column',
									color: '#94a3b8',
									p: 4,
									minHeight: 300,
								}}
							>
								<Typography align='center'>
									Выберите категорию слева, чтобы увидеть
									список подкатегорий
								</Typography>
							</Box>
						)}
					</Paper>
				</Grid>
			</Grid>
		</Box>
	)
}

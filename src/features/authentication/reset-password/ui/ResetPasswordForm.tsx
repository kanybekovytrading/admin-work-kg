// import { zodResolver } from '@hookform/resolvers/zod'

// import Visibility from '@mui/icons-material/Visibility'
// import VisibilityOff from '@mui/icons-material/VisibilityOff'
// import { Box, IconButton } from '@mui/material'
// import Typography from '@mui/material/Typography'
// import { FC, useState } from 'react'

// import { useTranslation } from 'react-i18next'
// import { StyledFormWrap } from '#features/authentication/login/ui/components.ts'
// import {
// 	mapToResetPasswordApiData,
// 	ResetPasswordFormData,
// 	resetPasswordSchema,
// } from '#features/authentication/reset-password/model/model.ts'
// import { onlyNumberInput } from '#shared/lib/general.helper.ts'
// import { useCustomForm } from '#shared/lib/hooks/useCustomForm'
// import { Input } from '#shared/ui/input/Input'

// type LoginProps = {
// 	onSubmit: (data: any, reset: () => void) => void
// }

// export const ResetPasswordForm: FC<LoginProps> = ({ onSubmit }) => {
// 	const [showPassword, setShowPassword] = useState(false)
// 	const [showConfirm, setShowConfirm] = useState(false)
// 	const handleClickShowPassword = () => setShowPassword((show) => !show)
// 	const handleClickShowConfirm = () => setShowConfirm((show) => !show)

// 	const { t } = useTranslation(['auth', 'common'])

// 	const methods = useCustomForm<ResetPasswordFormData>({
// 		resolver: zodResolver(resetPasswordSchema(t)),
// 		mode: 'all',
// 	})

// 	const {
// 		register,
// 		formState: { errors, isValid, isSubmitting },
// 		reset,
// 		handleSubmit,
// 	} = methods

// 	const submitCredentials = async (data: ResetPasswordFormData) => {
// 		const apiData = await mapToResetPasswordApiData(data)
// 		return onSubmit(apiData, reset)
// 	}

// 	return (
// 		<StyledFormWrap
// 			id='reset-password-form'
// 			onSubmit={handleSubmit(submitCredentials)}
// 		>
// 			<Box>
// 				<Box
// 					display='flex'
// 					alignItems='center'
// 					gap={'8px'}
// 					flexDirection='column'
// 					marginBottom='22px'
// 				>
// 					<Typography
// 						id='reset-password-title'
// 						textAlign='center'
// 						fontWeight={600}
// 						fontSize='20px'
// 						color='#2A2F34'
// 					>
// 						{t('setPassword.title')}
// 					</Typography>
// 					<Typography
// 						id='reset-password-description'
// 						textAlign='center'
// 						fontWeight={400}
// 						fontSize='14px'
// 					>
// 						{t('setPassword.description')}
// 					</Typography>
// 				</Box>

// 				<Input
// 					autoFocus
// 					label={t('common:inn')}
// 					placeholder={t('common:inn')}
// 					error={errors.inn}
// 					inputProps={{ maxLength: 14 }}
// 					{...register('inn')}
// 					onInput={onlyNumberInput}
// 				/>
// 				<Input
// 					id='password'
// 					type={showPassword ? 'text' : 'password'}
// 					label={t('password')}
// 					placeholder={t('password')}
// 					error={errors.password}
// 					{...register('password')}
// 					endAdornment={
// 						<IconButton
// 							aria-label='toggle password visibility'
// 							onClick={handleClickShowPassword}
// 							edge='end'
// 						>
// 							{showPassword ? <VisibilityOff /> : <Visibility />}
// 						</IconButton>
// 					}
// 				/>
// 				<Input
// 					id='confirm'
// 					type={showConfirm ? 'text' : 'password'}
// 					label={t('setPassword.confirm')}
// 					placeholder={t('setPassword.confirm')}
// 					error={errors.confirm}
// 					{...register('confirm')}
// 					endAdornment={
// 						<IconButton
// 							aria-label='toggle confirm password visibility'
// 							onClick={handleClickShowConfirm}
// 							edge='end'
// 						>
// 							{showConfirm ? <VisibilityOff /> : <Visibility />}
// 						</IconButton>
// 					}
// 				/>

// 				<AuthSubmitButton
// 					id='submit-btn'
// 					isLoading={methods.formState.isSubmitting}
// 					disabled={!isValid || isSubmitting}
// 					type='submit'
// 					variant='contained'
// 				>
// 					{t('setPassword.setPassword')}
// 				</AuthSubmitButton>
// 			</Box>
// 		</StyledFormWrap>
// 	)
// }

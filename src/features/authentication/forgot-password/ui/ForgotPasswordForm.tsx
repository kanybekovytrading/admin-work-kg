// import { zodResolver } from '@hookform/resolvers/zod'

// import { Box } from '@mui/material'
// import Typography from '@mui/material/Typography'
// import { FC } from 'react'

// import { useTranslation } from 'react-i18next'
// import {
// 	ForgotPasswordApiData,
// 	ForgotPasswordFormData,
// 	forgotPasswordSchema,
// } from '#features/authentication/forgot-password/model/model.ts'
// import GoBackButton from '#features/authentication/forgot-password/ui/GoBackButton.tsx'
// // import { AuthForm, AuthSubmitButton } from "#features/authentication/login";
// import { StyledFormWrap } from '#features/authentication/login/ui/components.ts'
// import { onlyNumberInput } from '#shared/lib/general.helper.ts'
// import { useCustomForm } from '#shared/lib/hooks/useCustomForm'
// import { Input } from '#shared/ui/input/Input'

// type LoginProps = {
// 	onSubmit: (data: ForgotPasswordApiData, reset: () => void) => void
// }

// export const ForgotPasswordForm: FC<LoginProps> = ({ onSubmit }) => {
// 	const { t } = useTranslation(['auth', 'common'])

// 	const methods = useCustomForm<ForgotPasswordFormData>({
// 		resolver: zodResolver(forgotPasswordSchema(t)),
// 	})

// 	const {
// 		register,
// 		formState: { errors, isValid, isSubmitting },
// 		reset,
// 		handleSubmit,
// 	} = methods

// 	const submitCredentials = (data: ForgotPasswordFormData) => {
// 		return onSubmit(data, reset)
// 	}

// 	return (
// 		<StyledFormWrap>
// 			<AuthForm
// 				id='forgot-password-form'
// 				onSubmit={handleSubmit(submitCredentials)}
// 			>
// 				<Box
// 					display='flex'
// 					alignItems='center'
// 					gap={'8px'}
// 					flexDirection='column'
// 					marginBottom='10px'
// 				>
// 					<GoBackButton />
// 					<Typography
// 						textAlign='center'
// 						fontWeight={600}
// 						fontSize='20px'
// 						color='#2A2F34'
// 					>
// 						{t('restore.title')}
// 					</Typography>
// 					<Typography textAlign='center' fontSize='14px'>
// 						{t('restore.description')}
// 					</Typography>
// 				</Box>

// 				<Input
// 					id='inn'
// 					autoFocus
// 					label={t('common:inn')}
// 					placeholder={t('common:inn')}
// 					error={errors.inn}
// 					inputProps={{ maxLength: 14 }}
// 					{...register('inn')}
// 					onInput={onlyNumberInput}
// 				/>

// 				<AuthSubmitButton
// 					id='submit-btn'
// 					isLoading={methods.formState.isSubmitting}
// 					disabled={!isValid || isSubmitting}
// 					type='submit'
// 					variant='contained'
// 				>
// 					{t('restore.restorePassword')}
// 				</AuthSubmitButton>
// 			</AuthForm>
// 		</StyledFormWrap>
// 	)
// }

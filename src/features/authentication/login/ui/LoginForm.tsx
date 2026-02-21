import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { Box, IconButton } from '@mui/material'
import Typography from '@mui/material/Typography'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { StyledForm, StyledFormWrap, SubmitButton } from './components'
import { useCustomForm } from '#shared/lib/hooks/useCustomForm'
import { Input } from '#shared/ui/input/Input'
import Link from '#shared/ui/link/Link'
import { keyPaths } from '#shared/consts/routing'
import { LoginRequest } from '#entities/auth/api/generated'
import { FieldError } from 'react-hook-form'

type LoginFormProps = {
	onSubmit: (data: LoginRequest) => Promise<void>
	isLoading: boolean
}

export const LoginForm: FC<LoginFormProps> = ({ onSubmit, isLoading }) => {
	const { t } = useTranslation(['auth', 'common'])
	const [showPassword, setShowPassword] = useState(false)

	const handleClickShowPassword = () => setShowPassword(!showPassword)

	// Инициализация формы с типами LoginRequest
	const methods = useCustomForm<LoginRequest>({
		mode: 'onChange',
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
	} = methods

	return (
		<StyledFormWrap>
			<StyledForm
				id='login-form'
				// handleSubmit вызовет onSubmit, который пришел из LoginPage
				onSubmit={handleSubmit(onSubmit)}
			>
				<Box
					display='flex'
					gap={'14px'}
					flexDirection='column'
					marginBottom='28px'
				>
					<Typography
						id='login-title'
						textAlign='center'
						fontWeight={600}
						fontSize='24px'
						color='#111827'
					>
						{t('youkoso')}
					</Typography>
					<Typography
						id='login-description'
						fontSize='14px'
						textAlign='center'
						color='#6B7280'
					>
						{t('loginToContinue')}
					</Typography>
				</Box>

				<Input
					id='email'
					type='email'
					autoFocus
					label={t('common:email')}
					placeholder='admin@work.kg'
					error={errors.email as FieldError}
					// helperText={errors.email?.message}
					{...register('email', {
						required: t('common:requiredField'),
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							message: t('common:invalidEmail'),
						},
					})}
				/>

				<Input
					id='password'
					type={showPassword ? 'text' : 'password'}
					label={t('password')}
					placeholder={t('password')}
					error={errors.password as FieldError}
					// helperText={errors.password?.message}
					{...register('password', {
						required: t('common:requiredField'),
						minLength: { value: 4, message: t('common:tooShort') },
					})}
					endAdornment={
						<IconButton
							aria-label='toggle password visibility'
							onClick={handleClickShowPassword}
							edge='end'
						>
							{showPassword ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					}
				/>

				<Box display='flex' justifyContent='flex-end'>
					<Link
						sx={{ width: 'fit-content', fontSize: '14px' }}
						id='forgot-password-link'
						to={keyPaths.forgotPassword()}
						color='#2563EB'
					>
						{t('forgot-password')}
					</Link>
				</Box>

				<SubmitButton
					id='submit-btn'
					// Используем isLoading из пропсов (состояние мутации в LoginPage)
					isLoading={isLoading}
					disabled={!isValid || isLoading}
					type='submit'
					variant='contained'
					sx={{ mt: 1 }}
				>
					{t('common:continue')}
				</SubmitButton>
			</StyledForm>
		</StyledFormWrap>
	)
}

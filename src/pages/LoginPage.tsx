import Stack from '@mui/material/Stack'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {
	STORAGE_TOKEN_KEY,
	SCRIPT_RETRY_COUNT,
} from '#shared/consts/localStorage.ts'
import { keyPaths } from '#shared/consts/routing.ts'

import LoginPageHeader from './LoginPageHeader'
import LoginPageFooter from './LoginPageFooter'
import { authApi, LoginRequest } from '#entities/auth/api/generated'
import { LoginForm } from '#features/authentication/login/ui/LoginForm'
import { setAuthData, setIsAuthorized, setTokens } from '#entities/auth/slice'

function LoginPage() {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [login, { isLoading }] = authApi.useLoginMutation()

	// В LoginPage.tsx в функции onSubmit:

	const onSubmit = async (credentials: LoginRequest) => {
		try {
			const response = await login(credentials).unwrap()

			// 1. Сохраняем токены
			localStorage.setItem(STORAGE_TOKEN_KEY, response.token || '')
			localStorage.setItem(
				SCRIPT_RETRY_COUNT,
				response.refreshToken || '',
			)

			// 2. Сохраняем данные пользователя (имя, почту и т.д.) как строку
			const userData = {
				email: response.email,
				name: response.name,
				role: response.role,
				adminId: response.adminId,
			}
			localStorage.setItem('user_data', JSON.stringify(userData))

			// 3. Обновляем Redux
			dispatch(
				setTokens({
					token: response.token,
					refreshToken: response.refreshToken,
				}),
			)
			dispatch(setAuthData(userData))
			dispatch(setIsAuthorized(true))

			navigate(keyPaths.dashboard(), { replace: true })
		} catch (err) {
			// обработка ошибок
		}
	}
	return (
		<Stack
			id='login-page'
			justifyContent='center'
			alignItems='center'
			height='100vh'
			spacing={2}
			sx={{ bgcolor: '#F9FAFB' }} // Светлый фон как в современных админках
		>
			<LoginPageHeader />

			<LoginForm onSubmit={onSubmit} isLoading={isLoading} />

			<LoginPageFooter />
		</Stack>
	)
}

export default LoginPage

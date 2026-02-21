import { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { keyPaths } from '#shared/consts/routing.ts'
import { selectIsAuthorized } from '#entities/auth/slice'

type AuthorizedProps = {
	children: ReactElement
}

function AuthorizedGuard({ children }: Readonly<AuthorizedProps>) {
	const isAuthorized = useSelector(selectIsAuthorized)

	// Если пользователь УЖЕ авторизован, ему не нужно видеть страницу логина.
	// Отправляем его на Дашборд.
	if (isAuthorized) {
		return <Navigate to={keyPaths.dashboard()} replace={true} />
	}

	return children
}

export default AuthorizedGuard

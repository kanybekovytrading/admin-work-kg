import { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { keyPaths } from '#shared/consts/routing.ts'
import { selectIsAuthorized } from '#entities/auth/slice'

type UnauthorizedProps = {
	children: ReactElement
}

function UnauthorizedGuard({ children }: Readonly<UnauthorizedProps>) {
	const isAuthorized = useSelector(selectIsAuthorized)

	// Если пользователь НЕ авторизован, он не может видеть внутренние страницы.
	// Отправляем его на Логин.
	if (!isAuthorized) {
		return <Navigate to={keyPaths.login()} replace={true} />
	}

	// Если авторизован — показываем внутренний контент (BaseLayout / Страницы)
	return children
}

export default UnauthorizedGuard

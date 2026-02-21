import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	STORAGE_TOKEN_KEY,
	SCRIPT_RETRY_COUNT,
} from '#shared/consts/localStorage.ts'
import {
	selectIsAuthorized,
	setAuthData,
	setIsAuthorized,
} from '#entities/auth/slice'

const UserProvider: FC = () => {
	const dispatch = useDispatch()
	const token = localStorage.getItem(STORAGE_TOKEN_KEY)
	const savedUser = localStorage.getItem('user_data')
	const is = useSelector(selectIsAuthorized)
	console.log(is, 'rrr')

	useEffect(() => {
		// 1. Проверяем, есть ли токен и данные пользователя в памяти браузера

		if (token && savedUser) {
			console.log('hiii')

			try {
				const userData = JSON.parse(savedUser)

				// 2. "Воскрешаем" данные в Redux
				dispatch(setAuthData(userData))
				dispatch(setIsAuthorized(true))
			} catch (e) {
				console.error('Ошибка парсинга данных пользователя', e)
			}
		}

		// Очистка технического ключа (как в вашем старом коде)
		localStorage.removeItem(SCRIPT_RETRY_COUNT)
	}, [dispatch, savedUser, token])

	return null
}

export default UserProvider

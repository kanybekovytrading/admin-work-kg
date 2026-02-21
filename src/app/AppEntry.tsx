import NiceModal from '@ebay/nice-modal-react'
import React, { lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import MUIThemeProvider from '#app/providers/ThemeProvider.tsx'
import { buildAppRoutes } from '#app/routes/AppRoutes.tsx'

import {
	// STORAGE_LEGAL_ID_KEY,
	STORAGE_TOKEN_KEY,
} from '#shared/consts/localStorage.ts'

import '#shared/locale/i18n.ts'
import CloseToastButton from '#shared/ui/toast/CloseToastButton'

import { appStore } from './store/appStore'
import { setTokens } from '#entities/auth/slice'
import UserProvider from './providers/UserProvider'
import '#index.css'

// import UserProvider from './providers/UserProvider'

// import '#index.css'

const ErrorFallback = lazy(
	() => import('#shared/ui/error-fallback/ErrorFallback'),
)

const root = document.getElementById('root') as HTMLElement

async function initApp() {
	try {
		const rawTokens = sessionStorage.getItem(STORAGE_TOKEN_KEY)
		if (!rawTokens) return

		const tokens = JSON.parse(rawTokens)
		appStore.dispatch(setTokens(tokens))
		// appStore.dispatch(setIsAuthorized(tokens))
	} catch (e) {
		console.log('unable to parse tokens!', e)
		sessionStorage.removeItem(STORAGE_TOKEN_KEY)
		sessionStorage.removeItem('STORAGE_LEGAL_ID_KEY')
	}

	return true
}

initApp()
	.then(() => {
		return ReactDOM.createRoot(root).render(
			<React.StrictMode>
				<Provider store={appStore}>
					<MUIThemeProvider>
						<NiceModal.Provider>
							<ErrorBoundary FallbackComponent={ErrorFallback}>
								<ToastContainer
									closeButton={CloseToastButton}
									hideProgressBar
									autoClose={4500}
									limit={3}
								/>
								{/* <UserProvider /> */}
								<RouterProvider router={buildAppRoutes()} />
								{/*<VersionProvider />*/}
							</ErrorBoundary>
						</NiceModal.Provider>
						<UserProvider />
					</MUIThemeProvider>
				</Provider>
			</React.StrictMode>,
		)
	})
	.catch((e) => console.error(e))

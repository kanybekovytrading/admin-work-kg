import { useState } from 'react'
import Layout from '#shared/ui/layout/Layout'
import { Header } from './Header'
import { SideBar } from './SideBar'

const BaseLayout = () => {
	const [mobileOpen, setMobileOpen] = useState(false)

	const handleDrawerToggle = () => {
		setMobileOpen((prev) => !prev)
	}

	return (
		<Layout
			sidebarSlot={
				<SideBar
					mobileOpen={mobileOpen}
					onDrawerToggle={handleDrawerToggle}
				/>
			}
			headerSlot={<Header onDrawerToggle={handleDrawerToggle} />}
		/>
	)
}

export { BaseLayout }

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import svgr from 'vite-plugin-svgr'

export default defineConfig(() => {
	return {
		plugins: [react(), svgr()],
		resolve: {
			alias: {
				'#public': path.resolve(__dirname, '/public'),
				'#': path.resolve(__dirname, 'src'),
				'#widgets': path.resolve(__dirname, 'src/widgets'),
				'#shared': path.resolve(__dirname, 'src/shared'),
			},
		},
		build: {
			outDir: 'dist',
		},
		base: '/',
	}
})

declare module '*.svg' {
	const content: React.FC<React.SVGProps<SVGElement>>
	export default content
}

declare const VERSION_CHECK_INTERVAL: number

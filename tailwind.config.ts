import type { Config } from 'tailwindcss'

const config: Config = {
	mode: 'jit',
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			colors: {
				black: '#1B1B1B',
				blue: '#46B8E9',
				purple: '#7e5bef',
				pink: '#ff49db',
				orange: '#F04F23',
				green: '#13ce66',
				yellow: '#ffc82c',
				'gray-dark': '#273444',
				gray: '#8492a6',
				'gray-light': '#d3dce6',
			},
			backgroundColor: {
				blue: '#1fb6ff',
			},
		},
	},
	plugins: [],
}
export default config

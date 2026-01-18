/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				primary: '#E50914',
				'background-light': '#f3f4f6',
				'background-dark': '#09090b',
				'surface-light': '#ffffff',
				'surface-dark': '#18181b'
			},
			fontFamily: {
				display: ['Inter', 'sans-serif'],
				body: ['Inter', 'sans-serif']
			}
		}
	},
	plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')]
};

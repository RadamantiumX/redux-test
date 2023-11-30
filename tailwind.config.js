/** @type {import('tailwindcss').Config} */
export default {
	content: [
		// Que mire los siguiente
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",

		// Path tremor node_modules
		"./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {},
	},
	plugins: [],
};

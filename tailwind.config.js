/** @type { import("tailwindcss").Config } */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			backgroundColor: {
				accent: {
					DEFAULT: "#303030",
					light: "#808080",
				},
			},
			fontFamily: {
				roboto: ["Roboto", "sans-serif"],
			},
		},
	},
	plugins: [import("tailwindcss-animate")],
};

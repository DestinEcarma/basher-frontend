import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@utils": "/src/utils",
			"@pages": "/src/pages",
			"@graphql": "/src/graphql",
			"@features": "/src/features",
			"@services": "/src/services",
			"@components": "/src/components",
		},
	},
});

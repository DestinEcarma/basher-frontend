import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@utils": "/src/utils",
			"@pages": "/src/pages",
			"@hooks": "/src/hooks",
			"@graphql": "/src/graphql",
			"@features": "/src/features",
			"@services": "/src/services",
			"@components": "/src/components",
		},
	},
});

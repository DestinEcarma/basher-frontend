import eslint from "@eslint/js";
import hooksPlugin from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

/** @type { import("eslint").Linter.Config[] } */
export default tseslint.config([
	eslint.configs.recommended,
	tseslint.configs.recommended,
	{
		ignores: ["dist", "apollo.config.cjs", "*.svg"],
		plugins: {
			"react-refresh": reactRefresh,
			"react-hooks": hooksPlugin,
		},
		rules: {
			"react-refresh/only-export-components": ["error", { allowConstantExport: true }],
		},
	},
]);

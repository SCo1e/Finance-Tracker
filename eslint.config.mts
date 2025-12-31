import tseslint from "typescript-eslint";
import obsidianmd from "eslint-plugin-obsidianmd";
import globals from "globals";
import { globalIgnores } from "eslint/config";
import importPlugin from "eslint-plugin-import";

export default tseslint.config(
	{
		files: ["**/*.{ts,tsx}"],

		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			},
			parserOptions: {
				tsconfigRootDir: import.meta.dirname,
				project: "./tsconfig.json",
				extraFileExtensions: [".json"]
			}
		},

		plugins: {
			import: importPlugin
		},

		settings: {
			"import/resolver": {
				typescript: {
					project: "./tsconfig.json"
				}
			}
		},

		rules: {
			/**
			 * React 17+ JSX runtime
			 */
			"react/react-in-jsx-scope": "off",

			/**
			 * Correct dependency validation
			 */
			"import/no-extraneous-dependencies": [
				"error",
				{
					dependencies: true,
					devDependencies: false
				}
			],

			/**
			 * Obsidian uses mixed execution contexts
			 */
			"no-undef": "off"
		}
	},

	// Obsidian recommended rules
	...obsidianmd.configs.recommended,

	// Global ignores
	globalIgnores([
		"node_modules",
		"dist",
		"main.js",
		"esbuild.config.mjs",
		"eslint.config.*",
		"version-bump.mjs",
		"versions.json"
	])
);

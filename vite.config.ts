import { defineConfig } from "vite";
import viteTsconfigPaths from "vite-tsconfig-paths";
import glsl from "vite-plugin-glsl";

export default defineConfig({
	plugins: [viteTsconfigPaths(), glsl()],
	server: {
		port: 3000,
	},
	resolve: {
		alias: {
			"@": "/src",
		},
	},
});

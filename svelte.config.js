import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter()
		// vite: {
		// 	resolve: {
		// 		alias: {
		// 			// $components: './src/components',
		// 			$lib: './src/lib',
		// 			// $stores: './src/stores',
		// 			$routes: './src/routes'
		// 			// $utils: './src/utils',
		// 		}
		// 	}
		// }
	}
};

export default config;

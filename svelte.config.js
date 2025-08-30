import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
			preprocess: [
			vitePreprocess(),
			mdsvex({
				extensions: ['.svx', '.md'],
				highlight: {
					highlighter: async (code, lang) => {
						// Use Prism.js for syntax highlighting with ES modules
						const Prism = await import('prismjs');
						await import('prismjs/components/prism-javascript');
						await import('prismjs/components/prism-typescript');
						await import('prismjs/components/prism-css');
						await import('prismjs/components/prism-json');
						await import('prismjs/components/prism-bash');
						await import('prismjs/components/prism-markdown');
						
						if (Prism.default.languages[lang]) {
							const highlighted = Prism.default.highlight(code, Prism.default.languages[lang], lang);
							return `<pre class="language-${lang}"><code class="language-${lang}">${highlighted}</code></pre>`;
						}
						return `<pre class="language-${lang}"><code class="language-${lang}">${code}</code></pre>`;
					}
				}
			})
		],

	extensions: ['.svelte', '.svx', '.md'],

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter()
	}
};

export default config;

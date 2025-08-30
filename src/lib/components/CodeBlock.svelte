<script lang="ts">
	import { onMount } from 'svelte';
	import Prism from 'prismjs';
	import 'prismjs/components/prism-javascript';
	import 'prismjs/components/prism-typescript';
	import 'prismjs/components/prism-css';
	import 'prismjs/components/prism-json';
	import 'prismjs/components/prism-bash';
	import 'prismjs/themes/prism-tomorrow.css';

	export let language: string;
	export let code: string;

	let codeElement: HTMLElement;

	// Copy code function
	function copyCode() {
		navigator.clipboard.writeText(code).then(() => {
			const button = document.querySelector('.copy-button') as HTMLButtonElement;
			if (button) {
				button.textContent = 'Copied!';
				setTimeout(() => {
					button.textContent = 'Copy';
				}, 2000);
			}
		});
	}

	onMount(() => {
		if (codeElement) {
			// Map language aliases
			const langMap: Record<string, string> = {
				'js': 'javascript',
				'ts': 'typescript',
				'shell': 'bash'
			};
			
			const prismLang = langMap[language.toLowerCase()] || language.toLowerCase();
			
			// Set the language class
			codeElement.className = `language-${prismLang}`;
			
			// Apply syntax highlighting
			try {
				if (Prism.languages[prismLang]) {
					Prism.highlightElement(codeElement);
				} else {
					// Fallback to auto-detection
					Prism.highlightElement(codeElement);
				}
			} catch (error) {
				// If highlighting fails, just escape the content
				codeElement.textContent = code;
			}
		}
	});
</script>

<div class="code-block">
	<div class="code-header">
		<span class="code-language">{language}</span>
		<button class="copy-button" on:click={copyCode}>Copy</button>
	</div>
	<pre><code bind:this={codeElement}>{code}</code></pre>
</div>

<style>
	/* Professional code block styling */
	.code-block {
		background: #0d1117;
		border: 1px solid #30363d;
		border-radius: 8px;
		margin: 2rem 0;
		overflow: hidden;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
		font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
	}

	.code-header {
		background: #161b22;
		border-bottom: 1px solid #30363d;
		padding: 0.75rem 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}



	.code-language {
		color: #8b949e;
		font-size: 0.8rem;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.copy-button {
		background: #21262d;
		color: #8b949e;
		border: 1px solid #30363d;
		padding: 0.25rem 0.75rem;
		border-radius: 4px;
		font-size: 0.7rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.copy-button:hover {
		background: #30363d;
		color: #f0f6fc;
		border-color: #8b949e;
	}

	.code-block pre {
		background: #1e1e1e;
		color: #d4d4d4;
		padding: 1.5rem;
		margin: 0;
		border: none;
		border-radius: 0;
		overflow-x: auto;
		font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
		font-size: 0.875rem;
		line-height: 1.6;
	}

	.code-block code {
		background: none;
		padding: 0;
		color: inherit;
		font-size: inherit;
		line-height: inherit;
	}


</style>


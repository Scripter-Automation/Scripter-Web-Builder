<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	export let content: string = '';

	let editorContainer: HTMLElement;
	let editor: any;

	onMount(async () => {
		if (typeof window !== 'undefined' && editorContainer) {
			try {
				const monaco = await import('monaco-editor');
				
				editor = monaco.editor.create(editorContainer, {
					value: content,
					language: 'markdown',
					theme: 'vs-dark',
					automaticLayout: true,
					minimap: { enabled: false },
					scrollBeyondLastLine: false,
					fontSize: 14,
					lineNumbers: 'on',
					wordWrap: 'on',
					renderWhitespace: 'selection',
					tabSize: 2,
					insertSpaces: true,
					detectIndentation: false,
					trimAutoWhitespace: true,
					largeFileOptimizations: false,
					scrollbar: {
						vertical: 'visible',
						horizontal: 'visible'
					}
				});

				// Update content when editor changes
				editor.onDidChangeModelContent(() => {
					content = editor.getValue();
				});

				// Set initial content
				editor.setValue(content);
			} catch (error) {
				console.error('Error loading Monaco Editor:', error);
			}
		}
	});

	// Watch for external content changes
	$: if (editor && content !== editor.getValue()) {
		editor.setValue(content);
	}

	onDestroy(() => {
		if (editor) {
			editor.dispose();
		}
	});
</script>

<div class="markdown-editor">
	<div class="editor-header">
		<h3>Markdown Editor</h3>
		<div class="editor-info">
			<span class="char-count">{content.length} characters</span>
			<span class="line-count">{content.split('\n').length} lines</span>
		</div>
	</div>
	<div class="editor-container" bind:this={editorContainer}></div>
</div>

<style>
	.markdown-editor {
		height: 100%;
		display: flex;
		flex-direction: column;
		background: var(--bg-card);
	}

	.editor-header {
		background: var(--bg-secondary);
		color: var(--text-primary);
		padding: 0.75rem 1rem;
		border-bottom: 1px solid var(--border-primary);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.editor-header h3 {
		margin: 0;
		font-size: 1rem;
		font-weight: 500;
	}

	.editor-info {
		display: flex;
		gap: 1rem;
		font-size: 0.875rem;
		color: var(--text-muted);
	}

	.editor-container {
		flex: 1;
		overflow: hidden;
	}
</style>

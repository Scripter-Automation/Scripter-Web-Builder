<script lang="ts">
	import { onMount } from 'svelte';

	export let content: string = '';

	let previewContainer: HTMLElement;

	// Simple markdown to HTML converter
	function markdownToHtml(markdown: string): string {
		return markdown
			// Headers
			.replace(/^### (.*$)/gim, '<h3>$1</h3>')
			.replace(/^## (.*$)/gim, '<h2>$1</h2>')
			.replace(/^# (.*$)/gim, '<h1>$1</h1>')
			// Bold
			.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
			// Italic
			.replace(/\*(.*?)\*/g, '<em>$1</em>')
			// Code blocks
			.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
			// Inline code
			.replace(/`(.*?)`/g, '<code>$1</code>')
			// Lists
			.replace(/^\* (.*$)/gim, '<li>$1</li>')
			.replace(/^- (.*$)/gim, '<li>$1</li>')
			.replace(/^(\d+)\. (.*$)/gim, '<li>$2</li>')
			// Wrap lists
			.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
			// Paragraphs
			.replace(/\n\n/g, '</p><p>')
			// Line breaks
			.replace(/\n/g, '<br>')
			// Horizontal rules
			.replace(/^---$/gim, '<hr>')
			// Blockquotes
			.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
			// Clean up multiple line breaks
			.replace(/<br><br>/g, '</p><p>')
			// Wrap in paragraph tags
			.replace(/^([^<].*)/gim, '<p>$1</p>')
			// Clean up empty paragraphs
			.replace(/<p><\/p>/g, '')
			.replace(/<p><br><\/p>/g, '');
	}

	$: if (previewContainer && content) {
		previewContainer.innerHTML = markdownToHtml(content);
	}
</script>

<div class="markdown-preview">
	<div class="preview-header">
		<h3>Live Preview</h3>
		<div class="preview-status">
			<span class="status success">✓ Live</span>
		</div>
	</div>
	
	<div class="preview-content" bind:this={previewContainer}>
		{#if !content}
			<div class="fallback-content">
				<p>Start typing to see the preview...</p>
			</div>
		{/if}
	</div>
</div>

<style>
	.markdown-preview {
		height: 100%;
		display: flex;
		flex-direction: column;
		background: var(--bg-card);
	}

	.preview-header {
		background: var(--bg-secondary);
		color: var(--text-primary);
		padding: 0.75rem 1rem;
		border-bottom: 1px solid var(--border-primary);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.preview-header h3 {
		margin: 0;
		font-size: 1rem;
		font-weight: 500;
	}

	.preview-status {
		font-size: 0.875rem;
	}

	.status {
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		font-size: 0.75rem;
		font-weight: 500;
	}

	.status.success {
		background: var(--accent-green);
		color: var(--text-inverse);
	}

	.preview-content {
		flex: 1;
		overflow-y: auto;
		padding: 2rem;
		line-height: 1.6;
	}

	.preview-content :global(h1) {
		color: var(--text-primary);
		font-size: 2rem;
		font-weight: 700;
		margin-bottom: 1rem;
		border-bottom: 3px solid var(--accent-primary);
		padding-bottom: 0.5rem;
	}

	.preview-content :global(h2) {
		color: var(--text-primary);
		font-size: 1.5rem;
		font-weight: 600;
		margin: 2rem 0 1rem 0;
		border-bottom: 2px solid var(--border-primary);
		padding-bottom: 0.25rem;
	}

	.preview-content :global(h3) {
		color: var(--text-primary);
		font-size: 1.25rem;
		font-weight: 600;
		margin: 1.5rem 0 0.75rem 0;
	}

	.preview-content :global(h4) {
		color: var(--text-primary);
		font-size: 1.1rem;
		font-weight: 600;
		margin: 1rem 0 0.5rem 0;
	}

	.preview-content :global(p) {
		margin-bottom: 1rem;
		color: var(--text-primary);
	}

	.preview-content :global(ul), .preview-content :global(ol) {
		margin: 1rem 0;
		padding-left: 2rem;
	}

	.preview-content :global(li) {
		margin-bottom: 0.5rem;
		color: var(--text-primary);
	}

	.preview-content :global(strong) {
		font-weight: 600;
		color: var(--text-primary);
	}

	.preview-content :global(em) {
		font-style: italic;
		color: var(--text-muted);
	}

	.preview-content :global(blockquote) {
		border-left: 4px solid var(--accent-primary);
		padding-left: 1rem;
		margin: 1rem 0;
		color: var(--text-muted);
		font-style: italic;
	}

	.preview-content :global(code) {
		background: var(--bg-secondary);
		padding: 0.125rem 0.25rem;
		border-radius: 3px;
		font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
		font-size: 0.875rem;
		color: var(--accent-red);
	}

	.preview-content :global(pre) {
		background: var(--bg-secondary);
		color: var(--text-primary);
		padding: 1rem;
		border-radius: 6px;
		overflow-x: auto;
		margin: 1rem 0;
	}

	.preview-content :global(pre code) {
		background: none;
		padding: 0;
		color: inherit;
	}

	.preview-content :global(hr) {
		border: none;
		border-top: 2px solid var(--border-primary);
		margin: 2rem 0;
	}

	.preview-content :global(table) {
		width: 100%;
		border-collapse: collapse;
		margin: 1rem 0;
	}

	.preview-content :global(th), .preview-content :global(td) {
		border: 1px solid var(--border-primary);
		padding: 0.75rem;
		text-align: left;
	}

	.preview-content :global(th) {
		background: var(--bg-secondary);
		font-weight: 600;
	}

	.fallback-content {
		color: var(--text-muted);
		font-style: italic;
	}
</style>

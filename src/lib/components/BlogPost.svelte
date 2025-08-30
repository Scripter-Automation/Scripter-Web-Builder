<script lang="ts">
	import type { BlogPost } from '$lib/data/blogPosts';
	import CodeBlock from './CodeBlock.svelte';

	export let post: BlogPost;

	function formatDate(date: Date): string {
		return new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		}).format(date);
	}

	// Custom markdown parser with good styling
	function parseMarkdown(markdown: string): string {
		return markdown
			// Code blocks with language detection and syntax highlighting
			.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
				const language = lang || 'text';
				return `<div class="code-block-wrapper" data-language="${language}" data-code="${encodeURIComponent(code.trim())}"></div>`;
			})
			// Inline code
			.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
			// Bold text
			.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
			// Italic text
			.replace(/\*(.*?)\*/g, '<em>$1</em>')
			// Headers
			.replace(/^### (.*$)/gim, '<h3>$1</h3>')
			.replace(/^## (.*$)/gim, '<h2>$1</h2>')
			.replace(/^# (.*$)/gim, '<h1>$1</h1>')
			// Lists
			.replace(/^\* (.*$)/gim, '<li>$1</li>')
			.replace(/^- (.*$)/gim, '<li>$1</li>')
			.replace(/^(\d+)\. (.*$)/gim, '<li>$2</li>')
			// Blockquotes
			.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
			// Horizontal rules
			.replace(/^---$/gim, '<hr>')
			// Line breaks
			.replace(/\n\n/g, '</p><p>')
			// Wrap in paragraphs
			.replace(/^([^<].*)/gim, '<p>$1</p>')
			// Wrap lists
			.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
			// Clean up empty paragraphs
			.replace(/<p><\/p>/g, '')
			.replace(/<p><br><\/p>/g, '');
	}

	$: parsedContent = parseMarkdown(post.content);
</script>

<article class="article">
	<header class="article-header">
		<h1 class="article-title">{post.title}</h1>
		<div class="article-meta">
			<div class="meta-info">
				<span class="author">by {post.author}</span>
				<span class="date">{formatDate(post.createdAt)}</span>
				<span class="status {post.status}">{post.status}</span>
			</div>
			<div class="article-tags">
				{#each post.tags as tag}
					<span class="tag">{tag}</span>
				{/each}
			</div>
		</div>
	</header>

	<div class="article-excerpt">
		<p>{post.excerpt}</p>
	</div>

	<div class="article-body">
		{#each parsedContent.split('<div class="code-block-wrapper"') as segment, i}
			{#if i === 0}
				{@html segment}
			{:else}
				{@html segment.split('</div>')[1] || ''}
				{@const codeBlockData = segment.split('</div>')[0]}
				{@const language = codeBlockData.match(/data-language="([^"]+)"/)?.[1] || 'text'}
				{@const code = decodeURIComponent(codeBlockData.match(/data-code="([^"]+)"/)?.[1] || '')}
				<CodeBlock {language} {code} />
			{/if}
		{/each}
	</div>

	<footer class="article-footer">
		<div class="article-tags">
			{#each post.tags as tag}
				<span class="tag">{tag}</span>
			{/each}
		</div>
		<div class="article-meta-footer">
			<span class="author">Written by {post.author}</span>
			<span class="date">Published on {formatDate(post.createdAt)}</span>
			{#if post.updatedAt.getTime() !== post.createdAt.getTime()}
				<span class="updated">Updated on {formatDate(post.updatedAt)}</span>
			{/if}
		</div>
	</footer>
</article>

<style>
	/* Article */
	.article {
		background: var(--bg-card);
		border-radius: 12px;
		padding: 2rem;
		border: 1px solid var(--border-primary);
	}

	.article-header {
		margin-bottom: 2rem;
	}

	.article-title {
		font-size: 2.5rem;
		font-weight: 700;
		margin: 0 0 1rem 0;
		color: var(--text-primary);
		line-height: 1.2;
	}

	.article-meta {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.meta-info {
		display: flex;
		align-items: center;
		gap: 1rem;
		font-size: 0.9rem;
		color: var(--text-secondary);
		flex-wrap: wrap;
	}

	.author {
		font-weight: 500;
		color: var(--text-primary);
	}

	.date {
		color: var(--text-muted);
	}

	.status {
		padding: 0.25rem 0.5rem;
		border-radius: 12px;
		font-size: 0.8rem;
		font-weight: 500;
		text-transform: capitalize;
	}

	.status.published {
		background: var(--accent-green);
		color: var(--text-inverse);
	}

	.status.draft {
		background: var(--accent-yellow);
		color: var(--text-inverse);
	}

	.article-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.tag {
		background: var(--accent-primary);
		color: var(--text-inverse);
		padding: 0.5rem 1rem;
		border-radius: 20px;
		font-size: 0.8rem;
		font-weight: 500;
	}

	.article-excerpt {
		background: var(--bg-secondary);
		padding: 1.5rem;
		border-radius: 8px;
		margin-bottom: 2rem;
		border-left: 4px solid var(--accent-primary);
	}

	.article-excerpt p {
		margin: 0;
		color: var(--text-secondary);
		font-style: italic;
		line-height: 1.6;
		font-size: 1.1rem;
	}

	.article-body {
		line-height: 1.6;
		color: var(--text-primary);
		margin-bottom: 2rem;
	}

	.article-body h1 {
		font-size: 1.8rem;
		margin: 2rem 0 1rem 0;
		color: var(--text-primary);
		font-weight: 600;
	}

	.article-body h2 {
		font-size: 1.5rem;
		margin: 1.5rem 0 0.75rem 0;
		color: var(--text-primary);
		font-weight: 600;
	}

	.article-body h3 {
		font-size: 1.25rem;
		margin: 1.25rem 0 0.5rem 0;
		color: var(--text-primary);
		font-weight: 600;
	}

	.article-body p {
		margin-bottom: 1rem;
	}

	.article-body strong {
		font-weight: 600;
	}

	.article-body em {
		font-style: italic;
	}

	.article-body code {
		background: var(--bg-secondary);
		padding: 0.125rem 0.25rem;
		border-radius: 3px;
		font-family: 'Monaco', 'Menlo', monospace;
		font-size: 0.875rem;
	}

	.article-body pre {
		background: var(--bg-secondary);
		padding: 1rem;
		border-radius: 6px;
		overflow-x: auto;
		margin: 1rem 0;
		border: 1px solid var(--border-primary);
	}

	.article-body pre code {
		background: none;
		padding: 0;
		font-size: 0.875rem;
		line-height: 1.5;
	}

	/* Inline code styling */
	.inline-code {
		background: #2d2d2d;
		color: #e6db74;
		padding: 0.125rem 0.25rem;
		border-radius: 3px;
		font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
		font-size: 0.875rem;
	}

	/* Additional markdown elements */
	.article-body blockquote {
		border-left: 4px solid var(--accent-primary);
		padding-left: 1rem;
		margin: 1rem 0;
		color: var(--text-secondary);
		font-style: italic;
	}

	.article-body hr {
		border: none;
		height: 1px;
		background: var(--border-primary);
		margin: 2rem 0;
	}

	.article-body table {
		border-collapse: collapse;
		width: 100%;
		margin: 1rem 0;
	}

	.article-body table th,
	.article-body table td {
		border: 1px solid var(--border-primary);
		padding: 0.5rem;
		text-align: left;
	}

	.article-body table th {
		background: var(--bg-secondary);
		font-weight: 600;
	}

	.article-body ul, .article-body ol {
		margin: 1rem 0;
		padding-left: 1.5rem;
	}

	.article-body li {
		margin-bottom: 0.5rem;
	}

	.article-body a {
		color: var(--accent-primary);
		text-decoration: none;
	}

	.article-body a:hover {
		text-decoration: underline;
	}

	.article-footer {
		border-top: 1px solid var(--border-primary);
		padding-top: 2rem;
		margin-top: 2rem;
	}

	.article-meta-footer {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-top: 1rem;
		font-size: 0.9rem;
		color: var(--text-muted);
	}

	.updated {
		font-style: italic;
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.article {
			padding: 1.5rem;
		}

		.article-title {
			font-size: 2rem;
		}

		.article-meta {
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
		}

		.meta-info {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.5rem;
		}
	}
</style>

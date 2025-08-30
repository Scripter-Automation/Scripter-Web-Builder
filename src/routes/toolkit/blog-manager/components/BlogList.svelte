<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Writable } from 'svelte/store';

	interface Article {
		id: string;
		title: string;
		excerpt: string;
		content: string;
		author: string;
		createdAt: Date;
		updatedAt: Date;
		status: 'draft' | 'published';
		tags: string[];
	}

	export let articles: Writable<Article[]>;

	const dispatch = createEventDispatcher();

	function handleEdit(article: Article) {
		dispatch('edit', article);
	}

	function handleDelete(articleId: string) {
		if (confirm('Are you sure you want to delete this article?')) {
			dispatch('delete', articleId);
		}
	}

	function formatDate(date: Date): string {
		return new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		}).format(date);
	}

	function getStatusColor(status: string): string {
		return status === 'published' ? 'var(--accent-green)' : 'var(--accent-yellow)';
	}
</script>

<div class="blog-list">
	<div class="list-header">
		<h2>Articles ({$articles.length})</h2>
		<div class="filters">
			<select class="status-filter">
				<option value="all">All Status</option>
				<option value="published">Published</option>
				<option value="draft">Draft</option>
			</select>
		</div>
	</div>

	<div class="articles-grid">
		{#each $articles as article (article.id)}
			<div class="article-card">
				<div class="article-header">
					<div class="article-meta">
						<span class="status-badge" style="background-color: {getStatusColor(article.status)}">
							{article.status}
						</span>
						<span class="date">{formatDate(article.updatedAt)}</span>
					</div>
					<div class="article-actions">
						<button class="action-btn edit-btn" on:click={() => handleEdit(article)}>
							✏️ Edit
						</button>
						<button class="action-btn delete-btn" on:click={() => handleDelete(article.id)}>
							🗑️ Delete
						</button>
					</div>
				</div>

				<div class="article-content">
					<h3 class="article-title">{article.title}</h3>
					<p class="article-excerpt">{article.excerpt}</p>
					
					<div class="article-footer">
						<div class="author">
							<span class="author-label">By:</span>
							<span class="author-name">{article.author}</span>
						</div>
						
						{#if article.tags.length > 0}
							<div class="tags">
								{#each article.tags.slice(0, 3) as tag}
									<span class="tag">{tag}</span>
								{/each}
								{#if article.tags.length > 3}
									<span class="tag more">+{article.tags.length - 3}</span>
								{/if}
							</div>
						{/if}
					</div>
				</div>
			</div>
		{:else}
			<div class="empty-state">
				<div class="empty-icon">📝</div>
				<h3>No articles yet</h3>
				<p>Create your first article to get started!</p>
			</div>
		{/each}
	</div>
</div>

<style>
	.blog-list {
		padding: 2rem 0;
	}

	.list-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
	}

	.list-header h2 {
		margin: 0;
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.filters {
		display: flex;
		gap: 1rem;
	}

	.status-filter {
		padding: 0.5rem;
		border: 1px solid var(--border-primary);
		border-radius: 4px;
		background: var(--bg-card);
		color: var(--text-primary);
		font-size: 0.9rem;
	}

	.articles-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		gap: 1.5rem;
	}

	.article-card {
		background: var(--bg-card);
		border: 1px solid var(--border-primary);
		border-radius: 8px;
		padding: 1.5rem;
		transition: all 0.2s;
		box-shadow: var(--shadow-sm);
	}

	.article-card:hover {
		box-shadow: var(--shadow-md);
		transform: translateY(-2px);
	}

	.article-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 1rem;
	}

	.article-meta {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.status-badge {
		padding: 0.25rem 0.5rem;
		border-radius: 12px;
		font-size: 0.75rem;
		font-weight: 500;
		color: white;
		text-transform: capitalize;
	}

	.date {
		font-size: 0.875rem;
		color: var(--text-muted);
	}

	.article-actions {
		display: flex;
		gap: 0.5rem;
	}

	.action-btn {
		background: none;
		border: 1px solid var(--border-primary);
		padding: 0.5rem 0.75rem;
		border-radius: 4px;
		font-size: 0.875rem;
		cursor: pointer;
		transition: all 0.2s;
		color: var(--text-primary);
	}

	.edit-btn:hover {
		background: var(--bg-secondary);
		border-color: var(--accent-primary);
		color: var(--accent-primary);
	}

	.delete-btn:hover {
		background: var(--bg-secondary);
		border-color: var(--accent-red);
		color: var(--accent-red);
	}

	.article-content {
		flex: 1;
	}

	.article-title {
		margin: 0 0 0.75rem 0;
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--text-primary);
		line-height: 1.3;
	}

	.article-excerpt {
		margin: 0 0 1rem 0;
		color: var(--text-muted);
		line-height: 1.5;
		font-size: 0.9rem;
	}

	.article-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 1rem;
		padding-top: 1rem;
		border-top: 1px solid var(--border-primary);
	}

	.author {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.author-label {
		font-size: 0.875rem;
		color: var(--text-muted);
	}

	.author-name {
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--text-primary);
	}

	.tags {
		display: flex;
		gap: 0.25rem;
		flex-wrap: wrap;
	}

	.tag {
		background: var(--bg-secondary);
		color: var(--text-primary);
		padding: 0.25rem 0.5rem;
		border-radius: 12px;
		font-size: 0.75rem;
		font-weight: 500;
	}

	.tag.more {
		background: var(--bg-tertiary);
		color: var(--text-muted);
	}

	.empty-state {
		grid-column: 1 / -1;
		text-align: center;
		padding: 4rem 2rem;
		background: var(--bg-card);
		border: 2px dashed var(--border-primary);
		border-radius: 8px;
	}

	.empty-icon {
		font-size: 3rem;
		margin-bottom: 1rem;
	}

	.empty-state h3 {
		margin: 0 0 0.5rem 0;
		color: var(--text-primary);
		font-weight: 600;
	}

	.empty-state p {
		margin: 0;
		color: var(--text-muted);
	}

	@media (max-width: 768px) {
		.articles-grid {
			grid-template-columns: 1fr;
		}

		.list-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
		}

		.article-header {
			flex-direction: column;
			gap: 1rem;
		}

		.article-actions {
			align-self: flex-end;
		}

		.article-footer {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.75rem;
		}
	}
</style>

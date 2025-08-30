<script lang="ts">
	import { writable } from 'svelte/store';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import { blogPosts, type BlogPost } from '$lib/data/blogPosts';

	// Create a writable store from the blog posts data
	const sampleBlogPosts = writable(blogPosts);

	let searchQuery = '';
	let selectedTags: string[] = [];

	// Get all unique tags for Blog posts
	$: blogTags = [...new Set($sampleBlogPosts.flatMap(post => post.tags))];

	// Filter Blog posts based on search and tags
	$: filteredBlogPosts = $sampleBlogPosts.filter(post => {
		const matchesSearch = !searchQuery || 
			post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
			post.content.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesTags = selectedTags.length === 0 || 
			selectedTags.some(tag => post.tags.includes(tag));
		return matchesSearch && matchesTags;
	});

	function formatDate(date: Date): string {
		return new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		}).format(date);
	}

	function toggleTag(tag: string) {
		if (selectedTags.includes(tag)) {
			selectedTags = selectedTags.filter(t => t !== tag);
		} else {
			selectedTags = [...selectedTags, tag];
		}
	}

	function clearFilters() {
		searchQuery = '';
		selectedTags = [];
	}
</script>

<svelte:head>
	<title>Blog - Scripter DevKit</title>
</svelte:head>

<div class="blog-container">
	<!-- Header -->
	<header class="header">
		<div class="header-content">
			<button class="back-button" on:click={() => window.history.back()}>
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M19 12H5M12 19l-7-7 7-7"/>
				</svg>
				Back
				</button>
			<h1>Blog</h1>
					<ThemeToggle />
		</div>
	</header>

	<!-- Blog List -->
		<main class="main-content">
		<div class="search-section">
			<div class="search-container">
				<svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<circle cx="11" cy="11" r="8"/>
					<path d="m21 21-4.35-4.35"/>
				</svg>
						<input 
							type="text" 
					placeholder="Search articles..." 
							bind:value={searchQuery}
							class="search-input"
						/>
					</div>

			{#if searchQuery || selectedTags.length > 0}
				<button class="clear-button" on:click={clearFilters}>
					Clear filters
				</button>
			{/if}
		</div>

		{#if blogTags.length > 0}
			<div class="tags-section">
						{#each blogTags as tag}
							<button 
						class="tag-button {selectedTags.includes(tag) ? 'active' : ''}"
								on:click={() => toggleTag(tag)}
							>
								{tag}
							</button>
						{/each}
					</div>
					{/if}

		<div class="articles-grid">
				{#each filteredBlogPosts as post (post.id)}
				<a href="/blog/{post.id}" class="article-card">
					<div class="card-content">
						<h2 class="card-title">{post.title}</h2>
						<p class="card-excerpt">{post.excerpt}</p>
						
						<div class="card-meta">
							<div class="meta-info">
								<span class="author">{post.author}</span>
							<span class="date">{formatDate(post.createdAt)}</span>
							</div>
							
							<div class="card-tags">
								{#each post.tags.slice(0, 3) as tag}
									<span class="tag">{tag}</span>
								{/each}
								{#if post.tags.length > 3}
									<span class="tag-more">+{post.tags.length - 3}</span>
								{/if}
							</div>
						</div>
					</div>
					
					<div class="card-arrow">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M5 12h14M12 5l7 7-7 7"/>
						</svg>
					</div>
				</a>
				{:else}
					<div class="empty-state">
						<div class="empty-icon">📝</div>
					<h3>No articles found</h3>
					<p>Try adjusting your search or filters to find what you're looking for.</p>
					</div>
				{/each}
			</div>
		</main>
</div>

<style>
	.blog-container {
		min-height: 100vh;
		background: var(--bg-primary);
		color: var(--text-primary);
	}

	/* Header */
	.header {
		background: var(--bg-card);
		border-bottom: 1px solid var(--border-primary);
		padding: 1rem 0;
		position: sticky;
		top: 0;
		z-index: 100;
	}

	.header-content {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 2rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}

	.back-button {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background: none;
		border: none;
		color: var(--text-secondary);
		font-size: 0.9rem;
		cursor: pointer;
		padding: 0.5rem;
		border-radius: 6px;
		transition: all 0.2s ease;
	}

	.back-button:hover {
		background: var(--bg-secondary);
		color: var(--text-primary);
	}

	.header h1 {
		font-size: 1.5rem;
		font-weight: 600;
		margin: 0;
		color: var(--text-primary);
	}

	/* Main Content */
	.main-content {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
	}

	/* Search Section */
	.search-section {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.search-container {
		position: relative;
		flex: 1;
		max-width: 400px;
	}

	.search-icon {
		position: absolute;
		left: 1rem;
		top: 50%;
		transform: translateY(-50%);
		color: var(--text-muted);
	}

	.search-input {
		width: 100%;
		padding: 0.75rem 1rem 0.75rem 2.5rem;
		border: 1px solid var(--border-primary);
		border-radius: 8px;
		background: var(--bg-card);
		color: var(--text-primary);
		font-size: 0.9rem;
		transition: all 0.2s ease;
	}

	.search-input:focus {
		outline: none;
		border-color: var(--accent-primary);
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
	}

	.clear-button {
		background: none;
		border: 1px solid var(--border-primary);
		color: var(--text-secondary);
		padding: 0.75rem 1rem;
		border-radius: 6px;
		cursor: pointer;
		font-size: 0.9rem;
		transition: all 0.2s ease;
	}

	.clear-button:hover {
		background: var(--bg-secondary);
		color: var(--text-primary);
	}

	/* Tags Section */
	.tags-section {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 2rem;
	}

	.tag-button {
		background: var(--bg-card);
		border: 1px solid var(--border-primary);
		color: var(--text-secondary);
		padding: 0.5rem 1rem;
		border-radius: 20px;
		cursor: pointer;
		font-size: 0.8rem;
		transition: all 0.2s ease;
	}

	.tag-button:hover {
		background: var(--bg-secondary);
		color: var(--text-primary);
	}

	.tag-button.active {
		background: var(--accent-primary);
		color: white;
		border-color: var(--accent-primary);
	}

	/* Articles Grid */
	.articles-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		gap: 1.5rem;
	}

	.article-card {
		background: var(--bg-card);
		border: 1px solid var(--border-primary);
		border-radius: 12px;
		cursor: pointer;
		transition: all 0.3s ease;
		overflow: hidden;
		text-decoration: none;
		color: inherit;
		display: block;
	}

	.article-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
		border-color: var(--accent-primary);
	}

	.card-content {
		padding: 1.5rem;
	}

	.card-title {
		font-size: 1.25rem;
		font-weight: 600;
		margin: 0 0 0.75rem 0;
		color: var(--text-primary);
		line-height: 1.4;
	}

	.card-excerpt {
		color: var(--text-secondary);
		line-height: 1.6;
		margin: 0 0 1.5rem 0;
		font-size: 0.9rem;
	}

	.card-meta {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		gap: 1rem;
	}

	.meta-info {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.author {
		font-size: 0.8rem;
		color: var(--text-muted);
		font-weight: 500;
	}

	.date {
		font-size: 0.8rem;
		color: var(--text-muted);
	}

	.card-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem;
	}

	.tag {
		background: var(--bg-secondary);
		color: var(--text-secondary);
		padding: 0.25rem 0.5rem;
		border-radius: 12px;
		font-size: 0.7rem;
		font-weight: 500;
	}

	.tag-more {
		background: var(--accent-primary);
		color: white;
		padding: 0.25rem 0.5rem;
		border-radius: 12px;
		font-size: 0.7rem;
		font-weight: 500;
	}

	.card-arrow {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 3rem;
		background: var(--bg-secondary);
		color: var(--text-muted);
		transition: all 0.2s ease;
	}

	.article-card:hover .card-arrow {
		background: var(--accent-primary);
		color: white;
	}

	/* Empty State */
	.empty-state {
		grid-column: 1 / -1;
		text-align: center;
		padding: 4rem 2rem;
		color: var(--text-muted);
	}

	.empty-icon {
		font-size: 3rem;
		margin-bottom: 1rem;
		opacity: 0.5;
	}

	.empty-state h3 {
		margin: 0 0 0.5rem 0;
		color: var(--text-primary);
		font-weight: 600;
	}

	.empty-state p {
		margin: 0;
		color: var(--text-secondary);
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.header-content {
			padding: 0 1rem;
		}

		.main-content {
			padding: 1rem;
		}

		.search-section {
			flex-direction: column;
			align-items: stretch;
		}

		.search-container {
			max-width: none;
		}

		.articles-grid {
			grid-template-columns: 1fr;
		}
	}
</style>

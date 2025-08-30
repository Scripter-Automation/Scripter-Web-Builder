<script lang="ts">
	import { page } from '$app/stores';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import BlogPost from '$lib/components/BlogPost.svelte';
	import { blogPosts } from '$lib/data/blogPosts';

	// Get the slug from the URL
	$: slug = $page.params.slug;
	
	// Find the blog post by slug
	$: post = blogPosts.find(p => p.id === slug);
</script>

<svelte:head>
	<title>{post ? post.title : 'Blog Post'} - Scripter DevKit</title>
	{#if post}
		<meta name="description" content={post.excerpt} />
	{/if}
</svelte:head>

{#if post}
	<div class="blog-post-container">
		<!-- Header -->
		<header class="header">
			<div class="header-content">
				<a href="/blog" class="back-button">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M19 12H5M12 19l-7-7 7-7"/>
					</svg>
					Back to Blog
				</a>
				<ThemeToggle />
			</div>
		</header>

		<!-- Article Content -->
		<main class="main-content">
			<BlogPost {post} />
		</main>
	</div>
{:else}
	<div class="not-found-container">
		<header class="header">
			<div class="header-content">
				<a href="/blog" class="back-button">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M19 12H5M12 19l-7-7 7-7"/>
					</svg>
					Back to Blog
				</a>
				<ThemeToggle />
			</div>
		</header>

		<main class="main-content">
			<div class="not-found">
				<div class="not-found-icon">📝</div>
				<h1>Article Not Found</h1>
				<p>The article you're looking for doesn't exist or has been moved.</p>
				<a href="/blog" class="back-to-blog">Back to Blog</a>
			</div>
		</main>
	</div>
{/if}

<style>
	.blog-post-container,
	.not-found-container {
		min-height: 100vh;
		background: var(--bg-primary);
		color: var(--text-primary);
	}

	/* Header */
	.header {
		background: var(--bg-secondary);
		border-bottom: 1px solid var(--border-primary);
		padding: 1rem 0;
		position: sticky;
		top: 0;
		z-index: 100;
	}

	.header-content {
		max-width: 800px;
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
		color: var(--text-primary);
		font-size: 0.9rem;
		cursor: pointer;
		padding: 0.5rem;
		border-radius: 6px;
		transition: all 0.2s ease;
		text-decoration: none;
	}

	.back-button:hover {
		background: var(--bg-secondary);
		color: var(--text-primary);
	}

	/* Main Content */
	.main-content {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem;
	}

	/* Not Found */
	.not-found {
		text-align: center;
		padding: 4rem 2rem;
		color: var(--text-muted);
	}

	.not-found-icon {
		font-size: 4rem;
		margin-bottom: 1rem;
		opacity: 0.5;
	}

	.not-found h1 {
		margin: 0 0 1rem 0;
		color: var(--text-primary);
		font-weight: 600;
		font-size: 2rem;
	}

	.not-found p {
		margin: 0 0 2rem 0;
		color: var(--text-secondary);
		font-size: 1.1rem;
	}

	.back-to-blog {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		background: var(--accent-primary);
		color: var(--text-inverse);
		padding: 0.75rem 1.5rem;
		border-radius: 8px;
		text-decoration: none;
		font-weight: 500;
		transition: all 0.2s ease;
	}

	.back-to-blog:hover {
		background: var(--accent-primary-dark);
		transform: translateY(-1px);
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.header-content {
			padding: 0 1rem;
		}

		.main-content {
			padding: 1rem;
		}
	}
</style>

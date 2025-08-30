<script lang="ts">
	import { writable } from 'svelte/store';
	import BlogList from './components/BlogList.svelte';
	import ArticleEditor from './components/ArticleEditor.svelte';

	// Store for blog articles (in-memory for now)
	export const articles = writable([
		{
			id: '1',
			title: 'Getting Started with SvelteKit',
			excerpt: 'Learn the basics of SvelteKit and how to build modern web applications...',
			content: '# Getting Started with SvelteKit\n\nSvelteKit is a framework for building web applications of all sizes...',
			author: 'John Doe',
			createdAt: new Date('2024-01-15'),
			updatedAt: new Date('2024-01-15'),
			status: 'published',
			tags: ['sveltekit', 'web-development', 'tutorial']
		},
		{
			id: '2',
			title: 'Building a Visual Web Builder',
			excerpt: 'Discover how to create a visual web builder using SvelteKit and modern web technologies...',
			content: '# Building a Visual Web Builder\n\nCreating a visual web builder requires careful planning...',
			author: 'Jane Smith',
			createdAt: new Date('2024-01-10'),
			updatedAt: new Date('2024-01-12'),
			status: 'draft',
			tags: ['sveltekit', 'visual-builder', 'development']
		},
		{
			id: '3',
			title: 'The Future of Web Development',
			excerpt: 'Exploring emerging trends and technologies that will shape the future of web development...',
			content: '# The Future of Web Development\n\nAs we look ahead to the future of web development...',
			author: 'Mike Johnson',
			createdAt: new Date('2024-01-05'),
			updatedAt: new Date('2024-01-08'),
			status: 'published',
			tags: ['future', 'trends', 'technology']
		}
	]);

	let currentView: 'list' | 'editor' = 'list';
	let editingArticle: any = null;
	let isCreating = false;

	function createNewArticle() {
		isCreating = true;
		editingArticle = {
			id: Date.now().toString(),
			title: '',
			excerpt: '',
			content: '',
			author: '',
			createdAt: new Date(),
			updatedAt: new Date(),
			status: 'draft',
			tags: []
		};
		currentView = 'editor';
	}

	function editArticle(article: any) {
		isCreating = false;
		editingArticle = { ...article };
		currentView = 'editor';
	}

	function deleteArticle(articleId: string) {
		articles.update(articlesList => 
			articlesList.filter(article => article.id !== articleId)
		);
	}

	function saveArticle(article: any) {
		if (isCreating) {
			articles.update(articlesList => [...articlesList, article]);
		} else {
			articles.update(articlesList => 
				articlesList.map(a => a.id === article.id ? { ...article, updatedAt: new Date() } : a)
			);
		}
		currentView = 'list';
		editingArticle = null;
		isCreating = false;
	}

	function cancelEdit() {
		currentView = 'list';
		editingArticle = null;
		isCreating = false;
	}
</script>

<svelte:head>
	<title>Blog Manager</title>
	<style>
		:global(body) {
			margin: 0;
			padding: 0;
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		}
	</style>
</svelte:head>

<div class="blog-manager">
	<header class="header">
		<div class="header-content">
			<div class="header-left">
				<button class="back-btn" on:click={() => currentView = 'list'} class:hidden={currentView === 'list'}>
					← Back to Articles
				</button>
				<h1 class="title">
					{currentView === 'list' ? 'Blog Manager' : (isCreating ? 'Create New Article' : 'Edit Article')}
				</h1>
			</div>
			<div class="header-right">
				{#if currentView === 'list'}
					<button class="create-btn" on:click={createNewArticle}>
						+ Create Article
					</button>
				{/if}
			</div>
		</div>
	</header>

	<main class="main-content">
		{#if currentView === 'list'}
			<BlogList 
				{articles} 
				on:edit={({ detail }) => editArticle(detail)}
				on:delete={({ detail }) => deleteArticle(detail)}
			/>
		{:else if currentView === 'editor'}
			<ArticleEditor 
				article={editingArticle}
				{isCreating}
				on:save={({ detail }) => saveArticle(detail)}
				on:cancel={cancelEdit}
			/>
		{/if}
	</main>
</div>

<style>
	.blog-manager {
		height: 100vh;
		display: flex;
		flex-direction: column;
		background: var(--gradient-bg);
	}

	.header {
		background: var(--bg-card);
		border-bottom: 1px solid var(--border-primary);
		padding: 1rem 2rem;
		box-shadow: var(--shadow-sm);
	}

	.header-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: 1200px;
		margin: 0 auto;
	}

	.header-left {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.back-btn {
		background: none;
		border: none;
		color: var(--text-muted);
		font-size: 0.9rem;
		cursor: pointer;
		padding: 0.5rem;
		border-radius: 4px;
		transition: all 0.2s;
	}

	.back-btn:hover {
		background: var(--bg-secondary);
		color: var(--text-primary);
	}

	.back-btn.hidden {
		display: none;
	}

	.title {
		margin: 0;
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.create-btn {
		background: var(--gradient-primary);
		color: var(--text-inverse);
		border: none;
		padding: 0.75rem 1.5rem;
		border-radius: 6px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
	}

	.create-btn:hover {
		background: var(--gradient-primary);
		filter: brightness(1.1);
		transform: translateY(-1px);
	}

	.main-content {
		flex: 1;
		overflow: hidden;
		max-width: 1200px;
		margin: 0 auto;
		width: 100%;
		padding: 0 2rem;
	}

	@media (max-width: 768px) {
		.header {
			padding: 1rem;
		}

		.header-content {
			flex-direction: column;
			gap: 1rem;
			align-items: flex-start;
		}

		.main-content {
			padding: 0 1rem;
		}
	}
</style>

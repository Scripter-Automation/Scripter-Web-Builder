<script lang="ts">
	import { writable } from 'svelte/store';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';

	// Sample SOPs data
	const sampleSOPs = writable([
		{
			id: 'sop-001',
			title: 'Code Review Process',
			content: `# Code Review Process

## Purpose
This SOP outlines the standard process for conducting code reviews to ensure code quality, maintainability, and adherence to coding standards.

## Scope
This procedure applies to all code changes submitted for review across all projects and repositories.

## Responsibilities
- **Developers**: Submit code for review and address feedback
- **Reviewers**: Conduct thorough code reviews and provide constructive feedback
- **Team Leads**: Ensure review process is followed and quality standards are met

## Procedure

### Step 1: Code Submission
1. Create a pull request with descriptive title and description
2. Include relevant issue numbers and context
3. Ensure all automated tests pass
4. Self-review your code before submission

### Step 2: Review Assignment
1. Assign appropriate reviewers based on code changes
2. Include at least one senior developer for complex changes
3. Set review deadline (typically 2-3 business days)

### Step 3: Code Review
1. Review code for:
   - Functionality and logic
   - Code style and formatting
   - Performance considerations
   - Security implications
   - Test coverage

### Step 4: Feedback and Iteration
1. Provide specific, actionable feedback
2. Use inline comments for detailed explanations
3. Request changes or approve with suggestions
4. Iterate on feedback until approval

## References
- [Coding Standards Document](./coding-standards.md)
- [Security Guidelines](./security-guidelines.md)
- [Testing Requirements](./testing-requirements.md)

## Revision History
- 2024-01-15: Initial version created
- 2024-01-20: Updated review criteria`,
			createdAt: new Date('2024-01-15'),
			updatedAt: new Date('2024-01-20'),
			author: 'John Doe',
			tags: ['development', 'process', 'quality']
		},
		{
			id: 'sop-002',
			title: 'Deployment Process',
			content: `# Deployment Process

## Overview
This document describes the standard deployment process for our applications to ensure reliable and consistent deployments.

## Pre-deployment Checklist
- [ ] All tests passing
- [ ] Code review completed
- [ ] Documentation updated
- [ ] Environment variables configured
- [ ] Database migrations ready

## Deployment Steps

### 1. Staging Deployment
1. Deploy to staging environment
2. Run smoke tests
3. Verify functionality
4. Get stakeholder approval

### 2. Production Deployment
1. Create deployment ticket
2. Schedule maintenance window
3. Execute deployment
4. Monitor application health
5. Verify all systems operational

## Rollback Procedure
If issues are detected:
1. Immediately rollback to previous version
2. Investigate root cause
3. Document incident
4. Plan fix and redeployment

## Monitoring
- Application performance metrics
- Error rates and logs
- User experience metrics
- System resource utilization`,
			createdAt: new Date('2024-01-10'),
			updatedAt: new Date('2024-01-18'),
			author: 'Jane Smith',
			tags: ['deployment', 'devops', 'process']
		}
	]);

	// Sample Blog articles data
	const sampleBlogPosts = writable([
		{
			id: 'blog-001',
			title: 'Building Scalable Web Applications with SvelteKit',
			excerpt: 'Learn how to build high-performance web applications using SvelteKit and modern development practices.',
			content: `# Building Scalable Web Applications with SvelteKit

In today's fast-paced web development landscape, choosing the right framework is crucial for building scalable and maintainable applications. SvelteKit has emerged as a powerful contender, offering a unique approach to modern web development.

## Why SvelteKit?

SvelteKit combines the best of both worlds: the simplicity of traditional server-side rendering with the interactivity of modern single-page applications. Here's why it's becoming increasingly popular:

### Performance Benefits
- **Zero JavaScript by default**: Only sends JavaScript when needed
- **Automatic code splitting**: Optimizes bundle sizes automatically
- **Server-side rendering**: Fast initial page loads
- **Progressive enhancement**: Works without JavaScript

### Developer Experience
- **Intuitive syntax**: Clean, readable component syntax
- **Built-in routing**: File-based routing system
- **TypeScript support**: Full TypeScript integration
- **Hot module replacement**: Fast development feedback

## Getting Started

### Installation
\`\`\`bash
npm create svelte@latest my-app
cd my-app
npm install
npm run dev
\`\`\`

### Project Structure
\`\`\`
src/
├── routes/
│   ├── +page.svelte
│   ├── about/
│   │   └── +page.svelte
│   └── blog/
│       └── [slug]/
│           └── +page.svelte
├── lib/
│   ├── components/
│   └── utils/
└── app.html
\`\`\`

## Best Practices

### 1. Component Design
Keep components small and focused on a single responsibility. Use props for data flow and events for communication.

### 2. State Management
Use Svelte stores for global state management:

\`\`\`javascript
import { writable } from 'svelte/store';

export const user = writable(null);
export const theme = writable('light');
\`\`\`

### 3. Performance Optimization
- Use \`{#await}\` for loading states
- Implement proper error boundaries
- Optimize images and assets
- Use preloading for critical resources

## Deployment

SvelteKit supports multiple deployment platforms:

### Vercel
\`\`\`bash
npm install -g vercel
vercel
\`\`\`

### Netlify
\`\`\`bash
npm install -g netlify-cli
netlify deploy
\`\`\`

## Conclusion

SvelteKit provides an excellent foundation for building modern web applications. Its focus on performance, developer experience, and progressive enhancement makes it an ideal choice for projects of all sizes.

By following best practices and leveraging SvelteKit's built-in features, you can create scalable, maintainable applications that provide excellent user experiences.`,
			createdAt: new Date('2024-01-20'),
			updatedAt: new Date('2024-01-20'),
			author: 'Alex Johnson',
			status: 'published',
			tags: ['sveltekit', 'web-development', 'tutorial']
		},
		{
			id: 'blog-002',
			title: 'The Future of Full-Stack Development',
			excerpt: 'Exploring emerging trends and technologies that are shaping the future of full-stack development.',
			content: `# The Future of Full-Stack Development

The landscape of full-stack development is evolving rapidly, driven by new technologies, changing user expectations, and the need for more efficient development workflows.

## Emerging Trends

### 1. Edge Computing
Edge computing is bringing computation closer to users, reducing latency and improving performance. This trend is particularly important for:

- **Real-time applications**: Chat, gaming, live streaming
- **IoT devices**: Smart home, industrial sensors
- **Global applications**: CDN-powered edge functions

### 2. AI-Powered Development
Artificial intelligence is transforming how we write and maintain code:

- **Code generation**: AI-assisted code writing
- **Bug detection**: Automated error detection and fixing
- **Performance optimization**: AI-driven optimization suggestions
- **Documentation**: Automatic documentation generation

### 3. WebAssembly (WASM)
WebAssembly is enabling high-performance applications in the browser:

- **Performance-critical applications**: Games, video editing, 3D rendering
- **Legacy code integration**: Running existing C++/Rust code in browsers
- **Cross-platform development**: Single codebase for web and desktop

## Technology Stack Evolution

### Frontend
- **Framework consolidation**: Fewer, more mature frameworks
- **Component libraries**: Reusable, accessible components
- **Build tool optimization**: Faster, more efficient build processes

### Backend
- **Serverless architecture**: Event-driven, scalable backends
- **GraphQL adoption**: Flexible, efficient data fetching
- **Microservices**: Modular, maintainable service architecture

### DevOps
- **GitOps**: Git as the single source of truth
- **Infrastructure as Code**: Automated infrastructure management
- **Observability**: Comprehensive monitoring and logging

## Skills for the Future

### Technical Skills
- **Cloud platforms**: AWS, Azure, Google Cloud
- **Containerization**: Docker, Kubernetes
- **CI/CD pipelines**: Automated testing and deployment
- **Security**: Application security and best practices

### Soft Skills
- **Problem-solving**: Analytical thinking and creativity
- **Communication**: Clear technical communication
- **Collaboration**: Team-based development
- **Continuous learning**: Staying updated with new technologies

## Conclusion

The future of full-stack development is exciting and challenging. By staying current with emerging trends and continuously improving our skills, we can build better applications and advance our careers.

The key is to focus on fundamentals while embracing new technologies that solve real problems.`,
			createdAt: new Date('2024-01-18'),
			updatedAt: new Date('2024-01-19'),
			author: 'Sarah Wilson',
			status: 'published',
			tags: ['full-stack', 'trends', 'technology']
		}
	]);

	let currentView: 'sops' | 'blog' = 'sops';
	let selectedContent: any = null;
	let searchQuery = '';
	let selectedTags: string[] = [];

	// Get all unique tags for SOPs
	$: sopTags = [...new Set($sampleSOPs.flatMap(sop => sop.tags))];

	// Get all unique tags for Blog posts
	$: blogTags = [...new Set($sampleBlogPosts.flatMap(post => post.tags))];

	// Filter SOPs based on search and tags
	$: filteredSOPs = $sampleSOPs.filter(sop => {
		const matchesSearch = !searchQuery || 
			sop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			sop.content.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesTags = selectedTags.length === 0 || 
			selectedTags.some(tag => sop.tags.includes(tag));
		return matchesSearch && matchesTags;
	});

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
			month: 'long',
			day: 'numeric'
		}).format(date);
	}

	function markdownToHtml(markdown: string): string {
		return markdown
			// Headers
			.replace(/^### (.*$)/gim, '<h3>$1</h3>')
			.replace(/^## (.*$)/gim, '<h2>$1</h2>')
			.replace(/^# (.*$)/gim, '<h1>$1</h1>')
			// Bold and italic
			.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
			.replace(/\*(.*?)\*/g, '<em>$1</em>')
			// Code blocks
			.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
			// Inline code
			.replace(/`(.*?)`/g, '<code>$1</code>')
			// Links
			.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
			// Lists
			.replace(/^\* (.*$)/gim, '<li>$1</li>')
			.replace(/^- (.*$)/gim, '<li>$1</li>')
			.replace(/^\d+\. (.*$)/gim, '<li>$1</li>')
			// Line breaks
			.replace(/\n/g, '<br>')
			// Wrap lists
			.replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>')
			// Clean up double line breaks
			.replace(/<br><br>/g, '</p><p>')
			// Wrap in paragraphs
			.replace(/^(?!<[h|u|p|pre])(.*)$/gim, '<p>$1</p>')
			// Clean up empty paragraphs
			.replace(/<p><\/p>/g, '')
			// Clean up list wrapping
			.replace(/<ul><ul>/g, '<ul>')
			.replace(/<\/ul><\/ul>/g, '</ul>');
	}

	function toggleTag(tag: string) {
		if (selectedTags.includes(tag)) {
			selectedTags = selectedTags.filter(t => t !== tag);
		} else {
			selectedTags = [...selectedTags, tag];
		}
	}

	function viewContent(content: any) {
		selectedContent = content;
	}

	function closeContent() {
		selectedContent = null;
	}

	function clearFilters() {
		searchQuery = '';
		selectedTags = [];
	}
</script>

<svelte:head>
	<title>Content Hub - Scripter DevKit</title>
</svelte:head>

<div class="content-hub">
	<header class="header">
		<div class="header-content">
			<div class="header-left">
				<button class="back-btn" on:click={() => window.history.back()}>
					← Back
				</button>
				<h1 class="title">Content Hub</h1>
			</div>
			<div class="header-right">
				<div class="theme-toggle-container">
					<ThemeToggle />
				</div>
			</div>
		</div>
	</header>

	{#if selectedContent}
		<!-- Content Viewer Modal -->
		<div class="content-modal">
			<div class="modal-header">
				<div class="modal-title">
					<h2>{selectedContent.title}</h2>
					<div class="content-meta">
						<span class="content-type {selectedContent.type}">
							{selectedContent.type === 'sop' ? '📋 SOP' : '📝 Blog Post'}
						</span>
						<span class="author">by {selectedContent.author}</span>
						<span class="date">{formatDate(selectedContent.createdAt)}</span>
					</div>
				</div>
				<button class="close-btn" on:click={closeContent}>×</button>
			</div>
			<div class="modal-content">
				{#if selectedContent.type === 'blog' && selectedContent.excerpt}
					<div class="excerpt">
						<p>{selectedContent.excerpt}</p>
					</div>
				{/if}
				<div class="content-body">
					{@html markdownToHtml(selectedContent.content)}
				</div>
				<div class="content-tags">
					{#each selectedContent.tags as tag}
						<span class="tag">{tag}</span>
					{/each}
				</div>
			</div>
		</div>
	{:else}
		<!-- Main Content List -->
		<main class="main-content">
			<div class="controls">
				<div class="view-tabs">
					<button 
						class="tab-btn {currentView === 'sops' ? 'active' : ''}" 
						on:click={() => { currentView = 'sops'; clearFilters(); }}
					>
						📋 SOPs ({filteredSOPs.length})
					</button>
					<button 
						class="tab-btn {currentView === 'blog' ? 'active' : ''}" 
						on:click={() => { currentView = 'blog'; clearFilters(); }}
					>
						📝 Blog Articles ({filteredBlogPosts.length})
					</button>
				</div>

				<div class="search-filters">
					<div class="search-box">
						<input 
							type="text" 
							placeholder="Search {currentView === 'sops' ? 'SOPs' : 'blog articles'}..." 
							bind:value={searchQuery}
							class="search-input"
						/>
					</div>

					<div class="tag-filters">
						{#each (currentView === 'sops' ? sopTags : blogTags) as tag}
							<button 
								class="tag-btn {selectedTags.includes(tag) ? 'active' : ''}"
								on:click={() => toggleTag(tag)}
							>
								{tag}
							</button>
						{/each}
					</div>
				</div>
			</div>

			<div class="content-grid">
				{#if currentView === 'sops'}
					{#each filteredSOPs as sop (sop.id)}
						<div class="content-card sop-card" on:click={() => viewContent(sop)}>
							<div class="card-header">
								<span class="content-type">📋 SOP</span>
								<span class="date">{formatDate(sop.updatedAt)}</span>
							</div>
							<h3 class="card-title">{sop.title}</h3>
							<p class="card-excerpt">
								{sop.content.split('\n')[0].replace(/^#\s*/, '')}
							</p>
							<div class="card-meta">
								<span class="author">by {sop.author}</span>
								<div class="tags">
									{#each sop.tags as tag}
										<span class="tag">{tag}</span>
									{/each}
								</div>
							</div>
						</div>
					{:else}
						<div class="empty-state">
							<div class="empty-icon">📋</div>
							<h3>No SOPs found</h3>
							<p>Try adjusting your search or filters.</p>
						</div>
					{/each}
				{:else}
					{#each filteredBlogPosts as post (post.id)}
						<div class="content-card blog-card" on:click={() => viewContent(post)}>
							<div class="card-header">
								<span class="content-type">📝 Blog Post</span>
								<span class="status {post.status}">{post.status}</span>
							</div>
							<h3 class="card-title">{post.title}</h3>
							<p class="card-excerpt">{post.excerpt}</p>
							<div class="card-meta">
								<span class="author">by {post.author}</span>
								<span class="date">{formatDate(post.createdAt)}</span>
								<div class="tags">
									{#each post.tags as tag}
										<span class="tag">{tag}</span>
									{/each}
								</div>
							</div>
						</div>
					{:else}
						<div class="empty-state">
							<div class="empty-icon">📝</div>
							<h3>No blog articles found</h3>
							<p>Try adjusting your search or filters.</p>
						</div>
					{/each}
				{/if}
			</div>
		</main>
	{/if}
</div>

<style>
	.content-hub {
		min-height: 100vh;
		background: var(--gradient-bg);
	}

	.header {
		background: var(--bg-header);
		color: var(--text-inverse);
		padding: 1.5rem 2rem;
		box-shadow: var(--shadow-lg);
	}

	.header-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: 1400px;
		margin: 0 auto;
		width: 100%;
	}

	.header-left {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.back-btn {
		background: none;
		border: none;
		color: var(--text-inverse);
		font-size: 0.9rem;
		cursor: pointer;
		padding: 0.5rem;
		border-radius: 4px;
		transition: all 0.2s;
	}

	.back-btn:hover {
		background: rgba(255, 255, 255, 0.15);
	}

	.title {
		margin: 0;
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--text-inverse);
	}

	.main-content {
		max-width: 1400px;
		margin: 0 auto;
		padding: 2rem;
	}

	.controls {
		margin-bottom: 2rem;
	}

	.view-tabs {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 1.5rem;
	}

	.tab-btn {
		background: var(--bg-card);
		border: 1px solid var(--border-primary);
		padding: 0.75rem 1.5rem;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.2s;
		color: var(--text-secondary);
		font-weight: 500;
	}

	.tab-btn:hover {
		background: var(--bg-secondary);
		color: var(--text-primary);
	}

	.tab-btn.active {
		background: var(--accent-yellow);
		color: var(--text-inverse);
		border-color: var(--accent-yellow);
	}

	.search-filters {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.search-box {
		max-width: 400px;
	}

	.search-input {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid var(--border-primary);
		border-radius: 8px;
		background: var(--bg-card);
		color: var(--text-primary);
		font-size: 0.9rem;
	}

	.search-input:focus {
		outline: none;
		border-color: var(--accent-primary);
		box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
	}

	.tag-filters {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.tag-btn {
		background: var(--bg-card);
		border: 1px solid var(--border-primary);
		padding: 0.5rem 1rem;
		border-radius: 20px;
		cursor: pointer;
		transition: all 0.2s;
		font-size: 0.8rem;
		color: var(--text-secondary);
	}

	.tag-btn:hover {
		background: var(--bg-secondary);
		color: var(--text-primary);
	}

	.tag-btn.active {
		background: var(--accent-primary);
		color: white;
		border-color: var(--accent-primary);
	}

	.content-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		gap: 1.5rem;
	}

	.content-card {
		background: var(--bg-card);
		border-radius: 12px;
		padding: 1.5rem;
		cursor: pointer;
		transition: all 0.3s ease;
		border: 1px solid var(--border-primary);
		box-shadow: var(--shadow-sm);
	}

	.content-card:hover {
		transform: translateY(-4px);
		box-shadow: var(--shadow-lg);
		border-color: var(--accent-yellow);
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	.content-type {
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--accent-yellow);
	}

	.status {
		font-size: 0.8rem;
		padding: 0.25rem 0.5rem;
		border-radius: 12px;
		font-weight: 500;
	}

	.status.published {
		background: #dcfce7;
		color: #166534;
	}

	.status.draft {
		background: #fef3c7;
		color: #92400e;
	}

	.card-title {
		margin: 0 0 0.75rem 0;
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--text-primary);
		line-height: 1.3;
	}

	.card-excerpt {
		margin: 0 0 1rem 0;
		color: var(--text-secondary);
		line-height: 1.5;
		font-size: 0.9rem;
	}

	.card-meta {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
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

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem;
	}

	.tag {
		background: var(--bg-secondary);
		color: var(--text-secondary);
		padding: 0.25rem 0.5rem;
		border-radius: 12px;
		font-size: 0.75rem;
		font-weight: 500;
	}

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

	/* Content Modal */
	.content-modal {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.8);
		z-index: 1000;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
	}

	.modal-header {
		background: var(--bg-card);
		border-radius: 12px 12px 0 0;
		padding: 1.5rem 2rem;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		border-bottom: 1px solid var(--border-primary);
		max-width: 800px;
		width: 100%;
	}

	.modal-title h2 {
		margin: 0 0 0.5rem 0;
		font-size: 1.75rem;
		font-weight: 600;
		color: var(--text-primary);
		line-height: 1.3;
	}

	.content-meta {
		display: flex;
		align-items: center;
		gap: 1rem;
		font-size: 0.9rem;
		color: var(--text-secondary);
	}

	.close-btn {
		background: none;
		border: none;
		font-size: 1.5rem;
		cursor: pointer;
		color: var(--text-secondary);
		padding: 0.5rem;
		border-radius: 4px;
		transition: all 0.2s;
	}

	.close-btn:hover {
		background: var(--bg-secondary);
		color: var(--text-primary);
	}

	.modal-content {
		background: var(--bg-card);
		border-radius: 0 0 12px 12px;
		padding: 2rem;
		max-width: 800px;
		width: 100%;
		max-height: 70vh;
		overflow-y: auto;
	}

	.excerpt {
		background: var(--bg-secondary);
		padding: 1rem;
		border-radius: 8px;
		margin-bottom: 2rem;
		border-left: 4px solid var(--accent-yellow);
	}

	.excerpt p {
		margin: 0;
		color: var(--text-secondary);
		font-style: italic;
		line-height: 1.6;
	}

	.content-body {
		line-height: 1.7;
		color: var(--text-primary);
		margin-bottom: 2rem;
	}

	.content-body h1 {
		font-size: 2rem;
		margin: 2rem 0 1rem 0;
		color: var(--text-primary);
	}

	.content-body h2 {
		font-size: 1.5rem;
		margin: 1.5rem 0 1rem 0;
		color: var(--text-primary);
	}

	.content-body h3 {
		font-size: 1.25rem;
		margin: 1.25rem 0 0.75rem 0;
		color: var(--text-primary);
	}

	.content-body p {
		margin-bottom: 1rem;
	}

	.content-body code {
		background: var(--bg-secondary);
		padding: 0.125rem 0.25rem;
		border-radius: 3px;
		font-family: 'Monaco', 'Menlo', monospace;
		font-size: 0.875rem;
	}

	.content-body pre {
		background: var(--bg-secondary);
		padding: 1rem;
		border-radius: 8px;
		overflow-x: auto;
		margin: 1rem 0;
	}

	.content-body pre code {
		background: none;
		padding: 0;
	}

	.content-body ul, .content-body ol {
		margin: 1rem 0;
		padding-left: 1.5rem;
	}

	.content-body li {
		margin-bottom: 0.25rem;
	}

	.content-body a {
		color: var(--accent-primary);
		text-decoration: none;
	}

	.content-body a:hover {
		text-decoration: underline;
	}

	.content-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		padding-top: 1rem;
		border-top: 1px solid var(--border-primary);
	}

	.content-tags .tag {
		background: var(--accent-yellow);
		color: var(--text-inverse);
		padding: 0.5rem 1rem;
		border-radius: 20px;
		font-size: 0.8rem;
		font-weight: 500;
	}

	@media (max-width: 768px) {
		.header {
			padding: 1rem;
		}

		.main-content {
			padding: 1rem;
		}

		.content-grid {
			grid-template-columns: 1fr;
		}

		.modal-header,
		.modal-content {
			margin: 1rem;
			max-width: none;
		}

		.content-modal {
			padding: 1rem;
		}
	}
</style>

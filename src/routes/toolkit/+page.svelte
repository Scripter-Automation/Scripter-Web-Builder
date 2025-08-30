<script lang="ts">
	import ThemeToggle from '../../lib/components/ThemeToggle.svelte';
</script>

<svelte:head>
	<title>Scripter DevKit - Development Tools</title>
	<meta name="description" content="Comprehensive development toolkit for SvelteKit projects" />
</svelte:head>

<div class="toolkit-page">
	<header class="toolkit-header">
		<div class="header-content">
			<div class="header-left">
				<a href="/" class="back-btn">← Back to Home</a>
				<h1 class="title">🛠️ Development Toolkit</h1>
				<p class="subtitle">Professional tools for SvelteKit development, documentation, and content creation</p>
				<div class="tools-count">
					                <span class="count-badge">6 Tools Available</span>
				</div>
			</div>
			<div class="header-right">
				<div class="theme-toggle-container">
					<ThemeToggle />
				</div>
			</div>
		</div>
	</header>

	<main class="toolkit-content">
		<div class="tools-grid">
			<div class="tool-card priority-high">
				<div class="tool-icon">🔧</div>
				<div class="tool-info">
					<h3>Web Builder</h3>
					<p>Visual web building with real-time editing, CSS controls, and live preview. Edit your Svelte components visually without writing code.</p>
					<div class="tool-features">
						<span class="feature-tag">Visual Editing</span>
						<span class="feature-tag">CSS Controls</span>
						<span class="feature-tag">Live Preview</span>
					</div>
				</div>
				<a href="/toolkit/builder" class="tool-link">Open Builder</a>
			</div>

			<div class="tool-card priority-high">
				<div class="tool-icon">🗄️</div>
				<div class="tool-info">
					<h3>Admin Console</h3>
					<p>Database management, query execution, and table administration for developers with connection management.</p>
					<div class="tool-features">
						<span class="feature-tag">Database Management</span>
						<span class="feature-tag">Query Editor</span>
						<span class="feature-tag">Table Manager</span>
					</div>
				</div>
				<a href="/toolkit/admin-console" class="tool-link">Open Admin Console</a>
			</div>

			<div class="tool-card priority-medium">
				<div class="tool-icon">🛡️</div>
				<div class="tool-info">
					<h3>Security Tools</h3>
					<p>Basic security scanning, dependency checking, and code analysis for development environments.</p>
					<div class="tool-features">
						<span class="feature-tag">Security Scanner</span>
						<span class="feature-tag">Dependency Checker</span>
						<span class="feature-tag">Code Analyzer</span>
					</div>
				</div>
				<a href="/toolkit/security-tools" class="tool-link">Open Security Tools</a>
			</div>

			<div class="tool-card priority-medium">
				<div class="tool-icon">📝</div>
				<div class="tool-info">
					<h3>Blog Manager</h3>
					<p>Professional article creation with LinkedIn-style visual editor and comprehensive content management system.</p>
					<div class="tool-features">
						<span class="feature-tag">Visual Editor</span>
						<span class="feature-tag">Article Management</span>
						<span class="feature-tag">Draft System</span>
					</div>
				</div>
				<a href="/toolkit/blog-manager" class="tool-link">Open Blog Manager</a>
			</div>

			<div class="tool-card priority-medium">
				<div class="tool-icon">📋</div>
				<div class="tool-info">
					<h3>SOP Manager</h3>
					<p>Create and manage Standard Operating Procedures with professional markdown editing and live preview capabilities.</p>
					<div class="tool-features">
						<span class="feature-tag">Markdown Editor</span>
						<span class="feature-tag">Live Preview</span>
						<span class="feature-tag">Templates</span>
					</div>
				</div>
				<a href="/toolkit/sop-manager" class="tool-link">Open SOP Manager</a>
			</div>

			<div class="tool-card priority-low">
				<div class="tool-icon">🎫</div>
				<div class="tool-info">
					<h3>Ticketing System</h3>
					<p>Complete ticket management with resolver groups, templates, correspondence tracking, and advanced filtering.</p>
					<div class="tool-features">
						<span class="feature-tag">Ticket Management</span>
						<span class="feature-tag">Resolver Groups</span>
						<span class="feature-tag">Templates</span>
					</div>
				</div>
				<a href="/toolkit/ticketing-system" class="tool-link">Open Ticketing System</a>
			</div>
		</div>

		<div class="toolkit-info">
			<div class="info-card">
				<h3>🚀 Quick Access</h3>
				<p>All tools are designed to work seamlessly together. Start with any tool and switch between them as needed.</p>
			</div>
			
			<div class="info-card">
				<h3>🧹 Production Ready</h3>
				<p>Simply remove the <code>src/routes/toolkit/</code> folder before deploying to production to keep your application clean and optimized.</p>
			</div>
		</div>
	</main>
</div>

<style>
	.toolkit-page {
		min-height: 100vh;
		background: var(--gradient-bg);
		color: var(--text-primary);
	}

	.toolkit-header {
		background: var(--bg-header);
		padding: 2rem 0;
		border-bottom: 1px solid var(--border-primary);
	}

	.header-content {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 2rem;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 2rem;
	}

	.header-left {
		flex: 1;
	}

	.back-btn {
		display: inline-flex;
		align-items: center;
		color: var(--text-muted);
		text-decoration: none;
		font-size: 0.9rem;
		margin-bottom: 1rem;
		transition: color 0.2s;
	}

	.back-btn:hover {
		color: var(--accent-primary);
	}

	.title {
		margin: 0 0 0.5rem 0;
		font-size: 2.5rem;
		font-weight: 700;
		color: var(--text-primary);
	}

	.subtitle {
		margin: 0;
		font-size: 1.1rem;
		color: var(--text-muted);
		line-height: 1.6;
	}

	.tools-count {
		margin-top: 1rem;
	}

	.count-badge {
		background: var(--gradient-primary);
		color: var(--text-inverse);
		padding: 0.5rem 1rem;
		border-radius: 20px;
		font-size: 0.9rem;
		font-weight: 500;
		display: inline-block;
	}

	.header-right {
		display: flex;
		align-items: center;
	}

	.theme-toggle-container {
		height: fit-content;
		flex-shrink: 0;
	}

	.toolkit-content {
		max-width: 1200px;
		margin: 0 auto;
		padding: 3rem 2rem;
	}

	.tools-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
		gap: 2rem;
		margin-bottom: 3rem;
	}

	.tool-card {
		background: var(--bg-card);
		border: 1px solid var(--border-primary);
		border-radius: 12px;
		padding: 2rem;
		display: flex;
		flex-direction: column;
		transition: all 0.3s ease;
		box-shadow: var(--shadow-sm);
		position: relative;
	}

	.tool-card:hover {
		transform: translateY(-4px);
		box-shadow: var(--shadow-lg);
		border-color: var(--accent-primary);
	}

	.tool-card.priority-high {
		border-left: 4px solid var(--accent-green);
	}

	.tool-card.priority-medium {
		border-left: 4px solid var(--accent-yellow);
	}

	.tool-card.priority-low {
		border-left: 4px solid var(--accent-red);
	}

	.tool-card.priority-high::before {
		content: "🔥 High Priority";
		position: absolute;
		top: 1rem;
		right: 1rem;
		background: var(--accent-green);
		color: var(--text-inverse);
		padding: 0.25rem 0.75rem;
		border-radius: 12px;
		font-size: 0.75rem;
		font-weight: 600;
	}

	.tool-card.priority-medium::before {
		content: "⚡ Medium Priority";
		position: absolute;
		top: 1rem;
		right: 1rem;
		background: var(--accent-yellow);
		color: var(--text-inverse);
		padding: 0.25rem 0.75rem;
		border-radius: 12px;
		font-size: 0.75rem;
		font-weight: 600;
	}

	.tool-card.priority-low::before {
		content: "📋 Low Priority";
		position: absolute;
		top: 1rem;
		right: 1rem;
		background: var(--accent-red);
		color: var(--text-inverse);
		padding: 0.25rem 0.75rem;
		border-radius: 12px;
		font-size: 0.75rem;
		font-weight: 600;
	}

	.tool-icon {
		font-size: 3rem;
		margin-bottom: 1rem;
	}

	.tool-info {
		flex: 1;
		margin-bottom: 1.5rem;
	}

	.tool-info h3 {
		margin: 0 0 0.75rem 0;
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.tool-info p {
		margin: 0 0 1rem 0;
		color: var(--text-muted);
		line-height: 1.6;
	}

	.tool-features {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.feature-tag {
		background: var(--bg-secondary);
		color: var(--text-primary);
		padding: 0.25rem 0.75rem;
		border-radius: 20px;
		font-size: 0.8rem;
		font-weight: 500;
		border: 1px solid var(--border-primary);
	}

	.tool-link {
		background: var(--gradient-primary);
		color: var(--text-inverse);
		text-decoration: none;
		padding: 0.75rem 1.5rem;
		border-radius: 8px;
		font-weight: 500;
		text-align: center;
		transition: all 0.2s;
		align-self: flex-start;
	}

	.tool-link:hover {
		background: var(--gradient-primary);
		filter: brightness(1.1);
		transform: translateY(-1px);
	}

	.toolkit-info {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
	}

	.info-card {
		background: var(--bg-card);
		border: 1px solid var(--border-primary);
		border-radius: 8px;
		padding: 1.5rem;
		box-shadow: var(--shadow-sm);
	}

	.info-card h3 {
		margin: 0 0 1rem 0;
		font-size: 1.2rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.info-card p {
		margin: 0;
		color: var(--text-muted);
		line-height: 1.6;
	}

	.info-card code {
		background: var(--bg-secondary);
		color: var(--accent-primary);
		padding: 0.2rem 0.4rem;
		border-radius: 4px;
		font-family: 'Monaco', 'Menlo', monospace;
		font-size: 0.9rem;
	}

	@media (max-width: 768px) {
		.header-content {
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
		}

		.title {
			font-size: 2rem;
		}

		.tools-grid {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.toolkit-content {
			padding: 2rem 1rem;
		}

		.toolkit-info {
			grid-template-columns: 1fr;
		}
	}
</style>

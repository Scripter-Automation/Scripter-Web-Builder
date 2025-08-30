<script lang="ts">
	import { writable } from 'svelte/store';
	import ThemeToggle from '../../../lib/components/ThemeToggle.svelte';
	import SecurityScanner from './components/SecurityScanner.svelte';
	import DependencyChecker from './components/DependencyChecker.svelte';
	import CodeAnalyzer from './components/CodeAnalyzer.svelte';

	export const securityIssues = writable([
		{
			id: '1',
			type: 'warning',
			severity: 'medium',
			title: 'Outdated Dependencies',
			description: 'Some dependencies may have security vulnerabilities',
			file: 'package.json',
			line: 15,
			suggestion: 'Update dependencies to latest versions'
		},
		{
			id: '2',
			type: 'info',
			severity: 'low',
			title: 'Environment Variables',
			description: 'Consider using environment variables for sensitive data',
			file: 'src/lib/config.ts',
			line: 8,
			suggestion: 'Move API keys to environment variables'
		}
	]);

	let currentView: 'scanner' | 'dependencies' | 'analyzer' = 'scanner';
	let scanInProgress = false;
	let lastScanTime: Date | null = null;

	function handleScan() {
		scanInProgress = true;
		// Simulate scan
		setTimeout(() => {
			scanInProgress = false;
			lastScanTime = new Date();
		}, 2000);
	}
</script>

<svelte:head>
	<title>Security Tools - Scripter DevKit</title>
</svelte:head>

<main class="security-tools">
	<!-- Header -->
	<header class="header">
		<div class="container">
			<div class="header-content">
				<a href="/" class="back-button">← Back to Home</a>
				<div class="header-text">
					<h1>Security Tools</h1>
					<p>Basic security scanning and development security checks</p>
				</div>
				<div class="theme-toggle-container">
					<ThemeToggle />
				</div>
			</div>
		</div>
	</header>

	<!-- Navigation -->
	<nav class="nav-tabs">
		<div class="container">
			<div class="tab-buttons">
				<button 
					class="tab-button {currentView === 'scanner' ? 'active' : ''}"
					on:click={() => currentView = 'scanner'}
				>
					🔍 Security Scanner
				</button>
				<button 
					class="tab-button {currentView === 'dependencies' ? 'active' : ''}"
					on:click={() => currentView = 'dependencies'}
				>
					📦 Dependency Checker
				</button>
				<button 
					class="tab-button {currentView === 'analyzer' ? 'active' : ''}"
					on:click={() => currentView = 'analyzer'}
				>
					🔎 Code Analyzer
				</button>
			</div>
		</div>
	</nav>

	<!-- Main Content -->
	<div class="main-content">
		<div class="container">
			{#if currentView === 'scanner'}
				<SecurityScanner {scanInProgress} {lastScanTime} on:scan={handleScan} />
			{:else if currentView === 'dependencies'}
				<DependencyChecker />
			{:else if currentView === 'analyzer'}
				<CodeAnalyzer />
			{/if}
		</div>
	</div>
</main>

<style>
	.security-tools {
		min-height: 100vh;
		background: var(--bg-primary);
		color: var(--text-primary);
	}

	.header {
		background: var(--bg-header);
		color: var(--text-inverse);
		padding: 1rem 0;
		box-shadow: var(--shadow-lg);
	}

	.header-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.back-button {
		color: var(--text-inverse);
		text-decoration: none;
		font-weight: 600;
		transition: opacity 0.3s ease;
	}

	.back-button:hover {
		opacity: 0.8;
	}

	.header-text h1 {
		font-size: 2rem;
		font-weight: 700;
		margin-bottom: 0.5rem;
	}

	.header-text p {
		color: var(--text-secondary);
		font-size: 1rem;
	}

	.nav-tabs {
		background: var(--bg-secondary);
		border-bottom: 1px solid var(--border-primary);
	}

	.tab-buttons {
		display: flex;
		gap: 1rem;
		padding: 1rem 0;
	}

	.tab-button {
		background: none;
		border: none;
		color: var(--text-secondary);
		padding: 0.75rem 1.5rem;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.3s ease;
		font-weight: 600;
	}

	.tab-button:hover {
		background: var(--bg-card);
		color: var(--text-primary);
	}

	.tab-button.active {
		background: var(--accent-primary);
		color: var(--text-inverse);
	}

	.main-content {
		padding: 2rem 0;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 2rem;
	}

	@media (max-width: 768px) {
		.header-content {
			flex-direction: column;
			gap: 1rem;
			text-align: center;
		}

		.tab-buttons {
			flex-wrap: wrap;
		}

		.tab-button {
			flex: 1;
			min-width: 120px;
		}
	}
</style>

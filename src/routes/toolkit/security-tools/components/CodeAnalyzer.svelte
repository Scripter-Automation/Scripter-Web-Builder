<script lang="ts">
	import { writable } from 'svelte/store';

	const codeIssues = writable([
		{
			id: '1',
			type: 'security',
			severity: 'medium',
			title: 'Hardcoded API Key',
			description: 'API key found in source code',
			file: 'src/lib/api.ts',
			line: 15,
			code: 'const API_KEY = "sk-1234567890abcdef";',
			suggestion: 'Move to environment variables'
		},
		{
			id: '2',
			type: 'best-practice',
			severity: 'low',
			title: 'Console.log in Production',
			description: 'Debug statement found in code',
			file: 'src/routes/+page.svelte',
			line: 42,
			code: 'console.log("Debug info");',
			suggestion: 'Remove or use proper logging'
		}
	]);

	let analyzingCode = false;

	function analyzeCode() {
		analyzingCode = true;
		// Simulate code analysis
		setTimeout(() => {
			analyzingCode = false;
		}, 3000);
	}
</script>

<div class="code-analyzer">
	<div class="analyzer-header">
		<h2>🔎 Code Analyzer</h2>
		<p>Basic code analysis for security and best practices</p>
	</div>

	<div class="analyzer-controls">
		<button 
			class="analyze-button" 
			on:click={analyzeCode}
			disabled={analyzingCode}
		>
			{#if analyzingCode}
				⏳ Analyzing...
			{:else}
				🔍 Analyze Code
			{/if}
		</button>
	</div>

	<div class="analysis-results">
		<h3>Code Issues Found</h3>
		
		{#each $codeIssues as issue (issue.id)}
			<div class="issue-card {issue.severity}">
				<div class="issue-header">
					<span class="issue-type">{issue.type}</span>
					<span class="issue-severity {issue.severity}">{issue.severity}</span>
				</div>
				<h4>{issue.title}</h4>
				<p>{issue.description}</p>
				<div class="code-snippet">
					<div class="code-header">
						<span class="file-path">{issue.file}:{issue.line}</span>
					</div>
					<pre><code>{issue.code}</code></pre>
				</div>
				<div class="issue-suggestion">
					<strong>Suggestion:</strong> {issue.suggestion}
				</div>
			</div>
		{/each}

		{#if $codeIssues.length === 0}
			<div class="no-issues">
				🎉 No code issues found!
			</div>
		{/if}
	</div>
</div>

<style>
	.code-analyzer {
		max-width: 800px;
		margin: 0 auto;
	}

	.analyzer-header {
		text-align: center;
		margin-bottom: 2rem;
	}

	.analyzer-header h2 {
		font-size: 1.8rem;
		font-weight: 700;
		margin-bottom: 0.5rem;
		color: var(--text-primary);
	}

	.analyzer-header p {
		color: var(--text-secondary);
		font-size: 1rem;
	}

	.analyzer-controls {
		display: flex;
		justify-content: center;
		margin-bottom: 2rem;
	}

	.analyze-button {
		background: var(--gradient-primary);
		color: var(--text-inverse);
		border: none;
		padding: 1rem 2rem;
		border-radius: 8px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		font-size: 1rem;
	}

	.analyze-button:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: var(--shadow-lg);
	}

	.analyze-button:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.analysis-results h3 {
		font-size: 1.5rem;
		font-weight: 700;
		margin-bottom: 1.5rem;
		color: var(--text-primary);
	}

	.issue-card {
		background: var(--bg-card);
		border: 1px solid var(--border-primary);
		border-radius: 8px;
		padding: 1.5rem;
		margin-bottom: 1rem;
		transition: all 0.3s ease;
	}

	.issue-card:hover {
		box-shadow: var(--shadow-md);
	}

	.issue-card.high {
		border-left: 4px solid #ef4444;
	}

	.issue-card.medium {
		border-left: 4px solid #f59e0b;
	}

	.issue-card.low {
		border-left: 4px solid #10b981;
	}

	.issue-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	.issue-type {
		background: var(--bg-secondary);
		color: var(--text-secondary);
		padding: 0.25rem 0.75rem;
		border-radius: 12px;
		font-size: 0.8rem;
		font-weight: 600;
		text-transform: uppercase;
	}

	.issue-severity {
		padding: 0.25rem 0.75rem;
		border-radius: 12px;
		font-size: 0.8rem;
		font-weight: 600;
		text-transform: uppercase;
	}

	.issue-severity.high {
		background: #fee2e2;
		color: #dc2626;
	}

	.issue-severity.medium {
		background: #fef3c7;
		color: #d97706;
	}

	.issue-severity.low {
		background: #d1fae5;
		color: #059669;
	}

	.issue-card h4 {
		font-size: 1.2rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
		color: var(--text-primary);
	}

	.issue-card p {
		color: var(--text-secondary);
		margin-bottom: 1rem;
		line-height: 1.5;
	}

	.code-snippet {
		margin-bottom: 1rem;
	}

	.code-header {
		background: var(--bg-secondary);
		padding: 0.5rem 1rem;
		border-top-left-radius: 6px;
		border-top-right-radius: 6px;
		border-bottom: 1px solid var(--border-primary);
	}

	.file-path {
		color: var(--text-secondary);
		font-family: monospace;
		font-size: 0.9rem;
	}

	.code-snippet pre {
		background: var(--bg-secondary);
		border: 1px solid var(--border-primary);
		border-top: none;
		border-bottom-left-radius: 6px;
		border-bottom-right-radius: 6px;
		padding: 1rem;
		margin: 0;
		overflow-x: auto;
	}

	.code-snippet code {
		color: var(--text-primary);
		font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
		font-size: 0.9rem;
		line-height: 1.4;
	}

	.issue-suggestion {
		background: var(--bg-secondary);
		border: 1px solid var(--border-primary);
		border-radius: 6px;
		padding: 1rem;
		font-size: 0.9rem;
		color: var(--text-secondary);
	}

	.no-issues {
		text-align: center;
		padding: 3rem;
		color: var(--text-secondary);
		font-size: 1.2rem;
		background: var(--bg-card);
		border: 1px solid var(--border-primary);
		border-radius: 8px;
	}
</style>

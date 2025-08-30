<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { writable } from 'svelte/store';

	const securityIssues = writable([
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

	export let scanInProgress: boolean;
	export let lastScanTime: Date | null;

	const dispatch = createEventDispatcher();

	function startScan() {
		dispatch('scan');
	}
</script>

<div class="security-scanner">
	<div class="scanner-header">
		<h2>🔍 Security Scanner</h2>
		<p>Basic security scanning for your development environment</p>
	</div>

	<div class="scanner-controls">
		<button 
			class="scan-button" 
			on:click={startScan}
			disabled={scanInProgress}
		>
			{#if scanInProgress}
				⏳ Scanning...
			{:else}
				🔍 Start Security Scan
			{/if}
		</button>

		{#if lastScanTime}
			<div class="last-scan">
				Last scan: {lastScanTime.toLocaleString()}
			</div>
		{/if}
	</div>

	<div class="scan-results">
		<h3>Security Issues Found</h3>
		
		{#each $securityIssues as issue (issue.id)}
			<div class="issue-card {issue.severity}">
				<div class="issue-header">
					<span class="issue-type">{issue.type}</span>
					<span class="issue-severity {issue.severity}">{issue.severity}</span>
				</div>
				<h4>{issue.title}</h4>
				<p>{issue.description}</p>
				<div class="issue-details">
					<span class="file-path">{issue.file}:{issue.line}</span>
				</div>
				<div class="issue-suggestion">
					<strong>Suggestion:</strong> {issue.suggestion}
				</div>
			</div>
		{/each}

		{#if $securityIssues.length === 0}
			<div class="no-issues">
				🎉 No security issues found!
			</div>
		{/if}
	</div>
</div>

<style>
	.security-scanner {
		max-width: 800px;
		margin: 0 auto;
	}

	.scanner-header {
		text-align: center;
		margin-bottom: 2rem;
	}

	.scanner-header h2 {
		font-size: 1.8rem;
		font-weight: 700;
		margin-bottom: 0.5rem;
		color: var(--text-primary);
	}

	.scanner-header p {
		color: var(--text-secondary);
		font-size: 1rem;
	}

	.scanner-controls {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.scan-button {
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

	.scan-button:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: var(--shadow-lg);
	}

	.scan-button:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.last-scan {
		color: var(--text-secondary);
		font-size: 0.9rem;
	}

	.scan-results h3 {
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

	.issue-details {
		margin-bottom: 1rem;
	}

	.file-path {
		background: var(--bg-secondary);
		color: var(--text-secondary);
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		font-family: monospace;
		font-size: 0.9rem;
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

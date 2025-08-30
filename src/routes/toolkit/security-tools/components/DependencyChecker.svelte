<script lang="ts">
	import { writable } from 'svelte/store';

	const dependencies = writable([
		{
			name: 'svelte',
			version: '5.0.0',
			status: 'up-to-date',
			vulnerabilities: 0
		},
		{
			name: 'sveltekit',
			version: '2.0.0',
			status: 'up-to-date',
			vulnerabilities: 0
		},
		{
			name: 'monaco-editor',
			version: '0.45.0',
			status: 'outdated',
			vulnerabilities: 1
		}
	]);

	let checkingDependencies = false;

	function checkDependencies() {
		checkingDependencies = true;
		// Simulate dependency check
		setTimeout(() => {
			checkingDependencies = false;
		}, 2000);
	}
</script>

<div class="dependency-checker">
	<div class="checker-header">
		<h2>📦 Dependency Checker</h2>
		<p>Check for outdated dependencies and security vulnerabilities</p>
	</div>

	<div class="checker-controls">
		<button 
			class="check-button" 
			on:click={checkDependencies}
			disabled={checkingDependencies}
		>
			{#if checkingDependencies}
				⏳ Checking...
			{:else}
				🔍 Check Dependencies
			{/if}
		</button>
	</div>

	<div class="dependencies-list">
		<h3>Dependencies Status</h3>
		
		{#each $dependencies as dep (dep.name)}
			<div class="dependency-card {dep.status}">
				<div class="dep-header">
					<h4>{dep.name}</h4>
					<span class="version">{dep.version}</span>
				</div>
				<div class="dep-status">
					<span class="status-badge {dep.status}">
						{dep.status === 'up-to-date' ? '✅' : '⚠️'} {dep.status}
					</span>
					{#if dep.vulnerabilities > 0}
						<span class="vulnerability-badge">
							🚨 {dep.vulnerabilities} vulnerability{dep.vulnerabilities > 1 ? 'ies' : 'y'}
						</span>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.dependency-checker {
		max-width: 800px;
		margin: 0 auto;
	}

	.checker-header {
		text-align: center;
		margin-bottom: 2rem;
	}

	.checker-header h2 {
		font-size: 1.8rem;
		font-weight: 700;
		margin-bottom: 0.5rem;
		color: var(--text-primary);
	}

	.checker-header p {
		color: var(--text-secondary);
		font-size: 1rem;
	}

	.checker-controls {
		display: flex;
		justify-content: center;
		margin-bottom: 2rem;
	}

	.check-button {
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

	.check-button:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: var(--shadow-lg);
	}

	.check-button:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.dependencies-list h3 {
		font-size: 1.5rem;
		font-weight: 700;
		margin-bottom: 1.5rem;
		color: var(--text-primary);
	}

	.dependency-card {
		background: var(--bg-card);
		border: 1px solid var(--border-primary);
		border-radius: 8px;
		padding: 1.5rem;
		margin-bottom: 1rem;
		transition: all 0.3s ease;
	}

	.dependency-card:hover {
		box-shadow: var(--shadow-md);
	}

	.dependency-card.outdated {
		border-left: 4px solid #f59e0b;
	}

	.dependency-card.up-to-date {
		border-left: 4px solid #10b981;
	}

	.dep-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	.dep-header h4 {
		font-size: 1.2rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.version {
		background: var(--bg-secondary);
		color: var(--text-secondary);
		padding: 0.25rem 0.75rem;
		border-radius: 12px;
		font-family: monospace;
		font-size: 0.9rem;
	}

	.dep-status {
		display: flex;
		gap: 1rem;
		align-items: center;
	}

	.status-badge {
		padding: 0.25rem 0.75rem;
		border-radius: 12px;
		font-size: 0.8rem;
		font-weight: 600;
		text-transform: uppercase;
	}

	.status-badge.up-to-date {
		background: #d1fae5;
		color: #059669;
	}

	.status-badge.outdated {
		background: #fef3c7;
		color: #d97706;
	}

	.vulnerability-badge {
		background: #fee2e2;
		color: #dc2626;
		padding: 0.25rem 0.75rem;
		border-radius: 12px;
		font-size: 0.8rem;
		font-weight: 600;
	}
</style>

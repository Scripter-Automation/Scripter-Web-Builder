<script lang="ts">
	import { theme, toggleTheme } from '$lib/stores/theme';
</script>

<button class="theme-toggle" on:click={toggleTheme} aria-label="Toggle theme">
	<div class="toggle-container">
		{#if $theme === 'light'}
			<span class="icon">🌙</span>
		{:else}
			<span class="icon">☀️</span>
		{/if}
	</div>
</button>

<style>
	.theme-toggle {
		background: var(--bg-card);
		border: 2px solid var(--border-primary);
		border-radius: 50%;
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: var(--shadow-sm);
	}

	.theme-toggle:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow-md);
		border-color: var(--accent-yellow);
	}

	.toggle-container {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.icon {
		font-size: 1.2rem;
		transition: transform 0.3s ease;
	}

	.theme-toggle:hover .icon {
		transform: rotate(15deg);
	}
</style>

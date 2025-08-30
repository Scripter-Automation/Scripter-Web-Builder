<script lang="ts">
	import { onMount } from 'svelte';
	import MarkdownEditor from './components/MarkdownEditor.svelte';
	import MarkdownPreview from './components/MarkdownPreview.svelte';
	import { writable } from 'svelte/store';

	// Store for the markdown content
	export const markdownContent = writable(`# Standard Operating Procedure

## Overview
This is a template for creating Standard Operating Procedures (SOPs).

## Purpose
Define the purpose and scope of this SOP.

## Procedure
1. **Step 1**: Describe the first step
2. **Step 2**: Describe the second step
3. **Step 3**: Describe the third step

## Safety Considerations
- List any safety requirements
- Include PPE requirements if applicable
- Note any hazards

## Equipment Needed
- Item 1
- Item 2
- Item 3

## References
- Reference 1
- Reference 2

---
*Last updated: ${new Date().toLocaleDateString()}*
`);

	let isFullscreen = false;
	let editorWidth = 50; // percentage

	function toggleFullscreen() {
		isFullscreen = !isFullscreen;
	}

	function adjustSplit(direction: 'left' | 'right') {
		if (direction === 'left' && editorWidth > 20) {
			editorWidth -= 5;
		} else if (direction === 'right' && editorWidth < 80) {
			editorWidth += 5;
		}
	}
</script>

<svelte:head>
	<title>SOP Manager</title>
	<style>
		:global(body) {
			margin: 0;
			padding: 0;
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		}
	</style>
</svelte:head>

<div class="sop-manager {isFullscreen ? 'fullscreen' : ''}">
	<header class="header">
		<h1>SOP Manager</h1>
		<div class="controls">
			<button class="btn" on:click={() => adjustSplit('left')} title="Increase editor width">
				←
			</button>
			<button class="btn" on:click={() => adjustSplit('right')} title="Increase preview width">
				→
			</button>
			<button class="btn" on:click={toggleFullscreen} title="Toggle fullscreen">
				{isFullscreen ? '⤓' : '⤢'}
			</button>
		</div>
	</header>

	<main class="main-content">
		<div class="editor-panel" style="width: {editorWidth}%">
			<MarkdownEditor bind:content={$markdownContent} />
		</div>
		
		<div class="preview-panel" style="width: {100 - editorWidth}%">
			<MarkdownPreview content={$markdownContent} />
		</div>
	</main>
</div>

<style>
	.sop-manager {
		height: 100vh;
		display: flex;
		flex-direction: column;
		background: var(--gradient-bg);
	}

	.sop-manager.fullscreen {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 9999;
	}

	.header {
		background: var(--bg-header);
		color: var(--text-inverse);
		padding: 1rem 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-shadow: var(--shadow-sm);
	}

	.header h1 {
		margin: 0;
		font-size: 1.5rem;
		font-weight: 600;
	}

	.controls {
		display: flex;
		gap: 0.5rem;
	}

	.btn {
		background: var(--bg-secondary);
		color: var(--text-primary);
		border: none;
		padding: 0.5rem 1rem;
		border-radius: 4px;
		cursor: pointer;
		font-size: 1rem;
		transition: background-color 0.2s;
	}

	.btn:hover {
		background: var(--bg-tertiary);
	}

	.main-content {
		flex: 1;
		display: flex;
		overflow: hidden;
	}

	.editor-panel,
	.preview-panel {
		height: 100%;
		transition: width 0.3s ease;
	}

	.editor-panel {
		border-right: 2px solid var(--border-primary);
	}

	@media (max-width: 768px) {
		.main-content {
			flex-direction: column;
		}

		.editor-panel,
		.preview-panel {
			width: 100% !important;
			height: 50%;
		}

		.editor-panel {
			border-right: none;
			border-bottom: 2px solid var(--border-primary);
		}
	}
</style>

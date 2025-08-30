<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	interface ContentBlock {
		id: string;
		type: 'heading' | 'paragraph' | 'list' | 'quote' | 'image' | 'divider';
		content: string;
		level?: number; // for headings
		listType?: 'ordered' | 'unordered'; // for lists
		items?: string[]; // for lists
	}

	export let content: string = '';
	export let onChange: (content: string) => void;

	const dispatch = createEventDispatcher();

	let blocks: ContentBlock[] = [];
	let selectedBlockId: string | null = null;

	// Initialize blocks from markdown content
	$: if (content) {
		blocks = parseMarkdownToBlocks(content);
	}

	function parseMarkdownToBlocks(markdown: string): ContentBlock[] {
		if (!markdown.trim()) {
			return [{ id: generateId(), type: 'paragraph', content: '' }];
		}

		const lines = markdown.split('\n');
		const blocks: ContentBlock[] = [];
		let currentList: string[] = [];
		let currentListType: 'ordered' | 'unordered' | null = null;

		for (let i = 0; i < lines.length; i++) {
			const line = lines[i].trim();
			
			if (!line) {
				// Flush current list if exists
				if (currentList.length > 0) {
					blocks.push({
						id: generateId(),
						type: 'list',
						content: '',
						listType: currentListType!,
						items: [...currentList]
					});
					currentList = [];
					currentListType = null;
				}
				continue;
			}

			// Check for headings
			if (line.startsWith('#')) {
				const level = line.match(/^#+/)?.[0].length || 1;
				const headingContent = line.replace(/^#+\s*/, '');
				blocks.push({
					id: generateId(),
					type: 'heading',
					content: headingContent,
					level: Math.min(level, 3)
				});
				continue;
			}

			// Check for lists
			if (line.match(/^[\s]*[-*+]\s/)) {
				if (currentListType !== 'unordered') {
					if (currentList.length > 0) {
						blocks.push({
							id: generateId(),
							type: 'list',
							content: '',
							listType: currentListType!,
							items: [...currentList]
						});
						currentList = [];
					}
					currentListType = 'unordered';
				}
				currentList.push(line.replace(/^[\s]*[-*+]\s/, ''));
				continue;
			}

			if (line.match(/^[\s]*\d+\.\s/)) {
				if (currentListType !== 'ordered') {
					if (currentList.length > 0) {
						blocks.push({
							id: generateId(),
							type: 'list',
							content: '',
							listType: currentListType!,
							items: [...currentList]
						});
						currentList = [];
					}
					currentListType = 'ordered';
				}
				currentList.push(line.replace(/^[\s]*\d+\.\s/, ''));
				continue;
			}

			// Check for quotes
			if (line.startsWith('>')) {
				blocks.push({
					id: generateId(),
					type: 'quote',
					content: line.replace(/^>\s*/, '')
				});
				continue;
			}

			// Check for dividers
			if (line.match(/^[-*_]{3,}$/)) {
				blocks.push({
					id: generateId(),
					type: 'divider',
					content: ''
				});
				continue;
			}

			// Regular paragraph
			blocks.push({
				id: generateId(),
				type: 'paragraph',
				content: line
			});
		}

		// Flush any remaining list
		if (currentList.length > 0) {
			blocks.push({
				id: generateId(),
				type: 'list',
				content: '',
				listType: currentListType!,
				items: [...currentList]
			});
		}

		return blocks.length > 0 ? blocks : [{ id: generateId(), type: 'paragraph', content: '' }];
	}

	function generateId(): string {
		return Math.random().toString(36).substr(2, 9);
	}

	function addBlock(type: ContentBlock['type'], afterId?: string) {
		const newBlock: ContentBlock = {
			id: generateId(),
			type,
			content: '',
			level: type === 'heading' ? 1 : undefined,
			listType: type === 'list' ? 'unordered' : undefined,
			items: type === 'list' ? [''] : undefined
		};

		if (afterId) {
			const index = blocks.findIndex(b => b.id === afterId);
			blocks = [...blocks.slice(0, index + 1), newBlock, ...blocks.slice(index + 1)];
		} else {
			blocks = [...blocks, newBlock];
		}

		selectedBlockId = newBlock.id;
		updateContent();
	}

	function removeBlock(blockId: string) {
		blocks = blocks.filter(b => b.id !== blockId);
		if (blocks.length === 0) {
			blocks = [{ id: generateId(), type: 'paragraph', content: '' }];
		}
		updateContent();
	}

	function updateBlock(blockId: string, updates: Partial<ContentBlock>) {
		blocks = blocks.map(b => b.id === blockId ? { ...b, ...updates } : b);
		updateContent();
	}

	function updateContent() {
		const markdown = blocks.map(block => {
			switch (block.type) {
				case 'heading':
					return '#'.repeat(block.level || 1) + ' ' + block.content;
				case 'paragraph':
					return block.content;
				case 'list':
					if (block.items && block.items.length > 0) {
						return block.items.map((item, index) => {
							const prefix = block.listType === 'ordered' ? `${index + 1}.` : '-';
							return `${prefix} ${item}`;
						}).join('\n');
					}
					return '';
				case 'quote':
					return '> ' + block.content;
				case 'divider':
					return '---';
				case 'image':
					return `![${block.content}](image-url)`;
				default:
					return block.content;
			}
		}).join('\n\n');

		onChange(markdown);
	}

	function moveBlock(blockId: string, direction: 'up' | 'down') {
		const index = blocks.findIndex(b => b.id === blockId);
		if (direction === 'up' && index > 0) {
			blocks = [
				...blocks.slice(0, index - 1),
				blocks[index],
				blocks[index - 1],
				...blocks.slice(index + 1)
			];
		} else if (direction === 'down' && index < blocks.length - 1) {
			blocks = [
				...blocks.slice(0, index),
				blocks[index + 1],
				blocks[index],
				...blocks.slice(index + 2)
			];
		}
		updateContent();
	}
</script>

<div class="visual-editor">
	<div class="toolbar">
		<button class="toolbar-btn" on:click={() => addBlock('heading')} title="Add Heading">
			📝 Heading
		</button>
		<button class="toolbar-btn" on:click={() => addBlock('paragraph')} title="Add Paragraph">
			📄 Paragraph
		</button>
		<button class="toolbar-btn" on:click={() => addBlock('list')} title="Add List">
			📋 List
		</button>
		<button class="toolbar-btn" on:click={() => addBlock('quote')} title="Add Quote">
			💬 Quote
		</button>
		<button class="toolbar-btn" on:click={() => addBlock('divider')} title="Add Divider">
			➖ Divider
		</button>
	</div>

	<div class="content-area">
		{#each blocks as block, index (block.id)}
			<div class="content-block" class:selected={selectedBlockId === block.id}>
				<div class="block-toolbar">
					<button class="block-btn" on:click={() => selectedBlockId = block.id} title="Select">
						✏️
					</button>
					<button class="block-btn" on:click={() => moveBlock(block.id, 'up')} disabled={index === 0} title="Move Up">
						⬆️
					</button>
					<button class="block-btn" on:click={() => moveBlock(block.id, 'down')} disabled={index === blocks.length - 1} title="Move Down">
						⬇️
					</button>
					<button class="block-btn danger" on:click={() => removeBlock(block.id)} title="Remove">
						🗑️
					</button>
				</div>

				<div class="block-content">
					{#if block.type === 'heading'}
						<div class="heading-block">
							<select 
								bind:value={block.level} 
								on:change={() => updateBlock(block.id, { level: block.level })}
								class="heading-level"
							>
								<option value={1}>H1</option>
								<option value={2}>H2</option>
								<option value={3}>H3</option>
							</select>
							<input 
								type="text" 
								bind:value={block.content}
								on:input={() => updateBlock(block.id, { content: block.content })}
								placeholder="Enter heading text..."
								class="heading-input"
							/>
						</div>
					{:else if block.type === 'paragraph'}
						<textarea 
							bind:value={block.content}
							on:input={() => updateBlock(block.id, { content: block.content })}
							placeholder="Write your paragraph here..."
							class="paragraph-input"
							rows="3"
						></textarea>
					{:else if block.type === 'list'}
						<div class="list-block">
							<select 
								bind:value={block.listType} 
								on:change={() => updateBlock(block.id, { listType: block.listType })}
								class="list-type"
							>
								<option value="unordered">• Unordered</option>
								<option value="ordered">1. Ordered</option>
							</select>
							<div class="list-items">
								{#each block.items || [] as item, itemIndex}
									<div class="list-item">
										<input 
											type="text" 
											bind:value={block.items[itemIndex]}
											on:input={() => updateBlock(block.id, { items: block.items })}
											placeholder="List item..."
											class="list-item-input"
										/>
										<button 
											class="remove-item-btn" 
											on:click={() => {
												block.items = block.items?.filter((_, i) => i !== itemIndex);
												updateBlock(block.id, { items: block.items });
											}}
										>
											❌
										</button>
									</div>
								{/each}
								<button 
									class="add-item-btn" 
									on:click={() => {
										block.items = [...(block.items || []), ''];
										updateBlock(block.id, { items: block.items });
									}}
								>
									+ Add Item
								</button>
							</div>
						</div>
					{:else if block.type === 'quote'}
						<div class="quote-block">
							<div class="quote-icon">💬</div>
							<textarea 
								bind:value={block.content}
								on:input={() => updateBlock(block.id, { content: block.content })}
								placeholder="Enter your quote..."
								class="quote-input"
								rows="2"
							></textarea>
						</div>
					{:else if block.type === 'divider'}
						<div class="divider-block">
							<hr class="divider" />
						</div>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.visual-editor {
		display: flex;
		flex-direction: column;
		height: 100%;
		background: var(--bg-card);
		border-radius: 8px;
		overflow: hidden;
	}

	.toolbar {
		display: flex;
		gap: 0.5rem;
		padding: 1rem;
		background: var(--bg-secondary);
		border-bottom: 1px solid var(--border-primary);
		flex-wrap: wrap;
	}

	.toolbar-btn {
		background: var(--bg-card);
		border: 1px solid var(--border-primary);
		color: var(--text-primary);
		padding: 0.5rem 1rem;
		border-radius: 6px;
		cursor: pointer;
		transition: all 0.2s;
		font-size: 0.9rem;
	}

	.toolbar-btn:hover {
		background: var(--bg-tertiary);
		border-color: var(--accent-primary);
	}

	.content-area {
		flex: 1;
		overflow-y: auto;
		padding: 1rem;
	}

	.content-block {
		position: relative;
		margin-bottom: 1rem;
		border: 2px solid transparent;
		border-radius: 8px;
		transition: all 0.2s;
	}

	.content-block:hover {
		border-color: var(--border-primary);
	}

	.content-block.selected {
		border-color: var(--accent-primary);
		background: var(--bg-secondary);
	}

	.block-toolbar {
		position: absolute;
		top: -10px;
		right: 10px;
		display: flex;
		gap: 0.25rem;
		background: var(--bg-card);
		border: 1px solid var(--border-primary);
		border-radius: 6px;
		padding: 0.25rem;
		opacity: 0;
		transition: opacity 0.2s;
	}

	.content-block:hover .block-toolbar,
	.content-block.selected .block-toolbar {
		opacity: 1;
	}

	.block-btn {
		background: none;
		border: none;
		padding: 0.25rem;
		border-radius: 4px;
		cursor: pointer;
		font-size: 0.8rem;
		transition: background-color 0.2s;
	}

	.block-btn:hover {
		background: var(--bg-tertiary);
	}

	.block-btn.danger:hover {
		background: var(--accent-red);
		color: var(--text-inverse);
	}

	.block-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.block-content {
		padding: 1rem;
	}

	.heading-block {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.heading-level {
		background: var(--bg-card);
		border: 1px solid var(--border-primary);
		color: var(--text-primary);
		padding: 0.5rem;
		border-radius: 4px;
		font-size: 0.9rem;
		min-width: 60px;
	}

	.heading-input {
		flex: 1;
		background: var(--bg-card);
		border: 1px solid var(--border-primary);
		color: var(--text-primary);
		padding: 0.75rem;
		border-radius: 6px;
		font-size: 1.1rem;
		font-weight: 600;
	}

	.paragraph-input {
		width: 100%;
		background: var(--bg-card);
		border: 1px solid var(--border-primary);
		color: var(--text-primary);
		padding: 0.75rem;
		border-radius: 6px;
		font-size: 1rem;
		line-height: 1.6;
		resize: vertical;
	}

	.list-block {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.list-type {
		background: var(--bg-card);
		border: 1px solid var(--border-primary);
		color: var(--text-primary);
		padding: 0.5rem;
		border-radius: 4px;
		font-size: 0.9rem;
		width: fit-content;
	}

	.list-items {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.list-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.list-item-input {
		flex: 1;
		background: var(--bg-card);
		border: 1px solid var(--border-primary);
		color: var(--text-primary);
		padding: 0.5rem;
		border-radius: 4px;
		font-size: 0.9rem;
	}

	.remove-item-btn {
		background: none;
		border: none;
		cursor: pointer;
		font-size: 0.8rem;
		padding: 0.25rem;
		border-radius: 4px;
		transition: background-color 0.2s;
	}

	.remove-item-btn:hover {
		background: var(--accent-red);
		color: var(--text-inverse);
	}

	.add-item-btn {
		background: var(--bg-secondary);
		border: 1px dashed var(--border-primary);
		color: var(--text-muted);
		padding: 0.5rem;
		border-radius: 4px;
		cursor: pointer;
		font-size: 0.9rem;
		transition: all 0.2s;
	}

	.add-item-btn:hover {
		background: var(--bg-tertiary);
		border-color: var(--accent-primary);
		color: var(--accent-primary);
	}

	.quote-block {
		display: flex;
		align-items: flex-start;
		gap: 1rem;
		background: var(--bg-secondary);
		border-left: 4px solid var(--accent-primary);
		padding: 1rem;
		border-radius: 6px;
	}

	.quote-icon {
		font-size: 1.5rem;
		color: var(--accent-primary);
	}

	.quote-input {
		flex: 1;
		background: var(--bg-card);
		border: 1px solid var(--border-primary);
		color: var(--text-primary);
		padding: 0.75rem;
		border-radius: 4px;
		font-size: 1rem;
		font-style: italic;
		resize: vertical;
	}

	.divider-block {
		text-align: center;
		padding: 1rem 0;
	}

	.divider {
		border: none;
		border-top: 2px solid var(--border-primary);
		width: 100%;
	}

	/* Focus styles */
	.heading-input:focus,
	.paragraph-input:focus,
	.list-item-input:focus,
	.quote-input:focus {
		outline: none;
		border-color: var(--accent-primary);
		box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
	}
</style>

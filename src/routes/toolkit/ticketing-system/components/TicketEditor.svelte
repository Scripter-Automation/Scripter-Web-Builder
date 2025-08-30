<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import type { Writable } from 'svelte/store';

	interface Ticket {
		id: string;
		title: string;
		description: string;
		content: string;
		status: string;
		priority: string;
		category: string;
		assignee: string;
		resolverGroup: string;
		createdBy: string;
		createdAt: Date;
		updatedAt: Date;
		tags: string[];
	}

	interface ResolverGroup {
		id: string;
		name: string;
		description: string;
		members: string[];
		lead: string;
		createdAt: Date;
	}

	interface Template {
		id: string;
		name: string;
		description: string;
		content: string;
		category: string;
		createdAt: Date;
	}

	export let ticket: Ticket;
	export let isCreating: boolean;
	export let resolverGroups: Writable<ResolverGroup[]>;
	export let templates: Writable<Template[]>;
	export let ticketCategories: any[];
	export let ticketPriorities: any[];
	export let ticketStatuses: any[];

	const dispatch = createEventDispatcher();

	let editor: any;
	let editorContainer: HTMLElement;
	let previewContainer: HTMLElement;
	let splitPosition = 50;
	let isDragging = false;

	let editedTicket: Ticket = { ...ticket };
	let selectedTemplate = '';
	let newTag = '';

	onMount(async () => {
		if (editorContainer && typeof window !== 'undefined') {
			const monaco = await import('monaco-editor');
			editor = monaco.editor.create(editorContainer, {
				value: editedTicket.content,
				language: 'markdown',
				theme: 'vs-dark',
				automaticLayout: true,
				minimap: { enabled: false },
				scrollBeyondLastLine: false,
				fontSize: 14,
				lineNumbers: 'on',
				wordWrap: 'on',
				folding: true,
				renderWhitespace: 'selection',
				quickSuggestions: {
					other: true,
					comments: false,
					strings: false
				},
				suggestOnTriggerCharacters: true,
				wordBasedSuggestions: 'off'
			});

			editor.onDidChangeModelContent(() => {
				editedTicket.content = editor.getValue();
			});
		}
	});

	function applyTemplate() {
		if (selectedTemplate) {
			const template = $templates.find(t => t.id === selectedTemplate);
			if (template) {
				editedTicket.content = template.content;
				editedTicket.category = template.category;
				if (editor) {
					editor.setValue(template.content);
				}
			}
		}
	}

	function addTag() {
		if (newTag.trim() && !editedTicket.tags.includes(newTag.trim())) {
			editedTicket.tags = [...editedTicket.tags, newTag.trim()];
			newTag = '';
		}
	}

	function removeTag(tag: string) {
		editedTicket.tags = editedTicket.tags.filter(t => t !== tag);
	}

	function markdownToHtml(markdown: string): string {
		return markdown
			// Headers
			.replace(/^### (.*$)/gim, '<h3>$1</h3>')
			.replace(/^## (.*$)/gim, '<h2>$1</h2>')
			.replace(/^# (.*$)/gim, '<h1>$1</h1>')
			// Bold
			.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
			// Italic
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

	function handleSave() {
		dispatch('save', editedTicket);
	}

	function handleCancel() {
		dispatch('cancel');
	}

	function startDrag(event: MouseEvent) {
		isDragging = true;
		document.addEventListener('mousemove', handleDrag);
		document.addEventListener('mouseup', stopDrag);
	}

	function handleDrag(event: MouseEvent) {
		if (isDragging) {
			const container = editorContainer?.parentElement;
			if (container) {
				const rect = container.getBoundingClientRect();
				const newPosition = ((event.clientX - rect.left) / rect.width) * 100;
				splitPosition = Math.max(20, Math.min(80, newPosition));
			}
		}
	}

	function stopDrag() {
		isDragging = false;
		document.removeEventListener('mousemove', handleDrag);
		document.removeEventListener('mouseup', stopDrag);
	}

	function insertText(before: string, after: string) {
		if (editor) {
			const selection = editor.getSelection();
			if (selection) {
				const selectedText = editor.getModel()?.getValueInRange(selection) || '';
				const newText = before + selectedText + after;
				editor.executeEdits('insertText', [{
					range: selection,
					text: newText
				}]);
			}
		}
	}

	$: if (previewContainer && editedTicket.content) {
		previewContainer.innerHTML = markdownToHtml(editedTicket.content);
	}
</script>

<div class="ticket-editor">
	<div class="editor-header">
		<div class="header-left">
			<h2>{isCreating ? 'Create New Ticket' : 'Edit Ticket'}</h2>
		</div>
		<div class="header-right">
			<button class="btn btn-secondary" on:click={handleCancel}>Cancel</button>
			<button class="btn btn-primary" on:click={handleSave}>Save Ticket</button>
		</div>
	</div>

	<div class="editor-content">
		<div class="metadata-panel">
			<div class="form-group">
				<label for="title">Title *</label>
				<input 
					id="title"
					type="text" 
					bind:value={editedTicket.title}
					placeholder="Enter ticket title"
					class="form-input"
				/>
			</div>

			<div class="form-group">
				<label for="description">Description *</label>
				<textarea 
					id="description"
					bind:value={editedTicket.description}
					placeholder="Brief description of the ticket"
					class="form-textarea"
					rows="3"
				></textarea>
			</div>

			<div class="form-row">
				<div class="form-group">
					<label for="category">Category</label>
					<select id="category" bind:value={editedTicket.category} class="form-select">
						{#each ticketCategories as category}
							<option value={category.id}>{category.name}</option>
						{/each}
					</select>
				</div>

				<div class="form-group">
					<label for="priority">Priority</label>
					<select id="priority" bind:value={editedTicket.priority} class="form-select">
						{#each ticketPriorities as priority}
							<option value={priority.id}>{priority.name}</option>
						{/each}
					</select>
				</div>
			</div>

			<div class="form-row">
				<div class="form-group">
					<label for="status">Status</label>
					<select id="status" bind:value={editedTicket.status} class="form-select">
						{#each ticketStatuses as status}
							<option value={status.id}>{status.name}</option>
						{/each}
					</select>
				</div>

				<div class="form-group">
					<label for="assignee">Assignee</label>
					<input 
						id="assignee"
						type="email" 
						bind:value={editedTicket.assignee}
						placeholder="assignee@company.com"
						class="form-input"
					/>
				</div>
			</div>

			<div class="form-group">
				<label for="resolverGroup">Resolver Group</label>
				<select id="resolverGroup" bind:value={editedTicket.resolverGroup} class="form-select">
					<option value="">Select a resolver group</option>
					{#each $resolverGroups as group}
						<option value={group.id}>{group.name}</option>
					{/each}
				</select>
			</div>

			<div class="form-group">
				<label for="template">Apply Template</label>
				<div class="template-selector">
					<select id="template" bind:value={selectedTemplate} class="form-select">
						<option value="">Select a template</option>
						{#each $templates as template}
							<option value={template.id}>{template.name}</option>
						{/each}
					</select>
					<button class="btn btn-sm" on:click={applyTemplate} disabled={!selectedTemplate}>
						Apply
					</button>
				</div>
			</div>

			<div class="form-group">
				<label for="tags">Tags</label>
				<div class="tags-input">
					<input 
						id="tags"
						type="text" 
						bind:value={newTag}
						placeholder="Add a tag"
						class="form-input"
						on:keydown={(e) => e.key === 'Enter' && addTag()}
					/>
					<button class="btn btn-sm" on:click={addTag} disabled={!newTag.trim()}>
						Add
					</button>
				</div>
				<div class="tags-list">
					{#each editedTicket.tags as tag}
						<span class="tag">
							{tag}
							<button class="tag-remove" on:click={() => removeTag(tag)}>×</button>
						</span>
					{/each}
				</div>
			</div>
		</div>

		<div class="content-panel">
			<div class="content-header">
				<h3>Content</h3>
				<div class="editor-controls">
					<button class="control-btn" on:click={() => splitPosition = 50}>50/50</button>
					<button class="control-btn" on:click={() => splitPosition = 70}>70/30</button>
					<button class="control-btn" on:click={() => splitPosition = 30}>30/70</button>
					<button class="control-btn fullscreen-btn" on:click={() => splitPosition = 100}>
						{splitPosition === 100 ? 'Split' : 'Fullscreen'}
					</button>
				</div>
			</div>
			
			<div class="editor-container">
				{#if splitPosition < 100}
					<div class="editor-panel" style="width: {splitPosition}%">
						<div class="editor-header">
							<span class="editor-label">Markdown Editor</span>
							<div class="editor-tools">
								<button class="tool-btn" on:click={() => insertText('**', '**')}>Bold</button>
								<button class="tool-btn" on:click={() => insertText('*', '*')}>Italic</button>
								<button class="tool-btn" on:click={() => insertText('`', '`')}>Code</button>
								<button class="tool-btn" on:click={() => insertText('# ', '')}>H1</button>
								<button class="tool-btn" on:click={() => insertText('## ', '')}>H2</button>
								<button class="tool-btn" on:click={() => insertText('- ', '')}>List</button>
							</div>
						</div>
						<div bind:this={editorContainer} class="monaco-container"></div>
					</div>
					
					<div class="split-handle" on:mousedown={startDrag}></div>
					
					<div class="preview-panel" style="width: {100 - splitPosition}%">
						<div class="preview-header">
							<span class="preview-label">Live Preview</span>
						</div>
						<div bind:this={previewContainer} class="preview-content"></div>
					</div>
				{:else}
					<div class="fullscreen-editor">
						<div class="editor-header">
							<span class="editor-label">Markdown Editor</span>
							<div class="editor-tools">
								<button class="tool-btn" on:click={() => insertText('**', '**')}>Bold</button>
								<button class="tool-btn" on:click={() => insertText('*', '*')}>Italic</button>
								<button class="tool-btn" on:click={() => insertText('`', '`')}>Code</button>
								<button class="tool-btn" on:click={() => insertText('# ', '')}>H1</button>
								<button class="tool-btn" on:click={() => insertText('## ', '')}>H2</button>
								<button class="tool-btn" on:click={() => insertText('- ', '')}>List</button>
							</div>
						</div>
						<div bind:this={editorContainer} class="monaco-container"></div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	.ticket-editor {
		height: 100%;
		display: flex;
		flex-direction: column;
		background: #f8f9fa;
	}

	.editor-header {
		background: var(--bg-header);
		color: var(--text-inverse);
		border-bottom: 1px solid var(--border-accent);
		padding: 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		box-sizing: border-box;
		box-shadow: var(--shadow-lg);
	}

	.editor-header h2 {
		margin: 0;
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--text-inverse);
	}

	.header-right {
		display: flex;
		gap: 1rem;
	}

	.editor-content {
		flex: 1;
		display: flex;
		gap: 1rem;
		padding: 1rem;
		width: 100%;
		box-sizing: border-box;
	}

	.metadata-panel {
		width: 280px;
		min-width: 280px;
		background: var(--bg-card);
		border-radius: 8px;
		padding: 1rem;
		box-shadow: var(--shadow-sm);
	}

	.content-panel {
		flex: 1;
		min-width: 0;
		background: var(--bg-card);
		border-radius: 8px;
		box-shadow: var(--shadow-sm);
		display: flex;
		flex-direction: column;
	}

	.content-header {
		padding: 1rem 1.5rem;
		border-bottom: 1px solid var(--border-primary);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.content-header h3 {
		margin: 0;
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.editor-controls {
		display: flex;
		gap: 0.5rem;
	}

	.control-btn {
		background: var(--bg-secondary);
		border: 1px solid var(--border-primary);
		padding: 0.5rem 0.75rem;
		border-radius: 6px;
		font-size: 0.8rem;
		cursor: pointer;
		transition: all 0.2s;
		font-weight: 500;
		color: var(--text-primary);
	}

	.control-btn:hover {
		background: var(--bg-tertiary);
		border-color: var(--border-secondary);
	}

	.fullscreen-btn {
		background: var(--gradient-yellow);
		color: var(--text-inverse);
		border-color: var(--accent-yellow);
		box-shadow: var(--shadow-yellow);
	}

	.fullscreen-btn:hover {
		background: var(--gradient-yellow);
		border-color: var(--accent-yellow-dark);
		box-shadow: var(--shadow-yellow-hover);
		filter: brightness(1.1);
	}

	.editor-container {
		flex: 1;
		display: flex;
		position: relative;
		overflow: hidden;
	}

	.editor-panel, .preview-panel {
		display: flex;
		flex-direction: column;
		overflow: hidden;
		border: 1px solid #e9ecef;
		border-radius: 6px;
	}

	.editor-header {
		padding: 0.75rem 1rem;
		border-bottom: 1px solid #e9ecef;
		background: #f8f9fa;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.editor-label, .preview-label {
		font-size: 0.9rem;
		font-weight: 600;
		color: #495057;
	}

	.editor-tools {
		display: flex;
		gap: 0.25rem;
	}

	.tool-btn {
		background: white;
		border: 1px solid #dee2e6;
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		font-size: 0.75rem;
		cursor: pointer;
		transition: all 0.2s;
		font-weight: 500;
	}

	.tool-btn:hover {
		background: #e9ecef;
		border-color: #adb5bd;
	}

	.monaco-container {
		flex: 1;
		min-height: 400px;
	}

	.split-handle {
		width: 6px;
		background: #e9ecef;
		cursor: col-resize;
		transition: background-color 0.2s;
		margin: 0 0.5rem;
		border-radius: 3px;
	}

	.split-handle:hover {
		background: #007bff;
	}

	.preview-header {
		padding: 0.75rem 1rem;
		border-bottom: 1px solid #e9ecef;
		background: #f8f9fa;
	}

	.fullscreen-editor {
		flex: 1;
		display: flex;
		flex-direction: column;
		border: 1px solid #e9ecef;
		border-radius: 6px;
		overflow: hidden;
	}

	.preview-content {
		flex: 1;
		padding: 1.5rem;
		overflow-y: auto;
		line-height: 1.6;
	}

	.preview-content h1, .preview-content h2, .preview-content h3 {
		margin-top: 1.5rem;
		margin-bottom: 0.5rem;
		color: #212529;
	}

	.preview-content h1 { font-size: 1.5rem; }
	.preview-content h2 { font-size: 1.25rem; }
	.preview-content h3 { font-size: 1.1rem; }

	.preview-content p {
		margin-bottom: 1rem;
		color: #495057;
	}

	.preview-content code {
		background: #f1f3f4;
		padding: 0.125rem 0.25rem;
		border-radius: 3px;
		font-family: 'Monaco', 'Menlo', monospace;
		font-size: 0.875rem;
	}

	.preview-content pre {
		background: #f8f9fa;
		padding: 1rem;
		border-radius: 6px;
		overflow-x: auto;
		margin: 1rem 0;
	}

	.preview-content pre code {
		background: none;
		padding: 0;
	}

	.preview-content ul, .preview-content ol {
		margin: 1rem 0;
		padding-left: 1.5rem;
	}

	.preview-content li {
		margin-bottom: 0.25rem;
	}

	.preview-content a {
		color: #007bff;
		text-decoration: none;
	}

	.preview-content a:hover {
		text-decoration: underline;
	}

	.form-group {
		margin-bottom: 1.5rem;
	}

	.form-row {
		display: flex;
		gap: 1rem;
	}

	.form-row .form-group {
		flex: 1;
	}

	.form-group label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 500;
		color: var(--text-primary);
		font-size: 0.9rem;
	}

	.form-input, .form-textarea, .form-select {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid var(--border-primary);
		border-radius: 6px;
		font-size: 0.9rem;
		transition: border-color 0.2s;
		box-sizing: border-box;
		background: var(--bg-card);
		color: var(--text-primary);
	}

	.form-input:focus, .form-textarea:focus, .form-select:focus {
		outline: none;
		border-color: var(--accent-primary);
		box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
	}

	.form-textarea {
		resize: vertical;
		min-height: 80px;
	}

	.template-selector {
		display: flex;
		gap: 0.5rem;
	}

	.template-selector .form-select {
		flex: 1;
	}

	.tags-input {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 0.5rem;
	}

	.tags-input .form-input {
		flex: 1;
	}

	.tags-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.tag {
		background: var(--gradient-yellow);
		color: var(--text-inverse);
		padding: 0.25rem 0.5rem;
		border-radius: 12px;
		font-size: 0.8rem;
		display: flex;
		align-items: center;
		gap: 0.25rem;
		border: 1px solid var(--accent-yellow);
	}

	.tag-remove {
		background: none;
		border: none;
		color: var(--text-inverse);
		cursor: pointer;
		font-size: 1rem;
		padding: 0;
		line-height: 1;
	}

	.tag-remove:hover {
		color: var(--accent-red);
	}

	.btn {
		padding: 0.75rem 1.5rem;
		border: none;
		border-radius: 6px;
		font-size: 0.9rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
	}

	.btn-primary {
		background: var(--gradient-yellow);
		color: var(--text-inverse);
		box-shadow: var(--shadow-yellow);
	}

	.btn-primary:hover {
		background: var(--gradient-yellow);
		box-shadow: var(--shadow-yellow-hover);
		filter: brightness(1.1);
	}

	.btn-secondary {
		background: var(--gradient-slate);
		color: var(--text-inverse);
		box-shadow: var(--shadow-md);
	}

	.btn-secondary:hover {
		background: var(--gradient-slate);
		box-shadow: var(--shadow-lg);
		filter: brightness(1.1);
	}

	.btn-sm {
		padding: 0.5rem 1rem;
		font-size: 0.8rem;
	}

	.btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	@media (max-width: 1200px) {
		.editor-content {
			flex-direction: column;
			gap: 1rem;
		}

		.metadata-panel {
			width: 100%;
			min-width: auto;
		}

		.content-panel {
			min-height: 500px;
		}
	}

	@media (max-width: 768px) {
		.editor-header {
			padding: 0.75rem;
			flex-direction: column;
			gap: 0.75rem;
			align-items: stretch;
		}

		.header-right {
			justify-content: flex-end;
		}

		.editor-content {
			padding: 0.75rem;
			gap: 0.75rem;
		}

		.metadata-panel {
			padding: 0.75rem;
		}

		.form-row {
			flex-direction: column;
		}
	}
</style>

<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import type { Writable } from 'svelte/store';

	interface Template {
		id: string;
		name: string;
		description: string;
		content: string;
		category: string;
		createdAt: Date;
	}

	export let templates: Writable<Template[]>;

	const dispatch = createEventDispatcher();

	let editingTemplate: Template | null = null;
	let isCreating = false;
	let editor: any;
	let editorContainer: HTMLElement;
	let previewContainer: HTMLElement;

	const templateCategories = [
		{ id: 'bug', name: 'Bug Report' },
		{ id: 'feature-request', name: 'Feature Request' },
		{ id: 'support', name: 'Support Request' },
		{ id: 'performance', name: 'Performance Issue' },
		{ id: 'security', name: 'Security Issue' },
		{ id: 'documentation', name: 'Documentation' }
	];

	onMount(async () => {
		if (editorContainer && typeof window !== 'undefined') {
			const monaco = await import('monaco-editor');
			editor = monaco.editor.create(editorContainer, {
				value: '',
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
		}
	});

	function createNewTemplate() {
		isCreating = true;
		editingTemplate = {
			id: `template-${Date.now().toString().slice(-6)}`,
			name: '',
			description: '',
			content: '',
			category: 'bug',
			createdAt: new Date()
		};
		if (editor) {
			editor.setValue('');
		}
	}

	function editTemplate(template: Template) {
		isCreating = false;
		editingTemplate = { ...template };
		if (editor) {
			editor.setValue(template.content);
		}
	}

	function deleteTemplate(templateId: string) {
		if (confirm('Are you sure you want to delete this template?')) {
			dispatch('delete', templateId);
		}
	}

	function saveTemplate() {
		if (editingTemplate && editor) {
			editingTemplate.content = editor.getValue();
			dispatch('save', editingTemplate);
			editingTemplate = null;
			isCreating = false;
		}
	}

	function cancelEdit() {
		editingTemplate = null;
		isCreating = false;
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

	function formatDate(date: Date): string {
		return new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		}).format(date);
	}

	function getCategoryName(categoryId: string): string {
		const category = templateCategories.find(c => c.id === categoryId);
		return category ? category.name : categoryId;
	}

	$: if (previewContainer && editingTemplate && editor) {
		previewContainer.innerHTML = markdownToHtml(editor.getValue());
	}
</script>

<div class="templates">
	<div class="templates-header">
		<div class="header-left">
			<h2>Templates ({$templates.length})</h2>
			<p class="description">Create and manage ticket templates for consistent reporting</p>
		</div>
		<div class="header-right">
			<button class="btn btn-primary" on:click={createNewTemplate}>
				+ Create Template
			</button>
		</div>
	</div>

	{#if editingTemplate}
		<div class="edit-panel">
			<div class="edit-header">
				<h3>{isCreating ? 'Create New Template' : 'Edit Template'}</h3>
			</div>
			<div class="edit-content">
				<div class="form-row">
					<div class="form-group">
						<label for="templateName">Template Name *</label>
						<input 
							id="templateName"
							type="text" 
							bind:value={editingTemplate.name}
							placeholder="Enter template name"
							class="form-input"
						/>
					</div>

					<div class="form-group">
						<label for="templateCategory">Category</label>
						<select id="templateCategory" bind:value={editingTemplate.category} class="form-select">
							{#each templateCategories as category}
								<option value={category.id}>{category.name}</option>
							{/each}
						</select>
					</div>
				</div>

				<div class="form-group">
					<label for="templateDescription">Description</label>
					<textarea 
						id="templateDescription"
						bind:value={editingTemplate.description}
						placeholder="Describe what this template is for"
						class="form-textarea"
						rows="2"
					></textarea>
				</div>

				<div class="content-section">
					<div class="content-header">
						<h4>Template Content (Markdown)</h4>
					</div>
					<div class="content-editor">
						<div class="editor-container">
							<div bind:this={editorContainer} class="monaco-container"></div>
						</div>
						<div class="preview-container">
							<div class="preview-header">
								<h5>Preview</h5>
							</div>
							<div bind:this={previewContainer} class="preview-content"></div>
						</div>
					</div>
				</div>

				<div class="edit-actions">
					<button class="btn btn-secondary" on:click={cancelEdit}>Cancel</button>
					<button class="btn btn-primary" on:click={saveTemplate} disabled={!editingTemplate.name}>
						{isCreating ? 'Create Template' : 'Save Changes'}
					</button>
				</div>
			</div>
		</div>
	{:else}
		<div class="templates-grid">
			{#each $templates as template (template.id)}
				<div class="template-card">
					<div class="template-header">
						<div class="template-info">
							<h3 class="template-name">{template.name}</h3>
							<p class="template-description">{template.description}</p>
						</div>
						<div class="template-actions">
							<button class="action-btn edit-btn" on:click={() => editTemplate(template)}>
								✏️
							</button>
							<button class="action-btn delete-btn" on:click={() => deleteTemplate(template.id)}>
								🗑️
							</button>
						</div>
					</div>
					
					<div class="template-details">
						<div class="detail-item">
							<span class="detail-label">Category:</span>
							<span class="detail-value">{getCategoryName(template.category)}</span>
						</div>
						<div class="detail-item">
							<span class="detail-label">Created:</span>
							<span class="detail-value">{formatDate(template.createdAt)}</span>
						</div>
					</div>

					<div class="template-preview">
						<div class="preview-label">Content Preview:</div>
						<div class="content-preview">{@html markdownToHtml(template.content.substring(0, 200) + (template.content.length > 200 ? '...' : ''))}</div>
					</div>
				</div>
			{:else}
				<div class="empty-state">
					<div class="empty-content">
						<div class="empty-icon">📝</div>
						<h3>No templates</h3>
						<p>Create your first template to standardize ticket creation.</p>
						<button class="btn btn-primary" on:click={createNewTemplate}>
							Create First Template
						</button>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.templates {
		padding: 2rem 0;
	}

	.templates-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 2rem;
	}

	.header-left h2 {
		margin: 0 0 0.5rem 0;
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.description {
		margin: 0;
		color: var(--text-muted);
		font-size: 0.9rem;
	}

	.edit-panel {
		background: var(--bg-card);
		border-radius: 8px;
		box-shadow: var(--shadow-sm);
		overflow: hidden;
	}

	.edit-header {
		background: var(--bg-secondary);
		padding: 1rem 1.5rem;
		border-bottom: 1px solid var(--border-primary);
	}

	.edit-header h3 {
		margin: 0;
		font-size: 1.1rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.edit-content {
		padding: 1.5rem;
	}

	.form-row {
		display: flex;
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	.form-row .form-group {
		flex: 1;
	}

	.form-group {
		margin-bottom: 1.5rem;
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
		min-height: 60px;
	}

	.content-section {
		margin-bottom: 1.5rem;
	}

	.content-header {
		margin-bottom: 1rem;
	}

	.content-header h4 {
		margin: 0;
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.content-editor {
		display: flex;
		gap: 1rem;
		height: 400px;
	}

	.editor-container, .preview-container {
		flex: 1;
		display: flex;
		flex-direction: column;
		border: 1px solid var(--border-primary);
		border-radius: 6px;
		overflow: hidden;
	}

	.monaco-container {
		flex: 1;
	}

	.preview-header {
		background: var(--bg-secondary);
		padding: 0.75rem 1rem;
		border-bottom: 1px solid var(--border-primary);
	}

	.preview-header h5 {
		margin: 0;
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.preview-content {
		flex: 1;
		padding: 1rem;
		overflow-y: auto;
		line-height: 1.6;
		font-size: 0.9rem;
	}

	.preview-content h1, .preview-content h2, .preview-content h3 {
		margin-top: 1rem;
		margin-bottom: 0.5rem;
		color: var(--text-primary);
	}

	.preview-content h1 { font-size: 1.25rem; }
	.preview-content h2 { font-size: 1.1rem; }
	.preview-content h3 { font-size: 1rem; }

	.preview-content p {
		margin-bottom: 0.75rem;
		color: var(--text-secondary);
	}

	.preview-content code {
		background: var(--bg-secondary);
		padding: 0.125rem 0.25rem;
		border-radius: 3px;
		font-family: 'Monaco', 'Menlo', monospace;
		font-size: 0.8rem;
		color: var(--text-primary);
	}

	.preview-content pre {
		background: var(--bg-secondary);
		padding: 0.75rem;
		border-radius: 4px;
		overflow-x: auto;
		margin: 0.75rem 0;
	}

	.preview-content pre code {
		background: none;
		padding: 0;
	}

	.preview-content ul, .preview-content ol {
		margin: 0.75rem 0;
		padding-left: 1.25rem;
	}

	.preview-content li {
		margin-bottom: 0.25rem;
	}

	.preview-content a {
		color: var(--accent-primary);
		text-decoration: none;
	}

	.preview-content a:hover {
		text-decoration: underline;
	}

	.edit-actions {
		display: flex;
		gap: 1rem;
		justify-content: flex-end;
		margin-top: 2rem;
		padding-top: 1rem;
		border-top: 1px solid var(--border-primary);
	}

	.templates-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		gap: 1.5rem;
	}

	.template-card {
		background: var(--bg-card);
		border-radius: 8px;
		padding: 1.5rem;
		box-shadow: var(--shadow-sm);
		transition: transform 0.2s, box-shadow 0.2s;
		border: 1px solid var(--border-primary);
	}

	.template-card:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow-md);
	}

	.template-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 1rem;
	}

	.template-name {
		margin: 0 0 0.5rem 0;
		font-size: 1.1rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.template-description {
		margin: 0;
		font-size: 0.9rem;
		color: var(--text-muted);
		line-height: 1.4;
	}

	.template-actions {
		display: flex;
		gap: 0.5rem;
	}

	.action-btn {
		background: none;
		border: 1px solid var(--border-primary);
		padding: 0.5rem;
		border-radius: 4px;
		cursor: pointer;
		transition: all 0.2s;
		font-size: 0.875rem;
		color: var(--text-primary);
	}

	.edit-btn:hover {
		background: var(--bg-secondary);
		border-color: var(--accent-primary);
		color: var(--accent-primary);
	}

	.delete-btn:hover {
		background: var(--bg-secondary);
		border-color: var(--accent-red);
		color: var(--accent-red);
	}

	.template-details {
		margin-bottom: 1rem;
	}

	.detail-item {
		display: flex;
		justify-content: space-between;
		margin-bottom: 0.5rem;
	}

	.detail-label {
		font-size: 0.8rem;
		color: var(--text-muted);
		font-weight: 500;
	}

	.detail-value {
		font-size: 0.8rem;
		color: var(--text-primary);
		font-weight: 500;
	}

	.template-preview {
		border-top: 1px solid var(--border-primary);
		padding-top: 1rem;
	}

	.preview-label {
		font-size: 0.8rem;
		color: var(--text-muted);
		font-weight: 500;
		margin-bottom: 0.5rem;
	}

	.content-preview {
		font-size: 0.8rem;
		color: var(--text-secondary);
		line-height: 1.4;
		max-height: 100px;
		overflow: hidden;
	}

	.content-preview h1, .content-preview h2, .content-preview h3 {
		margin: 0.25rem 0;
		font-size: 0.9rem;
	}

	.content-preview p {
		margin: 0.25rem 0;
	}

	.empty-state {
		grid-column: 1 / -1;
		text-align: center;
		padding: 4rem 2rem;
	}

	.empty-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		max-width: 400px;
		margin: 0 auto;
	}

	.empty-icon {
		font-size: 3rem;
		opacity: 0.5;
	}

	.empty-content h3 {
		margin: 0;
		color: var(--text-primary);
		font-weight: 600;
	}

	.empty-content p {
		margin: 0;
		color: var(--text-muted);
		line-height: 1.5;
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
		background: var(--gradient-primary);
		color: var(--text-inverse);
	}

	.btn-primary:hover {
		background: var(--gradient-primary);
		filter: brightness(1.1);
	}

	.btn-secondary {
		background: var(--gradient-slate);
		color: var(--text-inverse);
	}

	.btn-secondary:hover {
		background: var(--gradient-slate);
		filter: brightness(1.1);
	}

	.btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	@media (max-width: 1200px) {
		.content-editor {
			flex-direction: column;
			height: auto;
		}

		.editor-container, .preview-container {
			height: 300px;
		}
	}

	@media (max-width: 768px) {
		.templates-header {
			flex-direction: column;
			gap: 1rem;
			align-items: stretch;
		}

		.form-row {
			flex-direction: column;
		}

		.templates-grid {
			grid-template-columns: 1fr;
		}

		.edit-actions {
			flex-direction: column;
		}
	}
</style>

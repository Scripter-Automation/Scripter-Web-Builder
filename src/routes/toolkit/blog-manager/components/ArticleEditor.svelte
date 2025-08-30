<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import VisualEditor from './VisualEditor.svelte';

	interface Article {
		id: string;
		title: string;
		excerpt: string;
		content: string;
		author: string;
		createdAt: Date;
		updatedAt: Date;
		status: 'draft' | 'published';
		tags: string[];
	}

	export let article: Article;
	export let isCreating: boolean;

	const dispatch = createEventDispatcher();

	let title = article.title;
	let excerpt = article.excerpt;
	let author = article.author;
	let status = article.status;
	let tags = article.tags.join(', ');
	let content = article.content;

	let editorContainer: HTMLElement;
	let editor: any;
	let isDirty = false;
	let editorMode: 'markdown' | 'visual' = 'visual';

	onMount(async () => {
		if (editorContainer && typeof window !== 'undefined') {
			const monaco = await import('monaco-editor');
			editor = monaco.editor.create(editorContainer, {
				value: content,
				language: 'markdown',
				theme: document.documentElement.getAttribute('data-theme') === 'dark' ? 'vs-dark' : 'vs',
				automaticLayout: true,
				minimap: { enabled: false },
				scrollBeyondLastLine: false,
				fontSize: 16,
				lineNumbers: 'off',
				wordWrap: 'on',
				renderWhitespace: 'selection',
				tabSize: 2,
				insertSpaces: true,
				detectIndentation: false,
				trimAutoWhitespace: true,
				largeFileOptimizations: false,
				scrollbar: {
					vertical: 'visible',
					horizontal: 'visible'
				},
				overviewRulerBorder: false,
				hideCursorInOverviewRuler: true,
				overviewRulerLanes: 0,
				lineDecorationsWidth: 0,
				glyphMargin: false,
				folding: false,
				lineNumbersMinChars: 0,
				renderLineHighlight: 'none',
				selectOnLineNumbers: false,
				roundedSelection: false,
				readOnly: false,
				cursorStyle: 'line',
				contextmenu: true,
				mouseWheelZoom: false,
				quickSuggestions: false,
				parameterHints: {
					enabled: false
				},
				wordBasedSuggestions: 'off',
				suggestOnTriggerCharacters: false,
				acceptSuggestionOnEnter: 'off',
				tabCompletion: 'off',
				wordWrapColumn: 80,
				wrappingIndent: 'indent'
			});

			// Update content when editor changes
			editor.onDidChangeModelContent(() => {
				content = editor.getValue();
				isDirty = true;
			});

			// Set initial content
			editor.setValue(content);
		}
	});

	onDestroy(() => {
		if (editor) {
			editor.dispose();
		}
	});

	function handleSave() {
		const updatedArticle: Article = {
			...article,
			title,
			excerpt,
			author,
			status,
			tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
			content,
			updatedAt: new Date()
		};

		dispatch('save', updatedArticle);
		isDirty = false;
	}

	function handleCancel() {
		if (isDirty) {
			if (confirm('You have unsaved changes. Are you sure you want to cancel?')) {
				dispatch('cancel');
			}
		} else {
			dispatch('cancel');
		}
	}

	function handlePublish() {
		status = 'published';
		handleSave();
	}

	function handleSaveDraft() {
		status = 'draft';
		handleSave();
	}

	function handleVisualContentChange(newContent: string) {
		content = newContent;
		isDirty = true;
	}

	async function toggleEditorMode() {
		editorMode = editorMode === 'markdown' ? 'visual' : 'markdown';
		
		// Update Monaco editor theme when switching to markdown mode
		if (editorMode === 'markdown' && editor) {
			const monaco = await import('monaco-editor');
			const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
			monaco.editor.setTheme(isDark ? 'vs-dark' : 'vs');
		}
	}

	// Watch for changes to mark as dirty
	$: if (title !== article.title || excerpt !== article.excerpt || author !== article.author || status !== article.status || tags !== article.tags.join(', ')) {
		isDirty = true;
	}

	// Update Monaco editor theme when theme changes
	$: if (editor && editorMode === 'markdown') {
		(async () => {
			const monaco = await import('monaco-editor');
			const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
			monaco.editor.setTheme(isDark ? 'vs-dark' : 'vs');
		})();
	}
</script>

<div class="article-editor">
	<div class="editor-header">
		<div class="header-left">
			<h2>{isCreating ? 'Create New Article' : 'Edit Article'}</h2>
			{#if isDirty}
				<span class="dirty-indicator">• Unsaved changes</span>
			{/if}
		</div>
		<div class="header-actions">
			<button class="btn btn-secondary" on:click={handleCancel}>
				Cancel
			</button>
			<button class="btn btn-primary" on:click={handleSaveDraft}>
				Save Draft
			</button>
			<button class="btn btn-success" on:click={handlePublish}>
				Publish
			</button>
		</div>
	</div>

	<div class="editor-content">
		<div class="metadata-section">
			<div class="form-group">
				<label for="title">Title</label>
				<input 
					id="title"
					type="text" 
					bind:value={title} 
					placeholder="Enter article title..."
					class="form-input title-input"
				/>
			</div>

			<div class="form-group">
				<label for="excerpt">Excerpt</label>
				<textarea 
					id="excerpt"
					bind:value={excerpt} 
					placeholder="Brief description of your article..."
					class="form-input excerpt-input"
					rows="3"
				></textarea>
			</div>

			<div class="form-row">
				<div class="form-group">
					<label for="author">Author</label>
					<input 
						id="author"
						type="text" 
						bind:value={author} 
						placeholder="Your name"
						class="form-input"
					/>
				</div>

				<div class="form-group">
					<label for="tags">Tags</label>
					<input 
						id="tags"
						type="text" 
						bind:value={tags} 
						placeholder="tag1, tag2, tag3"
						class="form-input"
					/>
				</div>
			</div>

			<div class="form-group">
				<label for="status">Status</label>
				<select id="status" bind:value={status} class="form-input">
					<option value="draft">Draft</option>
					<option value="published">Published</option>
				</select>
			</div>
		</div>

		<div class="content-section">
			<div class="content-header">
				<h3>Content</h3>
				<div class="content-tools">
					<button class="mode-toggle" on:click={toggleEditorMode} class:active={editorMode === 'visual'}>
						{editorMode === 'visual' ? '📝 Visual' : '📄 Markdown'}
					</button>
					{#if editorMode === 'markdown'}
						<div class="markdown-tools">
							<button class="tool-btn" title="Bold (Ctrl+B)">B</button>
							<button class="tool-btn" title="Italic (Ctrl+I)">I</button>
							<button class="tool-btn" title="Link (Ctrl+K)">🔗</button>
							<button class="tool-btn" title="Image">🖼️</button>
							<button class="tool-btn" title="Code">`</button>
							<button class="tool-btn" title="Quote">"</button>
						</div>
					{/if}
				</div>
			</div>
			
			{#if editorMode === 'visual'}
				<VisualEditor {content} onChange={handleVisualContentChange} />
			{:else}
				<div class="editor-container" bind:this={editorContainer}></div>
			{/if}
		</div>
	</div>
</div>

<style>
	.article-editor {
		height: 100%;
		display: flex;
		flex-direction: column;
		background: var(--bg-card);
	}

	.editor-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1.5rem 2rem;
		border-bottom: 1px solid var(--border-primary);
		background: var(--bg-secondary);
	}

	.header-left {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.header-left h2 {
		margin: 0;
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.dirty-indicator {
		color: var(--accent-red);
		font-size: 0.875rem;
		font-weight: 500;
	}

	.header-actions {
		display: flex;
		gap: 0.75rem;
	}

	.btn {
		padding: 0.75rem 1.5rem;
		border: none;
		border-radius: 6px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
		font-size: 0.9rem;
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

	.btn-success {
		background: var(--gradient-green);
		color: var(--text-inverse);
	}

	.btn-success:hover {
		background: var(--gradient-green);
		filter: brightness(1.1);
	}

	.editor-content {
		flex: 1;
		display: flex;
		overflow: hidden;
	}

	.metadata-section {
		width: 400px;
		padding: 2rem;
		border-right: 1px solid var(--border-primary);
		background: var(--bg-secondary);
		overflow-y: auto;
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

	.form-input {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid var(--border-primary);
		border-radius: 4px;
		font-size: 0.9rem;
		transition: border-color 0.2s;
		box-sizing: border-box;
		background: var(--bg-card);
		color: var(--text-primary);
	}

	.form-input:focus {
		outline: none;
		border-color: var(--accent-primary);
		box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
	}

	.title-input {
		font-size: 1.1rem;
		font-weight: 500;
	}

	.excerpt-input {
		resize: vertical;
		min-height: 80px;
	}

	.content-section {
		flex: 1;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.content-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 2rem;
		border-bottom: 1px solid var(--border-primary);
		background: var(--bg-card);
	}

	.content-header h3 {
		margin: 0;
		font-size: 1.1rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.content-tools {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}

	.mode-toggle {
		background: var(--bg-secondary);
		border: 1px solid var(--border-primary);
		color: var(--text-primary);
		padding: 0.5rem 1rem;
		border-radius: 6px;
		cursor: pointer;
		font-size: 0.9rem;
		font-weight: 500;
		transition: all 0.2s;
	}

	.mode-toggle:hover {
		background: var(--bg-tertiary);
		border-color: var(--accent-primary);
	}

	.mode-toggle.active {
		background: var(--accent-primary);
		color: var(--text-inverse);
		border-color: var(--accent-primary);
	}

	.markdown-tools {
		display: flex;
		gap: 0.5rem;
	}

	.tool-btn {
		background: none;
		border: 1px solid var(--border-primary);
		color: var(--text-primary);
		padding: 0.5rem;
		border-radius: 4px;
		cursor: pointer;
		font-size: 0.875rem;
		font-weight: 600;
		transition: all 0.2s;
		min-width: 32px;
		text-align: center;
	}

	.tool-btn:hover {
		background: var(--bg-secondary);
		border-color: var(--accent-primary);
	}

	.editor-container {
		flex: 1;
		overflow: hidden;
	}

	@media (max-width: 1024px) {
		.editor-content {
			flex-direction: column;
		}

		.metadata-section {
			width: 100%;
			border-right: none;
			border-bottom: 1px solid var(--border-primary);
		}

		.form-row {
			flex-direction: column;
			gap: 0;
		}
	}

	@media (max-width: 768px) {
		.editor-header {
			flex-direction: column;
			gap: 1rem;
			align-items: flex-start;
		}

		.header-actions {
			width: 100%;
			justify-content: flex-end;
		}

		.metadata-section {
			padding: 1rem;
		}

		.content-header {
			padding: 1rem;
		}
	}
</style>

<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import type { Writable } from 'svelte/store';

	interface QueryHistoryItem {
		id: string;
		query: string;
		timestamp: Date;
		status: 'success' | 'error';
		rowsAffected: number;
		executionTime: number;
		result?: any[];
		error?: string;
	}

	interface DatabaseConnection {
		id: string;
		name: string;
		type: string;
		host: string;
		port: number;
		database: string;
		username: string;
		status: string;
	}

	export let selectedConnection: DatabaseConnection | null;
	export let queryHistory: Writable<QueryHistoryItem[]>;

	const dispatch = createEventDispatcher();

	let editorContainer: HTMLElement;
	let editor: any;
	let query = 'SELECT * FROM users LIMIT 10;';
	let isExecuting = false;
	let executionTime = 0;
	let showHistory = false;

	// Sample query templates
	const queryTemplates = [
		{ name: 'Select All', query: 'SELECT * FROM table_name LIMIT 10;' },
		{ name: 'Create Table', query: 'CREATE TABLE table_name (\n  id SERIAL PRIMARY KEY,\n  name VARCHAR(255),\n  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);' },
		{ name: 'Insert Data', query: 'INSERT INTO table_name (name, email) VALUES (\'John Doe\', \'john@example.com\');' },
		{ name: 'Update Data', query: 'UPDATE table_name SET name = \'Jane Doe\' WHERE id = 1;' },
		{ name: 'Delete Data', query: 'DELETE FROM table_name WHERE id = 1;' },
		{ name: 'Join Tables', query: 'SELECT u.name, p.title FROM users u\nJOIN posts p ON u.id = p.user_id\nWHERE u.active = true;' }
	];

	onMount(async () => {
		if (editorContainer && typeof window !== 'undefined') {
			const monaco = await import('monaco-editor');
			editor = monaco.editor.create(editorContainer, {
				value: query,
				language: 'sql',
				theme: document.documentElement.getAttribute('data-theme') === 'dark' ? 'vs-dark' : 'vs',
				automaticLayout: true,
				minimap: { enabled: false },
				scrollBeyondLastLine: false,
				fontSize: 14,
				lineNumbers: 'on',
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
				lineDecorationsWidth: 10,
				glyphMargin: false,
				folding: true,
				lineNumbersMinChars: 3,
				renderLineHighlight: 'all',
				selectOnLineNumbers: true,
				roundedSelection: false,
				readOnly: false,
				cursorStyle: 'line',
				contextmenu: true,
				mouseWheelZoom: false,
				quickSuggestions: {
					other: true,
					comments: false,
					strings: true
				},
				parameterHints: {
					enabled: true
				},
				wordBasedSuggestions: 'allDocuments',
				suggestOnTriggerCharacters: true,
				acceptSuggestionOnEnter: 'on',
				tabCompletion: 'on',
				wordWrapColumn: 80,
				wrappingIndent: 'indent'
			});

			// Update query when editor changes
			editor.onDidChangeModelContent(() => {
				query = editor.getValue();
			});

			// Set initial content
			editor.setValue(query);
		}
	});

	onDestroy(() => {
		if (editor) {
			editor.dispose();
		}
	});

	async function executeQuery() {
		if (!selectedConnection) {
			alert('Please select a database connection first.');
			return;
		}

		if (!query.trim()) {
			alert('Please enter a query to execute.');
			return;
		}

		isExecuting = true;
		const startTime = Date.now();

		try {
			// Simulate query execution
			await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
			
			const endTime = Date.now();
			executionTime = endTime - startTime;

			// Simulate different query results
			const isSelect = query.toLowerCase().trim().startsWith('select');
			const isInsert = query.toLowerCase().trim().startsWith('insert');
			const isUpdate = query.toLowerCase().trim().startsWith('update');
			const isDelete = query.toLowerCase().trim().startsWith('delete');
			const isCreate = query.toLowerCase().trim().startsWith('create');

			let rowsAffected = 0;
			let result: any[] | undefined = undefined;

			if (isSelect) {
				rowsAffected = Math.floor(Math.random() * 100) + 1;
				result = generateSampleData(rowsAffected);
			} else if (isInsert) {
				rowsAffected = 1;
			} else if (isUpdate) {
				rowsAffected = Math.floor(Math.random() * 50) + 1;
			} else if (isDelete) {
				rowsAffected = Math.floor(Math.random() * 20) + 1;
			} else if (isCreate) {
				rowsAffected = 0;
			}

			const queryResult: QueryHistoryItem = {
				id: Date.now().toString(),
				query,
				timestamp: new Date(),
				status: 'success',
				rowsAffected,
				executionTime,
				result
			};

			queryHistory.update(history => [queryResult, ...history]);
			dispatch('execute', queryResult);

		} catch (error) {
			const endTime = Date.now();
			executionTime = endTime - startTime;

			const queryResult: QueryHistoryItem = {
				id: Date.now().toString(),
				query,
				timestamp: new Date(),
				status: 'error',
				rowsAffected: 0,
				executionTime,
				error: error instanceof Error ? error.message : 'Unknown error'
			};

			queryHistory.update(history => [queryResult, ...history]);
			dispatch('execute', queryResult);
		} finally {
			isExecuting = false;
		}
	}

	function generateSampleData(count: number) {
		const data = [];
		for (let i = 0; i < count; i++) {
			data.push({
				id: i + 1,
				name: `User ${i + 1}`,
				email: `user${i + 1}@example.com`,
				created_at: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
				active: Math.random() > 0.5
			});
		}
		return data;
	}

	function loadTemplate(templateQuery: string) {
		if (editor) {
			editor.setValue(templateQuery);
			query = templateQuery;
		}
	}

	function clearQuery() {
		if (editor) {
			editor.setValue('');
			query = '';
		}
	}

	function formatQuery() {
		if (editor) {
			// Simple SQL formatting (in a real app, you'd use a proper SQL formatter)
			const formatted = query
				.replace(/\s+/g, ' ')
				.replace(/\s*,\s*/g, ', ')
				.replace(/\s*=\s*/g, ' = ')
				.replace(/\s*\(\s*/g, ' (')
				.replace(/\s*\)\s*/g, ') ')
				.trim();
			
			editor.setValue(formatted);
			query = formatted;
		}
	}

	// Update Monaco editor theme when theme changes
	$: if (editor) {
		(async () => {
			const monaco = await import('monaco-editor');
			const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
			monaco.editor.setTheme(isDark ? 'vs-dark' : 'vs');
		})();
	}
</script>

<div class="query-editor">
	<div class="editor-header">
		<div class="header-left">
			<h2>Query Editor</h2>
			{#if selectedConnection}
				<span class="connection-info">
					Connected to: {selectedConnection.name} ({selectedConnection.type})
				</span>
			{:else}
				<span class="connection-warning">
					⚠️ No database connection selected
				</span>
			{/if}
		</div>
		<div class="header-actions">
			<button class="action-btn" on:click={() => showHistory = !showHistory}>
				{showHistory ? '📝' : '📋'} History
			</button>
			<button class="action-btn" on:click={formatQuery}>
				🎨 Format
			</button>
			<button class="action-btn" on:click={clearQuery}>
				🗑️ Clear
			</button>
			<button 
				class="execute-btn" 
				on:click={executeQuery}
				disabled={isExecuting || !selectedConnection}
			>
				{isExecuting ? '⏳' : '▶️'} {isExecuting ? 'Executing...' : 'Execute Query'}
			</button>
		</div>
	</div>

	<div class="editor-content">
		<div class="editor-section">
			<div class="editor-toolbar">
				<span class="toolbar-label">Query Templates:</span>
				<div class="template-buttons">
					{#each queryTemplates as template}
						<button 
							class="template-btn" 
							on:click={() => loadTemplate(template.query)}
							title={template.name}
						>
							{template.name}
						</button>
					{/each}
				</div>
			</div>
			<div class="editor-container" bind:this={editorContainer}></div>
		</div>

		{#if showHistory}
			<div class="history-section">
				<h3>Query History</h3>
				<div class="history-list">
					{#each $queryHistory as item (item.id)}
						<div class="history-item" class:error={item.status === 'error'}>
							<div class="history-header">
								<span class="history-status" class:error={item.status === 'error'}>
									{item.status === 'success' ? '✅' : '❌'}
								</span>
								<span class="history-time">
									{item.timestamp.toLocaleTimeString()}
								</span>
								<span class="history-execution">
									{item.executionTime}ms
								</span>
								{#if item.rowsAffected > 0}
									<span class="history-rows">
										{item.rowsAffected} rows
									</span>
								{/if}
							</div>
							<div class="history-query">
								<code>{item.query}</code>
							</div>
							{#if item.error}
								<div class="history-error">
									Error: {item.error}
								</div>
							{/if}
							{#if item.result && item.result.length > 0}
								<div class="history-result">
									<details>
										<summary>View Results ({item.result.length} rows)</summary>
										<div class="result-table">
											<table>
												<thead>
													<tr>
														{#each Object.keys(item.result[0]) as key}
															<th>{key}</th>
														{/each}
													</tr>
												</thead>
												<tbody>
													{#each item.result.slice(0, 10) as row}
														<tr>
															{#each Object.values(row) as value}
																<td>{String(value)}</td>
															{/each}
														</tr>
													{/each}
													{#if item.result.length > 10}
														<tr>
															<td colspan={Object.keys(item.result[0]).length} class="more-rows">
																... and {item.result.length - 10} more rows
															</td>
														</tr>
													{/if}
												</tbody>
											</table>
										</div>
									</details>
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.query-editor {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.editor-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--border-primary);
	}

	.header-left h2 {
		margin: 0 0 0.5rem 0;
		font-size: 1.3rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.connection-info {
		font-size: 0.9rem;
		color: var(--accent-green);
		font-weight: 500;
	}

	.connection-warning {
		font-size: 0.9rem;
		color: var(--accent-yellow);
		font-weight: 500;
	}

	.header-actions {
		display: flex;
		gap: 0.75rem;
		align-items: center;
	}

	.action-btn {
		padding: 0.5rem 1rem;
		border: 1px solid var(--border-primary);
		border-radius: 6px;
		background: var(--bg-card);
		color: var(--text-primary);
		cursor: pointer;
		transition: all 0.2s;
		font-size: 0.875rem;
		font-weight: 500;
	}

	.action-btn:hover {
		background: var(--bg-secondary);
		border-color: var(--accent-primary);
	}

	.execute-btn {
		padding: 0.75rem 1.5rem;
		border: none;
		border-radius: 6px;
		background: var(--gradient-primary);
		color: var(--text-inverse);
		cursor: pointer;
		transition: all 0.2s;
		font-size: 0.9rem;
		font-weight: 500;
	}

	.execute-btn:hover:not(:disabled) {
		background: var(--gradient-primary);
		filter: brightness(1.1);
	}

	.execute-btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.editor-content {
		flex: 1;
		display: flex;
		gap: 2rem;
		overflow: hidden;
	}

	.editor-section {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.editor-toolbar {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1rem;
		padding: 0.75rem;
		background: var(--bg-secondary);
		border-radius: 6px;
		border: 1px solid var(--border-primary);
	}

	.toolbar-label {
		font-size: 0.9rem;
		font-weight: 500;
		color: var(--text-primary);
		white-space: nowrap;
	}

	.template-buttons {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.template-btn {
		padding: 0.25rem 0.75rem;
		border: 1px solid var(--border-primary);
		border-radius: 4px;
		background: var(--bg-card);
		color: var(--text-primary);
		cursor: pointer;
		transition: all 0.2s;
		font-size: 0.8rem;
	}

	.template-btn:hover {
		background: var(--bg-tertiary);
		border-color: var(--accent-primary);
	}

	.editor-container {
		flex: 1;
		border: 1px solid var(--border-primary);
		border-radius: 6px;
		overflow: hidden;
	}

	.history-section {
		width: 400px;
		background: var(--bg-secondary);
		border: 1px solid var(--border-primary);
		border-radius: 8px;
		padding: 1rem;
		overflow-y: auto;
	}

	.history-section h3 {
		margin: 0 0 1rem 0;
		font-size: 1.1rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.history-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.history-item {
		background: var(--bg-card);
		border: 1px solid var(--border-primary);
		border-radius: 6px;
		padding: 1rem;
		transition: all 0.2s;
	}

	.history-item:hover {
		border-color: var(--accent-primary);
	}

	.history-item.error {
		border-color: var(--accent-red);
		background: var(--bg-secondary);
	}

	.history-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 0.5rem;
		font-size: 0.8rem;
	}

	.history-status {
		color: var(--accent-green);
		font-weight: 600;
	}

	.history-status.error {
		color: var(--accent-red);
	}

	.history-time {
		color: var(--text-muted);
	}

	.history-execution {
		color: var(--accent-primary);
		font-weight: 500;
	}

	.history-rows {
		color: var(--accent-green);
		font-weight: 500;
	}

	.history-query {
		margin-bottom: 0.5rem;
	}

	.history-query code {
		background: var(--bg-tertiary);
		color: var(--text-primary);
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		font-size: 0.85rem;
		font-family: 'Monaco', 'Menlo', monospace;
		word-break: break-all;
	}

	.history-error {
		color: var(--accent-red);
		font-size: 0.85rem;
		margin-top: 0.5rem;
		padding: 0.5rem;
		background: var(--bg-secondary);
		border-radius: 4px;
		border-left: 3px solid var(--accent-red);
	}

	.history-result {
		margin-top: 0.5rem;
	}

	.history-result summary {
		cursor: pointer;
		color: var(--accent-primary);
		font-size: 0.85rem;
		font-weight: 500;
	}

	.result-table {
		margin-top: 0.5rem;
		overflow-x: auto;
	}

	.result-table table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.8rem;
	}

	.result-table th,
	.result-table td {
		padding: 0.25rem 0.5rem;
		border: 1px solid var(--border-primary);
		text-align: left;
	}

	.result-table th {
		background: var(--bg-tertiary);
		font-weight: 600;
		color: var(--text-primary);
	}

	.result-table td {
		background: var(--bg-card);
		color: var(--text-primary);
	}

	.more-rows {
		text-align: center;
		color: var(--text-muted);
		font-style: italic;
	}

	@media (max-width: 1024px) {
		.editor-content {
			flex-direction: column;
		}

		.history-section {
			width: 100%;
			max-height: 300px;
		}
	}

	@media (max-width: 768px) {
		.editor-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
		}

		.header-actions {
			width: 100%;
			justify-content: flex-end;
		}

		.editor-toolbar {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.5rem;
		}

		.template-buttons {
			width: 100%;
		}
	}
</style>

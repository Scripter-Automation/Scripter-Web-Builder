<script lang="ts">
	import { createEventDispatcher } from 'svelte';

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

	interface TableColumn {
		name: string;
		type: string;
		nullable: boolean;
		default?: string;
		primary: boolean;
		foreign_key?: string;
	}

	interface DatabaseTable {
		name: string;
		columns: TableColumn[];
		rowCount: number;
		size: string;
		created_at: string;
	}

	export let selectedConnection: DatabaseConnection | null;

	const dispatch = createEventDispatcher();

	let showCreateTable = false;
	let selectedTable: DatabaseTable | null = null;
	let showTableData = false;

	// Sample tables data
	let tables: DatabaseTable[] = [
		{
			name: 'users',
			columns: [
				{ name: 'id', type: 'SERIAL', nullable: false, primary: true },
				{ name: 'name', type: 'VARCHAR(255)', nullable: false, primary: false },
				{ name: 'email', type: 'VARCHAR(255)', nullable: false, primary: false },
				{ name: 'password_hash', type: 'VARCHAR(255)', nullable: false, primary: false },
				{ name: 'created_at', type: 'TIMESTAMP', nullable: false, default: 'CURRENT_TIMESTAMP', primary: false },
				{ name: 'updated_at', type: 'TIMESTAMP', nullable: false, default: 'CURRENT_TIMESTAMP', primary: false }
			],
			rowCount: 1250,
			size: '2.5 MB',
			created_at: '2024-01-01'
		},
		{
			name: 'posts',
			columns: [
				{ name: 'id', type: 'SERIAL', nullable: false, primary: true },
				{ name: 'user_id', type: 'INTEGER', nullable: false, foreign_key: 'users.id', primary: false },
				{ name: 'title', type: 'VARCHAR(255)', nullable: false, primary: false },
				{ name: 'content', type: 'TEXT', nullable: true, primary: false },
				{ name: 'status', type: 'VARCHAR(50)', nullable: false, default: "'draft'", primary: false },
				{ name: 'created_at', type: 'TIMESTAMP', nullable: false, default: 'CURRENT_TIMESTAMP', primary: false }
			],
			rowCount: 3420,
			size: '15.2 MB',
			created_at: '2024-01-05'
		},
		{
			name: 'comments',
			columns: [
				{ name: 'id', type: 'SERIAL', nullable: false, primary: true },
				{ name: 'post_id', type: 'INTEGER', nullable: false, foreign_key: 'posts.id', primary: false },
				{ name: 'user_id', type: 'INTEGER', nullable: false, foreign_key: 'users.id', primary: false },
				{ name: 'content', type: 'TEXT', nullable: false, primary: false },
				{ name: 'created_at', type: 'TIMESTAMP', nullable: false, default: 'CURRENT_TIMESTAMP', primary: false }
			],
			rowCount: 8560,
			size: '8.7 MB',
			created_at: '2024-01-10'
		}
	];

	let newTable = {
		name: '',
		columns: [
			{ name: 'id', type: 'SERIAL', nullable: false, primary: true, default: undefined }
		]
	};

	function addColumn() {
		newTable.columns = [...newTable.columns, {
			name: '',
			type: 'VARCHAR(255)',
			nullable: true,
			primary: false,
			default: undefined
		}];
	}

	function removeColumn(index: number) {
		newTable.columns = newTable.columns.filter((_, i) => i !== index);
	}

	function createTable() {
		if (newTable.name && newTable.columns.length > 0) {
			const table: DatabaseTable = {
				name: newTable.name,
				columns: newTable.columns,
				rowCount: 0,
				size: '0 KB',
				created_at: new Date().toISOString().split('T')[0]
			};

			tables = [...tables, table];
			
			// Reset form
			newTable = {
				name: '',
				columns: [
					{ name: 'id', type: 'SERIAL', nullable: false, primary: true, default: undefined }
				]
			};
			showCreateTable = false;
		}
	}

	function deleteTable(tableName: string) {
		if (confirm(`Are you sure you want to delete the table "${tableName}"? This action cannot be undone.`)) {
			tables = tables.filter(table => table.name !== tableName);
			if (selectedTable?.name === tableName) {
				selectedTable = null;
				showTableData = false;
			}
		}
	}

	function selectTable(table: DatabaseTable) {
		selectedTable = table;
		showTableData = true;
	}

	function getDataTypeOptions(): string[] {
		return [
			'SERIAL', 'INTEGER', 'BIGINT', 'SMALLINT',
			'VARCHAR(255)', 'TEXT', 'CHAR(1)',
			'DECIMAL(10,2)', 'NUMERIC(10,2)',
			'BOOLEAN', 'DATE', 'TIMESTAMP', 'TIME',
			'JSON', 'JSONB', 'UUID'
		];
	}

	function generateSampleData(table: DatabaseTable, count: number = 10) {
		const data = [];
		for (let i = 0; i < count; i++) {
			const row: any = {};
			table.columns.forEach(column => {
				switch (column.type) {
					case 'SERIAL':
					case 'INTEGER':
						row[column.name] = i + 1;
						break;
					case 'VARCHAR(255)':
					case 'TEXT':
						row[column.name] = `Sample ${column.name} ${i + 1}`;
						break;
					case 'BOOLEAN':
						row[column.name] = Math.random() > 0.5;
						break;
					case 'DATE':
						row[column.name] = new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0];
						break;
					case 'TIMESTAMP':
						row[column.name] = new Date(Date.now() - Math.random() * 10000000000).toISOString();
						break;
					default:
						row[column.name] = `Value ${i + 1}`;
				}
			});
			data.push(row);
		}
		return data;
	}
</script>

<div class="table-manager">
	<div class="manager-header">
		<div class="header-left">
			<h2>Table Manager</h2>
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
			<button 
				class="create-btn" 
				on:click={() => showCreateTable = true}
				disabled={!selectedConnection}
			>
				+ Create Table
			</button>
		</div>
	</div>

	{#if showCreateTable}
		<div class="create-table-form">
			<h3>Create New Table</h3>
			<div class="form-section">
				<div class="form-group">
					<label for="table-name">Table Name</label>
					<input 
						id="table-name"
						type="text" 
						bind:value={newTable.name}
						placeholder="my_table"
						class="form-input"
					/>
				</div>
			</div>

			<div class="form-section">
				<div class="section-header">
					<h4>Columns</h4>
					<button class="add-column-btn" on:click={addColumn}>
						+ Add Column
					</button>
				</div>
				
				<div class="columns-list">
					{#each newTable.columns as column, index (index)}
						<div class="column-item">
							<div class="column-inputs">
								<input 
									type="text" 
									bind:value={column.name}
									placeholder="column_name"
									class="form-input column-name"
								/>
								<select bind:value={column.type} class="form-input column-type">
									{#each getDataTypeOptions() as type}
										<option value={type}>{type}</option>
									{/each}
								</select>
								<label class="checkbox-label">
									<input 
										type="checkbox" 
										bind:checked={column.nullable}
									/>
									Nullable
								</label>
								<label class="checkbox-label">
									<input 
										type="checkbox" 
										bind:checked={column.primary}
									/>
									Primary Key
								</label>
								<input 
									type="text" 
									bind:value={column.default}
									placeholder="Default value"
									class="form-input column-default"
								/>
							</div>
							{#if newTable.columns.length > 1}
								<button 
									class="remove-column-btn" 
									on:click={() => removeColumn(index)}
								>
									🗑️
								</button>
							{/if}
						</div>
					{/each}
				</div>
			</div>

			<div class="form-actions">
				<button class="btn btn-secondary" on:click={() => showCreateTable = false}>
					Cancel
				</button>
				<button class="btn btn-primary" on:click={createTable}>
					Create Table
				</button>
			</div>
		</div>
	{/if}

	<div class="tables-content">
		<div class="tables-list">
			<h3>Tables ({tables.length})</h3>
			{#each tables as table (table.name)}
				<div class="table-card" class:selected={selectedTable?.name === table.name}>
					<div class="table-header" on:click={() => selectTable(table)}>
						<div class="table-info">
							<h4>{table.name}</h4>
							<p>{table.columns.length} columns • {table.rowCount.toLocaleString()} rows</p>
							<p class="table-meta">Size: {table.size} • Created: {table.created_at}</p>
						</div>
						<div class="table-actions">
							<button class="action-btn" on:click={() => selectTable(table)}>
								👁️ View
							</button>
							<button class="action-btn delete" on:click={() => deleteTable(table.name)}>
								🗑️ Delete
							</button>
						</div>
					</div>
				</div>
			{/each}

			{#if tables.length === 0}
				<div class="empty-state">
					<div class="empty-icon">📊</div>
					<h3>No Tables Found</h3>
					<p>Create your first table to get started with database management.</p>
					<button class="btn btn-primary" on:click={() => showCreateTable = true}>
						Create Table
					</button>
				</div>
			{/if}
		</div>

		{#if selectedTable && showTableData}
			<div class="table-details">
				<div class="details-header">
					<h3>Table: {selectedTable.name}</h3>
					<button class="close-btn" on:click={() => showTableData = false}>
						✕
					</button>
				</div>

				<div class="details-tabs">
					<div class="tab-content">
						<h4>Structure</h4>
						<div class="structure-table">
							<table>
								<thead>
									<tr>
										<th>Column</th>
										<th>Type</th>
										<th>Nullable</th>
										<th>Primary</th>
										<th>Default</th>
									</tr>
								</thead>
								<tbody>
									{#each selectedTable.columns as column}
										<tr>
											<td>{column.name}</td>
											<td>{column.type}</td>
											<td>{column.nullable ? 'Yes' : 'No'}</td>
											<td>{column.primary ? 'Yes' : 'No'}</td>
											<td>{column.default || '-'}</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>

						<h4>Sample Data</h4>
						<div class="data-table">
							<table>
								<thead>
									<tr>
										{#each selectedTable.columns as column}
											<th>{column.name}</th>
										{/each}
									</tr>
								</thead>
								<tbody>
									{#each generateSampleData(selectedTable, 5) as row}
										<tr>
											{#each Object.values(row) as value}
												<td>{String(value)}</td>
											{/each}
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.table-manager {
		width: 100%;
	}

	.manager-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
	}

	.header-left h2 {
		margin: 0 0 0.5rem 0;
		font-size: 1.5rem;
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

	.create-btn {
		background: var(--gradient-primary);
		color: var(--text-inverse);
		border: none;
		padding: 0.75rem 1.5rem;
		border-radius: 8px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
	}

	.create-btn:hover:not(:disabled) {
		background: var(--gradient-primary);
		filter: brightness(1.1);
	}

	.create-btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.create-table-form {
		background: var(--bg-secondary);
		border: 1px solid var(--border-primary);
		border-radius: 12px;
		padding: 2rem;
		margin-bottom: 2rem;
	}

	.create-table-form h3 {
		margin: 0 0 1.5rem 0;
		font-size: 1.2rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.form-section {
		margin-bottom: 2rem;
	}

	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	.section-header h4 {
		margin: 0;
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.add-column-btn {
		background: var(--accent-primary);
		color: var(--text-inverse);
		border: none;
		padding: 0.5rem 1rem;
		border-radius: 6px;
		font-size: 0.9rem;
		cursor: pointer;
		transition: all 0.2s;
	}

	.add-column-btn:hover {
		background: var(--accent-primary);
		filter: brightness(1.1);
	}

	.form-group {
		margin-bottom: 1rem;
	}

	.form-group label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 500;
		color: var(--text-primary);
		font-size: 0.9rem;
	}

	.form-input {
		padding: 0.75rem;
		border: 1px solid var(--border-primary);
		border-radius: 6px;
		background: var(--bg-card);
		color: var(--text-primary);
		font-size: 0.9rem;
		transition: border-color 0.2s;
	}

	.form-input:focus {
		outline: none;
		border-color: var(--accent-primary);
		box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
	}

	.columns-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.column-item {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
		background: var(--bg-card);
		border: 1px solid var(--border-primary);
		border-radius: 8px;
	}

	.column-inputs {
		display: flex;
		align-items: center;
		gap: 1rem;
		flex: 1;
		flex-wrap: wrap;
	}

	.column-name {
		width: 150px;
	}

	.column-type {
		width: 120px;
	}

	.column-default {
		width: 120px;
	}

	.checkbox-label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.9rem;
		color: var(--text-primary);
		cursor: pointer;
	}

	.checkbox-label input[type="checkbox"] {
		margin: 0;
	}

	.remove-column-btn {
		background: var(--accent-red);
		color: var(--text-inverse);
		border: none;
		padding: 0.5rem;
		border-radius: 4px;
		cursor: pointer;
		transition: all 0.2s;
	}

	.remove-column-btn:hover {
		background: var(--accent-red);
		filter: brightness(1.1);
	}

	.form-actions {
		display: flex;
		gap: 1rem;
		justify-content: flex-end;
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

	.tables-content {
		display: flex;
		gap: 2rem;
	}

	.tables-list {
		flex: 1;
	}

	.tables-list h3 {
		margin: 0 0 1rem 0;
		font-size: 1.2rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.table-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border-primary);
		border-radius: 8px;
		margin-bottom: 1rem;
		transition: all 0.2s;
	}

	.table-card:hover {
		border-color: var(--accent-primary);
	}

	.table-card.selected {
		border-color: var(--accent-primary);
		background: var(--bg-tertiary);
	}

	.table-header {
		padding: 1rem;
		cursor: pointer;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.table-info h4 {
		margin: 0 0 0.25rem 0;
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.table-info p {
		margin: 0 0 0.25rem 0;
		font-size: 0.9rem;
		color: var(--text-muted);
	}

	.table-meta {
		font-size: 0.8rem !important;
		color: var(--text-muted);
	}

	.table-actions {
		display: flex;
		gap: 0.5rem;
	}

	.action-btn {
		padding: 0.5rem 0.75rem;
		border: 1px solid var(--border-primary);
		border-radius: 4px;
		background: var(--bg-card);
		color: var(--text-primary);
		cursor: pointer;
		transition: all 0.2s;
		font-size: 0.8rem;
	}

	.action-btn:hover {
		background: var(--bg-tertiary);
	}

	.action-btn.delete:hover {
		background: var(--accent-red);
		color: var(--text-inverse);
		border-color: var(--accent-red);
	}

	.table-details {
		width: 600px;
		background: var(--bg-secondary);
		border: 1px solid var(--border-primary);
		border-radius: 8px;
		padding: 1.5rem;
	}

	.details-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1.5rem;
	}

	.details-header h3 {
		margin: 0;
		font-size: 1.2rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.close-btn {
		background: none;
		border: none;
		color: var(--text-muted);
		cursor: pointer;
		font-size: 1.2rem;
		padding: 0.25rem;
		border-radius: 4px;
		transition: all 0.2s;
	}

	.close-btn:hover {
		background: var(--bg-tertiary);
		color: var(--text-primary);
	}

	.tab-content h4 {
		margin: 0 0 1rem 0;
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.structure-table,
	.data-table {
		margin-bottom: 2rem;
		overflow-x: auto;
	}

	.structure-table table,
	.data-table table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.9rem;
	}

	.structure-table th,
	.structure-table td,
	.data-table th,
	.data-table td {
		padding: 0.5rem;
		border: 1px solid var(--border-primary);
		text-align: left;
	}

	.structure-table th,
	.data-table th {
		background: var(--bg-tertiary);
		font-weight: 600;
		color: var(--text-primary);
	}

	.structure-table td,
	.data-table td {
		background: var(--bg-card);
		color: var(--text-primary);
	}

	.empty-state {
		text-align: center;
		padding: 3rem 2rem;
		background: var(--bg-secondary);
		border: 2px dashed var(--border-primary);
		border-radius: 12px;
	}

	.empty-icon {
		font-size: 3rem;
		margin-bottom: 1rem;
	}

	.empty-state h3 {
		margin: 0 0 0.5rem 0;
		font-size: 1.2rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.empty-state p {
		margin: 0 0 1.5rem 0;
		color: var(--text-muted);
	}

	@media (max-width: 1024px) {
		.tables-content {
			flex-direction: column;
		}

		.table-details {
			width: 100%;
		}
	}

	@media (max-width: 768px) {
		.manager-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
		}

		.column-inputs {
			flex-direction: column;
			align-items: stretch;
		}

		.column-name,
		.column-type,
		.column-default {
			width: 100%;
		}

		.table-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
		}

		.table-actions {
			width: 100%;
			justify-content: flex-end;
		}
	}
</style>

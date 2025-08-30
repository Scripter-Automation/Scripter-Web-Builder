<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Writable } from 'svelte/store';

	interface DatabaseConnection {
		id: string;
		name: string;
		type: 'postgresql' | 'mysql' | 'sqlite' | 'mongodb';
		host: string;
		port: number;
		database: string;
		username: string;
		password?: string;
		status: 'connected' | 'disconnected' | 'connecting' | 'error';
	}

	export let databaseConnections: Writable<DatabaseConnection[]>;

	const dispatch = createEventDispatcher();

	let showAddForm = false;
	let newConnection: Partial<DatabaseConnection> = {
		name: '',
		type: 'postgresql',
		host: 'localhost',
		port: 5432,
		database: '',
		username: '',
		password: ''
	};

	function addConnection() {
		if (newConnection.name && newConnection.database && newConnection.username) {
			const connection: DatabaseConnection = {
				id: Date.now().toString(),
				name: newConnection.name!,
				type: newConnection.type!,
				host: newConnection.host!,
				port: newConnection.port!,
				database: newConnection.database!,
				username: newConnection.username!,
				password: newConnection.password,
				status: 'disconnected'
			};

			databaseConnections.update(connections => [...connections, connection]);
			
			// Reset form
			newConnection = {
				name: '',
				type: 'postgresql',
				host: 'localhost',
				port: 5432,
				database: '',
				username: '',
				password: ''
			};
			showAddForm = false;
		}
	}

	function deleteConnection(connectionId: string) {
		databaseConnections.update(connections => 
			connections.filter(conn => conn.id !== connectionId)
		);
	}

	function connectToDatabase(connection: DatabaseConnection) {
		// Simulate connection process
		databaseConnections.update(connections => 
			connections.map(conn => 
				conn.id === connection.id 
					? { ...conn, status: 'connecting' }
					: conn
			)
		);

		setTimeout(() => {
			databaseConnections.update(connections => 
				connections.map(conn => 
					conn.id === connection.id 
						? { ...conn, status: 'connected' }
						: conn
				)
			);
			dispatch('select', connection);
		}, 1500);
	}

	function disconnectFromDatabase(connection: DatabaseConnection) {
		databaseConnections.update(connections => 
			connections.map(conn => 
				conn.id === connection.id 
					? { ...conn, status: 'disconnected' }
					: conn
			)
		);
	}

	function getStatusColor(status: string): string {
		switch (status) {
			case 'connected': return 'var(--accent-green)';
			case 'connecting': return 'var(--accent-yellow)';
			case 'error': return 'var(--accent-red)';
			default: return 'var(--text-muted)';
		}
	}

	function getStatusIcon(status: string): string {
		switch (status) {
			case 'connected': return '🟢';
			case 'connecting': return '🟡';
			case 'error': return '🔴';
			default: return '⚪';
		}
	}

	function getDatabaseIcon(type: string): string {
		switch (type) {
			case 'postgresql': return '🐘';
			case 'mysql': return '🐬';
			case 'sqlite': return '📱';
			case 'mongodb': return '🍃';
			default: return '🗄️';
		}
	}
</script>

<div class="database-manager">
	<div class="manager-header">
		<h2>Database Connections</h2>
		<button class="add-btn" on:click={() => showAddForm = true}>
			+ Add Connection
		</button>
	</div>

	{#if showAddForm}
		<div class="add-form">
			<h3>Add New Database Connection</h3>
			<div class="form-grid">
				<div class="form-group">
					<label for="name">Connection Name</label>
					<input 
						id="name"
						type="text" 
						bind:value={newConnection.name}
						placeholder="My Database"
						class="form-input"
					/>
				</div>

				<div class="form-group">
					<label for="type">Database Type</label>
					<select id="type" bind:value={newConnection.type} class="form-input">
						<option value="postgresql">PostgreSQL</option>
						<option value="mysql">MySQL</option>
						<option value="sqlite">SQLite</option>
						<option value="mongodb">MongoDB</option>
					</select>
				</div>

				<div class="form-group">
					<label for="host">Host</label>
					<input 
						id="host"
						type="text" 
						bind:value={newConnection.host}
						placeholder="localhost"
						class="form-input"
					/>
				</div>

				<div class="form-group">
					<label for="port">Port</label>
					<input 
						id="port"
						type="number" 
						bind:value={newConnection.port}
						class="form-input"
					/>
				</div>

				<div class="form-group">
					<label for="database">Database Name</label>
					<input 
						id="database"
						type="text" 
						bind:value={newConnection.database}
						placeholder="my_database"
						class="form-input"
					/>
				</div>

				<div class="form-group">
					<label for="username">Username</label>
					<input 
						id="username"
						type="text" 
						bind:value={newConnection.username}
						placeholder="username"
						class="form-input"
					/>
				</div>

				<div class="form-group">
					<label for="password">Password</label>
					<input 
						id="password"
						type="password" 
						bind:value={newConnection.password}
						placeholder="password"
						class="form-input"
					/>
				</div>
			</div>

			<div class="form-actions">
				<button class="btn btn-secondary" on:click={() => showAddForm = false}>
					Cancel
				</button>
				<button class="btn btn-primary" on:click={addConnection}>
					Add Connection
				</button>
			</div>
		</div>
	{/if}

	<div class="connections-list">
		{#each $databaseConnections as connection (connection.id)}
			<div class="connection-card">
				<div class="connection-header">
					<div class="connection-info">
						<div class="connection-icon">{getDatabaseIcon(connection.type)}</div>
						<div class="connection-details">
							<h3>{connection.name}</h3>
							<p>{connection.type.toUpperCase()} • {connection.host}:{connection.port}</p>
							<p class="database-name">Database: {connection.database}</p>
						</div>
					</div>
					<div class="connection-status">
						<span class="status-indicator" style="color: {getStatusColor(connection.status)}">
							{getStatusIcon(connection.status)}
						</span>
						<span class="status-text">{connection.status}</span>
					</div>
				</div>

				<div class="connection-actions">
					{#if connection.status === 'connected'}
						<button class="action-btn disconnect" on:click={() => disconnectFromDatabase(connection)}>
							Disconnect
						</button>
						<button class="action-btn select" on:click={() => dispatch('select', connection)}>
							Select
						</button>
					{:else if connection.status === 'connecting'}
						<button class="action-btn" disabled>
							Connecting...
						</button>
					{:else}
						<button class="action-btn connect" on:click={() => connectToDatabase(connection)}>
							Connect
						</button>
					{/if}
					<button class="action-btn delete" on:click={() => deleteConnection(connection.id)}>
						Delete
					</button>
				</div>
			</div>
		{/each}

		{#if $databaseConnections.length === 0}
			<div class="empty-state">
				<div class="empty-icon">🗄️</div>
				<h3>No Database Connections</h3>
				<p>Add your first database connection to get started with the admin console.</p>
				<button class="btn btn-primary" on:click={() => showAddForm = true}>
					Add Connection
				</button>
			</div>
		{/if}
	</div>
</div>

<style>
	.database-manager {
		width: 100%;
	}

	.manager-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
	}

	.manager-header h2 {
		margin: 0;
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.add-btn {
		background: var(--gradient-primary);
		color: var(--text-inverse);
		border: none;
		padding: 0.75rem 1.5rem;
		border-radius: 8px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
	}

	.add-btn:hover {
		background: var(--gradient-primary);
		filter: brightness(1.1);
		transform: translateY(-1px);
	}

	.add-form {
		background: var(--bg-secondary);
		border: 1px solid var(--border-primary);
		border-radius: 12px;
		padding: 2rem;
		margin-bottom: 2rem;
	}

	.add-form h3 {
		margin: 0 0 1.5rem 0;
		font-size: 1.2rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.form-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
	}

	.form-group label {
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

	.connections-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.connection-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border-primary);
		border-radius: 12px;
		padding: 1.5rem;
		transition: all 0.2s;
	}

	.connection-card:hover {
		box-shadow: var(--shadow-md);
		border-color: var(--accent-primary);
	}

	.connection-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 1rem;
	}

	.connection-info {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.connection-icon {
		font-size: 2rem;
	}

	.connection-details h3 {
		margin: 0 0 0.25rem 0;
		font-size: 1.1rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.connection-details p {
		margin: 0 0 0.25rem 0;
		font-size: 0.9rem;
		color: var(--text-muted);
	}

	.database-name {
		font-weight: 500;
		color: var(--text-primary) !important;
	}

	.connection-status {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.status-indicator {
		font-size: 1.2rem;
	}

	.status-text {
		font-size: 0.9rem;
		font-weight: 500;
		color: var(--text-muted);
		text-transform: capitalize;
	}

	.connection-actions {
		display: flex;
		gap: 0.75rem;
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
		background: var(--bg-tertiary);
	}

	.action-btn.connect {
		background: var(--accent-green);
		color: var(--text-inverse);
		border-color: var(--accent-green);
	}

	.action-btn.connect:hover {
		background: var(--accent-green);
		filter: brightness(1.1);
	}

	.action-btn.disconnect {
		background: var(--accent-yellow);
		color: var(--text-inverse);
		border-color: var(--accent-yellow);
	}

	.action-btn.disconnect:hover {
		background: var(--accent-yellow);
		filter: brightness(1.1);
	}

	.action-btn.select {
		background: var(--accent-primary);
		color: var(--text-inverse);
		border-color: var(--accent-primary);
	}

	.action-btn.select:hover {
		background: var(--accent-primary);
		filter: brightness(1.1);
	}

	.action-btn.delete {
		background: var(--accent-red);
		color: var(--text-inverse);
		border-color: var(--accent-red);
	}

	.action-btn.delete:hover {
		background: var(--accent-red);
		filter: brightness(1.1);
	}

	.action-btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
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

	@media (max-width: 768px) {
		.manager-header {
			flex-direction: column;
			gap: 1rem;
			align-items: flex-start;
		}

		.connection-header {
			flex-direction: column;
			gap: 1rem;
		}

		.connection-actions {
			flex-wrap: wrap;
		}

		.form-grid {
			grid-template-columns: 1fr;
		}
	}
</style>

<script lang="ts">
	import { writable } from 'svelte/store';
	import ThemeToggle from '../../../lib/components/ThemeToggle.svelte';
	import DatabaseManager from './components/DatabaseManager.svelte';
	import QueryEditor from './components/QueryEditor.svelte';
	import TableManager from './components/TableManager.svelte';

	// Store for database connections and data
	export const databaseConnections = writable([
		{
			id: '1',
			name: 'Development DB',
			type: 'postgresql',
			host: 'localhost',
			port: 5432,
			database: 'dev_db',
			username: 'postgres',
			status: 'connected'
		},
		{
			id: '2',
			name: 'Production DB',
			type: 'mysql',
			host: 'prod-server.com',
			port: 3306,
			database: 'prod_db',
			username: 'admin',
			status: 'disconnected'
		}
	]);

	export const queryHistory = writable([
		{
			id: '1',
			query: 'SELECT * FROM users LIMIT 10;',
			timestamp: new Date('2024-01-15T10:30:00'),
			status: 'success',
			rowsAffected: 10,
			executionTime: 45
		},
		{
			id: '2',
			query: 'CREATE TABLE products (id SERIAL PRIMARY KEY, name VARCHAR(255), price DECIMAL(10,2));',
			timestamp: new Date('2024-01-15T09:15:00'),
			status: 'success',
			rowsAffected: 0,
			executionTime: 120
		}
	]);

	let currentView: 'databases' | 'query' | 'tables' = 'databases';
	let selectedConnection: any = null;
	let isConnecting = false;

	function handleConnectionSelect(connection: any) {
		selectedConnection = connection;
	}

	function handleQueryExecute(queryData: any) {
		queryHistory.update(history => [
			{
				id: Date.now().toString(),
				query: queryData.query,
				timestamp: new Date(),
				status: 'success',
				rowsAffected: queryData.rowsAffected || 0,
				executionTime: queryData.executionTime || 0
			},
			...history
		]);
	}
</script>

<svelte:head>
	<title>Admin Console - Database Management</title>
	<meta name="description" content="Database management and query execution console" />
</svelte:head>

<div class="admin-console">
	<header class="console-header">
		<div class="header-content">
			<div class="header-left">
				<a href="/toolkit" class="back-btn">← Back to Toolkit</a>
				<h1 class="title">🗄️ Admin Console</h1>
				<p class="subtitle">Database management, query execution, and table administration</p>
			</div>
			<div class="header-right">
				<div class="theme-toggle-container">
					<ThemeToggle />
				</div>
			</div>
		</div>
	</header>

	<div class="console-content">
		<nav class="console-nav">
			<button 
				class="nav-btn" 
				class:active={currentView === 'databases'}
				on:click={() => currentView = 'databases'}
			>
				🔗 Databases
			</button>
			<button 
				class="nav-btn" 
				class:active={currentView === 'query'}
				on:click={() => currentView = 'query'}
			>
				📝 Query Editor
			</button>
			<button 
				class="nav-btn" 
				class:active={currentView === 'tables'}
				on:click={() => currentView = 'tables'}
			>
				📊 Table Manager
			</button>
		</nav>

		<main class="console-main">
			{#if currentView === 'databases'}
				<DatabaseManager 
					{databaseConnections} 
					on:select={({ detail }) => handleConnectionSelect(detail)}
				/>
			{:else if currentView === 'query'}
				<QueryEditor 
					{selectedConnection}
					{queryHistory}
					on:execute={({ detail }) => handleQueryExecute(detail)}
				/>
			{:else if currentView === 'tables'}
				<TableManager 
					{selectedConnection}
				/>
			{/if}
		</main>
	</div>
</div>

<style>
	.admin-console {
		min-height: 100vh;
		background: var(--gradient-bg);
		color: var(--text-primary);
		display: flex;
		flex-direction: column;
	}

	.console-header {
		background: var(--bg-header);
		padding: 2rem 0;
		border-bottom: 1px solid var(--border-primary);
	}

	.header-content {
		max-width: 1400px;
		margin: 0 auto;
		padding: 0 2rem;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 2rem;
	}

	.header-left {
		flex: 1;
	}

	.back-btn {
		display: inline-flex;
		align-items: center;
		color: var(--text-muted);
		text-decoration: none;
		font-size: 0.9rem;
		margin-bottom: 1rem;
		transition: color 0.2s;
	}

	.back-btn:hover {
		color: var(--accent-primary);
	}

	.title {
		margin: 0 0 0.5rem 0;
		font-size: 2.5rem;
		font-weight: 700;
		color: var(--text-primary);
	}

	.subtitle {
		margin: 0;
		font-size: 1.1rem;
		color: var(--text-muted);
		line-height: 1.6;
	}

	.header-right {
		display: flex;
		align-items: center;
	}

	.theme-toggle-container {
		height: fit-content;
		flex-shrink: 0;
	}

	.console-content {
		flex: 1;
		display: flex;
		max-width: 1400px;
		margin: 0 auto;
		width: 100%;
		padding: 2rem;
		gap: 2rem;
	}

	.console-nav {
		width: 250px;
		background: var(--bg-card);
		border-radius: 12px;
		padding: 1.5rem;
		height: fit-content;
		box-shadow: var(--shadow-sm);
		border: 1px solid var(--border-primary);
	}

	.nav-btn {
		width: 100%;
		background: none;
		border: none;
		color: var(--text-primary);
		padding: 1rem;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.2s;
		font-size: 1rem;
		font-weight: 500;
		text-align: left;
		margin-bottom: 0.5rem;
	}

	.nav-btn:hover {
		background: var(--bg-secondary);
	}

	.nav-btn.active {
		background: var(--accent-primary);
		color: var(--text-inverse);
	}

	.console-main {
		flex: 1;
		background: var(--bg-card);
		border-radius: 12px;
		padding: 2rem;
		box-shadow: var(--shadow-sm);
		border: 1px solid var(--border-primary);
		min-height: 600px;
	}

	@media (max-width: 1024px) {
		.console-content {
			flex-direction: column;
			padding: 1rem;
		}

		.console-nav {
			width: 100%;
			display: flex;
			gap: 0.5rem;
			padding: 1rem;
		}

		.nav-btn {
			flex: 1;
			text-align: center;
			margin-bottom: 0;
			padding: 0.75rem;
			font-size: 0.9rem;
		}
	}

	@media (max-width: 768px) {
		.header-content {
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
		}

		.title {
			font-size: 2rem;
		}

		.console-nav {
			flex-direction: column;
		}

		.nav-btn {
			flex: none;
		}
	}
</style>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';
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

	export let tickets: Writable<Ticket[]>;
	export let resolverGroups: Writable<ResolverGroup[]>;
	export let ticketCategories: any[];
	export let ticketPriorities: any[];
	export let ticketStatuses: any[];
	export let getCategoryColor: (id: string) => string;
	export let getPriorityColor: (id: string) => string;
	export let getStatusColor: (id: string) => string;

	const dispatch = createEventDispatcher();

	let filterStatus = 'all';
	let filterPriority = 'all';
	let filterCategory = 'all';
	let filterAssignee = 'all';
	let searchQuery = '';
	let sortBy = 'updatedAt';
	let sortOrder: 'asc' | 'desc' = 'desc';

	function handleEdit(ticket: Ticket) {
		dispatch('edit', ticket);
	}

	function handleDelete(ticketId: string) {
		if (confirm('Are you sure you want to delete this ticket?')) {
			dispatch('delete', ticketId);
		}
	}

	function handleView(ticket: Ticket) {
		dispatch('select', ticket);
	}

	function formatDate(date: Date): string {
		return new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		}).format(date);
	}

	function getResolverGroupName(groupId: string): string {
		const group = $resolverGroups.find(g => g.id === groupId);
		return group ? group.name : 'Unknown';
	}

	function getAssigneeName(email: string): string {
		return email.split('@')[0].replace('.', ' ');
	}

	$: filteredTickets = $tickets.filter(ticket => {
		if (filterStatus !== 'all' && ticket.status !== filterStatus) return false;
		if (filterPriority !== 'all' && ticket.priority !== filterPriority) return false;
		if (filterCategory !== 'all' && ticket.category !== filterCategory) return false;
		if (filterAssignee !== 'all' && ticket.assignee !== filterAssignee) return false;
		if (searchQuery && !ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
			!ticket.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
		return true;
	});

	$: sortedTickets = [...filteredTickets].sort((a, b) => {
		let aValue: any = a[sortBy as keyof Ticket];
		let bValue: any = b[sortBy as keyof Ticket];
		
		if (sortBy === 'assignee') {
			aValue = getAssigneeName(a.assignee);
			bValue = getAssigneeName(b.assignee);
		} else if (sortBy === 'resolverGroup') {
			aValue = getResolverGroupName(a.resolverGroup);
			bValue = getResolverGroupName(b.resolverGroup);
		}
		
		if (typeof aValue === 'string' && typeof bValue === 'string') {
			return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
		}
		
		if (aValue instanceof Date && bValue instanceof Date) {
			return sortOrder === 'asc' ? aValue.getTime() - bValue.getTime() : bValue.getTime() - aValue.getTime();
		}
		
		return 0;
	});

	function handleSort(field: string) {
		if (sortBy === field) {
			sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
		} else {
			sortBy = field;
			sortOrder = 'desc';
		}
	}
</script>

<div class="ticket-list">
	<div class="list-header">
		<div class="header-left">
			<h2>Tickets ({sortedTickets.length})</h2>
			<div class="search-box">
				<input 
					type="text" 
					placeholder="Search tickets..." 
					bind:value={searchQuery}
					class="search-input"
				/>
			</div>
		</div>
		<div class="filters">
			<select bind:value={filterStatus} class="filter-select">
				<option value="all">All Status</option>
				{#each ticketStatuses as status}
					<option value={status.id}>{status.name}</option>
				{/each}
			</select>
			
			<select bind:value={filterPriority} class="filter-select">
				<option value="all">All Priorities</option>
				{#each ticketPriorities as priority}
					<option value={priority.id}>{priority.name}</option>
				{/each}
			</select>
			
			<select bind:value={filterCategory} class="filter-select">
				<option value="all">All Categories</option>
				{#each ticketCategories as category}
					<option value={category.id}>{category.name}</option>
				{/each}
			</select>
			
			<select bind:value={filterAssignee} class="filter-select">
				<option value="all">All Assignees</option>
				{#each [...new Set($tickets.map(t => t.assignee))] as assignee}
					<option value={assignee}>{getAssigneeName(assignee)}</option>
				{/each}
			</select>
		</div>
	</div>

	<div class="table-container">
		<table class="tickets-table">
			<thead>
				<tr>
					<th class="sortable" on:click={() => handleSort('id')}>
						ID {sortBy === 'id' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
					</th>
					<th class="sortable" on:click={() => handleSort('title')}>
						Title {sortBy === 'title' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
					</th>
					<th>Category</th>
					<th>Priority</th>
					<th>Status</th>
					<th class="sortable" on:click={() => handleSort('assignee')}>
						Assignee {sortBy === 'assignee' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
					</th>
					<th>Resolver Group</th>
					<th class="sortable" on:click={() => handleSort('updatedAt')}>
						Updated {sortBy === 'updatedAt' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
					</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each sortedTickets as ticket (ticket.id)}
					<tr class="ticket-row" on:click={() => handleView(ticket)}>
						<td class="ticket-id">{ticket.id}</td>
						<td class="ticket-title">
							<div class="title-content">
								<span class="title-text">{ticket.title}</span>
								<p class="description">{ticket.description}</p>
							</div>
						</td>
						<td>
							<span class="badge category-badge" style="background-color: {getCategoryColor(ticket.category)}">
								{ticketCategories.find(c => c.id === ticket.category)?.name || ticket.category}
							</span>
						</td>
						<td>
							<span class="badge priority-badge" style="background-color: {getPriorityColor(ticket.priority)}">
								{ticketPriorities.find(p => p.id === ticket.priority)?.name || ticket.priority}
							</span>
						</td>
						<td>
							<span class="badge status-badge" style="background-color: {getStatusColor(ticket.status)}">
								{ticketStatuses.find(s => s.id === ticket.status)?.name || ticket.status}
							</span>
						</td>
						<td class="assignee">{getAssigneeName(ticket.assignee)}</td>
						<td class="resolver-group">{getResolverGroupName(ticket.resolverGroup)}</td>
						<td class="updated-at">{formatDate(ticket.updatedAt)}</td>
						<td class="actions">
							<button class="action-btn edit-btn" on:click|stopPropagation={() => handleEdit(ticket)}>
								✏️
							</button>
							<button class="action-btn delete-btn" on:click|stopPropagation={() => handleDelete(ticket.id)}>
								🗑️
							</button>
						</td>
					</tr>
				{:else}
					<tr>
						<td colspan="9" class="empty-state">
							<div class="empty-content">
								<div class="empty-icon">📋</div>
								<h3>No tickets found</h3>
								<p>Try adjusting your filters or create a new ticket.</p>
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<style>
	.ticket-list {
		padding: 2rem 0;
		margin-top: 2rem;
		background: var(--bg-card);
		border-radius: 8px;
		box-shadow: var(--shadow-sm);
	}

	.list-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 2rem;
		gap: 2rem;
		padding: 0 2rem;
	}

	.header-left {
		display: flex;
		align-items: center;
		gap: 2rem;
		flex: 1;
	}

	.header-left h2 {
		margin: 0;
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--text-primary);
		white-space: nowrap;
	}

	.search-box {
		min-width: 300px;
	}

	.search-input {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid var(--border-primary);
		border-radius: 6px;
		font-size: 0.9rem;
		transition: border-color 0.2s;
		background: var(--bg-card);
		color: var(--text-primary);
	}

	.search-input:focus {
		outline: none;
		border-color: var(--accent-primary);
		box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
	}

	.filters {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
		align-items: center;
	}

	.filter-select {
		padding: 0.5rem;
		border: 1px solid var(--border-primary);
		border-radius: 4px;
		background: var(--bg-card);
		color: var(--text-primary);
		font-size: 0.9rem;
		min-width: 120px;
	}

	.table-container {
		background: var(--bg-card);
		border-radius: 8px;
		box-shadow: var(--shadow-sm);
		overflow: hidden;
		margin: 0 2rem 2rem 2rem;
	}

	.tickets-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.9rem;
	}

	.tickets-table th {
		background: var(--bg-secondary);
		padding: 1rem;
		text-align: left;
		font-weight: 600;
		color: var(--text-primary);
		border-bottom: 1px solid var(--border-primary);
	}

	.sortable {
		cursor: pointer;
		user-select: none;
		transition: background-color 0.2s;
	}

	.sortable:hover {
		background: var(--bg-tertiary);
	}

	.ticket-row {
		cursor: pointer;
		transition: background-color 0.2s;
		border-bottom: 1px solid var(--border-primary);
	}

	.ticket-row:hover {
		background: var(--bg-secondary);
	}

	.ticket-row td {
		padding: 1rem;
		vertical-align: top;
	}

	.ticket-id {
		font-family: 'Monaco', 'Menlo', monospace;
		font-size: 0.8rem;
		color: var(--text-muted);
		font-weight: 500;
	}

	.ticket-title {
		max-width: 300px;
		min-width: 250px;
	}

	.title-content {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.title-text {
		font-weight: 600;
		color: var(--text-primary);
		line-height: 1.3;
	}

	.description {
		margin: 0;
		font-size: 0.8rem;
		color: var(--text-muted);
		line-height: 1.4;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.badge {
		padding: 0.25rem 0.5rem;
		border-radius: 12px;
		font-size: 0.75rem;
		font-weight: 500;
		color: white;
		text-transform: capitalize;
		display: inline-block;
	}

	.assignee, .resolver-group {
		font-weight: 500;
		color: var(--text-primary);
		white-space: nowrap;
	}

	.updated-at {
		font-size: 0.8rem;
		color: var(--text-muted);
	}

	.actions {
		display: flex;
		gap: 0.5rem;
		white-space: nowrap;
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
		background: #e3f2fd;
		border-color: #2196f3;
		color: #1976d2;
	}

	.delete-btn:hover {
		background: #ffebee;
		border-color: #f44336;
		color: #d32f2f;
	}

	.empty-state {
		text-align: center;
		padding: 4rem 2rem;
	}

	.empty-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
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
	}

	@media (max-width: 1024px) {
		.list-header {
			flex-direction: column;
			align-items: stretch;
			gap: 1rem;
			padding: 0 1rem;
		}

		.header-left {
			flex-direction: column;
			align-items: stretch;
			gap: 1rem;
		}

		.search-box {
			min-width: auto;
		}

		.filters {
			justify-content: flex-start;
		}

		.table-container {
			overflow-x: auto;
			margin: 0 1rem 2rem 1rem;
		}

		.tickets-table {
			min-width: 800px;
		}
	}

	@media (max-width: 768px) {
		.list-header {
			padding: 0 0.5rem;
		}

		.filters {
			flex-direction: column;
			align-items: stretch;
		}

		.filter-select {
			min-width: auto;
		}

		.table-container {
			margin: 0 0.5rem 2rem 0.5rem;
		}
	}
</style>

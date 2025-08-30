<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Writable } from 'svelte/store';

	interface Correspondence {
		id: string;
		ticketId: string;
		from: string;
		to: string;
		subject: string;
		content: string;
		type: string;
		createdAt: Date;
		attachments: string[];
	}

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

	export let correspondence: Writable<Correspondence[]>;
	export let tickets: Writable<Ticket[]>;

	const dispatch = createEventDispatcher();

	let editingMessage: Correspondence | null = null;
	let isCreating = false;
	let selectedTicketId = '';
	let filterType = 'all';

	function createNewMessage() {
		isCreating = true;
		editingMessage = {
			id: `CORR-${Date.now().toString().slice(-6)}`,
			ticketId: selectedTicketId || '',
			from: 'current-user@company.com',
			to: '',
			subject: '',
			content: '',
			type: 'email',
			createdAt: new Date(),
			attachments: []
		};
	}

	function editMessage(message: Correspondence) {
		isCreating = false;
		editingMessage = { ...message };
	}

	function deleteMessage(messageId: string) {
		if (confirm('Are you sure you want to delete this message?')) {
			dispatch('delete', messageId);
		}
	}

	function saveMessage() {
		if (editingMessage) {
			dispatch('save', editingMessage);
			editingMessage = null;
			isCreating = false;
		}
	}

	function cancelEdit() {
		editingMessage = null;
		isCreating = false;
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

	function getTicketTitle(ticketId: string): string {
		const ticket = $tickets.find(t => t.id === ticketId);
		return ticket ? ticket.title : 'Unknown Ticket';
	}

	function getSenderName(email: string): string {
		return email.split('@')[0].replace('.', ' ');
	}

	$: filteredCorrespondence = $correspondence.filter(message => {
		if (selectedTicketId && message.ticketId !== selectedTicketId) return false;
		if (filterType !== 'all' && message.type !== filterType) return false;
		return true;
	});

	$: sortedCorrespondence = [...filteredCorrespondence].sort((a, b) => 
		b.createdAt.getTime() - a.createdAt.getTime()
	);
</script>

<div class="correspondence">
	<div class="correspondence-header">
		<div class="header-left">
			<h2>Correspondence ({sortedCorrespondence.length})</h2>
			<p class="description">Track all communication related to tickets</p>
		</div>
		<div class="header-right">
			<button class="btn btn-primary" on:click={createNewMessage}>
				+ New Message
			</button>
		</div>
	</div>

	<div class="filters-section">
		<div class="filter-group">
			<label for="ticketFilter">Filter by Ticket:</label>
			<select id="ticketFilter" bind:value={selectedTicketId} class="filter-select">
				<option value="">All Tickets</option>
				{#each $tickets as ticket}
					<option value={ticket.id}>{ticket.id} - {ticket.title}</option>
				{/each}
			</select>
		</div>
		<div class="filter-group">
			<label for="typeFilter">Filter by Type:</label>
			<select id="typeFilter" bind:value={filterType} class="filter-select">
				<option value="all">All Types</option>
				<option value="email">Email</option>
				<option value="internal">Internal Note</option>
				<option value="phone">Phone Call</option>
				<option value="meeting">Meeting</option>
			</select>
		</div>
	</div>

	{#if editingMessage}
		<div class="edit-panel">
			<div class="edit-header">
				<h3>{isCreating ? 'Create New Message' : 'Edit Message'}</h3>
			</div>
			<div class="edit-content">
				<div class="form-row">
					<div class="form-group">
						<label for="messageTicket">Related Ticket *</label>
						<select id="messageTicket" bind:value={editingMessage.ticketId} class="form-select">
							<option value="">Select a ticket</option>
							{#each $tickets as ticket}
								<option value={ticket.id}>{ticket.id} - {ticket.title}</option>
							{/each}
						</select>
					</div>

					<div class="form-group">
						<label for="messageType">Message Type</label>
						<select id="messageType" bind:value={editingMessage.type} class="form-select">
							<option value="email">Email</option>
							<option value="internal">Internal Note</option>
							<option value="phone">Phone Call</option>
							<option value="meeting">Meeting</option>
						</select>
					</div>
				</div>

				<div class="form-row">
					<div class="form-group">
						<label for="messageFrom">From</label>
						<input 
							id="messageFrom"
							type="email" 
							bind:value={editingMessage.from}
							placeholder="sender@company.com"
							class="form-input"
						/>
					</div>

					<div class="form-group">
						<label for="messageTo">To</label>
						<input 
							id="messageTo"
							type="email" 
							bind:value={editingMessage.to}
							placeholder="recipient@company.com"
							class="form-input"
						/>
					</div>
				</div>

				<div class="form-group">
					<label for="messageSubject">Subject</label>
					<input 
						id="messageSubject"
						type="text" 
						bind:value={editingMessage.subject}
						placeholder="Message subject"
						class="form-input"
					/>
				</div>

				<div class="form-group">
					<label for="messageContent">Content</label>
					<textarea 
						id="messageContent"
						bind:value={editingMessage.content}
						placeholder="Enter message content..."
						class="form-textarea"
						rows="8"
					></textarea>
				</div>

				<div class="edit-actions">
					<button class="btn btn-secondary" on:click={cancelEdit}>Cancel</button>
					<button class="btn btn-primary" on:click={saveMessage} disabled={!editingMessage.ticketId || !editingMessage.content}>
						{isCreating ? 'Send Message' : 'Save Changes'}
					</button>
				</div>
			</div>
		</div>
	{:else}
		<div class="messages-list">
			{#each sortedCorrespondence as message (message.id)}
				<div class="message-card">
					<div class="message-header">
						<div class="message-info">
							<div class="message-meta">
								<span class="message-type {message.type}">{message.type}</span>
								<span class="message-date">{formatDate(message.createdAt)}</span>
							</div>
							<h3 class="message-subject">{message.subject}</h3>
							<div class="message-participants">
								<span class="participant from">From: {getSenderName(message.from)}</span>
								<span class="participant to">To: {getSenderName(message.to)}</span>
							</div>
						</div>
						<div class="message-actions">
							<button class="action-btn edit-btn" on:click={() => editMessage(message)}>
								✏️
							</button>
							<button class="action-btn delete-btn" on:click={() => deleteMessage(message.id)}>
								🗑️
							</button>
						</div>
					</div>
					
					<div class="message-ticket">
						<span class="ticket-label">Related Ticket:</span>
						<span class="ticket-title">{getTicketTitle(message.ticketId)}</span>
					</div>

					<div class="message-content">
						{message.content}
					</div>

					{#if message.attachments.length > 0}
						<div class="message-attachments">
							<div class="attachments-label">Attachments:</div>
							<div class="attachments-list">
								{#each message.attachments as attachment}
									<span class="attachment-item">📎 {attachment}</span>
								{/each}
							</div>
						</div>
					{/if}
				</div>
			{:else}
				<div class="empty-state">
					<div class="empty-content">
						<div class="empty-icon">💬</div>
						<h3>No correspondence found</h3>
						<p>Start tracking communication by creating your first message.</p>
						<button class="btn btn-primary" on:click={createNewMessage}>
							Create First Message
						</button>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.correspondence {
		padding: 2rem 0;
	}

	.correspondence-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 2rem;
	}

	.header-left h2 {
		margin: 0 0 0.5rem 0;
		font-size: 1.5rem;
		font-weight: 600;
		color: #212529;
	}

	.description {
		margin: 0;
		color: #6c757d;
		font-size: 0.9rem;
	}

	.filters-section {
		display: flex;
		gap: 2rem;
		margin-bottom: 2rem;
		padding: 1.5rem;
		background: white;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
	}

	.filter-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.filter-group label {
		font-size: 0.9rem;
		font-weight: 500;
		color: #495057;
	}

	.filter-select {
		padding: 0.5rem;
		border: 1px solid #dee2e6;
		border-radius: 4px;
		background: white;
		font-size: 0.9rem;
		min-width: 200px;
	}

	.edit-panel {
		background: white;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
		overflow: hidden;
	}

	.edit-header {
		background: #f8f9fa;
		padding: 1rem 1.5rem;
		border-bottom: 1px solid #e9ecef;
	}

	.edit-header h3 {
		margin: 0;
		font-size: 1.1rem;
		font-weight: 600;
		color: #212529;
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
		color: #495057;
		font-size: 0.9rem;
	}

	.form-input, .form-textarea, .form-select {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid #dee2e6;
		border-radius: 6px;
		font-size: 0.9rem;
		transition: border-color 0.2s;
		box-sizing: border-box;
	}

	.form-input:focus, .form-textarea:focus, .form-select:focus {
		outline: none;
		border-color: #007bff;
		box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
	}

	.form-textarea {
		resize: vertical;
		min-height: 120px;
	}

	.edit-actions {
		display: flex;
		gap: 1rem;
		justify-content: flex-end;
		margin-top: 2rem;
		padding-top: 1rem;
		border-top: 1px solid #e9ecef;
	}

	.messages-list {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.message-card {
		background: white;
		border-radius: 8px;
		padding: 1.5rem;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
		transition: transform 0.2s, box-shadow 0.2s;
	}

	.message-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}

	.message-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 1rem;
	}

	.message-meta {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 0.5rem;
	}

	.message-type {
		padding: 0.25rem 0.5rem;
		border-radius: 12px;
		font-size: 0.75rem;
		font-weight: 500;
		text-transform: capitalize;
	}

	.message-type.email {
		background: #e3f2fd;
		color: #1976d2;
	}

	.message-type.internal {
		background: #f3e5f5;
		color: #7b1fa2;
	}

	.message-type.phone {
		background: #e8f5e8;
		color: #388e3c;
	}

	.message-type.meeting {
		background: #fff3e0;
		color: #f57c00;
	}

	.message-date {
		font-size: 0.8rem;
		color: #6c757d;
	}

	.message-subject {
		margin: 0 0 0.5rem 0;
		font-size: 1.1rem;
		font-weight: 600;
		color: #212529;
	}

	.message-participants {
		display: flex;
		gap: 1rem;
		font-size: 0.8rem;
		color: #6c757d;
	}

	.participant {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.participant.from::before {
		content: "👤";
	}

	.participant.to::before {
		content: "📧";
	}

	.message-actions {
		display: flex;
		gap: 0.5rem;
	}

	.action-btn {
		background: none;
		border: 1px solid #dee2e6;
		padding: 0.5rem;
		border-radius: 4px;
		cursor: pointer;
		transition: all 0.2s;
		font-size: 0.875rem;
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

	.message-ticket {
		margin-bottom: 1rem;
		padding: 0.75rem;
		background: #f8f9fa;
		border-radius: 6px;
		border-left: 4px solid #007bff;
	}

	.ticket-label {
		font-size: 0.8rem;
		color: #6c757d;
		font-weight: 500;
		margin-right: 0.5rem;
	}

	.ticket-title {
		font-size: 0.9rem;
		color: #212529;
		font-weight: 500;
	}

	.message-content {
		margin-bottom: 1rem;
		line-height: 1.6;
		color: #495057;
		white-space: pre-wrap;
	}

	.message-attachments {
		border-top: 1px solid #f1f3f4;
		padding-top: 1rem;
	}

	.attachments-label {
		font-size: 0.8rem;
		color: #6c757d;
		font-weight: 500;
		margin-bottom: 0.5rem;
	}

	.attachments-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.attachment-item {
		background: #f8f9fa;
		color: #495057;
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		font-size: 0.8rem;
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
		max-width: 400px;
		margin: 0 auto;
	}

	.empty-icon {
		font-size: 3rem;
		opacity: 0.5;
	}

	.empty-content h3 {
		margin: 0;
		color: #495057;
		font-weight: 600;
	}

	.empty-content p {
		margin: 0;
		color: #6c757d;
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
		background: #007bff;
		color: white;
	}

	.btn-primary:hover {
		background: #0056b3;
	}

	.btn-secondary {
		background: #6c757d;
		color: white;
	}

	.btn-secondary:hover {
		background: #545b62;
	}

	.btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	@media (max-width: 768px) {
		.correspondence-header {
			flex-direction: column;
			gap: 1rem;
			align-items: stretch;
		}

		.filters-section {
			flex-direction: column;
			gap: 1rem;
		}

		.form-row {
			flex-direction: column;
		}

		.message-header {
			flex-direction: column;
			gap: 1rem;
		}

		.message-participants {
			flex-direction: column;
			gap: 0.5rem;
		}

		.edit-actions {
			flex-direction: column;
		}
	}
</style>

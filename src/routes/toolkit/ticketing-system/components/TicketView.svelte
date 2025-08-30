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

	interface ResolverGroup {
		id: string;
		name: string;
		description: string;
		members: string[];
		lead: string;
		createdAt: Date;
	}

	export let ticket: Ticket;
	export let correspondence: Writable<Correspondence[]>;
	export let resolverGroups: Writable<ResolverGroup[]>;
	export let ticketCategories: any[];
	export let ticketPriorities: any[];
	export let ticketStatuses: any[];
	export let getCategoryColor: (id: string) => string;
	export let getPriorityColor: (id: string) => string;
	export let getStatusColor: (id: string) => string;

	const dispatch = createEventDispatcher();

	let newMessage = {
		from: 'current-user@company.com',
		to: '',
		subject: '',
		content: '',
		type: 'internal'
	};

	let showNewMessageForm = false;

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

	function getSenderName(email: string): string {
		return email.split('@')[0].replace('.', ' ');
	}

	function handleEdit() {
		dispatch('edit', ticket);
	}

	function handleDelete() {
		if (confirm('Are you sure you want to delete this ticket?')) {
			dispatch('delete', ticket.id);
		}
	}

	function addMessage() {
		if (newMessage.content.trim()) {
			const message: Correspondence = {
				id: `CORR-${Date.now().toString().slice(-6)}`,
				ticketId: ticket.id,
				from: newMessage.from,
				to: newMessage.to,
				subject: newMessage.subject,
				content: newMessage.content,
				type: newMessage.type,
				createdAt: new Date(),
				attachments: []
			};
			dispatch('addMessage', message);
			
			// Reset form
			newMessage = {
				from: 'current-user@company.com',
				to: '',
				subject: '',
				content: '',
				type: 'internal'
			};
			showNewMessageForm = false;
		}
	}

	function deleteMessage(messageId: string) {
		if (confirm('Are you sure you want to delete this message?')) {
			dispatch('deleteMessage', messageId);
		}
	}

	$: ticketCorrespondence = $correspondence.filter(msg => msg.ticketId === ticket.id);
	$: sortedCorrespondence = [...ticketCorrespondence].sort((a, b) => 
		b.createdAt.getTime() - a.createdAt.getTime()
	);
</script>

<div class="ticket-view">
	<div class="ticket-header">
		<div class="header-left">
			<button class="back-btn" on:click={() => dispatch('back')}>
				← Back to Tickets
			</button>
			<h1 class="ticket-title">{ticket.title}</h1>
			<div class="ticket-meta">
				<span class="ticket-id">{ticket.id}</span>
				<span class="ticket-date">Created {formatDate(ticket.createdAt)}</span>
				<span class="ticket-date">Updated {formatDate(ticket.updatedAt)}</span>
			</div>
		</div>
		<div class="header-right">
			<button class="btn btn-secondary" on:click={handleEdit}>Edit Ticket</button>
			<button class="btn btn-danger" on:click={handleDelete}>Delete</button>
		</div>
	</div>

	<div class="ticket-content">
		<div class="main-content">
			<div class="ticket-info">
				<div class="info-grid">
					<div class="info-item">
						<label>Status</label>
						<span class="badge status-badge" style="background-color: {getStatusColor(ticket.status)}">
							{ticketStatuses.find(s => s.id === ticket.status)?.name || ticket.status}
						</span>
					</div>
					<div class="info-item">
						<label>Priority</label>
						<span class="badge priority-badge" style="background-color: {getPriorityColor(ticket.priority)}">
							{ticketPriorities.find(p => p.id === ticket.priority)?.name || ticket.priority}
						</span>
					</div>
					<div class="info-item">
						<label>Category</label>
						<span class="badge category-badge" style="background-color: {getCategoryColor(ticket.category)}">
							{ticketCategories.find(c => c.id === ticket.category)?.name || ticket.category}
						</span>
					</div>
					<div class="info-item">
						<label>Assignee</label>
						<span class="assignee">{getAssigneeName(ticket.assignee)}</span>
					</div>
					<div class="info-item">
						<label>Resolver Group</label>
						<span class="resolver-group">{getResolverGroupName(ticket.resolverGroup)}</span>
					</div>
					<div class="info-item">
						<label>Created By</label>
						<span class="created-by">{getAssigneeName(ticket.createdBy)}</span>
					</div>
				</div>

				{#if ticket.tags.length > 0}
					<div class="tags-section">
						<label>Tags</label>
						<div class="tags-list">
							{#each ticket.tags as tag}
								<span class="tag">{tag}</span>
							{/each}
						</div>
					</div>
				{/if}
			</div>

			<div class="description-section">
				<h3>Description</h3>
				<p class="description">{ticket.description}</p>
			</div>

			<div class="content-section">
				<h3>Content</h3>
				<div class="content-body">{@html markdownToHtml(ticket.content)}</div>
			</div>
		</div>

		<div class="correspondence-section">
			<div class="correspondence-header">
				<h3>Correspondence ({sortedCorrespondence.length})</h3>
				<button class="btn btn-primary" on:click={() => showNewMessageForm = !showNewMessageForm}>
					{showNewMessageForm ? 'Cancel' : '+ Add Message'}
				</button>
			</div>

			{#if showNewMessageForm}
				<div class="new-message-form">
					<div class="form-row">
						<div class="form-group">
							<label>Type</label>
							<select bind:value={newMessage.type} class="form-select">
								<option value="internal">Internal Note</option>
								<option value="email">Email</option>
								<option value="phone">Phone Call</option>
								<option value="meeting">Meeting</option>
							</select>
						</div>
						<div class="form-group">
							<label>To</label>
							<input type="email" bind:value={newMessage.to} placeholder="recipient@company.com" class="form-input" />
						</div>
					</div>
					<div class="form-group">
						<label>Subject</label>
						<input type="text" bind:value={newMessage.subject} placeholder="Message subject" class="form-input" />
					</div>
					<div class="form-group">
						<label>Content</label>
						<textarea bind:value={newMessage.content} placeholder="Enter message content..." class="form-textarea" rows="4"></textarea>
					</div>
					<div class="form-actions">
						<button class="btn btn-primary" on:click={addMessage} disabled={!newMessage.content.trim()}>
							Add Message
						</button>
					</div>
				</div>
			{/if}

			<div class="messages-list">
				{#each sortedCorrespondence as message (message.id)}
					<div class="message-card">
						<div class="message-header">
							<div class="message-meta">
								<span class="message-type {message.type}">{message.type}</span>
								<span class="message-date">{formatDate(message.createdAt)}</span>
							</div>
							<button class="delete-btn" on:click={() => deleteMessage(message.id)}>🗑️</button>
						</div>
						{#if message.subject}
							<h4 class="message-subject">{message.subject}</h4>
						{/if}
						<div class="message-participants">
							<span>From: {getSenderName(message.from)}</span>
							{#if message.to}
								<span>To: {getSenderName(message.to)}</span>
							{/if}
						</div>
						<div class="message-content">{message.content}</div>
					</div>
				{:else}
					<div class="empty-messages">
						<p>No correspondence yet. Add the first message to start tracking communication.</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	.ticket-view {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		background: var(--gradient-bg);
	}

	.ticket-header {
		background: var(--bg-header);
		color: var(--text-inverse);
		border-bottom: 1px solid var(--border-accent);
		padding: 1.5rem 2rem;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		width: 100%;
		box-sizing: border-box;
		box-shadow: var(--shadow-lg);
		gap: 2rem;
	}

	.header-left {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.back-btn {
		background: none;
		border: none;
		color: var(--text-secondary);
		font-size: 0.9rem;
		cursor: pointer;
		padding: 0.5rem 0;
		margin-bottom: 1rem;
		transition: all 0.2s;
	}

	.back-btn:hover {
		color: var(--text-inverse);
	}

	.ticket-title {
		margin: 0 0 0.5rem 0;
		font-size: 1.75rem;
		font-weight: 600;
		color: var(--text-inverse);
		line-height: 1.3;
	}

	.ticket-meta {
		display: flex;
		gap: 1rem;
		align-items: center;
		font-size: 0.9rem;
		color: var(--text-secondary);
	}

	.ticket-id {
		font-family: 'Monaco', 'Menlo', monospace;
		font-weight: 500;
		color: var(--accent-yellow);
	}

	.header-right {
		display: flex;
		gap: 1rem;
		align-items: flex-start;
		flex-shrink: 0;
	}

	.ticket-content {
		flex: 1;
		display: flex;
		gap: 1rem;
		padding: 2rem;
		width: 100%;
		box-sizing: border-box;
	}

	.main-content {
		flex: 1;
		min-width: 0;
		background: var(--bg-card);
		border-radius: 8px;
		padding: 1.5rem;
		box-shadow: var(--shadow-sm);
	}

	.correspondence-section {
		width: 300px;
		min-width: 300px;
		background: var(--bg-card);
		border-radius: 8px;
		box-shadow: var(--shadow-sm);
		display: flex;
		flex-direction: column;
	}

	.ticket-info {
		margin-bottom: 2rem;
		padding-bottom: 2rem;
		border-bottom: 1px solid var(--border-primary);
	}

	.info-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.info-item {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.info-item label {
		font-size: 0.8rem;
		font-weight: 500;
		color: var(--text-muted);
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.badge {
		padding: 0.25rem 0.75rem;
		border-radius: 12px;
		font-size: 0.75rem;
		font-weight: 500;
		color: white;
		text-transform: capitalize;
		display: inline-block;
		width: fit-content;
	}

	.assignee, .resolver-group, .created-by {
		font-weight: 500;
		color: var(--text-primary);
	}

	.tags-section {
		margin-top: 1rem;
	}

	.tags-section label {
		font-size: 0.8rem;
		font-weight: 500;
		color: var(--text-muted);
		text-transform: uppercase;
		letter-spacing: 0.5px;
		margin-bottom: 0.5rem;
		display: block;
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
		border: 1px solid var(--accent-yellow);
	}

	.description-section, .content-section {
		margin-bottom: 2rem;
	}

	.description-section h3, .content-section h3 {
		font-size: 1.1rem;
		font-weight: 600;
		color: var(--text-primary);
		margin: 0 0 1rem 0;
	}

	.description {
		font-size: 1rem;
		color: var(--text-primary);
		line-height: 1.6;
		margin: 0;
	}

	.content-body {
		font-size: 0.95rem;
		color: var(--text-primary);
		line-height: 1.7;
	}

	.content-body h1, .content-body h2, .content-body h3 {
		margin-top: 1.5rem;
		margin-bottom: 0.75rem;
		color: var(--text-primary);
	}

	.content-body h1 { font-size: 1.5rem; }
	.content-body h2 { font-size: 1.25rem; }
	.content-body h3 { font-size: 1.1rem; }

	.content-body p {
		margin-bottom: 1rem;
	}

	.content-body code {
		background: var(--bg-secondary);
		padding: 0.125rem 0.25rem;
		border-radius: 3px;
		font-family: 'Monaco', 'Menlo', monospace;
		font-size: 0.875rem;
	}

	.content-body pre {
		background: var(--bg-secondary);
		padding: 1rem;
		border-radius: 6px;
		overflow-x: auto;
		margin: 1rem 0;
	}

	.content-body pre code {
		background: none;
		padding: 0;
	}

	.content-body ul, .content-body ol {
		margin: 1rem 0;
		padding-left: 1.5rem;
	}

	.content-body li {
		margin-bottom: 0.25rem;
	}

	.content-body a {
		color: var(--accent-primary);
		text-decoration: none;
	}

	.content-body a:hover {
		text-decoration: underline;
	}

	.correspondence-header {
		padding: 1.5rem;
		border-bottom: 1px solid var(--border-primary);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.correspondence-header h3 {
		margin: 0;
		font-size: 1.1rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.new-message-form {
		padding: 1.5rem;
		border-bottom: 1px solid var(--border-primary);
		background: var(--bg-secondary);
	}

	.form-row {
		display: flex;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.form-row .form-group {
		flex: 1;
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

	.form-actions {
		display: flex;
		justify-content: flex-end;
	}

	.messages-list {
		flex: 1;
		padding: 1.5rem;
	}

	.message-card {
		background: var(--bg-secondary);
		border-radius: 8px;
		padding: 1rem;
		margin-bottom: 1rem;
		border-left: 4px solid var(--accent-primary);
	}

	.message-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.75rem;
	}

	.message-meta {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.message-type {
		padding: 0.25rem 0.5rem;
		border-radius: 12px;
		font-size: 0.75rem;
		font-weight: 500;
		text-transform: capitalize;
	}

	.message-type.internal {
		background: #f3e5f5;
		color: #7b1fa2;
	}

	.message-type.email {
		background: #e3f2fd;
		color: #1976d2;
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
		color: var(--text-muted);
	}

	.delete-btn {
		background: none;
		border: none;
		cursor: pointer;
		font-size: 0.875rem;
		opacity: 0.6;
		transition: opacity 0.2s;
	}

	.delete-btn:hover {
		opacity: 1;
	}

	.message-subject {
		margin: 0 0 0.5rem 0;
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.message-participants {
		display: flex;
		gap: 1rem;
		font-size: 0.8rem;
		color: var(--text-muted);
		margin-bottom: 0.75rem;
	}

	.message-content {
		font-size: 0.9rem;
		color: var(--text-primary);
		line-height: 1.5;
		white-space: pre-wrap;
	}

	.empty-messages {
		text-align: center;
		padding: 2rem;
		color: var(--text-muted);
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
		background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
		color: white;
		box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
	}

	.btn-primary:hover {
		background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
		box-shadow: 0 8px 20px rgba(245, 158, 11, 0.4);
	}

	.btn-secondary {
		background: linear-gradient(135deg, #64748b 0%, #475569 100%);
		color: white;
		box-shadow: 0 4px 12px rgba(100, 116, 139, 0.3);
	}

	.btn-secondary:hover {
		background: linear-gradient(135deg, #475569 0%, #334155 100%);
		box-shadow: 0 8px 20px rgba(100, 116, 139, 0.4);
	}

	.btn-danger {
		background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
		color: white;
		box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
	}

	.btn-danger:hover {
		background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
		box-shadow: 0 8px 20px rgba(239, 68, 68, 0.4);
	}

	.btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	@media (max-width: 1200px) {
		.ticket-content {
			flex-direction: column;
			gap: 1rem;
		}

		.correspondence-section {
			width: 100%;
			min-width: auto;
		}

		.info-grid {
			grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
		}
	}

	@media (max-width: 768px) {
		.ticket-header {
			padding: 1rem;
			flex-direction: column;
			gap: 1rem;
			align-items: stretch;
		}

		.header-right {
			justify-content: space-between;
		}

		.ticket-content {
			padding: 1rem;
			gap: 1rem;
		}

		.main-content {
			padding: 1rem;
		}

		.correspondence-section {
			padding: 0;
		}

		.info-grid {
			grid-template-columns: 1fr;
			gap: 0.75rem;
		}

		.form-row {
			flex-direction: column;
		}

		.ticket-meta {
			flex-direction: column;
			gap: 0.5rem;
		}
	}
</style>

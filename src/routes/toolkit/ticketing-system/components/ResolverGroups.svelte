<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Writable } from 'svelte/store';

	interface ResolverGroup {
		id: string;
		name: string;
		description: string;
		members: string[];
		lead: string;
		createdAt: Date;
	}

	export let resolverGroups: Writable<ResolverGroup[]>;

	const dispatch = createEventDispatcher();

	let editingGroup: ResolverGroup | null = null;
	let isCreating = false;
	let newMember = '';

	function createNewGroup() {
		isCreating = true;
		editingGroup = {
			id: `group-${Date.now().toString().slice(-6)}`,
			name: '',
			description: '',
			members: [],
			lead: '',
			createdAt: new Date()
		};
	}

	function editGroup(group: ResolverGroup) {
		isCreating = false;
		editingGroup = { ...group };
	}

	function deleteGroup(groupId: string) {
		if (confirm('Are you sure you want to delete this resolver group?')) {
			dispatch('delete', groupId);
		}
	}

	function saveGroup() {
		if (editingGroup) {
			dispatch('save', editingGroup);
			editingGroup = null;
			isCreating = false;
		}
	}

	function cancelEdit() {
		editingGroup = null;
		isCreating = false;
	}

	function addMember() {
		if (newMember.trim() && editingGroup && !editingGroup.members.includes(newMember.trim())) {
			editingGroup.members = [...editingGroup.members, newMember.trim()];
			newMember = '';
		}
	}

	function removeMember(member: string) {
		if (editingGroup) {
			editingGroup.members = editingGroup.members.filter(m => m !== member);
		}
	}

	function formatDate(date: Date): string {
		return new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		}).format(date);
	}

	function getMemberName(email: string): string {
		return email.split('@')[0].replace('.', ' ');
	}
</script>

<div class="resolver-groups">
	<div class="groups-header">
		<div class="header-left">
			<h2>Resolver Groups ({$resolverGroups.length})</h2>
			<p class="description">Manage teams and groups that handle ticket resolution</p>
		</div>
		<div class="header-right">
			<button class="btn btn-primary" on:click={createNewGroup}>
				+ Create Group
			</button>
		</div>
	</div>

	{#if editingGroup}
		<div class="edit-panel">
			<div class="edit-header">
				<h3>{isCreating ? 'Create New Resolver Group' : 'Edit Resolver Group'}</h3>
			</div>
			<div class="edit-content">
				<div class="form-group">
					<label for="groupName">Group Name *</label>
					<input 
						id="groupName"
						type="text" 
						bind:value={editingGroup.name}
						placeholder="Enter group name"
						class="form-input"
					/>
				</div>

				<div class="form-group">
					<label for="groupDescription">Description</label>
					<textarea 
						id="groupDescription"
						bind:value={editingGroup.description}
						placeholder="Describe what this group handles"
						class="form-textarea"
						rows="3"
					></textarea>
				</div>

				<div class="form-group">
					<label for="groupLead">Team Lead *</label>
					<input 
						id="groupLead"
						type="email" 
						bind:value={editingGroup.lead}
						placeholder="lead@company.com"
						class="form-input"
					/>
				</div>

				<div class="form-group">
					<label for="groupMembers">Team Members</label>
					<div class="members-input">
						<input 
							id="groupMembers"
							type="email" 
							bind:value={newMember}
							placeholder="member@company.com"
							class="form-input"
							on:keydown={(e) => e.key === 'Enter' && addMember()}
						/>
						<button class="btn btn-sm" on:click={addMember} disabled={!newMember.trim()}>
							Add
						</button>
					</div>
					<div class="members-list">
						{#each editingGroup.members as member}
							<span class="member-tag">
								{getMemberName(member)}
								<button class="member-remove" on:click={() => removeMember(member)}>×</button>
							</span>
						{/each}
					</div>
				</div>

				<div class="edit-actions">
					<button class="btn btn-secondary" on:click={cancelEdit}>Cancel</button>
					<button class="btn btn-primary" on:click={saveGroup} disabled={!editingGroup.name || !editingGroup.lead}>
						{isCreating ? 'Create Group' : 'Save Changes'}
					</button>
				</div>
			</div>
		</div>
	{:else}
		<div class="groups-grid">
			{#each $resolverGroups as group (group.id)}
				<div class="group-card">
					<div class="group-header">
						<div class="group-info">
							<h3 class="group-name">{group.name}</h3>
							<p class="group-description">{group.description}</p>
						</div>
						<div class="group-actions">
							<button class="action-btn edit-btn" on:click={() => editGroup(group)}>
								✏️
							</button>
							<button class="action-btn delete-btn" on:click={() => deleteGroup(group.id)}>
								🗑️
							</button>
						</div>
					</div>
					
					<div class="group-details">
						<div class="detail-item">
							<span class="detail-label">Lead:</span>
							<span class="detail-value">{getMemberName(group.lead)}</span>
						</div>
						<div class="detail-item">
							<span class="detail-label">Members:</span>
							<span class="detail-value">{group.members.length}</span>
						</div>
						<div class="detail-item">
							<span class="detail-label">Created:</span>
							<span class="detail-value">{formatDate(group.createdAt)}</span>
						</div>
					</div>

					{#if group.members.length > 0}
						<div class="members-preview">
							<div class="members-label">Team Members:</div>
							<div class="members-tags">
								{#each group.members.slice(0, 3) as member}
									<span class="member-preview">{getMemberName(member)}</span>
								{/each}
								{#if group.members.length > 3}
									<span class="member-more">+{group.members.length - 3} more</span>
								{/if}
							</div>
						</div>
					{/if}
				</div>
			{:else}
				<div class="empty-state">
					<div class="empty-content">
						<div class="empty-icon">👥</div>
						<h3>No resolver groups</h3>
						<p>Create your first resolver group to start organizing your team.</p>
						<button class="btn btn-primary" on:click={createNewGroup}>
							Create First Group
						</button>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.resolver-groups {
		padding: 2rem 0;
	}

	.groups-header {
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

	.form-input, .form-textarea {
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

	.form-input:focus, .form-textarea:focus {
		outline: none;
		border-color: var(--accent-primary);
		box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
	}

	.form-textarea {
		resize: vertical;
		min-height: 80px;
	}

	.members-input {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 0.5rem;
	}

	.members-input .form-input {
		flex: 1;
	}

	.members-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.member-tag {
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

	.member-remove {
		background: none;
		border: none;
		color: var(--text-inverse);
		cursor: pointer;
		font-size: 1rem;
		padding: 0;
		line-height: 1;
	}

	.member-remove:hover {
		color: var(--accent-red);
	}

	.edit-actions {
		display: flex;
		gap: 1rem;
		justify-content: flex-end;
		margin-top: 2rem;
		padding-top: 1rem;
		border-top: 1px solid var(--border-primary);
	}

	.groups-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		gap: 1.5rem;
	}

	.group-card {
		background: var(--bg-card);
		border-radius: 8px;
		padding: 1.5rem;
		box-shadow: var(--shadow-sm);
		transition: transform 0.2s, box-shadow 0.2s;
		border: 1px solid var(--border-primary);
	}

	.group-card:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow-md);
	}

	.group-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 1rem;
	}

	.group-name {
		margin: 0 0 0.5rem 0;
		font-size: 1.1rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.group-description {
		margin: 0;
		font-size: 0.9rem;
		color: var(--text-muted);
		line-height: 1.4;
	}

	.group-actions {
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

	.group-details {
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

	.members-preview {
		border-top: 1px solid var(--border-primary);
		padding-top: 1rem;
	}

	.members-label {
		font-size: 0.8rem;
		color: var(--text-muted);
		font-weight: 500;
		margin-bottom: 0.5rem;
	}

	.members-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem;
	}

	.member-preview {
		background: var(--bg-secondary);
		color: var(--text-primary);
		padding: 0.125rem 0.375rem;
		border-radius: 8px;
		font-size: 0.75rem;
	}

	.member-more {
		background: var(--bg-tertiary);
		color: var(--text-muted);
		padding: 0.125rem 0.375rem;
		border-radius: 8px;
		font-size: 0.75rem;
		font-style: italic;
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

	.btn-sm {
		padding: 0.5rem 1rem;
		font-size: 0.8rem;
	}

	.btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	@media (max-width: 768px) {
		.groups-header {
			flex-direction: column;
			gap: 1rem;
			align-items: stretch;
		}

		.groups-grid {
			grid-template-columns: 1fr;
		}

		.edit-actions {
			flex-direction: column;
		}
	}
</style>

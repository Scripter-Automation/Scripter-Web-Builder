<script lang="ts">
	import { writable } from 'svelte/store';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import TicketList from './components/TicketList.svelte';
	import TicketEditor from './components/TicketEditor.svelte';
	import TicketView from './components/TicketView.svelte';
	import ResolverGroups from './components/ResolverGroups.svelte';
	import Templates from './components/Templates.svelte';

	// Store for tickets (in-memory for now)
	export const tickets = writable([
		{
			id: 'TICK-001',
			title: 'Website Performance Issues',
			description: 'Users are experiencing slow loading times on the homepage',
			content: '# Website Performance Issues\n\n## Problem Description\nUsers are experiencing slow loading times on the homepage, particularly on mobile devices.\n\n## Steps to Reproduce\n1. Visit the homepage on a mobile device\n2. Notice slow loading times\n3. Check network tab for bottlenecks\n\n## Expected Behavior\nFast loading times under 3 seconds\n\n## Actual Behavior\nLoading times of 8-10 seconds',
			status: 'open',
			priority: 'high',
			category: 'performance',
			assignee: 'john.doe@company.com',
			resolverGroup: 'frontend-team',
			createdBy: 'user@company.com',
			createdAt: new Date('2024-01-15T10:30:00'),
			updatedAt: new Date('2024-01-15T14:20:00'),
			tags: ['performance', 'mobile', 'frontend']
		},
		{
			id: 'TICK-002',
			template: 'bug-report',
			title: 'Login Form Validation Error',
			description: 'Login form shows incorrect validation messages',
			content: '# Login Form Validation Error\n\n## Bug Report\n\n### Environment\n- Browser: Chrome 120.0.6099.109\n- OS: Windows 11\n- URL: /login\n\n### Steps to Reproduce\n1. Go to login page\n2. Enter invalid email format\n3. Submit form\n\n### Expected Result\nClear validation message about email format\n\n### Actual Result\nGeneric "Invalid input" message',
			status: 'in-progress',
			priority: 'medium',
			category: 'bug',
			assignee: 'jane.smith@company.com',
			resolverGroup: 'qa-team',
			createdBy: 'customer@example.com',
			createdAt: new Date('2024-01-14T09:15:00'),
			updatedAt: new Date('2024-01-15T11:45:00'),
			tags: ['bug', 'validation', 'login']
		},
		{
			id: 'TICK-003',
			title: 'Feature Request: Dark Mode',
			description: 'Add dark mode support to the application',
			content: '# Feature Request: Dark Mode\n\n## Overview\nUsers have requested a dark mode option for the application.\n\n## Benefits\n- Better user experience in low-light environments\n- Reduced eye strain\n- Modern UI expectation\n\n## Implementation Suggestions\n- CSS custom properties for theming\n- User preference detection\n- Toggle in settings menu\n\n## Priority\nMedium - Nice to have feature',
			status: 'pending',
			priority: 'low',
			category: 'feature-request',
			assignee: 'design-team@company.com',
			resolverGroup: 'design-team',
			createdBy: 'user@company.com',
			createdAt: new Date('2024-01-13T16:00:00'),
			updatedAt: new Date('2024-01-13T16:00:00'),
			tags: ['feature', 'ui', 'dark-mode']
		}
	]);

	// Store for resolver groups
	export const resolverGroups = writable([
		{
			id: 'frontend-team',
			name: 'Frontend Team',
			description: 'Handles frontend development and UI issues',
			members: ['john.doe@company.com', 'jane.smith@company.com'],
			lead: 'john.doe@company.com',
			createdAt: new Date('2024-01-01')
		},
		{
			id: 'backend-team',
			name: 'Backend Team',
			description: 'Handles backend development and API issues',
			members: ['mike.johnson@company.com', 'sarah.wilson@company.com'],
			lead: 'mike.johnson@company.com',
			createdAt: new Date('2024-01-01')
		},
		{
			id: 'qa-team',
			name: 'QA Team',
			description: 'Quality assurance and testing',
			members: ['jane.smith@company.com', 'alex.chen@company.com'],
			lead: 'jane.smith@company.com',
			createdAt: new Date('2024-01-01')
		},
		{
			id: 'design-team',
			name: 'Design Team',
			description: 'UI/UX design and user experience',
			members: ['emma.davis@company.com', 'chris.lee@company.com'],
			lead: 'emma.davis@company.com',
			createdAt: new Date('2024-01-01')
		}
	]);

	// Store for templates
	export const templates = writable([
		{
			id: 'bug-report',
			name: 'Bug Report',
			description: 'Standard template for reporting bugs',
			content: `# Bug Report

## Environment
- Browser: 
- OS: 
- URL: 

## Steps to Reproduce
1. 
2. 
3. 

## Expected Result


## Actual Result


## Additional Information
- Screenshots: 
- Console errors: 
- Network issues: `,
			category: 'bug',
			createdAt: new Date('2024-01-01')
		},
		{
			id: 'feature-request',
			name: 'Feature Request',
			description: 'Template for requesting new features',
			content: `# Feature Request

## Overview


## Benefits


## Implementation Suggestions


## Priority
- [ ] High
- [ ] Medium
- [ ] Low

## Additional Context`,
			category: 'feature-request',
			createdAt: new Date('2024-01-01')
		},
		{
			id: 'support-request',
			name: 'Support Request',
			description: 'Template for general support requests',
			content: `# Support Request

## Issue Description


## What I've Tried


## Expected Outcome


## Contact Information
- Email: 
- Phone: 
- Preferred contact method: `,
			category: 'support',
			createdAt: new Date('2024-01-01')
		}
	]);

	// Store for correspondence
	export const correspondence = writable([
		{
			id: 'CORR-001',
			ticketId: 'TICK-001',
			from: 'john.doe@company.com',
			to: 'user@company.com',
			subject: 'Re: Website Performance Issues',
			content: 'I\'ve identified the performance bottleneck. The issue is with the image optimization. I\'ll have a fix ready by tomorrow.',
			type: 'email',
			createdAt: new Date('2024-01-15T15:30:00'),
			attachments: []
		},
		{
			id: 'CORR-002',
			ticketId: 'TICK-002',
			from: 'jane.smith@company.com',
			to: 'customer@example.com',
			subject: 'Re: Login Form Validation Error',
			content: 'Thank you for reporting this issue. I\'ve reproduced the problem and am working on a fix. This should be resolved in the next release.',
			type: 'email',
			createdAt: new Date('2024-01-15T12:00:00'),
			attachments: []
		}
	]);

	let currentView: 'tickets' | 'editor' | 'view' | 'resolver-groups' | 'templates' = 'tickets';
	let editingTicket: any = null;
	let viewingTicket: any = null;
	let isCreating = false;

	// Ticket categories
	const ticketCategories = [
		{ id: 'bug', name: 'Bug Report', color: '#dc3545' },
		{ id: 'feature-request', name: 'Feature Request', color: '#28a745' },
		{ id: 'support', name: 'Support Request', color: '#17a2b8' },
		{ id: 'performance', name: 'Performance Issue', color: '#ffc107' },
		{ id: 'security', name: 'Security Issue', color: '#6f42c1' },
		{ id: 'documentation', name: 'Documentation', color: '#6c757d' }
	];

	// Ticket priorities
	const ticketPriorities = [
		{ id: 'low', name: 'Low', color: '#28a745' },
		{ id: 'medium', name: 'Medium', color: '#ffc107' },
		{ id: 'high', name: 'High', color: '#fd7e14' },
		{ id: 'critical', name: 'Critical', color: '#dc3545' }
	];

	// Ticket statuses
	const ticketStatuses = [
		{ id: 'open', name: 'Open', color: '#17a2b8' },
		{ id: 'in-progress', name: 'In Progress', color: '#ffc107' },
		{ id: 'pending', name: 'Pending', color: '#6c757d' },
		{ id: 'resolved', name: 'Resolved', color: '#28a745' },
		{ id: 'closed', name: 'Closed', color: '#6c757d' }
	];

	function createNewTicket() {
		isCreating = true;
		editingTicket = {
			id: `TICK-${Date.now().toString().slice(-6)}`,
			title: '',
			description: '',
			content: '',
			status: 'open',
			priority: 'medium',
			category: 'bug',
			assignee: '',
			resolverGroup: '',
			createdBy: 'current-user@company.com',
			createdAt: new Date(),
			updatedAt: new Date(),
			tags: []
		};
		currentView = 'editor';
	}

	function editTicket(ticket: any) {
		isCreating = false;
		editingTicket = { ...ticket };
		currentView = 'editor';
	}

	function deleteTicket(ticketId: string) {
		tickets.update(ticketsList => 
			ticketsList.filter(ticket => ticket.id !== ticketId)
		);
	}

	function saveTicket(ticket: any) {
		if (isCreating) {
			tickets.update(ticketsList => [...ticketsList, ticket]);
		} else {
			tickets.update(ticketsList => 
				ticketsList.map(t => t.id === ticket.id ? { ...ticket, updatedAt: new Date() } : t)
			);
		}
		currentView = 'tickets';
		editingTicket = null;
		isCreating = false;
	}

	function cancelEdit() {
		currentView = 'tickets';
		editingTicket = null;
		isCreating = false;
	}

	function viewTicket(ticket: any) {
		viewingTicket = ticket;
		currentView = 'view';
	}

	function getCategoryColor(categoryId: string): string {
		const category = ticketCategories.find(c => c.id === categoryId);
		return category ? category.color : '#6c757d';
	}

	function getPriorityColor(priorityId: string): string {
		const priority = ticketPriorities.find(p => p.id === priorityId);
		return priority ? priority.color : '#6c757d';
	}

	function getStatusColor(statusId: string): string {
		const status = ticketStatuses.find(s => s.id === statusId);
		return status ? status.color : '#6c757d';
	}
</script>

<svelte:head>
	<title>Ticketing System - Scripter DevKit</title>
	<style>
		:global(body) {
			margin: 0;
			padding: 0;
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		}
	</style>
</svelte:head>

<div class="ticketing-system">
	<header class="header">
		<div class="header-content">
			<div class="header-left">
				<button class="back-btn" on:click={() => currentView = 'tickets'} class:hidden={currentView === 'tickets'}>
					← Back to Tickets
				</button>
				<h1 class="title">
					{currentView === 'tickets' ? 'Ticketing System' : 
					 currentView === 'view' ? 'View Ticket' :
					 currentView === 'editor' ? (isCreating ? 'Create New Ticket' : 'Edit Ticket') :
					 currentView === 'resolver-groups' ? 'Resolver Groups' :
					 currentView === 'templates' ? 'Templates' :
					 'Ticketing System'}
				</h1>
			</div>
			<div class="header-right">
				{#if currentView === 'tickets'}
					<button class="create-btn" on:click={createNewTicket}>
						+ Create Ticket
					</button>
				{/if}
				<div class="theme-toggle-container">
					<ThemeToggle />
				</div>
			</div>
		</div>
	</header>

	<nav class="navigation">
		<div class="nav-content">
			<button 
				class="nav-btn {currentView === 'tickets' ? 'active' : ''}" 
				on:click={() => currentView = 'tickets'}
			>
				📋 Tickets
			</button>
			<button 
				class="nav-btn {currentView === 'resolver-groups' ? 'active' : ''}" 
				on:click={() => currentView = 'resolver-groups'}
			>
				👥 Resolver Groups
			</button>
			<button 
				class="nav-btn {currentView === 'templates' ? 'active' : ''}" 
				on:click={() => currentView = 'templates'}
			>
				📝 Templates
			</button>

		</div>
	</nav>

	<main class="main-content">
		{#if currentView === 'tickets'}
			<TicketList 
				{tickets}
				{resolverGroups}
				{ticketCategories}
				{ticketPriorities}
				{ticketStatuses}
				{getCategoryColor}
				{getPriorityColor}
				{getStatusColor}
				on:edit={({ detail }) => editTicket(detail)}
				on:delete={({ detail }) => deleteTicket(detail)}
				on:select={({ detail }) => viewTicket(detail)}
			/>
		{:else if currentView === 'view'}
			<TicketView 
				ticket={viewingTicket}
				{correspondence}
				{resolverGroups}
				{ticketCategories}
				{ticketPriorities}
				{ticketStatuses}
				{getCategoryColor}
				{getPriorityColor}
				{getStatusColor}
				on:back={() => currentView = 'tickets'}
				on:edit={({ detail }) => editTicket(detail)}
				on:delete={({ detail }) => deleteTicket(detail)}
				on:addMessage={({ detail }) => {
					correspondence.update(msgs => [...msgs, detail]);
				}}
				on:deleteMessage={({ detail }) => {
					correspondence.update(msgs => 
						msgs.filter(m => m.id !== detail)
					);
				}}
			/>
		{:else if currentView === 'editor'}
			<TicketEditor 
				ticket={editingTicket}
				{isCreating}
				{resolverGroups}
				{templates}
				{ticketCategories}
				{ticketPriorities}
				{ticketStatuses}
				on:save={({ detail }) => saveTicket(detail)}
				on:cancel={cancelEdit}
			/>
		{:else if currentView === 'resolver-groups'}
			<ResolverGroups 
				{resolverGroups}
				on:save={({ detail }) => {
					resolverGroups.update(groups => 
						groups.map(g => g.id === detail.id ? detail : g)
					);
				}}
				on:delete={({ detail }) => {
					resolverGroups.update(groups => 
						groups.filter(g => g.id !== detail)
					);
				}}
			/>
		{:else if currentView === 'templates'}
			<Templates 
				{templates}
				on:save={({ detail }) => {
					templates.update(tmpls => 
						tmpls.map(t => t.id === detail.id ? detail : t)
					);
				}}
				on:delete={({ detail }) => {
					templates.update(tmpls => 
						tmpls.filter(t => t.id !== detail)
					);
				}}
			/>
		{/if}
	</main>
</div>

<style>
	.ticketing-system {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		background: var(--gradient-bg);
	}

	.header {
		background: var(--bg-header);
		color: var(--text-inverse);
		padding: 1rem 2rem;
		box-shadow: var(--shadow-lg);
		position: relative;
		z-index: 10;
	}

	.header-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: 1400px;
		margin: 0 auto;
	}

	.header-left {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.header-right {
		display: flex;
		gap: 1rem;
		align-items: center;
		flex-shrink: 0;
	}

	.back-btn {
		background: none;
		border: none;
		color: #ffffff;
		font-size: 0.9rem;
		cursor: pointer;
		padding: 0.5rem;
		border-radius: 4px;
		transition: all 0.2s;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
	}

	.back-btn:hover {
		background: rgba(255, 255, 255, 0.15);
		color: var(--text-inverse);
		transform: translateX(-2px);
	}

	.back-btn.hidden {
		display: none;
	}

	.title {
		margin: 0;
		font-size: 1.5rem;
		font-weight: 600;
		color: #ffffff;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
		white-space: nowrap;
	}

	.create-btn {
		background: var(--gradient-yellow);
		color: var(--text-inverse);
		border: none;
		padding: 0.75rem 1.5rem;
		border-radius: 8px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: var(--shadow-yellow);
	}

	.create-btn:hover {
		background: var(--gradient-yellow);
		transform: translateY(-2px);
		box-shadow: var(--shadow-yellow-hover);
		filter: brightness(1.1);
	}

	.navigation {
		background: var(--bg-card);
		border-bottom: 1px solid var(--border-primary);
		padding: 0 2rem;
		box-shadow: var(--shadow-sm);
	}

	.nav-content {
		display: flex;
		gap: 0.5rem;
		max-width: 1400px;
		margin: 0 auto;
	}

	.nav-btn {
		background: none;
		border: none;
		padding: 1rem 1.5rem;
		font-size: 0.9rem;
		font-weight: 500;
		color: var(--text-secondary);
		cursor: pointer;
		transition: all 0.2s;
		border-bottom: 3px solid transparent;
		position: relative;
	}

	.nav-btn:hover {
		color: var(--text-primary);
		background: var(--bg-secondary);
	}

	.nav-btn.active {
		color: var(--accent-yellow);
		border-bottom-color: var(--accent-yellow);
		font-weight: 600;
	}

	.theme-toggle-container {
		margin-left: 1rem;
		display: flex;
		align-items: center;
		height: fit-content;
		flex-shrink: 0;
	}

	.main-content {
		flex: 1;
		max-width: 1400px;
		margin: 0 auto;
		width: 100%;
		padding: 0 1rem;
		box-sizing: border-box;
	}

	@media (max-width: 768px) {
		.header {
			padding: 1rem;
		}

		.header-content {
			flex-direction: column;
			gap: 1rem;
			align-items: flex-start;
		}

		.navigation {
			padding: 0 1rem;
		}

		.nav-content {
			overflow-x: auto;
			padding-bottom: 0.5rem;
		}

		.main-content {
			padding: 0 1rem;
		}
	}
</style>

<script lang="ts">
	import { writable } from 'svelte/store';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';

	// Sample SOPs data
	const sampleSOPs = writable([
		{
			id: 'sop-001',
			title: 'Code Review Process',
			content: `# Code Review Process

## Purpose
This SOP outlines the standard process for conducting code reviews to ensure code quality, maintainability, and adherence to coding standards.

## Scope
This procedure applies to all code changes submitted for review across all projects and repositories.

## Responsibilities
- **Developers**: Submit code for review and address feedback
- **Reviewers**: Conduct thorough code reviews and provide constructive feedback
- **Team Leads**: Ensure review process is followed and quality standards are met

## Procedure

### Step 1: Code Submission
1. Create a pull request with descriptive title and description
2. Include relevant issue numbers and context
3. Ensure all automated tests pass
4. Self-review your code before submission

### Step 2: Review Assignment
1. Assign appropriate reviewers based on code changes
2. Include at least one senior developer for complex changes
3. Set review deadline (typically 2-3 business days)

### Step 3: Code Review
1. Review code for:
   - Functionality and logic
   - Code style and formatting
   - Performance considerations
   - Security implications
   - Test coverage

### Step 4: Feedback and Iteration
1. Provide specific, actionable feedback
2. Use inline comments for detailed explanations
3. Request changes or approve with suggestions
4. Iterate on feedback until approval

## References
- Git workflow documentation
- Coding standards guide
- Security review checklist`,
			updatedAt: new Date('2024-01-20'),
			author: 'John Doe',
			tags: ['development', 'process', 'quality']
		},
		{
			id: 'sop-002',
			title: 'Deployment Process',
			content: `# Deployment Process

## Overview
This document describes the standard deployment process for our applications to ensure reliable and consistent deployments.

## Pre-Deployment Checklist
1. All tests pass in CI/CD pipeline
2. Code review completed and approved
3. Security scan completed
4. Performance testing completed
5. Documentation updated

## Deployment Steps
1. **Staging Deployment**
   - Deploy to staging environment
   - Run smoke tests
   - Verify functionality

2. **Production Deployment**
   - Create deployment ticket
   - Notify stakeholders
   - Execute deployment during maintenance window
   - Monitor application health

3. **Post-Deployment**
   - Verify all services are running
   - Check application logs
   - Monitor error rates
   - Update deployment status

## Rollback Procedure
1. Identify the issue
2. Assess impact
3. Execute rollback plan
4. Notify stakeholders
5. Document incident

## References
- CI/CD pipeline documentation
- Monitoring tools guide
- Incident response procedures`,
			updatedAt: new Date('2024-01-15'),
			author: 'Jane Smith',
			tags: ['deployment', 'devops', 'process']
		},
		{
			id: 'sop-003',
			title: 'Security Incident Response',
			content: `# Security Incident Response

## Purpose
This SOP provides guidelines for responding to security incidents in a timely and effective manner.

## Incident Classification
- **Low**: Minor security issues with no immediate threat
- **Medium**: Security issues with potential impact
- **High**: Critical security incidents requiring immediate response
- **Critical**: Severe security breaches affecting multiple systems

## Response Procedure

### Phase 1: Detection and Assessment
1. Identify and document the incident
2. Assess severity and potential impact
3. Notify security team lead
4. Begin incident documentation

### Phase 2: Containment
1. Isolate affected systems
2. Preserve evidence
3. Implement temporary fixes
4. Monitor for further activity

### Phase 3: Eradication
1. Identify root cause
2. Remove threat from environment
3. Patch vulnerabilities
4. Update security controls

### Phase 4: Recovery
1. Restore systems from clean backups
2. Verify system integrity
3. Monitor for recurrence
4. Update incident documentation

### Phase 5: Lessons Learned
1. Conduct post-incident review
2. Update procedures and policies
3. Provide team training
4. Document lessons learned

## Communication Plan
- Internal notifications within 1 hour
- Stakeholder updates every 4 hours
- Public disclosure as required by regulations

## References
- Security policy documentation
- Legal compliance requirements
- Communication templates`,
			updatedAt: new Date('2024-01-10'),
			author: 'Mike Johnson',
			tags: ['security', 'incident-response', 'process']
		}
	]);

	let selectedContent: any = null;
	let searchQuery = '';
	let selectedTags: string[] = [];
	let isSearchFocused = false;

	// Get all unique tags for SOPs
	$: sopTags = [...new Set($sampleSOPs.flatMap(sop => sop.tags))];

	// Advanced search utilities
	function normalizeText(text: string): string {
		return text.toLowerCase()
			.replace(/[^\w\s]/g, ' ') // Remove punctuation
			.replace(/\s+/g, ' ') // Normalize whitespace
			.trim();
	}

	function tokenizeText(text: string): string[] {
		return normalizeText(text).split(' ').filter(word => word.length > 0);
	}

	function calculateLevenshteinDistance(str1: string, str2: string): number {
		const matrix = [];
		for (let i = 0; i <= str2.length; i++) {
			matrix[i] = [i];
		}
		for (let j = 0; j <= str1.length; j++) {
			matrix[0][j] = j;
		}
		for (let i = 1; i <= str2.length; i++) {
			for (let j = 1; j <= str1.length; j++) {
				if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
					matrix[i][j] = matrix[i - 1][j - 1];
				} else {
					matrix[i][j] = Math.min(
						matrix[i - 1][j - 1] + 1,
						matrix[i][j - 1] + 1,
						matrix[i - 1][j] + 1
					);
				}
			}
		}
		return matrix[str2.length][str1.length];
	}

	function calculateSimilarity(str1: string, str2: string): number {
		const distance = calculateLevenshteinDistance(str1, str2);
		const maxLength = Math.max(str1.length, str2.length);
		return maxLength === 0 ? 1 : (maxLength - distance) / maxLength;
	}

	function findBestMatch(searchTerm: string, text: string): { score: number; matches: string[] } {
		const searchTokens = tokenizeText(searchTerm);
		const textTokens = tokenizeText(text);
		let totalScore = 0;
		const matches: string[] = [];

		// Check for exact matches first
		for (const searchToken of searchTokens) {
			for (const textToken of textTokens) {
				if (textToken.includes(searchToken) || searchToken.includes(textToken)) {
					const similarity = calculateSimilarity(searchToken, textToken);
					if (similarity > 0.7) { // Threshold for fuzzy matching
						totalScore += similarity * 10;
						if (!matches.includes(textToken)) {
							matches.push(textToken);
						}
					}
				}
			}
		}

		// Check for partial matches
		for (const searchToken of searchTokens) {
			for (const textToken of textTokens) {
				if (textToken.length > 3 && searchToken.length > 3) {
					const similarity = calculateSimilarity(searchToken, textToken);
					if (similarity > 0.6) {
						totalScore += similarity * 5;
						if (!matches.includes(textToken)) {
							matches.push(textToken);
						}
					}
				}
			}
		}

		return { score: totalScore, matches };
	}

	function extractSearchContext(text: string, searchTerm: string, maxLength: number = 150): string {
		const normalizedText = normalizeText(text);
		const searchTokens = tokenizeText(searchTerm);
		let bestPosition = -1;
		let bestScore = 0;

		// Find the best position in the text that contains search terms
		for (const token of searchTokens) {
			const position = normalizedText.indexOf(token);
			if (position !== -1) {
				const contextStart = Math.max(0, position - maxLength / 2);
				const contextEnd = Math.min(normalizedText.length, position + maxLength / 2);
				const context = normalizedText.substring(contextStart, contextEnd);
				
				// Calculate how many search terms are in this context
				const score = searchTokens.filter(t => context.includes(t)).length;
				if (score > bestScore) {
					bestScore = score;
					bestPosition = position;
				}
			}
		}

		if (bestPosition !== -1) {
			const contextStart = Math.max(0, bestPosition - maxLength / 2);
			const contextEnd = Math.min(normalizedText.length, bestPosition + maxLength / 2);
			return normalizedText.substring(contextStart, contextEnd);
		}

		// Fallback to first occurrence of any search term
		for (const token of searchTokens) {
			const position = normalizedText.indexOf(token);
			if (position !== -1) {
				const contextStart = Math.max(0, position - maxLength / 2);
				const contextEnd = Math.min(normalizedText.length, position + maxLength / 2);
				return normalizedText.substring(contextStart, contextEnd);
			}
		}

		// If no matches found, return beginning of text
		return normalizedText.substring(0, maxLength);
	}

	// Enhanced search functionality with advanced content search
	$: filteredSOPs = $sampleSOPs
		.map(sop => {
			if (!searchQuery) {
				return { ...sop, relevanceScore: 0, searchContext: '', searchMatches: [] };
			}

			const searchLower = searchQuery.toLowerCase();
			const titleLower = sop.title.toLowerCase();
			const contentLower = sop.content.toLowerCase();
			
			let totalScore = 0;
			const searchMatches: string[] = [];

			// Title matching (highest priority)
			const titleMatch = findBestMatch(searchQuery, sop.title);
			if (titleMatch.score > 0) {
				totalScore += titleMatch.score * 100; // High weight for title matches
				searchMatches.push(...titleMatch.matches);
			}

			// Exact title match bonus
			if (titleLower === searchLower) {
				totalScore += 200;
			}

			// Content matching with advanced algorithms
			const contentMatch = findBestMatch(searchQuery, sop.content);
			if (contentMatch.score > 0) {
				totalScore += contentMatch.score * 20; // Medium weight for content matches
				searchMatches.push(...contentMatch.matches);
			}

			// Tag matching
			const tagMatches = sop.tags.filter(tag => {
				const tagMatch = findBestMatch(searchQuery, tag);
				return tagMatch.score > 0.5;
			});
			totalScore += tagMatches.length * 30;
			searchMatches.push(...tagMatches);

			// Extract search context for highlighting
			const searchContext = extractSearchContext(sop.content, searchQuery);

			return { 
				...sop, 
				relevanceScore: totalScore, 
				searchContext,
				searchMatches: [...new Set(searchMatches)] // Remove duplicates
			};
		})
		.filter(sop => {
			// Show all if no search query, otherwise filter by relevance
			if (!searchQuery) return true;
			if (sop.relevanceScore > 0) return true;
			
			// Also check tag filters
			const matchesTags = selectedTags.length === 0 || 
				selectedTags.some(tag => sop.tags.includes(tag));
			return matchesTags;
		})
		.sort((a, b) => b.relevanceScore - a.relevanceScore);

	function formatDate(date: Date): string {
		return new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		}).format(date);
	}

	function markdownToHtml(markdown: string): string {
		return markdown
			// Headers
			.replace(/^### (.*$)/gim, '<h3>$1</h3>')
			.replace(/^## (.*$)/gim, '<h2>$1</h2>')
			.replace(/^# (.*$)/gim, '<h1>$1</h1>')
			// Bold and italic
			.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
			.replace(/\*(.*?)\*/g, '<em>$1</em>')
			// Lists
			.replace(/^\d+\.\s+(.*$)/gim, '<li>$1</li>')
			.replace(/^-\s+(.*$)/gim, '<li>$1</li>')
			// Line breaks
			.replace(/\n/g, '<br>');
	}

	function highlightSearchTerms(text: string, searchQuery: string): string {
		if (!searchQuery) return text;
		
		const searchTokens = tokenizeText(searchQuery);
		let highlightedText = text;
		
		for (const token of searchTokens) {
			const regex = new RegExp(`(${token})`, 'gi');
			highlightedText = highlightedText.replace(regex, '<mark>$1</mark>');
		}
		
		return highlightedText;
	}

	function viewContent(content: any) {
		selectedContent = content;
	}

	function closeContent() {
		selectedContent = null;
	}

	function clearFilters() {
		searchQuery = '';
		selectedTags = [];
	}

	function toggleTag(tag: string) {
		if (selectedTags.includes(tag)) {
			selectedTags = selectedTags.filter(t => t !== tag);
		} else {
			selectedTags = [...selectedTags, tag];
		}
	}

	function handleSearchFocus() {
		isSearchFocused = true;
	}

	function handleSearchBlur() {
		isSearchFocused = false;
	}

	// Handle search on Enter key
	function handleSearchKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' && filteredSOPs.length > 0) {
			viewContent(filteredSOPs[0]);
		}
	}
</script>

<svelte:head>
	<title>SOPs - Scripter DevKit</title>
</svelte:head>

<div class="sops-page">
	<header class="header">
		<div class="header-content">
			<div class="header-left">
				<a href="/" class="back-btn">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M19 12H5M12 19l-7-7 7-7"/>
					</svg>
					Back to Home
				</a>
				<h1 class="title">📋 Standard Operating Procedures</h1>
			</div>
			<div class="header-right">
				<div class="header-buttons">
					<a href="/blog" class="nav-btn blog-btn">
						📝 Blog
					</a>
					<a href="/toolkit" class="nav-btn toolkit-btn">
						🛠️ Toolkit
					</a>
					<div class="theme-toggle-container">
						<ThemeToggle />
					</div>
				</div>
			</div>
		</div>
	</header>

	{#if selectedContent}
		<!-- Content Detail View -->
		<div class="content-detail">
			<div class="detail-header">
				<button class="back-to-list-btn" on:click={closeContent}>
					← Back to Search Results
				</button>
				<div class="detail-meta">
					<span class="content-type">📋 SOP</span>
					<span class="date">{formatDate(selectedContent.updatedAt)}</span>
				</div>
			</div>
			
			<div class="detail-content">
				<h1 class="detail-title">{selectedContent.title}</h1>
				<div class="detail-meta-info">
					<span class="author">by {selectedContent.author}</span>
					<div class="tags">
						{#each selectedContent.tags as tag}
							<span class="tag">{tag}</span>
						{/each}
					</div>
				</div>
				<div class="markdown-content" contenteditable="false">{@html markdownToHtml(selectedContent.content)}</div>
			</div>
		</div>
	{:else}
		<!-- Main Search Interface -->
		<main class="main-content">
			<div class="search-container">
				<div class="search-header">
					<h2>Search Standard Operating Procedures</h2>
					<p>Find the procedures you need quickly and easily. Search titles, content, and even similar terms.</p>
				</div>
				
				<div class="search-box-container">
					<div class="search-box {isSearchFocused ? 'focused' : ''}">
						<div class="search-icon">🔍</div>
						<input 
							type="text" 
							placeholder="Search SOPs (e.g., 'deployment', 'security', 'code review', 'testing')..." 
							bind:value={searchQuery}
							on:focus={handleSearchFocus}
							on:blur={handleSearchBlur}
							on:keydown={handleSearchKeydown}
							class="search-input"
						/>
						{#if searchQuery}
							<button class="clear-search-btn" on:click={() => searchQuery = ''}>
								✕
							</button>
						{/if}
					</div>
				</div>

				{#if searchQuery}
					<div class="search-stats">
						{filteredSOPs.length} result{filteredSOPs.length !== 1 ? 's' : ''} found
						{#if filteredSOPs.length > 0}
							<span class="search-info">• Advanced content search enabled</span>
						{/if}
					</div>
				{/if}

				<div class="quick-filters">
					{#each sopTags as tag}
						<button 
							class="quick-filter-btn {selectedTags.includes(tag) ? 'active' : ''}"
							on:click={() => toggleTag(tag)}
						>
							{tag}
						</button>
					{/each}
					{#if selectedTags.length > 0}
						<button class="clear-filters-btn" on:click={clearFilters}>
							Clear Filters
						</button>
					{/if}
				</div>
			</div>

			<div class="results-container">
				{#if searchQuery && filteredSOPs.length === 0}
					<div class="no-results">
						<div class="no-results-icon">🔍</div>
						<h3>No SOPs found for "{searchQuery}"</h3>
						<p>Try different keywords or browse all SOPs below</p>
						<button class="browse-all-btn" on:click={() => searchQuery = ''}>
							Browse All SOPs
						</button>
					</div>
				{:else if !searchQuery && filteredSOPs.length === 0}
					<div class="empty-state">
						<div class="empty-icon">📋</div>
						<h3>No SOPs available</h3>
						<p>Check back later for updated procedures.</p>
					</div>
				{:else}
					<div class="results-grid">
						{#each filteredSOPs as sop (sop.id)}
							<div class="result-card" on:click={() => viewContent(sop)}>
								<div class="result-header">
									<span class="result-type">📋 SOP</span>
									<span class="result-date">{formatDate(sop.updatedAt)}</span>
								</div>
								<h3 class="result-title">{sop.title}</h3>
								
								{#if searchQuery && sop.searchContext}
									<div class="search-context">
										<p class="context-text">
											{@html highlightSearchTerms(sop.searchContext, searchQuery)}
										</p>
									</div>
								{:else}
									<p class="result-excerpt">
										{sop.content.split('\n')[0].replace(/^#\s*/, '')}
									</p>
								{/if}
								
								<div class="result-meta">
									<span class="result-author">by {sop.author}</span>
									<div class="result-tags">
										{#each sop.tags as tag}
											<span class="result-tag">{tag}</span>
										{/each}
									</div>
								</div>
								
								{#if searchQuery && sop.relevanceScore > 0}
									<div class="relevance-indicator">
										Relevance: {Math.round(sop.relevanceScore / 10)}%
										{#if sop.searchMatches.length > 0}
											<span class="match-count">• {sop.searchMatches.length} match{sop.searchMatches.length !== 1 ? 'es' : ''}</span>
										{/if}
									</div>
								{/if}
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</main>
	{/if}
</div>

<style>
	.sops-page {
		min-height: 100vh;
		background: var(--gradient-bg);
	}

	.header {
		background: var(--bg-header);
		color: var(--text-inverse);
		padding: 1.5rem 2rem;
		box-shadow: var(--shadow-lg);
	}

	.header-content {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.header-left {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.back-btn {
		background: none;
		border: none;
		color: var(--text-inverse);
		cursor: pointer;
		font-size: 1rem;
		padding: 0.5rem;
		border-radius: 4px;
		transition: background-color 0.2s;
		text-decoration: none;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.back-btn:hover {
		background: rgba(255, 255, 255, 0.1);
	}

	.header-buttons {
		display: flex;
		gap: 1rem;
		align-items: center;
	}

	.nav-btn {
		background: rgba(255, 255, 255, 0.1);
		color: var(--text-inverse);
		border: 1px solid rgba(255, 255, 255, 0.2);
		padding: 0.5rem 1rem;
		border-radius: 8px;
		text-decoration: none;
		font-size: 0.9rem;
		font-weight: 500;
		transition: all 0.2s;
	}

	.nav-btn:hover {
		background: rgba(255, 255, 255, 0.2);
		border-color: rgba(255, 255, 255, 0.3);
		transform: translateY(-1px);
	}

	.blog-btn {
		background: rgba(147, 51, 234, 0.2);
		border-color: rgba(147, 51, 234, 0.3);
	}

	.blog-btn:hover {
		background: rgba(147, 51, 234, 0.3);
		border-color: rgba(147, 51, 234, 0.4);
	}

	.toolkit-btn {
		background: rgba(34, 197, 94, 0.2);
		border-color: rgba(34, 197, 94, 0.3);
	}

	.toolkit-btn:hover {
		background: rgba(34, 197, 94, 0.3);
		border-color: rgba(34, 197, 94, 0.4);
	}

	.title {
		margin: 0;
		font-size: 1.5rem;
		font-weight: 600;
	}

	.theme-toggle-container {
		display: flex;
		align-items: center;
	}

	.main-content {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
	}

	.search-container {
		text-align: center;
		margin-bottom: 3rem;
	}

	.search-header h2 {
		font-size: 2.5rem;
		margin: 0 0 0.5rem 0;
		color: var(--text-primary);
		font-weight: 700;
	}

	.search-header p {
		font-size: 1.2rem;
		color: var(--text-secondary);
		margin: 0 0 2rem 0;
	}

	.search-box-container {
		max-width: 600px;
		margin: 0 auto 2rem auto;
	}

	.search-box {
		display: flex;
		align-items: center;
		background: var(--bg-card);
		border: 2px solid var(--border-primary);
		border-radius: 50px;
		padding: 0.5rem 1.5rem;
		transition: all 0.3s ease;
		box-shadow: var(--shadow-sm);
	}

	.search-box.focused {
		border-color: var(--accent-primary);
		box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
	}

	.search-icon {
		font-size: 1.2rem;
		margin-right: 1rem;
		color: var(--text-secondary);
	}

	.search-input {
		flex: 1;
		border: none;
		background: none;
		font-size: 1.1rem;
		color: var(--text-primary);
		outline: none;
	}

	.search-input::placeholder {
		color: var(--text-secondary);
	}

	.clear-search-btn {
		background: none;
		border: none;
		color: var(--text-secondary);
		cursor: pointer;
		font-size: 1.2rem;
		padding: 0.5rem;
		border-radius: 50%;
		transition: all 0.2s;
	}

	.clear-search-btn:hover {
		background: var(--bg-tertiary);
		color: var(--text-primary);
	}

	.search-stats {
		font-size: 1rem;
		color: var(--text-secondary);
		margin-bottom: 1rem;
	}

	.search-info {
		color: var(--accent-primary);
		font-weight: 500;
	}

	.quick-filters {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		justify-content: center;
		margin-bottom: 2rem;
	}

	.quick-filter-btn {
		background: var(--bg-card);
		border: 1px solid var(--border-primary);
		padding: 0.5rem 1rem;
		border-radius: 20px;
		cursor: pointer;
		transition: all 0.2s;
		font-size: 0.9rem;
		color: var(--text-primary);
	}

	.quick-filter-btn:hover {
		background: var(--bg-tertiary);
		border-color: var(--accent-primary);
	}

	.quick-filter-btn.active {
		background: var(--accent-primary);
		color: white;
		border-color: var(--accent-primary);
	}

	.clear-filters-btn {
		background: var(--bg-secondary);
		border: 1px solid var(--border-primary);
		padding: 0.5rem 1rem;
		border-radius: 20px;
		cursor: pointer;
		transition: all 0.2s;
		font-size: 0.9rem;
		color: var(--text-primary);
	}

	.clear-filters-btn:hover {
		background: var(--bg-tertiary);
	}

	.results-container {
		max-width: 800px;
		margin: 0 auto;
	}

	.no-results {
		text-align: center;
		padding: 3rem 1rem;
	}

	.no-results-icon {
		font-size: 4rem;
		margin-bottom: 1rem;
		opacity: 0.5;
	}

	.no-results h3 {
		font-size: 1.5rem;
		margin: 0 0 0.5rem 0;
		color: var(--text-primary);
	}

	.no-results p {
		color: var(--text-secondary);
		margin: 0 0 2rem 0;
	}

	.browse-all-btn {
		background: var(--accent-primary);
		color: white;
		border: none;
		padding: 0.75rem 1.5rem;
		border-radius: 8px;
		cursor: pointer;
		font-size: 1rem;
		transition: background-color 0.2s;
	}

	.browse-all-btn:hover {
		background: var(--accent-secondary);
	}

	.empty-state {
		text-align: center;
		padding: 3rem 1rem;
	}

	.empty-icon {
		font-size: 4rem;
		margin-bottom: 1rem;
		opacity: 0.5;
	}

	.empty-state h3 {
		font-size: 1.5rem;
		margin: 0 0 0.5rem 0;
		color: var(--text-primary);
	}

	.empty-state p {
		color: var(--text-secondary);
		margin: 0;
	}

	.results-grid {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.result-card {
		background: var(--bg-card);
		border: 1px solid var(--border-primary);
		border-radius: 12px;
		padding: 1.5rem;
		cursor: pointer;
		transition: all 0.2s;
		position: relative;
	}

	.result-card:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow-lg);
		border-color: var(--accent-primary);
	}

	.result-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.5rem;
	}

	.result-type {
		background: var(--accent-primary);
		color: white;
		padding: 0.25rem 0.75rem;
		border-radius: 12px;
		font-size: 0.8rem;
		font-weight: 500;
	}

	.result-date {
		font-size: 0.8rem;
		color: var(--text-secondary);
	}

	.result-title {
		font-size: 1.3rem;
		margin: 0 0 0.75rem 0;
		color: var(--text-primary);
		font-weight: 600;
	}

	.result-excerpt {
		color: var(--text-secondary);
		line-height: 1.6;
		margin: 0 0 1rem 0;
	}

	.search-context {
		margin: 0 0 1rem 0;
		padding: 0.75rem;
		background: var(--bg-tertiary);
		border-radius: 8px;
		border-left: 3px solid var(--accent-primary);
	}

	.context-text {
		color: var(--text-secondary);
		line-height: 1.6;
		margin: 0;
		font-size: 0.9rem;
	}

	.context-text mark {
		background: rgba(59, 130, 246, 0.2);
		color: var(--text-primary);
		padding: 0.1rem 0.2rem;
		border-radius: 2px;
		font-weight: 600;
	}

	.result-meta {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.5rem;
	}

	.result-author {
		font-size: 0.9rem;
		color: var(--text-secondary);
	}

	.result-tags {
		display: flex;
		gap: 0.5rem;
	}

	.result-tag {
		background: var(--bg-tertiary);
		color: var(--text-secondary);
		padding: 0.2rem 0.5rem;
		border-radius: 8px;
		font-size: 0.7rem;
	}

	.relevance-indicator {
		position: absolute;
		top: 1rem;
		right: 1rem;
		background: var(--bg-secondary);
		color: var(--text-secondary);
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		font-size: 0.7rem;
	}

	.match-count {
		color: var(--accent-primary);
		font-weight: 500;
	}

	/* Content Detail Styles */
	.content-detail {
		max-width: 1000px;
		margin: 0 auto;
		padding: 2rem;
	}

	.detail-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--border-primary);
	}

	.back-to-list-btn {
		background: var(--bg-secondary);
		border: 1px solid var(--border-primary);
		color: var(--text-primary);
		padding: 0.5rem 1rem;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.2s;
	}

	.back-to-list-btn:hover {
		background: var(--bg-tertiary);
	}

	.detail-meta {
		display: flex;
		gap: 1rem;
		align-items: center;
	}

	.content-type {
		background: var(--accent-primary);
		color: white;
		padding: 0.25rem 0.75rem;
		border-radius: 12px;
		font-size: 0.8rem;
		font-weight: 500;
	}

	.date {
		font-size: 0.9rem;
		color: var(--text-secondary);
	}

	.detail-content {
		background: var(--bg-card);
		border: 1px solid var(--border-primary);
		border-radius: 12px;
		padding: 2rem;
	}

	.detail-title {
		font-size: 2rem;
		margin: 0 0 1rem 0;
		color: var(--text-primary);
		font-weight: 700;
	}

	.detail-meta-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--border-primary);
	}

	.author {
		font-size: 1rem;
		color: var(--text-secondary);
	}

	.tags {
		display: flex;
		gap: 0.5rem;
	}

	.tag {
		background: var(--bg-tertiary);
		color: var(--text-secondary);
		padding: 0.3rem 0.8rem;
		border-radius: 12px;
		font-size: 0.8rem;
	}

	.markdown-content {
		color: var(--text-primary);
		line-height: 1.8;
	}

	.markdown-content h1,
	.markdown-content h2,
	.markdown-content h3 {
		margin: 2rem 0 1rem 0;
		color: var(--text-primary);
	}

	.markdown-content h1 {
		font-size: 1.8rem;
		border-bottom: 2px solid var(--border-primary);
		padding-bottom: 0.5rem;
	}

	.markdown-content h2 {
		font-size: 1.5rem;
	}

	.markdown-content h3 {
		font-size: 1.2rem;
	}

	.markdown-content p {
		margin: 1rem 0;
	}

	.markdown-content li {
		margin: 0.5rem 0;
	}

	.markdown-content strong {
		color: var(--text-primary);
		font-weight: 600;
	}

	.markdown-content em {
		font-style: italic;
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.header-content {
			flex-direction: column;
			gap: 1rem;
			align-items: flex-start;
		}

		.header-left {
			width: 100%;
			justify-content: space-between;
		}

		.header-right {
			width: 100%;
		}

		.header-buttons {
			justify-content: space-between;
			width: 100%;
		}

		.nav-btn {
			font-size: 0.8rem;
			padding: 0.4rem 0.8rem;
		}

		.main-content {
			padding: 1rem;
		}

		.search-header h2 {
			font-size: 2rem;
		}

		.search-header p {
			font-size: 1rem;
		}

		.search-box {
			padding: 0.5rem 1rem;
		}

		.search-input {
			font-size: 1rem;
		}

		.results-grid {
			gap: 0.75rem;
		}

		.result-card {
			padding: 1rem;
		}

		.result-title {
			font-size: 1.1rem;
		}

		.result-meta {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.5rem;
		}

		.content-detail {
			padding: 1rem;
		}

		.detail-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
		}

		.detail-content {
			padding: 1rem;
		}

		.detail-title {
			font-size: 1.5rem;
		}

		.detail-meta-info {
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
		}
	}
</style>

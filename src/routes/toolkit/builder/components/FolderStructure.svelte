<script lang="ts">
    import FolderStructure from './FolderStructure.svelte';
    import { editorActions } from '../store';

    let { tree = {}, level = 0, currentPath = '' }: { tree: any; level?: number; currentPath?: string } = $props();

    // Track expanded state for each folder using Svelte 5 runes
    let expandedFolders = $state<string[]>([]);

    function isFolder(value: any): boolean {
        return value !== null && value !== undefined && typeof value === 'object' && Object.keys(value).length > 0;
    }

    function getFileIcon(filename: string): string {
        const ext = filename.split('.').pop()?.toLowerCase();
        switch (ext) {
            case 'svelte': return '📄';
            case 'ts': return '📘';
            case 'js': return '📗';
            case 'json': return '📋';
            case 'md': return '📝';
            case 'html': return '🌐';
            case 'css': return '🎨';
            case 'png':
            case 'jpg':
            case 'jpeg':
            case 'gif':
            case 'svg': return '🖼️';
            default: return '📄';
        }
    }

    function toggleFolder(folderName: string) {
        console.log('Toggling folder:', folderName, 'Current expanded:', expandedFolders);
        if (expandedFolders.includes(folderName)) {
            expandedFolders = expandedFolders.filter(name => name !== folderName);
        } else {
            expandedFolders = [...expandedFolders, folderName];
        }
        console.log('After toggle, expanded folders:', expandedFolders);
    }

    function isExpanded(folderName: string): boolean {
        const expanded = expandedFolders.includes(folderName);
        console.log('Checking if expanded:', folderName, expanded);
        return expanded;
    }

    function handleFileClick(filename: string) {
        console.log('File clicked:', filename);
        // Build the full file path
        const filePath = currentPath ? `${currentPath}/${filename}` : filename;
        console.log('Loading file path:', filePath);
        editorActions.openFile(filePath);
    }
</script>

<div class="folder-structure" style="--level: {level}">
    {#each Object.entries(tree) as [key, value]}
        <div class="item" class:folder={isFolder(value)} class:file={!isFolder(value)}>
            {#if isFolder(value)}
                <div class="folder-item" onclick={() => toggleFolder(key)}>
                    <span class="icon">📁</span>
                    <span class="name">{key}</span>
                    <span class="expand-icon" class:expanded={isExpanded(key)}>
                        {isExpanded(key) ? '▼' : '▶'}
                    </span>
                </div>
                {#if isExpanded(key)}
                    <div class="children">
                        <FolderStructure tree={value} level={level + 1} currentPath={currentPath ? `${currentPath}/${key}` : key} />
                    </div>
                {/if}
            {:else}
                <div class="file-item" onclick={() => handleFileClick(key)}>
                    <span class="icon">{getFileIcon(key)}</span>
                    <span class="name">{key}</span>
                </div>
            {/if}
        </div>
    {/each}
</div>

<style>
    .folder-structure {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 14px;
        line-height: 1.4;
    }

    .item {
        margin: 2px 0;
        transition: all 0.2s ease;
    }

    .folder-item, .file-item {
        display: flex;
        align-items: center;
        padding: 6px 8px;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s ease;
        margin-left: calc(var(--level) * 16px);
        border: 1px solid transparent;
    }

    .folder-item:hover, .file-item:hover {
        background-color: rgba(59, 130, 246, 0.1);
        border-color: rgba(59, 130, 246, 0.2);
        transform: translateX(2px);
    }

    .folder-item {
        background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        border: 1px solid #cbd5e1;
        font-weight: 600;
        color: #1e293b;
    }

    .file-item {
        background: linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%);
        border: 1px solid #e2e8f0;
        color: #475569;
    }

    .icon {
        margin-right: 8px;
        font-size: 16px;
        width: 20px;
        text-align: center;
    }

    .name {
        flex: 1;
        font-size: 13px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .expand-icon {
        font-size: 10px;
        color: #64748b;
        transition: transform 0.2s ease;
        width: 16px;
        text-align: center;
    }

    .expand-icon.expanded {
        transform: rotate(90deg);
    }

    .folder-item:hover .expand-icon:not(.expanded) {
        transform: rotate(45deg);
    }

    .children {
        margin-top: 2px;
        animation: slideDown 0.3s ease-out;
    }

    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
            max-height: 0;
        }
        to {
            opacity: 1;
            transform: translateY(0);
            max-height: 1000px;
        }
    }

    /* Custom scrollbar for long folder structures */
    .folder-structure::-webkit-scrollbar {
        width: 6px;
    }

    .folder-structure::-webkit-scrollbar-track {
        background: #f1f5f9;
        border-radius: 3px;
    }

    .folder-structure::-webkit-scrollbar-thumb {
        background: #cbd5e1;
        border-radius: 3px;
    }

    .folder-structure::-webkit-scrollbar-thumb:hover {
        background: #94a3b8;
    }
</style>

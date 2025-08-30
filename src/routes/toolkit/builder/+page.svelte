<script lang="ts">

    import type { PageProps } from '../builder/$types';
    import FolderStructure from './components/FolderStructure.svelte';
    import EditableRenderer from './components/EditableRenderer.svelte';
    import CssPropertiesPanel from './components/CssPropertiesPanel.svelte';
    import MonacoEditor from './components/MonacoEditor.svelte';
    import { file, editingState, editingActions, editorState } from './store';

    const files = import.meta.glob('/src/routes/**/*.svelte', { as: 'raw' });

    async function getFileContent() {
        const module = await files['/src/routes/+page.svelte']();
        console.log(module);
    }

    getFileContent();

    let { data }: PageProps = $props();

    let { tree }  = data;

    console.log($file)

    console.log(tree);
    
    // Track editor state
    let { editorType, currentFile } = $derived($editorState);
    
    // Track sidebar active tab
    let activeSidebarTab = $state('project');
    
    // Track CSS panel visibility
    let cssPanelVisible = $state(true);
    
    function setActiveTab(tab: string) {
        activeSidebarTab = tab;
    }
    
    function toggleCssPanel() {
        cssPanelVisible = !cssPanelVisible;
    }
</script>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        height: 100vh;
        display: flex;
        flex-direction: column;
    }

    nav {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem 1.5rem;
        margin: 0;
        background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
        color: white;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        border-bottom: 1px solid #475569;
    }

    .nav-brand {
        display: flex;
        align-items: center;
        gap: 12px;
        font-weight: 700;
        font-size: 18px;
    }

    .brand-icon {
        font-size: 24px;
    }

    .brand-text {
        background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    
    .design-mode-indicator {
        margin-left: 12px;
        padding: 4px 8px;
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 500;
        animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .nav-actions {
        display: flex;
        gap: 8px;
    }

    .nav-btn {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px 16px;
        background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .nav-btn:hover {
        background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .nav-btn:active {
        transform: translateY(0);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .nav-btn.active {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.3);
    }
    
    .nav-btn.active:hover {
        background: linear-gradient(135deg, #059669 0%, #047857 100%);
    }

    main {
        display: flex;
        flex: 1;
        position: relative;
        height: calc(100vh - 60px); /* Account for nav height */
    }

    section {
        display: flex;
        flex-direction: column;
    }

    .sidebar {
        width: 300px;
        background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
        border-right: 1px solid #cbd5e1;
        box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        position: relative;
        height: 100%;
    }

    .sidebar-header {
        padding: 1rem;
        background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
        color: white;
        border-bottom: 1px solid #1e40af;
        flex-shrink: 0;
    }

    .sidebar-tabs {
        display: flex;
        gap: 2px;
        width: 100%;
    }

    .tab-button {
        flex: 1;
        padding: 8px 12px;
        background: rgba(255, 255, 255, 0.1);
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .tab-button:hover {
        background: rgba(255, 255, 255, 0.2);
    }

    .tab-button.active {
        background: rgba(255, 255, 255, 0.3);
        box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.2);
    }

    .sidebar-content {
        flex: 1;
        overflow-y: auto;
        overflow-x: hidden;
    }

    .folder-container {
        padding: 1rem;
    }

    .elements-container {
        padding: 1rem;
    }

    .elements-section {
        margin-bottom: 1.5rem;
    }

    .elements-section h4 {
        margin: 0 0 0.75rem 0;
        font-size: 13px;
        font-weight: 600;
        color: #374151;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .element-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
    }

    .element-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 12px 8px;
        background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        cursor: grab;
        transition: all 0.2s ease;
        text-align: center;
    }

    .element-item:hover {
        background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
        border-color: #3b82f6;
        transform: translateY(-1px);
        box-shadow: 0 2px 8px rgba(59, 130, 246, 0.15);
    }

    .element-item:active {
        cursor: grabbing;
        transform: translateY(0);
    }

    .element-icon {
        font-size: 20px;
        margin-bottom: 4px;
        display: block;
    }

    .element-name {
        font-size: 11px;
        font-weight: 500;
        color: #475569;
        text-transform: uppercase;
        letter-spacing: 0.3px;
    }

    /* Custom scrollbar for folder container */
    .folder-container::-webkit-scrollbar {
        width: 8px;
    }

    .folder-container::-webkit-scrollbar-track {
        background: #f1f5f9;
        border-radius: 4px;
    }

    .folder-container::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, #cbd5e1 0%, #94a3b8 100%);
        border-radius: 4px;
        border: 1px solid #e2e8f0;
    }

    .folder-container::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(135deg, #94a3b8 0%, #64748b 100%);
    }

    .root-folder {
        display: flex;
        align-items: center;
        padding: 12px 16px;
        background: linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%);
        border: 2px solid #3b82f6;
        border-radius: 8px;
        margin-bottom: 1rem;
        font-weight: 700;
        color: #1e293b;
        box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
    }

    .root-icon {
        font-size: 20px;
        margin-right: 12px;
    }

    .root-name {
        font-size: 16px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    
    .content-area {
        flex: 1;
        background: #ffffff;
        position: relative;
        overflow: auto;
        height: 100%;
    }

    /* Custom scrollbar for content area */
    .content-area::-webkit-scrollbar {
        width: 8px;
    }

    .content-area::-webkit-scrollbar-track {
        background: #f1f5f9;
        border-radius: 4px;
    }

    .content-area::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, #cbd5e1 0%, #94a3b8 100%);
        border-radius: 4px;
        border: 1px solid #e2e8f0;
    }

    .content-area::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(135deg, #94a3b8 0%, #64748b 100%);
    }

    .css-panel-container {
        width: 350px;
        background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
        border-left: 1px solid #cbd5e1;
        box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        position: relative;
        height: 100%;
    }
    


</style>

<nav>
    <div class="nav-brand">
        <span class="brand-icon">🚀</span>
        <span class="brand-text">Web Builder</span>
        <span class="design-mode-indicator">🎨 Visual Editor</span>
    </div>
    <div class="nav-actions">
        <button 
            class="nav-btn" 
            class:active={cssPanelVisible}
            onclick={toggleCssPanel}
            title={cssPanelVisible ? 'Hide CSS Properties Panel' : 'Show CSS Properties Panel'}
        >
            {cssPanelVisible ? '🎨 Hide CSS Panel' : '🎨 Show CSS Panel'}
        </button>
    </div>
</nav>

    <main>
        <section class="sidebar">
            <div class="sidebar-header">
                <div class="sidebar-tabs">
                    <button 
                        class="tab-button" 
                        class:active={activeSidebarTab === 'project'}
                        onclick={() => setActiveTab('project')}
                    >
                        📁 Project
                    </button>
                    <button 
                        class="tab-button" 
                        class:active={activeSidebarTab === 'elements'}
                        onclick={() => setActiveTab('elements')}
                    >
                        🧩 Elements
                    </button>
                </div>
            </div>
            
            <div class="sidebar-content">
                {#if activeSidebarTab === 'project'}
                    <div class="folder-container">
                        <div class="root-folder">
                            <span class="root-icon">📂</span>
                            <span class="root-name">web_builder</span>
                        </div>
                        <FolderStructure {tree} currentPath="" />
                    </div>
                {:else if activeSidebarTab === 'elements'}
                    <div class="elements-container">
                        <div class="elements-section">
                            <h4>📄 Basic Elements</h4>
                            <div class="element-grid">
                                <div class="element-item" draggable="true">
                                    <span class="element-icon">📝</span>
                                    <span class="element-name">Text</span>
                                </div>
                                <div class="element-item" draggable="true">
                                    <span class="element-icon">🔗</span>
                                    <span class="element-name">Link</span>
                                </div>
                                <div class="element-item" draggable="true">
                                    <span class="element-icon">🖼️</span>
                                    <span class="element-name">Image</span>
                                </div>
                                <div class="element-item" draggable="true">
                                    <span class="element-icon">📋</span>
                                    <span class="element-name">Button</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="elements-section">
                            <h4>📦 Layout Elements</h4>
                            <div class="element-grid">
                                <div class="element-item" draggable="true">
                                    <span class="element-icon">📦</span>
                                    <span class="element-name">Container</span>
                                </div>
                                <div class="element-item" draggable="true">
                                    <span class="element-icon">📊</span>
                                    <span class="element-name">Section</span>
                                </div>
                                <div class="element-item" draggable="true">
                                    <span class="element-icon">📋</span>
                                    <span class="element-name">Div</span>
                                </div>
                                <div class="element-item" draggable="true">
                                    <span class="element-icon">📄</span>
                                    <span class="element-name">Article</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="elements-section">
                            <h4>📝 Form Elements</h4>
                            <div class="element-grid">
                                <div class="element-item" draggable="true">
                                    <span class="element-icon">📝</span>
                                    <span class="element-name">Input</span>
                                </div>
                                <div class="element-item" draggable="true">
                                    <span class="element-icon">📋</span>
                                    <span class="element-name">Textarea</span>
                                </div>
                                <div class="element-item" draggable="true">
                                    <span class="element-icon">📋</span>
                                    <span class="element-name">Select</span>
                                </div>
                                <div class="element-item" draggable="true">
                                    <span class="element-icon">☑️</span>
                                    <span class="element-name">Checkbox</span>
                                </div>
                            </div>
                        </div>
                    </div>
                {/if}
            </div>
        </section>
        <section class="content-area">
            {#if editorType === 'monaco' && currentFile}
                <MonacoEditor />
            {:else}
                <EditableRenderer component={$file} componentId="main-content" />
            {/if}
        </section>
        {#if cssPanelVisible && $editingState.currentElement}
            <section class="css-panel-container">
                <CssPropertiesPanel />
            </section>
        {/if}
    </main>
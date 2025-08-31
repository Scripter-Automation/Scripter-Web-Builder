<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    
    const dispatch = createEventDispatcher();
    
    let { 
        visible = false, 
        x = 0, 
        y = 0,
        elementId = '',
        elementType = ''
    }: {
        visible?: boolean;
        x?: number;
        y?: number;
        elementId?: string;
        elementType?: string;
    } = $props();
    
    function handleAddFunction() {
        dispatch('addFunction', { elementId, elementType });
    }
    
    function handleEditElement() {
        dispatch('editElement', { elementId, elementType });
    }
    
    function handleDeleteElement() {
        dispatch('deleteElement', { elementId, elementType });
    }
    
    function handleCopyElement() {
        dispatch('copyElement', { elementId, elementType });
    }
    
    // Close menu when clicking outside
    function handleClickOutside(event: MouseEvent) {
        if (visible) {
            dispatch('close');
        }
    }
    
    // Prevent context menu from opening again
    function handleContextMenu(event: MouseEvent) {
        event.preventDefault();
    }
</script>

{#if visible}
    <div 
        class="context-menu-overlay"
        onclick={handleClickOutside}
        oncontextmenu={handleContextMenu}
    >
        <div 
            class="context-menu"
            style="left: {x}px; top: {y}px;"
            oncontextmenu={handleContextMenu}
        >
            <div class="menu-header">
                <span class="element-type">{elementType}</span>
            </div>
            
            <div class="menu-items">
                <button class="menu-item" onclick={handleAddFunction}>
                    <span class="menu-icon">⚡</span>
                    <span class="menu-text">Add Function</span>
                </button>
                
                <button class="menu-item" onclick={handleEditElement}>
                    <span class="menu-icon">✏️</span>
                    <span class="menu-text">Edit Element</span>
                </button>
                
                <button class="menu-item" onclick={handleCopyElement}>
                    <span class="menu-icon">📋</span>
                    <span class="menu-text">Copy Element</span>
                </button>
                
                <div class="menu-separator"></div>
                
                <button class="menu-item danger" onclick={handleDeleteElement}>
                    <span class="menu-icon">🗑️</span>
                    <span class="menu-text">Delete Element</span>
                </button>
            </div>
        </div>
    </div>
{/if}

<style>
    .context-menu-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 1000;
        background: transparent;
    }
    
    .context-menu {
        position: fixed;
        background: var(--bg-card);
        border: 1px solid var(--border-primary);
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        min-width: 200px;
        z-index: 1001;
        overflow: hidden;
        animation: contextMenuFadeIn 0.15s ease-out;
    }
    
    @keyframes contextMenuFadeIn {
        from {
            opacity: 0;
            transform: scale(0.95) translateY(-5px);
        }
        to {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
    }
    
    .menu-header {
        padding: 12px 16px;
        background: var(--bg-secondary);
        border-bottom: 1px solid var(--border-primary);
    }
    
    .element-type {
        font-size: 12px;
        font-weight: 600;
        color: var(--text-secondary);
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    
    .menu-items {
        padding: 8px 0;
    }
    
    .menu-item {
        display: flex;
        align-items: center;
        gap: 12px;
        width: 100%;
        padding: 12px 16px;
        background: none;
        border: none;
        color: var(--text-primary);
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s ease;
        text-align: left;
    }
    
    .menu-item:hover {
        background: var(--bg-secondary);
    }
    
    .menu-item.danger:hover {
        background: var(--accent-red);
        color: white;
    }
    
    .menu-icon {
        font-size: 16px;
        width: 20px;
        text-align: center;
    }
    
    .menu-text {
        flex: 1;
    }
    
    .menu-separator {
        height: 1px;
        background: var(--border-primary);
        margin: 8px 0;
    }
</style>

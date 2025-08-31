<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { contextMenuActions } from '../store';
    
    const dispatch = createEventDispatcher();
    
    let { 
        element, 
        isEditing = false, 
        elementId, 
        elementType, 
        elementContent, 
        elementAttributes = {} 
    }: {
        element: HTMLElement;
        isEditing?: boolean;
        elementId: string;
        elementType: string;
        elementContent: string;
        elementAttributes?: Record<string, string>;
    } = $props();
    
    let editValue: string;
    let showEditPanel = false;
    let editPanelPosition = { x: 0, y: 0 };
    
    $effect(() => {
        if (isEditing) {
            editValue = elementContent;
        }
    });
    
    function handleElementClick(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
        
        const rect = (event.target as HTMLElement).getBoundingClientRect();
        editPanelPosition = {
            x: rect.left + rect.width / 2,
            y: rect.top - 10
        };
        
        showEditPanel = true;
        dispatch('edit', {
            elementId,
            elementType,
            elementContent,
            elementAttributes,
            position: editPanelPosition
        });
    }
    
    function handleElementRightClick(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
        
        // Show context menu at mouse position
        contextMenuActions.show(event.clientX, event.clientY, elementId, elementType);
    }
    
    function handleSave() {
        dispatch('save', {
            elementId,
            elementType,
            content: editValue,
            attributes: elementAttributes
        });
        showEditPanel = false;
    }
    
    function handleCancel() {
        showEditPanel = false;
        editValue = elementContent;
    }
    
    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Enter' && event.ctrlKey) {
            handleSave();
        } else if (event.key === 'Escape') {
            handleCancel();
        }
    }
</script>

    <div 
        class="editable-wrapper"
        class:editing={isEditing}
        onclick={handleElementClick}
        oncontextmenu={handleElementRightClick}
        onmouseenter={() => dispatch('hover', { elementId })}
        onmouseleave={() => dispatch('hover', { elementId: null })}
    >
    <slot />
    
    {#if isEditing}
        <div class="edit-indicator">
            <span class="edit-icon">✏️</span>
            <span class="edit-text">Click to edit</span>
        </div>
    {/if}
</div>

{#if showEditPanel}
    <div 
        class="edit-panel"
        style="left: {editPanelPosition.x}px; top: {editPanelPosition.y}px;"
    >
        <div class="edit-header">
            <span class="edit-title">Edit {elementType}</span>
            <button class="close-btn" onclick={handleCancel}>✕</button>
        </div>
        
        <div class="edit-content">
            <label class="edit-label">Content:</label>
            <textarea
                bind:value={editValue}
                class="edit-textarea"
                placeholder="Enter content..."
                onkeydown={handleKeydown}
                rows="3"
            ></textarea>
            
            <div class="edit-actions">
                <button class="save-btn" onclick={handleSave}>
                    💾 Save (Ctrl+Enter)
                </button>
                <button class="cancel-btn" onclick={handleCancel}>
                    ❌ Cancel (Esc)
                </button>
            </div>
        </div>
    </div>
{/if}

<style>
    .editable-wrapper {
        position: relative;
        display: inline-block;
        cursor: pointer;
        transition: all 0.2s ease;
        border: 2px solid transparent;
        border-radius: 4px;
        padding: 2px;
    }
    
    .editable-wrapper:hover {
        border-color: #3b82f6;
        background-color: rgba(59, 130, 246, 0.05);
        transform: scale(1.01);
    }
    
    .editable-wrapper.editing {
        border-color: #10b981;
        background-color: rgba(16, 185, 129, 0.1);
        box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.3);
    }
    
    .edit-indicator {
        position: absolute;
        top: -25px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 4px;
        opacity: 0;
        transition: opacity 0.2s ease;
        pointer-events: none;
        white-space: nowrap;
        z-index: 1000;
    }
    
    .editable-wrapper:hover .edit-indicator {
        opacity: 1;
    }
    
    .edit-icon {
        font-size: 10px;
    }
    
    .edit-panel {
        position: fixed;
        transform: translateX(-50%);
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        min-width: 300px;
        max-width: 500px;
    }
    
    .edit-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 16px;
        background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        border-bottom: 1px solid #e2e8f0;
        border-radius: 8px 8px 0 0;
    }
    
    .edit-title {
        font-weight: 600;
        color: #1e293b;
        font-size: 14px;
    }
    
    .close-btn {
        background: none;
        border: none;
        color: #64748b;
        cursor: pointer;
        font-size: 16px;
        padding: 2px;
        border-radius: 4px;
        transition: all 0.2s ease;
    }
    
    .close-btn:hover {
        background-color: #f1f5f9;
        color: #1e293b;
    }
    
    .edit-content {
        padding: 16px;
    }
    
    .edit-label {
        display: block;
        font-weight: 500;
        color: #374151;
        margin-bottom: 8px;
        font-size: 14px;
    }
    
    .edit-textarea {
        width: 100%;
        padding: 8px 12px;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        font-family: inherit;
        font-size: 14px;
        resize: vertical;
        min-height: 80px;
        transition: border-color 0.2s ease;
    }
    
    .edit-textarea:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    
    .edit-actions {
        display: flex;
        gap: 8px;
        margin-top: 12px;
    }
    
    .save-btn, .cancel-btn {
        flex: 1;
        padding: 8px 12px;
        border: none;
        border-radius: 6px;
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
    }
    
    .save-btn {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
    }
    
    .save-btn:hover {
        background: linear-gradient(135deg, #059669 0%, #047857 100%);
        transform: translateY(-1px);
    }
    
    .cancel-btn {
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        color: white;
    }
    
    .cancel-btn:hover {
        background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
        transform: translateY(-1px);
    }
</style>

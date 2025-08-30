<script lang="ts">
    import { editingState, editingActions } from '../store';
    
    let { isEditing, currentElement } = $derived($editingState);
    let editValue = '';
    let showPanel = false;
    let panelPosition = { x: 0, y: 0 };
    
    $effect(() => {
        if (currentElement) {
            editValue = currentElement.content;
            panelPosition = currentElement.position;
            showPanel = true;
            console.log('Edit panel showing for:', currentElement);
        } else {
            showPanel = false;
        }
    });
    
    function handleSave() {
        if (currentElement) {
            console.log('Saving element:', currentElement.id, 'with content:', editValue);
            editingActions.updateElement(currentElement.id, { content: editValue });
            
            // Update the actual DOM element
            const element = document.querySelector(`[data-element-id="${currentElement.id}"]`);
            if (element) {
                element.textContent = editValue;
            }
        }
        editingActions.stopEditing();
    }
    
    function handleCancel() {
        console.log('Canceling edit');
        editingActions.stopEditing();
    }
    
    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Enter' && event.ctrlKey) {
            handleSave();
        } else if (event.key === 'Escape') {
            handleCancel();
        }
    }
</script>

{#if showPanel && currentElement}
    <div 
        class="edit-panel"
        style="left: {panelPosition.x}px; top: {panelPosition.y}px;"
    >
        <div class="edit-header">
            <span class="edit-title">Edit {currentElement.type}</span>
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

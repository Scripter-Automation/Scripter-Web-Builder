<script lang="ts">
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    
    const dispatch = createEventDispatcher();
    
    let { 
        visible = false, 
        elementId = '', 
        elementType = '', 
        elementCode = '' 
    }: {
        visible?: boolean;
        elementId?: string;
        elementType?: string;
        elementCode?: string;
    } = $props();
    
    let editorContainer: HTMLElement;
    let editor: any;
    let monaco: any;
    
    onMount(() => {
        if (typeof window !== 'undefined') {
            import('monaco-editor').then((monacoModule) => {
                monaco = monacoModule;
                initializeEditor();
            }).catch((error) => {
                console.error('Failed to load Monaco Editor:', error);
            });
        }
    });
    
    function initializeEditor() {
        if (editorContainer && monaco) {
            editor = monaco.editor.create(editorContainer, {
                value: elementCode || generateDefaultFunction(),
                language: 'javascript',
                theme: 'vs-dark',
                minimap: { enabled: true },
                fontSize: 14,
                lineNumbers: 'on',
                roundedSelection: false,
                scrollBeyondLastLine: false,
                readOnly: false,
                cursorStyle: 'line',
                automaticLayout: true,
                scrollbar: {
                    vertical: 'visible',
                    horizontal: 'visible'
                }
            });
            
            // Handle content changes
            editor.onDidChangeModelContent(() => {
                const newContent = editor.getValue();
                console.log('Function code changed:', newContent);
            });
        }
    }
    
    function generateDefaultFunction(): string {
        return `// Function for ${elementType} with ID: ${elementId}
function handle${elementType.charAt(0).toUpperCase() + elementType.slice(1)}Click() {
    // Add your function logic here
    console.log('${elementType} clicked!');
    
    // Example: Show an alert
    // alert('Button clicked!');
    
    // Example: Update some state
    // updateState();
    
    // Example: Make an API call
    // fetch('/api/endpoint')
    //     .then(response => response.json())
    //     .then(data => console.log(data));
}

// Export the function if needed
export { handle${elementType.charAt(0).toUpperCase() + elementType.slice(1)}Click };`;
    }
    
    function handleSave() {
        if (editor) {
            const code = editor.getValue();
            dispatch('save', { elementId, elementType, code });
        }
    }
    
    function handleCancel() {
        dispatch('cancel');
    }
    
    function handleGenerateFunction() {
        if (editor) {
            editor.setValue(generateDefaultFunction());
        }
    }
    
    $effect(() => {
        if (visible && editor && elementCode) {
            editor.setValue(elementCode);
        }
    });
    
    $effect(() => {
        if (visible && editor && !elementCode) {
            editor.setValue(generateDefaultFunction());
        }
    });
</script>

{#if visible}
    <div class="function-editor-overlay">
        <div class="function-editor-modal">
            <div class="modal-header">
                <h3>Add Function to {elementType}</h3>
                <div class="header-actions">
                    <button class="btn btn-secondary" onclick={handleGenerateFunction}>
                        Generate Function
                    </button>
                    <button class="btn btn-close" onclick={handleCancel}>✕</button>
                </div>
            </div>
            
            <div class="modal-content">
                <div class="editor-info">
                    <span class="element-info">Element: {elementType} (ID: {elementId})</span>
                    <span class="language-info">JavaScript</span>
                </div>
                
                <div class="editor-container" bind:this={editorContainer}></div>
            </div>
            
            <div class="modal-footer">
                <div class="footer-info">
                    <span class="info-text">💡 Tip: Use Ctrl+Enter to save, Esc to cancel</span>
                </div>
                <div class="footer-actions">
                    <button class="btn btn-secondary" onclick={handleCancel}>
                        Cancel
                    </button>
                    <button class="btn btn-primary" onclick={handleSave}>
                        Save Function
                    </button>
                </div>
            </div>
        </div>
    </div>
{/if}

<style>
    .function-editor-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        animation: fadeIn 0.2s ease-out;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    .function-editor-modal {
        background: var(--bg-card);
        border-radius: 12px;
        box-shadow: var(--shadow-lg);
        width: 90vw;
        max-width: 1200px;
        height: 80vh;
        display: flex;
        flex-direction: column;
        animation: slideIn 0.3s ease-out;
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: scale(0.95) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 24px;
        border-bottom: 1px solid var(--border-primary);
        background: var(--bg-secondary);
        border-radius: 12px 12px 0 0;
    }
    
    .modal-header h3 {
        margin: 0;
        color: var(--text-primary);
        font-size: 18px;
        font-weight: 600;
    }
    
    .header-actions {
        display: flex;
        gap: 12px;
        align-items: center;
    }
    
    .modal-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }
    
    .editor-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 24px;
        background: var(--bg-secondary);
        border-bottom: 1px solid var(--border-primary);
        font-size: 12px;
        color: var(--text-secondary);
    }
    
    .element-info {
        font-weight: 500;
    }
    
    .language-info {
        background: var(--accent-primary);
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 10px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    
    .editor-container {
        flex: 1;
        min-height: 0;
    }
    
    .modal-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 24px;
        border-top: 1px solid var(--border-primary);
        background: var(--bg-secondary);
        border-radius: 0 0 12px 12px;
    }
    
    .footer-info {
        flex: 1;
    }
    
    .info-text {
        font-size: 12px;
        color: var(--text-secondary);
    }
    
    .footer-actions {
        display: flex;
        gap: 12px;
    }
    
    .btn {
        padding: 8px 16px;
        border: none;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
    }
    
    .btn-primary {
        background: var(--accent-primary);
        color: white;
    }
    
    .btn-primary:hover {
        background: var(--accent-primary-dark);
    }
    
    .btn-secondary {
        background: var(--bg-tertiary);
        color: var(--text-primary);
        border: 1px solid var(--border-primary);
    }
    
    .btn-secondary:hover {
        background: var(--bg-primary);
    }
    
    .btn-close {
        background: none;
        color: var(--text-secondary);
        font-size: 18px;
        padding: 4px 8px;
        border-radius: 4px;
    }
    
    .btn-close:hover {
        background: var(--bg-tertiary);
        color: var(--text-primary);
    }
</style>

<script lang="ts">
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    import { editorState } from '../store';

    let { currentFile, fileContent }: { currentFile: string | null; fileContent: string } = $derived($editorState);
    let editorContainer: HTMLElement;
    let editor: any;
    let monaco: any;

    onMount(() => {
        if (!browser) return; // Only run on client side
        
        // Dynamically import Monaco Editor only on client side
        import('monaco-editor').then((monacoModule) => {
            monaco = monacoModule;
            
            if (editorContainer) {
                editor = monaco.editor.create(editorContainer, {
                    value: fileContent || '',
                    language: getLanguageFromFilename(currentFile || ''),
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
                    console.log('Monaco content changed:', newContent);
                    // Update the store with new content
                    // This would be handled by the store actions
                });
            }
        }).catch((error) => {
            console.error('Failed to load Monaco Editor:', error);
        });

        return () => {
            if (editor) {
                editor.dispose();
            }
        };
    });

    function getLanguageFromFilename(filename: string): string {
        const ext = filename.split('.').pop()?.toLowerCase();
        switch (ext) {
            case 'ts': return 'typescript';
            case 'js': return 'javascript';
            case 'json': return 'json';
            case 'md': return 'markdown';
            case 'html': return 'html';
            case 'css': return 'css';
            case 'svelte': return 'html'; // Monaco doesn't have native Svelte support
            default: return 'plaintext';
        }
    }

    $effect(() => {
        if (editor && fileContent !== undefined && browser) {
            const currentValue = editor.getValue();
            if (currentValue !== fileContent) {
                editor.setValue(fileContent);
            }
        }
    });

    $effect(() => {
        if (editor && currentFile && monaco && browser) {
            const language = getLanguageFromFilename(currentFile);
            const currentLanguage = editor.getModel()?.getLanguageId();
            if (currentLanguage !== language) {
                monaco.editor.setModelLanguage(editor.getModel(), language);
            }
        }
    });
</script>

<div class="monaco-editor-container">
    <div class="editor-header">
        <span class="file-name">{currentFile || 'No file selected'}</span>
        <span class="editor-type">Monaco Editor</span>
    </div>
    <div class="editor-wrapper">
        <div bind:this={editorContainer} class="editor-content"></div>
    </div>
</div>

<style>
    .monaco-editor-container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        background: #1e1e1e;
    }

    .editor-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 16px;
        background: #2d2d30;
        border-bottom: 1px solid #3e3e42;
        color: #cccccc;
        font-size: 12px;
        font-weight: 500;
    }

    .file-name {
        font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
    }

    .editor-type {
        background: #007acc;
        color: white;
        padding: 2px 8px;
        border-radius: 4px;
        font-size: 10px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .editor-wrapper {
        flex: 1;
        position: relative;
    }

    .editor-content {
        width: 100%;
        height: 100%;
    }

    /* Monaco Editor will fill this container */
    .editor-content :global(.monaco-editor) {
        width: 100% !important;
        height: 100% !important;
    }
</style>

import type { Component } from "svelte";
import { writable } from "svelte/store";
import HomePage from "../../+page.svelte";

export let file = writable<Component>(HomePage);

// Editor state management
export interface EditorState {
    currentFile: string | null;
    editorType: 'visual' | 'monaco';
    fileContent: string;
}

export const editorState = writable<EditorState>({
    currentFile: null,
    editorType: 'visual',
    fileContent: ''
});

// Context menu state management
export interface ContextMenuState {
    visible: boolean;
    x: number;
    y: number;
    elementId: string | null;
    elementType: string | null;
}

export const contextMenuState = writable<ContextMenuState>({
    visible: false,
    x: 0,
    y: 0,
    elementId: null,
    elementType: null
});

// Function editor state management
export interface FunctionEditorState {
    visible: boolean;
    elementId: string | null;
    elementType: string | null;
    elementCode: string;
}

export const functionEditorState = writable<FunctionEditorState>({
    visible: false,
    elementId: null,
    elementType: null,
    elementCode: ''
});

// Editing state management
export interface EditableElement {
    id: string;
    type: string;
    content: string;
    attributes: Record<string, string>;
    position: { x: number; y: number };
}

export const editingState = writable<{
    isEditing: boolean;
    currentElement: EditableElement | null;
    hoveredElement: string | null;
}>({
    isEditing: true, // Always in editing mode
    currentElement: null,
    hoveredElement: null
});

// Element registry for tracking all editable elements
export const elementRegistry = writable<Map<string, EditableElement>>(new Map());

// Actions for editing state
export const editingActions = {
    startEditing: (element: EditableElement) => {
        editingState.update(state => ({
            ...state,
            isEditing: true, // Always true
            currentElement: element
        }));
    },
    
    stopEditing: () => {
        editingState.update(state => ({
            ...state,
            isEditing: true, // Always true
            currentElement: null
        }));
    },
    
    setHoveredElement: (elementId: string | null) => {
        editingState.update(state => ({
            ...state,
            hoveredElement: elementId
        }));
    },
    
    updateElement: (elementId: string, updates: Partial<EditableElement>) => {
        elementRegistry.update(registry => {
            const newRegistry = new Map(registry);
            const existing = newRegistry.get(elementId);
            if (existing) {
                newRegistry.set(elementId, { ...existing, ...updates });
            }
            return newRegistry;
        });
    },
    
    registerElement: (element: EditableElement) => {
        elementRegistry.update(registry => {
            const newRegistry = new Map(registry);
            newRegistry.set(element.id, element);
            return newRegistry;
        });
    },
    
    unregisterElement: (elementId: string) => {
        elementRegistry.update(registry => {
            const newRegistry = new Map(registry);
            newRegistry.delete(elementId);
            return newRegistry;
        });
    }
};

// Actions for context menu
export const contextMenuActions = {
    show: (x: number, y: number, elementId: string, elementType: string) => {
        contextMenuState.set({
            visible: true,
            x,
            y,
            elementId,
            elementType
        });
    },
    
    hide: () => {
        contextMenuState.set({
            visible: false,
            x: 0,
            y: 0,
            elementId: null,
            elementType: null
        });
    },
    
    handleAddFunction: async (elementId: string, elementType: string) => {
        try {
            // Get the current file content to extract button code
            const response = await fetch('/builder/api/load-file', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ filePath: '/src/routes/+page.svelte' })
            });
            
            if (response.ok) {
                const data = await response.json();
                const fileContent = data.content;
                
                // Extract button code (this is a simplified approach)
                // In a real implementation, you'd want to parse the Svelte file properly
                const buttonCode = extractButtonCode(fileContent, elementId);
                
                // Show function editor with the button code
                functionEditorState.set({
                    visible: true,
                    elementId,
                    elementType,
                    elementCode: buttonCode
                });
                
                // Hide context menu
                contextMenuActions.hide();
            }
        } catch (error) {
            console.error('Error loading file for function editor:', error);
        }
    }
};

// Actions for function editor
export const functionEditorActions = {
    show: (elementId: string, elementType: string, elementCode: string = '') => {
        functionEditorState.set({
            visible: true,
            elementId,
            elementType,
            elementCode
        });
    },
    
    hide: () => {
        functionEditorState.set({
            visible: false,
            elementId: null,
            elementType: null,
            elementCode: ''
        });
    },
    
    saveFunction: async (elementId: string, elementType: string, code: string) => {
        try {
            // Here you would save the function code
            // This could involve updating the Svelte file or creating a separate JS file
            console.log('Saving function for element:', elementId, 'Type:', elementType, 'Code:', code);
            
            // For now, just hide the editor
            functionEditorActions.hide();
        } catch (error) {
            console.error('Error saving function:', error);
        }
    }
};

// Helper function to extract button code from Svelte file
function extractButtonCode(fileContent: string, elementId: string): string {
    // This is a simplified extraction - in a real implementation you'd want proper parsing
    const lines = fileContent.split('\n');
    let buttonCode = '';
    let inButton = false;
    let braceCount = 0;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // Look for button element with the specific ID
        if (line.includes(`id="${elementId}"`) || line.includes(`id='${elementId}'`)) {
            inButton = true;
            buttonCode += `// Button element found:\n`;
            buttonCode += `${line.trim()}\n\n`;
        }
        
        if (inButton) {
            // Look for onclick or on:click handlers
            if (line.includes('onclick=') || line.includes('on:click=')) {
                buttonCode += `// Event handler found:\n`;
                buttonCode += `${line.trim()}\n\n`;
            }
            
            // Look for script section
            if (line.includes('<script')) {
                buttonCode += `// Script section:\n`;
                let j = i;
                while (j < lines.length && !lines[j].includes('</script>')) {
                    buttonCode += `${lines[j].trim()}\n`;
                    j++;
                }
                if (j < lines.length) {
                    buttonCode += `${lines[j].trim()}\n`;
                }
                break;
            }
        }
    }
    
    if (!buttonCode) {
        buttonCode = `// No specific code found for element: ${elementId}\n// This is a generated function template\n`;
    }
    
    return buttonCode;
}

// Actions for editor state
export const editorActions = {
    openFile: async (filePath: string) => {
        try {
            const response = await fetch('/builder/api/load-file', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ filePath })
            });
            
            console.log('Store: Response status:', response.status);
            console.log('Store: Response ok:', response.ok);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.log('Store: Error response:', errorText);
                throw new Error(`Failed to load file: ${response.statusText}`);
            }
            
            const result = await response.json();
            console.log('Store: Response result:', result);
            
            if (result.error) {
                throw new Error(result.error);
            }
            
            const content = result.content || '';
            console.log('Content:', content);
            console.log('Store: Extracted content length:', content.length);
            const isSvelteFile = filePath.endsWith('.svelte');
            
            editorState.update(state => ({
                ...state,
                currentFile: filePath,
                editorType: isSvelteFile ? 'visual' : 'monaco',
                fileContent: content
            }));
            
            console.log('File loaded successfully:', filePath, 'Content length:', content.length);
        } catch (error) {
            console.error('Error loading file:', error);
            // You might want to show a toast notification here
        }
    },
    
    switchToVisual: () => {
        editorState.update(state => ({
            ...state,
            editorType: 'visual'
        }));
    },
    
    switchToMonaco: () => {
        editorState.update(state => ({
            ...state,
            editorType: 'monaco'
        }));
    },
    
    updateFileContent: (content: string) => {
        editorState.update(state => ({
            ...state,
            fileContent: content
        }));
    }
};
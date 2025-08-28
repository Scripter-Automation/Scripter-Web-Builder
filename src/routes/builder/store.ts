import type { Component } from "svelte";
import { writable } from "svelte/store";
import Page from "../+page.svelte";

export let file = writable<Component>(Page);

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
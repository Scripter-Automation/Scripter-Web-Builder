<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { editingState, editingActions, elementRegistry, contextMenuActions } from '../store';
    
    let { component, componentId }: { component: any; componentId: string } = $props();
    
    let container: HTMLElement;
    let editableElements: Map<string, HTMLElement> = new Map();
    
    // Track hovered element
    let { hoveredElement } = $derived($editingState);
    
    onMount(() => {
        console.log('EditableRenderer mounted, componentId:', componentId);
        if (container) {
            makeElementsEditable();
        }
    });
    
    // Make elements editable on mount
    $effect(() => {
        if (container) {
            console.log('Making elements editable...');
            makeElementsEditable();
        }
    });
    
    onDestroy(() => {
        console.log('EditableRenderer destroying, cleaning up elements');
        // Clean up registered elements
        editableElements.forEach((_, elementId) => {
            editingActions.unregisterElement(elementId);
        });
    });
    
    function makeElementsEditable() {
        if (!container) {
            console.log('No container found');
            return;
        }
        
        console.log('Container found, searching for editable elements...');
        
        // Find all text-containing elements that should be editable
        // Use a more comprehensive selector to include all HTML elements
        const editableSelectors = [
            // Headings
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            // Text elements
            'p', 'span', 'div', 'a', 'button', 'label',
            // List elements
            'li', 'td', 'th',
            // Additional common elements
            'article', 'section', 'header', 'footer', 'nav', 'aside',
            'main', 'blockquote', 'cite', 'em', 'strong', 'b', 'i',
            'small', 'mark', 'del', 'ins', 'sub', 'sup', 'code', 'pre',
            'kbd', 'samp', 'var', 'time', 'address', 'figcaption',
            'caption', 'legend', 'option', 'optgroup', 'summary', 'details'
        ];
        
        // Use a more comprehensive approach to find all elements with text content
        const allElements = container.querySelectorAll('*');
        const elements = Array.from(allElements).filter(el => {
            const element = el as HTMLElement;
            // Include elements that have text content and are not already processed
            return element.textContent?.trim() && 
                   !element.dataset.editable && 
                   !element.closest('[data-editable]') && // Avoid nested editable elements
                   element.children.length === 0; // Only leaf elements with text
        });
        console.log('Found elements:', elements.length);
        
        elements.forEach((element, index) => {
            const el = element as HTMLElement;
            
            // Skip if element is already processed
            if (el.dataset.editable) {
                console.log('Skipping already processed element:', el.tagName, el.textContent?.substring(0, 20));
                return;
            }
            
            const elementId = `${componentId}-element-${index}`;
            const elementType = el.tagName.toLowerCase();
            const elementContent = el.textContent || '';
            
            console.log('Making element editable:', elementId, elementType, elementContent.substring(0, 20));
            
            // Mark as processed
            el.dataset.editable = 'true';
            el.dataset.elementId = elementId;
            
            // Add visual styling for editing mode - preserve original styling
            el.style.cursor = 'pointer';
            el.style.transition = 'all 0.2s ease';
            
            // Only add border and padding for non-interactive elements
            // Preserve original styling for buttons, links, and form elements
            const isInteractiveElement = ['button', 'a', 'input', 'select', 'textarea'].includes(elementType);
            
            if (!isInteractiveElement) {
                el.style.border = '2px solid transparent';
                el.style.borderRadius = '4px';
                el.style.padding = '2px';
            } else {
                // For interactive elements, just add a subtle outline
                el.style.outline = '2px solid transparent';
                el.style.outlineOffset = '2px';
            }
            
            // Store reference
            editableElements.set(elementId, el);
            
            // Register element
            editingActions.registerElement({
                id: elementId,
                type: elementType,
                content: elementContent,
                attributes: extractAttributes(el),
                position: { x: 0, y: 0 }
            });
            
            // Add click handler
            el.addEventListener('click', handleElementClick);
            el.addEventListener('contextmenu', handleElementRightClick);
            el.addEventListener('mouseenter', () => handleElementHover(elementId));
            el.addEventListener('mouseleave', () => handleElementHover(null));
            
            console.log('Element made editable:', elementId);
        });
    }
    
    function extractAttributes(element: HTMLElement): Record<string, string> {
        const attributes: Record<string, string> = {};
        for (let i = 0; i < element.attributes.length; i++) {
            const attr = element.attributes[i];
            if (!attr.name.startsWith('data-') && attr.name !== 'class' && attr.name !== 'style') {
                attributes[attr.name] = attr.value;
            }
        }
        return attributes;
    }
    
    function handleElementClick(event: Event) {
        console.log('🎯 Element clicked!');
        
        event.preventDefault();
        event.stopPropagation();
        
        const element = event.target as HTMLElement;
        const elementId = element.dataset.elementId;
        
        console.log('🎯 Clicked element:', element);
        console.log('🎯 Element ID:', elementId);
        console.log('🎯 Element tag:', element.tagName);
        console.log('🎯 Element text:', element.textContent?.substring(0, 50));
        
        if (!elementId) {
            console.log('❌ No element ID found');
            return;
        }
        
        // Get element data from registry
        const elementData = $elementRegistry.get(elementId);
        console.log('🎯 Element data from registry:', elementData);
        
        if (elementData) {
            // Start editing this element
            console.log('🎯 Starting editing for element:', elementId);
            editingActions.startEditing({
                id: elementId,
                type: elementData.type,
                content: elementData.content,
                attributes: elementData.attributes,
                position: elementData.position
            });
            
            console.log('🎯 Editing started, current element should be updated');
        } else {
            console.log('❌ Element data not found in registry');
        }
        
        // Make the element content editable
        element.contentEditable = 'true';
        element.focus();
        
        // Select all text for easy editing
        const range = document.createRange();
        range.selectNodeContents(element);
        const selection = window.getSelection();
        if (selection) {
            selection.removeAllRanges();
            selection.addRange(range);
        }
        
        // Add blur event to save changes
        element.addEventListener('blur', function saveChanges() {
            element.contentEditable = 'false';
            
            // Update the element data
            const elementData = $elementRegistry.get(elementId);
            if (elementData) {
                const newContent = element.textContent || '';
                editingActions.updateElement(elementId, { content: newContent });
                console.log('Text updated:', newContent);
            }
            
            // Remove the event listener
            element.removeEventListener('blur', saveChanges);
        }, { once: true });
        
        // Add keyboard event for Enter key
        element.addEventListener('keydown', function handleKeydown(e: KeyboardEvent) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                element.blur();
            }
        }, { once: true });
    }
    
    function handleElementHover(elementId: string | null) {
        editingActions.setHoveredElement(elementId);
    }
    
    function handleElementRightClick(event: Event) {
        console.log('🎯 Element right-clicked!');
        
        event.preventDefault();
        event.stopPropagation();
        
        const element = event.target as HTMLElement;
        const elementId = element.dataset.elementId;
        
        console.log('🎯 Right-clicked element:', element);
        console.log('🎯 Element ID:', elementId);
        console.log('🎯 Element tag:', element.tagName);
        
        if (!elementId) {
            console.log('❌ No element ID found for right-click');
            return;
        }
        
        // Get element data from registry
        const elementData = $elementRegistry.get(elementId);
        
        if (elementData) {
            // Show context menu at mouse position
            contextMenuActions.show(
                (event as MouseEvent).clientX, 
                (event as MouseEvent).clientY, 
                elementId, 
                elementData.type
            );
            console.log('🎯 Context menu should be shown for element:', elementId);
        } else {
            console.log('❌ Element data not found in registry for right-click');
        }
    }
    
    function handleElementEdit(event: CustomEvent) {
        const { elementId, elementType, elementContent, elementAttributes } = event.detail;
        editingActions.startEditing({
            id: elementId,
            type: elementType,
            content: elementContent,
            attributes: elementAttributes,
            position: event.detail.position
        });
    }
    
    function handleElementSave(event: CustomEvent) {
        const { elementId, content } = event.detail;
        
        // Update the actual DOM element
        const element = editableElements.get(elementId);
        if (element) {
            element.textContent = content;
        }
        
        // Update registry
        editingActions.updateElement(elementId, { content });
        editingActions.stopEditing();
    }
    
    function handleElementHoverEvent(event: CustomEvent) {
        editingActions.setHoveredElement(event.detail.elementId);
    }
</script>

<div 
    bind:this={container} 
    class="editable-renderer"
>
    <svelte:component this={component} />
</div>

<style>
    .editable-renderer {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: auto;
        padding: 20px;
    }
    
    /* Hover effects for editable elements - preserve original styling */
    :global([data-editable="true"]:hover) {
        transform: scale(1.01) !important;
    }
    
    /* Hover effects for non-interactive elements */
    :global([data-editable="true"]:not(button):not(a):not(input):not(select):not(textarea):hover) {
        border-color: #3b82f6 !important;
        background-color: rgba(59, 130, 246, 0.05) !important;
    }
    
    /* Hover effects for interactive elements */
    :global([data-editable="true"] button:hover),
    :global([data-editable="true"] a:hover),
    :global([data-editable="true"] input:hover),
    :global([data-editable="true"] select:hover),
    :global([data-editable="true"] textarea:hover) {
        outline-color: #3b82f6 !important;
        outline-width: 2px !important;
    }
</style>

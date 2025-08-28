<script lang="ts">
    import { editingState, editingActions } from '../store';
    import BoxModel from './BoxModel.svelte';
    
    let { currentElement } = $derived($editingState);
    let elementId = '';
    let elementClasses = '';
    let elementStyle = '';
    
    // Box model properties
    let boxModel = {
        margin: { top: '', right: '', bottom: '', left: '' },
        padding: { top: '', right: '', bottom: '', left: '' },
        border: { width: '', style: '', color: '' }
    };
    
    // Typography properties
    let typography: Record<string, string> = {
        'font-size': '',
        'font-weight': '',
        'font-family': '',
        'line-height': '',
        'text-align': '',
        'color': '#000000'
    };
    
    // Layout properties
    let layout: Record<string, string> = {
        'width': '',
        'height': '',
        'display': '',
        'position': '',
        'top': '',
        'left': '',
        'right': '',
        'bottom': ''
    };
    
    // Background properties
    let background: Record<string, string> = {
        'background-color': '#ffffff',
        'background-image': '',
        'background-size': '',
        'background-position': ''
    };
    
    $effect(() => {
        console.log('🔍 CSS Panel effect running');
        console.log('🔍 currentElement:', currentElement);
        console.log('🔍 currentElement type:', typeof currentElement);
        console.log('🔍 currentElement keys:', currentElement ? Object.keys(currentElement) : 'null');
        
        // Test log to browser console
        if (typeof window !== 'undefined') {
            console.log('🌐 Browser console test - CSS Panel effect running');
        }
        
        if (currentElement) {
            console.log('🔍 Element ID to search for:', currentElement.id);
            console.log('🔍 Available DOM elements with data-element-id:', Array.from(document.querySelectorAll('[data-element-id]')).map(el => el.getAttribute('data-element-id')));
            
            // Get the actual DOM element using data-element-id attribute
            const domElement = document.querySelector(`[data-element-id="${currentElement.id}"]`) as HTMLElement;
            console.log('🔍 DOM element found:', domElement);
            console.log('🔍 DOM element tag:', domElement?.tagName);
            console.log('🔍 DOM element classes:', domElement?.className);
            
            if (domElement) {
                console.log('🔍 Getting computed styles...');
                // Get computed styles from the DOM element
                const computedStyle = window.getComputedStyle(domElement);
                console.log('🔍 Computed styles object:', computedStyle);
                
                // Get ID and classes from the DOM element
                elementId = domElement.id || '';
                elementClasses = domElement.className || '';
                
                // Get inline styles
                const inlineStyle = domElement.getAttribute('style') || '';
                elementStyle = inlineStyle;
                
                console.log('🔍 Extracted properties:', {
                    elementId,
                    elementClasses,
                    elementStyle
                });
                
                // Parse computed styles into organized properties
                console.log('🔍 Parsing computed styles...');
                parseComputedStyles(computedStyle);
                
                console.log('🔍 Parsed box model:', boxModel);
                console.log('🔍 Parsed typography:', typography);
                console.log('🔍 Parsed layout:', layout);
                console.log('🔍 Parsed background:', background);
                
                console.log('✅ CSS Panel: Element loaded from DOM successfully');
            } else {
                console.log('⚠️ DOM element not found, falling back to attributes');
                // Fallback to attributes if DOM element not found
                elementId = currentElement.attributes.id || '';
                elementClasses = currentElement.attributes.class || '';
                elementStyle = currentElement.attributes.style || '';
                
                console.log('🔍 Fallback properties:', {
                    elementId,
                    elementClasses,
                    elementStyle
                });
                
                // Parse inline styles
                console.log('🔍 Parsing inline styles...');
                parseStyles(elementStyle);
                
                console.log('⚠️ CSS Panel: Element loaded from attributes (fallback)');
            }
        } else {
            console.log('❌ No currentElement provided to CSS Panel');
        }
    });
    
    function parseComputedStyles(computedStyle: CSSStyleDeclaration) {
        console.log('🔍 parseComputedStyles called with:', computedStyle);
        
        // Parse box model
        const margin = parseBoxValue(computedStyle.margin || '');
        const padding = parseBoxValue(computedStyle.padding || '');
        const borderWidth = computedStyle.borderWidth || '';
        const borderStyle = computedStyle.borderStyle || '';
        const borderColor = computedStyle.borderColor || '';
        
        console.log('🔍 Box model values:', { margin, padding, borderWidth, borderStyle, borderColor });
        
        boxModel.margin = margin;
        boxModel.padding = padding;
        boxModel.border = { width: borderWidth, style: borderStyle, color: borderColor };
        
        // Parse typography
        typography['font-size'] = computedStyle.fontSize || '';
        typography['font-weight'] = computedStyle.fontWeight || '';
        typography['font-family'] = computedStyle.fontFamily || '';
        typography['line-height'] = computedStyle.lineHeight || '';
        typography['text-align'] = computedStyle.textAlign || '';
        typography['color'] = computedStyle.color || '#000000';
        
        console.log('🔍 Typography values:', typography);
        
        // Parse layout
        layout['width'] = computedStyle.width || '';
        layout['height'] = computedStyle.height || '';
        layout['display'] = computedStyle.display || '';
        layout['position'] = computedStyle.position || '';
        layout['top'] = computedStyle.top || '';
        layout['left'] = computedStyle.left || '';
        layout['right'] = computedStyle.right || '';
        layout['bottom'] = computedStyle.bottom || '';
        
        console.log('🔍 Layout values:', layout);
        
        // Parse background
        background['background-color'] = computedStyle.backgroundColor || '#ffffff';
        background['background-image'] = computedStyle.backgroundImage || '';
        background['background-size'] = computedStyle.backgroundSize || '';
        background['background-position'] = computedStyle.backgroundPosition || '';
        
        console.log('🔍 Background values:', background);
        console.log('✅ parseComputedStyles completed');
    }

    function parseStyles(styleString: string) {
        if (!styleString) return;
        
        const styles = parseStyleString(styleString);
        
        // Parse box model
        const margin = parseBoxValue(styles.margin || '');
        const padding = parseBoxValue(styles.padding || '');
        const borderWidth = styles['border-width'] || '';
        const borderStyle = styles['border-style'] || '';
        const borderColor = styles['border-color'] || '';
        
        boxModel.margin = margin;
        boxModel.padding = padding;
        boxModel.border = { width: borderWidth, style: borderStyle, color: borderColor };
        
        // Parse typography
        typography['font-size'] = styles['font-size'] || '';
        typography['font-weight'] = styles['font-weight'] || '';
        typography['font-family'] = styles['font-family'] || '';
        typography['line-height'] = styles['line-height'] || '';
        typography['text-align'] = styles['text-align'] || '';
        typography['color'] = styles['color'] || '#000000';
        
        // Parse layout
        layout['width'] = styles['width'] || '';
        layout['height'] = styles['height'] || '';
        layout['display'] = styles['display'] || '';
        layout['position'] = styles['position'] || '';
        layout['top'] = styles['top'] || '';
        layout['left'] = styles['left'] || '';
        layout['right'] = styles['right'] || '';
        layout['bottom'] = styles['bottom'] || '';
        
        // Parse background
        background['background-color'] = styles['background-color'] || '#ffffff';
        background['background-image'] = styles['background-image'] || '';
        background['background-size'] = styles['background-size'] || '';
        background['background-position'] = styles['background-position'] || '';
    }
    
    function parseStyleString(styleString: string): Record<string, string> {
        const styles: Record<string, string> = {};
        if (!styleString) return styles;
        
        styleString.split(';').forEach(rule => {
            const [property, value] = rule.split(':').map(s => s.trim());
            if (property && value) {
                styles[property] = value;
            }
        });
        return styles;
    }
    
    function parseBoxValue(value: string): { top: string; right: string; bottom: string; left: string } {
        if (!value) return { top: '', right: '', bottom: '', left: '' };
        
        const parts = value.split(' ').map(s => s.trim());
        if (parts.length === 1) {
            return { top: parts[0], right: parts[0], bottom: parts[0], left: parts[0] };
        } else if (parts.length === 2) {
            return { top: parts[0], right: parts[1], bottom: parts[0], left: parts[1] };
        } else if (parts.length === 4) {
            return { top: parts[0], right: parts[1], bottom: parts[2], left: parts[3] };
        }
        return { top: '', right: '', bottom: '', left: '' };
    }
    
    function updateElement() {
        if (!currentElement) return;
        
        // Build style string from organized properties
        const styleParts: string[] = [];
        
        // Box model
        const marginValues = [boxModel.margin.top, boxModel.margin.right, boxModel.margin.bottom, boxModel.margin.left];
        if (marginValues.some(v => v)) {
            styleParts.push(`margin: ${marginValues.join(' ')}`);
        }
        
        const paddingValues = [boxModel.padding.top, boxModel.padding.right, boxModel.padding.bottom, boxModel.padding.left];
        if (paddingValues.some(v => v)) {
            styleParts.push(`padding: ${paddingValues.join(' ')}`);
        }
        
        if (boxModel.border.width || boxModel.border.style || boxModel.border.color) {
            const borderParts = [boxModel.border.width, boxModel.border.style, boxModel.border.color].filter(Boolean);
            if (borderParts.length > 0) {
                styleParts.push(`border: ${borderParts.join(' ')}`);
            }
        }
        
        // Typography
        Object.entries(typography).forEach(([prop, value]) => {
            if (value) styleParts.push(`${prop}: ${value}`);
        });
        
        // Layout
        Object.entries(layout).forEach(([prop, value]) => {
            if (value) styleParts.push(`${prop}: ${value}`);
        });
        
        // Background
        Object.entries(background).forEach(([prop, value]) => {
            if (value) styleParts.push(`${prop}: ${value}`);
        });
        
        elementStyle = styleParts.join('; ');
        
        console.log('Updating element CSS properties:', {
            id: elementId,
            classes: elementClasses,
            style: elementStyle
        });
        
        // Update the actual DOM element using data-element-id attribute
        const element = document.querySelector(`[data-element-id="${currentElement.id}"]`) as HTMLElement;
        if (element) {
            // Update ID
            if (elementId) {
                element.id = elementId;
            } else {
                element.removeAttribute('id');
            }
            
            // Update classes
            if (elementClasses) {
                element.className = elementClasses;
            } else {
                element.removeAttribute('class');
            }
            
            // Update style
            if (elementStyle) {
                element.setAttribute('style', elementStyle);
            } else {
                element.removeAttribute('style');
            }
        }
        
        // Update store
        editingActions.updateElement(currentElement.id, {
            attributes: {
                ...currentElement.attributes,
                id: elementId,
                class: elementClasses,
                style: elementStyle
            }
        });
    }
    
    function updateBoxModel(type: 'margin' | 'padding', side: 'top' | 'right' | 'bottom' | 'left', value: string) {
        boxModel[type][side] = value;
        updateElement();
    }
    
    function updateBorder(property: 'width' | 'style' | 'color', value: string) {
        boxModel.border[property] = value;
        updateElement();
    }
    
    function updateTypography(property: string, value: string) {
        typography[property] = value;
        updateElement();
    }
    
    function updateLayout(property: string, value: string) {
        layout[property] = value;
        updateElement();
    }
    
    function updateBackground(property: string, value: string) {
        background[property] = value;
        updateElement();
    }
</script>

{#if currentElement}
    <div class="css-panel">
        <div class="panel-header">
            <h3>🎨 CSS Properties</h3>
            <span class="element-type">{currentElement.type}</span>
        </div>
        
        <div class="panel-content">
            <!-- Element ID & Classes -->
            <div class="section">
                <h4 class="section-title">Element</h4>
                <div class="property-group">
                    <label class="property-label">ID:</label>
                    <input 
                        type="text" 
                        bind:value={elementId}
                        onchange={updateElement}
                        placeholder="Enter element ID"
                        class="property-input"
                    />
                </div>
                <div class="property-group">
                    <label class="property-label">Classes:</label>
                    <input 
                        type="text" 
                        bind:value={elementClasses}
                        onchange={updateElement}
                        placeholder="Enter CSS classes"
                        class="property-input"
                    />
                </div>
            </div>
            
            <!-- Box Model -->
            <div class="section">
                                <BoxModel 
                    boxModel={boxModel}
                    onUpdate={(property: string, value: string) => {
                        // Update the boxModel object
                        const [category, side] = property.split('-');
                        if (category === 'margin' || category === 'padding') {
                            (boxModel as any)[category][side] = value;
                        } else if (category === 'border') {
                            (boxModel.border as any)[side] = value;
                        }
                        updateElement();
                    }}
                />
            </div>
            
            <!-- Typography -->
            <div class="section">
                <h4 class="section-title">Typography</h4>
                <div class="property-group">
                    <label class="property-label">Color:</label>
                    <input 
                        type="color" 
                        bind:value={typography['color']}
                        onchange={() => updateElement()}
                        class="color-picker"
                    />
                </div>
                <div class="property-group">
                    <label class="property-label">Font Size:</label>
                    <input 
                        type="text" 
                        bind:value={typography['font-size']}
                        onchange={() => updateElement()}
                        placeholder="16px"
                        class="property-input"
                    />
                </div>
                <div class="property-group">
                    <label class="property-label">Font Weight:</label>
                    <select 
                        bind:value={typography['font-weight']}
                        onchange={() => updateElement()}
                        class="property-select"
                    >
                        <option value="">Normal</option>
                        <option value="bold">Bold</option>
                        <option value="100">100</option>
                        <option value="200">200</option>
                        <option value="300">300</option>
                        <option value="400">400</option>
                        <option value="500">500</option>
                        <option value="600">600</option>
                        <option value="700">700</option>
                        <option value="800">800</option>
                        <option value="900">900</option>
                    </select>
                </div>
                <div class="property-group">
                    <label class="property-label">Text Align:</label>
                    <select 
                        value={typography['text-align']}
                        onchange={(e) => updateTypography('text-align', (e.target as HTMLSelectElement).value)}
                        class="property-select"
                    >
                        <option value="">Left</option>
                        <option value="center">Center</option>
                        <option value="right">Right</option>
                        <option value="justify">Justify</option>
                    </select>
                </div>
            </div>
            
            <!-- Background -->
            <div class="section">
                <h4 class="section-title">Background</h4>
                <div class="property-group">
                    <label class="property-label">Background Color:</label>
                    <input 
                        type="color" 
                        value={background['background-color']}
                        onchange={(e) => updateBackground('background-color', (e.target as HTMLInputElement).value)}
                        class="color-picker"
                    />
                </div>
            </div>
            
            <!-- Layout -->
            <div class="section">
                <h4 class="section-title">Layout</h4>
                <div class="property-group">
                    <label class="property-label">Width:</label>
                    <input 
                        type="text" 
                        value={layout['width']}
                        onchange={(e) => updateLayout('width', (e.target as HTMLInputElement).value)}
                        placeholder="auto"
                        class="property-input"
                    />
                </div>
                <div class="property-group">
                    <label class="property-label">Height:</label>
                    <input 
                        type="text" 
                        value={layout['height']}
                        onchange={(e) => updateLayout('height', (e.target as HTMLInputElement).value)}
                        placeholder="auto"
                        class="property-input"
                    />
                </div>
                <div class="property-group">
                    <label class="property-label">Display:</label>
                    <select 
                        value={layout['display']}
                        onchange={(e) => updateLayout('display', (e.target as HTMLSelectElement).value)}
                        class="property-select"
                    >
                        <option value="">Block</option>
                        <option value="inline">Inline</option>
                        <option value="inline-block">Inline Block</option>
                        <option value="flex">Flex</option>
                        <option value="grid">Grid</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
{/if}

<style>
    .css-panel {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
    }
    
    .panel-header {
        padding: 1rem;
        background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
        color: white;
        border-bottom: 1px solid #4338ca;
        flex-shrink: 0;
        z-index: 10;
    }
    
    .panel-header h3 {
        margin: 0 0 4px 0;
        font-size: 16px;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    .element-type {
        font-size: 12px;
        opacity: 0.9;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    
    .panel-content {
        padding: 1rem;
        flex: 1;
        overflow-y: auto;
        overflow-x: hidden;
    }
    
    .section {
        margin-bottom: 1rem;
        padding: 0.75rem;
        background: white;
        border-radius: 6px;
        border: 1px solid #e2e8f0;
    }
    
    .section-title {
        margin: 0 0 1rem 0;
        font-size: 14px;
        font-weight: 600;
        color: #374151;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    
    .property-group {
        margin-bottom: 0.75rem;
    }
    
    .property-label {
        display: block;
        font-weight: 500;
        color: #6b7280;
        margin-bottom: 6px;
        font-size: 12px;
    }
    
    .property-input {
        width: calc(100% - 4px);
        padding: 6px 10px;
        border: 1px solid #d1d5db;
        border-radius: 4px;
        font-size: 12px;
        transition: border-color 0.2s ease;
        box-sizing: border-box;
    }
    
    .property-input:focus {
        outline: none;
        border-color: #6366f1;
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    }
    
    .property-select {
        width: calc(100% - 4px);
        padding: 6px 10px;
        border: 1px solid #d1d5db;
        border-radius: 4px;
        font-size: 12px;
        background: white;
        transition: border-color 0.2s ease;
        box-sizing: border-box;
    }
    
    .property-select:focus {
        outline: none;
        border-color: #6366f1;
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    }
    
    .color-picker {
        width: calc(100% - 4px);
        height: 32px;
        border: 1px solid #d1d5db;
        border-radius: 4px;
        cursor: pointer;
        transition: border-color 0.2s ease;
        box-sizing: border-box;
    }
    
    .color-picker:focus {
        outline: none;
        border-color: #6366f1;
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    }
    

    
    /* Custom scrollbar */
    .css-panel::-webkit-scrollbar {
        width: 6px;
    }
    
    .css-panel::-webkit-scrollbar-track {
        background: #f1f5f9;
    }
    
    .css-panel::-webkit-scrollbar-thumb {
        background: #cbd5e1;
        border-radius: 3px;
    }
    
    .css-panel::-webkit-scrollbar-thumb:hover {
        background: #94a3b8;
    }
</style>

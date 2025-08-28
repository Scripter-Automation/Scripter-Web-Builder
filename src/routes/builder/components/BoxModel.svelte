<script lang="ts">
    let { 
        boxModel = {
            margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
            padding: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
            border: { width: '1px', style: 'solid', color: '#000000' }
        },
        onUpdate = (property: string, value: string) => {}
    } = $props();

    function updateMargin(side: string, value: string) {
        onUpdate(`margin-${side}`, value);
    }

    function updatePadding(side: string, value: string) {
        onUpdate(`padding-${side}`, value);
    }

    function updateBorder(property: string, value: string) {
        onUpdate(`border-${property}`, value);
    }
</script>

<div class="box-model-visual">
    <h4 class="section-title">Box Model</h4>
    <div class="box-model-container">
        <!-- Margin Layer -->
        <div class="margin-layer">
            <div class="margin-inputs">
                <input 
                    type="text" 
                    value={boxModel.margin.top}
                    onchange={(e) => updateMargin('top', (e.target as HTMLInputElement).value)}
                    class="margin-input margin-top"
                    placeholder="0"
                />
                <input 
                    type="text" 
                    value={boxModel.margin.right}
                    onchange={(e) => updateMargin('right', (e.target as HTMLInputElement).value)}
                    class="margin-input margin-right"
                    placeholder="0"
                />
                <input 
                    type="text" 
                    value={boxModel.margin.bottom}
                    onchange={(e) => updateMargin('bottom', (e.target as HTMLInputElement).value)}
                    class="margin-input margin-bottom"
                    placeholder="0"
                />
                <input 
                    type="text" 
                    value={boxModel.margin.left}
                    onchange={(e) => updateMargin('left', (e.target as HTMLInputElement).value)}
                    class="margin-input margin-left"
                    placeholder="0"
                />
            </div>

            <!-- Border Layer -->
            <div class="border-layer">
                <div class="border-inputs">
                    <input 
                        type="text" 
                        value={boxModel.border.width}
                        onchange={(e) => updateBorder('width', (e.target as HTMLInputElement).value)}
                        class="border-input"
                        placeholder="1px"
                    />
                    <select 
                        value={boxModel.border.style}
                        onchange={(e) => updateBorder('style', (e.target as HTMLSelectElement).value)}
                        class="border-select"
                    >
                        <option value="solid">Solid</option>
                        <option value="dashed">Dashed</option>
                        <option value="dotted">Dotted</option>
                        <option value="none">None</option>
                    </select>
                    <input 
                        type="color" 
                        value={boxModel.border.color}
                        onchange={(e) => updateBorder('color', (e.target as HTMLInputElement).value)}
                        class="border-color-picker"
                    />
                </div>

                <!-- Padding Layer -->
                <div class="padding-layer">
                    <div class="padding-inputs">
                        <input 
                            type="text" 
                            value={boxModel.padding.top}
                            onchange={(e) => updatePadding('top', (e.target as HTMLInputElement).value)}
                            class="padding-input padding-top"
                            placeholder="0"
                        />
                        <input 
                            type="text" 
                            value={boxModel.padding.right}
                            onchange={(e) => updatePadding('right', (e.target as HTMLInputElement).value)}
                            class="padding-input padding-right"
                            placeholder="0"
                        />
                        <input 
                            type="text" 
                            value={boxModel.padding.bottom}
                            onchange={(e) => updatePadding('bottom', (e.target as HTMLInputElement).value)}
                            class="padding-input padding-bottom"
                            placeholder="0"
                        />
                        <input 
                            type="text" 
                            value={boxModel.padding.left}
                            onchange={(e) => updatePadding('left', (e.target as HTMLInputElement).value)}
                            class="padding-input padding-left"
                            placeholder="0"
                        />
                    </div>

                    <!-- Content Area -->
                    <div class="content-layer">
                        <div class="content-label">Content</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .box-model-visual {
        margin: 1rem 0;
    }

    .box-model-container {
        position: relative;
        width: 240px;
        height: 240px;
        margin: 0 auto;
        background: #f8fafc;
        border-radius: 8px;
        padding: 30px;
    }

    .margin-layer {
        position: relative;
        width: 100%;
        height: 100%;
        background: rgba(255, 193, 7, 0.1);
        border: 2px dashed #ffc107;
        border-radius: 6px;
    }

    .margin-inputs {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
    }

    .margin-input {
        position: absolute;
        width: 30px;
        height: 16px;
        border: 1px solid #ffc107;
        border-radius: 3px;
        background: white;
        font-size: 8px;
        text-align: center;
        pointer-events: all;
        transition: all 0.2s ease;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }

    .margin-input:focus {
        outline: none;
        border-color: #6366f1;
        box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
        z-index: 10;
    }

    .margin-top {
        top: -8px;
        left: 50%;
        transform: translateX(-50%);
    }

    .margin-right {
        top: 50%;
        right: -8px;
        transform: translateY(-50%);
    }

    .margin-bottom {
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%);
    }

    .margin-left {
        top: 50%;
        left: -8px;
        transform: translateY(-50%);
    }

    .border-layer {
        position: absolute;
        top: 20px;
        left: 20px;
        right: 20px;
        bottom: 20px;
        background: rgba(220, 53, 69, 0.1);
        border: 2px dashed #dc3545;
        border-radius: 4px;
    }

    .border-inputs {
        position: absolute;
        top: -12px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 3px;
        align-items: center;
        background: white;
        padding: 3px 5px;
        border-radius: 3px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        border: 1px solid #e2e8f0;
    }

    .border-input {
        width: 25px;
        height: 16px;
        border: 1px solid #dc3545;
        border-radius: 2px;
        font-size: 7px;
        text-align: center;
    }

    .border-select {
        width: 30px;
        height: 16px;
        border: 1px solid #dc3545;
        border-radius: 2px;
        font-size: 7px;
        background: white;
    }

    .border-color-picker {
        width: 16px;
        height: 16px;
        border: 1px solid #dc3545;
        border-radius: 2px;
        cursor: pointer;
    }

    .border-input:focus,
    .border-select:focus {
        outline: none;
        border-color: #6366f1;
        box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
    }

    .padding-layer {
        position: absolute;
        top: 40px;
        left: 40px;
        right: 40px;
        bottom: 40px;
        background: rgba(40, 167, 69, 0.1);
        border: 2px dashed #28a745;
        border-radius: 2px;
    }

    .padding-inputs {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
    }

    .padding-input {
        position: absolute;
        width: 28px;
        height: 14px;
        border: 1px solid #28a745;
        border-radius: 2px;
        background: white;
        font-size: 7px;
        text-align: center;
        pointer-events: all;
        transition: all 0.2s ease;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }

    .padding-input:focus {
        outline: none;
        border-color: #6366f1;
        box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
        z-index: 10;
    }

    .padding-top {
        top: -7px;
        left: 50%;
        transform: translateX(-50%);
    }

    .padding-right {
        top: 50%;
        right: -7px;
        transform: translateY(-50%);
    }

    .padding-bottom {
        bottom: -7px;
        left: 50%;
        transform: translateX(-50%);
    }

    .padding-left {
        top: 50%;
        left: -7px;
        transform: translateY(-50%);
    }

    .content-layer {
        position: absolute;
        top: 60px;
        left: 60px;
        right: 60px;
        bottom: 60px;
        background: rgba(99, 102, 241, 0.1);
        border: 2px dashed #6366f1;
        border-radius: 2px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .content-label {
        font-size: 10px;
        font-weight: 600;
        color: #6366f1;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
</style>

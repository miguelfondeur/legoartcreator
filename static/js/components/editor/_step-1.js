export default class StepOne extends HTMLElement {
    render() {
        this.shadow.innerHTML = /*html*/`
            <style>
                * { box-sizing: border-box; }
                p { margin: 0; }
                .step-body {
                    background-color: #efefef;
                    padding-bottom: 10px;
                }
                .step-body, .step-footer { padding: 10px 20px; }
                .step-body > h3, .form-group { margin: 0 0 10px; }
                .form-group {
                    max-width: 50%;
                    margin-bottom: 10px;
                }
                .form-group label {
                    display: block;
                    margin-bottom: 5px;
                    font-size: 14px;
                }
                .step-footer {
                    border-top: 1px solid #e5e5e5;
                    display: flex;
                    justify-content: space-between;
                }
                button,select {
                    height: 30px;
                    border-radius: 50px;
                    padding: 0 15px;
                }
                button {
                    border: 2px solid black;
                    font-weight: bold;
                    cursor: pointer;
                }
                select {
                    background-color: #fff;
                    width: 100%;
                }
                .color-picker { display: flex; }
                .color-picker input[type="text"]{
                    flex-grow: 1;
                    height: 30px;
                    padding: 0 15px;
                    border-top-left-radius: 50px;
                    border-bottom-left-radius: 50px;
                    border: 1px solid black;
                    border-right: 0;
                }
                .color-picker input[type="color"] {
                    height: 30px;
                    border-radius: 0;
                    background-color: white;
                    border: 1px solid black;
                }
                input:focus, select:focus {
                    outline: none;
                    border-color: #006db7 !important;
                }
            </style>
            <div class="step-body">
                <h3>Edit Canvas</h3>

                <div class="form-group">
                    <label class="selectBox" for="sizeSelect">Canvas Size:</label>
                    <!-- <p class="resize-warning">Are you sure you want to select a new canvas size? Doing so will erase your progress.</p> -->
                    <select name="sizeSelect" id="sizeSelect" >
                        <option value="standard" ${this.size === 'standard' ? 'selected' : ''}>48 X 48 Standard</option>
                        <option value="wide" ${this.size === 'wide' ? 'selected' : ''}>48 X 96 Wide</option>
                        <option value="ultra" ${this.size === 'ultra' ? 'selected' : ''}>48 X 144 Ultra Wide</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label>Canvas Background Color:</label>
                    <div class="color-picker">
                        <input id="bgColorInput" type="text" maxlength="7" placeholder="#000000" value="${this.color}">
                        <input id="bgColorPicker" type="color" value="${this.color}">
                    </div>
                </div>
                <!-- <p class="bg-warning">You have converted the background color. Selecting a new background color will erase all of your progress.</p> -->
            
            </div>
            <div class="step-footer">
                <button role="button" id="resetBG">Reset Canvas Background</button>
                <button role="button" class="next" data-new-step="2">Upload Your Image</button>
            </div>
        `;
    }

    //Constructor
    constructor() {
        super();

        //attach root
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['size', 'color'];       
    }

    //Life Cycle Hooks
    attributeChangedCallback(prop, oldVal, newVal) {
        if (prop === 'size') this.render()
        if (prop === 'color') this.render()
    }

    //Getters and Setters
    get size() {
        return this.getAttribute("size");
    }
    set size(val) {
        this.setAttribute('size', val)
    }

    get color() {
        return this.getAttribute("color");
    }
    set color(val) {
        this.setAttribute('color', val)
    }

    connectedCallback() {
        this.render();
        const nextButton = this.shadow.querySelector('.next');
        const sizeSelect = this.shadow.querySelector('#sizeSelect');
        const bgColorPicker = this.shadow.querySelector('#bgColorPicker');
        const bgColorInput = this.shadow.querySelector('#bgColorInput');
        nextButton.addEventListener('click', this.updateStep.bind(this));
        sizeSelect.addEventListener('change', this.updateSize.bind(this) );
        bgColorInput.addEventListener('change', this.updateColor.bind(this) );
        bgColorPicker.addEventListener('change', this.updateColor.bind(this) );
    }

    disconnectedCallback() {
        const nextButton = this.shadow.querySelector('.next');
        const sizeSelect = this.shadow.querySelector('#sizeSelect');
        const bgColorPicker = this.shadow.querySelector('#bgColorPicker');
        const bgColorInput = this.shadow.querySelector('#bgColorInput');
        nextButton.removeEventListener('click', this.updateStep.bind(this));
        sizeSelect.removeEventListener('change', this.updateSize.bind(this));
        bgColorInput.removeEventListener('change', this.updateColor.bind(this) );
        bgColorPicker.removeEventListener('change', this.updateColor.bind(this) );
    }
    
    //Methods
    updateStep(e) {
        const event = new CustomEvent('updateStep', {
            detail: {
                step: e.target.dataset.newStep
            },
            bubbles: true,
            composed: true,
		    cancelable: true
        });
        e.target.dispatchEvent(event);
    }
    updateSize(e) {
        const event = new CustomEvent('updateSize', {
            detail: {
                size: e.target.value
            },
            bubbles: true,
            composed: true,
            cancelable: true
        });
        e.target.dispatchEvent(event);
    }
    updateColor(e) {
        const event = new CustomEvent('updateColor', {
            detail: {
                color: e.target.value
            },
            bubbles: true,
            composed: true,
            cancelable: true
        });
        e.target.dispatchEvent(event);
    }


}

customElements.define('step-one', StepOne);
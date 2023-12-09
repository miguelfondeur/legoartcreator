//import '../Forms/_colorpicker.js';
import { platePickerData } from '../../../data/plateColorPicker.js';
// import '../Modal.js';
// import '../ImageWidget.js';

export default class StepOne extends HTMLElement {
    render() {
        this.innerHTML = /*html*/ `
            <style>
                .active-color {
                    outline: 2px solid #006DBC;
                }
            </style>
            <div class="step-body">
                <h2 class="text-xl mb-4">Canvas</h2>
                <div class="w-full mb-2">
                    <label class="w-auto text-sm text-gray-800 font-bold" for="sizeSelect">Size:</label>
                    <!-- <p class="resize-warning">Are you sure you want to select a new canvas size? Doing so will erase your progress.</p> -->
                    <select name="sizeSelect" id="sizeSelect" class="h-10 border-2 border-gray-800 px-3 py-2 rounded-full w-full" >
                        <option value="160" ${this.size === '160' ? 'selected' : ''}>16 X 16 Small</option>
                        <option value="320" ${this.size === '320' ? 'selected' : ''}>32 X 48 Standard</option>
                        <option value="480" ${this.size === '480' ? 'selected' : ''}>48 X 48 Standard</option>
                        <option value="960" ${this.size === '960' ? 'selected' : ''}>48 X 96 Wide</option>
                        <option value="1440" ${this.size === '1440' ? 'selected' : ''}>48 X 144 Ultra Wide</option>
                    </select>
                </div>
                
                <div class="w-full mb-2">
                    <label class="w-auto text-sm text-gray-800">Frame Color:</label>
                    <div class="rounded-md flex bg-white shadow-xs p-2">
                        <div class="flex">
                            <div class="cursor-pointer w-6 h-6 rounded-full m-05 border-2 border-gray-300 active-color ${ this.frameColor === "Black" ? 'active-color' : ''}"
                                style="background-color: rgb(0,0,0)"
                                title="Black Frame"
                                data-frame="Black"
                                data-framergb="0,0,0"
                                tabindex="0"
                            ></div>
                            <div class="cursor-pointer w-6 h-6 rounded-full m-05 border-2 border-gray-300 ${ this.frameColor === "White" ? 'active-color' : ''}"
                                style="background-color: rgb(255,255,255)"
                                title="White Frame"
                                data-frame="White"
                                data-framergb="255,255,255"
                                tabindex="0"
                            ></div>
                        </div>
                    </div>
                </div>

                <div class="w-full mb-2">
                    <label class="w-auto text-sm text-gray-800">Canvas Color:</label>
                    <div class="rounded-md flex bg-white shadow-xs p-2">
                        ${ platePickerData.map(color => ` 
                            <div class="flex flex-col">
                                <div class="cursor-pointer w-6 h-6 rounded-full m-05 border-2 border-gray-300 ${ color.name === this.canvasColor ? 'active-color' : ''}"
                                    style="background-color: rgb(${color.rgb})"
                                    title="${color.name}"
                                    data-rgb="${color.rgb}"
                                    data-element="${color.id.element}"
                                    tabindex="0"
                                ></div>
                            </div>`
                        ).join('')}
                    </div>
                </div>

            </div>`
    }

    //Constructor
    constructor() {
        super();

        this.activeColor = "6284070";
        this.canvasColor = "Black";
        this.frameColor = "Black";
    }

    static get observedAttributes() {
        return ['size', 'color','frame'];       
    }

    //Life Cycle Hooks
    attributeChangedCallback(prop, oldVal, newVal) {
        if (prop === 'size') {
            //this.render() 
        }
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
    get frame() {
        return this.getAttribute("frame");
    }
    set frame(val) {
        this.setAttribute('frame', val)
    }

    connectedCallback() {
        this.render();
        const sizeSelect = this.querySelector('#sizeSelect');
        const colorElements = this.querySelectorAll('[data-rgb]');
        const frameElements = this.querySelectorAll('[data-frame]');
        
        //Update Size on Click
        sizeSelect.addEventListener('change', e =>{
            this.size = e.target.value;
            const event = new CustomEvent('updateSize', {
                detail: {
                    size: e.target.value
                },
                bubbles: true,
                composed: true,
                cancelable: true
            });
            e.target.dispatchEvent(event);
        });

        colorElements.forEach( (elem,i) => {
            elem.addEventListener('click', event => {
                colorElements.forEach(item => {
                    item.classList.remove('active-color');
                })
                //Set Active Color
                this.activeColor = colorElements[i].dataset.element;
                //Update class
                if(this.activeColor === colorElements[i].dataset.element) {
                    colorElements[i].classList.add('active-color');
                }

                this.setAttribute('color', event.target.dataset.rgb)
                //send event to update canvas and svg
                this.updateColor(event)
            })
        })

        frameElements.forEach(elem => {
            elem.addEventListener('click', event => {
                this.setAttribute('frame', event.target.dataset.rgb)
                //send event to update canvas and svg
                this.updateFrame(event)
            })
        })
    }
    
    //Methods
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
                color: e.target.dataset.rgb
            },
            bubbles: true,
            composed: true,
            cancelable: true
        });
        e.target.dispatchEvent(event);
    }

    updateFrame(e) {
        const event = new CustomEvent('updateFrame', {
            detail: {
                color: e.target.dataset.framergb
            },
            bubbles: true,
            composed: true,
            cancelable: true
        });
        e.target.dispatchEvent(event);
    }
    
    resetCanvas(e) {
        //Reset color picker
        this.querySelector('color-picker').resetPicker();
        //Send Event Up
        const event = new CustomEvent('resetCanvas', {
            bubbles: true,
            composed: true,
            cancelable: true
        });
        e.target.dispatchEvent(event);
    }

}

customElements.define('step-one', StepOne);
import { platePickerData } from '../../data/plateColorPicker.js';

export default class ColorPicker extends HTMLElement {
    
    render() {
        this.shadow.innerHTML = /*html*/ `
            <style>
                @import url("/dist/css/main.css");
                [data-open="false"] { display: none; }
                [data-open="true"] { display: block; }
                [data-icon-dark="true"] { color: white; }
            </style>
            <div class="mb-3">
                <label class="inline w-auto text-sm text-gray-800 font-bold" for="color-picker" >Canvas Color:</label>
                <div class="flex flex-row relative w-min">
                    <!-- Color Name -->
                    <input id="color-picker" 
                        readonly
                        class="cursor-pointer border border-gray-800 px-3 py-2 rounded-full" 
                        value="${this.name}"
                    >

                    <!-- Color Picker Trigger -->
                    <button id="color-picker-trigger" 
                        class="cursor-pointer rounded-full ml-2 my-auto h-10 w-10 flex border border-gray-300" 
                        style="background-color: rgb(${this.color});" 
                    >
                        <svg viewBox="0 0 24 24"
                             stroke="currentColor"
                             fill="none"  
                             data-icon-dark="${ this.dark }"
                             class="h-6 w-6 mx-auto my-auto"  
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                        </svg>
                    </button>

                    <!-- Colors Popup -->
                    <div data-open="false" 
                        id="color-picker-dropdown"
                        class="border border-gray-500 w-min origin-top-right absolute left-0 top-full mt-1 rounded-md shadow-lg"
                    >
                        <div class="rounded-md flex bg-white shadow-xs p-2">
                            ${ platePickerData.map(color => ` 
                                <div class="flex flex-col">
                                    <div class="cursor-pointer w-6 h-6 rounded-full m-05 border border-gray-300"
                                        style="background-color: rgb(${color.rgb})"
                                        title="${color.name}"
                                        data-rgb="${color.rgb}"
                                        data-name="${color.name}"
                                        data-dark="${color.isDark}"
                                        tabindex="0"
                                    ></div>
                                </div>`
                            ).join('')}
                        </div>
                    </div>
                </div>
            </div>` 
    };

    constructor() {
        super();
        //attach root
        this.shadow = this.attachShadow({ mode: 'open' });

        //initial data
        this.name = 'black';
        this.color = [0,0,0];
        this.dark = true;
    }

    static get observedAttributes() {
        return ['name', 'color', 'dark'];       
    }

    //Life Cycle Hooks
    attributeChangedCallback(prop, oldVal, newVal) {
        if (prop === 'name') {
            const pickerInput = this.shadowRoot.querySelector('#color-picker');
            if(pickerInput) {
                pickerInput.value = newVal;
            }
        }

        //Will not persist because we're literally re-rendering every time we update the props
        if (prop === 'color') {
            const pickerTrigger = this.shadowRoot.querySelector('#color-picker-trigger'); 
            if(pickerTrigger) {
                pickerTrigger.style.backgroundColor = `rgb(${newVal})`;
            }
        }

        if (prop === 'dark') {
            const pickerIcon = this.shadowRoot.querySelector('[data-icon-dark]');
            if(pickerIcon) {
                pickerIcon.dataset.iconDark = newVal;
            }
        }
    }

    get color() {
        return this.getAttribute("color");
    }
    set color(val) {
        this.setAttribute('color', val)
    }

    connectedCallback() {
        //render
        this.render();
        if(this.shadowRoot.querySelector('#wrapper')) {
            this.shadowRoot.querySelector('#wrapper').style.width = this.size+'px';
        }

        //Event Listeners
        const root = document.documentElement;
        const pickerTrigger = this.shadowRoot.querySelector('#color-picker-trigger'); 
        const pickerInput = this.shadowRoot.querySelector('#color-picker');
        const pickerDropdown = this.shadowRoot.querySelector('#color-picker-dropdown');
        const colorElements = this.shadowRoot.querySelectorAll('[data-rgb]')

        pickerTrigger.addEventListener('click', ()=> {
            pickerDropdown.dataset.open = pickerDropdown.dataset.open === "false" ? true : false;
        });

        pickerInput.addEventListener('click', ()=> {
            pickerDropdown.dataset.open = pickerDropdown.dataset.open === "false" ? true : false;
        });

        colorElements.forEach(elem => {
            elem.addEventListener('click', event => {
                this.setAttribute('color', event.target.dataset.rgb)
                this.setAttribute('name', event.target.dataset.name)
                this.setAttribute('dark', event.target.dataset.dark)
                //close
                pickerDropdown.dataset.open = pickerDropdown.dataset.open === "false" ? true : false;
                //send event to update canvas and svg
                this.updateColor(event)
            })
        })
    }

    disconnectedCallback() {
        
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

    resetPicker() {
        //initial values
        this.setAttribute('name', 'black');
        this.setAttribute('color', [0,0,0]);
        this.setAttribute('dark', true);
    }

}

customElements.define('color-picker', ColorPicker);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
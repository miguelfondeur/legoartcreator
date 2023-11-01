import { allBrickColors } from '../../data/allBrickColors.js';

export default class StepThree extends HTMLElement {
    constructor() {
        super();
    
        //data
        this.data = {

        }

        this.unique = [];
        this.activeColor = "6284070";
        this.drawMode = true; //default
        this.paintMode = false;
    }

    static get observedAttributes() {
        return ['count', 'color', 'name', 'avatar', 'unique'];       
    }

    //getters
    
    //setters
    
    render() {
        this.innerHTML = /*html*/ `
            <style>
                .half-square {
                    height: 50%;
                    width: 50%;
                }
                .step-footer {
                    border-top: 1px solid #e5e5e5;
                    display: flex;
                    justify-content: space-between;
                }
                .active-color {
                    outline: 2px solid #006DBC;
                }
                button.active {
                    color: #fff;
                    border-color: #006db7;
                    background-color: rgba(0, 109, 183, 1);
                }
            </style>
            <div class="flex flex-col justify-center pb-1">
                <h2 class="text-xl mb-4">Edit</h2>
                <div class="mb-3">
                    <label class="inline-flex items-center mr-2" for="trace">
                        <span class="mr-2">Trace Image</span> 
                        <input class="accent-[rgb(50,50,50)]" checked type="checkbox" id="trace" name="mode" value="trace" />
                    </label>
                </div>
                <button id="drawButton" class="active cursor-pointer flex justify-center w-full p-2 border-2 border-black shadow-sm text-sm font-bold rounded-xl text-black bg-white mb-3">
                    Draw Brick
                </button>
                <button id="paintButton" class="cursor-pointer flex justify-center w-full p-2 border-2 border-black shadow-sm text-sm font-bold rounded-xl text-black bg-white mb-3">
                    Paint Bricks by Color
                </button>
                <!-- Upload Image -->
                <div class="flex flex-col w-full text-sm font-bold rounded-md text-black mb-4">
                    <p class="m-0">Select Brick Color</p>
                    <div class="flex flex-wrap mt-2">
                        ${ allBrickColors.map(group => `
                            <div class="flex flex-col">
                                ${ group.map(color => `
                                    <div class="w-6 h-6 rounded-full border-box text-white border m-0.5 relative ${ color.id.element === this.activeColor ? 'active-color' : ''}"
                                            alt="${color.name}"
                                            title="${color.name}"
                                            data-element="${color.id.element}"
                                            id="${color.id.element}"
                                            data-rgb="${color.rgb}"
                                            data-alpha="${color.alpha}"
                                            tabindex="0" 
                                    >
                                        <div class="w-full h-full absolute z-0 rounded-full overflow-hidden">
                                            <span class="absolute bg-black right-1 top-0 half-square rounded-tr-full"></span>
                                            <span class="absolute bg-black left-1 bottom-0 half-square rounded-bl-full"></span>
                                        </div>
                                        <div class="relative text-gray-300 border z-10 cursor-pointer top-0 left-0 w-full h-full rounded-full"
                                            style="background-color: rgba(${color.rgb},${color.alpha})"
                                        ></div>
                                    </div>`
                                ).join('')}
                            </div>` 
                        ).join('')}
                    </div>
                </div>
                <!-- Reset -->
                <button id="resetButton" class="cursor-pointer flex justify-center w-full p-2 border-2 border-black shadow-sm text-sm font-bold rounded-xl text-black bg-white mb-3">
                    Reset All Bricks
                </button>
            </div>`;
    }

    //methods
    updateGroupColors(data) {
        console.log('hooooo');
        this.unique = data;  // Store the data for potential later use
        //Must rerender for now
        let list = this.querySelector('#unique-wrapper');
        //Add Unque Colors
        if(list) {
            list.innerHTML = data.map(color => `
                <div class="cursor-pointer w-6 h-6 rounded-full m-05 border border-gray-300"
                    style="background-color: ${color}"
                    title="${color}"
                    tabindex="0"
                ></div>`
            ).join('');
        }
    }

    //Life Cycle Hooks
    attributeChangedCallback(prop, oldVal, newVal) {
        
    }

    previousStep() {
        document.querySelector('mosaic-editor').setAttribute('step', 3);
    }
    nextStep() {
        document.querySelector('mosaic-editor').setAttribute('step', 5);
    }

    connectedCallback() {
        //render
        this.render();
        this.drawButton = this.querySelector('#drawButton');;
        this.paintButton = this.querySelector('#paintButton');;
        
        this.drawButton.addEventListener('click', this.handleDraw.bind(this));
        this.paintButton.addEventListener('click', this.handlePaint.bind(this));
        
        const colorElements = this.querySelectorAll('[data-element]');

        this.querySelector('#resetButton').addEventListener('click', (e) => {
            const event = new CustomEvent('handleResetBricks', {
                bubbles: true,
                composed: true,
                cancelable: true
            });
            e.target.dispatchEvent(event);      
        });

        //Update Trace Mode
        this.querySelector('#trace').addEventListener('change', (e) => {
            const event = new CustomEvent('updateTraceMode', {
                detail: {
                    trace: e.target.checked,
                },
                bubbles: true,
                composed: true,
                cancelable: true
            });
            e.target.dispatchEvent(event);
        })
        
        colorElements.forEach( (elem, i) => {
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
                //send event to update canvas and svg
                this.updateActiveColor(event, colorElements[i].dataset.rgb, colorElements[i].dataset.alpha )
            })
        })
    }

    updateActiveColor(e, rgb, alpha) {
        // e.preventDefault(); //Just in case
        const event = new CustomEvent('updateActiveColor', {
            detail: {
                color: rgb,
                alpha: alpha,
            },
            bubbles: true,
            composed: true,
            cancelable: true
        });
        e.target.dispatchEvent(event);
    }

    handleDraw(e) {
        this.drawButton.classList.toggle('active');
        this.drawMode = !this.drawMode; 
        this.paintButton.classList.remove('active');
        this.paintMode = false;
        //Send Event
        const event = new CustomEvent('updateDrawMode', {
            detail: {
                drawMode: true,
                paintMode: false,
            },
            bubbles: true,
            composed: true,
            cancelable: true
        });
        if(this.drawMode) e.target.dispatchEvent(event);
    }

    handlePaint(e) {
        this.paintButton.classList.toggle('active');
        this.paintMode = !this.paintMode; 
        this.drawButton.classList.remove('active');
        this.drawMode = false;
        //Send Event
        const event = new CustomEvent('updatePaintMode', {
            detail: {
                drawMode: false,
                paintMode: true,
            },
            bubbles: true,
            composed: true,
            cancelable: true
        });
        if(this.paintMode) e.target.dispatchEvent(event);
    }

}

customElements.define('step-three', StepThree);
import './_canvas.js';
import './_step-1.js';
import './_step-2.js';
import './_step-3.js';
import './_step-4.js';
import './_step-5.js';

export default class Editor extends HTMLElement {

    //Teamplte
    render() {
        this.shadow.innerHTML = /*html*/`
            <style>
                * { box-sizing: border-box; }
                .dashboard {
                    background-color: white;
                    width: 500px;
                    margin: 0 auto;
                    border-bottom-right-radius: 15px;
                    border-bottom-left-radius: 15px;
                }
                .steps {
                    border-bottom: 1px solid #e5e5e5;
                    display: flex;
                    justify-content: space-between;
                    list-style: none;
                    margin: 0;
                    padding: 10px 20px;
                }
                .steps li {
                    height: 30px;
                    width: 30px;
                    border: 2px solid #bbb;
                    color: #bbb;
                    border-radius: 100%;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    font-size: 18px;
                }
                .steps li.active {
                    animation: pulse-animation 1.5s infinite;
                    border-color: #006db7;
                    background-color: #006db7;
                    color: white;
                }
                @keyframes pulse-animation {
                    0% {
                        box-shadow: 0 0 0 0px rgba(0, 73, 123, 0.5);
                    }
                    100% {
                        box-shadow: 0 0 0 10px rgba(0, 73, 123, 0);
                    }
                }
            </style>
            <div>
                <mosaic-canvas size="${this.size}"></mosaic-canvas>

                <div class="dashboard"> 
                    
                    <ul class="steps">
                        <li class="${parseFloat(this.step) === 1 ? 'active' : ''}">1</li>
                        <li class="${parseFloat(this.step) === 2 ? 'active' : ''}">2</li>
                        <li class="${parseFloat(this.step) === 3 ? 'active' : ''}">3</li>
                        <li class="${parseFloat(this.step) === 4 ? 'active' : ''}">4</li>
                        <li class="${parseFloat(this.step) === 5 ? 'active' : ''}">5</li>
                    </ul>

                    ${ parseFloat(this.step) === 1 ? '<step-one size="'+ this.size +'" color="'+ this.color +'"></step-one>' : '' }
                    ${ parseFloat(this.step) === 2 ? '<step-two></step-two>' : '' }
                    ${ parseFloat(this.step) === 3 ? '<step-three></step-three>' : '' }
                    ${ parseFloat(this.step) === 4 ? '<step-four></step-four>' : '' }
                    ${ parseFloat(this.step) === 5 ? '<step-five></step-five>' : '' }
                </div>
            </div>
        `;
    }

    //Stage: Component Created
    constructor() {
        super(); //this is needed to inherit HTMLElement properties and is standard JS

        //attach root
        this.shadow = this.attachShadow({ mode: 'open' }); //open means accessible from the outside

        //static data
        this.styles = getComputedStyle(document.documentElement);
        this.canvasBG = this.styles.getPropertyValue('--canvas-bg');
        this.canvasSVG = this.styles.getPropertyValue('--canvas-svg');
    }

    static get observedAttributes() {
        return ['step', 'size', 'color'];       
    }

    //Life Cycle Hooks
    attributeChangedCallback(prop, oldVal, newVal) {
        //Will not persist because we're literally re-rendering every time we update the props
        if (prop === 'step') this.render();
        if (prop === 'size') this.render()
        if (prop === 'color') this.render()
    }

    //Getters and Setters
    get step() {
        return this.getAttribute("step");
    }
    set step(val) {
        this.setAttribute('step', val)
    }

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

    // Stage: 'Component now connected to DOM'
    connectedCallback() {
        this.render(); //renders your custom element to the DOM

        //listen to events
        this.shadow.addEventListener('updateStep', (e)=> this.setAttribute('step', e.detail.step) );
        this.shadow.addEventListener('updateSize', (e)=> this.setAttribute('size', e.detail.size) );
        this.shadow.addEventListener('updateColor', this.updateColor.bind(this) );
    }

    disconnectedCallback() {
        
    }

    //methods
    updateColor(e) {
        this.setAttribute('color', e.detail.color);
        document.documentElement.style.setProperty('--canvas-svg', e.detail.color);
    }
}

customElements.define('mosaic-editor', Editor);
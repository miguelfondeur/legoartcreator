import eventDispatcher from '../EventDispatcher/sharedEventDispatcher.js';

export default class Project extends HTMLElement {

    //Stage: Component Created
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'open' });

        //Initial Data
        this.activeView = 'creator';

        //Template
        shadow.innerHTML = `
            <style>
                .flex { display: flex; }
                .relative { position: relative; }
                .min-h-full { min-height: 100%; }
            </style>
            <section class="flex min-h-full relative">
                <slot name="header"></slot>
                
                <slot name="project"></slot>
            </section>`
    }

    //Life Cycle Hooks
    attributeChangedCallback(prop, oldVal, newVal) {

    }

    // Stage: 'Component now connected to DOM'
    connectedCallback() {

        //listen to events  
        
        //this.initialize();
    }

    //Functions
}

customElements.define('mosaic-project', Project);
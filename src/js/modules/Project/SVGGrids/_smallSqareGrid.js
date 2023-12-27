export default class SmallSquareGrid extends HTMLElement {
    render() {
        this.innerHTML = /*html*/ `
            <svg width="480" height="480" xmlns="http://www.w3.org/2000/svg">
                <!-- Define the horizontal lines -->
                <g stroke="currentColor">
                <!-- Draw 48 horizontal lines -->
                <line x1="0" y1="30" x2="480" y2="30" />
                <line x1="0" y1="60" x2="480" y2="60" />
                <line x1="0" y1="90" x2="480" y2="90" />
                <line x1="0" y1="120" x2="480" y2="120" />
                <line x1="0" y1="150" x2="480" y2="150" />
                <line x1="0" y1="180" x2="480" y2="180" />
                <line x1="0" y1="210" x2="480" y2="210" />
                <line x1="0" y1="240" x2="480" y2="240" />
                <line x1="0" y1="270" x2="480" y2="270" />
                <line x1="0" y1="300" x2="480" y2="300" />
                <line x1="0" y1="330" x2="480" y2="330" />
                <line x1="0" y1="360" x2="480" y2="360" />
                <line x1="0" y1="390" x2="480" y2="390" />
                <line x1="0" y1="420" x2="480" y2="420" />
                <line x1="0" y1="450" x2="480" y2="450" />
                <line x1="0" y1="480" x2="480" y2="480" />
                <!-- Repeat this pattern to create all 48 horizontal lines -->
                </g>
                
                <!-- Define the vertical lines -->
                <g stroke="currentColor">
                <!-- Draw 48 vertical lines -->
                <line y1="0" x1="30" y2="480" x2="30" />
                <line y1="0" x1="60" y2="480" x2="60" />
                <line y1="0" x1="90" y2="480" x2="90" />
                <line y1="0" x1="120" y2="480" x2="120" />
                <line y1="0" x1="150" y2="480" x2="150" />
                <line y1="0" x1="180" y2="480" x2="180" />
                <line y1="0" x1="210" y2="480" x2="210" />
                <line y1="0" x1="240" y2="480" x2="240" />
                <line y1="0" x1="270" y2="480" x2="270" />
                <line y1="0" x1="300" y2="480" x2="300" />
                <line y1="0" x1="330" y2="480" x2="330" />
                <line y1="0" x1="360" y2="480" x2="360" />
                <line y1="0" x1="390" y2="480" x2="390" />
                <line y1="0" x1="420" y2="480" x2="420" />
                <line y1="0" x1="450" y2="480" x2="450" />
                <line y1="0" x1="480" y2="480" x2="480" />
                <!-- Repeat this pattern to create all 48 vertical lines -->
                </g>
            </svg>`
    }

    constructor() {
        super();

        //attach root
        //this.shadow = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }
}

customElements.define('small-square-grid', SmallSquareGrid );
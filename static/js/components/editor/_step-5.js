export default class StepFive extends HTMLElement {
    constructor() {
        super();
    
        //data
        this.data = {

        }

        //attach root
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['count', 'color', 'name', 'avatar'];       
    }

    //getters
    
    //setters
    
    render() {
        this.shadow.innerHTML = /*html*/`
            <style>
                .step-body, .step-footer {
                    padding: 20px;
                }
                .step-footer {
                    border-top: 1px solid #e5e5e5;
                    display: flex;
                    justify-content: space-between;
                }
                button {
                    height: 30px;
                    border-radius: 50px;
                    border: 2px solid black;
                    padding: 0 15px;
                    font-weight: bold;
                }
                .step-body > h3 {
                    margin: 0;
                }
            </style>
            <div class="step-body">
                <h3>Step 5: Save Your Art</h3>
            </div>
            <div class="step-footer">
                <button role="button" class="previous">Edit Art</button>
                <button role="button" class="next">Save & Share</button>
            </div>
        `;
    }

    //methods
    methods() {
        return {

        };
    }

    //Life Cycle Hooks
    attributeChangedCallback(prop, oldVal, newVal) {
        
    }

    previousStep() {
        document.querySelector('mosaic-editor').setAttribute('step', 4);
    }
    nextStep() {
        document.querySelector('mosaic-editor').setAttribute('step', 5);
    }

    connectedCallback() {
        //render
        this.render();
        let nextButton = this.shadow.querySelector('.next');
        let previousButton = this.shadow.querySelector('.previous');
        nextButton.addEventListener('click', this.nextStep.bind(this));
        previousButton.addEventListener('click', this.previousStep.bind(this));
    }


    disconnectedCallback() {
        
    }
}

customElements.define('step-five', StepFive);
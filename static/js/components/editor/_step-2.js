export default class StepTwo extends HTMLElement {
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
            * {
                    box-sizing: border-box;
                }
                .step-body {
                    background-color: #efefef;
                    padding-bottom: 10px;
                }
                .step-body, .step-footer {
                    padding: 10px 20px;
                }
                .step-body > h3, .form-group {
                    margin: 0 0 10px;
                }
                .form-group {
                    max-width: 50%;
                    margin-bottom: 10px;
                }
                .form-group label, .form-group p {
                    display: block;
                    margin-bottom: 5px;
                    font-size: 14px;
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
                    cursor: pointer;
                }
                select {
                    height: 30px;
                    border-radius: 50px;
                    padding: 0 15px;
                    background-color: #fff;
                    width: 100%;
                }
                p {
                    margin: 0;
                }
                .color-picker {
                    display: flex;
                }
                .color-picker input[type="text"]{
                    flex-grow: 1;
                    height: 30px;
                    padding: 0 15px;
                    border-top-left-radius: 50px;
                    border-bottom-left-radius: 50px;
                    border: 1px solid black;
                    border-right: 0;
                }
                input:focus, select:focus {
                    outline: none;
                }
            </style>
            <div class="step-body">
                <h3>Your Image</h3>
                <div class="form-group">
                    <label>Upload Your Image:</label>
                    <input id="imgUrl" type='file'>
                </div>
                <div class="form-group">
                    <p>Edit Image:</p>
                    <button>Resize Image</button>
                    <button>Move Image</button>
                </div>
                <p class="img-msg"></p>
            </div>
            <div class="step-footer">
                <button role="button" class="previous">Choose Canvas</button>
                <button role="button" class="next">Convert to Pixels</button>
            </div>
        `;
    }

    //Life Cycle Hooks
    attributeChangedCallback(prop, oldVal, newVal) {
        
    }

    previousStep() {
        document.querySelector('mosaic-editor').setAttribute('step', 1);
    }
    nextStep() {
        document.querySelector('mosaic-editor').setAttribute('step', 3);
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

    //methods
    updateStep(e) {
        // e.preventDefault(); //Just in case
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
}

customElements.define('step-two', StepTwo);
import eventDispatcher from '../../EventDispatcher/sharedEventDispatcher.js';
import projectWorker from '../../../webWorkers/projectWorker.js';
import './_canvas.js';
import './_step-1.js';
import './_step-2.js';
import './_step-3.js';

export default class Editor extends HTMLElement {
    //Teamplte
    render() {
        this.innerHTML = `
            <style>
                step-one, step-two, step-three, step-four { display: none; }
                dialog[step="1"] > step-one { display: block }
                dialog[step="2"] > step-two { display: block }
                dialog[step="3"] > step-three { display: block }
                dialog[step="4"] { display: none }
                #step-progress { 
                    width: calc(100% - 40px);
                    background-color: rgb(209 213 219);
                    left: 4px;
                }
            </style>
            <div class="flex min-h-full relative">
                <!-- Sidebar -->
                <aside class="backdrop-blur-sm min-w-[72px] flex-col flex px-4 text-sm flex-shrink-0 pt-14 bg-zinc-100/80 z-40 top-0 left-0 h-[calc(100%-50px)] absolute" id="dashboard-steps" step="${this.step}">
                    <button 
                        class="cursor-pointer flex flex-col items-center justify-center py-3 text-sky-700" 
                        data-step="1"
                        onclick="updateStep(1)"
                    >
                        <svg class="w-6" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M13.3805 14H2.61948C2.26978 14 2 13.7302 2 13.3905V2.61948C2 2.27977 2.27977 2 2.61948 2H13.3805C13.7202 2 14 2.27977 14 2.61948V13.3805C14 13.7302 13.7202 14 13.3805 14Z" stroke="currentColor" stroke-miterlimit="10"></path><path d="M8 2V14" stroke="currentColor" stroke-miterlimit="10"></path><path d="M14 8H8" stroke="currentColor" stroke-miterlimit="10"></path></svg>
                        Canvas
                    </button>
                    <button 
                        class="cursor-pointer flex flex-col items-center justify-center py-3"
                        data-step="2"
                        onclick="updateStep(2)"
                    >
                        <svg viewBox="0 0 40 40" fill="currentColor" class="w-6" data-testid="MediaImageO"><path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M3.944 3h32.112a.944.944 0 0 1 .944.944v32.112a.945.945 0 0 1-.944.944H3.944A.944.944 0 0 1 3 36.056V3.944A.944.944 0 0 1 3.944 3ZM34 24.466V6H6v24.405l7.649-10.467a2.3 2.3 0 0 1 3.702-.01l1.707 2.355L24.028 15a2.3 2.3 0 0 1 3.81.044L34 24.466Zm0 5.48L25.904 17.56l-4.96 7.269 6.918 9.338H34v-4.22Zm-9.872 4.22-8.622-11.638-8.535 11.639h17.157Z"></path></svg>
                        Image
                    </button>
                    <button class="cursor-pointer flex flex-col items-center justify-center py-3" 
                            data-step="3"
                            onclick="updateStep(3)">
                        <svg class="w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                    </button>
                    <button class="cursor-pointer flex flex-col items-center justify-center py-3" 
                            data-step="4"
                            onclick="updateStep(4)">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
                        </svg>
                        Finish
                    </button>
                </aside>

                <dialog id="modal" open class="lg:block ml-[88px] mt-20 z-40 p-4 bg-white shadow-xl rounded-2xl w-80" step="1">
                    <button id="closeModal" class="absolute right-3 top-3 lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <!-- Steps -->
                    <step-one size="${this.size}"></step-one>
                    <step-two size="${this.size}" color="${ this.color }"></step-two>
                    <step-three color="${ this.color }"></step-three>
                    <step-four></step-four>
                </dialog>

                <!-- Canvas View -->
                <section id="canvas-view" class="w-full relative  mt-[56px] overflow-hidden">
                    <div id="mosaic-wrapper" class="absolute h-full w-full transition-all block overflow-auto">
                        <mosaic-canvas 
                            class="w-[calc(100vw+200px)] h-[calc(100vh+200px)] flex justify-center items-center pl-[78px] lg:pl-[440px] pr-4"
                            step="${this.step}" 
                            size="${this.size}" 
                            color="${ this.color }"
                        >
                        </mosaic-canvas>
                    </div>
                </section>

                <!-- Results View -->
                <section id="results-view" class="w-full flex flex-col items-center justify-center pl-[80px] !hidden">
                    <div class="bg-black p-[10px] mb-4">
                        <img id="previewImage" src="" alt="Project Preview" class="min-h-[240px] min-w-[240px]">
                    </div>
                    <button id="finishButton" class="text-lg max-w-[240px] cursor-pointer flex mb-1 w-full justify-center items-center py-3 shadow-sm rounded-full bg-orange-500 text-black">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-1.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
                        </svg>
                        Finish
                    </button>
                </section> 

                <!-- Footer Controls -->
                <footer id="footer-controls" class="backdrop-blur-sm h-[50px] z-40 absolute w-full bottom-0 left-0 bg-zinc-100/80 px-4 flex items-center justify-left">
                     <!-- Zoom -->
                    <div class="flex flex-col mt-1 justify-center mr-4">
                        <label class="flex items-center">
                            <input class="accent-[rgb(50,50,50)]" type="range" id="size-slider" min="1" max="2" step="0.1" value="1">
                            <span class="text-sm ml-2">100%</span> 
                        </label>
                    </div>
                    <!-- Show/Hide Image -->
                    <div class="flex items-center h-full px-4 text-black text-sm">
                        <label class=" cursor-pointer flex items-center" for="showImage">
                            Image
                            <input class="ml-2" type="checkbox" checked id="showImage">
                        </label>
                    </div>
                    <!-- Undo/Redo -->
                    <div class="w-full flex justify-center items-center text-sm">
                        <button id="undoButton" class="pointer-events-none inline-flex items-center text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3 mr-2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                            </svg>
                            <span>Undo</span>
                        </button>
                        <span class="mx-2 text-gray-400">|</span>
                        <button id="redoButton" class="pointer-events-none inline-flex items-center text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3 mr-2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" />
                            </svg>
                            <span>Redo</span>
                        </button>
                    </div>
                </footer>
            </div>
        </div>`
    }

    //Stage: Component Created
    constructor() {
        super(); //this is needed to inherit HTMLElement properties and is standard JS
        //Initial Data
        this.step = 1;
        this.size = 480;
        this.color = [0,0,0];
        //Get from local storage?
        window.updateStep = this.updateStep.bind(this);
    }

    //Life Cycle Hooks
    attributeChangedCallback(prop, oldVal, newVal) {
        //Will not persist because we're literally re-rendering every time we update the props
        if (prop === 'step') {
            const dash = this.querySelector('#dashboard-steps');
            const mosaic = this.querySelector('mosaic-canvas');
            if(mosaic && newVal !== "3") {
                mosaic.drawMode = false;
                mosaic.paintMode = false;
            }
        } 
        if (prop === 'size') {
            const mosaic = this.querySelector('mosaic-canvas');
            const stepTwo = this.querySelector('step-two');
            
            if(mosaic) mosaic.setAttribute('size', this.size );
            //if(stepOne) stepOne.setAttribute('size', this.size );
            if(stepTwo) stepTwo.setAttribute('size', this.size );
        }
        if (prop === 'color') {
            const mosaicCanvas = this.querySelector('mosaic-canvas');
            if(mosaicCanvas) {
                mosaicCanvas.color = this.color;
            }
        }
    }

    // Stage: 'Component now connected to DOM'
    connectedCallback() {
        this.render(); //renders your custom element to the DOM

        this.mosaic = this.querySelector('mosaic-canvas');
        this.mosaicView = this.querySelector('#mosaic-view');
        this.dialog = this.querySelector('dialog');
        this.stepButtons = this.querySelectorAll('[data-step]');
        this.showImage = this.querySelector('#showImage');
        this.previewImage = this.querySelector('#previewImage');
        this.finishButton = this.querySelector('#finishButton');
        this.closeModalButton = this.querySelector('#closeModal');
        this.sizeSlider = this.querySelector('#size-slider');

        this.updateScrollPosition();

        //Close Modal
        this.closeModalButton.addEventListener('click', () => {
            this.querySelector('#modal').classList.add('hidden');
            this.stepButtons.forEach(step => {
                step.classList.remove('text-sky-700');
            });
        });        

        //listen to events
        
        this.showImage.addEventListener('change', (e) => {
            this.mosaic.toggleShowImage(e.target.checked);
            this.querySelector('step-two').toggleImageSettings(e.target.checked);
        })

        this.finishButton.addEventListener('click', (e) => {
            eventDispatcher.dispatchEvent('finishProject');
        })

        this.sizeSlider.addEventListener('input', (e) => {
            this.updateMosaicViewScale();
        })

        this.addEventListener('updateSize', (e)=> {
            this.mosaic.size = e.detail.size 
        });
        
        this.addEventListener('updateColor', (e)=> {
            this.mosaic.color = e.detail.color;
        });

        this.addEventListener('updateFrame', (e)=> {
            this.mosaic.frame = e.detail.color;
        });

        this.addEventListener('handleResetBricks', (e)=> {
            this.mosaic.handleResetCanvas();
        });  

        this.addEventListener('handleSaturation', e=> {
            this.mosaic.handleSaturation(e.detail.value);
        })

        this.addEventListener('handleBrightness', e=> {
            this.mosaic.handleBrightness(e.detail.value);
        })

        this.addEventListener('handleContrast', e=> {
            this.mosaic.handleContrast(e.detail.value);
        })

        this.addEventListener('handleFlip', e=> {
            this.mosaic.handleFlipImage();
        })

        this.addEventListener('handleResetImage', (e)=> {
            this.mosaic.handleResetImage();
        });  
        
        this.addEventListener('handleZoom', (e)=> {
            this.mosaic.handleZoom(e.detail.factor);
        }); 

        this.addEventListener('handleRotate', (e)=> {
            this.mosaic.handleRotate(e.detail.factor);
        }); 

        this.addEventListener('updateDrawMode', event => {
            if(this.step === 3) {
                this.mosaic.drawMode = event.detail.drawMode;
                this.mosaic.paintMode = event.detail.paintMode;
            }
        })

        this.addEventListener('updatePaintMode', event => {
            if(this.step === 3) {
                this.mosaic.drawMode = event.detail.drawMode;
                this.mosaic.paintMode = event.detail.paintMode;
            }
        })

        this.addEventListener('handleDownload', event => {
            this.mosaic.handleDownload();
        })

        this.addEventListener('updateActiveColor', (event) => {
            this.mosaic.activeColor = event.detail.color;
            this.mosaic.activeColorAlpha = event.detail.alpha;
        })
        
        this.addEventListener('handleConvert', () => {
            this.showImage.checked = false;
            this.querySelector('step-two').toggleImageSettings(false);
            this.mosaic.convert();
        })
        //Trace Mode: Step Three
        this.addEventListener('updateTraceMode', (event) => {
            this.mosaic.toggleTraceMode(event.detail.trace);
        })

        this.addEventListener('handleConvertToLego', (event) => {
            this.mosaic.convertToLego(event);
        })

        this.addEventListener('lockImage', (event) => {
            this.mosaic.lockImage(event.detail.locked);
        })      

        //Get Image
        this.addEventListener('updateImage', (e) => {
            this.showImage.checked = true;
            this.mosaic.toggleShowImage(true)
            this.file = e.detail.image;
            //Do something with Canvas, call a function and pass the e.detail.image to it
            this.mosaic.image = e.detail.image;
            this.mosaic.draw();
        })

        this.addEventListener('resetCanvas', (e)=> {
            this.showImage.checked = true;
            this.mosaic.toggleShowImage(true)
            this.setAttribute('color', [0,0,0]);
            this.mosaic.handleResetCanvas();
        });
    }

    //Functions
    updateStep(step) {
        this.querySelector('#modal').classList.remove('hidden');
        this.step = step;
        this.dialog.setAttribute("step", step);

        this.stepButtons.forEach(step => {
            step.classList.remove('text-sky-700');
        });
        this.querySelector(`[data-step="${step}"]`).classList.add('text-sky-700');
        if(step == 3) {
            this.mosaic.drawMode = true;
            this.showImage.checked = false;
            this.mosaic.toggleShowImage(false);
        };
        if(step === 4) {
            this.mosaic.createImage();
            this.querySelector('#canvas-view').classList.add('!hidden');
            this.querySelector('#footer-controls').classList.add('!hidden');
            this.querySelector('#results-view').classList.remove('!hidden');
        } else {
            this.querySelector('#canvas-view').classList.remove('!hidden');
            this.querySelector('#footer-controls').classList.remove('!hidden');
            this.querySelector('#results-view').classList.add('!hidden');
        };
    };

    updateScrollPosition() {
        const parentDiv = this.querySelector('#mosaic-wrapper'); // Parent container with overflow
        const mosaicWrapper = this.querySelector('mosaic-canvas');
    
        // Calculate the center position of the scaled mosaic-wrapper
        const centerX = (mosaicWrapper.offsetWidth - parentDiv.offsetWidth) / 2;
        const centerY = (mosaicWrapper.offsetHeight - parentDiv.offsetHeight) / 2;
    
        // Scroll to the center of the mosaic-wrapper
        parentDiv.scrollTo(centerX, centerY);
    }

    // Function to update the scale of mosaic-view
    updateMosaicViewScale() {
        const scaleValue = this.sizeSlider.value;
        // Apply the scale transformation
        this.mosaic.style.transform = `scale(${scaleValue})`;
    }
}

customElements.define('mosaic-creator', Editor);
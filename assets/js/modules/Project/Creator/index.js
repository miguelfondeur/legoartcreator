import eventDispatcher from '../../EventDispatcher/sharedEventDispatcher.js';
import './_canvas.js';
import './_step-1.js';
import './_step-2.js';
import './_step-3.js';

class ProjectDataManager {
    static STORAGE_KEY = 'projectData';

    static async save(imageDataURL, mosaic, showImage, sizeSlider) {
        try {
            // Load existing project data to preserve isFinished flag
            const existingData = this.load();
            const projectData = {
                image: imageDataURL || (mosaic.image ? await this.imageToDataURL(mosaic.image) : null),
                bricks: mosaic.circles,
                settings: {
                    zoom: sizeSlider.value,
                },
                isConverted: mosaic.circles && mosaic.circles.length > 0 && !showImage.checked,
                isFinished: existingData ? existingData.isFinished : false
            };
            console.log('Saving project data:', projectData);
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(projectData));
            return projectData;
        } catch (error) {
            console.error('Error saving project data:', error);
            throw error;
        }
    }

    static load() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error loading project data:', error);
            return null;
        }
    }

    static async imageToDataURL(image) {
        return new Promise((resolve, reject) => {
            if (typeof image === 'string' && image.startsWith('data:')) {
                resolve(image);
                return;
            }

            if (image instanceof Image) {
                const canvas = document.createElement('canvas');
                canvas.width = image.width;
                canvas.height = image.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(image, 0, 0);
                resolve(canvas.toDataURL());
                return;
            }

            if (image instanceof File || image instanceof Blob) {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(image);
                return;
            }

            reject(new Error('Unsupported image type'));
        });
    }
}

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
                <aside class="backdrop-blur-sm min-w-[72px] flex-col flex px-4 text-sm flex-shrink-0 pt-20 bg-zinc-100/80 z-40 top-0 left-0 h-[calc(100%-50px)] absolute" id="dashboard-steps" step="${this.step}">
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
                            <input class="ml-2" type="checkbox" id="showImage">
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
        // Get size from localStorage or default to 480
        this.size = localStorage.getItem("size") || "480";
        this.color = [0,0,0];
        this.mosaic = null;
        this.file = null;
        //Get from local storage?
        window.updateStep = this.updateStep.bind(this);
    }

    //Life Cycle Hooks
    attributeChangedCallback(prop, oldVal, newVal) {
        if (oldVal === newVal) return; // Skip if no actual change

        const mosaic = this.querySelector('mosaic-canvas');
        const stepTwo = this.querySelector('step-two');

        switch(prop) {
            case 'step':
                if(mosaic && newVal !== "3") {
                    mosaic.drawMode = false;
                    mosaic.paintMode = false;
                }
                break;
            case 'size':
                if(mosaic) {
                    mosaic.setAttribute('size', this.size);
                }
                if(stepTwo) {
                    stepTwo.setAttribute('size', this.size);
                }
                break;
            case 'color':
                if(mosaic) {
                    mosaic.color = this.color;
                }
                break;
        }
    }

    // Stage: 'Component now connected to DOM'
    connectedCallback() {
        this.render();
        this.initializeElements();
        this.initializeEventListeners();
        this.initializeCanvasSize();
        this.updateScrollPosition();
        setTimeout(() => {
            this.restoreProjectData();
        }, 100);
    }

    disconnectedCallback() {
        // Clean up event listeners
        this.removeAllEventListeners();
    }

    // Helper methods
    initializeElements() {
        this.mosaic = this.querySelector('mosaic-canvas');
        this.mosaicView = this.querySelector('#mosaic-view');
        this.dialog = this.querySelector('dialog');
        this.stepButtons = this.querySelectorAll('[data-step]');
        this.showImage = this.querySelector('#showImage');
        this.previewImage = this.querySelector('#previewImage');
        this.finishButton = this.querySelector('#finishButton');
        this.closeModalButton = this.querySelector('#closeModal');
        this.sizeSlider = this.querySelector('#size-slider');
    }

    initializeCanvasSize() {
        // Set initial size from localStorage or default
        const savedSize = localStorage.getItem("size");
        if (savedSize) {
            this.size = savedSize;
            this.setAttribute('size', savedSize);
            if (this.mosaic) {
                this.mosaic.setAttribute('size', savedSize);
            }
        }
    }

    initializeEventListeners() {
        // Modal controls
        this.closeModalButton.addEventListener('click', this.handleCloseModal.bind(this));
        
        // Image controls
        this.showImage.addEventListener('change', this.handleShowImageChange.bind(this));
        
        // Project controls
        this.finishButton.addEventListener('click', this.handleFinishProject.bind(this));
        this.sizeSlider.addEventListener('input', this.updateMosaicViewScale.bind(this));

        // Canvas events
        this.initializeCanvasEventListeners();

        // Project image creation
        eventDispatcher.addEventListener('handleCreateImage', this.handleProjectImageCreation.bind(this));
    }

    initializeCanvasEventListeners() {
        const canvasEvents = {
            // Image manipulation events
            'updateImage': this.handleImageUpdate.bind(this),
            'handleConvertToLego': this.handleConvertToLego.bind(this),
            'handleConvert': this.handleConvert.bind(this),
            'handleResetCanvas': this.handleResetCanvas.bind(this),
            
            // Drawing mode events
            'updateDrawMode': this.handleDrawModeUpdate.bind(this),
            'updatePaintMode': this.handlePaintModeUpdate.bind(this),
            'updateActiveColor': this.handleActiveColorUpdate.bind(this),
            
            // Image adjustment events
            'handleSaturation': (e) => this.mosaic.handleSaturation(e.detail.value),
            'handleBrightness': (e) => this.mosaic.handleBrightness(e.detail.value),
            'handleContrast': (e) => this.mosaic.handleContrast(e.detail.value),
            'handleFlip': () => this.mosaic.handleFlipImage(),
            'handleResetImage': () => this.mosaic.handleResetImage(),
            'handleZoom': (e) => this.mosaic.handleZoom(e.detail.factor),
            'handleRotate': (e) => this.mosaic.handleRotate(e.detail.factor),
            
            // Other events
            'updateColor': (e) => this.mosaic.color = e.detail.color,
            'updateFrame': (e) => this.mosaic.frame = e.detail.color,
            'handleDownload': () => this.mosaic.handleDownload(),
            'updateTraceMode': (e) => this.mosaic.toggleTraceMode(e.detail.trace),
            'lockImage': (e) => this.mosaic.lockImage(e.detail.locked),
            'updateSize': this.handleSizeUpdate.bind(this)
        };

        // Add all canvas event listeners
        Object.entries(canvasEvents).forEach(([eventName, handler]) => {
            this.addEventListener(eventName, handler);
        });
    }

    // Event Handlers
    async handleImageUpdate(e) {
        console.log('Image update event received:', e.detail);
        this.showImage.checked = true;
        this.mosaic.toggleShowImage(true);
        this.file = e.detail.image;
        this.mosaic.image = e.detail.image;
        await this.mosaic.draw();
        
        try {
            const imageDataURL = typeof e.detail.image === 'string' && e.detail.image.startsWith('data:') 
                ? e.detail.image 
                : await this.imageToDataURL(e.detail.image);
            this.saveProjectData(imageDataURL);
        } catch (error) {
            console.error('Error saving image:', error);
        }
    }

    async handleConvertToLego(event) {
        console.log('Convert to Lego event received:', event);
        await this.mosaic.convertToLego(event);
        const imageDataURL = await this.imageToDataURL(this.mosaic.image);
        this.showImage.checked = false;
        this.mosaic.toggleShowImage(false);
        this.saveProjectData(imageDataURL);
        
        // Trigger the lock button click instead of dispatching a lock event
        const lockButton = this.querySelector('step-two').querySelector('#lock');
        if (lockButton) {
            lockButton.click();
        }

        // Only dispatch projectComplete event if the project is finished
        const projectData = ProjectDataManager.load();
        if (projectData && projectData.isFinished) {
            const projectCompleteEvent = new CustomEvent('projectComplete', {
                bubbles: true,
                composed: true,
                cancelable: true
            });
            this.dispatchEvent(projectCompleteEvent);
        }
    }

    handleConvert() {
        this.showImage.checked = false;
        this.querySelector('step-two').toggleImageSettings(false);
        this.mosaic.convert();
        this.saveProjectData();
    }

    handleResetCanvas() {
        this.showImage.checked = true;
        this.mosaic.toggleShowImage(true);
        this.setAttribute('color', [0,0,0]);
        this.mosaic.handleResetCanvas();
    }

    handleDrawModeUpdate(event) {
        if(this.step === 3) {
            this.mosaic.drawMode = event.detail.drawMode;
            this.mosaic.paintMode = event.detail.paintMode;
        }
    }

    handlePaintModeUpdate(event) {
        if(this.step === 3) {
            this.mosaic.drawMode = event.detail.drawMode;
            this.mosaic.paintMode = event.detail.paintMode;
        }
    }

    handleActiveColorUpdate(event) {
        this.mosaic.activeColor = event.detail.color;
        this.mosaic.activeColorAlpha = event.detail.alpha;
    }

    handleSizeUpdate(event) {
        if (this.mosaic) {
            this.mosaic.setAttribute('size', event.detail.size);
            this.size = event.detail.size;
        }
    }

    handleProjectImageCreation(e) {
        this.projectImgURL = e.dataURL;
        this.previewImage.src = this.projectImgURL;
        this.saveProjectData();
    }

    handleCloseModal() {
        this.querySelector('#modal').classList.add('hidden');
        this.stepButtons.forEach(step => {
            step.classList.remove('text-sky-700');
        });
    }

    handleShowImageChange(e) {
        this.mosaic.toggleShowImage(e.target.checked);
        this.querySelector('step-two').toggleImageSettings(e.target.checked);
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
            // Check if project is finished before allowing step 4
            const projectData = ProjectDataManager.load();
            if (!projectData || !projectData.isConverted) {
                alert('Please convert your image to Lego bricks before proceeding to the finish step.');
                this.step = 3;
                this.dialog.setAttribute("step", 3);
                this.querySelector(`[data-step="3"]`).classList.add('text-sky-700');
                return;
            }
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

    // Update imageToDataURL method to handle more cases
    async imageToDataURL(image) {
        return new Promise((resolve, reject) => {
            // If it's already a data URL, return it
            if (typeof image === 'string' && image.startsWith('data:')) {
                resolve(image);
                return;
            }

            // If it's an Image object, create a canvas to get the data URL
            if (image instanceof Image) {
                const canvas = document.createElement('canvas');
                canvas.width = image.width;
                canvas.height = image.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(image, 0, 0);
                resolve(canvas.toDataURL());
                return;
            }

            // If it's a File or Blob, use FileReader
            if (image instanceof File || image instanceof Blob) {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(image);
                return;
            }

            reject(new Error('Unsupported image type'));
        });
    }

    // Update saveProjectData to use ProjectDataManager
    async saveProjectData(imageDataURL = null) {
        return ProjectDataManager.save(imageDataURL, this.mosaic, this.showImage, this.sizeSlider);
    }

    // Update restoreProjectData to use ProjectDataManager
    async restoreProjectData() {
        try {
            const projectData = ProjectDataManager.load();
            console.log('Restoring project data:', projectData);
            
            if (!projectData) {
                console.log('No project data found in localStorage');
                return;
            }

            // Set initial checkbox state based on whether there's an image
            if (projectData.image) {
                this.showImage.checked = true;
                this.mosaic.toggleShowImage(true);
                // If there's an image but it hasn't been converted, set to step 2 and enable image settings
                if (!projectData.isConverted) {
                    this.updateStep(2);
                    const stepTwo = this.querySelector('step-two');
                    if (stepTwo) {
                        // Remove the disabled classes from the parent element
                        const imageSettings = stepTwo.querySelector('#image-settings');
                        if (imageSettings) {
                            imageSettings.classList.remove('text-zinc-300', 'pointer-events-none');
                        }
                        // Enable all buttons except the lock button
                        const buttons = imageSettings.querySelectorAll('button');
                        buttons.forEach(button => {
                            if (button.id !== 'lock') {
                                button.classList.remove('text-zinc-300', 'pointer-events-none');
                            }
                        });
                    }
                }
            } else {
                this.showImage.checked = false;
                this.mosaic.toggleShowImage(false);
            }

            // If the project was converted, set up the initial state
            if (projectData.isConverted && projectData.bricks) {
                console.log('Project was converted, setting up initial state');
                this.mosaic.circles = projectData.bricks;
                // Draw the bricks immediately
                await this.mosaic.drawCircles();
                
                // Trigger the lock button click instead of dispatching a lock event
                const lockButton = this.querySelector('step-two').querySelector('#lock');
                if (lockButton) {
                    lockButton.click();
                }

                // If the project is finished, enable the Buy Parts and Instructions buttons
                if (projectData.isFinished) {
                    const projectCompleteEvent = new CustomEvent('projectComplete', {
                        bubbles: true,
                        composed: true,
                        cancelable: true
                    });
                    this.dispatchEvent(projectCompleteEvent);
                } else {
                    // If converted but not finished, set to step 3
                    this.updateStep(3);
                    this.mosaic.drawMode = true;
                    this.showImage.checked = false;
                    this.mosaic.toggleShowImage(false);
                }
            }

            // Restore image if it exists
            if (projectData.image) {
                console.log('Restoring image from data URL');
                try {
                    const img = new Image();
                    img.onload = async () => {
                        this.file = img;
                        this.mosaic.image = img;
                        await this.mosaic.draw();
                    };
                    img.onerror = (error) => {
                        console.error('Error loading image:', error);
                    };
                    img.src = projectData.image;
                } catch (error) {
                    console.error('Error restoring image:', error);
                }
            }

            // Restore any other relevant project data
            if (projectData.settings) {
                if (projectData.settings.zoom) {
                    this.sizeSlider.value = projectData.settings.zoom;
                    this.updateMosaicViewScale();
                }
            }
        } catch (error) {
            console.error('Error restoring project data:', error);
        }
    }

    // Add new method to handle project finish
    async handleFinishProject() {
        const projectData = ProjectDataManager.load();
        if (projectData) {
            projectData.isFinished = true;
            localStorage.setItem('isFinished', 'true');
            await ProjectDataManager.save(projectData.image, this.mosaic, this.showImage, this.sizeSlider);
            eventDispatcher.dispatchEvent('finishProject');
        }
    }

    removeAllEventListeners() {
        // Remove all event listeners added in initializeEventListeners
        // This is a simplified version - you might want to store references to all listeners
        this.closeModalButton.removeEventListener('click', this.handleCloseModal);
        this.showImage.removeEventListener('change', this.handleShowImageChange);
        this.finishButton.removeEventListener('click', () => {});
        this.sizeSlider.removeEventListener('input', this.updateMosaicViewScale);
    }
}

customElements.define('mosaic-creator', Editor);
export default class StepTwo extends HTMLElement {
    constructor() {
        super();
        this.render();
        this.image = new Image();
        this.imageUrl = '';
        this.imageLocked = false;
    }

    static get observedAttributes() {
        return ['count', 'color', 'name', 'avatar', 'file', 'size'];       
    }
    
    //Getters and Setters
    get size() {
        return this.getAttribute("size");
    }
    set size(val) {
        this.setAttribute('size', val)
    }

    //getters
    
    //setters
    
    render() {
        this.innerHTML = /*html*/ `
            <div class="step-body">
                <h2 class="text-2xl mb-4">Image</h2>
                <!-- Upload -->
                <div class="flex flex-col pb-2 mb-2">
                    <div class="flex gap-2 border-b border-gray-200 mb-4">
                        <button class="inline-flex text-sm border-b-[3px] border-black pb-2">Upload</button>
                        <!-- <button class="inline-flex text-sm pb-2">Discover</button> -->
                    </div>
                    <p class="text-xs font-light mb-3 text-black">
                        Accepted formats .jpg, .jpeg, .png, .svg
                    </p>
                    <label
                        id="fileButton" 
                        tabindex="0" 
                        for="image-input"
                        class="cursor-pointer flex mb-1 w-full justify-center items-center py-3 border-2 border-black shadow-sm text-sm font-bold rounded-full bg-black text-white"
                    >
                        <span>Upload Image</span>
                        <input id="image-input" type="file" accept=".jpg,.jpeg,.png,.svg" class="hidden">
                    </label>
                </div>
                <!-- Edit -->
                <div class="flex flex-col pb-3">
                    <h3 class="text-sm border-b border-gray-200 pb-1 mb-1.5">Image Settings</h3>
                    <!-- Image Settings -->
                    <div id="image-settings" class="py-2 flex w-full justify-between text-zinc-300 pointer-events-none">
                        <button class="rounded-full items-center justify-center h-8 w-8 border-2 border-current p-0 inline-flex transition hover:border-black hover:bg-black hover:text-white" id="rotateL" title="rotate left">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M48.5 224H40c-13.3 0-24-10.7-24-24V72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2L98.6 96.6c87.6-86.5 228.7-86.2 315.8 1c87.5 87.5 87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3c-62.2-62.2-162.7-62.5-225.3-1L185 183c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8H48.5z"/></svg>
                        </button>
                        <button class="rounded-full items-center justify-center h-8 w-8 border-2 border-current p-0 inline-flex transition hover:border-black hover:bg-black hover:text-white" id="rotateR" title="rotate right">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z"/></svg>
                        </button>
                        <button class="rounded-full items-center justify-center h-8 w-8 border-2 border-current p-0 inline-flex transition hover:border-black hover:bg-black hover:text-white" id="flip" title="flip horizontally">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                            </svg>
                        </button>
                        <button class="rounded-full items-center justify-center h-8 w-8 border-2 border-current p-0 inline-flex transition hover:border-black hover:bg-black hover:text-white" id="zoomIn" title="zoom in">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="h-5 w-5"><path d="M5 8a1 1 0 011-1h1V6a1 1 0 012 0v1h1a1 1 0 110 2H9v1a1 1 0 11-2 0V9H6a1 1 0 01-1-1z"></path><path fill-rule="evenodd" d="M2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8zm6-4a4 4 0 100 8 4 4 0 000-8z" clip-rule="evenodd"></path></svg>
                        </button>
                        <button class="rounded-full items-center justify-center h-8 w-8 border-2 border-current p-0 inline-flex transition hover:border-black hover:bg-black hover:text-white" id="zoomOut" title="zoom out">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="h-5 w-5"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M5 8a1 1 0 011-1h4a1 1 0 110 2H6a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                        </button>
                        <button class="rounded-full items-center justify-center h-8 w-8 border-2 border-current p-0 inline-flex transition hover:border-black hover:bg-black hover:text-white" id="colorButton" title="edit color">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M41.4 9.4C53.9-3.1 74.1-3.1 86.6 9.4L168 90.7l53.1-53.1c28.1-28.1 73.7-28.1 101.8 0L474.3 189.1c28.1 28.1 28.1 73.7 0 101.8L283.9 481.4c-37.5 37.5-98.3 37.5-135.8 0L30.6 363.9c-37.5-37.5-37.5-98.3 0-135.8L122.7 136 41.4 54.6c-12.5-12.5-12.5-32.8 0-45.3zm176 221.3L168 181.3 75.9 273.4c-4.2 4.2-7 9.3-8.4 14.6H386.7l42.3-42.3c3.1-3.1 3.1-8.2 0-11.3L277.7 82.9c-3.1-3.1-8.2-3.1-11.3 0L213.3 136l49.4 49.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0zM512 512c-35.3 0-64-28.7-64-64c0-25.2 32.6-79.6 51.2-108.7c6-9.4 19.5-9.4 25.5 0C543.4 368.4 576 422.8 576 448c0 35.3-28.7 64-64 64z"/></svg>
                        </button>
                        <button class="rounded-full items-center justify-center h-8 w-8 border-2 border-current p-0 inline-flex transition hover:border-black hover:bg-black hover:text-white" id="delete" title="delete image">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" class="h-5 w-5"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                        <button class="rounded-full items-center justify-center h-8 w-8 border-2 border-current p-0 inline-flex transition hover:border-black hover:bg-black hover:text-white" id="lock" title="lock image">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </button>
                    </div>

                    <div id="color-settings" class="mt-2 hidden">
                        <div class="flex flex-col mt-1 justify-center">
                            <label class="flex items-center mb-2">
                                <span class="text-sm mr-2">Saturation:</span> 
                                <input class="accent-[rgb(50,50,50)]" type="range" id="saturation-slider" min="0" max="2" step="0.1" value="1">
                            </label>
                        </div>
                        <div class="flex flex-col mt-1 justify-center">
                            <label class="flex items-center mb-2">
                                <span class="text-sm mr-2">Contrast:</span> 
                                <input class="accent-[rgb(50,50,50)]" type="range" id="contrast-slider" min="0" max="3" step="0.1" value="1">
                            </label>
                        </div>
                        <div class="flex flex-col mt-1 justify-center">
                            <label class="flex items-center mb-2">
                                <span class="text-sm mr-2">Brightness:</span> 
                                <input class="accent-[rgb(50,50,50)]" type="range" id="brightness-slider" min="0" max="2" step="0.1" value="1">
                            </label>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col justify-center pt-1 pb-1">
                    <h3 class="text-sm border-b border-gray-200 pb-1.5 mb-3">Convert</h3>
                    <button 
                        type="button" 
                        id="convertButton"
                        class="cursor-pointer flex w-full mb-3 justify-center items-center py-2 border-2 border-black shadow-sm text-sm font-bold rounded-full text-black bg-white hover:bg-gray-50"
                    >
                        <span>Convert To Lego Bricks</span>
                    </button>
                    <p class="text-xs font-light">Skip to <span class="">'Edit'</span> to trace your image, reset your bricks or free draw!</p>
                </div>
            </div>`;
    }

    //Life Cycle Hooks
    attributeChangedCallback(prop, oldVal, newVal) {
        if (prop === 'size') {
            const imageWidget = this.querySelector('image-widget');
            
            if(imageWidget)  imageWidget.setAttribute('size', this.size );  
        }
    }

    connectedCallback() {
        //render
        this.render();
        const convertButton = this.querySelector('#convertButton');
        this.fileButton = this.querySelector('#image-input')
        this.imageSettings = this.querySelector('#image-settings');

        convertButton.addEventListener('click', e => this.handleConvert(e) )
        
        //Add Event Listeners
        this.querySelector('#saturation-slider').addEventListener('input', (e) => this.handleSaturation(e));
        this.querySelector('#brightness-slider').addEventListener('input', (e) => this.handleBrightness(e));
        this.querySelector('#contrast-slider').addEventListener('input', (e) => this.handleContrast(e));
        this.querySelector('#zoomIn').addEventListener('click', () => this.handleZoom(event, 1.01));
        this.querySelector('#zoomOut').addEventListener('click', () => this.handleZoom(event, 0.99));
        this.querySelector('#rotateL').addEventListener('click', () => this.handleRotate(event, -10 ));
        this.querySelector('#rotateR').addEventListener('click', () => this.handleRotate(event, 10 ));
        this.querySelector('#delete').addEventListener('click', () => this.handleResetImage(event));
        this.querySelector('#flip').addEventListener('click', () => this.handleFlipImage(event));
        
        this.querySelector('#colorButton').addEventListener('click', e => {
            this.querySelector('#colorButton').classList.toggle('!bg-black')
            this.querySelector('#colorButton').classList.toggle('!border-black');
            this.querySelector('#colorButton').classList.toggle('!text-white')
            this.querySelector('#color-settings').classList.toggle('hidden');
        })
        
        //Handle Lock
        this.querySelector('#lock').addEventListener('click', e => {
            this.imageLocked = !this.imageLocked;
            this.querySelector('#lock').classList.toggle('!bg-black')
            this.querySelector('#lock').classList.toggle('!text-white')
            this.querySelectorAll('#image-settings > button').forEach(button => {
                if(button.id === 'lock') {
                    button.classList.toggle('!border-black');
                } else {
                    button.classList.toggle('text-zinc-300');
                    button.classList.toggle('pointer-events-none');
                }
                if(button.id === 'colorButton') {
                    this.querySelector('#colorButton').classList.remove('!bg-black')
                    this.querySelector('#colorButton').classList.remove('!border-black')
                    this.querySelector('#colorButton').classList.remove('!text-white')
                    this.querySelector('#color-settings').classList.add('hidden');
                }
            })
            const event = new CustomEvent('lockImage', {
                detail: {
                    locked: this.imageLocked, 
                },
                bubbles: true,
                composed: true,
                cancelable: true
            });
            e.target.dispatchEvent(event);
        })

        //Upload
        this.fileButton.addEventListener('change', (e) => {
            const file = e.target.files[0];
            // Check if a file was selected
            if (file) {
                // Define the file size limit in bytes (15 MB)
                const fileSizeLimit = 15 * 1024 * 1024;
                // Check if the file size exceeds the limit
                if (file.size > fileSizeLimit) {
                    alert('File size exceeds the 5 MB limit. Please choose a smaller file.');
                    // Reset the input to clear the selected file
                    e.target.value = '';
                    return; // Exit early to prevent further processing
                }
                // Existing file reading logic...
                const reader = new FileReader();
                reader.onload = (event) => {
                    this.image.src = event.target.result;
                }
                this.image.onload = () => {
                    if(this.imageSettings) {
                        this.imageSettings.classList.remove('text-zinc-300', 'pointer-events-none');
                    }
                    const event = new CustomEvent('updateImage', {
                        detail: {
                            image: this.image,
                        },
                        bubbles: true,
                        composed: true,
                        cancelable: true
                    });
                    e.target.dispatchEvent(event);
                };
                reader.readAsDataURL(file);
            }
        });
    }

    toggleImageSettings(settingsEnabled) {
        if(settingsEnabled) {
            this.imageSettings.classList.remove('text-zinc-300', 'pointer-events-none');
        } else {
            this.imageSettings.classList.add('text-zinc-300', 'pointer-events-none');
        }
    }

    handleConvert(e) {
        this.querySelector('#colorButton').classList.remove('!bg-black')
        this.querySelector('#colorButton').classList.remove('!border-black')
        this.querySelector('#colorButton').classList.remove('!text-white')
        this.querySelector('#color-settings').classList.add('hidden');
        // e.preventDefault(); //Just in case
        const event = new CustomEvent('handleConvert', {
            bubbles: true,
            composed: true,
            cancelable: true
        });
        e.target.dispatchEvent(event);
    }

    handleSaturation(e) {
        const event = new CustomEvent('handleSaturation', {
            detail: {
                value: e.target.value,
            },
            bubbles: true,
            composed: true,
            cancelable: true
        });
        e.target.dispatchEvent(event);
    }

    handleBrightness(e) {
        const event = new CustomEvent('handleBrightness', {
            detail: {
                value: e.target.value,
            },
            bubbles: true,
            composed: true,
            cancelable: true
        });
        e.target.dispatchEvent(event);
    }

    handleContrast(e) {
        const event = new CustomEvent('handleContrast', {
            detail: {
                value: e.target.value,
            },
            bubbles: true,
            composed: true,
            cancelable: true
        });
        e.target.dispatchEvent(event);
    }

    handleResetImage(e) {
        //Hide Settings
        this.querySelector('#colorButton').classList.remove('!bg-black')
        this.querySelector('#colorButton').classList.remove('!border-black')
        this.querySelector('#colorButton').classList.remove('!text-white')
        this.querySelector('#color-settings').classList.add('hidden');

        //Send Event
        const event = new CustomEvent('handleResetImage', {
            bubbles: true,
            composed: true,
            cancelable: true
        });
        e.target.dispatchEvent(event);
    }

    handleZoom(e, factor) {
        //Send Event
        const event = new CustomEvent('handleZoom', {
            detail: {
                factor: factor,
            },
            bubbles: true,
            composed: true,
            cancelable: true
        });
        e.target.dispatchEvent(event);
    } 

    handleRotate(e, factor) {
        //Send Event
        const event = new CustomEvent('handleRotate', {
            detail: {
                factor: factor,
            },
            bubbles: true,
            composed: true,
            cancelable: true
        });
        e.target.dispatchEvent(event);
    } 

    handleFlipImage(e) {
        //Send Event
        const event = new CustomEvent('handleFlip', {
            bubbles: true,
            composed: true,
            cancelable: true
        });
        e.target.dispatchEvent(event);
    }

    updateImage(e) {
        const event = new CustomEvent('updateImage', {
            detail: {
                image: this.image,
            },
            bubbles: true,
            composed: true,
            cancelable: true
        });
        e.target.dispatchEvent(event);
    }
}

customElements.define('step-two', StepTwo);
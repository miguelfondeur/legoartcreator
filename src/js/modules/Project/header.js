import eventDispatcher from '../EventDispatcher/sharedEventDispatcher.js';

export default class ProjectHeader extends HTMLElement {
    //Teamplte
    render() {
        this.innerHTML = `
            <header class="flex items-center justify-between bg-white w-full h-[56px] absolute left-0 z-50 border-b text-zinc-200">
                <!-- Name -->
                <div class="flex items-center h-full min-w-[110px] px-4 border-r border-zinc-200 text-black text-sm flex-shrink-0">
                    <input type="text" readonly value="My Project" class="inline-flex outline-none">
                </div>
                <div class="flex items-center text-sm gap-2 px-4 text-black">
                    <!-- 
                        <button class="px-4 py-2 rounded-full inline-flex items-center hover:bg-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-1">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
                            </svg>tabindex="0" tabindex="0" user
                            Save
                        </button>
                        <button class="px-4 py-2 rounded-full inline-flex items-center hover:bg-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-1">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Preview
                        </button>
                        <button class="px-4 py-2 rounded-full inline-flex items-center hover:bg-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3 mr-2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                            </svg>
                            Share
                        </button>
                    -->
                    <span class="mr-2 h-[56px] border-r border-zinc-200"></span>

                    <button project-page-id="creator"
                            tabindex="0" 
                            onclick="location.href='index.html';" 
                            class="px-4 py-2 rounded-full inline-flex items-center text-sky-600 transition-all shadow hover:shadow-md">
                        <svg class="w-5 mr-1.5" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M13.3805 14H2.61948C2.26978 14 2 13.7302 2 13.3905V2.61948C2 2.27977 2.27977 2 2.61948 2H13.3805C13.7202 2 14 2.27977 14 2.61948V13.3805C14 13.7302 13.7202 14 13.3805 14Z" stroke="currentColor" stroke-miterlimit="10"></path><path d="M8 2V14" stroke="currentColor" stroke-miterlimit="10"></path><path d="M14 8H8" stroke="currentColor" stroke-miterlimit="10"></path></svg>
                        Project
                    </button>
                    <button project-page-id="instructions"
                            tabindex="0" 
                            id="instructionBtn"
                            disabled
                            onclick="location.href='instructions.html';" 
                            class="px-4 py-2 rounded-full inline-flex items-center text-sky-600 disabled:pointer-events-none disabled:border-gray-200 disabled:text-gray-300 transition-all shadow hover:shadow-md"
                    >
                        <svg class="w-5 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                        Instuctions
                    </button>
                    <button project-page-id="parts"
                            tabindex="0" 
                            id="partsBtn"
                            disabled 
                            onclick="location.href='parts.html';" 
                            class="px-4 py-2 rounded-full inline-flex items-center text-sky-600 disabled:pointer-events-none disabled:border-gray-200 disabled:text-gray-300 transition-all shadow hover:shadow-md"
                    >
                        <svg class="w-4 mr-1.5" viewBox="0 0 16 20" aria-hidden="true" data-di-rand="1694014409312" data-di-res-id="e815f25f-3607c9a7"><g fill="currentColor" fill-rule="evenodd"><path d="M4 3.512v5.804c0 .377.349.684.779.684.43 0 .779-.307.779-.684V3.512C5.558 2.33 6.653 1.368 8 1.368c1.347 0 2.442.962 2.442 2.144v5.804c0 .377.35.684.78.684.43 0 .778-.307.778-.684V3.512C12 1.575 10.206 0 8 0S4 1.575 4 3.512z"></path><path d="M2.46 6.33c-.269 0-.489.194-.5.441L1.435 18.19a.436.436 0 00.131.332.52.52 0 00.348.149h12.151c.276 0 .501-.207.501-.462l-.525-11.436c-.011-.248-.23-.442-.5-.442H2.46zM14.448 20l-12.974-.001a1.591 1.591 0 01-1.064-.462 1.357 1.357 0 01-.408-1.03L.56 6.372C.595 5.602 1.277 5 2.11 5h11.78c.835 0 1.516.602 1.551 1.372l.56 12.197c0 .789-.697 1.431-1.553 1.431z"></path></g></svg>
                        Buy Parts
                    </button>
                </div>
            </header>`
    }

    //Stage: Component Created
    constructor() {
        super();

        //Initial Data
        this.activeView = 'creator';

        //Get URL and set active page

    }

    //Life Cycle Hooks
    attributeChangedCallback(prop, oldVal, newVal) {

    }

    // Stage: 'Component now connected to DOM'
    connectedCallback() {
        this.render(); //renders your custom element to the DOM

        //Get Active Page
        const initialActivePage = this.getAttribute('active-page');
        if (initialActivePage) {
            this.updateActiveLink(initialActivePage);
        }

        //Get Local Storage Values
        if(localStorage.getItem('brickData')) { 
            this.querySelector('#instructionBtn').removeAttribute("disabled");
            this.querySelector('#partsBtn').removeAttribute("disabled");
        } else {
            this.querySelector('#instructionBtn').disabled = true;
            this.querySelector('#partsBtn').disabled = true;
        }
        
        //this.initialize();

        //listen to events
        eventDispatcher.addEventListener('finishProject', e => {
            this.querySelector('#instructionBtn').removeAttribute("disabled");
            this.querySelector('#partsBtn').removeAttribute("disabled");
        });
    }

    //Functions
    updateActiveLink(activePage) {
        const links = this.querySelectorAll('[project-page-id]');
        links.forEach(link => {
            if (link.getAttribute('project-page-id') === activePage) {
                link.classList.add('bg-sky-600','!text-white');
                link.classList.remove('border-transparent');
            } else {
                link.classList.add('border-transparent');
                link.classList.remove('bg-sky-600','!text-white');
            }
        });
    }
}

customElements.define('project-header', ProjectHeader);
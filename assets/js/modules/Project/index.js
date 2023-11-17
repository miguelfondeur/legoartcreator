import eventDispatcher from '../EventDispatcher/sharedEventDispatcher.js';
import ProjectHeader from './header.js';
import Editor from '../Creator/index.js';
import MosaicInstructions from '../Instructions/index.js';
import MosaicParts from '../Parts/index.js';

export default class Project extends HTMLElement {

    //Stage: Component Created
    constructor() {
        super();

        //Initial Data
        this.activeView = 'creator';

        //Template
        this.innerHTML = `
            <section class="flex min-h-full relative flex-col h-full">
                <!-- Header -->
                <project-header class="sticky top-0 w-full z-50" slot="header" active-page="creator"></project-header>

                <!-- Project Views -->
                <mosaic-creator project-view class="w-full h-full"></mosaic-creator>
                <mosaic-instructions project-view class="w-full"></mosaic-instructions>
                <mosaic-parts project-view class="w-full"></mosaic-parts>

                <!-- Support -->
                <div class="z-50 fixed right-3 bottom-3 inline-flex flex-shrink-0 items-center text-sm">
                    <a href="/contact/" class="p-2 bg-white rounded-lg text-xs border border-gray-300">
                        Give Feedback
                    </a>
                </div>
            </section>
            
            <!-- Modal Dialog -->
            <dialog id="beta-modal" class="flex flex-col modal-container bg-white w-96 mx-auto rounded-lg z-[100] p-6 shadow-lg !hidden">
                <h2 class="text-lg font-semibold mb-4">Welcome to Lego Art Creator (Beta)!</h2>
                <p class="mb-4">
                    Your feedback is crucial as we improve our platform. Feel free to share your thoughts, 
                    suggestions, or report issues using the button below or by visiting our <a href="/contact/" class="outline-0 text-sky-700 underline">contact&nbsp;page</a>. 
                    Please keep in mind that our site is a work in progress. Thank you for joining us on this journey!
                </p>
                <button id="close-modal" class="ml-auto bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700 focus:outline-none focus:ring focus:border-sky-300">Got it</button>
            </dialog>`
    }

    //Life Cycle Hooks
    attributeChangedCallback(prop, oldVal, newVal) {

    }

    // Stage: 'Component now connected to DOM'
    connectedCallback() {
        // Set default view
        this.changeProjectView(this.activeView);

        //listen to events  

        // Listen for the custom event from ProjectHeader
        this.addEventListener('changeView', (e) => {
            const newView = e.detail.view;
            this.updateActiveLink(newView);
            this.changeProjectView(newView);
        });

        // Check if the user has already closed the modal
        if (!localStorage.getItem("betaModalClosed")) {
            // If not closed, open the modal automatically
            const betaModal = document.getElementById("beta-modal");
            betaModal.classList.remove('!hidden');
            betaModal.showModal();
        }

        if(document.getElementById("close-modal")) {
            document.getElementById("close-modal").addEventListener("click", function () {
                // Close the modal and store a value in localStorage
                const betaModal = document.getElementById("beta-modal");
                betaModal.classList.add('!hidden');
                betaModal.close();
                localStorage.setItem("betaModalClosed", "true");
            });            
        }
    }

    //Functions
    updateActiveLink(activePage) {

    }

    changeProjectView(view) {
        // Hide all views
        const views = this.querySelectorAll('[project-view]');
        views.forEach(view => view.style.display = 'none');

        // Update the active-page attribute of ProjectHeader
        const header = this.querySelector('project-header');
        if (header) {
            header.setAttribute('active-page', view);
        }
    
        // Show the selected view
        const selectedView = this.querySelector(`mosaic-${view}`);
        if (selectedView) {
            selectedView.style.display = 'block';
        }
    }
}

customElements.define('mosaic-project', Project);
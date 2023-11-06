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
            <style>
                [data-view] {
                    display: none; /* Initially hide all views */
                    opacity: 0;
                    transition: opacity 0.5s ease-in-out; /* Adjust the time as needed */
                }
                [data-view].active {
                    display: block; /* Show the active view */
                    opacity: 1;
                }
            </style>
            <section class="flex min-h-full relative">
                <!-- Header -->
                <project-header slot="header" active-page="creator"></project-header>

                <!-- Project Views -->
                <mosaic-creator data-view="creator" class="w-full"></mosaic-creator>
                <mosaic-instructions data-view="instructions" class="w-full"></mosaic-instructions>
                <mosaic-parts data-view="parts" class="w-full"></mosaic-parts>
            </section>`
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
    }

    //Functions
    updateActiveLink(activePage) {

    }

    changeProjectView(activeView) {
        // Hide all views
        const views = this.querySelectorAll('[data-view]');
        console.log(views)
        views.forEach(view => {
            if (view.dataset.view === activeView) {
                view.classList.add('active');
            } else {
                view.classList.remove('active');
            }
        });

        // Update the active-page attribute of ProjectHeader
        const header = this.querySelector('project-header');
        if (header) {
            header.setAttribute('active-page', activeView);
        }
    }
}

customElements.define('mosaic-project', Project);
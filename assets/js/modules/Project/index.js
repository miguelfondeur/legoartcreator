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
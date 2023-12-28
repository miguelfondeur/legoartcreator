export default class GlobalHeader extends HTMLElement {
        
    render() {
        this.innerHTML = /*html*/ `
            <div class="relative z-[90] border-b text-zinc-200">
                <nav class="bg-white max-w-[1600px] w-full mx-auto h-[90px] flex items-center transition-all">
                    <div class="flex px-4 w-full text-black uppercase font-medium h-full items-center flex">
                        <a class="text-black mr-auto inline-flex flex-col items-center justify-center" href="/">
                            <!-- <img class="w-20" src="./img/logo.svg" alt="Lego Art Logo"> -->
                            <img class="w-20 h-[32px]" src="./img/logo.svg" alt="Lego Art Logo">
                            <span class="text-black font-bold text-sm">Creator</span>
                        </a>
                        
                        <ul id="nav-links" class="flex gap-10">
                            <!-- <li><a href="index.html" page-id="home" class="transition pb-1 border-b-[3px] border-transparent hover:border-black">Home</a></li> -->
                            <li><a href="/" page-id="create" class="transition pb-1 border-b-[3px] border-transparent hover:border-black">Create</a></li>
                            <!--
                                <li><a href="discover.html" page-id="discover" class="transition pb-1 border-b-[3px] border-transparent hover:border-black">Discover</a></li>
                                <li><a href="bricks.html" page-id="bricks" class="transition pb-1 border-b-[3px] border-transparent hover:border-black">Bricks</a></li>
                                <li><a href="about.html" page-id="about" class="transition pb-1 border-b-[3px] border-transparent hover:border-black">About</a></li>
                            -->
                        </ul>
                        <!--
                            <div id="dropdown-container" class="ml-10 relative">
                                <button class="cursor-pointer h-10 w-10 inline-flex items-center justify-center bg-[#006DB7] rounded-full" id="menu-button" aria-expanded="true" aria-haspopup="true">
                                    <img src="./img/lego-head.svg" alt="picture of minifigure">
                                </button>
                                <div id="dropdown" class="hidden normal-case absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1"></div>
                            </div>
                        -->
                        <!-- Dropdown -->
                    </div>
                </nav>
            </div>`
    }


    constructor() {
        super();

        //Public Props

        //Private Props
        this._user = null;
    }


    set user(value) {
        this._user = value;
        // Update the component based on the new user data
        this.updateDropdown();
    }
    get user() {
        return this._user;
    }


    static get observedAttributes() {
        return ['active-page', 'full-width', 'userid'];       
    }

    //Life Cycle Hooks
    attributeChangedCallback(attrName, oldVal, newVal) {

    }

    connectedCallback() {
        if(this._user) { 
            //console.log('from header:', _user);
        } else {
            //console.log('we\'re not here');
        }

        //render
        this.render();

        this.updateDropdown();

        //Get Active Page
        const initialActivePage = this.getAttribute('active-page');
        if (initialActivePage) {
            this.updateActiveLink(initialActivePage);
        }

        this.addEventListener('click', (event) => {
            if (event.target.id === 'signOutBtn') {
                this.signOut();
            }
        });

        //Full Width?
        const fullWidth = this.getAttribute('full-width');
        if(fullWidth === "true") {
            this.querySelector('nav').classList.remove('max-w-[1600px]')
        }

        //Handle Dropdown
        if(this.querySelector('#menu-button')) {
            this.querySelector('#menu-button').addEventListener('click', e => {
                this.querySelector('#dropdown').classList.toggle('hidden');
            })
        }
        if( this.querySelector('#dropdown-container') ) {
            document.body.addEventListener('click', function( event ){
                if( !this.querySelector('#dropdown-container').contains( event.target ) ){
                    this.querySelector('#dropdown').classList.add('hidden')// do nothing, click was inside container
                } 
            });
        }
    }

    disconnectedCallback() {
        
    }

    //Methods
    updateActiveLink(activePage) {
        const links = this.querySelectorAll('[page-id]');
        links.forEach(link => {
            if (link.getAttribute('page-id') === activePage) {
                link.classList.add('border-black');
                link.classList.remove('border-transparent');
            } else {
                link.classList.add('border-transparent');
                link.classList.remove('border-black');
            }
        });
    }

    signOut() {
        this.dispatchEvent(new CustomEvent('signOutRequested', {
            bubbles: true, // This allows the event to bubble up through the DOM
            composed: true // This allows the event to pass through shadow DOM boundaries
        }));
        // Update the dropdown or UI to reflect the logged-out state
        this.updateDropdown();
    }

    //Dropdown
    updateDropdown() {
        const dropdown = this.querySelector('#dropdown'); // Adjust this selector based on your actual dropdown's class or ID
        if(dropdown) {
            if (this._user) {
                // User is logged in
                dropdown.innerHTML = `
                    <div class="px-4 py-3" role="none">
                        <p class="text-sm" role="none">Signed in as</p>
                        <p class="truncate text-sm font-medium text-gray-900" role="none">${ this._user.email}</p>
                    </div>
                    <div class="py-1" role="none">
                        <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                        <a href="/account/" class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem" tabindex="-1">Account</a>
                        <a href="/dashboard/" class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem" tabindex="-1">Projects</a>
                    </div>
                    <div class="py-1" role="none">
                        <button class="text-gray-700 block w-full px-4 py-2 text-left text-sm hover:bg-gray-100" role="menuitem" tabindex="-1" id="signOutBtn">Sign out</button>
                    </div>`;
            } else {
                // User is not logged in
                dropdown.innerHTML = `
                    <div class="py-1" role="none">
                        <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                        <a href="login.html" class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem" tabindex="-1" id="menu-item-0">Sign in</a>
                    </div>`;
            }
        }
    }
}

customElements.define('global-header', GlobalHeader);
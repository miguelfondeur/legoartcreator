import GlobalHeader from "./header.js";
import GlobalFooter from "./footer.js";
import sb from "../../config/supabaseClient.js";

class PageContainer extends HTMLElement {
    constructor() {
        super();

        this.loading = false;

        const shadow = this.attachShadow({ mode: 'open' });

        shadow.innerHTML = `
            <style>
                :host {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    min-height: 100vh;
                }
            </style>

            <header>
                <slot name="header"></slot>
            </header>
        
            <slot name="content"></slot>

            <footer>
                <slot name="footer"></slot>
            </footer>`;
    }

    connectedCallback() {
        this.fetchUser();

        //Event Listeners
        this.addEventListener('handleSignup', (e)=> {
            this.signup(e.detail.form);
        }); 

        // Listen for the signOutRequested event from the header
        this.addEventListener('signOutRequested', async () => {
            try {
                await sb.auth.signOut();
                // Handle any post-sign-out logic, like UI updates or redirects
                window.location.replace('index.html')
                
            } catch (error) {
                console.error('Error signing out:', error);
            }
        });

        //Event Listeners
        this.addEventListener('handleLogin', (e)=> {
            this.login(e.detail.form);
        }); 

        //Update header if user logged in?
        // if(user) {
        //     console.log('user exists')
        //     document.querySelector('global-header').user = user;
        // }

    }

    //USER Sign up
    signup = async (form) => {
        let { data, error } = await sb.auth.signUp({
            email: form.email,
            password: form.password,
        })
    }

    //login
    login = async (form) => {
        try {
            let { data, error } = await sb.auth.signInWithPassword({
                email: form.email,
                password: form.password,
            })
            if(error) {
                throw error;
            } else {
                window.location.replace('index.html')
            }

        } catch(error) {
            console.log(error)
        }
    }

    fetchUser = async () => {
        const { data, error } = await sb.auth.getSession()
        if(document.querySelector('global-header')) {
            document.querySelector('global-header').user = data.session?.user;
        }

    }

}

customElements.define('page-container', PageContainer);

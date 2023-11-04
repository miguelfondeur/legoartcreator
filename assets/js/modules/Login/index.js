import "./login.js";
import "./signup.js";

class Login extends HTMLElement {
    render() {
        this.innerHTML = html`
        <div class="inline-flex w-full min-h-full flex-col justify-center px-6 py-8 lg:px-8 bg-white rounded-lg shadow-md">
            ${ this.isLogin ? '<login-form></login-form>' : '<signup-form></signup-form>' }
        </div>`;
    }

    constructor() {
        super();

        this.isLogin = true, 


        this.render();
    }

    connectedCallback() {
        const formType = this.getAttribute('type');
        if (formType !== 'login') {
            this.isLogin = false;  
            this.render();  
        }

    }
}

customElements.define('login-page', Login);

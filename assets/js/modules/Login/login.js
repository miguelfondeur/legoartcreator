class LoginForm extends HTMLElement {
    render() {
        this.innerHTML = html`
                <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img class="w-32 mx-auto" src="./img/logo.svg" alt="Lego Art Logo">
                    <h2 class="mt-6 text-center text-lg leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
                </div>
                <div class="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form id="loginForm" class="space-y-6" action="#" method="POST">
                        <div>
                            <label for="loginEmail" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <div class="mt-2">
                                <input id="loginEmail" name="loginEmail" type="email" autocomplete="loginEmail" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring- sm:text-sm sm:leading-6">
                            </div>
                        </div>
                        <div>
                            <div class="flex items-center justify-between">
                                <label for="loginPassword" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                <div class="text-sm">
                                    <a href="#" class="font-semibold text- hover:text-indigo-500">Forgot password?</a>
                                </div>
                            </div>
                            <div class="mt-2">
                                <input id="loginPassword" name="loginPassword" type="password" autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring- sm:text-sm sm:leading-6">
                            </div>
                        </div>
                        <button type="submit" class="flex w-full justify-center rounded-md bg- px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-">Sign in</button>
                    </form>
                    <p class="mt-10 text-center text-sm text-gray-500">
                        Not a member?
                        <a href="/signup.html" class="font-semibold leading-6 text- hover:text-indigo-500">Sign up Now</a>
                    </p>
                </div>`;
    }

    constructor() {
        super();

        this.render();
    }

    connectedCallback() {
        this.loginForm = this.querySelector('#loginForm')

        //Event Listeners
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
          
            let username = this.querySelector("#loginEmail");
            let pw = this.querySelector("#loginPassword");
          
            if (username.value == "" || pw.value == "") {
              alert("Ensure you input a value in both fields!");
            } else {
                const event = new CustomEvent('handleLogin', {
                        detail: {
                            form: {
                                email: username.value,
                                password: pw.value,
                            }
                        },
                        bubbles: true,
                        composed: true,
                        cancelable: true
                    });
                    e.target.dispatchEvent(event);
                }
                //Clear
                username.value = "";
                pw.value = "";
          });
    }
}

customElements.define('login-form', LoginForm);

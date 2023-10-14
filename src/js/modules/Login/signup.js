class Signup extends HTMLElement {
    render() {
        this.innerHTML = html`
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <img class="w-32 mx-auto" src="/src/img/logo.svg" alt="Lego Art Logo">
                <h2 class="mt-6 text-center text-lg leading-9 tracking-tight text-gray-900">Create your account</h2>
            </div>
            <div class="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                <form id="signupForm" class="space-y-6" action="#" method="POST">
                    <div>
                        <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Username</label>
                        <div class="mt-2">
                            <input id="username" name="username" type="text" autocomplete="username" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#016db7] sm:text-sm sm:leading-6">
                        </div>
                    </div>
                    <div>
                        <label for="signupEmail" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div class="mt-2">
                            <input id="signupEmail" name="signupEmail" type="email" autocomplete="signupEmail" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#016db7] sm:text-sm sm:leading-6">
                        </div>
                    </div>
                    <div>
                        <label for="signupPassword" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        <div class="mt-2">
                            <input id="signupPassword" name="signupPassword" type="password" autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#016db7] sm:text-sm sm:leading-6">
                        </div>
                    </div>
                    <button type="submit" class="flex w-full justify-center rounded-md bg-[#016db7] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#016db7]">Create Account</button>
                </form>
                <p class="mt-10 text-center text-sm text-gray-500">
                    Already have an account? 
                    <a href="/login.html" class="font-semibold leading-6 text-blue-600 hover:text-indigo-500">Login</a>
                </p>
            </div>`;
    }

    constructor() {
        super();
        
        this.render();
    }

    connectedCallback() {
        this.signupForm = this.querySelector('#signupForm')

        //Event Listeners
        signupForm.addEventListener("submit", (e) => {
            e.preventDefault();
          
            let username = this.querySelector("#signupEmail");
            let pw = this.querySelector("#signupPassword");
          
            if (username.value == "" || pw.value == "") {
              alert("Ensure you input a value in both fields!");
            } else {
                console.log(
                    `This form has a username of ${username.value} and password of ${pw.value}`
                );

                const event = new CustomEvent('handleSignup', {
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

customElements.define('signup-form', Signup);

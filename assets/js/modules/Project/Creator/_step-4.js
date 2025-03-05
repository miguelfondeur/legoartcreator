export default class StepFour extends HTMLElement {
    constructor() {
        super();
    }

    render() {
        this.innerHTML = `
            <div class="step-body">
                <h2 class="text-xl mb-4">Finish</h2>
                <div class="flex flex-col gap-4">
                    <button 
                        id="buyPartsButton"
                        class="cursor-pointer flex w-full justify-center items-center py-3 border-2 border-black shadow-sm text-sm font-bold rounded-full text-zinc-300 bg-white pointer-events-none"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-1.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                        Buy Parts
                    </button>
                    <button 
                        id="instructionsButton"
                        class="cursor-pointer flex w-full justify-center items-center py-3 border-2 border-black shadow-sm text-sm font-bold rounded-full text-zinc-300 bg-white pointer-events-none"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-1.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                        </svg>
                        Instructions
                    </button>
                </div>
            </div>`;
    }

    connectedCallback() {
        this.render();
        
        // Listen for project completion event
        this.addEventListener('projectComplete', () => {
            const buyPartsButton = this.querySelector('#buyPartsButton');
            const instructionsButton = this.querySelector('#instructionsButton');
            
            // Enable buttons
            buyPartsButton.classList.remove('text-zinc-300', 'pointer-events-none');
            instructionsButton.classList.remove('text-zinc-300', 'pointer-events-none');
            
            // Add hover effects
            buyPartsButton.classList.add('hover:bg-gray-50');
            instructionsButton.classList.add('hover:bg-gray-50');
        });
    }
}

customElements.define('step-four', StepFour); 
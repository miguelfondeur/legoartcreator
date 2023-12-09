import eventDispatcher from '../../EventDispatcher/sharedEventDispatcher.js';

export default class MosaicInstructions extends HTMLElement {
        
    render() {
        this.innerHTML = /*html*/ `
            <div id="instructions" class="flex flex-col flex-grow w-full min-h-full pt-[56px] px-4 items-center" >
                <!-- First Slide -->
                <section id="coverPage" class="my-4 bg-white shadow-lg shadow-gray-500 w-full h-[768px] max-w-screen-md flex flex-col">
                    <div class="w-full flex flex-grow">
                        <div class="w-7/12 bg-cover bg-center" id="originalImg"></div>
                        <div class="w-5/12 bg-red-800 border-l-2 border-white bg-gradient-to-b from-[#507896] to-[#223d53]">
                            <div class="border-[8px] border-black w-2/3 mx-auto mt-20 shadow-xl shadow-black">
                                <img id="projectImg" src="" class="shadow-inner">
                            </div>
                        </div>
                    </div>
                    <div class="bg-black border-t-2 flex flex-col border-white h-40 pl-8 p-8 text-gray-400">
                        <h1 class="text-5xl mb-2 font-bold uppercase font-light text-sky-700 font-lato">My Project</h1> 
                        <ul class="mt-auto text-sm text-white flex w-full justify-between">
                            <li class="inline-flex items-center text-lg">
                                <svg class="mr-1 h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="currentColor"><path d="m8.18 11.486-.03.014c-.15.141-.15.775-.15.775v17.79c0 .38.21.733.571.916l10.956 5.892c.15.085.33.127.51.127s.361-.042.527-.127l10.865-5.892c.36-.183.571-.536.571-.916V12.26s0-.634-.18-.747l-.166-.127-.796-.437-4.043-2.199-.18-.084V6.919C26.635 4.692 23.87 3 20.038 3c-3.833 0-6.583 1.706-6.583 3.933V8.61m6.583-3.481c2.675 0 4.373 1.07 4.373 1.818 0 .747-1.698 1.818-4.373 1.818-2.675 0-4.374-1.071-4.374-1.818 0-.747 1.729-1.818 4.374-1.818Zm-4.374 4.778a9.916 9.916 0 0 0 4.374.959 9.542 9.542 0 0 0 4.373-.959v.212c0 .76-1.698 1.832-4.373 1.832-2.675 0-4.374-1.071-4.374-1.818v-.226Zm3.277 8.726v15.52l-8.717-4.709V14.01l8.716 4.567v.07-.013Zm1.112-1.819-7.65-4.045-.992-.494-.12-.056 2.3-1.269c.6 1.819 3.17 3.101 6.462 3.101 3.29 0 5.77-1.24 6.432-3.016l2.164 1.198h.015l-8.581 4.595-.03-.014Zm9.783 12.616-8.656 4.737v-15.52l8.656-4.652V29.43Z"></path></svg>
                                4167
                            </li>
                            <!--
                                <li>Size:</li>
                                <li>Price:</li>
                            -->
                        </ul>
                    </div>
                </section>

                <div id="instructionPages" class="w-full"></div>
                
            </div>`
    }

    constructor() {
        super();

        //Public Props
        this.brickData = [];
        this.uniqueColors = [];
        this.img = '';
        this.projectImgURL = '';

        //Private Props
        this._user = null;
    }


    static get observedAttributes() {
        return ['active-page', 'full-width', 'userid'];       
    }

    //Life Cycle Hooks
    attributeChangedCallback(attrName, oldVal, newVal) {

    }

    connectedCallback() {
        //render
        this.render();

        //Get Elements
        this.instructionsPages = this.querySelector('#instructionPages');
        this.projectImg = this.querySelector('#projectImg');
        this.originalImg = this.querySelector('#originalImg');

        //Initial Load with Local Storage
        if(localStorage.getItem('projectURL') && localStorage.getItem('imgURL') && localStorage.getItem('brickData')) {
            this.projectImg.src = localStorage.getItem('projectURL');
            this.originalImg.style.backgroundImage = `url('${localStorage.getItem('imgURL')}')`;
            this.brickData = JSON.parse(localStorage.getItem('brickData'));   

            this.initializeBrickData();
        }
        
        //Load After Saving
        eventDispatcher.addEventListener('handleImgURL', e => {
            this.img = e.dataURL;
            this.originalImg.style.backgroundImage = `url('${this.img}')`;
        });

        eventDispatcher.addEventListener('handleCreateImage', e => {
            this.projectImgURL = e.dataURL;
            this.projectImg.src = this.projectImgURL;
        });

        eventDispatcher.addEventListener('saveProject', e => {
            this.brickData = JSON.parse(e.data);
            //Get Local Storage Values
            this.initializeBrickData();
        });
    }

    //Methods
    createInstructions() {
        this.brickData;
    }

    printPages() {
        //Print Pages
        if(this.instructionsPages) {
            this.instructionsPages.innerHTML = `${ this.gridArray.map((page, i) => ` 
                <section class="m-4 p-6 mx-auto bg-[#899093] shadow-lg shadow-gray-500 w-full max-w-[768px] aspect-square flex items-center justify-center">
                    <div class="relative">
                        <img src="${localStorage.getItem('projectURL')}" class="bg-[#383838] w-[500px] aspect-square">
                        <!-- Overlay -->
                        <div class="absolute h-full w-full top-0 left-0 grid grid-cols-3 grid-rows-3">
                            ${ this.uniqueColors.map( (frame, f) => `
                                <div class="${f === i ? 'bg-transparent' : 'bg-white/80'}"></div>
                            `).join('')}
                        </div>
                    </div>
                </section>
                <section id="page-${i + 1}" class="m-4 p-6 mx-auto bg-[#899093] shadow-lg shadow-gray-500 w-full max-w-[768px] aspect-square flex items-center justify-center">
                    <div class="border border-white p-2 min-h-[500px] mr-10 grid grid-cols-2 w-[100px]">
                        ${ this.uniqueColors.map( (brick, n) => `
                            <div class="h-7 w-7 m-auto flex justify-center items-center rounded-full border border-black" style="background-color: ${brick}">${n + 1}</div>
                        `).join('')}
                    </div>
                    <canvas art-board="${i + 1}" height="500" width="500" class="bg-[#383838] w-[500px] aspect-square border border-white"></canvas>
                </section>`
            ).join('')}`
        }
    }

    printBoards() {
        this.artBoards = this.querySelectorAll('[art-board]');
        // Ensure that gridArray and artBoards are populated
        if (!this.gridArray || !this.artBoards) {
            console.error('Grid data or canvases not available.');
            return;
        }
        // Iterate through each canvas and render the corresponding grid
        this.artBoards.forEach((board, i) => {
            // Set the canvas size based on the 16x16 grid size
            const gridSize = 16; // Assuming a 16x16 grid
            const cellSize = board.width / gridSize;
            // Get the 16x16 grid data for this canvas
            const gridData = this.gridArray[i];
            // Render the grid to the canvas
            this.renderGridToCanvas(gridData, board, cellSize);
        });
    }

    renderGridToCanvas(gridData, canvas) {
        const ctx = canvas.getContext('2d');
        const cellSize = canvas.width / 16; // Assuming a 16x16 grid

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Set the stroke width to 1
        ctx.lineWidth = 1;
        // Set a larger font size for the numbers
        const fontSize = 16; // Adjust the size as needed
        ctx.font = fontSize + 'px Arial'; // Include font family

        // Set the font color for the numbers
        ctx.fillStyle = 'blue'; // Change this to the desired color

        // Iterate through the 16x16 grid and draw circles with numbers
        for (let row = 0; row < 16; row++) {
            for (let col = 0; col < 16; col++) {
                const circle = gridData[row][col];

                // Find the index of the circle's fill color in uniqueColors
                const colorIndex = this.uniqueColors.indexOf(`rgb( ${circle.fill} )`);

                // Calculate circle position based on row, col, and cellSize
                // Adjust position to avoid overlap by adding half the stroke width
                const circleX = col * cellSize + cellSize / 2;
                const circleY = row * cellSize + cellSize / 2;
                // Reduce the radius to account for the stroke width, avoiding overlap
                const circleRadius = cellSize / 2 - ctx.lineWidth;

                // Draw the circle
                ctx.fillStyle = `rgb(${circle.fill})`;
                ctx.strokeStyle = `rgb(${circle.stroke})`;
                ctx.beginPath();
                ctx.arc(circleX, circleY, circleRadius, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();

                // Display the corresponding number on the circle
                ctx.fillStyle = `rgb(${circle.stroke})`; // For better visibility, ensure this color contrasts with the stroke color
                ctx.textAlign = 'center';
                ctx.textBaseline = 'alphabetic'; // Changed from 'middle' to 'alphabetic'
                ctx.fillText(colorIndex + 1, circleX, circleY + fontSize * 0.35); // Adjust the Y position slightly
            }
        }
    }


    initializeBrickData() {
        if(this.brickData.length) { 
            this.createInstructions();

            //Consolodate
            this.brickData.forEach((circle, i) => {
                let fill = this.brickData[i].fill;
                this.uniqueColors.push( `rgb( ${fill} )`); 
            });

            this.uniqueColors =  [...new Set(this.uniqueColors)].sort();
            
            //Create Multi Level Array
            
            // Define the sizes of the grids
            const gridSize = 48; // 48x48 grid
            const subGridSize = 16; // 16x16 sub-grid

            // Calculate the number of sub-grids in each dimension
            const numSubGridsX = gridSize / subGridSize;
            const numSubGridsY = gridSize / subGridSize;

            // Create a multi-level array to represent the grids
            this.gridArray = [];

            // Iterate through the circle data and organize it into grids
            for (let subGridY = 0; subGridY < numSubGridsY; subGridY++) {
                for (let subGridX = 0; subGridX < numSubGridsX; subGridX++) {
                    const gridData = [];
                    for (let y = 0; y < subGridSize; y++) {
                    const rowData = [];
                    for (let x = 0; x < subGridSize; x++) {
                        const circleIndexX = subGridX * subGridSize + x;
                        const circleIndexY = subGridY * subGridSize + y;
                        const circle = this.brickData[circleIndexY * gridSize + circleIndexX];
                        rowData.push(circle);
                    }
                    gridData.push(rowData);
                    }
                    this.gridArray.push(gridData);
                }
            }
            
            //Print Pages
            this.printPages();

            //Print Each Canvas
            this.printBoards();

        } else {
            if(this.querySelector('#instructionBtn')) {
                this.querySelector('#instructionBtn').disabled = true;
            } 
        }
    }




}

customElements.define('mosaic-instructions', MosaicInstructions);
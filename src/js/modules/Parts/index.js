import { allBrickColors } from '../../data/allBrickColors.js';

export default class MosaicParts extends HTMLElement {
        
    render() {
        this.innerHTML = /*html*/ `
            <div class="flex flex-col flex-grow w-full min-h-full pt-[56px] items-center" >
                <div id="partsWrapper" class="my-12 w-full max-w-5xl grid grid-cols-4"></div>    
            </div>`
    }


    constructor() {
        super();

        // Initialize an array to store unique circles with quantities
        this.uniqueCircles = [];
        this.brickData = [];

        if(localStorage.getItem('brickData')) { 
            this.brickData = JSON.parse(localStorage.getItem('brickData'));
            
            this.getParts();
        }

        
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

        this.partsWrapper = this.querySelector('#partsWrapper');

        this.printParts();
    }

    //Methods
    getParts() {
        // Initialize an empty object to store color counts
        const colorCounts = {};

        // Iterate through brickData and count colors
        this.brickData.forEach((circle) => {
            const color = `rgb(${circle.fill})`; // Create a consistent color string
            if (colorCounts[color]) {
                colorCounts[color]++;
            } else {
                colorCounts[color] = 1;
            }
        });

        // Iterate through colorCounts and create unique circle objects
        for (const color in colorCounts) {
            if (colorCounts.hasOwnProperty(color)) {
                const count = colorCounts[color];
                // Parse the color string to extract the RGB values
                const [r, g, b] = color.match(/\d+/g).map(Number);

                // Find the matching color object in allBrickColors
                const matchingColor = allBrickColors.find((colorObj) => {
                    return colorObj.rgb[0] === r && colorObj.rgb[1] === g && colorObj.rgb[2] === b;
                });

                if (matchingColor) {
                    // Create a unique circle object with color, quantity, and additional properties
                    const circle = {
                        quantity: count,
                        name: matchingColor.name,
                        family: matchingColor.family,
                        price: matchingColor.price,
                        img: matchingColor.img,
                        id: matchingColor.id
                    };

                    this.uniqueCircles.push(circle);
                }
            }
        }

        // Now uniqueCircles contains the unique circles with quantities and additional properties
        console.log(this.uniqueCircles);
    }

    printParts() {
        //Print Pages
        if(this.partsWrapper) {
            this.partsWrapper.innerHTML = `${ this.uniqueCircles.map((part, i) => ` 
                <section class="p-4 bg-white border border-gray-200 w-full flex flex-col">
                    <img src=${part.img} >
                    <p class="uppercase">${part.name}</p>
                    <p class="uppercase text-gray-500 text-xs mb-2">${part.id.element}/${part.id.design}</p>
                    <p class="text-sm">$${ Math.round( (parseFloat(part.price) * parseFloat(part.quantity)) * 100) / 100 }</p>
                    <p class="text-gray-500 uppercase text-xs">$${part.price} x ${part.quantity}</p>
                    <a href="#" class="bg-sky-600 text-white mt-4 text-sm uppercase text-center rounded w-full p-3 cursor-pointer">Buy on LEGO</a>
                </section>`
            ).join('')}`
        }
    }

}

customElements.define('mosaic-parts', MosaicParts);
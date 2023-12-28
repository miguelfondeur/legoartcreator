import { allBrickColors } from '../../../data/allBrickColors.js';
import { frameParts } from '../../../data/frameData.js';
import eventDispatcher from '../../EventDispatcher/sharedEventDispatcher.js';

export default class MosaicParts extends HTMLElement {
        
    render() {
        this.innerHTML = /*html*/ `
            <div id="parts" class="flex flex-col lg:flex-row flex-grow w-full min-h-full pt-[56px] px-4 mx-auto xl:container" >
                <div id="totalWrapper" class="sticky top-[65px] px-4 pt-4 pb-8 my-12 flex-shrink-0 bg-white w-[300px] h-min border border-gray-200 rounded-2xl shadow-xl">
                    <section>
                        <p class="text-xl mb-4">Parts</p>
                        <p>Total Parts: #<span id="total_parts"></span></p>
                        <p>Total Unique Pieces: #<span id="pieces"></span><p>
                        <p>Total Costs on Lego: $<span id="lego_price"></span></p>
                        <p>Total Costs on Webrick: $<span id="wb_price"></span></p>
                        <hr class="my-4">
                        <button id="partsDownloadBtn" class="bg-sky-600 text-white mt-auto text-sm text-center rounded-xl w-full p-3 cursor-pointer mb-2">
                            Download Parts Data
                        </button>
                        <a href="https://www.webrick.com/toolkit#aid=2046" target="blank" class="w-full hover:bg-gray-100 px-2 md:px-4 py-2 rounded-full inline-flex items-center justify-center text-sky-700 transition-all shadow hover:shadow-md border-transparent">
                            Upload Parts Data to Webrick
                        </a>
                    </section>
                </div>
                <div id="partsWrapper" class="px-4 my-12 w-full max-w-5xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4"></div>    
            </div>`
    }


    constructor() {
        super();

        // Initialize an array to store unique circles with quantities
        this.uniqueCircles = [];
        this.brickData = [];
        this.parts = [];
        this.parts_xml = "";

        //Get Initial Brick Data
        if(localStorage.getItem('brickData')) { 
            this.brickData = JSON.parse(localStorage.getItem('brickData'));
            this.getParts();
        }
        this.size = JSON.parse(localStorage.getItem('size'));
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
        this.lego_price_el = this.querySelector('#lego_price');
        this.wb_price_el = this.querySelector('#wb_price');
        this.partsDownloadBtn = this.querySelector('#partsDownloadBtn');

        this.partsDownloadBtn.addEventListener('click', () => {
            const blob = new Blob([this.parts_xml], { type: 'text/xml' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = 'parts.xml';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });

        //Print After Saving
        eventDispatcher.addEventListener('saveProject', e => {
            this.brickData = JSON.parse(e.data);
            this.getParts();

            this.printParts();
        })
        
        //Print If there was something saved
        if(this.uniqueCircles.length) {
            this.printParts();
        }

        this.querySelector('#pieces').innerHTML = this.uniquePartsCount;

        if(this.size) {
            this.querySelector('#total_parts').innerHTML = this.size;
        } else {
            this.querySelector('#total_parts').innerHTML = "2500";
        }

        this.lego_price_el.innerHTML = this.lego_total;
        this.wb_price_el.innerHTML = this.wb_total;
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
                        wb_price: matchingColor.wb_price,
                        img: matchingColor.img,
                        id: matchingColor.id,
                        color: matchingColor.color_id,
                    };
                    this.uniqueCircles.push(circle);
                }
            }
        }

        //Conditionally create frame parts 

        //Create Parts Data
        this.parts = [ ...this.uniqueCircles, frameParts.canvas[0], ...frameParts.frame];

        //Create XML JSON
        this.parts_xml =    
            `<INVENTORY>
                ${ this.parts.map(item => 
                `<ITEM>
                    <ITEMTYPE>P</ITEMTYPE>
                    <ITEMID>${item.id.bricklink}</ITEMID>
                    <COLOR>${item.id.color_id}</COLOR>
                    <MINQTY>${item.quantity}</MINQTY>
                </ITEM>`).join('')}
            </INVENTORY>`;

        //Get Unique Parts Quantity
        if(this.size === "") {
            this.uniquePartsCount = this.uniqueCircles.length + 16; 
        } else {
            this.uniquePartsCount = this.uniqueCircles.length + 16;
        }

        //Get Prices and print elements
        //LEGO
        const lego_total = this.parts.reduce((sum, item) => {
            const price = Number(item.price);
            const quantity = Number(item.quantity);
            return sum + (price * quantity);
        }, 0);
        const roundedTotal = parseFloat(lego_total.toFixed(2));
        this.lego_total = roundedTotal;
        //WEBRICK
        const wb_total = this.parts.reduce((sum, item) => {
            const price = Number(item.wb_price);
            const quantity = Number(item.quantity);
            return sum + (price * quantity);
        }, 0);
        const roundedWBTotal = parseFloat(wb_total.toFixed(2));
        this.wb_total = roundedWBTotal;
    }

    printParts() {
        //Print Pages
        if(this.partsWrapper) {
            this.partsWrapper.innerHTML = `
                ${ this.parts.map((part, i) => ` 
                    <div class="p-4 bg-white border border-gray-200 w-full flex flex-col">
                        <img class="w-1/2 mx-auto mb-2" src=${part.img} >
                        <p class="uppercase leading-tight mb-1">${part.name}</p>
                        <p class="uppercase text-gray-500 mb-2 text-xs leading-none">${part.id.element}/${part.id.design}</p>
                        <!-- Price -->
                        <p class="mb-2 inline-flex flex-wrap items-center">
                            <span class="mr-1">Lego Price: $${ Math.round( (parseFloat(part.price) * parseFloat(part.quantity)) * 100) / 100 }</span>
                            <span class="text-gray-500 uppercase text-xs ">( $${part.price} x ${part.quantity} )</span>
                        </p>
                        <p class="mb-4 inline-flex flex-wrap items-center">
                            <span class="mr-1">Webrick Price: $${ Math.round( (parseFloat(part.wb_price) * parseFloat(part.quantity)) * 100) / 100 }</span>
                            <span class="text-gray-500 uppercase text-xs leading-none">( $${part.wb_price} x ${part.quantity} )</span>
                        </p>
                        <a href="https://www.webrick.com/flat-tile-1x1-round-98138.html?color=${part.color}&quantity=76&brand=80/#aid=2046" 
                            target="blank" 
                            class="bg-[#f57d20] text-white text-sm mt-auto uppercase text-center rounded-xl w-full p-2 cursor-pointer"
                        >
                            Buy on Webrick
                        </a>
                        <div class="flex items-center justify-center gap-2 mt-2">
                            <!-- Bricklink -->
                            <a href="https://www.bricklink.com/v2/catalog/catalogitem.page?P=98138&idColor=${part.id.color_id}#T=S&C=158&O={%22color%22:${part.id.color_id},%22iconly%22:0}" 
                                target="blank" 
                                class="text-sky-600 bg-white shadow text-sm text-center rounded-xl w-full p-2 cursor-pointer"
                            >
                                Bricklink
                            </a>
                            <!-- Lego -->
                            <a href="https://www.lego.com/en-us/pick-and-build/pick-a-brick?query=flat+1x1+round+tile&system=LEGO&category=3#pab-results-wrapper" 
                                target="blank" 
                                class="text-sky-600 bg-white shadow text-sm text-center rounded-xl w-full p-2 cursor-pointer"
                            >
                                LEGO
                            </a>
                        </div>
                    </div>`
                ).join('')}`
        }
    }

}

customElements.define('mosaic-parts', MosaicParts);
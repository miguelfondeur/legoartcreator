import '../SVGGrids/_grid.js';
import '../SVGGrids/_smallgrid.js';
import eventDispatcher from '../EventDispatcher/sharedEventDispatcher.js';
//import '../Grids/_squareGrid.js';
//import '../Grids/_smallSqareGrid.js';
import { brickColors } from '../../data/brickColors.js';

export default class MosaicCanvas extends HTMLElement {
    render() {
        this.innerHTML = /*html*/ `
            <style>
                @import url("/dist/css/main.css");
                #wrapper[size="320"] canvas { width: 320px; }
                #wrapper[size="480"] canvas, #wrapper[size="160"] canvas { width: 480px; }
                #wrapper[size="960"] canvas { width: 960px; }
                #wrapper[size="1440"] canvas { width: 1440px; }
                .max-w-full { max-width: 100%; }
                /* .overflow-x-auto { overflow-x: auto; } */
                svg-grid, small-grid, canvas {
                    transition-property: all;
                    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
                    transition-duration: 150ms;
                }
                svg-grid { opacity: 1; }
                square-grid,
                small-square-grid,
                small-grid { 
                    opacity: 0; 
                }
                canvas { transform: translateZ(0);}
                #wrapper[size="160"] svg-grid { display: none; }
                #wrapper[size="160"] small-grid { opacity: 1 }
            </style>
            <!--Canvas Container -->
            <div id="container"
                 class="mx-auto w-min max-w-full border-[10px] outline-1 shadow-lg" 
                 style="border-color: rgb( ${ this.frame } )"
            >
                <div id="wrapper" 
                     size="${this.size}"
                     class="max-w-full overflow-x-auto h-480px relative overflow-hidden border border-black shadow-inner box-content bg-zinc-600 transition-all"
                >    
                    <!-- Image Canvas -->
                    <canvas id="imageCanvas" 
                            class="w-full z-10 absolute" 
                            width="${this.size === '160' ? '480' : this.size }" 
                            height="480"
                            style="background-color: rgb(50,50,50);"
                    ></canvas>
                    <!-- SVG Prview Grid -->
                    <div id="grid-wrapper" class="absolute z-10 top-0 left-0 w-full h-full max-w-none" style="color: rgb(${this.color});">
                        <svg-grid class="absolute h-480px"></svg-grid>
                        <!--  <square-grid class="absolute h-480px"></square-grid>  -->
                        <small-grid class="absolute h-480px"></small-grid>
                        <!--  <small-square-grid class="absolute h-480px"></small-square-grid>  -->
                    </div>
                    <!-- Canvas Element -->
                    <canvas id="artBoard" 
                            class="w-full relative bg-[rgb(${this.color})] !bg-transparent" 
                            width="${this.size === '160' ? '480' : this.size }" 
                            height="480"
                    ></canvas>
                </div>
            </div>` 
    };

    //Anything you add here will be available as soon as the object is created
    constructor() {
        super();

        //image
        this.image = '';

        //Data
        this.frame = '0,0,0';
        this.initialColor = '50,50,50,1';
        this.initialStrokeColor = '0,0,0,1';
        this.gridSize = { rows: 48, cols: 48 };
        this.cellWidth = 480 / this.gridSize.cols;
        this.cellHeight = 480 / this.gridSize.rows;
        this.circleRadius = (Math.min(this.cellWidth, this.cellHeight) / 2);
        //Arrays
        this.raw = [];
        this.circles = [];
        this.uniqueColors = [];
        //Edit Mode
        this.editMode = false,
        this.activeColor = '0,0,0';
        this.activeColorAlpha = '1';
        //State
        this.dragging = false;
        this.draggingImage = false;
        this.drawMode = false;
        this.paintMode = false;
        //Image Settings
        this.x = 0;
        this.y = 0;
        this.zoomLevel = 1;
        this.rotation = 0; 
        this.saturation = 1; 
        this.flippedHorizontal = false;
        this.brightness = 1; 
        this.contrast = 1; 
    }

    static get observedAttributes() {
        return ['size', 'color', 'image', 'frame'];       
    }
    
    // A configuration map that associates canvasWidth values with their respective settings
    static GRID_CONFIG = {
        '160': {
            gridSize: { rows: 16, cols: 16 },
            dimensions: { width: 480, height: 480 }
        },
        '320': {
            gridSize: { rows: 48, cols: 32 },
            dimensions: { width: 320, height: 480 }
        },
        '480': {
            gridSize: { rows: 48, cols: 48 },
            dimensions: { width: 480, height: 480 }
        },
        '960': {
            gridSize: { rows: 48, cols: 96 },
            dimensions: { width: 960, height: 480 }
        },
        '1440': {
            gridSize: { rows: 48, cols: 144 },
            dimensions: { width: 1440, height: 480 }
        }
        // ... add other configurations as needed
    };

    /******************
    GETTERS & SETTERS
    ******************/
    get size() {
        return this.getAttribute("size");
    }
    set size(val) {
        this.setAttribute('size', val);
    }

    get color() {
        return this.getAttribute("color");
    }
    set color(val) {
        this.setAttribute('color', val);
    }

    get frame() {
        return this.getAttribute("frame");
    }
    set frame(val) {
        this.setAttribute('frame', val);
    }

    /******************
    LIFE CYCLES
    ******************/

    //Connected to the DOM
    connectedCallback() {
        //render
        this.render();

        //Get Elements
        this.canvas = this.querySelector('#artBoard');
        this.context = this.canvas.getContext('2d', { willReadFrequently: true });
        this.imgCanvas =  this.querySelector('#imageCanvas');
        this.imgContext = this.imgCanvas.getContext('2d', { willReadFrequently: true });
        this.grid = this.querySelector('#grid-wrapper');
        this.wrapper = this.querySelector('#wrapper');
        this.container = this.querySelector('#container');
        
        this.canvas.addEventListener('mousedown', e => this.handleMouseDown(e));
        this.canvas.addEventListener('mousemove', e => this.handleMouseMove(e), { passive: true });
        this.canvas.addEventListener('mouseup', () => this.handleMouseUp());

        this.grid.addEventListener('mousedown', e => this.handleImageMouseDown(e));
        this.grid.addEventListener('mousemove', e => this.handleImageMouseMove(e), { passive: true });
        this.grid.addEventListener('mouseup', () => this.handleImageMouseUp());

        //Draw Grid initially
        this.drawGrid(this.size)

        //listen to events
        eventDispatcher.addEventListener('finishProject', e => {
            this.saveProject();
        });
    }

    toggleTraceMode(traceMode) {
        if(traceMode) {
            this.canvas.classList.add('!bg-transparent')
        } else {
            this.canvas.classList.remove('!bg-transparent')
        }
    }

    //Attributes Changed
    attributeChangedCallback(prop, oldVal, newVal) {
        //Will not persist because we're literally re-rendering every time we update the props
        if (prop === 'size') {
            if(this.wrapper) {
                this.wrapper.setAttribute('size', newVal );
            }
            if(this.canvas) {
                if(newVal === '160')
                    this.canvas.setAttribute('width', '480' );
                else {
                    this.canvas.setAttribute('width', newVal );
                }
            }
            //Draw Canvas on Size Update
            this.drawGrid(newVal)
        }

        if (prop === 'color') {
            if(this.grid) {
                this.grid.style.color = `rgb(${newVal})`;
            }
            if(this.canvas) {
                this.canvas.style.backgroundColor = `rgb(${newVal})`;
            } 
        }

        if (prop === 'frame') {
            if(this.container) {
                this.container.style.borderColor = `rgb(${newVal})`;
                if(newVal === '255,255,255') {
                    this.container.classList.add('outline-[#ddd]');
                    this.wrapper.classList.add('!border-[#ddd]');
                } else {
                    this.container.classList.remove('outline-[#ddd]');
                    this.wrapper.classList.remove('!border-[#ddd]');
                }
            }
        }
    }

    //Removed from DOM
    disconnectedCallback() {
        this.canvas.removeEventListener('mousedown', e => this.handleMouseDown(e));
        this.canvas.removeEventListener('mousemove', e => this.handleMouseMove(e));
        this.canvas.removeEventListener('mouseup', () => this.handleMouseUp());

        this.grid.removeEventListener('mousedown', e => this.handleImageMouseDown(e));
        this.grid.removeEventListener('mousemove', e => this.handleImageMouseMove(e));
        this.grid.removeEventListener('mouseup', () => this.handleImageMouseUp());
    }

    /******************
    METHODS
    ******************/

    drawGrid(canvasWidth) {
        //Guard Clauses
        if (!this.context) return;  // Guard Clause

        const config = MosaicCanvas.GRID_CONFIG[canvasWidth];
        if (!config) return;  // Guard clause if the configuration doesn't exist for the provided canvasWidth

        this.setGridSize(config.gridSize);
        this.setCanvasDimensions(config.dimensions);

        this.circleRadius = Math.min(this.cellWidth, this.cellHeight) / 2;
        this.context.globalCompositeOperation = "destination-over";

        //Empty Circles
        this.circles = [];
        //Circle Styles for new draw (some timing issues)
        this.context.fillStyle = `rgb( ${this.initialColor} )`;
        //this.context.lineWidth = this.gridSize.cols === 16 ? 2 : 1;
        //this.context.strokeStyle =  `rgb( ${this.initialStrokeColor} )`;

        for (let row = 0; row < this.gridSize.rows; row++) {
            for (let col = 0; col < this.gridSize.cols; col++) {
                this.context.beginPath();
                const x = (col * this.cellWidth + this.circleRadius);
                const y = (row * this.cellHeight + this.circleRadius);
                this.context.arc(x, y, this.circleRadius, 0, Math.PI * 2);
                this.context.fill();
                //this.context.stroke();
                this.circles.push({ x: x, y: y, fill: this.initialColor, stroke: this.initialStrokeColor });
            }
        }
    }

    setGridSize(gridSize) {
        this.gridSize = gridSize;
        this.cellWidth = this.canvas.width / this.gridSize.cols;
        this.cellHeight = this.canvas.height / this.gridSize.rows;
    }

    setCanvasDimensions(dimensions) {
        this.canvas.width = dimensions.width;
        this.canvas.height = dimensions.height;
        this.imgCanvas.width = dimensions.width;
        this.imgCanvas.height = dimensions.height;
    }

    handleResetCanvas() {
        //reset props
        this.raw = [];
        this.circles = [];
        this.uniqueColors = [];
        //clear
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        //Draw Grid with initial data
        this.drawGrid(this.size) 
    }

    /************************
     * Image Functions
     ***********************/
    toggleShowImage(visible) {
        if(visible) {
            this.canvas.classList.remove('z-20');
        } else {
            this.canvas.classList.add('z-20');
        }
    }

    draw() {
        this.clearCanvas();
        this.drawBackground('darkgray');  // Use a constant for 'darkgray' if it's not going to change

        this.applyTransformations();

        if (this.flippedHorizontal) {
            this.flipHorizontally();
        }

        this.drawImage(this.image);

        this.applyAdjustments();

        this.imgContext.restore();  // Ensure transformations and filters are reverted for future draws

        localStorage.setItem("imgURL", this.image.src);
        
        //Update Pointer Events
        this.grid.classList.remove('pointer-events-none');
        this.grid.classList.add('cursor-move');
    };  

    applyAdjustments() {
        const imageData = this.imgContext.getImageData(0, 0, this.imgCanvas.width, this.imgCanvas.height);
        const data = imageData.data;
        // Contrast
        for (let i = 0; i < data.length; i += 4) {
            const adjustedRGB = this.adjustContrast([data[i], data[i+1], data[i+2]]);
            data[i] = adjustedRGB[0]; 
            data[i+1] = adjustedRGB[1]; 
            data[i+2] = adjustedRGB[2];
        }
        //Saturation
        for (let i = 0; i < data.length; i += 4) {
            const adjustedRGB = this.adjustSaturation([data[i], data[i+1], data[i+2]]);
            data[i] = adjustedRGB[0]; 
            data[i+1] = adjustedRGB[1]; 
            data[i+2] = adjustedRGB[2];
        }
        //Brightness
        for (let i = 0; i < data.length; i += 4) {
            const adjustedRGB = this.adjustBrightness([data[i], data[i+1], data[i+2]]);
            data[i] = adjustedRGB[0]; 
            data[i+1] = adjustedRGB[1]; 
            data[i+2] = adjustedRGB[2];
        }
        this.imgContext.putImageData(imageData, 0, 0);
    }

    clearCanvas() {
        this.imgContext.clearRect(0, 0, this.imgCanvas.width, this.imgCanvas.height);
    }

    drawBackground(color) {
        this.imgContext.fillStyle = color;
        this.imgContext.fillRect(0, 0, this.imgCanvas.width, this.imgCanvas.height);
    }

    applyTransformations() {
        this.imgContext.save();  // Save the current state to restore it later
        // Translate to the center of the canvas
        this.imgContext.translate(this.imgCanvas.width / 2, this.imgCanvas.height / 2);
        // Rotate the context
        this.imgContext.rotate(this.rotation * Math.PI / 180);
    }

    flipHorizontally() {
        this.imgContext.scale(-1, 1);  // Flip the context horizontally
    }

    drawImage(image) {
        const scale = this.canvas.width / this.image.width;
        const scaledWidth = this.image.width * scale * this.zoomLevel;
        const scaledHeight = this.image.height * scale * this.zoomLevel;
        const drawX = this.x - this.imgCanvas.width / 2;
        const drawY = this.y - this.imgCanvas.height / 2;
        if (image instanceof HTMLImageElement || image instanceof HTMLCanvasElement /*... other types */) {
            this.imgContext.drawImage(image, drawX, drawY, scaledWidth, scaledHeight);
        } else {
            console.error('Invalid image type:', image);
        }
    }

    handleRotate(factor) {
        this.rotation = (this.rotation + factor) % 360; // Rotate by 90 degrees
        this.draw(); // Redraw the image with the new rotation setting
    }

    handleSaturation(value) {
        this.saturation = parseFloat(value);
        this.draw(); // Redraw the image with the new saturation setting
    }

    handleBrightness(value) {
        this.brightness = parseFloat(value)
        this.draw();
    }

    handleContrast(value) {
        this.contrast = parseFloat(value);
        this.draw(); // Redraw the image with the new contrast setting
    }
    
    adjustSaturation(rgb) {
        let r = rgb[0] / 255;
        let g = rgb[1] / 255;
        let b = rgb[2] / 255;
        
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
    
        if (max === min) {
          h = s = 0; // achromatic
        } else {
          const d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
          }
          h /= 6;
        }
    
        s = s * this.saturation;
        if (s > 1) s = 1;
    
        // Convert hsl back to rgb
        let q;
        if (l < 0.5) {
          q = l * (1 + s);
        } else {
          q = l + s - l * s;
        }
    
        const p = 2 * l - q;
        r = this.hue2rgb(p, q, h + 1/3);
        g = this.hue2rgb(p, q, h);
        b = this.hue2rgb(p, q, h - 1/3);
    
        return [r * 255, g * 255, b * 255];
    }

    adjustBrightness(rgb) {
        return rgb.map(channel => Math.min(255, channel * this.brightness));
    }
    
    adjustContrast(rgb) {
        return rgb.map(channel => {
          const contrastAdjustment = ((channel - 128) * this.contrast) + 128;
          return Math.min(255, Math.max(0, contrastAdjustment)); // Ensure values are between 0-255
        });
    }

    hue2rgb(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
    }

    handleResetImage() {
        // Clear the canvas
        this.imgContext.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Remove the image
        this.image.src = '';
        if (this.input) {
            this.input.value = '';
        }
      
        // Reset properties to their initial values, if needed
        this.zoomLevel = 1;
        this.x = 0;
        this.y = 0;
        this.rotation = 0;
        this.grayscale = false;

        //Handle Pointer Events
        this.grid.classList.add('pointer-events-none');
        this.grid.classList.remove('cursor-move');
    }
    
    handleFlipImage() {
        this.flippedHorizontal = !this.flippedHorizontal;
        this.draw();
    }
    
    handleZoom(factor) {
        this.zoomLevel *= factor;
        this.draw();
    }

    lockImage(locked) {
        if(locked) {
            this.grid.classList.add('pointer-events-none');
            this.grid.classList.remove('cursor-move');
        } else {
            this.grid.classList.remove('pointer-events-none');
            this.grid.classList.add('cursor-move');
        }
    }
    
    handleImageMouseDown(e) {
        if(!this.image.src) return;
        this.draggingImage = true;
        const rect = this.canvas.getBoundingClientRect();
        this.startX = e.clientX - rect.left;
        this.startY = e.clientY - rect.top;
    }
    
    handleImageMouseMove(e) {
        if (!this.draggingImage) return;
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
    
        const dx = mouseX - this.startX;
        const dy = mouseY - this.startY;
    
        this.x += dx;
        this.y += dy;
    
        this.startX = mouseX;
        this.startY = mouseY;
    
        requestAnimationFrame(() => {
            this.draw();
        });
    }
    
    handleImageMouseUp() {
        this.draggingImage = false;
    }

    /*****************************
     * Brick Functions
     ****************************/
    drawCircles() {
        for(let i = 0; i < this.circles.length; i++){
            //Draw Circle
            this.context.fillStyle = `rgb( ${ this.circles[i].fill } )`;
            //this.context.lineWidth = this.gridSize.cols === 16 ? 2 : 1;
            //this.context.strokeStyle =  `rgb( ${ this.circles[i].fill } )`;
            this.context.save();
            this.context.beginPath();
            this.context.arc(this.circles[i].x, this.circles[i].y, this.circleRadius, 0, Math.PI * 2);
            //this.context.stroke();
            this.context.fill();
            this.context.restore();
        }
        //Save to Local Storage
        localStorage.setItem("brickData", JSON.stringify(this.circles));
    }

    convert() {
        let results = [];
        this.uniqueColors = [];
        this.cols = Math.floor(this.imgCanvas.width / this.cellWidth);

        //get colors for image canvas
        for (let row = 0; row < this.gridSize.rows; row++) {
            for (let col = 0; col < this.gridSize.cols; col++) {
                const x = (col * this.cellWidth + this.circleRadius);
                const y = (row * this.cellHeight + this.circleRadius);
                
                // Do something with rgbCode if needed
                this.raw.push(this.calculateResult(x, y));
                results.push(this.calculateResult(x, y));
            }
        }
        
        //save circles
        for(let i = 0; i < this.circles.length; i++){
            let closestColor = this.compareColors(this.splitRGB(results[i]), brickColors);
            let newColor = `${brickColors[closestColor.index].rgb[0]},${brickColors[closestColor.index].rgb[1]},${brickColors[closestColor.index].rgb[2]}`;
            let newStrokeColor = brickColors[closestColor.index].stroke;
            
            this.circles[i].fill = newColor;
            this.circles[i].stroke = newColor;

            // this.circles[i].fill = results[i];
        }

        //reset
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        //draw circles
        this.drawCircles();
        
        //Update Group Colors
        this.handleUpdateColors(event);
        //Bring Drawing Canvas Forward
        this.toggleShowImage(false);
    }

    compareColors(color, colorList) {
        let r1 = color[0];
        let g1 = color[1];
        let b1 = color[2];
        let distanceList = [];
        for(let i = 0; i < colorList.length; i++) {
            let r2 = colorList[i].rgb[0];
            let g2 = colorList[i].rgb[1];
            let b2 = colorList[i].rgb[2];
            let d = Math.sqrt( Math.pow(r1-r2, 2) + Math.pow(g1-g2, 2) + Math.pow(b1-b2, 2) );      
            distanceList.push({distance: d, index: i});
        };
        distanceList = distanceList.sort(function(a, b) {
            return a.distance - b.distance;
        });
        return distanceList[0];
    } 

    splitRGB(str) {
        return str.trim().split(',');
    }

    calculateResult = (x,y) => {
        let store = {};
        const imgData = this.imgContext.getImageData(x, y, this.circleRadius, this.circleRadius);
        const data = imgData.data;
        const total_pixels = this.circleRadius * this.circleRadius;
        const coverage = total_pixels / this.circleRadius;
        const max_pixel_index = total_pixels - 1;
        for (let i = 0; i < coverage; ++i) {
            const x = this.getPixelIndex(Math.floor(Math.random() * max_pixel_index));
            const key = `${data[x]},${data[x + 1]},${data[x + 2]}`;
            const val = store[key];
            store[key] = val ? val + 1 : 1;
        }
        const rgb_code = Object.keys(store).reduce((a, b) =>
            store[a] > store[b] ? a : b
        );
        return rgb_code;
    };

    getPixelIndex(numToRound) {
        //Each pixel is 4 units long: r,g,b,a
        const remainder = numToRound % 4;
        if (remainder == 0) return numToRound;
        return numToRound + 4 - remainder;
    }

    handleUpdateColors(e) {
        const event = new CustomEvent('handleUpdateGroupColors', {
            bubbles: true,
            composed: true,
            cancelable: true,
            detail: this.uniqueColors
        }); 
        e.target.dispatchEvent(event);
    } 

    handleMouseDown(event) {
        this.dragging = true;

        const rect = this.canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
    
        const clickedRow = Math.floor(mouseY / this.cellHeight);
        const clickedCol = Math.floor(mouseX / this.cellWidth);
        if(this.drawMode) {
            this.changeCircleColor(clickedRow, clickedCol);
        }
        if(this.paintMode) {
            this.changeColorGroup(clickedRow, clickedCol)
        }
    }

    handleMouseMove(event) {
        if (!this.dragging) return;
        // ... logic to update circle color
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
    
        const clickedRow = Math.floor(mouseY / this.cellHeight);
        const clickedCol = Math.floor(mouseX / this.cellWidth);
        if(this.drawMode) {
            this.changeCircleColor(clickedRow, clickedCol);
        }
    }

    handleMouseUp(e) {
        this.dragging = false;
    }
    
    changeCircleColor(row, col) {
        this.cols = Math.floor(this.canvas.width / this.cellWidth);
        const index = row * this.cols + col;

        if (this.circles[index]) {
            this.circles[index].fill = `${this.activeColor},${this.activeColorAlpha}`;
        }
        //reset
        this.context.globalCompositeOperation = "destination-over";
        //reset
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); 
        //draw circles
        this.drawCircles();
    }

    changeColorGroup(r,col) {
        this.cols = Math.floor(this.canvas.width / this.cellWidth);
        const index = r * this.cols + col;

        if (this.circles[index]) {
            const clickedCircleColor = this.circles[index].fill;

            this.circles.forEach( (circle, i) => {
                if (circle.fill === clickedCircleColor) {
                    circle.fill = `${this.activeColor},${this.activeColorAlpha}`;
                }
            })
            //reset
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            //draw circles
            this.drawCircles();
        }
    }

    handleDownload() {
        // Create a download link and initiate download
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'lego-mosaic';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    createImage(borderWidth = 0) {
        // Create a temporary canvas
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        // Set the size of the temporary canvas to accommodate the border
        tempCanvas.width = this.canvas.width + 2 * borderWidth;
        tempCanvas.height = this.canvas.height + 2 * borderWidth;
        // Draw the black border
        tempCtx.fillStyle = 'black';
        tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
        // Draw the original canvas content onto the temporary canvas, offset by the border width
        tempCtx.drawImage(this.canvas, borderWidth, borderWidth);
        // Convert the temporary canvas content to a base64 encoded PNG
        const dataURL = tempCanvas.toDataURL('image/png');
        // Dispatch Event
        eventDispatcher.dispatchEvent('handleCreateImage', { dataURL: dataURL });
        localStorage.setItem("projectURL", dataURL);
    }

    saveProject() {
        //Save to Local Storage
        localStorage.setItem("brickData", JSON.stringify(this.circles));
    }
    
}

customElements.define('mosaic-canvas', MosaicCanvas);
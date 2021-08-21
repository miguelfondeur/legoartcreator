/************************************************************ 

CREATE 
    Problems

    ToDos
    - Step One
        - Functionality Complete
    - Step Two
        - Make Image Editable
        - 
    - Step Three
        - Toggle Original Image (for comparison)
        - List all lego colors Used
    - Step Four
        - Edit Colors As group 
    - Random
        - Show/Hide Preview grid
        - Add SVG Icons
        - Add Tooltips for icons
        - Disable buttons if user has not completed required actions
        - add Hugo
        - refactor as components
        - Save all data to localStorage
    - Style 
        - add background to main page

    Done
    - The canvas select ADDS to the circles array instead of replacing it
    - Add warning image if the board has an image
    - Actually Clear the board

*********************************************************** */
//Imports
// import globalHeader from './components/layout/header/index.js';
// import globalFooter from './components/layout/footer/index.js';

//variables ==================================================================================//

//DOM Elements
const artBoard = document.getElementById('artBoard');
const imgUrl = document.getElementById('imgUrl');
const sizeSelect = document.getElementById('boardSize');
const convertButton = document.getElementById('convert');
const convertToLego = document.getElementById('convertToLego');
const svgGrid = document.querySelector('.svg-grid');
const resizeWarning = document.querySelector('.resize-warning');
const bgWarning = document.querySelector('.bg-warning');
const imgColor = document.querySelector('#imgColor');
const resetBG = document.querySelector('#resetBG');
const styles = getComputedStyle(document.documentElement);
let canvasBG = styles.getPropertyValue('--canvas-bg');
let canvasSVG = styles.getPropertyValue('--canvas-svg');

//Booleans
var imageUploaded = false;

//Arrays
var circles = []; //create a new array for circles
var uniqueColors = [];
var raw =[];
var legoColors = [];

//Numbers
var radius = 4;
var num = radius + 1;
var amount1 = 96;
var amount2 = 96;

var Canvas = artBoard.getContext('2d');

//User Data


//ON LOAD ==================================================================================//
window.onload = function() {
    drawGrid("standard");
    imgColor.value = canvasBG.trim();
};  

axios({
        method: 'get',
        responseType: 'json',
        url: 'https://rebrickable.com/api/v3/lego/colors/?key=b1225b13eeb9efde6bcb38032a01922f'
    })
    .then(function (response) {
        response.data.results.forEach(function(result, i){
            if(!result.is_trans) {
                legoColors.push(
                    { 
                        id: result.id,
                        name: result.name,
                        color: hexToRgb(result.rgb),
                    }
                );
            }
        });
        // console.log('lego colors ', legoColors);
    })
    .catch(function (error) {
        console.log(error);
    });


//STEP 1 ==================================================================================//
//This should run on render (Reactive?)

sizeSelect.addEventListener('change', function(e){
    document.querySelector('#canvas-container').className = sizeSelect.value;
    resetCirclesArray();
    if(sizeSelect.value === "standard") {
        artBoard.width = 480;
        drawGrid("standard")
    }
    if(sizeSelect.value === "wide") {
        artBoard.width = 960;
        drawGrid("wide")
    }
    if(sizeSelect.value === "ultra") {
        artBoard.width = 1440;
        drawGrid("ultra")
    }
    //Make sure SVG Grid is visible for preview
    SVGGridVisible(true);
    //Set Image to not uploaded
    showResizeWarning(false)
});

imgColor.addEventListener("change", watchColorPicker, false);

resetBG.addEventListener("click", function(){
    document.documentElement.style.setProperty('--canvas-svg', "#000000");
    imgColor.value = canvasBG.trim();
    showBGWarning(false);
});

function watchColorPicker(event) {
    document.documentElement.style.setProperty('--canvas-svg', event.target.value);
    showBGWarning(false);
}

//STEP 2 ==================================================================================//
imgUrl.addEventListener('change', function(){
    //reset before uploading new image
    clearCanvas();
    //Draw image to canvas
    if(this.files && this.files[0]) {
        drawImageFromUrl(URL.createObjectURL(this.files[0]))
    }
    //Make sure SVG Grid is visible for preview
    SVGGridVisible(true);
    showResizeWarning(true)
});

function drawImageFromUrl(sourceurl) {
    var img = new Image();
    img.addEventListener('load', function() {
        Canvas.drawImage(
            img, 
            0,
            0,
            img.width,
            img.height,
            0,
            0,
            artBoard.width,
            artBoard.height
        );
    });
    img.setAttribute('src', sourceurl);
}

//STEP 3 ==================================================================================//
convertButton.addEventListener('click', function(e){
    // console.log(circles)
    convert();
    //consolidate colors
    circles.forEach((circle, i) => {
        if(!uniqueColors.includes(circles[i].fill)){
            uniqueColors.push(circles[i].fill); 
        }
    });

    convertToLego.removeAttribute('disabled');
});

function convert(x,y) {
    document.documentElement.style.setProperty('--canvas-bg', 'var(--canvas-svg)');
    var results = [];
    //get colors
    for(let i = 1; i <= amount1; i+=2 ) {
        for(let j = 1; j <= amount2; j+=2 ){
            raw.push(calculateResult(num*j,num*i));
            results.push( calculateResult(num*j,num*i) );
        }
    }
    //remove svg grid
    SVGGridVisible(false);
    //reset
    clearCanvas();
    //draw circles
    for(let i = 0; i < circles.length; i++) {
        var circle = new Circle();
        circle.draw(circles[i].x, circles[i].y, `rgb( ${results[i]} )`);
        //add result to circle
        circles[i].fill = results[i];
    }
}

//STEP 4 ==================================================================================//
convertToLego.addEventListener('click', function(){
    //reset
    clearCanvas()
    //Convert background
    var bg = compareColors( convertToRGB(imgColor.value), legoColors);
    var newBG = `${legoColors[bg.index].color.r},${legoColors[bg.index].color.g},${legoColors[bg.index].color.b}`;
    document.documentElement.style.setProperty('--canvas-bg', `rgb( ${newBG} )`);
    showBGWarning(true);

    //draw circles
    for(let i = 0; i < circles.length; i++) {
        let circle = new Circle();
        let closestColor = compareColors(splitRGB(circles[i].fill), legoColors);
        let newColor = `${legoColors[closestColor.index].color.r},${legoColors[closestColor.index].color.g},${legoColors[closestColor.index].color.b}`;
        circle.draw(circles[i].x, circles[i].y, `rgb( ${newColor} )`);
        //add result to circle
        circles[i].fill = newColor;
    }
});

function compareColors(color, colorList) {
    let r1 = color[0];
    let g1 = color[1];
    let b1 = color[2];
    let distanceList = [];
    for(let i = 0; i < colorList.length; i++) {
        let r2 = colorList[i].color.r;
        let g2 = colorList[i].color.g;
        let b2 = colorList[i].color.b;
        let d = Math.sqrt( Math.pow(r1-r2, 2) + Math.pow(g1-g2, 2) + Math.pow(b1-b2, 2) );      
        distanceList.push({distance: d, index: i});
    };
    distanceList = distanceList.sort(function(a, b) {
        return a.distance - b.distance;
    });
    return distanceList[0];
}

//HELPERS ==================================================================================//
function drawGrid(size) {
    if(size === 'standard') {
        amount1 = 96;
        amount2 = 96;
    } 
    if(size === 'wide') {
        amount1 = 96;
        amount2 = 192;
    }
    if(size === 'ultra') {
        amount1 = 96;
        amount2 = 288;
    }
    Canvas.globalCompositeOperation = "destination-over";
    //Circle Styles for new draw
    Canvas.fillStyle = 'transparent';
    Canvas.strokeStyle = 'transparent';
    //draw circles
    for(let i = 1; i <= amount1; i+=2 ){
        for(let j = 1; j <= amount2; j+=2 ){
            var circle = new Circle(num*j,num*i);
            circle.draw(num*j,num*i);
            circles.push(circle.props);
        }
    }
}
//at 97 the amount1 goes back to 1

function Circle(x,y) {
    this.props = { x:x, y:y, fill: ''}
    this.draw = function(x,y,fill) {
        Canvas.fillStyle = fill;
        Canvas.strokeStyle = fill;
        Canvas.save();
        Canvas.beginPath();
        Canvas.arc(x,y,radius,0, Math.PI * 2, false);
        Canvas.stroke();
        Canvas.fill();
        Canvas.restore();
    };
}

//event listeners
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    var obj = result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
    return obj;
}

//for each circle
var calculateResult = (x,y) => {
    let store = {};
    const imgData = Canvas.getImageData(x, y, radius, radius); //x, y, width, height
    const data = imgData.data;

    const total_pixels = radius * radius;
    const coverage = total_pixels / radius;

    const max_pixel_index = total_pixels - 1;

    for (let i = 0; i < coverage; ++i) {
        const x = getPixelIndex(Math.floor(Math.random() * max_pixel_index));
        const key = `${data[x]},${data[x + 1]},${data[x + 2]}`;
        const val = store[key];
        store[key] = val ? val + 1 : 1;
    }

    const rgb_code = Object.keys(store).reduce((a, b) =>
        store[a] > store[b] ? a : b
    );

    return rgb_code;
};

function splitRGB(str) {
   return str.trim().split(',');
}

function getPixelIndex(numToRound) {
    //Each pixel is 4 units long: r,g,b,a
    const remainder = numToRound % 4;
    if (remainder == 0) return numToRound;
    return numToRound + 4 - remainder;
}

function convertToRGB(str) {
    str = str.replace('#', '');
    if(str.length != 6){
        throw "Only six-digit hex colors are allowed.";
    }

    var aRgbHex = str.match(/.{1,2}/g);
    var aRgb = [
        parseInt(aRgbHex[0], 16),
        parseInt(aRgbHex[1], 16),
        parseInt(aRgbHex[2], 16)
    ];
    return aRgb;
}

function clearCanvas() {
    Canvas.clearRect(0, 0, artBoard.width, artBoard.height);
}

function resetCirclesArray() {
    circles = [];
}

function SVGGridVisible(visible) {
    if(!visible) {
        svgGrid.style.display = "none";
    } else {
        svgGrid.style.display = "block";
    }
}

function showResizeWarning(visible) {
    if(visible) {
        resizeWarning.style.display = "block";
    } else {
        resizeWarning.style.display = "none";
        //Clear Image
        imgUrl.value = "";
    }
}

function showBGWarning(visible) {
    if(visible) {
        bgWarning.style.display = "block";
    } else {
        bgWarning.style.display = "none";
    }
}
/****************************
    Project Web Worker
*****************************/

console.log('From the Web Worker');

//Imports
import { initialBrickData } from "../data/initialBrickData.js";

//Project data Model
const project = {
    name: "New Project",
    size: "480",
    frameColor: "0,0,0", 
    canvasColor: "0,0,0",
    image: "",
    imageEditor: {
        x: 0,
        y: 0,
        zoomLevel: 1,
        rotation: 0, 
        saturation: 1, 
        flippedHorizontal: false,
        brightness: 1, 
        contrast: 1, 
    },
    processedImage: "",
    projectImage: "",
    brickData: [], //If no localStorage data, hydrate with initialProjectData.js
    uniqueBricks: [],
    bricks: [],
    frameBricks: [],
    canvasBricks: [],
}

//Check IndexedDB !! Web Workers can't work with local storage. 

//Message Actions
self.onmessage = function(message) {
    if(message === "getProjectData") {

    }

    if(message === "setName") {

    }

    if(message === "setSize") {

    }

    if(message === "setBricks") {

    }

    if(message === "setCanvasColor") {

    }

    if(message === "setFrameColor") {

    }
}


//Functions
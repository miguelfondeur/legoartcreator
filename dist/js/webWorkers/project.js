/****************************
    Project Web Worker
*****************************/

//Imports
import { brickColors } from "js/data/brickColors";
import { initialProjectData } from "js/data/initialProjectData";

//Project data Model
const project = {
    name: "New Project",
    size: "480",
    image: "",
    processedImage: "",
    projectImage: "",
    frameColor: "",
    brickData: [], //If no localStorage data, hydrate with initialProjectData.js
    uniqueBricks: [],
    bricks: [],
    frameBricks: [],
    canvasBricks: [],
}

//Initialize Data from LocalStorage
if(localStorage.getItem('brickData')) { 
    console.log('Web Worker: has brickData')
} else {
    console.log('No brick data')
}

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
/****************************
    Project Web Worker
*****************************/

//Imports
import { initialBrickData } from "../data/initialBrickData.js";

//Project data Model
const project = {
    name: "Your Project",
    //Step One
    size: "320", // [160,320,480,960,...]
    frame: "white", // [black,white]
    canvas: "white",
    //Step Two
    image: "",
    settings: {
        x: 0,
        y: 0,
        zoomLevel: 1,
        rotation: 0, 
        saturation: 1, 
        flippedHorizontal: false,
        brightness: 1, 
        contrast: 1, 
    },
    brickData: initialBrickData, //If no localStorage data, hydrate with initialProjectData.js
    //Finish
    finished: false,
    processedImage: "",
    projectImage: "",
    //Parts
    uniqueBricks: [],
    bricks: [],
    frameBricks: [],
    canvasBricks: [],
}

//Check IndexedDB !! Web Workers can't work with local storage. 

//Message Actions
self.onmessage = function(e) {
    const message = e.data;
    
    if (message.command === 'fetchData') {
        self.postMessage({
            size: project.size,
            name: project.name,
            frame: project.frame, 
            canvas: project.canvas,
            imgage: project.image,
            settings: project.settings,
        });
    }

    // if(message === "setName") {

    // }

    // if(message === "setSize") {

    // }

    // if(message === "setBricks") {

    // }

    // if(message === "setCanvas") {

    // }

    // if(message === "setFrame") {

    // }
}


//Functions
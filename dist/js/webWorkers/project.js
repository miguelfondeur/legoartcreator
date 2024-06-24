// Imports
import { initialBrickData } from "../data/initialBrickData.js";

// Initialize IndexedDB Values
const dbName = "ProjectDB";
const storeName = "projectData";
const dbVersion = 1;  // Version number for schema management
const messageQueue = [];
let isInitialized = false;

// Project data Model
const project = {
    id: 1,
    name: "My Project",
    size: "480",
    frame: "0,0,0",
    canvas: "0,0,0",
    image: "",
    settings: {
        x: 0,
        y: 0,
        zoomLevel: 1,
        rotation: 0, 
        saturation: 1, 
        brightness: 1, 
        contrast: 1, 
        flippedHorizontal: false,
        locked: false,
    },
    brickData: initialBrickData,
    finished: false,
    processedImage: "",
    projectImage: "",
    uniqueBricks: [],
    bricks: [],
    frameBricks: [],
    canvasBricks: []
};

async function initializeWorker() {
    try {
        const db = await openIndexedDB();
        const storedData = await fetchProjectData(db);
        if (storedData) {
            Object.assign(project, storedData);
        }
        isInitialized = true;
        messageQueue.forEach(msg => handleCommand(msg)); // Process all queued messages
        self.postMessage({ type: 'initialized' });
    } catch (error) {
        console.error('Error initializing data:', error);
    }
}

self.onmessage = function(e) {
    if (!isInitialized) {
        console.warn("Queuing message until initialization is complete.");
        messageQueue.push(e.data); // Queue messages until the worker is initialized
    } else {
        handleCommand(e.data);
    }
};


async function handleCommand(message) {
    switch (message.command) {
        case 'fetchData':
            self.postMessage({
                type: 'dataFetched',
                payload: {
                    size: project.size,
                    name: project.name,
                    frame: project.frame, 
                    canvas: project.canvas,
                    image: project.image,
                    settings: project.settings,
                }
            });
            break;
        case 'updateName':
            if (message.name && project.name !== message.name) {
                project.name = message.name;
                await saveProjectData(project);
                self.postMessage({
                    type: 'nameUpdated',
                    payload: {
                        name: project.name
                    }
                });
            }
            break;
        case 'updateSize':
            if (message.size && project.size !== message.size) {
                project.size = message.size;
                await saveProjectData(project);
                self.postMessage({
                    type: 'sizeUpdated',
                    payload: {
                        size: project.size
                    }
                });
            }
            break;
        case 'updateCanvas':
            if (message.canvas && project.canvas !== message.canvas) {
                project.canvas = message.canvas;
                await saveProjectData(project);
                self.postMessage({
                    type: 'canvasUpdated',
                    payload: {
                        canvas: project.canvas
                    }
                });
            }
            break;
        case 'updateFrame':
            if (message.frame && project.frame !== message.frame) {
                project.frame = message.frame;
                await saveProjectData(project);
                self.postMessage({
                    type: 'frameUpdated',
                    payload: {
                        frame: project.frame
                    }
                });
            }
            break;
        case 'updateImage':
            if (message.image && project.image !== message.image) {
                project.image = message.image;
                await saveProjectData(project);
                self.postMessage({
                    type: 'imageUpdated',
                    payload: {
                        image: project.image
                    }
                });
            } else {
                console.log('No image update needed or no new image provided');  // Debugging log
            }
            break;
        case 'updateSettings':
            console.log('ran updateSettings', message.settings)
            // Update settings based on received message
            Object.keys(message.settings).forEach(key => {
                if (project.settings.hasOwnProperty(key)) {
                    if (key === 'rotation') {
                        project.settings.rotation = (project.settings.rotation + message.settings[key] + 360) % 360;
                    } else if (key !== 'flippedHorizontal' && key !== 'locked') {
                        project.settings[key] += message.settings[key];
                    } else {
                        project.settings[key] = message.settings[key];
                    }
                } else {
                    console.log('message.settings[key]', key)
                }
            });
            await saveProjectData(project);
            self.postMessage({
                type: 'settingsUpdated',
                payload: {
                    settings: project.settings
                }
            });
            break;
        case 'saveProject':
            await saveProjectData(project);
            self.postMessage({ type: 'projectSaved', status: 'success' });
            break;
        default:
            self.postMessage({ type: 'error', payload: { message: 'Unknown command' } });
            break;
    }
}

// IndexedDB Functions
async function openIndexedDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, dbVersion);
        request.onupgradeneeded = function(event) {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(storeName)) {
                db.createObjectStore(storeName, { keyPath: "id" });
            }
        };
        request.onsuccess = function(event) {
            resolve(event.target.result);
        };
        request.onerror = function(event) {
            reject('IndexedDB error: ' + event.target.errorCode);
        };
    });
}

async function fetchProjectData(db) {
    const transaction = db.transaction([storeName], "readonly");
    const store = transaction.objectStore(storeName);
    const request = store.get(project.id);
    return new Promise((resolve, reject) => {
        request.onsuccess = function(event) {
            resolve(request.result);
        };
        request.onerror = function(event) {
            reject('Fetch error: ' + event.target.errorCode);
        };
    });
}

async function saveProjectData(project) {
    const db = await openIndexedDB();
    const transaction = db.transaction([storeName], "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.put(project);
    return new Promise((resolve, reject) => {
        request.onsuccess = function() {
            resolve('Data saved successfully');
        };
        request.onerror = function(event) {
            reject('Save error: ' + request.error);
        };
    });
}

// Run initialization
initializeWorker();

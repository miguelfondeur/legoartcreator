const chokidar = require('chokidar');
const path = require('path');
const includeHtmlPartials = require('./tasks/includeHtmlPartials'); // Assuming includePartials.js exports its function

const sourceDir = 'path/to/your/html'; // Source directory of your HTML files
const partialsDir = 'path/to/your/partials'; // Directory where partials are stored

// Watcher for HTML and partial files
const watcher = chokidar.watch([sourceDir, partialsDir], {
    ignored: /^\./, 
    persistent: true
});

// Function to be called when a file is changed
const onFileChange = (path) => {
    console.log(`File ${path} has been changed`);
    includeHtmlPartials();
};

// Event listeners for the watcher
watcher
    .on('change', onFileChange)
    .on('error', error => console.error(`Watcher error: ${error}`));

console.log('Watching for file changes...');
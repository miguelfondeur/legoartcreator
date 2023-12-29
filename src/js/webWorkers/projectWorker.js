// Initialize the web worker
const projectWorker = new Worker('../js/webWorkers/project.js', { type: 'module' });

// Optionally export the worker for use in modules
export default projectWorker;
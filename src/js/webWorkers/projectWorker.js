// Initialize the web worker
const projectWorker = new Worker('./workers/project.js', { type: 'module' });

// Optionally export the worker for use in modules
export default projectWorker;
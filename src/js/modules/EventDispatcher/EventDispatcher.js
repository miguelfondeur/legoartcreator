// EventDispatcher.js

class EventDispatcher {
    constructor() {
      this.listeners = {};
    }
  
    addEventListener(eventType, callback) {
        if (!this.listeners[eventType]) {
            this.listeners[eventType] = [];
        }
        this.listeners[eventType].push(callback);
    }
  
    removeEventListener(eventType, callback) {
        if (this.listeners[eventType]) {
            const index = this.listeners[eventType].indexOf(callback);
            if (index !== -1) {
                this.listeners[eventType].splice(index, 1);
            }
        }
    }
  
    dispatchEvent(eventType, eventData) {
        if (this.listeners[eventType]) {
            this.listeners[eventType].forEach((callback) => {
                callback(eventData);
            });
        }
    }
  }
  
  export default EventDispatcher;
  
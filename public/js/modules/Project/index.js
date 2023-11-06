(() => {
  // ns-hugo:/Users/miguelfondeur/Projects/Lego Art Creator/legoartcreator/assets/js/modules/EventDispatcher/EventDispatcher.js
  var EventDispatcher = class {
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
  };
  var EventDispatcher_default = EventDispatcher;

  // ns-hugo:/Users/miguelfondeur/Projects/Lego Art Creator/legoartcreator/assets/js/modules/EventDispatcher/sharedEventDispatcher.js
  var sharedEventDispatcher = new EventDispatcher_default();

  // <stdin>
  var Project = class extends HTMLElement {
    //Stage: Component Created
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: "open" });
      this.activeView = "creator";
      shadow.innerHTML = `
            <style>
                .flex { display: flex; }
                .relative { position: relative; }
                .min-h-full { min-height: 100%; }
            </style>
            <section class="flex min-h-full relative">
                <slot name="header"></slot>
                <slot name="project"></slot>
            </section>`;
    }
    //Life Cycle Hooks
    attributeChangedCallback(prop, oldVal, newVal) {
    }
    // Stage: 'Component now connected to DOM'
    connectedCallback() {
    }
    //Functions
  };
  customElements.define("mosaic-project", Project);
})();

export default class SmallSVGGrid extends HTMLElement {
    connectedCallback() {
        this.updateForSize(this.closest('#wrapper')?.getAttribute('size'));
    }

    async updateForSize(size) {
        if (size !== '160' || this.loaded || this.loading) return;

        this.loading = true;
        try {
            const response = await fetch('/img/grids/smallgrid.svg');
            if (!response.ok) throw new Error(`Unable to load small grid: ${response.status}`);

            this.innerHTML = await response.text();
            this.querySelector('svg')?.classList.add('h-full');
            this.loaded = true;
        } catch (error) {
            console.error('Unable to load the small grid preview:', error);
        } finally {
            this.loading = false;
        }
    }
}

customElements.define('small-grid', SmallSVGGrid);

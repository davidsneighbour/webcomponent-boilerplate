export class MyComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<p>My Web Component</p>`;
  }
}

customElements.define('my-component', MyComponent);

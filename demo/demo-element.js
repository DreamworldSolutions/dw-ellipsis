import { LitElement, html, css } from 'lit-element';
import '../dw-ellipsis';

class DemoElement extends LitElement {
  static get styles() {
    return [
      css`
        :host{
          display: block;
        }
      `
    ]
  }
  render() {
    return html`
      <h2>dw-ellipsis Demo:</h2>
      <dw-ellipsis><strong>Hello World. Hello World</strong></dw-ellipsis>
      <dw-ellipsis><strong>Hello World. Hello World</strong></dw-ellipsis>
    `
  }
}

customElements.define('demo-element', DemoElement);
import { LitElement, html, css } from '@dreamworld/pwa-helpers/lit.js';
import '../dw-ellipsis';

class DemoElement extends LitElement {
  static get styles() {
    return [
      css`
        :host{
          display:block;
        }

        .first { 
          width: 50px;
        }
      `
    ]
  }
  render() {
    return html`
      <h2>dw-ellipsis Demo:</h2>
      <dw-ellipsis class="first" .placement=${"bottom"}><strong>Hello World. Hello World</strong></dw-ellipsis><br>
      <dw-ellipsis><strong>Hello World. Hello World</strong></dw-ellipsis>
    `
  }
}

customElements.define('demo-element', DemoElement);
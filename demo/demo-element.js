import { LitElement, html, css } from '@dreamworld/pwa-helpers/lit.js';
import '../dw-ellipsis';

class DemoElement extends LitElement {
  static get styles() {
    return [
      css`
        :host{
          display:block;
        }

        .abc { 
          display: inline-block;
          width: 50px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      `
    ]
  }
  render() {
    return html`
      <h2>dw-ellipsis Demo:</h2>
      <dw-ellipsis><strong class = "abc">Hello World. Hello World</strong></dw-ellipsis><br>
      <dw-ellipsis><strong>Hello World. Hello World</strong></dw-ellipsis>
    `
  }
}

customElements.define('demo-element', DemoElement);
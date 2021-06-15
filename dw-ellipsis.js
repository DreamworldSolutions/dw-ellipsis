import { html, css } from 'lit-element';
import { LitElement } from '@dreamworld/pwa-helpers/lit-element.js';

export class DwEllipsis extends LitElement {
  static get properties() {
    return {
      /**
       * When ellipsis is applied, shows tooltip on hover.
       */
      _title: { type: String, reflect: true, attribute: 'title' }
    }
  }

  firstUpdated(changedProps) {
    super.firstUpdated && super.firstUpdated(changedProps);
    this.__computeEllipsis();
  }

  render() {
    return html`
      <slot></slot>
    `;
  }

  /**
   * When text overflows, sets title of element.
   */
  __setTitle() {
    this._title = '';
  }
}

customElements.define('dw-ellipsis', DwEllipsis);
import { LitElement, html, css } from "@dreamworld/pwa-helpers/lit.js";

/**
 * Purpose: Shows ellipsis & full text in tooltip when it overflows.
 *
 * Behaviors:
 *  - Applies ellipsis style when text overflows.
 *  - When user hovers on text & its overflowed, shows it in tooltip.
 * 
 * Usage pattern:
 *  <dw-ellipsis>Your text here.</dw-ellipsis>
 */
export class DwEllipsis extends LitElement {
  static styles = [css``];

  static properties = {
    /**
     * When ellipsis is applied, shows tooltip on hover.
     */
    _toolTipText: { type: String },
  };

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("mouseenter", this._showTooltip);
    this.addEventListener("mouseleave", this._hideTooltip);
  }

  render() {
    return html` <slot></slot> `;
  }

  /**
   * When text overflows, shows text content in tooltip.
   */
  _showTooltip() {}

  /**
   * When tooltip text is set, hides tooltip.
   */
  _hideTooltip() {}
}

customElements.define("dw-ellipsis", DwEllipsis);

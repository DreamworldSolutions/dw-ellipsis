import { LitElement, html, css } from "@dreamworld/pwa-helpers/lit.js";
import '@dreamworld/dw-tooltip';
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

  get _tooltipTemplate() {
    if(!this._toolTipText){
      return;
    }
    return html`
    <dw-tooltip
         trigger="manual"
        .forEl=${this}
        .offset=${[0, 8]}
        .extraOptions=${{ delay: [500, 0]}}
        .content=${this._toolTipText}>
    </dw-tooltip>
    `
  }

  get _toolTipEl(){
    return this.renderRoot.querySelector('dw-tooltip');
    }

  render() {
    return html` 
    <slot></slot>
    ${this._tooltipTemplate}
    `;
  }

  /**
   * When text overflows, shows text content in tooltip.
   */
  async _showTooltip() {
    if (this.scrollWidth <= this.offsetWidth){
      return;
    }
    this._toolTipText = this.textContent;
    await this.updateComplete;
    this._toolTipEl && this._toolTipEl.show();
  }

  /**
   * When tooltip text is set, hides tooltip.
   */
  async _hideTooltip() {
    this._toolTipText = "";
    await this.updateComplete;
    this._tooltipEl && this._tooltipEl.hide();
  }
}

customElements.define("dw-ellipsis", DwEllipsis);

import { LitElement, html, css } from "@dreamworld/pwa-helpers/lit.js";
import Bowser from "bowser";
import "@dreamworld/dw-tooltip";

const browser = Bowser.getParser(window.navigator.userAgent);
const browserName = browser.getBrowserName();
let showInSafari = false;

/**
 * Purpose: Shows ellipsis & full text in tooltip when it overflows.
 *
 * Behaviors:
 *  - Applies ellipsis style when text overflows.
 *  - When user hovers on text & its overflowed, shows it in tooltip.
 *  - The tooltip is not displayed in the Safari browser.
 *  - using the static method `showTooltipInSafari` enable custom tooltips in Safari.
 *
 * Usage pattern:
 *  <dw-ellipsis>Your text here.</dw-ellipsis>
 */
export class DwEllipsis extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      `,
    ]
  }

  static get properties() {
    return {
      /**
       * When ellipsis is applied, shows tooltip on hover.
       */
      _toolTipText: { type: String },

      /**
       * Input property
       * Positions the tippy relative to its reference element.
       * Use the suffix -start or -end to shift the tippy to the start or end of the reference element, instead of centering it.
       * For example, "top-start" or  "left-end".
       * Default value - 'top'
       */
      placement: {
        type: String,
      }
    };
  }

  constructor() {
    super();
    this.placement = "top";
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("mouseenter", this._showTooltip);
    this.addEventListener("mouseleave", this._hideTooltip);
  }

  get _tooltipTemplate() {
    if (!this._toolTipText || (browserName === "Safari" && !showInSafari)) {
      return;
    }
    
    return html`
      <dw-tooltip
        trigger="manual"
        .forEl=${this}
        .offset=${[0, 8]}
        .extraOptions=${{ delay: [500, 0] }}
        .content=${this._toolTipText}
        .placement=${this.placement}
      >
      </dw-tooltip>
    `;
  }

  get _toolTipEl() {
    return this.renderRoot.querySelector("dw-tooltip");
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
    if (this.scrollWidth <= this.offsetWidth) {
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

  /**
   * It is used in the Safari browser to display tooltips. 
   */
  static showTooltipInSafari() {
    showInSafari = true;
  }
}

customElements.define("dw-ellipsis", DwEllipsis);

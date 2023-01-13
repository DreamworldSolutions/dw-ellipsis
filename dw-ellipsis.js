import { LitElement, html, css } from "@dreamworld/pwa-helpers/lit.js";
import Bowser from "bowser";
import "@dreamworld/dw-tooltip";

const browser = Bowser.getParser(window.navigator.userAgent);
const browserName = browser.getBrowserName();

/**
 * Purpose: Shows ellipsis & full text in tooltip when it overflows.
 *
 * Behaviors:
 *  - Applies ellipsis style when text overflows.
 *  - When user hovers on text & its overflowed, shows it in tooltip.
 *  - When using the Safari browser, the tooltip is not displayed. 
 *  - If the user wants a custom tooltip, They have to call the static method `showTooltipInSafari`.
 *
 * Usage pattern:
 *  <dw-ellipsis>Your text here.</dw-ellipsis>
 */
export class DwEllipsis extends LitElement {
  static styles = [
    css`
      :host {
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    `,
  ];

  static properties = {
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
    },

    /**
     * Input property.
     * When text is overflow, tooltips are always shown in the Safari browser. This is the browser's default behavior. Thus, we need this property.
     * If a property's value is true, our custom tooltip will be shown in the Safari browser.
     * If a property's value is false, our custom tooltip will not be shown in the Safari browser.
     */
    showInSafari: {
      type: Boolean,
    },
  };

  constructor() {
    super();
    this.placement = "top";
    this.showInSafari = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("mouseenter", this._showTooltip);
    this.addEventListener("mouseleave", this._hideTooltip);
  }

  get _tooltipTemplate() {
    if (!this._toolTipText) {
      return;
    }

    if (browserName === "Safari") {
      if (!this.showInSafari) {
        this._hideTooltip;
        return;
      }
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

  static showTooltipInSafari() {
    this.showInSafari = true;
  }
}

customElements.define("dw-ellipsis", DwEllipsis);

# @dreamworld/dw-ellipsis

A Web Component that applies CSS ellipsis when text overflows a single line, and displays the full text in a tooltip on hover. The tooltip is only rendered when overflow is actually detected.

---

## 1. User Guide

### Installation & Setup

```bash
yarn add @dreamworld/dw-ellipsis
```

Import the component (registers the `<dw-ellipsis>` custom element):

```javascript
import '@dreamworld/dw-ellipsis';
```

### Basic Usage

The component must be given a constrained width (via CSS on the element or a parent container) for ellipsis and tooltip behavior to activate.

```html
<!-- Basic text truncation -->
<dw-ellipsis style="width: 150px;">
  This is a long text that will be truncated.
</dw-ellipsis>
```

```html
<!-- With inline HTML content -->
<dw-ellipsis style="width: 150px;">
  <strong>Hello World. Hello World</strong>
</dw-ellipsis>
```

```html
<!-- With tooltip placement set -->
<dw-ellipsis style="width: 150px;" placement="top">
  Long text truncated with tooltip above.
</dw-ellipsis>
```

```html
<!-- Suppress tooltip entirely -->
<dw-ellipsis style="width: 150px;" noTooltip>
  This text will be clipped but shows no tooltip.
</dw-ellipsis>
```

---

### API Reference

#### Properties / Attributes

| Property | Type | Default | Required | Description |
|---|---|---|---|---|
| `placement` | `String` | `"bottom"` | No | Positions the tooltip relative to the element. Accepted values: `top`, `bottom`, `left`, `right`. Append `-start` or `-end` to shift alignment (e.g. `top-start`, `left-end`). |
| `noTooltip` | `Boolean` | `false` | No | When `true`, suppresses the tooltip entirely — even when text overflows. |

#### Events

None. No custom events are dispatched by this component.

#### Slots

| Slot | Description |
|---|---|
| *(default)* | The text or inline HTML to display. **All child HTML elements must be inline-level** (e.g. `<span>`, `<a>`, `<strong>`). Block-level elements are not supported. |

#### CSS Custom Properties

None defined.

#### Static Methods

| Method | Description |
|---|---|
| `DwEllipsis.showTooltipInSafari()` | Enables the custom tooltip in Safari. By default, tooltip display is suppressed in Safari because the browser natively shows a tooltip for overflowing text. Calling this method enables the custom tooltip, but both the browser's native tooltip and the custom tooltip will appear simultaneously. |

---

### Advanced Usage

#### Safari Behavior

Safari automatically shows a native tooltip when text overflows an element. To avoid duplicate tooltips, `dw-ellipsis` suppresses its custom tooltip in Safari by default.

To opt in to the custom tooltip in Safari (accepting dual-tooltip behavior):

```javascript
import { DwEllipsis } from '@dreamworld/dw-ellipsis';

DwEllipsis.showTooltipInSafari();
```

This must be called once before any `<dw-ellipsis>` instances are interacted with.

#### Disabling the Tooltip

Use `noTooltip` when you want ellipsis styling only, with no tooltip on hover:

```html
<dw-ellipsis style="width: 100px;" noTooltip>
  Text clipped, no tooltip shown.
</dw-ellipsis>
```

#### Inline Content Constraint

When passing HTML child elements, they **must** be inline-level. Block-level elements will break layout:

```html
<!-- Correct: inline elements -->
<dw-ellipsis style="width: 200px;">
  <a href="#">Link text</a> with <strong>emphasis</strong>
</dw-ellipsis>

<!-- Incorrect: block element inside -->
<dw-ellipsis style="width: 200px;">
  <div>This will break layout</div>
</dw-ellipsis>
```

---

## 2. Developer Guide / Architecture

### Architecture Overview

`dw-ellipsis` is a **LitElement Web Component** with Shadow DOM encapsulation. It is composed of two concerns: CSS-level overflow truncation and programmatic tooltip management.

#### Design Patterns

| Pattern | Detail |
|---|---|
| **Web Component / Custom Element** | Registered as `<dw-ellipsis>` via `customElements.define`. Extends `LitElement`. |
| **Shadow DOM** | LitElement's default shadow root; styles are fully encapsulated. |
| **Composition** | Delegates tooltip rendering and behavior to `<dw-tooltip>` (`@dreamworld/dw-tooltip`). |
| **Reactive Properties** | Uses LitElement's `static properties` system. `_toolTipText` drives conditional tooltip rendering. |
| **Slot-based Content Projection** | Content is passed through a `<slot>` — the component has no opinion about the text itself. |

#### Overflow Detection

On `mouseenter`, the component compares:

```javascript
if (this.scrollWidth <= this.offsetWidth) return; // no overflow, skip tooltip
```

If overflow is detected, `this.textContent` is stored in `_toolTipText`, triggering a re-render that injects `<dw-tooltip>`, which is then imperatively shown.

#### Tooltip Lifecycle

- **Show:** `mouseenter` → overflow check → set `_toolTipText` → `await updateComplete` → `dw-tooltip.show()`
- **Hide:** `mouseleave` → clear `_toolTipText` → `await updateComplete` → `dw-tooltip.hide()`
- The tooltip uses `trigger="manual"` — it is never auto-triggered by hover.

#### Tooltip Internal Configuration

These values are hardcoded in the component and not configurable via props:

| Option | Value | Description |
|---|---|---|
| `offset` | `[0, 8]` | 8px vertical gap between element and tooltip |
| `delay` | `[500, 0]` | 500ms before showing; hides immediately |
| `zIndex` | `11111` | High stacking order to appear above most UI |

#### Browser Detection

Bowser is loaded once at module evaluation time (client-side only, guarded by `isServer`):

```javascript
if (!isServer) {
  browser = Bowser.getParser(window.navigator.userAgent);
  browserName = browser.getBrowserName();
}
```

The module-level `showInSafari` flag (default `false`) gates tooltip rendering in Safari. It is mutated only by `DwEllipsis.showTooltipInSafari()`.

#### Host Styles

Applied via `:host` in Shadow DOM — these are non-configurable:

```css
:host {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
```

#### Module System

The package is published as an **ES Module** (`"type": "module"` in `package.json`). No CommonJS build is provided.

#### Development

```bash
yarn start
# Starts @web/dev-server serving demo/index.html with file watching
```

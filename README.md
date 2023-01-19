# dw-ellipsis
## Introduction
- An element to show ellipsis when it's text overflows (single line); and on hover shows full-text in the tooltip. Tooltip isn't shown when no ellipsis is applied to the text. 
- __Note:__ The tooltip will not be displayed in the Safari browser. because when text is overflowing, tooltips are always shown in the Safari browser. This is the browser's default behavior. To enable custom tooltips in Safari, you can use the "showTooltipInSafari" method.

## Installation Steps
1. `yarn add @dreamworld/dw-ellipsis`

## Usage
### Import
- `import '@dreamworld/dw-ellipsis'`

### Used
> Note: When content of this includes HTML tags. Make sure that those must be `inline` elements. e.g. `span`, `a` etc..
- ```
  <dw-ellipsis>Your text here..</dw-ellipsis>
  ```

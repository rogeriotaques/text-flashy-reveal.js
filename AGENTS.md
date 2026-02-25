# AGENTS.md - Developer Guidelines for text-flashy-reveal

## Overview

Lightweight vanilla JS library for text flashy-reveal animations on scroll. Zero dependencies, single source file.

## Project Structure

```
text-flashy-reveal/
├── .editorconfig
├── index.html             # Demo page
├── text-flashy-reveal.js  # Main library
├── package.json
├── README.md
└── LICENSE
```

## Commands

### Demo
```bash
npm start .   # or python3 -m http.server 9898 or php -S localhost:9898 -t .
```

### Tests (no framework installed yet)
Tests are performed using the demo page.

No build step required - distributed as single ES6 module.

## Code Style

### General
- **Zero dependencies** - no external libraries
- **Vanilla JS** - ES6+ features, no transpilation
- **Single file** - all code in `text-flashy-reveal.js`

### Formatting
- 2 spaces indentation
- Single quotes for strings
- Template literals for interpolation
- Trailing commas where appropriate
- Max line length: 120 characters

### Naming
- Functions: `camelCase` (e.g., `textFlashyReveal`, `splitText`)
- Variables: `camelCase` (e.g., `hasAnimated`, `animatableChars`)
- Private functions: prefix with `_` if needed

### Imports/Exports
```js
export function textFlashyReveal(element, options) { }
import { textFlashyReveal } from "./text-flashy-reveal.js"; // when using from local file
import { textFlashyReveal } from "text-flashy-reveal"; // when using from node_modules
import { textFlashyReveal } from "https://unpkg.com/text-flashy-reveal.js@0.1.0/text-flashy-reveal.js"; // when using from CDN
```

### Types
Vanilla JS without TypeScript. Use JSDoc:
```js
/**
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @param {string} [options.accentColor]
 * @returns {Function} Cleanup function
 */
```

### Error Handling
```js
if (!element) {
  throw new Error('Element is required for textFlashyReveal');
}
```

### CSS & Styling
- Set styles directly on DOM elements via JavaScript
- Use CSS transitions for animations
- Include `aria-hidden="true"` on animated spans
```js
span.setAttribute("aria-hidden", "true");
span.style.transition = `opacity ${config.fadeDuration}ms ease`;
```

### DOM Manipulation
- Use `document.createElement`, `appendChild`, `setAttribute`
- Clean up observers/listeners in cleanup function

### Comments
- JSDoc for public API
- Brief inline comments for complex logic (`// force reflow`)

### Accessibility
- Always set `aria-hidden="true"` on decorative elements
- Ensure text readable after animation

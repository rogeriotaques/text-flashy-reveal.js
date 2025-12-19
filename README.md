# TextFlashyReveal.js

A lightweight JavaScript library for creating beautiful text flashy-reveal animations that trigger on scroll. Perfect for headers, hero sections, and any text that needs to grab attention with a smooth, staggered reveal effect.

## ✨ Features

- 🎯 **Zero dependencies** - Just plain JavaScript
- 🎨 **Customizable** - Adjust colors, timing, and animation behavior
- 📱 **Scroll-triggered** - Uses Intersection Observer for performance
- 🔄 **Replay support** - Animations can replay on scroll
- ⚡ **Lightweight** - Minimal impact on your bundle size

## 📦 Installation

### Option 1: Download Directly

Download `text-flashy-reveal.js` and include it in your project:

```html
<script type="module">
  import { textFlashyReveal } from "./path/to/text-flashy-reveal.js";
  // Your code here
</script>
```

### Option 2: Copy the Function

Copy the `textFlashyReveal` function from the source file directly into your project.

## 🚀 Quick Start

```html
<!DOCTYPE html>
<html>
  <head>
    <title>TextFlashyReveal.js Demo</title>
  </head>
  <body>
    <h1 id="hero">Welcome to TextFlashyReveal.js</h1>

    <script type="module">
      import { textFlashyReveal } from "./text-reveal.js";

      textFlashyReveal(document.querySelector("#hero"));
    </script>
  </body>
</html>
```

## 📖 API Reference

### `textFlashyReveal(element, options)`

**Parameters:**

- `element` (HTMLElement): The text element to animate
- `options` (Object): Configuration options

**Options:**

```js
{
    accentColor: "#ff7a00",       // Initial color during fade-in
    transitionColor: undefined,   // Intermediate color (auto-calculated if not provided)
    finalColor: "#000",           // Final color after animation
    revealDelay: 40,              // Delay between characters (ms)
    fadeDuration: 350,            // Fade-in duration (ms)
    colorDelay: 300,              // Color transition delay (ms)
    flashDelay: 150,              // Flash effect delay (ms)
    replay: true,                 // Replay animation on scroll back
    revealOnReplay: true,         // Whether to reveal characters on replay (vs just color flash)
    threshold: 0.4                // Intersection observer threshold (0-1)
}
```

**Returns:**

- `Function`: Cleanup function to disconnect the observer

## 💡 Examples

### Basic Usage

```js
import { textFlashyReveal } from "./text-reveal.js";

textFlashyReveal(document.querySelector("h1"));
```

### Custom Colors and Timing

```js
textFlashyReveal(document.querySelector("#hero"), {
  accentColor: "#3b82f6",
  transitionColor: "#93c5fd",
  finalColor: "#1e293b",
  revealDelay: 25,
  fadeDuration: 200,
  flashDelay: 100,
});
```

### Replay on Scroll

```js
textFlashyReveal(document.querySelector("#replay-text"), {
  replay: true,
  revealOnReplay: false, // Only flash colors on replay, don't re-reveal
  threshold: 0.5,
  revealDelay: 35,
});
```

## 🎯 Use Cases

- **Hero sections** - Make your main headlines pop
- **Feature lists** - Reveal bullet points with style
- **About sections** - Add personality to your story
- **Call-to-actions** - Draw attention to important messages
- **Portfolio pieces** - Give your work that extra polish

## 🎨 Color Animation Flow

The animation follows a three-stage color progression:

1. **Accent Color** (`accentColor`) - Initial bright color when character appears
2. **Transition Color** (`transitionColor`) - Softer intermediate color (auto-calculated as 60% lighter accent if not specified)
3. **Final Color** (`finalColor`) - End state color for normal text

**Timing:**

- Character fades in with `fadeDuration`
- Waits `flashDelay` before transitioning to intermediate color
- Waits `colorDelay` before transitioning to final color

## 🔧 Advanced Options

### Replay Behavior

- `replay: true` - Animation triggers every time element enters viewport
- `revealOnReplay: true` - Characters fade in from opacity 0 on replay
- `revealOnReplay: false` - Characters are already visible, only colors change on replay

### Performance Tuning

- `threshold: 0.4` - How much of element must be visible to trigger (0-1)
- Lower values = triggers earlier, higher values = triggers later
- `revealDelay` - Controls animation speed (lower = faster)

## 🔧 How It Works

TextFlashyReveal.js splits text into individual character spans, then uses CSS transitions and Intersection Observer to:

1. Hide characters initially
2. Detect when element enters viewport
3. Stagger character reveals with randomized order
4. Transition through the three color stages
5. Optionally reset for replay based on settings

## 🐛 Troubleshooting

### Common Issues

**Animation doesn't trigger:**

- Check that the element exists before calling `textFlashyReveal()`
- Ensure the element has text content
- Verify the element becomes visible in the viewport
- Try adjusting the `threshold` value (lower = triggers earlier)

**Animation looks choppy:**

- Reduce `revealDelay` for smoother stagger effect
- Increase `fadeDuration` for smoother transitions
- Check for CSS conflicts that might override transitions

**Colors don't transition properly:**

- Ensure color values are valid hex codes (e.g., "#ff7a00")
- Check that `accentColor` and `finalColor` provide enough contrast
- Use `transitionColor` for custom intermediate colors

**Performance issues:**

- Use `replay: false` if you don't need scroll-based replays
- Increase `threshold` to trigger later in viewport
- Limit the number of animated elements on a single page

### Browser Support

- Modern browsers that support ES6 modules and Intersection Observer
- For older browser support, consider adding polyfills

## 📄 License

MIT License - feel free to use in personal and commercial projects.

## 👨‍💻 Author

Created by [Rogerio Taques](https://x.com/rogeriotaques)

---

Made with ☕️ and plain JavaScript! 🎉

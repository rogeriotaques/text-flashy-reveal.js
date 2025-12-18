# TextReveal.js

A lightweight JavaScript library for creating beautiful text reveal animations that trigger on scroll. Perfect for headers, hero sections, and any text that needs to grab attention with a smooth, staggered reveal effect.

## ✨ Features

- 🎯 **Zero dependencies** - Just plain JavaScript
- 🎨 **Customizable** - Adjust colors, timing, and animation behavior
- 📱 **Scroll-triggered** - Uses Intersection Observer for performance
- 🔄 **Replay support** - Animations can replay on scroll
- ⚡ **Lightweight** - Minimal impact on your bundle size

## 🚀 Quick Start

```html
<!DOCTYPE html>
<html>
<head>
    <title>TextReveal.js Demo</title>
</head>
<body>
    <h1 id="hero">Welcome to TextReveal.js</h1>
    
    <script type="module">
        import { textReveal } from "./text-reveal.js";
        
        textReveal(document.querySelector("#hero"));
    </script>
</body>
</html>
```

## 📖 API Reference

### `textReveal(element, options)`

**Parameters:**
- `element` (HTMLElement): The text element to animate
- `options` (Object): Configuration options

**Options:**
```js
{
    accentColor: "#ff7a00",    // Color during fade-in
    finalColor: "#000",         // Final color after animation
    revealDelay: 40,            // Delay between characters (ms)
    fadeDuration: 350,          // Fade-in duration (ms)
    colorDelay: 300,            // Color transition delay (ms)
    replay: false,              // Replay animation on scroll back
    threshold: 0.4              // Intersection observer threshold
}
```

**Returns:**
- `Function`: Cleanup function to disconnect the observer

## 💡 Examples

### Basic Usage
```js
import { textReveal } from "./text-reveal.js";

textReveal(document.querySelector("h1"));
```

### Custom Colors and Timing
```js
textReveal(document.querySelector("#hero"), {
    accentColor: "#3b82f6",
    finalColor: "#1e293b",
    revealDelay: 25,
    fadeDuration: 200
});
```

### Replay on Scroll
```js
textReveal(document.querySelector("#replay-text"), {
    replay: true,
    threshold: 0.5,
    revealDelay: 35
});
```

## 🎯 Use Cases

- **Hero sections** - Make your main headlines pop
- **Feature lists** - Reveal bullet points with style
- **About sections** - Add personality to your story
- **Call-to-actions** - Draw attention to important messages
- **Portfolio pieces** - Give your work that extra polish

## 🔧 How It Works

TextReveal.js splits text into individual character spans, then uses CSS transitions and Intersection Observer to:
1. Hide characters initially
2. Detect when element enters viewport
3. Stagger character reveals with randomized order
4. Transition from accent color to final color
5. Optionally reset for replay

## 📄 License

MIT License - feel free to use in personal and commercial projects.

## 👨‍💻 Author

Created by [Rogerio Taques](https://x.com/rogeriotaques)

---

Made with ☕️ and plain JavaScript! 🎉
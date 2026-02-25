/**
 * TextFlashyReveal.js
 * This little library makes text animations look awesome with zero hassle!
 *
 * Just throw any text element at it and watch the magic happen. Characters will
 * fade in randomly with a nice color transition effect. Perfect for headers,
 * hero sections, or anywhere you want to grab attention without being too flashy.
 *
 * You can customize colors, timing, and even make it replay every time someone
 * scrolls back up. Simple to use, lightweight, and it just works. Just the way
 * we like it!
 *
 * @author Rogerio Taques
 * @version 0.1.1
 * @license MIT
 */
export function textFlashyReveal(element, options = {}) {
  if (!element) {
    throw new Error("Element is required for textFlashyReveal");
  }

  function lightenColor(hex, percent = 50) {
    hex = hex.replace("#", "");

    // Parse RGB
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    // Lighten by blending with white
    const lighten = (color) =>
      Math.round(color + (255 - color) * (percent / 100));

    const newR = lighten(r);
    const newG = lighten(g);
    const newB = lighten(b);

    // Convert back to hex
    const toHex = (n) => n.toString(16).padStart(2, "0");
    return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
  }

  const config = {
    accentColor: "#ff7a00",
    finalColor: "#000",
    revealDelay: 40,
    fadeDuration: 350,
    colorDelay: 300,
    flashDelay: 150,
    replay: true,
    revealOnReplay: true,
    threshold: 0.4,
    ...options,
  };

  // Calculate transitionColor if not provided
  if (!options.transitionColor) {
    config.transitionColor = lightenColor(config.accentColor, 60);
  }

  let hasAnimated = false;
  let animatableChars = [];
  let observer;

  function splitText() {
    element.style.whiteSpace = "pre";

    const content = [];
    const walk = document.createTreeWalker(element, NodeFilter.SHOW_ALL, null, false);
    let node = walk.nextNode();

    while (node) {
      content.push(node);
      node = walk.nextNode();
    }

    element.innerHTML = "";
    animatableChars = [];

    for (const node of content) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.tagName === 'BR') {
          element.appendChild(node.cloneNode(true));
        } else {
          for (const char of node.textContent) {
            if (char === " ") {
              const space = document.createElement("span");
              space.textContent = " ";
              space.style.display = "inline-block";
              space.style.width = "0.35em";
              element.appendChild(space);
            } else {
              const span = document.createElement("span");
              span.textContent = char;
              span.style.display = "inline-block";
              span.style.opacity = "0";
              span.style.color = config.accentColor;
              span.setAttribute("aria-hidden", "true");
              span.setAttribute("data-flashy-char", "");
              span.style.transition = `
                opacity ${config.fadeDuration}ms ease,
                color ${config.colorDelay}ms ease
              `;
              element.appendChild(span);
              animatableChars.push(span);
            }
          }
        }
      } else if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent.trim();
        if (!text) continue;

        for (const char of text) {
          if (char === " ") {
            const space = document.createElement("span");
            space.textContent = " ";
            space.style.display = "inline-block";
            space.style.width = "0.35em";
            element.appendChild(space);
          } else {
            const span = document.createElement("span");
            span.textContent = char;
            span.style.display = "inline-block";
            span.style.opacity = "0";
            span.style.color = config.accentColor;
            span.setAttribute("aria-hidden", "true");
            span.setAttribute("data-flashy-char", "");
            span.style.transition = `
              opacity ${config.fadeDuration}ms ease,
              color ${config.colorDelay}ms ease
            `;
            element.appendChild(span);
            animatableChars.push(span);
          }
        }
      }
    }
  }

  function shuffle(array) {
    return array
      .map((item) => ({ item, r: Math.random() }))
      .sort((a, b) => a.r - b.r)
      .map((o) => o.item);
  }

  function animate() {
    const shuffled = shuffle(animatableChars);

    shuffled.forEach((char, index) => {
      const delay = index * config.revealDelay;

      setTimeout(() => {
        char.style.opacity = "1";

        setTimeout(() => {
          char.style.color = config.transitionColor;

          setTimeout(() => {
            char.style.color = config.finalColor;
          }, config.colorDelay);
        }, config.flashDelay);
      }, delay);
    });
  }

  function highlightOnly() {
    const shuffled = shuffle(animatableChars);

    shuffled.forEach((char, index) => {
      const delay = index * config.revealDelay;

      setTimeout(() => {
        char.style.color = config.accentColor;

        setTimeout(() => {
          char.style.color = config.transitionColor;

          setTimeout(() => {
            char.style.color = config.finalColor;
          }, config.colorDelay);
        }, config.flashDelay);
      }, delay);
    });
  }

  function reset(immediate = false) {
    animatableChars.forEach((char) => {
      char.style.transition = immediate
        ? "none"
        : `opacity ${config.fadeDuration}ms ease, color ${config.fadeDuration}ms ease`;

      char.style.opacity = "0";
      char.style.color = config.accentColor;

      if (immediate) {
        // force reflow so transition is restored cleanly
        char.offsetHeight;
        char.style.transition = `
          opacity ${config.fadeDuration}ms ease,
          color ${config.fadeDuration}ms ease
        `;
      }
    });
  }

  function observe() {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!hasAnimated) {
              animate();
              hasAnimated = true;
            } else if (config.replay) {
              if (config.revealOnReplay) {
                animate();
              } else {
                highlightOnly();
              }
            }
          } else {
            if (config.replay && hasAnimated && config.revealOnReplay) {
              reset(true);
            }
          }
        });
      },
      { threshold: config.threshold },
    );

    observer.observe(element);
  }

  // Init
  splitText();
  reset(true); // ensure hidden on load
  observe();

  // Return cleanup function
  return () => {
    if (observer) {
      observer.disconnect();
    }
  };
}

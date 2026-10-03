import { apiInitializer } from "discourse/lib/api";

// Browsers like Safari paint their toolbar area with <meta name="theme-color">,
// which Discourse sets to the plain header background. When the header tint is
// enabled, this keeps that area in sync with the tinted header.
export default apiInitializer((api) => {
  if (!settings.header_tint) {
    return;
  }

  // Without color-mix() support the computed color below would silently come
  // out transparent (and be written as black), so leave the meta tags alone.
  if (!window.CSS?.supports?.("color", "color-mix(in srgb, red 50%, blue)")) {
    return;
  }

  const tint = resolveTint();
  const opacity = settings.transparent_header ? settings.header_opacity : 100;
  const strength = settings.header_tint_strength;

  const probe = document.createElement("div");
  probe.style.cssText = "position:absolute;width:0;height:0;visibility:hidden;pointer-events:none";
  document.body.appendChild(probe);

  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 1;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) {
    probe.remove();
    return;
  }

  // Same layering as the CSS: tint over the (semi-transparent) header
  // background over the page background.
  const computeColor = () => {
    probe.style.backgroundColor = `color-mix(in srgb, ${tint} ${strength}%, color-mix(in srgb, var(--header_background) ${opacity}%, var(--secondary)))`;
    const value = getComputedStyle(probe).backgroundColor;
    if (!value || value === "rgba(0, 0, 0, 0)" || value === "transparent") {
      return null;
    }
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = value;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    return "#" + [r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("");
  };

  let applying = false;
  const apply = () => {
    if (applying) {
      return;
    }
    applying = true;
    const color = computeColor();
    if (!color) {
      applying = false;
      return;
    }
    document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
      if (meta.getAttribute("content") !== color) {
        meta.setAttribute("content", color);
      }
    });
    applying = false;
  };

  apply();

  // Recompute when the color scheme changes (system setting or Discourse's
  // own light/dark toggle) and when Discourse rewrites the meta tags.
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => requestAnimationFrame(apply));

  new MutationObserver(() => requestAnimationFrame(apply)).observe(
    document.documentElement,
    { attributes: true, subtree: false }
  );

  new MutationObserver(() => requestAnimationFrame(apply)).observe(
    document.head,
    { childList: true, subtree: true, attributes: true, attributeFilter: ["content", "media", "href"] }
  );

  api.onPageChange(() => apply());
});

function resolveTint() {
  if (settings.header_tint_source !== "custom") {
    return "var(--tertiary)";
  }
  const value = String(settings.header_tint_color || "").trim();
  if (/^[0-9a-f]{3,8}$/i.test(value)) {
    return `#${value}`;
  }
  return value || "var(--tertiary)";
}

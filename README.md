# Terraglass

A clean, modern Discourse theme built around translucent, frosted-glass surfaces (header, sidebar, search) with a considered light and dark color scheme, tied entirely to Discourse's CSS custom properties — no hardcoded colors, works out of the box with automatic light/dark switching.

## Features

- **Frosted glass surfaces** — header, sidebar/hamburger menu, and the header search field/dropdown are semi-transparent with a backdrop blur, all opacity and blur strength configurable.
- **X/Twitter-style link previews** — onebox cards get a hairline border and rounded corners instead of Discourse's default box-shadow look.
- **Considered color schemes** — separate, purpose-built light and dark palettes (not just an inverted single scheme), checked against WCAG AA contrast for text and UI elements.
- **Etiquette-style tags** — tags render with an arrow/flag shape instead of plain pills.
- **Fixed-ratio video embeds** — YouTube and other video oneboxes render at a consistent 16:9 on every device.
- **Zebra-striped topic list** with a subtle hover state.
- **Configurable corner rounding** applied consistently across buttons, cards, modals and inputs.
- **Accessible focus outline** using the scheme's own text color, so it's always visible regardless of light/dark mode.
- Everything above is a theme setting you can turn off or tune — nothing is forced.

## Installation

**Option A — install from this repository (recommended):**

In your Discourse admin, go to *Customize → Themes → Install → From a git repository* and paste:

```
https://github.com/terraboss/terraglass
```

This lets you pull future updates with a single click ("Check for updates") instead of re-uploading a file.

**Option B — install from a downloaded file:**

Download this repository as a ZIP (Code → Download ZIP) and re-zip its contents so `about.json` sits at the root of the archive (not nested in a subfolder), then import it under *Customize → Themes → Install → From a file*.

## Light/dark mode

This theme ships two color schemes, **Terraglass Light** and **Terraglass Dark**. To have Discourse switch automatically based on the visitor's system setting:

1. *Customize → Colors*, select **Terraglass Light**, and set it as the default/light scheme.
2. Select **Terraglass Dark** and mark it as the dark-mode scheme (the option sits next to the color palette list).

No separate "dark mode" component needed — this is handled natively by Discourse.

## Settings

| Setting | Default | Description |
|---|---|---|
| `corner_radius` | `5` | Corner rounding (px) for buttons, cards and inputs. `0` = square. |
| `topic_list_zebra` | on | Subtle zebra striping + hover on the topic list. |
| `hide_subcategories_in_hamburger` | off | Hide subcategories in the classic hamburger menu (usually unneeded once the sidebar is active). |
| `composer_accent` | on | Color the composer's resize handle in the accent color. |
| `hide_uncategorized_in_menu` | on | Hide the "Uncategorized" entry from the hamburger menu (topics stay visible in lists). |
| `transparent_header` | on | Semi-transparent, blurred header. |
| `header_opacity` | `50` | Header opacity in %. |
| `header_blur` | `3` | Header backdrop blur strength (px). |
| `pretty_tags` | on | Flag/arrow-shaped tags instead of plain pills. |
| `pretty_videos` | on | Fixed 16:9 video embeds on every device. |
| `pretty_oneboxes` | on | Hairline-bordered, rounded link preview cards. |
| `onebox_radius` | `14` | Corner radius (px) of onebox cards. |
| `transparent_sidebar` | on | Semi-transparent, blurred sidebar/hamburger menu. |
| `sidebar_opacity` | `85` | Sidebar opacity in %. Kept higher than the header so menu items stay legible. |
| `sidebar_blur` | `6` | Sidebar backdrop blur strength (px). |

## Known issue

`backdrop-filter` (the blur behind the sidebar, hamburger menu and search panel) doesn't render in every browser/Discourse combination, even though the transparency itself works reliably. Background transparency degrades gracefully on its own if this affects you. Tracked upstream: [meta.discourse.org/t/413534](https://meta.discourse.org/t/backdrop-filter-blur-has-no-effect-on-menu-panel-even-though-background-transparency-works/413534).

## Credits

Thanks to the Discourse team for pointing out the extra background layers on the search input and read-notification rows that needed separate overrides.

## License

MIT — see [LICENSE](LICENSE).

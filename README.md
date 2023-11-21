# Obsidian Markdown Image Caption

Generate image caption easily. Completely markdown-based. Compatible with obsidian publish and any markdown editor.

![](https://share.cleanshot.com/NTvJk3hg+)

demo: <https://www.youtube.com/watch?v=dee_OzcibLI>

> [!CAUTION]
> This plugin only works with external images. I don't use local image so I have no intention to support. But I am open to PR.

## Usage

```md
%% caption ![alt](src) %%

%% lightbox ![alt](src) %%

%% lightbox-{group} ![alt](src) %%
```

then it will generate `<figure>` element with a `<figcaption>` element inside on command `generate image caption on current file`.

> [!TIP]
> You will want to use this with custom save plugin to generate image caption on save.

## How it works?

The plugin will recognise the syntax and then check if there is a figure element below it. If not, it will generate one. If yes, the figure element will be replaced by generated result.

## Installation

### Obsidian marketplace

You can install it on community plugin store.

### Through BRAT

1. install the BRAT plugin
2. go to the plugin option, add beta plugin, copy and paste the link of this repo
3. the plugin will automatically appear in the list of installed community plugins, enabled this plugin

### Manual Installation

1. cd to `.obsidian/plugins`
2. git clone this repo
3. `cd obsidian-tag-generator && bun install && bun run build`
4. there you go 🎉

### Update

1. cd to `.obsidian/plugins/obsidian-tag-generator`
2. `git pull`
3. `bun install && bun run build`
4. there you go 🎉

## Notes

1. if you want to contribute, please first open github issue.
2. you can style your caption using css

## Support

If you are enjoying this plugin then please support my work and enthusiasm by buying me a coffee on <https://www.buymeacoffee.com/yomaru>.

<a href="https://www.buymeacoffee.com/yomaru" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

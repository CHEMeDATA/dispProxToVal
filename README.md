## Current Version

![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/chemedata/dispProxToVal?latest)
# dispProxToVal
 The d3 class allows to display in a graphical manner how close a value is to a reference one.

## Usage

To use DispQuality in your project, include `dispProxToVal.js` in the head of your HTML:

```html
<script src="path/to/dispProxToVal.js"></script>
```

To use DispQuality in your project, include `dispProxToVal.js` in the head of your HTML:

```html
<svg id="drawing"></svg>
    <script>
        const dispQuality = new DispProxToVal("#drawing", "path/to/your/data.json");
        dispQuality.init();
    </script>

const dispQuality = new DispQuality("#drawing");
dispQuality.init("./spinFit.json");

```

## Examples

[Example with series of graphs](https://chemedata.github.io/dispProxToVal/examples)
from
[these data](./data/doubleSeries.json)


git tag -a v0.0.4 -m "Release version 0.0.4"
  git push origin v0.0.4
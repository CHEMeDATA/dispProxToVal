## Current Version

![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/chemedata/dispProxToVal?latest)
# dispProxToVal
 The d3 class allows to display in a graphical manner how close a value is to a reference one.

<svg id="drawing"></svg>
<div id="slider-container"></div>
<div id="tooltip" style="position: absolute; visibility: hidden; padding: 8px; background-color: white; border: 1px solid #ccc; border-radius: 5px; pointer-events: none; z-index: 10;"></div>
<script src="https://d3js.org/d3.v7.min.js"></script>
<script src="src/dispProxToVal.js"></script>
<script src="src/slider.js"></script>
<script>
    document.addEventListener('DOMContentLoaded', () => {
        const dispQuality = new DispProxToVal("#drawing");
        dispQuality.init("data/singleton.json");

        const relevantNumberDigits = 4;
        const slider = new Slider('#slider-container', dispQuality, {
            min: -(relevantNumberDigits + 1),
            max: (relevantNumberDigits + 1),
            step: 0.01,
            initialValue: 0,
            width: '200 pt',
            margin: '20px 0',
            logScale: true,
            precision: relevantNumberDigits + 1,
            constantShift: 1, // ref. value 
            shiftLog: relevantNumberDigits, // for logScale
        });
    });
</script>


## Usage

To use DispQuality in your project, include `dispProxToVal.js` in the head of your HTML:

```html
<script src="path/to/dispProxToVal.js"></script>
```
or 
```html
    <script src="https://cdn.jsdelivr.net/gh/CHEMeDATA/dispProxToVal@latest/src/dispProxToVal.js"></script>
```

Then:

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

[Example with series of graphs](https://chemedata.github.io/dispProxToVal/examples/index.html)
from
[these data](./data/doubleSeries.json)

[Example with example of input](https://chemedata.github.io/dispProxToVal/examples/index_single.html)




```
git tag
git tag -a v0.0.11 -m "Release version 0.0.11"
git push origin v0.0.11
```

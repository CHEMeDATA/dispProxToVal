## Current Version

![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/chemedata/dispProxToVal?latest)

# dispProxToVal

Represents how close a value is relative to a reference (1.0 in this case).

<svg id="drawing"></svg>
<div id="slider-container"></div>
<div id="tooltip" style="position: absolute; visibility: hidden; padding: 8px; background-color: white; border: 1px solid #ccc; border-radius: 5px; pointer-events: none; z-index: 10;"></div>
<script src="https://d3js.org/d3.v7.min.js"></script>
<script src="src/dispProxToVal.js"></script>
<script src="src/slider.js"></script>
<script>
    document.addEventListener('DOMContentLoaded', () => {
        const dispQuality = new DispProxToVal("#drawing");
            dispQuality.initJson({ "array": [{ "label": "Initial value: 1.0. Change it with the slider", "value": 1.0 }] }, { types: ["toCen"] });

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
It is reminiscent of a counterweight balance: The finest part of the pointer shows the finest deviation (10<sup>-3</sup> relative to the reference). Each time the width of the pointer increases, the sensitivity decreases by a factor of 10.

A variant when the reference is the upper bond:

<svg id="drawing2"></svg>
<div id="slider-container2"></div>


<script>
    document.addEventListener('DOMContentLoaded', () => {
        const dispQuality2 = new DispProxToVal("#drawing2");
            dispQuality2.initJson({ "array": [{ "label": "Initial value: 1.0. Change it with the slider", "value": 1.0 }] }, { types: ["toMax"] });

        const relevantNumberDigits = 4;
        const slider2 = new Slider('#slider-container2', dispQuality2, {
            min: -(relevantNumberDigits + 1),
            max: 0,
            step: 0.01,
            initialValue: 0,
            width: '100 pt',
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
git tag -a v0.0.12 -m "Release version 0.0.12"
git push origin v0.0.12
```

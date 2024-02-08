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

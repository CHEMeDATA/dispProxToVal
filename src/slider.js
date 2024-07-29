// slider.js

class Slider {
	constructor(containerSelector, dispQuality, options = {}) {
		this.container = document.querySelector(containerSelector);

		if (!this.container) {
			console.error(`Container element not found: ${containerSelector}`);
			return;
		}

		this.dispQuality = dispQuality;

		// Set default options and override with provided options
		this.options = {
			min: options.min || 0,
			max: options.max || 100,
			step: options.step || 1,
			initialValue: options.initialValue || 0,
			width: options.width || "200 pt",
			margin: options.margin || "20px 0",
			precision: options.precision || 2,
			constantShift: options.constantShift || 0,
			shiftLog: options.shiftLog || 0,
			logScale: options.logScale || false,
		};
		this.init();
	}

	init() {
		this.createSlider();
		this.createValueDisplay();
		this.updateValueDisplay(this.slider.value);

		this.slider.addEventListener("input", (event) => {
			this.updateValueDisplay(event.target.value);
			this.updateDispQuality();
		});
	}

	createSlider() {
		this.slider = document.createElement("input");
		this.slider.type = "range";
		this.slider.min = this.options.min;
		this.slider.max = this.options.max;
		this.slider.step = this.options.step;
		this.slider.value = this.options.initialValue;
		this.slider.style.width = this.options.width;
		this.slider.style.margin = this.options.margin;

		this.container.appendChild(this.slider);
	}

	createValueDisplay() {
		this.valueDisplay = document.createElement("span");
		this.valueDisplay.style.marginLeft = "10px";
		this.container.appendChild(this.valueDisplay);
	}

	updateValueDisplay(value) {
		let usedValue = value;
		if (this.options.logScale) {
			if (value > 0) {
				usedValue =
					this.options.constantShift +
					Math.pow(10.0, -this.options.shiftLog + Math.abs(value));
			} else {
				if (value < 0) {
					usedValue =
						this.options.constantShift -
						Math.pow(10.0, -this.options.shiftLog + Math.abs(value));
				} else {
					usedValue = this.options.constantShift;
				}
			}
		}

		const formattedValue = parseFloat(usedValue).toFixed(
			this.options.precision
		);
		this.valueDisplay.textContent = formattedValue;

		// Store the recalculated value
		this.recalculatedValue = formattedValue;
	}

	updateDispQuality() {
		if (typeof this.dispQuality.updateValue === "function") {
			if (
				this.dispQuality 
			) {
				// Send the recalculated value instead of the slider value
				const updateContainer = {
					name: "data",
					value: this.recalculatedValue,
					// showIngestionInLog : true,
					caller: "Slider"
				};

				this.dispQuality.updateValue(updateContainer);
			} else {
				console.error("no value to transmit");
			}
		} else {
			console.error("DispProxToVal class does not have an updateValue method");
		}
	}
}

class DispProxToVal {
	constructor(selector, width = 50, height = 52) {
		this.selector = selector;
		this.width = width;
		this.height = height;
		this.svg = d3
			.select(selector)
			.attr("width", this.width)
			.attr("height", this.height);
		d3.select(selector).style("shape-rendering", "crispEdges");
	}

	async init(fileName) {
		try {
			const data = await d3.json(fileName);
			this.data = this.processData(data);
			this.draw();
		} catch (error) {
			console.error("Error loading the JSON file:", error);
		}
	}

	processData(jsonData) {
		const qualityEachMultiplet =
			jsonData.spinFitVariableArray.qualityEachMultiplet;
		return qualityEachMultiplet
			.filter(
				(item) =>
					item.containsSigma === true &&
					"m5NScalPro" in item &&
					"proj2" in item &&
					"labelVarSet" in item
			)
			.map((item) => ({
				m5NScalPro: item.m5NScalPro,
				proj2: item.proj2,
				labelVarSet: item.labelVarSet,
			}));
	}

	getColorFromMap(expVal, index = 0) {
		expVal = Math.max(0, Math.min(expVal, 1.0));
		const colorMaps = [
			["#FF0000", "#FF00FF", "#7777FF", "#00FFFF"],
			["#FF7700", "#FF7777", "#FF77FF", "#7777FF", "#0077FF"],
			["#FFFF00", "#FFFF77", "#FFFFFF", "#77FFFF", "#00FFFF"],
			["#DD0000", "#008800"],
			["#4444DD", "#008800", "#DD0000"],
		];
		const usedColor = colorMaps[index] || colorMaps[0];
		const ni = usedColor.length - 1;
		let baseColorIndex = Math.floor(expVal * ni);
		if (baseColorIndex > ni - 1) baseColorIndex = ni - 1;
		let adjust = ni * expVal - baseColorIndex;
		if (adjust > 1.0) adjust = 1.0;

		const colorStart = usedColor[baseColorIndex];
		const colorEnd = usedColor[baseColorIndex + 1] || usedColor[baseColorIndex];
		const cR = this.interpolate(
			colorStart.substring(1, 3),
			colorEnd.substring(1, 3),
			adjust
		);
		const cG = this.interpolate(
			colorStart.substring(3, 5),
			colorEnd.substring(3, 5),
			adjust
		);
		const cB = this.interpolate(
			colorStart.substring(5, 7),
			colorEnd.substring(5, 7),
			adjust
		);

		return `#${cR}${cG}${cB}`;
	}

	interpolate(startHex, endHex, factor) {
		const start = parseInt(startHex, 16);
		const end = parseInt(endHex, 16);
		const result = Math.round(start + (end - start) * factor).toString(16);
		return result.padStart(2, "0");
	}

	plot01(refposX = 0, refposY = 0, ratio = 0.9937, is1Max = true) {
		const stroke_width = 1;
		let ratioDispData = [];
		if (!is1Max) {
			for (let i = 0; i < 3; i++) {
				ratioDispData.push((ratio - 1.0) * Math.pow(10.0, i));
			}
		} else {
			for (let i = 0; i < 3; i++) {
				ratioDispData.push((1.0 - ratio) * Math.pow(10.0, i));
			}
		}

		const width = 3;
		const heightCurBlockC = 14;
		let heightCurBlock = heightCurBlockC;

		ratioDispData.forEach((data, i) => {
			heightCurBlock -= 4;
			let value0to1 = !is1Max ? (data + 1.0) / 2.0 : 1.0 - data;
			if (isNaN(value0to1)) return;
			value0to1 = Math.max(0, Math.min(value0to1, 1.0));

			const space = heightCurBlockC - heightCurBlock;
			const shiftUpBlock = Math.round(space * value0to1);
			let colorCodeCode = !is1Max ? 4 : 3;

			this.svg
				.append("rect")
				.attr("x", refposX + i * width)
				.attr("y", refposY + heightCurBlockC - shiftUpBlock - heightCurBlock)
				.attr("width", width)
				.attr("height", heightCurBlock)
				.attr("fill", this.getColorFromMap(value0to1, colorCodeCode))
				.attr("stroke", "black")
				.attr("stroke-width", stroke_width);
		});

		this.drawFrame(
			refposX,
			refposY,
			ratioDispData.length * width,
			heightCurBlockC,
			is1Max
		);
	}

	drawFrame(refposX, refposY, totalWidth, totalHeight, is1Max) {
		let shift_line = !is1Max ? totalHeight / 2 : 0;
		let shift_text = !is1Max ? totalHeight - 5 : totalHeight + 2;

		this.svg
			.append("line")
			.attr("x1", refposX + totalWidth)
			.attr("y1", refposY + shift_line)
			.attr("x2", refposX + totalWidth + 3)
			.attr("y2", refposY + shift_line)
			.attr("stroke", "black")
			.attr("stroke-width", 1);

		this.svg
			.append("line")
			.attr("x1", refposX + totalWidth)
			.attr("y1", refposY)
			.attr("x2", refposX + totalWidth)
			.attr("y2", refposY + totalHeight + 1)
			.attr("stroke", "black")
			.attr("stroke-width", 1);

		this.svg
			.append("text")
			.attr("x", refposX + totalWidth + 3)
			.attr("y", refposY + shift_text)
			.text("1")
			.attr("font-size", "10px")
			.attr("font-family", "Helvetica")
			.attr("font-weight", "bold");
	}
	draw() {
		let posX = 0;
		const posYsp = 15;
		const posYproj = posYsp + 18;
		this.data.forEach((entry, i) => {
			const { m5NScalPro, proj2, labelVarSet } = entry;

			this.plot01(posX, posYsp, m5NScalPro, true);
			this.plot01(posX, posYproj, proj2, false);

			let textElem = this.svg
				.append("text")
				.attr("x", posX)
				.attr("y", 10)
				.text(labelVarSet)
				.attr("font-size", "10px")
				.attr("font-family", "Helvetica")
				.attr("font-weight", "bold");

			let bbox = textElem.node().getBBox();
			posX += bbox.width + 3;
		});
		this.svg.attr("width", posX - 3).attr("height", this.height);
	}
}

export class MyUtils {
	// Constants
	static get lightYellow() {
		return "#F1F576FF";
	}

	static get green() {
		return "#79C24CFF";
	}

	static get black() {
		return "#000000FF";
	}

	static get white() {
		return "#FFFFFFFF";
	}

	// Methods
	static changeTexture(appr, tex) {
		appr.setTexture(tex);
		appr.apply();
		return appr;
	}

	static changeColor(appr, color) {
		appr.setColor(...MyUtils.hexToRgba(color));
		appr.apply();
		return appr;
	}

	static unbind(appr, tex) {
		appr.setTexture(tex);
		tex.unbind();
		return appr;
	}

	static hexToRgba(hex) {
		hex = hex.replace("#", "");
		let r = parseInt(hex.substring(0, 2), 16) / 255;
		let g = parseInt(hex.substring(2, 4), 16) / 255;
		let b = parseInt(hex.substring(4, 6), 16) / 255;
		let a = parseInt(hex.substring(6, 8), 16) / 255;
		return [r, g, b, a];
	}

	static subVector(v1, v2) {
		return {"x": v1["x"] - v2["x"], "y": v1["y"] - v2["y"], "z": v1["z"] - v2["z"]};
	}

	static normalize(v) {
		let length = Math.sqrt(v["x"] ** 2 + v["y"] ** 2 + v["z"] ** 2);
		return {"x": v["x"] / length, "y": v["y"] / length, "z": v["z"] / length};
	}
}

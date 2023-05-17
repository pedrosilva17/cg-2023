import { CGFappearance, CGFobject, CGFtexture } from "../../lib/CGF.js";
import { MyQuad } from "../primitives/MyQuad.js";

/**
 * MyCrosshair
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCrosshair extends CGFobject {
	constructor(scene, texture) {
		super(scene);
		this.crosshair = new MyQuad(scene, null);

		this.crosshairTexture = new CGFtexture(scene, texture);
		this.crosshairAppearance = new CGFappearance(scene);
		this.crosshairAppearance.setShininess(0);
		this.crosshairAppearance.setAmbient(1, 1, 1, 1);
        this.crosshairAppearance.setSpecular(0, 0, 0, 0);
		this.crosshairAppearance.setTexture(this.crosshairTexture);
		this.crosshairAppearance.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");
	}

	display() {
		this.crosshairAppearance.apply();
		this.scene.pushMatrix();
        this.scene.scale(5, 5, 5);
		this.crosshair.display();
		this.scene.popMatrix();
	}
}

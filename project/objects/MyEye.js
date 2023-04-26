import { CGFappearance, CGFobject } from "../../lib/CGF.js";
import { MyUtils } from "../MyUtils.js";
import { MyPrism } from "../primitives/MyPrism.js";
import { MySphere } from "../primitives/MySphere.js";

/**
 * MyEye
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyEye extends CGFobject {
	constructor(scene) {
		super(scene);
		this.base = new MySphere(scene, 30, 60, false, 0.3);
		this.iris = new MySphere(scene, 30, 60, false, 0.25);
		this.pupil = new MySphere(scene, 15, 30, false, 0.1);
		this.eyeAppearance = new CGFappearance(scene);
		this.eyeAppearance.setShininess(100);
	}

	display() {
		// base
		MyUtils.changeColor(this.eyeAppearance, MyUtils.lightYellow);
		this.scene.pushMatrix();
		this.scene.scale(0.2, 1, 0.7);
		this.base.display();

		// iris
		MyUtils.changeColor(this.eyeAppearance, MyUtils.black);
		this.scene.translate(0.1, 0, 0);
		this.iris.display();

		// pupil
		MyUtils.changeColor(this.eyeAppearance, MyUtils.white);
		this.scene.translate(0.2, 0, 0);
		this.scene.scale(1, 0.7, 1);
		this.pupil.display();
		this.scene.popMatrix();

		this.primitiveType = this.scene.gl.TRIANGLES;
	}
}

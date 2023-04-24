import { CGFobject } from "../../lib/CGF.js";
import { MyPrism } from "../primitives/MyPrism.js";
import { MyUnitCubeQuad } from "../primitives/MyUnitCubeQuad.js";

/**
 * MyLeftLeg
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyLeftLeg extends CGFobject {
	constructor(scene, tex) {
		super(scene);
		this.leg = new MyPrism(scene, 360, 2);
		this.foot = new MyUnitCubeQuad(scene, tex);
	}

	display() {
		// leg
		this.scene.pushMatrix();
		this.scene.translate(-2, 0, -0.55);
		this.scene.scale(1, 0.2, 0.2);
		this.scene.rotate(Math.PI / 2, 0, 1, 0);
		this.leg.display();
		this.scene.popMatrix();

		// foot
		this.scene.pushMatrix();
		this.scene.translate(-2, -0.15, -0.55);
		this.scene.scale(0.1, 0.7, 0.4);
		this.foot.display();
		this.scene.popMatrix();

		this.primitiveType = this.scene.gl.TRIANGLES;
	}
}

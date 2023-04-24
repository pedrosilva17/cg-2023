import { CGFobject } from "../../lib/CGF.js";
import { MyTriangle } from "../primitives/MyTriangle.js";
import { MyQuad } from "../primitives/MyQuad.js";

/**
 * MyWing
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyLeftWing extends CGFobject {
	constructor(scene) {
		super(scene);
		this.base = new MyQuad(scene);
		this.tip = new MyTriangle(scene);
	}

	display() {
		this.scene.pushMatrix();
		this.scene.translate(-0.1, 0, -1);
		this.scene.scale(2.7, 1, 1);
		this.base.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
		this.scene.translate(-0.1, 0, -2.5);
		this.scene.scale(1.35, 1, 1);
		this.scene.rotate(Math.PI / 2, 0, 1, 0);
		this.scene.rotate(Math.PI / 2, -1, 0, 0);
		this.tip.display();
		this.tip.display();
		this.scene.popMatrix();
		this.primitiveType = this.scene.gl.TRIANGLES;
	}
}

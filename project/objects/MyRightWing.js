import { CGFappearance, CGFobject, CGFtexture } from "../../lib/CGF.js";
import { MyCone } from "../primitives/MyCone.js";
import { MyParallelogram } from "../primitives/MyParallelogram.js";
import { MyUnitCubeQuad } from "../primitives/MyUnitCubeQuad.js";
import { MyTriangle } from "../primitives/MyTriangle.js";
import { MyQuad } from "../primitives/MyQuad.js";

/**
 * MyWing
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyRightWing extends CGFobject {
	constructor(scene) {
		super(scene);
		this.base = new MyTriangle(scene);
		this.tip = new MyTriangle(scene);
		this.angle = 0;
	}

	display() {
		this.scene.pushMatrix();
		this.scene.rotate(this.angle, 1, 1, 0);
		this.scene.pushMatrix();
		this.scene.translate(0, 0, 1.5);
		this.scene.rotate(Math.PI / 2, 0, 1, 0);
		this.scene.rotate(Math.PI / 4, 1, 0, 0);
		this.base.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
		this.scene.translate(0, 0, 2.5);
		this.scene.rotate(3 * this.angle, 1, 1, 0);
		this.scene.translate(0, 0, -2.5);
		this.scene.translate(0.14, -0.14, 3.47);
		this.scene.rotate(Math.PI / 2, 0, -1, 0);
		this.scene.rotate(Math.PI / 4, -1, 0, 0);
		this.scene.rotate(Math.PI / 16, 0, 1, 0);
		this.tip.display();
		this.scene.popMatrix();
		this.primitiveType = this.scene.gl.TRIANGLES;
	}
}

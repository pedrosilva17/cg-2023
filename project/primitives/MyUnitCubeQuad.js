import { CGFobject, CGFappearance } from "../../lib/CGF.js";
import { MyQuad } from "./MyQuad.js";
/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene, tex) {
		super(scene);
		this.quad = new MyQuad(scene);
		this.texTop = tex;
		this.texFront = tex;
		this.texRight = tex;
		this.texBack = tex;
		this.texLeft = tex;
		this.texBottom = tex;
		this.custom = new CGFappearance(scene);
		this.custom.setShininess(10.0);
		this.custom.setTextureWrap("REPEAT", "REPEAT");
	}

	display() {
		//-X
		this.scene.pushMatrix();
		this.scene.translate(-0.5, 0, 0);
		this.scene.rotate(Math.PI / 2, 0, 0, 1);
		this.custom.setTexture(this.texLeft);
		this.custom.apply();
		this.quad.display();
		this.scene.popMatrix();

		//+X
		this.scene.pushMatrix();
		this.scene.translate(0.5, 0, 0);
		this.scene.rotate(-Math.PI / 2, 0, 0, 1);
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.custom.setTexture(this.texRight);
		this.custom.apply();
		this.quad.display();
		this.scene.popMatrix();

		//+Y
		this.scene.pushMatrix();
		this.scene.translate(0, 0.5, 0);
		this.scene.rotate(-Math.PI / 2, 0, -1, 0);
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.custom.setTexture(this.texTop);
		this.custom.apply();
		this.quad.display();
		this.scene.popMatrix();

		//-Y
		this.scene.pushMatrix();
		this.scene.translate(0, -0.5, 0);
		this.scene.rotate(-Math.PI, 0, 0, 1);
		this.custom.setTexture(this.texBottom);
		this.custom.apply();
		this.quad.display();
		this.scene.popMatrix();

		//+Z
		this.scene.pushMatrix();
		this.scene.translate(0, 0, 0.5);
		this.scene.rotate(Math.PI / 2, 1, 0, 0);
		this.scene.rotate(Math.PI / 2, 0, 1, 0);
		this.custom.setTexture(this.texFront);
		this.custom.apply();
		this.quad.display();
		this.scene.popMatrix();

		//-Z
		this.scene.pushMatrix();
		this.scene.translate(0, 0, -0.5);
		this.scene.rotate(-Math.PI / 2, 1, 0, 0);
		this.scene.rotate(Math.PI / 2, 0, -1, 0);
		this.custom.setTexture(this.texBack);
		this.custom.apply();
		this.quad.display();
		this.scene.popMatrix();
	}
}

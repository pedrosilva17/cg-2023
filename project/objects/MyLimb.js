import { CGFappearance, CGFobject } from "../../lib/CGF.js";
import { MyUtils } from "../MyUtils.js";
import { MyCone } from "../primitives/MyCone.js";
import { MyPrism } from "../primitives/MyPrism.js";
import { MySphere } from "../primitives/MySphere.js";
import { MyUnitCubeQuad } from "../primitives/MyUnitCubeQuad.js";

/**
 * MyLimb
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyLimb extends CGFobject {
	constructor(scene) {
		super(scene);
		this.arm = new MyPrism(scene, 200, 10);
		this.hand = new MySphere(scene, 30, 60, false, 1);
		this.claw = new MyCone(scene, 15);
		this.limbAppearance = new CGFappearance(scene);
		this.limbAppearance.setSpecular(0, 0, 0, 0);
	}

	displayAdjacentClaw(sideIndex) {
		this.scene.pushMatrix();
		this.scene.translate(0.84, 0, 0.1 * sideIndex);
		this.scene.rotate(Math.PI / 2, 0, 0, -1);
		this.scene.rotate(Math.PI / 6, 1 * sideIndex, 0, 0);
		this.scene.scale(0.06, 0.1, 0.06);
		this.claw.display();
		this.scene.popMatrix();
	}

	display() {
		// arm / leg
		MyUtils.changeColor(this.limbAppearance, MyUtils.green);
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI / 2, 0, 1, 0);
		this.scene.scale(0.05, 0.05, 0.6);
		this.arm.display();
		this.scene.popMatrix();

		// hand / foot
		this.scene.pushMatrix();
		this.scene.translate(0.65, 0, 0);
		this.scene.scale(0.25, 0.1, 0.2);
		this.hand.display();
		this.scene.popMatrix();

		// claws
		MyUtils.changeColor(this.limbAppearance, MyUtils.lightYellow);
		this.scene.pushMatrix();
		this.scene.translate(0.86, 0, 0);
		this.scene.rotate(Math.PI / 2, 0, 0, -1);	
		this.scene.scale(0.06, 0.1, 0.06);
		this.claw.display();
		this.scene.popMatrix();
		this.displayAdjacentClaw(-1);
		this.displayAdjacentClaw(1);

		this.primitiveType = this.scene.gl.TRIANGLES;
	}
}

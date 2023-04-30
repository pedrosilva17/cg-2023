import { CGFobject, CGFtexture, CGFappearance } from "../../lib/CGF.js";
import { MySphere } from "../primitives/MySphere.js";
import { MyRightWing } from "./MyRightWing.js";
import { MyLeftWing } from "./MyLeftWing.js";
import { MyEye } from "./MyEye.js";
import { MyUtils } from "../MyUtils.js";
import { MyLimb } from "./MyLimb.js";

/**
 * MyCreature
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCreature extends CGFobject {
	constructor(scene) {
		super(scene);
		this.bodyTexture = new CGFtexture(scene, "images/fur.jpg");
		this.wingTexture = new CGFtexture(scene, "images/feathers.avif");
		this.body = new MySphere(scene, 60, 120, false, 1.5);
		this.eye = new MyEye(scene);
		this.limb = new MyLimb(scene);
		this.leftWing = new MyLeftWing(scene);
		this.rightWing = new MyRightWing(scene);
		this.wingAngle = 0;
		this.yAngle = 0;
		this.velocity = 0;
		this.position = {"x": 0, "y": 0, "z": 0};

		this.defaultAppearance = new CGFappearance(scene);
		this.defaultAppearance.setSpecular(0, 0, 0, 0);
		this.defaultAppearance.setTextureWrap("MIRRORED_REPEAT", "MIRRORED_REPEAT");
	}

	displayBody() {
		this.defaultAppearance = MyUtils.changeTexture(this.defaultAppearance, this.bodyTexture);
		this.scene.pushMatrix();
		this.body.display();
		this.scene.popMatrix();
	}

	displayWings() {
		this.defaultAppearance = MyUtils.changeTexture(this.defaultAppearance, this.wingTexture);
		this.scene.pushMatrix();
		this.scene.translate(0, 1, 0);
		this.scene.scale(0.8, 0.8, 0.8);
		this.leftWing.angle = this.wingAngle;
		this.leftWing.display();
		this.rightWing.angle = -this.wingAngle;
		this.rightWing.display();
		this.scene.popMatrix();
	}

	displayEyes() {
		this.defaultAppearance = MyUtils.unbind(this.defaultAppearance, this.bodyTexture);
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI / 8, 0, 0, 1);
		this.scene.translate(1.5, 0.15, 0.25);
		this.eye.display();
		this.scene.translate(0, 0, -0.5);
		this.eye.display();
		this.scene.popMatrix();
	}

	displayLimbs() {
		this.defaultAppearance = MyUtils.unbind(this.defaultAppearance, this.bodyTexture);
		this.displayArm(-1);
		this.displayArm(1);
		this.displayLeg(-1);
		this.displayLeg(1);
	}

	displayArm(sideIndex) {
		this.scene.pushMatrix();
		this.scene.translate(1.1, 0.3, 0.8 * sideIndex);
		this.scene.rotate(Math.PI / 6, 1 * sideIndex, 0, 0);
		this.scene.rotate(Math.PI / 4, 0, 0, -1);
		this.limb.display();
		this.scene.popMatrix();
	}

	displayLeg(sideIndex) {
		this.scene.pushMatrix();
		this.scene.translate(0, -1, 0.6 * sideIndex);
		this.scene.rotate(Math.PI / 16, 1 * sideIndex, 0, 0);
		this.scene.rotate(Math.PI / 3, 0, 0, -1);
		this.limb.display();
		this.scene.popMatrix();
	}

	display() {
		this.scene.pushMatrix();
		this.scene.translate(this.position["x"], this.position["y"], this.position["z"]);
		this.scene.scale(this.scene.scaleFactor, this.scene.scaleFactor, this.scene.scaleFactor);
		this.scene.rotate(this.yAngle, 0, 1, 0);
		this.displayBody();
		this.displayEyes();
		this.displayLimbs();
		this.displayWings();
		this.scene.popMatrix();
		this.primitiveType = this.scene.gl.TRIANGLES;
	}
}

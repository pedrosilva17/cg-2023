import { CGFappearance, CGFobject, CGFtexture } from "../../lib/CGF.js";
import { MyCone } from "../primitives/MyCone.js";
import { MySphere } from "../primitives/MySphere.js";
import { MyPrism } from "../primitives/MyPrism.js";

/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyHead extends CGFobject {
	constructor(scene, skin) {
		super(scene);
		this.skinTexture = skin;
		this.beakTexture = new CGFtexture(scene, "images/beak.png");
		this.head = new MySphere(scene, 90, 180, false, 1);
		this.beak = new MyCone(scene, 30, null);
		this.crest = new MyCone(scene, 30, null);
		this.eye = new MySphere(scene, 30, 60, false, 0.2);
		this.neck = new MyPrism(scene, 360, 100);
		this.colorAppearance = new CGFappearance(scene);
		this.colorAppearance.setAmbient(0, 0, 0, 0);
		this.colorAppearance.setDiffuse(1, 0, 0, 1);
		this.colorAppearance.setShininess(30);
		this.custom = new CGFappearance(scene);
		this.custom.setSpecular(0, 0, 0, 0);
		this.custom.setShininess(10);
		this.custom.setTextureWrap("REPEAT", "REPEAT");
	}

	display() {
		this.changeTexture(this.skinTexture);
		this.changeColor([1, 1, 1, 1]);

		// head
		this.head.display();

		//eyes
		this.changeColor([1, 0, 0, 1]);
		this.changeTexture();
		this.scene.pushMatrix();
		this.scene.translate(0.7, 0.7, -0.5);
		this.eye.display();
		this.scene.translate(0, 0, 1);
		this.eye.display();
		this.scene.popMatrix();

		// beak
		this.changeColor([1, 1, 1, 1]);
		this.changeTexture(this.beakTexture);
		this.scene.pushMatrix();
		this.scene.translate(0.7, 0, 0);
		this.scene.rotate(-Math.PI / 2, 0, 0, 1);
		this.scene.scale(0.5, 3, 0.5);
		this.beak.display();
		this.scene.popMatrix();

		// crest
		this.changeColor([0, 0, 1, 1]);
		this.changeTexture(this.skinTexture);
		this.scene.pushMatrix();
		this.scene.translate(0, 0.3, 0);
		this.scene.rotate((2.3 * Math.PI) / 6, 0, 0, 1);
		this.scene.scale(0.7, 4, 0.5);
		this.crest.display();
		this.scene.popMatrix();

		// neck
		this.changeColor([1, 0, 0, 1]);
		this.scene.pushMatrix();
		this.scene.translate(-2.5, -1.5, 0);
		this.scene.rotate(Math.PI / 8, 0, 0, 1);
		this.scene.rotate(Math.PI / 2, 0, 1, 0);
		this.scene.scale(0.25, 0.25, 3);
		this.neck.display();
		this.scene.popMatrix();

		this.primitiveType = this.scene.gl.TRIANGLES;
	}

	changeTexture(tex) {
		this.custom.setTexture(tex);
		this.custom.apply();
	}

	changeColor(color) {
		this.custom.setColor(...color);
		this.custom.apply();
	}
}

import { CGFappearance, CGFobject, CGFtexture } from "../../lib/CGF.js";
import { MySphere } from "../primitives/MySphere.js";

export class MyCreatureEgg extends CGFobject {
	constructor(scene, randomize, position) {
		super(scene);
		this.eggTop = new MySphere(scene, 20, 20, false, 0.5, 0.5);
		this.eggBottom = new MySphere(scene, 20, 20, false, 0.5, 0.5);
        this.angleScale = Math.random() * 2 - 1;
		if (randomize) {
			this.position = {"x": Math.random() * (90 + 70) - 70, "y": this.scene.floor, "z": Math.random() * (33 + 70) - 70};
		} else if (position) {
			this.position = position;
		} else {
			this.position = {"x": 0, "y": 0, "z": 0};
		}
		this.eggTexture = new CGFtexture(this.scene, "./images/egg.jpg");

		this.eggAppearance = new CGFappearance(this.scene);
		this.eggAppearance.setShininess(10);

		this.eggAppearance.setTexture(this.eggTexture);
		this.eggAppearance.setTextureWrap("MIRRORED_REPEAT", "MIRRORED_REPEAT");
	}

	setY(y) {
		this.position["y"] = y;
	}

	display() {
		this.eggAppearance.apply();
		this.scene.pushMatrix();
		this.scene.translate(this.position["x"], this.position["y"], this.position["z"]);
        this.scene.rotate(Math.PI / 16, this.angleScale, 0, this.angleScale);
        this.scene.pushMatrix();
        this.scene.scale(1, 2, 1);
        this.eggTop.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.eggBottom.display();
        this.scene.popMatrix();

		this.scene.popMatrix();
	}
}

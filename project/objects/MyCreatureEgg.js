import { CGFappearance, CGFobject, CGFtexture } from "../../lib/CGF.js";
import { MySphere } from "../primitives/MySphere.js";

export class MyCreatureEgg extends CGFobject {
	constructor(scene, size) {
		super(scene);
		this.eggTop = new MySphere(scene, 20, 20, false, 0.5, 0.5);
		this.eggBottom = new MySphere(scene, 20, 20, false, 0.5, 0.5);
        this.angleScale = Math.random() * 2 - 1;
        this.position = {"x": Math.random() * (60 + 33) - 33, "z": Math.random() * (33 + 70) - 70};

		this.eggTexture = new CGFtexture(this.scene, "./images/egg.jpg");

		this.eggAppearance = new CGFappearance(this.scene);
		this.eggAppearance.setShininess(10);

		this.eggAppearance.setTexture(this.eggTexture);
		this.eggAppearance.setTextureWrap("MIRRORED_REPEAT", "MIRRORED_REPEAT");
	}

	display() {
		this.eggAppearance.apply();
		this.scene.pushMatrix();
		this.scene.translate(this.position["x"], -99, this.position["z"]);
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

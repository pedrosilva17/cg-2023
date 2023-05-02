import { CGFappearance, CGFobject, CGFshader, CGFtexture } from "../../lib/CGF.js";
import { MyTorus } from "../primitives/MyTorus.js";

export class MyNest extends CGFobject {
	constructor(scene, torusSlices, tubeSlices, torusRadius, tubeRadius) {
		super(scene);
		this.torus = new MyTorus(scene, torusSlices, tubeSlices, torusRadius, tubeRadius);

		this.nestTexture = new CGFtexture(this.scene, "./images/nest.jpg");

		this.nestAppearance = new CGFappearance(this.scene);
		this.nestAppearance.setSpecular(0, 0, 0, 0);
		this.nestAppearance.setShininess(10);

		this.nestAppearance.setTexture(this.nestTexture);
		this.nestAppearance.setTextureWrap("MIRRORED_REPEAT", "MIRRORED_REPEAT");
	}

	display() {
		this.nestAppearance.apply();
		this.scene.pushMatrix();
		this.scene.translate(-15, -98.5, 0);
		this.scene.rotate(-Math.PI / 2, 1, 0, 0);
		this.torus.display();
		this.scene.popMatrix();
	}
}
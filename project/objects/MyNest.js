import { CGFappearance, CGFobject, CGFshader, CGFtexture } from "../../lib/CGF.js";
import { MyTorus } from "../primitives/MyTorus.js";
import { MyCreatureEgg } from "./MyCreatureEgg.js";


export class MyNest extends CGFobject {
	constructor(scene, torusSlices, tubeSlices, torusRadius, tubeRadius) {
		super(scene);
		this.torus = new MyTorus(scene, torusSlices, tubeSlices, torusRadius, tubeRadius);

		this.nestTexture = new CGFtexture(this.scene, "./images/nest.jpg");

		this.centerRadius = torusRadius-tubeRadius - 0.2;

		this.nestAppearance = new CGFappearance(this.scene);
		this.nestAppearance.setSpecular(0, 0, 0, 0);
		this.nestAppearance.setShininess(10);

		this.nestAppearance.setTexture(this.nestTexture);
		this.nestAppearance.setTextureWrap("MIRRORED_REPEAT", "MIRRORED_REPEAT");
		
		this.eggs = [];
	}

	display() {
		for (let i = 0; i < this.eggs.length; i++) {
			this.scene.pushMatrix();
			this.scene.translate(
				this.centerRadius * Math.cos(2*Math.PI*i/this.eggs.length),
				0,
				this.centerRadius * Math.sin(2*Math.PI*i/this.eggs.length)
			);
			this.eggs[i].display();
			this.scene.popMatrix();
		}

		this.nestAppearance.apply();
		this.scene.pushMatrix();
		this.scene.rotate(-Math.PI / 2, 1, 0, 0);
		this.torus.display();
		this.scene.popMatrix();
	}

	addEgg(egg) {
		this.eggs.push(egg);
	}
}
import { CGFappearance, CGFobject } from "../../lib/CGF.js";
import { MyCube } from "../primitives/MyCube.js";
import { MyRightWing } from "./MyRightWing.js";
import { MyLeftWing } from "./MyLeftWing.js";
import { MyLeftLeg } from "./MyLeftLeg.js";
import { MyRightLeg } from "./MyRightLeg.js";

/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBody extends CGFobject {
	constructor(scene, skin) {
		super(scene);
        this.skinTexture = skin;
        this.body = new MyCube(scene);
		this.leftWing = new MyLeftWing(scene);
		this.rightWing = new MyRightWing(scene);
		this.leftLeg = new MyLeftLeg(scene, this.skinTexture);
		this.rightLeg = new MyRightLeg(scene, this.skinTexture);
		this.custom = new CGFappearance(scene);
		this.custom.setShininess(10.0);
		this.custom.setTextureWrap("REPEAT", "REPEAT");
		this.custom.setTexture(this.skinTexture);
	}

	display() {
        this.custom.apply();

		this.scene.pushMatrix();
		this.scene.translate(-2.8, -1.6, 0);
		this.scene.rotate(Math.PI / 8, 0, 0, 1);

        this.rightWing.display();
		this.leftWing.display();
		this.rightLeg.display();
		this.leftLeg.display();

		this.scene.scale(2.5, 0.7, 1.5);
		this.body.display();
		
		this.scene.popMatrix();
		
		this.primitiveType = this.scene.gl.TRIANGLES;
	}
}

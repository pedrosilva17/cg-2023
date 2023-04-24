import { CGFobject, CGFtexture } from "../../lib/CGF.js";
import { MyBody } from "./MyBody.js";
import { MyHead } from "./MyHead.js";

/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBird extends CGFobject {
	constructor(scene) {
		super(scene);
		this.skinTexture = new CGFtexture(scene, "images/skin.jpg");
		this.head = new MyHead(scene, this.skinTexture);
		this.body = new MyBody(scene, this.skinTexture);
	}

	display() {
		this.head.display();
		this.body.display();
		
		this.primitiveType = this.scene.gl.TRIANGLES;
	}
}

import { CGFappearance, CGFobject } from '../../lib/CGF.js';
import { MySphere } from '../primitives/MySphere.js';

/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPanorama extends CGFobject {
	constructor(scene, texture) {
		super(scene);
        this.texture = texture;
        this.sphere = new MySphere(scene, 90, 180, true, 400);
		this.appearance = new CGFappearance(scene);
	}
	
	display() {
		this.appearance.setTexture(this.texture);
        this.appearance.setShininess(20);
        this.appearance.setTextureWrap("CLAMP TO EDGE", "CLAMP TO EDGE");
        this.appearance.apply();
		this.sphere.display();

		this.primitiveType = this.scene.gl.TRIANGLES;
	}
}

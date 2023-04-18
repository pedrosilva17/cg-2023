import { CGFappearance, CGFobject } from '../../lib/CGF.js';
import { MyCone } from '../primitives/MyCone.js';
import { MySphere } from '../primitives/MySphere.js';
import { MyPrism } from '../primitives/MyPrism.js';

/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBird extends CGFobject {
	constructor(scene) {
		super(scene);
        this.head = new MySphere(scene, 90, 180, false, 1);
		this.beak = new MyCone(scene, 30, null);
		this.headTop = new MyCone(scene, 30, null);
		this.neck = new MyPrism(scene, 360, 100);
		this.appearance = new CGFappearance(scene);
	}
	
	display() {
		// head
		this.head.display();

		// beak
		this.scene.pushMatrix();
		this.scene.translate(0.7, 0, 0);
		this.scene.rotate(-Math.PI /2, 0, 0, 1);
		this.scene.scale(0.5, 3, 0.5);
		this.beak.display();
		this.scene.popMatrix();
		
		// head top
		this.scene.pushMatrix();
		this.scene.translate(0, 0.3, 0);
		this.scene.rotate(2.3*Math.PI /6, 0, 0, 1);
		this.scene.scale(0.7, 4, 0.5);
		this.beak.display();
		this.scene.popMatrix();

		// neck
		this.scene.pushMatrix();
		this.scene.translate(-2.5, -1.5, 0);
		this.scene.rotate(Math.PI /8, 0, 0, 1);
		this.scene.rotate(Math.PI / 2, 0, 1, 0);
		this.scene.scale(0.25, 0.25, 3);
		this.neck.display();
		this.scene.popMatrix();


		this.primitiveType = this.scene.gl.TRIANGLES;
	}
}

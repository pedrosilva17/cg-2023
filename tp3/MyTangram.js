import { CGFobject, CGFappearance } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";

/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
  constructor(scene) {
		super(scene);
		this.diamond = new MyDiamond(scene);
		this.paralellogram = new MyParallelogram(scene);
		this.triangle = new MyTriangle(scene);
		this.triangleBig = new MyTriangleBig(scene);
		this.triangleSmall = new MyTriangleSmall(scene);

		// orange
		this.orange = new CGFappearance(scene);
		this.orange.setAmbient(0, 0, 0, 1.0);
		this.orange.setDiffuse(0, 0, 0, 1.0);
		this.orange.setSpecular(...this.scene.hexToRgbA("#ff9b00"));
		this.orange.setShininess(10.0);

		// yellow
		this.yellow = new CGFappearance(scene);
		this.yellow.setAmbient(0, 0, 0, 1.0);
		this.yellow.setDiffuse(0, 0, 0, 1.0);
		this.yellow.setSpecular(...this.scene.hexToRgbA("#ffff00"));
		this.yellow.setShininess(10.0);

		// blue
		this.blue = new CGFappearance(scene);
		this.blue.setAmbient(0, 0, 0, 1.0);
		this.blue.setDiffuse(0, 0, 0, 1.0);
		this.blue.setSpecular(...this.scene.hexToRgbA("#009bff"));
		this.blue.setShininess(10.0);

		// red
		this.red = new CGFappearance(scene);
		this.red.setAmbient(0, 0, 0, 1.0);
		this.red.setDiffuse(0, 0, 0, 1.0);
		this.red.setSpecular(...this.scene.hexToRgbA("#ff1b1b"));
		this.red.setShininess(10.0);

		// pink
		this.pink = new CGFappearance(scene);
		this.pink.setAmbient(0, 0, 0, 1.0);
		this.pink.setDiffuse(0, 0, 0, 1.0);
		this.pink.setSpecular(...this.scene.hexToRgbA("#ff9bcf"));
		this.pink.setShininess(10.0);

		// purple
		this.purple = new CGFappearance(scene);
		this.purple.setAmbient(0, 0, 0, 1.0);
		this.purple.setDiffuse(0, 0, 0, 1.0);
		this.purple.setSpecular(...this.scene.hexToRgbA("#9650be"));
		this.purple.setShininess(10.0);

		// green
		this.green = new CGFappearance(scene);
		this.green.setAmbient(0, 0, 0, 1.0);
		this.green.setDiffuse(0, 0, 0, 1.0);
		this.green.setSpecular(...this.scene.hexToRgbA("#00ff00"));
		this.green.setShininess(10.0);

    // custom
    this.custom = scene.customMaterial;
	}

  display() {
    let translate = (x,y,z) => {
        return [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            x, y, z, 1
        ];
    };

    // rotate Z
    let rotate = (ang) => {
        return [
            Math.cos(ang), Math.sin(ang), 0, 0,
            -Math.sin(ang), Math.cos(ang), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
    };

    let scale = (x,y,z) => {
        return [
            x, 0, 0, 0,
            0, y, 0, 0,
            0, 0, z, 0,
            0, 0, 0, 1
        ];
    }

    // top left triangle
    this.scene.pushMatrix();
    this.scene.multMatrix(translate(-0.5, 1.5, 0));
    this.scene.multMatrix(scale(0.5,0.5,0.5));
    this.scene.multMatrix(rotate(Math.PI / 2));
    this.red.apply();
    this.triangle.display();
    this.scene.popMatrix();    
    // paralellogram
    this.scene.pushMatrix();
    this.scene.translate(0, 2, 0);
    this.scene.scale(1,1,1);
    this.scene.rotate(Math.PI,0,0,1);
    this.yellow.apply();
    this.paralellogram.display();
    this.scene.popMatrix();
    // square/diamond
    this.scene.pushMatrix();
    this.scene.translate(0.5, 1.5, 0);
    this.scene.scale(Math.sqrt(2)/2,2/Math.sqrt(2)/2,Math.sqrt(2)/2);
    this.scene.rotate(Math.PI / 4, 0,0,1);
    this.custom.apply();
    this.diamond.display();
    this.scene.popMatrix();
    // top right triangle
    this.scene.pushMatrix();
    this.scene.translate(1.5, 1.5, 0);
    this.scene.scale(0.5,0.5,0.5);
    this.purple.apply();
    this.triangle.display();
    this.scene.popMatrix();
    // middle right triangle
    this.scene.pushMatrix();
    this.scene.translate(1, 0, 0);
    this.scene.scale(1, 1,1);
    this.scene.rotate(-Math.PI / 2, 0, 0, 1);
    this.orange.apply();
    this.triangle.display();
    this.scene.popMatrix();
    // middle left triangle
    this.scene.pushMatrix();
    this.scene.translate(-1, 0, 0);
    this.scene.scale(1, 1, 1);
    this.scene.rotate(Math.PI, 0, 0, 1);
    this.blue.apply();
    this.triangle.display();
    this.scene.popMatrix();
    // bottom triangle
    this.scene.pushMatrix();
    this.scene.translate(0, -2, 0);
    this.scene.scale(1, 1, 1);
    this.pink.apply();
    this.triangleSmall.display();
    this.scene.popMatrix();
    
  }
}

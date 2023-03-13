import { CGFobject, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";

/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
  constructor(scene) {"Purple";
		super(scene);
		this.diamond = new MyDiamond(scene);
		this.paralellogram = new MyParallelogram(scene);
		this.orangeTriangle = new MyTriangle(scene, [1, 0, 0.5, 0.5, 1, 1]);
		this.redTriangle = new MyTriangle(scene, [0.5, 0.5, 0.25, 0.75, 0.75, 0.75]);
		this.blueTriangle = new MyTriangle(scene, [0, 0, 1, 0, 0.5, 0.5]);
		this.purpleTriangle = new MyTriangle(scene, [0, 0, 0, 0.5, 0.25, 0.25]);
		this.triangleSmall = new MyTriangleSmall(scene);

        // custom
        this.custom = new CGFappearance(scene);
        this.custom.setShininess(10.0);
        this.custom.loadTexture("images/tangram.png");
        this.custom.setTextureWrap("REPEAT", "REPEAT");
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
    this.custom.apply();
    this.redTriangle.display();
    this.scene.popMatrix();    
    // paralellogram
    this.scene.pushMatrix();
    this.scene.translate(0, 2, 0);
    this.scene.scale(1,1,1);
    this.scene.rotate(Math.PI,0,0,1);
    this.custom.apply();
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
    this.custom.apply();
    this.purpleTriangle.display();
    this.scene.popMatrix();
    // middle right triangle
    this.scene.pushMatrix();
    this.scene.translate(1, 0, 0);
    this.scene.scale(1, 1,1);
    this.scene.rotate(-Math.PI / 2, 0, 0, 1);
    this.custom.apply();
    this.orangeTriangle.display();
    this.scene.popMatrix();
    // middle left triangle
    this.scene.pushMatrix();
    this.scene.translate(-1, 0, 0);
    this.scene.scale(1, 1, 1);
    this.scene.rotate(Math.PI, 0, 0, 1);
    this.custom.apply();
    this.blueTriangle.display();
    this.scene.popMatrix();
    // bottom triangle
    this.scene.pushMatrix();
    this.scene.translate(0, -2, 0);
    this.scene.scale(1, 1, 1);
    this.custom.apply();
    this.triangleSmall.display();
    this.scene.popMatrix();
    
  }
}

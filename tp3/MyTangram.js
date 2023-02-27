import { CGFobject } from "../lib/CGF.js";
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
    this.triangle.display();
    this.scene.popMatrix();    
    // paralellogram
    this.scene.pushMatrix();
    this.scene.translate(0, 2, 0);
    this.scene.scale(1,1,1);
    this.scene.rotate(Math.PI,0,0,1);
    this.paralellogram.display();
    this.scene.popMatrix();
    // square/diamond
    this.scene.pushMatrix();
    this.scene.translate(0.5, 1.5, 0);
    this.scene.scale(Math.sqrt(2)/2,2/Math.sqrt(2)/2,Math.sqrt(2)/2);
    this.scene.rotate(Math.PI / 4, 0,0,1);
    this.diamond.display();
    this.scene.popMatrix();
    // top right triangle
    this.scene.pushMatrix();
    this.scene.translate(1.5, 1.5, 0);
    this.scene.scale(0.5,0.5,0.5);
    this.triangle.display();
    this.scene.popMatrix();
    // middle right triangle
    this.scene.pushMatrix();
    this.scene.translate(1, 0, 0);
    this.scene.scale(1, 1,1);
    this.scene.rotate(-Math.PI / 2, 0, 0, 1);
    this.triangle.display();
    this.scene.popMatrix();
    // middle left triangle
    this.scene.pushMatrix();
    this.scene.translate(-1, 0, 0);
    this.scene.scale(1, 1, 1);
    this.scene.rotate(Math.PI, 0, 0, 1);
    this.triangle.display();
    this.scene.popMatrix();
    // bottom triangle
    this.scene.pushMatrix();
    this.scene.translate(0, -2, 0);
    this.scene.scale(1, 1, 1);
    this.triangleSmall.display();
    this.scene.popMatrix();
    
  }
}

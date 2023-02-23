import { CGFobject } from "../lib/CGF.js";
import { MyQuad } from "./MyQuad.js";
/**
 * MyUniteCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUniteCubeQuad extends CGFobject {
  constructor(scene) {
        super(scene);
        this.quad = new MyQuad(scene);
    }

  display() {
        //-X
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(Math.PI/2, 0,0,1);
        this.quad.display();
        this.scene.popMatrix();

        //+X
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(-Math.PI/2, 0,0,1);
        this.quad.display();
        this.scene.popMatrix();

        //+Y
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.quad.display();
        this.scene.popMatrix();
        
        //-Y
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI, 0,0,1);
        this.quad.display();
        this.scene.popMatrix();

        //+Z
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.scene.rotate(Math.PI/2, 1,0,0);
        this.quad.display();
        this.scene.popMatrix();
        
        //-Z
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(-Math.PI/2, 1,0,0);
        this.quad.display();
        this.scene.popMatrix();


  }
}

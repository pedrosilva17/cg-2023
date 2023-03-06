import { CGFobject } from "../lib/CGF.js";
/**
 * MyPrism
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPrism extends CGFobject {
  constructor(scene, slices, stacks) {
    super(scene);
    this.slices = slices;
    this.stacks = stacks;
    // this.initBuffers();
  }

  display() {
    this.vertices = [];
    this.normals = [];
    this.indices = [];
    const angle = (2*Math.PI)/this.slices;
    const ver_per_face = 2*this.slices;

    for (let i = 0; i <= this.stacks; i++) {
      for (let j = 0; j < this.slices; j++) {
        this.vertices.push(Math.cos(angle*j), Math.sin(angle*j),1/this.stacks*i);
        this.vertices.push(Math.cos(angle*(j+1)), Math.sin(angle*(j+1)),1/this.stacks*i);
        this.normals.push(-(Math.sin(angle*j) - Math.sin(angle*(j+1))),Math.cos(angle*j) - Math.cos(angle*(j+1)), 0);
        this.normals.push(-(Math.sin(angle*j) - Math.sin(angle*(j+1))),Math.cos(angle*j) - Math.cos(angle*(j+1)), 0);
      }
    }

    for (let k = 0; k < this.stacks; k++) {
      for (let l = 0; l < this.slices; l++) {
        // triangle 1
        this.indices.push((l+(this.stacks*k))*2);
        this.indices.push(l+ver_per_face*(k+1));
        this.indices.push((l+(this.stacks*k))*2+1);
        // triangle 2
        this.indices.push((l + this.stacks * k) * 2 + 1);
        this.indices.push(l + ver_per_face * (k + 1));
        this.indices.push(l + ver_per_face * (k + 1) + 1);
      }
    }

    console.log(this.vertices);
    
    this.primitiveType = this.scene.gl.TRIANGLES;

    this.initGLBuffers();
  }
}

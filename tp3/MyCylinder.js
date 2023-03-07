import { CGFobject } from "../lib/CGF.js";
/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCylinder extends CGFobject {
  constructor(scene, slices, stacks) {
    super(scene);
    this.slices = slices;
    this.stacks = stacks;
    this.initBuffers();
  }

  initBuffers() {
    this.vertices = [];
    this.normals = [];
    this.indices = [];
    const angle = (2 * Math.PI) / this.slices;
    const ver_per_face = 2 * this.slices;

    for (let i = 0; i <= this.stacks; i++) {
      for (let j = 0; j < this.slices; j++) {
        this.vertices.push(
          Math.cos(angle * j),
          Math.sin(angle * j),
          (1 / this.stacks) * i
        );
        // this.vertices.push(
        //   Math.cos(angle * (j + 1)),
        //   Math.sin(angle * (j + 1)),
        //   (1 / this.stacks) * i
        // );
        // this.normals.push(
        //   -(Math.sin(angle * j) - Math.sin(angle * (j + 1))),
        //   Math.cos(angle * j) - Math.cos(angle * (j + 1)),
        //   0
        // );
        this.normals.push(
          Math.cos(angle * j),
          Math.sin(angle * j),
          0
        );
      }
    }

    for (let k = 0; k < this.stacks; k++) {
      for (let l = 0; l < this.slices; l++) {
        // triangle 1
        this.indices.push(l % this.slices+(k * (this.slices)));
        this.indices.push(l % this.slices+(k * (this.slices))+1);
        this.indices.push(l % this.slices+((k+1) * (this.slices)));
        // triangle 2
        this.indices.push(l % this.slices+(k * (this.slices))+1);
        this.indices.push(l % this.slices+((k+1) * (this.slices))+1);
        this.indices.push(l % this.slices+((k+1) * (this.slices)));
      }
    }
    this.indices[this.slices*this.stacks*6-3] = 0;
    this.indices[this.slices*this.stacks*6-2] = ((this.slices-1) * this.stacks)+1;
    this.indices[this.slices*this.stacks*6-1] = ((this.slices-1) * this.stacks);

    console.log(this.indices)

    this.primitiveType = this.scene.gl.TRIANGLES;

    this.initGLBuffers();
  }
}

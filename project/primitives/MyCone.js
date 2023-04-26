import { CGFobject } from "../../lib/CGF.js";
/**
 * MyCone
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCone extends CGFobject {
  constructor(scene, slices) {
    super(scene);
    this.slices = slices; // bottom circle
    this.initBuffers();
  }

  initBuffers() {
    this.vertices = [];
    this.normals = [];
    this.indices = [];
    this.texCoords = [];

    const bottomAngle = (2 * Math.PI) / this.slices;
    let cnt = 0;

    for (let j = 0; j < this.slices; j++) {
      const x = (offset) => Math.cos(bottomAngle * (j + offset));
      const y = 0;
      const z = (offset) => Math.sin(bottomAngle * (j + offset));

      // current
      this.vertices.push(x(0), 0, z(0));
      this.normals.push(x(0), 0, z(0));
      this.texCoords.push(j/this.slices, 1);
      // next
      this.vertices.push(x(1), 0, z(1));
      this.normals.push(x(1), 0, z(1));
      this.texCoords.push((j+1)/this.slices, 1);
      // top
      this.vertices.push(0, 1, 0);
      this.normals.push(0, 1, 0);
      this.texCoords.push(j/this.slices, 0);

      this.indices.push(cnt, cnt+2, cnt+1);
      this.indices.push(cnt+1, cnt+2, cnt)
     
      cnt += 3;
    }

    this.primitiveType = this.scene.gl.TRIANGLES;

    this.initGLBuffers();
  }
}

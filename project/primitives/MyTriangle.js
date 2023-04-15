import { CGFobject } from "../lib/CGF.js";
/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangle extends CGFobject {
  constructor(scene, coords) {
    super(scene);
    this.texCoords = coords;
    this.initBuffers();
  }

  initBuffers() {
    this.vertices = [
      -1, 1, 0, //0
      -1, -1, 0, //1
      1, -1, 0, //2
    ];

    this.normals = [
			0, 0, 1,	//0
			0, 0, 1,	//1
			0, 0, 1,	//2
		];

    //Counter-clockwise reference of vertices
    this.indices = [0, 1, 2];
    console.log(this.texCoords);
    this.primitiveType = this.scene.gl.TRIANGLES;

    this.initGLBuffers();
  }

}

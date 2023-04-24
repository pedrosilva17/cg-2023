import { CGFobject } from "../../lib/CGF.js";
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
    if (coords != undefined)
			this.updateTexCoords(coords);
  }

  initBuffers() {
    this.vertices = [
      -1, 1, 0, //0
      -1, -1, 0, //1
      1, -1, 0, //2
      -1, 1, 0, //3 (0)
      -1, -1, 0, //4 (1)
      1, -1, 0, //5 (2)
    ];

    this.normals = [
			0, 0, 1,	//0
			0, 0, 1,	//1
			0, 0, 1,	//2
			0, 0, -1,	//0
			0, 0, -1,	//1
			0, 0, -1,	//2
		];

    this.texCoords = [
      0, 0, 
      1, 0, 
      1, 1, 
      0, 0, 
      1, 0, 
      1, 1
    ];

    //Counter-clockwise reference of vertices
    this.indices = [0, 1, 2, 5, 4, 3];
    this.primitiveType = this.scene.gl.TRIANGLES;

    this.initGLBuffers();
  }

}

import {CGFobject} from '../../lib/CGF.js';
/**
 * MyParallelogram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyParallelogram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			0, 0, 0,	//0
			1, 0, 0,	//1
			2, 1, 0,	//2
			1, 1, 0,	//3
			0, 0, 0,	//4 (0)
			1, 0, 0,	//5 (1)
			2, 1, 0,	//6 (2)
			1, 1, 0		//7 (3)
		];

		this.normals = [
			0, 0, 1,	//0
			0, 0, 1,	//1
			0, 0, 1,	//2
			0, 0, 1,	//3
			0, 0, -1,	//4
			0, 0, -1,	//5
			0, 0, -1,	//6
			0, 0, -1,	//7
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 3,
			3, 1, 2,
			7, 5, 4,
			6, 5, 7
		];
		
		this.texCoords = [
			1,1,
			0.5,1,
			0.25,0.75,
			0.75, 0.75,
			1,1,
			0.5,1,
			0.25,0.75,
			0.75, 0.75,
		]

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}


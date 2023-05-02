import { CGFobject } from "../../lib/CGF.js";
import { MyUtils } from "../MyUtils.js";
/**
 * MyTorus
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTorus extends CGFobject {
	constructor(scene, torusSlices, tubeSlices, torusRadius, tubeRadius, arc=2*Math.PI) {
		super(scene);
		this.torusSlices = torusSlices;
		this.tubeSlices = tubeSlices;
		this.torusRadius = torusRadius;
		this.tubeRadius = tubeRadius;
		this.arc = arc;
		this.initBuffers();
	}

	initBuffers() {
		this.indices = [];
		this.vertices = [];
		this.normals = [];
		this.texCoords = [];

		let center = { x: 0, y: 0, z: 0 };
		let vertex = { x: 0, y: 0, z: 0 };
		let normal = { x: 0, y: 0, z: 0 };

		for (let j = 0; j <= this.torusSlices; j++) {
			for (let i = 0; i <= this.tubeSlices; i++) {
				let u = (i / this.tubeSlices) * this.arc;
				let v = (j / this.torusSlices) * Math.PI * 2;

				vertex["x"] = (this.torusRadius + this.tubeRadius * Math.cos(v)) * Math.cos(u);
				vertex["y"] = (this.torusRadius + this.tubeRadius * Math.cos(v)) * Math.sin(u);
				vertex["z"] = this.tubeRadius * Math.sin(v);

				this.vertices.push(vertex["x"], vertex["y"], vertex["z"]);

				center["x"] = this.torusRadius * Math.cos(u);
				center["y"] = this.torusRadius * Math.sin(u);
				normal = MyUtils.subVector(vertex, center);
				normal = MyUtils.normalize(normal);

				this.normals.push(normal["x"], normal["y"], normal["z"]);

				this.texCoords.push(i / this.tubeSlices);
				this.texCoords.push(j / this.torusSlices);
			}
		}

		for (let j = 1; j <= this.torusSlices; j++) {
			for (let i = 1; i <= this.tubeSlices; i++) {

				let a = (this.tubeSlices + 1) * j + i - 1;
				let b = (this.tubeSlices + 1) * (j - 1) + i - 1;
				let c = (this.tubeSlices + 1) * (j - 1) + i;
				let d = (this.tubeSlices + 1) * j + i;

				this.indices.push(a, b, d);
				this.indices.push(b, c, d);
			}
		}
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}

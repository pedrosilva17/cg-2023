import { CGFobject } from "../../lib/CGF.js";
/**
 * MySphere
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MySphere extends CGFobject {
  constructor(scene, slices, stacks) {
    super(scene);
    this.latitude = stacks * 2;
    this.longitude = slices;
    this.initBuffers();
  }

  initBuffers() {
    this.vertices = [];
    this.normals = [];
    this.indices = [];
    
    const latDelta = Math.PI / this.latitude;
    const lonDelta = (2 * Math.PI) / this.longitude;
    let latAngle = 0;
    let lonAngle = 0;

    for (let i = 0; i < this.latitude; i++) {
        const latCos = Math.cos(latAngle + i * latDelta);
        const latSin = Math.sin(latAngle + i * latDelta);
        
        for (let j = 0; j < this.longitude; j++) {
            const lonCos = Math.cos(lonAngle + j * lonDelta);
            const lonSin = Math.sin(lonAngle + j * lonDelta);

            const x = lonSin * latSin;
            const y = latCos;
            const z = lonCos * latSin;

            this.vertices.push(x, y, z);
            this.normals.push(x, y, z);
            
            if (i != this.latitude - 1) {
                const current = i * this.longitude + j;
                const next = (i * this.longitude + (j + 1) % this.longitude);
                const currentForward = (i + 1) * this.longitude + j;
                const nextForward = ((i + 1) * this.longitude + (j + 1) % this.longitude);
                
                this.indices.push(current, currentForward, next);
                this.indices.push(next, currentForward, nextForward);
            }
        }
    }

    this.primitiveType = this.scene.gl.TRIANGLES;

    this.initGLBuffers();
  }
}

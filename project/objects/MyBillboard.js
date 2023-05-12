import { CGFappearance, CGFobject, CGFtexture } from "../../lib/CGF.js";
import { MyQuad } from "../primitives/MyQuad.js";

/**
 * MyBillboard
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBillboard extends CGFobject {
    constructor(scene, position, texture, scale) {
		super(scene);
        this.billboard = new MyQuad(scene, null);
        this.position = position;
        this.scale = scale;

		this.treeAppearance = new CGFappearance(this.scene);
		this.treeAppearance.setShininess(0);
		
        this.treeAppearance.setTexture(texture);
		this.treeAppearance.setTextureWrap("MIRRORED_REPEAT", "MIRRORED_REPEAT");
        
    }
    
    display() {
        const billboardVec = vec3.fromValues(1, 0, 0)
        const cameraVec = vec3.fromValues(this.scene.camera.direction[0], 0, this.scene.camera.direction[2]);
        
        vec3.normalize(billboardVec,billboardVec);
        vec3.normalize(cameraVec,cameraVec);
        const dot = vec3.dot(billboardVec, cameraVec);
        const cross = vec3.fromValues(0,0,0);
        vec3.cross(cross, billboardVec, cameraVec);

        this.treeAppearance.apply();
        this.scene.pushMatrix();
        this.scene.translate(this.position["x"], this.position["y"], this.position["z"]);
        this.scene.rotate(Math.acos(dot), 0, cross[1], 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.scene.scale(this.scale, this.scale, this.scale);
        this.billboard.display();
        this.scene.popMatrix();
    }
}

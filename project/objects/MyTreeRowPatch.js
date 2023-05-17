import { CGFappearance, CGFobject, CGFtexture } from "../../lib/CGF.js";
import { MyBillboard } from "./MyBillboard.js";

/**
 * MyTreeGroupPatch
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTreeRowPatch extends CGFobject {
    constructor(scene, position, offset, rotation) {
		super(scene);
        this.trees = [];
        this.position = position;
        this.offset = offset; // regular space between trees
        rotation === undefined ? this.rotation = 0 : this.rotation = rotation;
        this.textures = [
            new CGFtexture(this.scene, "./images/billboardtree.png"),
            new CGFtexture(this.scene, "./images/billboardtree2.png"),
            new CGFtexture(this.scene, "./images/billboardtree3.png")
        ];

        for (let i = 0; i < 6; i++) {
            const x = this.position["x"] + i * this.offset + Math.random() * 2;
            const y = this.position["y"];
            const z = this.position["z"];
            const treePosition = {
                "x": x, "y": y, "z": z
            } 
            
            const scale = Math.floor(Math.random() * (12 - 8) + 8);

            const textureIdx = Math.floor(Math.random() * this.textures.length);

            this.trees.push(new MyBillboard(this.scene, treePosition, this.textures[textureIdx], scale));
        }
    }

    display() {
        this.scene.pushMatrix();
        this.scene.rotate(this.rotation, 0, 1, 0);
        for (let i = 0; i < this.trees.length; i++) {
            this.scene.pushMatrix();
            this.trees[i].display();
            this.scene.popMatrix();
        }
        this.scene.popMatrix();
    }
}

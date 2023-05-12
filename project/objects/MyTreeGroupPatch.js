import { CGFappearance, CGFobject, CGFtexture } from "../../lib/CGF.js";
import { MyBillboard } from "./MyBillboard.js";

/**
 * MyTreeGroupPatch
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTreeGroupPatch extends CGFobject {
    constructor(scene, position, offset) {
		super(scene);
        this.trees = [];
        this.position = position;
        this.offset = offset; // regular space between trees
        this.textures = [
            new CGFtexture(this.scene, "./images/billboardtree.png"),
            new CGFtexture(this.scene, "./images/billboardtree2.png"),
            new CGFtexture(this.scene, "./images/billboardtree3.png")
        ];

        let row = -1;
        for (let i = 0; i < 9; i++) {
            let col = i%3 - 1;

            const x = this.position["x"] + col * this.offset + Math.random() * 2;
            const y = this.position["y"];
            const z = this.position["z"] + row * this.offset + Math.random() * 2;
            const treePosition = {
                "x": x, "y": y, "z": z
            } 
            
            const scale = Math.floor(Math.random() * (12 - 8) + 8);

            const textureIdx = Math.floor(Math.random() * this.textures.length);

            this.trees.push(new MyBillboard(this.scene, treePosition, this.textures[textureIdx], scale));
            if (col == 1) row++;
        }
    }

    display() {
        for (let i = 0; i < this.trees.length; i++) {
            this.scene.pushMatrix();
            this.trees[i].display();
            this.scene.popMatrix();
        }
    }
}

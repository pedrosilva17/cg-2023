import { CGFappearance, CGFobject, CGFtexture } from "../../lib/CGF.js";
import { MyUtils } from "../MyUtils.js";
import { MyTreeGroupPatch } from "./MyTreeGroupPatch.js";

/**
 * MyForest
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyForest extends CGFobject {
	constructor(scene, position, size) {
		super(scene);
		this.patches = [];
		this.position = position;
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                let patchPosition = {
                    "x": this.position["x"] + i * 20,
                    "y": this.position["y"],
                    "z": this.position["z"] + j * 20
                };
                this.patches.push(new MyTreeGroupPatch(scene, patchPosition, MyUtils.randomInteger(4, 10)));
            }
        }
	}
	display() {
		for (let i = 0; i < this.patches.length; i++) {
			this.scene.pushMatrix();
			this.patches[i].display();
			this.scene.popMatrix();
		}
	}
}

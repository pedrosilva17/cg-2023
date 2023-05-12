import {
	CGFscene,
	CGFcamera,
	CGFaxis,
	CGFappearance,
	CGFshader,
	CGFtexture,
} from "../lib/CGF.js";
import { MyPanorama } from "./objects/MyPanorama.js";
import { MyAnimatedCreature } from "./objects/MyAnimatedCreature.js";
import { MyTerrain } from "./objects/MyTerrain.js";
import { MyNest } from "./objects/MyNest.js";
import { MyCreatureEgg } from "./objects/MyCreatureEgg.js";
import { MyTreeGroupPatch } from "./objects/MyTreeGroupPatch.js";
import { MyTreeRowPatch } from "./objects/MyTreeRowPatch.js";
import { MyBillboard } from "./objects/MyBillboard.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
	constructor() {
		super();
	}
	init(application) {
		super.init(application);

		this.initCameras();
		this.initLights();

		//Background color
		this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

		this.gl.clearDepth(100.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL);

		this.scenery = new CGFtexture(this, "images/panorama4.jpg");

		//Initialize scene objects
		this.axis = new CGFaxis(this);
		this.plane = new MyTerrain(this, 30);
		this.panorama = new MyPanorama(this, this.scenery);
		this.creature = new MyAnimatedCreature(this);
		this.nest = new MyNest(this, 10, 20, 2, 0.7);
		this.billboard = new MyBillboard(this,{"x": -20, "y": -95, "z":0},new CGFtexture(this, "./images/billboardtree.png"), 7)
		this.treePatch = new MyTreeGroupPatch(this, {"x": -10, "y": -95, "z": -30}, 7);
		this.treeLine = new MyTreeRowPatch(this, {"x": 20, "y": -95, "z": -30}, 10);
		this.eggList = [
			new MyCreatureEgg(this, true, null),
			new MyCreatureEgg(this, true, null),
			new MyCreatureEgg(this, true, null),
			new MyCreatureEgg(this, true, null),
		];

		this.setUpdatePeriod(20);
		this.appStartTime = Date.now();
		this.animatedObjects = [this.creature];
		this.pickUp = false;
		this.animStartTimeSecs = 0;
		this.startY = 0;
		this.floor = -97;
		this.grabMovement = 0;
		this.grabDuration = 2;
		this.grabLeniency = 5;

		this.fallingEggs = [];

		this.nestPos = {
			"x": -15,
			"y": -98.5,
			"z": 0
		}

		//Objects connected to MyInterface
		this.displayAxis = true;
		this.scaleFactor = 1;
		this.speedFactor = 1;

		this.enableTextures(true);

		this.texture = new CGFtexture(this, "images/terrain.jpg");
		this.appearance = new CGFappearance(this);
		this.appearance.setTexture(this.texture);
		this.appearance.setTextureWrap("REPEAT", "REPEAT");
	}
	initLights() {
		this.lights[0].setPosition(15, 0, 5, 1);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[0].enable();
		this.lights[0].update();
	}
	initCameras() {
		this.camera = new CGFcamera(
			90.0,
			0.1,
			1000,
			vec3.fromValues(5, -95, 5),
			vec3.fromValues(0, -95, 0)
		);
	}
	setDefaultAppearance() {
		this.setAmbient(0.2, 0.4, 0.8, 1.0);
		this.setDiffuse(0.2, 0.4, 0.8, 1.0);
		this.setSpecular(0.2, 0.4, 0.8, 1.0);
		this.setShininess(10.0);
	}
	eggCollision() {
		const creaturePos = this.creature.obj.position;
		for (let i = 0; i < this.eggList.length; i++) {
			const eggPos = this.eggList[i].position;
			if (
				(eggPos["x"] + this.grabLeniency >= creaturePos["x"] && eggPos["x"] - this.grabLeniency <= creaturePos["x"]) &&
				(eggPos["z"] + this.grabLeniency >= creaturePos["z"] && eggPos["z"] - this.grabLeniency <= creaturePos["z"]) &&
				(eggPos["y"] + this.grabLeniency >= creaturePos["y"] && eggPos["y"] - this.grabLeniency <= creaturePos["y"]) &&
				!this.creature.hasEgg()
			) {
				console.log("Grabbed egg!");
				this.creature.grabEgg();
				this.eggList = this.eggList.filter((egg) => egg != this.eggList[i]);
			}
		}
	}
	eggDrop(timeSinceAppStart){
		const creaturePos = this.creature.obj.position;
		const eggPos = {
			"x": creaturePos["x"],
			"y": creaturePos["y"]-2,
			"z": creaturePos["z"],
		}		
		const droppedEgg = new MyCreatureEgg(this, false, eggPos);
		this.fallingEggs.push({
			"egg": droppedEgg,
			"time": timeSinceAppStart,
			"startY": eggPos["y"],
			"fallDist": (this.floor - 10) - eggPos["y"]
		});
		this.creature.dropEgg();
	}
	floorCollision(eggPos) {
		if (
			(this.nestPos["x"] + this.grabLeniency >= eggPos["x"] && this.nestPos["x"] - this.grabLeniency <= eggPos["x"]) &&
			(this.nestPos["z"] + this.grabLeniency >= eggPos["z"] && this.nestPos["z"] - this.grabLeniency <= eggPos["z"]) &&
			(this.nestPos["y"] + this.grabLeniency >= eggPos["y"] && this.nestPos["y"] - this.grabLeniency <= eggPos["y"])
		) {
			console.log("Dropped egg in nest!");
			this.nest.addEgg(new MyCreatureEgg(this, false, null));
			return true;
		} else {
			return false;
		}
	}
	checkKeys(timeSinceAppStart) {
		let text = "Keys pressed: ";
		let keysPressed = false;

		if (this.gui.isKeyPressed("KeyW")) {
			text += " W ";
			this.creature.accelerate(0.01);
			keysPressed = true;
		}

		if (this.gui.isKeyPressed("KeyS")) {
			text += " S ";
			this.creature.accelerate(-0.01);
			keysPressed = true;
		}

		if (this.gui.isKeyPressed("KeyD")) {
			text += " D ";
			this.creature.turn(-Math.PI / 70);
			keysPressed = true;
		}

		if (this.gui.isKeyPressed("KeyA")) {
			text += " A ";
			this.creature.turn(Math.PI / 70);
			keysPressed = true;
		}

		if (this.gui.isKeyPressed("KeyR")) {
			text += " R ";
			this.creature.reset();
			keysPressed = true;
		}

		if (this.gui.isKeyPressed("KeyO")) {
			text += " O ";
			if (this.creature.hasEgg()) {
				this.eggDrop(timeSinceAppStart);
			}
			keysPressed = true;
		}
		
		if (this.gui.isKeyPressed("KeyP")) {
			if (!this.pickUp) {
				text += " P ";
				this.startY = this.creature.obj.position["y"];
				this.grabMovement = (this.floor - this.startY)*2;
				this.pickUp = true;
				this.animStartTimeSecs = timeSinceAppStart;
				keysPressed = true;	
			}
		}

		if (this.gui.isKeyPressed("Space")) {
			text += " Space ";
			this.creature.pitch(0.5);
			keysPressed = true;
		}

		if (this.gui.isKeyPressed("ShiftLeft")) {
			text += " LShift ";
			this.creature.pitch(-0.5);
			keysPressed = true;
		}

		if (keysPressed) console.log(text);
	}
	update(t) {
		let timeSinceAppStart = (t - this.appStartTime) / 1000.0;
		for (let i = 0; i < this.animatedObjects.length; i++)
			this.animatedObjects[i].update(timeSinceAppStart);
		this.checkKeys(timeSinceAppStart);

		if (this.pickUp) {
			let elapsedTimeSecs = timeSinceAppStart-this.animStartTimeSecs;
			if (elapsedTimeSecs>=0 && elapsedTimeSecs<=this.grabDuration/2) {
				const newPos = this.startY + elapsedTimeSecs/this.grabDuration * this.grabMovement;
				this.creature.setY(newPos);
				this.eggCollision();
			} else if (elapsedTimeSecs>=0 && elapsedTimeSecs>this.grabDuration/2 && elapsedTimeSecs<=this.grabDuration) {
				this.creature.setY(this.floor - (elapsedTimeSecs - this.grabDuration/2)/this.grabDuration * this.grabMovement);
			} else {
				this.pickUp = false;
			}
		}

		if (this.fallingEggs.length != 0) {
			for (let i = 0; i < this.fallingEggs.length; i++) {
				if(this.floorCollision(this.fallingEggs[i]["egg"].position)){
					this.fallingEggs = this.fallingEggs.filter((egg) => egg != this.fallingEggs[i]);
					break;
				}
				if (Math.abs(this.fallingEggs[i]["egg"].position["y"]) >= Math.abs(this.floor)) {
					console.log(this.fallingEggs[i]["egg"].position["y"]);
					this.eggList.push(new MyCreatureEgg(this, false, {
						"x": this.fallingEggs[i]["egg"].position["x"],
						"y": -99,
						"z": this.fallingEggs[i]["egg"].position["z"]
					}))
					this.fallingEggs = this.fallingEggs.filter((egg) => egg != this.fallingEggs[i]);
					break;
				}
				let elapsedTimeSecs = timeSinceAppStart-this.fallingEggs[i]["time"];
				
				if (elapsedTimeSecs>=0 && elapsedTimeSecs<=this.grabDuration) {
					const newPos = this.fallingEggs[i]["startY"] + elapsedTimeSecs/this.grabDuration * this.fallingEggs[i]["fallDist"];
					this.fallingEggs[i]["egg"].setY(newPos);
				}
			}
		}
	}

	display() {
		// ---- BEGIN Background, camera and axis setup
		// Clear image and depth buffer everytime we update the scene
		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
		// Initialize Model-View matrix as identity (no transformation
		this.updateProjectionMatrix();
		this.loadIdentity();
		// Apply transformations corresponding to the camera position relative to the origin
		this.applyViewMatrix();

		// Draw axis
		if (this.displayAxis) this.axis.display();

		// ---- BEGIN Primitive drawing section

		this.pushMatrix();
		this.appearance.apply();
		this.translate(0, -100, 0);
		this.scale(400, 400, 400);
		this.rotate(-Math.PI / 2.0, 1, 0, 0);
		this.plane.display();
		this.popMatrix();
		this.setDefaultAppearance();

		this.panorama.display();

		this.creature.display();
		for (let i = 0; i < this.eggList.length; i++) {
			this.eggList[i].display();
		}
		for (let i = 0; i < this.fallingEggs.length; i++) {
			this.fallingEggs[i]["egg"].display();
		}
		// position the nest on the scene itself
		this.pushMatrix();
		this.translate(this.nestPos["x"], this.nestPos["y"], this.nestPos["z"]);
		this.nest.display();
		this.popMatrix();

		this.treePatch.display()
		this.treeLine.display()
		// ---- END Primitive drawing section
	}
}

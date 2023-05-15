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
import { MyWater } from "./objects/MyWater.js";
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
		
		this.floor = -55;

		this.initCameras();
		this.initLights();

		//Background color
		this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

		this.gl.clearDepth(100.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL);

		this.scenery = new CGFtexture(this, "images/panorama3.jpeg");

		//Initialize scene objects
		this.axis = new CGFaxis(this);
		this.water = new MyWater(this, 30);
		this.plane = new MyTerrain(this, 30);
		this.panorama = new MyPanorama(this, this.scenery);
		this.creature = new MyAnimatedCreature(this);
		this.nest = new MyNest(this, 10, 20, 2, 0.7);
		this.treePatch = new MyTreeGroupPatch(this, {"x": 100, "y": this.floor, "z": -10}, 7);
		this.treeLine = new MyTreeRowPatch(this, {"x": 100, "y": this.floor, "z": -30}, 10);
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

		this.grabMovement = 0;
		this.grabDuration = 2;
		this.grabLeniency = 5;

		this.initialVx = 0.5;
		this.initialVy = 0.5;
		this.tAngle = Math.PI/4;
		this.gravity = 0.5;

		this.fallingEggs = [];

		this.nestPos = {
			"x": 110,
			"y": this.floor+2,
			"z": 10
		}

		//Objects connected to MyInterface
		this.displayAxis = true;
		this.scaleFactor = 1;
		this.speedFactor = 1;
		this.followCamera = false;

		this.enableTextures(true);

		this.texture = new CGFtexture(this, "images/terrain2.jpg");
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
			vec3.fromValues(40, this.floor + 50, 30),
			vec3.fromValues(90, this.floor + 20, 50)
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
		const rotation = this.creature.getRotationAngle();
		const eggPos = {
			"x": creaturePos["x"] + Math.cos(-rotation) * 2,
			"y": creaturePos["y"],
			"z": creaturePos["z"] + Math.sin(-rotation) * 2,
		}		
		const droppedEgg = new MyCreatureEgg(this, false, eggPos);
		this.fallingEggs.push({
			"egg": droppedEgg,
			"time": timeSinceAppStart,
			"startY": eggPos["y"],
			"fallDist": (this.floor - 10) - eggPos["y"],
			"yAngle": rotation,
			"peak": false
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
	animateFallingEgg(egg, timeSinceAppStart) {
			const elapsedTimeSecs = timeSinceAppStart-egg["time"];

			egg["egg"].position["x"] += this.initialVx * Math.cos(this.tAngle) * elapsedTimeSecs * Math.cos(egg["yAngle"]);
			egg["egg"].position["z"] -= this.initialVx * Math.cos(this.tAngle) * elapsedTimeSecs * Math.sin(egg["yAngle"]);	
			egg["egg"].position["y"] += this.initialVy * Math.sin(this.tAngle) * elapsedTimeSecs - 0.5 * this.gravity * elapsedTimeSecs**2;
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
				this.grabMovement = (this.floor + 3 - this.startY)*2;
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
				this.creature.setY((this.floor + 3) - (elapsedTimeSecs - this.grabDuration/2)/this.grabDuration * this.grabMovement);
			} else {
				this.pickUp = false;
			}
		}

		if (this.fallingEggs.length != 0) {
			for (let i = 0; i < this.fallingEggs.length; i++) {
				// if egg hit the floor (true when hits the nest false when it doesnt)
				if(this.floorCollision(this.fallingEggs[i]["egg"].position)){
					this.fallingEggs = this.fallingEggs.filter((egg) => egg != this.fallingEggs[i]);
					break;
				}
				
				// if it hit the floor previously aka the egg's height is >= the height of the floor (abs)
				if (Math.abs(this.fallingEggs[i]["egg"].position["y"]) >= Math.abs(this.floor)) {
					this.eggList.push(new MyCreatureEgg(this, false, {
						"x": this.fallingEggs[i]["egg"].position["x"],
						"y": -99,
						"z": this.fallingEggs[i]["egg"].position["z"]
					}))
					this.fallingEggs = this.fallingEggs.filter((egg) => egg != this.fallingEggs[i]);
					break;
				}

				this.animateFallingEgg(this.fallingEggs[i], timeSinceAppStart);
			}
		}

		if (this.followCamera) {
			const creaturePos = this.creature.getPosition();
			const target = vec4.fromValues(creaturePos["x"], creaturePos["y"], creaturePos["z"], 0);
			const rotation = this.creature.getRotationAngle();
			const cameraPos = vec4.fromValues(creaturePos["x"] - 10 * Math.cos(rotation), creaturePos["y"] + 5, creaturePos["z"] + 10* Math.sin(rotation), 0);
			this.camera.setPosition(cameraPos);
			this.camera.setTarget(target);
		}

		this.water.update(timeSinceAppStart);
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
		this.translate(0, -85, 0);
		this.scale(400, 400, 400);
		this.rotate(-Math.PI / 2.0, 1, 0, 0);
		this.water.display();
		this.popMatrix();
		this.setDefaultAppearance();

		this.pushMatrix();
		this.appearance.apply();
		this.translate(0, -100, 0);
		this.scale(400, 400, 400);
		this.rotate(-Math.PI / 2.0, 1, 0, 0);
		this.plane.display();
		this.popMatrix();
		this.setDefaultAppearance();


		this.pushMatrix();
		this.translate(this.camera.position[0], this.camera.position[1], this.camera.position[2])
		this.panorama.display();
		this.popMatrix();

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

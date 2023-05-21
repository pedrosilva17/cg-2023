import { CGFinterface, dat } from "../lib/CGF.js";

/**
 * MyInterface
 * @constructor
 */
export class MyInterface extends CGFinterface {
	constructor() {
		super();
	}

	init(application) {
		// call CGFinterface init
		super.init(application);

		// init GUI. For more information on the methods, check:
		// https://github.com/dataarts/dat.gui/blob/master/API.md
		this.gui = new dat.GUI();
		
		const displays = this.gui.addFolder("Displays");
		displays.add(this.scene, "displayAxis").name("Display Axis");
		
		// Camera controls
		const camera = this.gui.addFolder("Camera");
		this.cameraCheckbox = camera.add(this.scene, "followCamera").name("Follow Camera").__checkbox;


		// Creature
		const creature = this.gui.addFolder("Creature");
		creature.add(this.scene.creature.obj, "simplify").name("Simple Body Model");
		creature.addColor(this.scene.creature.obj.limb, "skinColor").name("Skin Color");
		creature.addColor(this.scene.creature.obj.limb, "clawColor").name("Claw Color");
		creature.addColor(this.scene.creature.obj.eye, "scleraColor").name("Sclera Color");
		creature.addColor(this.scene.creature.obj.eye, "irisColor").name("Iris Color");
		creature.addColor(this.scene.creature.obj.eye, "pupilColor").name("Pupil Color");

		// Grab
		const grab = this.gui.addFolder("Grab");
		grab.add(this.scene, "grabLeniency", 0, 10).name("Grab Leniency");
		grab.add(this.scene, "grabDuration", 0, 10).name("Grab Duration");

		// Throw
		const eggThrow = this.gui.addFolder("Throw");
		eggThrow.add(this.scene, "initialVx", 0, 2).name("Initial Vx");
		eggThrow.add(this.scene, "initialVy", 0, 20).name("Initial Vy");
		eggThrow.add(this.scene, "tAngle", 0, Math.PI/2).name("Throw Angle");
		eggThrow.add(this.scene, "gravity", 5, 50).name("Gravity");

		// Factors
		const constFactors = this.gui.addFolder("Constant Factors");
		constFactors.add(this.scene, "scaleFactor", 0.5, 3).name("Scale Factor");
		constFactors.add(this.scene, "speedFactor", 0.1, 3).name("Speed Factor");

		// Experimental features
		const experimentalFeats = this.gui.addFolder("Experimental Features");
		experimentalFeats.add(this.scene.creature, "crosshairToggle").name("Show Crosshair")
		experimentalFeats.add(this.scene, "updatePeriod", 20, 50).name("Update Period")

		this.initKeys();
        
		return true;
	}

	initKeys() {
		// create reference from the scene to the GUI
		this.scene.gui = this;

		// disable the processKeyboard function
		this.processKeyboard = function () {};

		// create a named array to store which keys are being pressed
		this.activeKeys = {};
	}

	processKeyDown(event) {
		// called when a key is pressed down
		// mark it as active in the array
		this.activeKeys[event.code] = true;
	}

	processKeyUp(event) {
		// called when a key is released, mark it as inactive in the array
		this.activeKeys[event.code] = false;
	}

	isKeyPressed(keyCode) {
		// returns true if a key is marked as pressed, false otherwise
		return this.activeKeys[keyCode] || false;
	}
}

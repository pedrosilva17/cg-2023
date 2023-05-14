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
		
		this.gui.add(this.scene, "displayAxis").name("Display Axis");
		
		// Camera controls
		const camera = this.gui.addFolder("Camera");

		camera.add(this.scene, "followCamera").name("Follow Camera");

		// Grab
		const grab = this.gui.addFolder("Grab");
		grab.add(this.scene, "grabLeniency", 0, 10).name("Grab Leniency");
		grab.add(this.scene, "grabDuration", 0, 10).name("Grab Duration");

		// Throw
		const eggThrow = this.gui.addFolder("Throw");
		eggThrow.add(this.scene, "initialVx", 0, 5).name("Initial Vx");
		eggThrow.add(this.scene, "initialVy", 0, 5).name("Initial Vy");
		eggThrow.add(this.scene, "tAngle", 0, Math.PI/2).name("Throw Angle");
		eggThrow.add(this.scene, "gravity", 0, 10).name("Gravity");

		// Factors
		const constFactors = this.gui.addFolder("Constant Factors");

		constFactors.add(this.scene, "scaleFactor", 0.5, 3).name("Scale Factor");
		constFactors.add(this.scene, "speedFactor", 0.1, 3).name("Speed Factor");

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

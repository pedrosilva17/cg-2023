import { MyAnimatedObject } from "./MyAnimatedObject.js";
import { MyCreature } from "./MyCreature.js";
import { MyCreatureEgg } from "./MyCreatureEgg.js";
export class MyAnimatedCreature extends MyAnimatedObject {
	constructor(scene) {
		let kuriboh = new MyCreature(scene);
		super(scene, kuriboh);
	}

	update(t) {
		let elapsedTimeSecs = t - this.startTime;
		//console.log(elapsedTimeSecs);
		//console.log(this.obj.velocity);
		this.idleAnimation(elapsedTimeSecs);
		this.wingBeat(elapsedTimeSecs);
		this.obj.position["x"] += 1 * this.obj.velocity * Math.cos(this.obj.yAngle);
		this.obj.position["z"] -= 1 * this.obj.velocity * Math.sin(this.obj.yAngle);
		this.obj.velocity = this.obj.velocity <= 0 ? 0 : this.obj.velocity - 0.004 * this.scene.speedFactor;
	}

	accelerate(v) {
		this.obj.velocity += v * this.scene.speedFactor;
		if (this.obj.velocity < 0) this.obj.velocity = 0;
		if (this.obj.velocity >= 1) this.obj.velocity = 1;
	}

	turn(a) {
		this.obj.yAngle += a * this.scene.speedFactor * Math.min(Math.max(1, this.obj.velocity * 2), 3.5);
		if (this.obj.yAngle >= 2* Math.PI || this.obj.yAngle <= -2*Math.PI) this.obj.yAngle = 0;
	}

	pitch(p) {
		this.obj.position["y"] += p;
	}

	reset() {
		this.obj.position = {"x": 0, "y": -95, "z": 0};
		this.obj.yAngle = 0;
		this.obj.velocity = 0;
	}

	idleAnimation(t) {
		if (t >= 0) {
			this.animPos = this.sinWave(Math.PI * t, 0.2);
		}
	}

	wingBeat(t) {
		if (t >= 0) {
			this.obj.wingAngle = Math.min(4, 1 + this.obj.velocity * 10) * this.scene.speedFactor * this.sinWave(Math.PI * t, 0.1);
		}
	}

	setY(y) {
		this.obj.position["y"] = y;
	}

	grabEgg() {
		this.obj.egg = new MyCreatureEgg(this.scene, false, null);
	}
	
	dropEgg() {
		this.obj.egg = null;
	}

	hasEgg() {
		return this.obj.egg ? true : false;
	}

	getRotationAngle() {
		return this.obj.yAngle;
	}

	display() {
		this.scene.pushMatrix();
		this.scene.translate(0, this.animPos, 0);
		super.display();
		this.scene.popMatrix();
	}
}

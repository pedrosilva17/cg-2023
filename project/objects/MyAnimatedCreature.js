import { MyAnimatedObject } from "./MyAnimatedObject.js";
import { MyCreature } from "./MyCreature.js";
import { MyCreatureEgg } from "./MyCreatureEgg.js";
export class MyAnimatedCreature extends MyAnimatedObject {
	constructor(scene, position) {
		let kuriboh = new MyCreature(scene, position);
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
		this.obj.tiltAngle = this.obj.tiltAngle < 0 ? Math.min(this.obj.tiltAngle + 0.03, 0) : this.obj.tiltAngle > 0 ? Math.max(this.obj.tiltAngle - 0.03, 0) : 0;
	}

	accelerate(v) {
		this.obj.velocity += v * this.scene.speedFactor;
		if (this.obj.velocity < 0) this.obj.velocity = 0;
		if (this.obj.velocity >= 1) this.obj.velocity = 1;
	}

	turn(a) {
		this.obj.yAngle += a * this.scene.speedFactor * Math.min(Math.max(1, this.obj.velocity * 2), 3.5);
		if (a > 0) 
			this.obj.tiltAngle = Math.max(this.obj.tiltAngle - a * this.scene.speedFactor, (- Math.PI / 6) * this.scene.speedFactor)
		else 
			this.obj.tiltAngle = Math.min(this.obj.tiltAngle - a * this.scene.speedFactor, (Math.PI / 6) * this.scene.speedFactor)
		if (this.obj.yAngle >= 2 * Math.PI || this.obj.yAngle <= -2 * Math.PI) this.obj.yAngle = 0;
	}

	pitch(p) {
		this.obj.position["y"] += p;
	}

	reset() {
		this.obj.position = {"x": 50, "y": -30, "z": 20};
		this.obj.yAngle = 0;
		this.obj.velocity = 0;
	}

	idleAnimation(t) {
		if (t >= 0) {
			this.animPos = this.sinWave(Math.PI * t, 0.2);
			this.obj.feetAngle = this.sinWave(Math.PI / 2 * t, 0.2);
		}
	}

	wingBeat(t) {
		if (t >= 0) {
			this.obj.wingAngle = Math.min(2, 1 + this.obj.velocity * 10) * this.scene.speedFactor * this.sinWave(Math.PI * t, 0.1);
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

	getPosition() {
		return this.obj.position;
	}

 	/* drawCrosshair() {
		this.scene.pushMatrix();
		const distanceOffset = this.obj.position["y"] > -10 ? ((this.obj.position["y"] + 10) / 500)**1.1 : 0
		this.scene.translate(
			this.obj.position["x"] + ((this.scene.distance + distanceOffset) / 1000) * 200 * this.scene.initialVx * Math.cos(this.scene.tAngle) * Math.cos(this.obj.yAngle) * Math.max(1, this.obj.velocity * 3),
			this.scene.floor + 2,
			this.obj.position["z"] - ((this.scene.distance + distanceOffset) / 1000) * 200 * this.scene.initialVx * Math.cos(this.scene.tAngle) * Math.sin(this.obj.yAngle) * Math.max(1, this.obj.velocity * 3));
		this.obj.eye.display();
		this.scene.popMatrix();
	}  */

	display() {
		this.scene.pushMatrix();
		this.scene.translate(0, this.animPos, 0);
		super.display();
		this.scene.popMatrix();
		//this.drawCrosshair();
	}
}

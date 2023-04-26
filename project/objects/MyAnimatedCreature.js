import { MyAnimatedObject } from "./MyAnimatedObject.js";
import { MyCreature } from "./MyCreature.js";
export class MyAnimatedCreature extends MyAnimatedObject {
	constructor(scene) {
		let kuriboh = new MyCreature(scene);
		super(scene, kuriboh);
	}

	update(t) {
		let elapsedTimeSecs = t - this.startTime;
		//console.log(elapsedTimeSecs);
		this.idleAnimation(elapsedTimeSecs);
	}

	idleAnimation(t) {
		if (t >= 0)
			this.animPos =
				this.startPos +
				this.sinWave(Math.PI * t, 0.2) * this.length;
	}
}

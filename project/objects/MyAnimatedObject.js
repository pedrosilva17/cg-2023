export class MyAnimatedObject {
	constructor(scene, obj, start = 0, end = 1, startTime = 0, duration = Infinity) {
		this.scene = scene;
		this.obj = obj;

		this.startPos = start;
		this.endPos = end;
		this.startTime = startTime;
		this.duration = duration;
		this.length = this.endPos - this.startPos;

		this.animPos = this.startPos;
	}

    sinWave(x, amp=1, freq=1) {
        return amp * Math.sin(2*x*freq);
    }

    update() {
        
    }

	display() {
		this.obj.display();
	}
}

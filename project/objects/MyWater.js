import { CGFappearance, CGFobject, CGFshader, CGFtexture } from "../../lib/CGF.js";
import { MyPlane } from "../MyPlane.js";

export class MyWater extends CGFobject {
    constructor(scene, nrDivs) {
        super(scene);
        this.plane = new MyPlane(scene, nrDivs);

        this.waterTexture = new CGFtexture(this.scene, "./images/waterTex.jpg");
        this.waterMap = new CGFtexture(this.scene, "./images/waterMap.jpg");

        this.waterAppearance = new CGFappearance(this.scene);
        this.waterAppearance.setSpecular(0, 0, 0, 0);
        this.waterAppearance.setShininess(10);

        this.waterAppearance.setTexture(this.waterTexture);
        this.waterAppearance.setTextureWrap('MIRRORED_REPEAT', 'MIRRORED_REPEAT');

        this.waterShader = new CGFshader(this.scene.gl, "./shaders/MyWater.vert", "./shaders/MyWater.frag");
        this.waterShader.setUniformsValues({ timeFactor: 0 });
        this.waterShader.setUniformsValues({ uSampler2: 1 });
        this.waterMap.bind(1);

        this.defaultShader = this.scene.defaultShader;
    }

    update(t) {
        this.waterShader.setUniformsValues({ timeFactor: (t / 100 % 100) * this.scene.speedFactor })
    }

    display() {
        this.scene.setActiveShader(this.waterShader);
        this.waterAppearance.apply();
        this.plane.display();
        this.scene.setActiveShader(this.defaultShader);
    }
}
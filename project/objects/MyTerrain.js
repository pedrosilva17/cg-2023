import { CGFappearance, CGFobject, CGFshader, CGFtexture } from "../../lib/CGF.js";
import { MyPlane } from "../MyPlane.js";

export class MyTerrain extends CGFobject {
    constructor(scene, nrDivs) {
        super(scene);
        this.plane = new MyPlane(scene, nrDivs);

        this.terrainTexture = new CGFtexture(this.scene, "./images/terrain2.png");
        this.heightMap = new CGFtexture(this.scene, "./images/heightmap5.jpg");
        this.altimetry = new CGFtexture(this.scene, "./images/altimetry.png");        

        this.terrainAppearance = new CGFappearance(this.scene);
        this.terrainAppearance.setSpecular(0, 0, 0, 0);
        this.terrainAppearance.setShininess(10);

        this.terrainAppearance.setTexture(this.terrainTexture);
        this.terrainAppearance.setTextureWrap('MIRRORED_REPEAT', 'MIRRORED_REPEAT');

        this.terrainShader = new CGFshader(this.scene.gl, "./shaders/MyTerrain.vert", "./shaders/MyTerrain.frag");
        this.terrainShader.setUniformsValues({ uSampler2: 1, uSampler3: 2});
        this.defaultShader = this.scene.defaultShader;
    }

    display() {
        this.heightMap.bind(1);
        this.altimetry.bind(2);
        this.scene.setActiveShader(this.terrainShader);
        this.terrainAppearance.apply();
        this.plane.display();
        this.scene.setActiveShader(this.defaultShader);
    }
}
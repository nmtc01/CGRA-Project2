/**
 * MyTerrain
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTerrain extends CGFobject {
	constructor(scene) {
        super(scene);

        this.plane = new Plane(scene, 32);

        this.initMaterials();
        this.initShaders();
    }
    initMaterials() {
        //Textures
        this.terrain_text = new CGFtexture(this.scene, 'images/terrain.jpg');
        this.height_text = new CGFtexture(this.scene, 'images/heightmap2.jpg');
        this.gradient_text = new CGFtexture(this.scene, 'images/altimetry.png');

        //Materials
        this.terrain_mat = new CGFappearance(this.scene);
        this.terrain_mat.setAmbient(1, 1, 1, 1);
        this.terrain_mat.setDiffuse(1, 1, 1, 1);
        this.terrain_mat.setSpecular(1, 1, 1, 0);
        this.terrain_mat.setShininess(10.0);
        this.terrain_mat.setTexture(this.terrain_text);
        this.terrain_mat.setTextureWrap('REPEAT', 'REPEAT');
    }
    initShaders() {
        this.terrain_shader = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
        this.terrain_shader.setUniformsValues({uSampler2:1});
        this.terrain_shader.setUniformsValues({uSampler3:2});
    }

    display() {
        this.scene.setActiveShader(this.terrain_shader);
        this.height_text.bind(1);
        this.gradient_text.bind(2);
        this.terrain_mat.apply();
        this.plane.display();
    }
}
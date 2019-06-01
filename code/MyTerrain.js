/**
 * MyTerrain
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTerrain extends CGFobject {
	constructor(scene, x, y, z) {
        super(scene);

        this.plane = new Plane(scene, 32);
        this.scale = [x, y, z];

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
        this.scene.pushMatrix();
        this.scene.translate(0, -1, 0);
        this.scene.rotate(-0.5 * Math.PI, 1, 0, 0);
        this.scene.scale(this.scale[0], this.scale[1], this.scale[2]);
        this.plane.display();
        this.scene.popMatrix();
        this.gradient_text.unbind(1);
        this.gradient_text.unbind(2);
    }
}
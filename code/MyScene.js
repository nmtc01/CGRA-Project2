/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();
        this.initMaterials();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.enableTextures(true);
        this.setUpdatePeriod(50);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.plane = new Plane(this, 32);
        this.house = new MyHouse(this, 0, this.house_side_mat, this.house_roof_mat, this.house_column_mat);
        this.skybox = new MyCubeMap(this);
        this.bird = new MyBird(this);

        this.cyl = new MyTopCylinder(this, 5);

        //Objects connected to MyInterface
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 100, vec3.fromValues(10, 10, 10), vec3.fromValues(0, 0, 0));
    }
    initMaterials() {
        //Textures
        this.skybox_day_text    = new CGFtexture(this, 'images/Skybox.png');
        this.skybox_night_text  = new CGFtexture(this, 'images/Skybox-night.png');
        this.house_side_text    = new CGFtexture(this, 'images/house_side.png');
        this.house_roof_text    = new CGFtexture(this, 'images/palha.jpg');
        this.house_column_text  = new CGFtexture(this, 'images/wood.jpeg');

        //Materials
        this.skybox_day_mat = new CGFappearance(this)
        this.skybox_day_mat.setAmbient(1, 1, 1, 1);
        this.skybox_day_mat.setDiffuse(1, 1, 1, 0.1);
        this.skybox_day_mat.setSpecular(0.1, 0.1, 0.1, 0.11);
        this.skybox_day_mat.setShininess(10.0);
        this.skybox_day_mat.setTexture(this.skybox_day_text);

        this.skybox_night_mat = new CGFappearance(this)
        this.skybox_night_mat.setAmbient(1, 1, 1, 1);
        this.skybox_night_mat.setDiffuse(1, 1, 1, 0.1);
        this.skybox_night_mat.setSpecular(0.1, 0.1, 0.1, 0.11);
        this.skybox_night_mat.setShininess(10.0);
        this.skybox_night_mat.setTexture(this.skybox_night_text);

        this.house_side_mat = new CGFappearance(this);
        this.house_side_mat.setAmbient(1, 1, 1, 1.0);
        this.house_side_mat.setDiffuse(1, 1, 1, 1);
        this.house_side_mat.setSpecular(1, 1, 1, 0);
        this.house_side_mat.setShininess(10.0);
        this.house_side_mat.setTexture(this.house_side_text);
        this.house_side_mat.setTextureWrap('REPEAT', 'REPEAT');

        this.house_roof_mat = new CGFappearance(this);
        this.house_roof_mat.setAmbient(1, 1, 1, 1);
        this.house_roof_mat.setDiffuse(1, 1, 1, 0);
        this.house_roof_mat.setSpecular(1, 1, 1, 1);
        this.house_roof_mat.setShininess(10.0);
        this.house_roof_mat.setTexture(this.house_roof_text);
        this.house_roof_mat.setTextureWrap('REPEAT', 'REPEAT');

        this.house_column_mat = new CGFappearance(this);
        this.house_column_mat.setAmbient(1, 1, 1, 1);
        this.house_column_mat.setDiffuse(1, 1, 1, 1);
        this.house_column_mat.setSpecular(1, 1, 1, 0);
        this.house_column_mat.setShininess(10.0);
        this.house_column_mat.setTexture(this.house_column_text);
        this.house_column_mat.setTextureWrap('REPEAT', 'REPEAT');
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
    update(t){
        this.checkKeys();
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        // Draw axis
        this.axis.display();

        //Apply default appearance
        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section
        /*
        this.pushMatrix();
        this.rotate(-0.5*Math.PI, 1, 0, 0);
        this.scale(60, 60, 1);
        this.plane.display();
        this.popMatrix();
        */

        /*
        this.house.display();
        this.skybox_day_mat.apply();
        this.skybox.display();
        */
       this.house_side_mat.apply();

        this.pushMatrix();
        this.bird.display(this);
        this.popMatrix();
        // ---- END Primitive drawing section
    }
    checkKeys() {
        var text = "Keys pressed: ";
        var keysPressed = false;
        // Check for key codes e.g. in ​https://keycode.info/
        if (this.gui.isKeyPressed("KeyW")) {
            text += " W ";
            keysPressed = true;
        }
        if (this.gui.isKeyPressed("KeyS")) {
            text += " S ";
            keysPressed = true;
        }
        if (keysPressed)
            console.log(text);
    }
}
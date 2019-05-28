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

//DEFAULT
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.enableTextures(true);
        this.setUpdatePeriod(50);

//OBJECTS
        this.axis       = new CGFaxis(this);
        this.terrain    = new MyTerrain(this, 60, 60, 30);
        this.house      = new MyHouse(this, 0, this.house_side_mat, this.house_roof_mat, this.house_column_mat);
        this.skybox     = new MyCubeMap(this);
        this.bird       = new MyBird(this);
        this.nest       = new MyNest(this);
        this.branches = [];
        this.branches[0] = new MyTreeBranch(this, 0, 4.1, 0, Math.PI, Math.PI/2);
        this.branches[1] = new MyTreeBranch(this);
        this.branches[2] = new MyTreeBranch(this);
        this.branches[3] = new MyTreeBranch(this);
        this.branches[4] = new MyTreeBranch(this);
        this.lightning  = new MyLightning(this);
        this.lightning.generate(this.lightning.axiom, this.lightning.productions, this.lightning.angle, this.lightning.iterations, this.lightning.scaleFactor);

//AUXILIARY
        this.time       = 0;
        this.cur_time   = 0;

//INTERFACE
        this.scaleFactor = 0.5;
        this.speedFactor = 0.5;
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 20, 30), vec3.fromValues(0,0,0));
    }
    initMaterials() {
//TEXTURES
        this.skybox_day_text    = new CGFtexture(this, 'images/Skybox.png');
        this.skybox_night_text  = new CGFtexture(this, 'images/Skybox-night.png');
        this.house_side_text    = new CGFtexture(this, 'images/house_side.png');
        this.house_roof_text    = new CGFtexture(this, 'images/palha.jpg');
        this.house_column_text  = new CGFtexture(this, 'images/wood.jpeg');
        this.branch_text        = new CGFtexture(this, 'images/branch.png');
        this.branch_top_text    = new CGFtexture(this, 'images/branch_top.png');
        this.lightning_text    = new CGFtexture(this, 'images/lightning.png');

//MATERIALS
        this.skybox_day_mat     = new CGFappearance(this);
        this.skybox_night_mat   = new CGFappearance(this);
        this.house_side_mat     = new CGFappearance(this);
        this.house_roof_mat     = new CGFappearance(this);
        this.house_column_mat   = new CGFappearance(this);
        this.branch_mat         = new CGFappearance(this);
        this.branch_top_mat     = new CGFappearance(this);
        this.lightning_mat      = new CGFappearance(this);
        
        this.skybox_day_mat.setTexture(this.skybox_day_text);
        this.skybox_night_mat.setTexture(this.skybox_night_text);
        this.house_side_mat.setTexture(this.house_side_text);
        this.house_roof_mat.setTexture(this.house_roof_text);
        this.house_column_mat.setTexture(this.house_column_text);
        this.branch_mat.setTexture(this.branch_text);
        this.branch_top_mat.setTexture(this.branch_top_text);
        this.lightning_mat.setTexture(this.lightning_text);
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
    update(t) {
        this.checkKeys(t);

        this.bird.update(((t - this.time) / 50));
        this.bird.oscilate();
        this.bird.wing_flap();

        this.lightning.update(t);

        this.time = t;
    }

    display() {
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
        this.updateProjectionMatrix();
        this.loadIdentity();
        this.applyViewMatrix();
        this.setDefaultAppearance();

let skybox      = 1, 
    house       = 1, 
    bird        = 1, 
    nest        = 1, 
    lightning   = 1, 
    trees       = 1, 
    terrain     = 1,
    branches    = 1,
    test        = 0;
//SCENE
//SKYBOX
        if(skybox){
        this.pushMatrix();
        this.skybox_day_mat.apply();
        this.skybox.display();
        this.popMatrix();
        }

//HOUSE
        if(house){
        this.pushMatrix();
        this.translate(2,1.7,6);
        this.house.display();
        this.popMatrix();
        }

//BIRD
        if(bird){
        this.pushMatrix();
        this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
        this.translate(16,10,3);
        this.bird.display(this);
        this.popMatrix();
        }

//NEST
        if (nest) {
        this.pushMatrix();
        this.translate(8,1.8,2);
        this.house_side_mat.apply();
        this.nest.display();
        this.popMatrix();
        }

//TREES
        if(trees){
        }

//TERRAIN
        if(terrain){
            this.pushMatrix();
            this.terrain.display();
            this.popMatrix();
        }
        
//BRANCHES
        if(branches) {
        this.pushMatrix();
        this.branch_mat.apply();
        this.branches[0].display();
        this.popMatrix();
        }
        
//LIGHTNING
        if(lightning){
        this.pushMatrix();
        this.translate(-10,20,-10);
        this.rotate(Math.PI/4, 1,0,1);
        this.scale(4,-4,4);
        this.lightning.display();
        this.popMatrix();
        }
//TEST AREA
        if(test){
        this.pushMatrix();
        this.popMatrix();
        }
    }

    checkKeys(t) {
        if (this.gui.isKeyPressed("KeyW")) this.bird.accelerate(this.speedFactor);
        if (this.gui.isKeyPressed("KeyS")) this.bird.accelerate(-this.speedFactor);
        if (this.gui.isKeyPressed("KeyR")) this.bird.reset();
        if (this.gui.isKeyPressed("KeyA")) this.bird.turn(0.1);
        if (this.gui.isKeyPressed("KeyD")) this.bird.turn(-0.1);
        if (this.gui.isKeyPressed("KeyL")) this.lightning.startAnimation(t);
    }
}
/**
* MyBird
* @constructor
*/
class MyBird extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initMaterials();

        this.body = new MyTopCylinder(scene, 5, this.bird_body_mat, this.bird_body_mat);
        this.head = new MyTopCylinder(scene, 5, this.bird_body_mat, this.bird_body_mat);
        
        this.bico = new MyCone(scene, 4);
        this.tail = new MyTriangle(scene);
        this.olho = new MyUnitCubeQuad(scene, this.bird_body_mat, this.bird_eye_mat, this.bird_body_mat);
        
        this.asa1 = new MyQuad(scene, undefined);
        this.asa2 = new MyTriangle(scene);

        this.wing_rot = [0, 0];                         // arm - forearm
        this.body_rot = [0, 0, 0];                      // pitch - yaw - roll
        this.body_pos = [0, 0, 0];                      // x - y - z
        this.speed = 0;
        this.time = 0;
        this.fall = 0;
    }

    initMaterials() {
        //Textures
        this.bird_body_text = new CGFtexture(this.scene, 'images/penas.jpg');
        this.bird_eye_text = new CGFtexture(this.scene, 'images/eye.png');

        //Materials
        this.bird_body_mat = new CGFappearance(this.scene);
        this.bird_body_mat.setAmbient(1, 1, 1, 1);
        this.bird_body_mat.setDiffuse(1, 1, 1, 0.1);
        this.bird_body_mat.setSpecular(0.1, 0.1, 0.1, 0.11);
        this.bird_body_mat.setShininess(10.0);
        this.bird_body_mat.setTexture(this.bird_body_text);
        this.bird_body_mat.setTextureWrap('REPEAT', 'REPEAT');

        this.bird_bico_mat = new CGFappearance(this.scene);
        this.bird_bico_mat.setAmbient(1, 0.2, 0, 1);
        this.bird_bico_mat.setDiffuse(1, 0.2, 0, 0.1);
        this.bird_bico_mat.setSpecular(0.1, 0.1, 0.1, 0.11);
        this.bird_bico_mat.setShininess(10.0);
        //this.bird_bico_mat.setTexture(this.bird_body_text);
        this.bird_bico_mat.setTextureWrap('REPEAT', 'REPEAT');

        this.bird_eye_mat = new CGFappearance(this.scene);
        this.bird_eye_mat.setAmbient(1, 1, 1, 1);
        this.bird_eye_mat.setDiffuse(1, 1, 1, 0.1);
        this.bird_eye_mat.setSpecular(0.1, 0.1, 0.1, 0.11);
        this.bird_eye_mat.setShininess(10.0);
        this.bird_eye_mat.setTexture(this.bird_eye_text);
        this.bird_eye_mat.setTextureWrap('REPEAT', 'REPEAT');
    }

    display(scene){
        scene.translate(this.body_pos[0], this.body_pos[1], this.body_pos[2]);
        scene.rotate(this.body_rot[1], 0, 1, 0);

        scene.scale(0.75,0.75,0.75);

        scene.pushMatrix();
        scene.rotate(Math.PI/2, 0, 1, 0);
        scene.rotate(Math.PI/2, 0, 0, 1);
        this.bird_body_mat.apply();
        this.body.display();
        scene.popMatrix();

        scene.pushMatrix();
        scene.scale(1,1,1.2);
        scene.rotate(Math.PI/2, 0, 1, 0);
        scene.rotate(Math.PI/2, 0, 0, 1);
        scene.translate(0.5, 0.5, 0);
        this.bird_body_mat.apply();
        this.head.display();
        scene.popMatrix();
        
        scene.pushMatrix();
        scene.scale(0.4,0.3,0.5);
        scene.rotate(Math.PI/2, 0, 1, 0);
        scene.rotate(Math.PI/2, 0, 0, 1);
        scene.translate(0.5, 3.5, 0);
        this.bird_bico_mat.apply();
        this.bico.display();
        scene.popMatrix();
        
        scene.pushMatrix();
        scene.rotate(Math.PI/2, 0, 1, 0);
        scene.scale(0.4,0.4,0.4);
        scene.translate(1, -0.5, 0);
        this.bird_body_mat.apply();
        this.tail.display();
        scene.popMatrix();
        
        scene.pushMatrix();
        scene.scale(0.2,0.2,0.2);
        scene.translate(5, 4, 7.5);
        scene.rotate(Math.PI/2,0,0,1);
        this.olho.display();
        scene.popMatrix();
        
        scene.pushMatrix();
        scene.scale(0.2,0.2,0.2);
        scene.translate(-5, 4, 7.5);
        scene.rotate(-Math.PI/2,0,0,1);
        this.olho.display();
        scene.popMatrix();
        
//LEFT WING
        scene.pushMatrix();
        scene.rotate(Math.PI/2, 1, 0, 0);
        scene.translate(1.25, 0.5, 0);
        scene.translate(-0.1 * Math.sin(this.wing_rot[0]), 0, Math.sin(this.wing_rot[0]));
        scene.rotate(this.wing_rot[0], 0, -1, 0);
        this.bird_body_mat.apply();
        this.asa1.display();
        scene.popMatrix();
        
        scene.pushMatrix();
        scene.scale(0.5,0.5,0.5);
        scene.rotate(Math.PI/2, 1, 0, 0);
        scene.translate(4.5, 1, 0);
        scene.translate(-Math.abs(Math.sin(this.wing_rot[1])), 0, -2*Math.sin(this.wing_rot[1]));
        scene.rotate(this.wing_rot[1], 0, -1, 0);
        this.bird_body_mat.apply();
        this.asa2.display();
        scene.popMatrix();
        
//RIGHT WING
        scene.pushMatrix();
        scene.rotate(Math.PI/2, 1, 0, 0);
        scene.translate(-1.25, 0.5, 0);
        scene.translate(0.1 * Math.sin(this.wing_rot[0]), 0, Math.sin(this.wing_rot[0]));
        scene.rotate(this.wing_rot[0], 0, 1, 0);
        this.bird_body_mat.apply();
        this.asa1.display();
        scene.popMatrix();
        
        scene.pushMatrix();
        scene.scale(0.5,0.5,0.5);
        scene.rotate(Math.PI, 0, 1, 0);
        scene.rotate(Math.PI/2, -1, 0, 0);
        scene.translate(4.5, 1, 0);
        scene.translate(-Math.abs(Math.sin(this.wing_rot[1])), 0, 2*Math.sin(this.wing_rot[1]));
        scene.rotate(this.wing_rot[1], 0, 1, 0);
        this.bird_body_mat.apply();
        this.asa2.display();
        scene.popMatrix();
        



    }

    turn(v) {
        this.body_rot[1] += v;
    }

    accelerate(v) {
        this.speed += v;
        if (this.speed < 0) this.speed = 0;
    }

    reset() {
        this.body_rot = [0, 0, 0];
        this.body_pos = [0, 0, 0];
        this.speed = 0;
        //this.fall = 0;
    }

    update(t) {
        this.time += (0.1 * t * Math.PI);
        this.body_pos[0] += t * this.speed * Math.sin(this.body_rot[1]);
        /*if (this.fall)
            this.body_pos[1] -= t * this.speed;*/
        this.body_pos[2] += t * this.speed * Math.cos(this.body_rot[1]);  
    }

    oscilate() {
        this.body_pos[1] = Math.sin(this.time);
    }

    wing_flap() {
        this.wing_rot[0] = -1 * Math.abs(this.speed * (Math.PI / 4) * Math.sin(this.time * 0.8));
        this.wing_rot[1] = Math.abs(this.speed * (Math.PI / 4) * Math.sin(this.time * 0.8)); 
    }

    /*go_down() {
        this.fall = 1;
    }*/
}



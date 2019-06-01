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

        this.branch = undefined;        // OBJECT NOT UNDEFINED IF BIRD HAS BRANCH

        this.wing_rot = [0, 0];                         // arm - forearm
        this.body_rot = [0, 0, 0];                      // pitch - yaw - roll
        this.body_pos = [0, 6, 0];                      // x - y - z
        this.speed = 0;
        this.time = 0;
        
        this.bird_mov = {"normal_move": 0, "fall": 1, "reach_ground": 2, "ascend": 3};
        Object.freeze(this.bird_mov);

        this.hunt = this.bird_mov.normal_move;
        this.branch_found = 0;
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
    display(){
//GLOBAL MOV
        this.scene.translate(this.body_pos[0], this.body_pos[1], this.body_pos[2]);
        this.scene.rotate(this.body_rot[1], 0, 1, 0);
        this.scene.rotate(this.body_rot[0], 1, 0, 0);
        this.scene.scale(this.scene.scaleFactor,this.scene.scaleFactor,this.scene.scaleFactor);

//BODY
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.bird_body_mat.apply();
        this.body.display();
        this.scene.popMatrix();

//HEAD
        this.scene.pushMatrix();
        this.scene.scale(1,1,1.2);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.scene.translate(0.5, 0.5, 0);
        this.bird_body_mat.apply();
        this.head.display();
        this.scene.popMatrix();

//BICO
        this.scene.pushMatrix();
        this.scene.scale(0.4,0.3,0.5);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.scene.translate(0.5, 3.5, 0);
        this.bird_bico_mat.apply();
        this.bico.display();
        this.scene.popMatrix();

//BRANCH
        if(this.branch != undefined){ 
        this.scene.pushMatrix();
        this.scene.scale(1/this.scene.scaleFactor, 1/this.scene.scaleFactor, 1/this.scene.scaleFactor);
        this.branch.x = 0;
        this.branch.y = 0;
        this.branch.z = 0;
        this.scene.translate(-4.8,-1.8,-1);
        this.branch.display();
        this.scene.popMatrix();
        }
      
//TAIL
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.scale(0.4,0.4,0.4);
        this.scene.translate(1, -0.5, 0);
        this.bird_body_mat.apply();
        this.tail.display();
        this.scene.popMatrix();

//EYES
        this.scene.pushMatrix();
        this.scene.scale(0.2,0.2,0.2);
        this.scene.translate(5, 4, 7.5);
        this.scene.rotate(Math.PI/2,0,0,1);
        this.olho.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.2,0.2,0.2);
        this.scene.translate(-5, 4, 7.5);
        this.scene.rotate(-Math.PI/2,0,0,1);
        this.olho.display();
        this.scene.popMatrix();
        
//LEFT WING
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.translate(1.25, 0.5, 0);
        this.scene.translate(-0.1 * Math.sin(this.wing_rot[0]), 0, Math.sin(this.wing_rot[0]));
        this.scene.rotate(this.wing_rot[0], 0, -1, 0);
        this.bird_body_mat.apply();
        this.asa1.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.scale(0.5,0.5,0.5);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.translate(4.5, 1, 0);
        this.scene.translate(-Math.abs(Math.sin(this.wing_rot[1])), 0, -2*Math.sin(this.wing_rot[1]));
        this.scene.rotate(this.wing_rot[1], 0, -1, 0);
        this.bird_body_mat.apply();
        this.asa2.display();
        this.scene.popMatrix();
        
//RIGHT WING
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.translate(-1.25, 0.5, 0);
        this.scene.translate(0.1 * Math.sin(this.wing_rot[0]), 0, Math.sin(this.wing_rot[0]));
        this.scene.rotate(this.wing_rot[0], 0, 1, 0);
        this.bird_body_mat.apply();
        this.asa1.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.scale(0.5,0.5,0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.rotate(Math.PI/2, -1, 0, 0);
        this.scene.translate(4.5, 1, 0);
        this.scene.translate(-Math.abs(Math.sin(this.wing_rot[1])), 0, 2*Math.sin(this.wing_rot[1]));
        this.scene.rotate(this.wing_rot[1], 0, 1, 0);
        this.bird_body_mat.apply();
        this.asa2.display();
        this.scene.popMatrix();
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
        this.body_pos = [0, 6, 0];
        this.speed = 0;
        this.hunt = this.bird_mov.normal_move;
    }
    go_down() {
        this.hunt = this.bird_mov.fall;
    }
    update(t) {
        this.time += (0.1 * t * Math.PI);
        this.body_pos[0] += t * this.speed * Math.sin(this.body_rot[1]);
        this.body_pos[2] += t * this.speed * Math.cos(this.body_rot[1]);

        switch(this.hunt) {
            case 0:
                this.body_rot[0] = 0; 
                break;
            case 1:
                this.body_rot[0] = Math.PI/6;
                this.body_pos[1] -= 0.18*t;
                if (this.body_pos[1] < 3) this.hunt = this.bird_mov.reach_ground;
                break;
            case 2:
                if(!this.branch_found) this.scene.checkBranch();
                else this.scene.checkNest();
                this.hunt = this.bird_mov.ascend;
                break;
            case 3:
                this.body_rot[0] = -Math.PI/6;
                this.body_pos[1] += 0.18*t;
                if (this.body_pos[1] > 6) {
                    this.body_pos[1] = 6;
                    this.hunt = this.bird_mov.normal_move;
                }
                break;
        } 
    }
    oscilate() {
        this.body_pos[1] += 0.2*Math.sin(this.time);
    }
    wing_flap() {
        if (this.speed == 0) {
            this.wing_rot[0] = -1 * Math.abs(0.4 * (Math.PI / 4) * Math.sin(this.time * 0.8));
            this.wing_rot[1] = Math.abs(0.4 * (Math.PI / 4) * Math.sin(this.time * 0.8));
        }
        else {
            this.wing_rot[0] = -1 * Math.abs(this.speed * (Math.PI / 4) * Math.sin(this.time * 0.8));
            this.wing_rot[1] = Math.abs(this.speed * (Math.PI / 4) * Math.sin(this.time * 0.8));
        } 
    }
}



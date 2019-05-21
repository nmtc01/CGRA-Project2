/**
* MyBird
* @constructor
*/
class MyBird extends CGFobject {
    constructor(scene) {
        super(scene);
        this.body = new MyTopCylinder(scene, 5);
        this.head = new MyTopCylinder(scene, 5);
        
        this.bico = new MyCone(scene, 4);
        this.tail = new MyTriangle(scene);
        this.olho = new MyUnitCubeQuad(scene, scene.house_side_mat, scene.house_side_mat, scene.house_side_mat);
        
        this.asa1 = new MyQuad(scene, undefined);
        this.asa2 = new MyTriangle(scene);

        this.wing_rot = [-Math.PI / 4, Math.PI/4];      // arm - forearm
        this.body_rot = [0, 0, 0];                      // pitch - yaw - roll
        this.body_pos = [0, 0, 0];                      // x - y - z
        this.speed = 0;
        this.time = 0;
    }

    display(scene){
        scene.translate(this.body_pos[0], this.body_pos[1], this.body_pos[2]);
        scene.rotate(this.body_rot[1], 0, 1, 0);

        scene.scale(0.75,0.75,0.75);

        scene.pushMatrix();
        scene.rotate(Math.PI/2, 0, 1, 0);
        scene.rotate(Math.PI/2, 0, 0, 1);
        this.body.display();
        scene.popMatrix();

        scene.pushMatrix();
        scene.scale(1,1,1.2);
        scene.rotate(Math.PI/2, 0, 1, 0);
        scene.rotate(Math.PI/2, 0, 0, 1);
        scene.translate(0.5, 0.5, 0);
        this.head.display();
        scene.popMatrix();
        
        scene.pushMatrix();
        scene.scale(0.5,0.5,0.5);
        scene.rotate(Math.PI/2, 0, 1, 0);
        scene.rotate(Math.PI/2, 0, 0, 1);
        scene.translate(0, 3.5, 0);
        this.bico.display();
        scene.popMatrix();
        
        scene.pushMatrix();
        scene.rotate(Math.PI/2, 0, 1, 0);
        scene.scale(0.4,0.4,0.4);
        scene.translate(1, -0.5, 0);
        this.tail.display();
        scene.popMatrix();
        
        scene.pushMatrix();
        scene.scale(0.2,0.2,0.2);
        scene.translate(5, 4, 7.5);
        this.olho.display();
        scene.popMatrix();
        
        scene.pushMatrix();
        scene.scale(0.2,0.2,0.2);
        scene.translate(-5, 4, 7.5);
        this.olho.display();
        scene.popMatrix();
        
//LEFT WING
        scene.pushMatrix();
        scene.rotate(Math.PI/2, 1, 0, 0);
        scene.translate(1.25, 0.5, 0);
        //scene.rotate(this.wing_rot[0], 0, -1, 0);
        //scene.translate( -0.1, 0, -0.1);
        this.asa1.display();
        scene.popMatrix();
        
        scene.pushMatrix();
        scene.scale(0.5,0.5,0.5);
        scene.rotate(Math.PI/2, 1, 0, 0);
        scene.translate(4.5, 1, 0);
        //scene.rotate(this.wing_rot[1], 0, -1, 0);
        this.asa2.display();
        scene.popMatrix();
        
//RIGHT WING
        scene.pushMatrix();
        scene.rotate(Math.PI/2, 1, 0, 0);
        scene.translate(-1.25, 0.5, 0);
        //scene.rotate(this.wing_rot[0], 0, 1, 0);
        this.asa1.display();
        scene.popMatrix();
        
        scene.pushMatrix();
        scene.scale(0.5,0.5,0.5);
        scene.rotate(Math.PI, 0, 1, 0);
        scene.rotate(Math.PI/2, -1, 0, 0);
        scene.translate(4.5, 1, 0);
        //scene.rotate(this.wing_rot[1], 0, 1, 0);
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
    }

    oscilate(t) {
        this.time += (0.1 * t * Math.PI);
        this.body_pos[1] = Math.sin(this.time);
    }
}



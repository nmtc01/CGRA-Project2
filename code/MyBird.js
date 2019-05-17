/**
* MyBird
* @constructor
*/
class MyBird extends CGFobject {
    constructor(scene) {
        super(scene);
        this.body = new MyTopCylinder(scene, 5);
        this.head = new MyTopCylinder(scene, 5);
        
        this.bico = new MyCone(scene, 3);
        this.tail = new MyTriangle(scene);
        this.olho = new MyUnitCube(scene);
        
        this.asa1 = new MyQuad(scene, undefined);
        this.asa2 = new MyTriangle(scene);

        this.asa_rot = 0;
        this.body_rot = [0,0,0];
    }

    display(scene){
        scene.rotate(Math.PI, this.body_rot[0],
                              this.body_rot[1],
                              this.body_rot[2]);

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
        this.asa1.display();
        scene.popMatrix();
        
        scene.pushMatrix();
        scene.scale(0.5,0.5,0.5);
        scene.rotate(Math.PI/2, 1, 0, 0);
        scene.translate(4.5, 1, 0);
        this.asa2.display();
        scene.popMatrix();
        
//RIGHT WING
        scene.pushMatrix();
        scene.rotate(Math.PI/2, 1, 0, 0);
        scene.translate(-1.25, 0.5, 0);
        this.asa1.display();
        scene.popMatrix();
        
        scene.pushMatrix();
        scene.scale(0.5,0.5,0.5);
        scene.rotate(Math.PI, 0, 1, 0);
        scene.rotate(Math.PI/2, -1, 0, 0);
        scene.translate(4.5, 1, 0);
        this.asa2.display();
        scene.popMatrix();
        



    }
}



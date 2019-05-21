/**
* MyNest
* @constructor
*/
class MyNest extends CGFobject {
    constructor(scene, x, y, z, rot_x, rot_z, radius, height) {
        super(scene);
        this.branch = new MyTreeBranch(scene, 0, 0, 0, 0, 0, 0.2, 1);
        this.bot    = new MyTop(scene, 8);
        
        if(x != undefined && y != undefined && z != undefined) this.pos = [x, y, z];
        else this.pos = [0, 0, 0];

        if (rot_x != undefined && rot_z != undefined) this.rot = [rot_x, rot_z];
        else this.rot = [0, 0];

        if (radius != undefined) this.radius = radius;
        else this.radius = 1;

        if (height != undefined) this.height = height;
        else this.height = 1;
    }

    display(scene) {
        if (scene == undefined) return;
        scene.pushMatrix();

        scene.translate(this.pos[0], this.pos[1], this.pos[2]);
        scene.scale(this.radius, this.height, this.radius);
        scene.rotate(this.rot[0], 1, 0, 0);
        scene.rotate(this.rot[1], 0, 0, 1);

        scene.pushMatrix();
        scene.translate(-1.2, 0, -0.5);
        scene.rotate(Math.PI/2, 1, 0, 0);
        this.branch.display(scene);
        scene.popMatrix();
        
        scene.pushMatrix();
        scene.translate(1.2, 0, -0.5);
        scene.rotate(Math.PI/2, 1, 0, 0);
        this.branch.display(scene);
        scene.popMatrix();
        
        scene.pushMatrix();
        scene.translate(-0.5, 0, -1.2);
        scene.rotate(Math.PI/2, 1, 0, 0);
        scene.rotate(Math.PI/2, 0, 0, -1);
        this.branch.display(scene);
        scene.popMatrix();
        
        scene.pushMatrix();
        scene.translate(-0.5, 0, 1.2);
        scene.rotate(Math.PI/2, 1, 0, 0);
        scene.rotate(Math.PI/2, 0, 0, -1);
        this.branch.display(scene);
        scene.popMatrix();
        
        scene.pushMatrix();
        scene.translate(-1.2, 0, 0.5);
        scene.rotate(Math.PI/2, 1, 0, 0);
        scene.rotate(Math.PI/4, 0, 0, -1);
        this.branch.display(scene);
        scene.popMatrix();
        
        scene.pushMatrix();
        scene.translate(-1.2, 0, -0.5);
        scene.rotate(Math.PI/2, 1, 0, 0);
        scene.rotate(3 * Math.PI/4, 0, 0, -1);
        this.branch.display(scene);
        scene.popMatrix();
        
        scene.pushMatrix();
        scene.translate(0.5, 0, 1.2);
        scene.rotate(Math.PI/2, 1, 0, 0);
        scene.rotate(3 * Math.PI/4, 0, 0, -1);
        this.branch.display(scene);
        scene.popMatrix();
        
        scene.pushMatrix();
        scene.translate(0.5, 0, -1.2);
        scene.rotate(Math.PI/2, 1, 0, 0);
        scene.rotate(Math.PI/4, 0, 0, -1);
        this.branch.display(scene);
        scene.popMatrix();

        scene.pushMatrix();
        scene.rotate(Math.PI/8, 0, 1, 0);
        scene.scale(1.3, 0.05, 1.3);
        this.bot.display();
        scene.popMatrix();
        
        scene.popMatrix();
    }
}



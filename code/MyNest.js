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

    display() {
        if (this.scene == undefined) return;
        this.scene.pushMatrix();

        this.scene.translate(this.pos[0], this.pos[1], this.pos[2]);
        this.scene.scale(this.radius, this.height, this.radius);
        this.scene.rotate(this.rot[0], 1, 0, 0);
        this.scene.rotate(this.rot[1], 0, 0, 1);

        this.scene.pushMatrix();
        this.scene.translate(-1.2, 0, -0.5);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.branch.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(1.2, 0, -0.5);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.branch.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, -1.2);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 0, -1);
        this.branch.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 1.2);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 0, -1);
        this.branch.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(-1.2, 0, 0.5);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.rotate(Math.PI/4, 0, 0, -1);
        this.branch.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(-1.2, 0, -0.5);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.rotate(3 * Math.PI/4, 0, 0, -1);
        this.branch.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 1.2);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.rotate(3 * Math.PI/4, 0, 0, -1);
        this.branch.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, -1.2);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.rotate(Math.PI/4, 0, 0, -1);
        this.branch.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/8, 0, 1, 0);
        this.scene.scale(1.3, 0.05, 1.3);
        this.scene.house_side_mat.apply();
        this.bot.display();
        this.scene.popMatrix();
        
        this.scene.popMatrix();
    }
}



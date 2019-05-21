/**
* MyTreebranch
* @constructor
*/
class MyTreeBranch extends CGFobject {
    constructor(scene, x, y, z, rot_x, rot_z, radius, height) {
        super(scene);
        this.branch = new MyTopCylinder(scene, 5);
        
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
        scene.pushMatrix();
        scene.translate(this.pos[0], this.pos[1], this.pos[2]);
        scene.rotate(this.rot[0], 1, 0, 0);
        scene.rotate(this.rot[1], 0, 0, 1);
        scene.scale(this.radius, this.height, this.radius);
        this.branch.display();
        scene.popMatrix();
    }
}



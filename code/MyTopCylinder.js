/**
* MyTopCylinder
* @constructor
*/
class MyTopCylinder extends CGFobject {
    constructor(scene, slices, side_mat, top_mat) {
        super(scene);
        this.cyl = new MyCylinder(scene, slices);
        this.top = new MyTop(scene, slices);

        this.side_mat = side_mat;
        this.top_mat  = top_mat;
    }
    display(scene) {
        this.side_mat.apply();
        this.cyl.display();
        this.top_mat.apply();
        this.top.display();
    }
}



/**
* MyTopCylinder
* @constructor
*/
class MyTopCylinder extends CGFobject {
    constructor(scene, slices) {
        super(scene);
        this.cyl = new MyCylinder(scene, slices);
        this.top = new MyTop(scene, slices);
    }
    display(scene) {
        this.cyl.display();
        this.top.display();
    }
}



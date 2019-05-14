/**
* MyBird
* @constructor
*/
class MyBird extends CGFobject {
    constructor(scene) {
        super(scene);
        this.body = new MyCylinder();
        this.head = new MyCylinder();
        
        this.bico = new MyCylinder();
        this.tail = new MyTriangle();
        
        this.asa1 = new MyQuad();
        this.asa2 = new MyTriangle();

        this.asa_rot = 0;
    }

    display(){



    }
}



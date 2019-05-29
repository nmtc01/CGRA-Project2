/**
 * MyLSPlant
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLSPlant extends MyLSystem {
	constructor(scene) {
        super(scene);
        
        this.generate("X",
                {   "F": [ "FF",
                           "F[+X]F",
                           "F[-FFX]F",
                           "F[+FFX]F", ],
                    "X": [ "F[-X][X]F[-X]+X",
                            "F[-X][X]+X", 
                            "F[+X]-X",
                            "F[/X][X]F[\\X]+X", 
                            "F[\\X][X]/X",
                            "F[/X]\\X", 
                            "F[^X][X]F[&X]^X",
                            "F[^X]&X",
                            "F[&X]^X", ] },
                30.0,
                4,
                0.5 );
    }

    // cria o lexico da gramática
    initGrammar(){
        this.grammar = {
            "F": new MyTreeBranch(this.scene,0,0,0,0,0,0.3,1),
            "X": new MyLeaf(this.scene)
        };
    }
};

class MyLeaf extends CGFobject {
	constructor(scene) {
		super(scene);
        this.tri = new MyPyramid(scene, 3);
        
        this.mat = new CGFappearance(scene)
        this.mat.setAmbient(0.1, 0.8, 0.1, 1);
        this.mat.setShininess(10.0);

    }

    display(){
        this.mat.apply();
        this.tri.display();
    }
}
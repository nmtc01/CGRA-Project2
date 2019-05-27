/**
 * MyLightning
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLightning extends MyLSystem {
	constructor(scene) {
        super(scene);

        this.axiom = "X";
        this.productions = { "F": [ "FF",
                                    "F[-X]F[+X]F" ],
                             "X": [ " F[-X][X]F[-X]+FX", 
                                    "F[/X][X]F[\\X]+X", 
                                    "F[\\X][X]/X",
                                    "F[/X]\\X", 
                                    "F[^X][X]F[&X]^X",
                                    "F[^X]&X",
                                    "F[&X]^X",] };
        this.angle = 25.0;
        this.iterations = 3;
        this.scaleFactor = 0.5;
    }
    initGrammar(){
        this.grammar = {
            "F": new MyLightningQuad(this.scene),
            "X": new MyLightningQuad(this.scene)
        };
    }
    update(t){
        if((t - this.start_time) < 1000){
            this.depth = (t - this.start_time) / this.axiom.length;
        }else{
            this.depth = 0;
        }
    }
    startAnimation(t){
        this.start_time = t;
        this.depth = 0;
        this.iterate();
    }
    display(){
        if(this.depth == 0) return;
        this.scene.pushMatrix();
        this.scene.scale(this.scale, this.scale, this.scale);

        var i;

        // percorre a cadeia de caracteres
        for (i=0; i<this.depth; ++i){

            // verifica se sao caracteres especiais
            switch(this.axiom[i]){
                case "+": this.scene.rotate(this.angle, 0, 0, 1); break;
                case "-": this.scene.rotate(-this.angle, 0, 0, 1); break;
                case "\\": this.scene.rotate(this.angle, 1, 0, 0); break;
                case "/": this.scene.rotate(-this.angle, 1, 0, 0); break;
                case "^": this.scene.rotate(this.angle, 0, 1, 0); break;
                case "&": this.scene.rotate(-this.angle, 0, 1, 0); break;
                case "[": this.scene.pushMatrix(); break;
                case "]": this.scene.popMatrix(); break;

                // processa primitiva definida na gramatica, se existir
                default:
                    var primitive=this.grammar[this.axiom[i]];

                    if ( primitive )
                    {
                        primitive.display();
                        this.scene.translate(0, 1, 0);
                    }
                    break;
            }
        }
        this.scene.popMatrix();
    }

};

class MyLightningQuad extends CGFobject {
	constructor(scene) {
        super(scene);
        this.scene = scene;
        this.quad = new MyQuad(scene);
    }

    display(){
        this.scene.pushMatrix();
        this.scene.scale(0.1,2,0.1);
        this.quad.display();
        this.scene.popMatrix();
    }
};
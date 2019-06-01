/**
 * MyLightning
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLightning extends MyLSystem {
    constructor(scene) {
        super(scene);

        this.axiom = "F";
        this.productions = {
            "F": ["FF",
                "F[-X]F[+X]F"],
            "X": ["F[X]FX",
                "F[+X][X]/X+XF",
                "F[X][-X]X-X",
                "F&[+X]FX[-X]",
                "F[/X]X[\\X]",
                "F+XF[-X]\\X",
                "F[\\X]&FF/X",]
        };
        this.angle = 25.0;
        this.iterations = 3;
        this.scale = 0.5;
        this.start_time = 0;
        this.cloud = new MyCloud(scene, 0, 0, 0);
    }
    initGrammar() {
        this.grammar = {
            "F": new MyLightningPrim(this.scene),
            "X": new MyLightningPrim(this.scene)
        };
    }
    update(t) {
        if ((t - this.start_time) <= 1000) {
            this.depth = ((t - this.start_time) / 1000) * this.axiom.length;
        } else {
            this.depth = 0;
        }
    }
    startAnimation(t) {
        if ((t - this.start_time) > 1000) {
            this.scene.light_coords = this.scene.generateRandomCoords(-10,10);
            this.start_time = t;
            this.depth = 0;
            this.axiom = "X";
            this.iterate();
        }
    }
    display() {
        this.scene.cloud_mat.apply();
        this.cloud.display();
        if (this.depth == 0) return;
        this.scene.pushMatrix();
        this.scene.scale(4,-1,4);
        this.scene.scale(this.scale, this.scale, this.scale);


        var i;
        for (i = 0; i < this.depth; ++i) {
            switch (this.axiom[i]) {
                case "+": this.scene.rotate(this.angle, 0, 0, 1); break;
                case "-": this.scene.rotate(-this.angle, 0, 0, 1); break;
                case "\\": this.scene.rotate(this.angle, 1, 0, 0); break;
                case "/": this.scene.rotate(-this.angle, 1, 0, 0); break;
                case "^": this.scene.rotate(this.angle, 0, 1, 0); break;
                case "&": this.scene.rotate(-this.angle, 0, 1, 0); break;
                case "[": this.scene.pushMatrix(); break;
                case "]": this.scene.popMatrix(); break;
                default:
                    var primitive = this.grammar[this.axiom[i]];
                    if (primitive) {
                        primitive.display();
                        this.scene.translate(0, 1, 0);
                    }
                    break;
            }
        }
        this.scene.popMatrix();
    }

};

class MyLightningPrim extends CGFobject {
    constructor(scene) {
        super(scene);
        this.scene = scene;
        this.cyl = new MyCylinder(scene, 3);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.scale(0.05, 2, 0.05);
        this.scene.lightning_mat.apply();
        this.cyl.display();
        this.scene.popMatrix();
    }
};
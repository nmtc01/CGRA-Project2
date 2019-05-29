/**
 * MyLSystem
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLSystem extends CGFobject {
    constructor(scene) {
        super(scene);
        this.init();
    }

    init() {
        // cria o lexico da gramática
        this.initGrammar()

    }

    // cria o lexico da gramática
    initGrammar() {
        this.grammar = {
            "F": new MyRectangle(this.scene, 0.2, 1),
            "X": new MyRectangle(this.scene, 0.5, 0.5)
        };
    }

    generate(_axiom, _productions, _angle, _iterations, _scale) {
        this.axiom = _axiom;
        this.productions = _productions;
        this.angle = _angle * Math.PI / 180.0;
        this.iterations = _iterations;
        this.scale = Math.pow(_scale, this.iterations - 1);
        this.iterate()
    }


    // desenvolve o axioma ao longo de uma sequência de desenvolvimento com um determinado número de iterações
    iterate() {
        var i, j;
        for (i = 0; i < this.iterations; ++i) {
            var newString = "";

            // substitui cada um dos caracteres da cadeia de caracteres de acordo com as produções
            for (j = 0; j < this.axiom.length; ++j) {
                var axiomProductions = this.productions[this.axiom[j]];
                // aplicar producoes
                if (axiomProductions === undefined) {
                    // caso nao se aplique nenhuma producao deixa estar o caracter original
                    newString += this.axiom[j];
                } else if (axiomProductions.length == 1) {
                    // caso apenas exista uma producao, aplica-a
                    newString += axiomProductions[0];
                } else {
                    // sistema estocastico - varias producoes sao aplicaveis - seleciona aleatoriamente
                    newString += axiomProductions[Math.floor(Math.random() * axiomProductions.length)];
                }
            }

            this.axiom = newString;
        }
    }

    display() {
        this.scene.pushMatrix();
        this.scene.scale(this.scale, this.scale, this.scale);

        var i;
        for (i = 0; i < this.axiom.length; ++i) {
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
}
/**
* MySphere
* @constructor
*/
class MySphere extends CGFobject {
    constructor(scene, slices) {
        super(scene);
        this.slices = slices;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.normals = [];
        this.indices = [];
        this.texCoords = [];

        let i, j, ai, aj;
        for(i = 0; i <= this.slices; i++){
            ai = i * Math.PI / this.slices;
            for(j = 0; j <= this.slices; j++){
                aj = j * 2 * Math.PI / this.slices;

                this.vertices.push(Math.sin(ai) * Math.cos(aj), Math.sin(ai) * Math.sin(aj), Math.cos(ai));
                this.normals.push(Math.sin(ai) * Math.cos(aj), Math.sin(ai) * Math.sin(aj), Math.cos(ai));
                this.texCoords.push( j / this.slices, i / this.slices);
            }
        }
        
        let p1, p2;
        for(i = 0; i < this.slices; i++){
            for(j = 0; j < this.slices; j++){
                p1 = i * (this.slices + 1) + j;
                p2 = (i + 1) * (this.slices + 1) + j;

                this.indices.push(p1, p2, p2 + 1);
                this.indices.push(p1, p2 + 1, p1 + 1);
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
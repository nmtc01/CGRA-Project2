/**
* MyCylinder
* @constructor
*/
class MyCylinder extends CGFobject {
    constructor(scene, slices) {
        super(scene);
        this.slices = slices;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        let ang = 0;
        let alphaAng = 2 * Math.PI / this.slices;

        for (let i = 0; i < this.slices; i++) {
            let sa = Math.sin(ang),
                ca = Math.cos(ang),
                saa = Math.sin(ang + alphaAng),
                caa = Math.cos(ang + alphaAng);

            this.vertices.push(ca, 0, -sa);
            this.vertices.push(ca, 1, -sa);
            this.vertices.push(caa, 0, -saa);
            this.vertices.push(caa, 1, -saa);

            this.indices.push(4 * i, (4 * i + 3) % (4 * this.slices), (4 * i + 1) % (4 * this.slices));
            this.indices.push(4 * i, (4 * i + 2) % (4 * this.slices), (4 * i + 3) % (4 * this.slices));

            this.normals.push(ca, 0, -sa);
            this.normals.push(ca, 0, -sa);
            this.normals.push(caa, 0, -saa);
            this.normals.push(caa, 0, -saa);

            this.texCoords.push(0, 1);
            this.texCoords.push(0, 0);
            this.texCoords.push(1, 1);
            this.texCoords.push(1, 0);

            ang += alphaAng;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}

/**
* MyCylinderTop
* @constructor
*/
class MyTop extends CGFobject {
    constructor(scene, slices) {
        super(scene);
        this.slices = slices;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        let ang = 0;
        let alphaAng = 2 * Math.PI / this.slices;

        for (var i = 0; i < this.slices - 1; i++) {
            let sa = Math.sin(ang);
            let ca = Math.cos(ang);

            this.vertices.push(ca, 0, -sa);
            this.vertices.push(ca, 1, -sa);

            this.normals.push(0, -1, 0);
            this.normals.push(0, 1, 0);

            sa = sa / 2.0;
            ca = ca / 2.0;

            this.texCoords.push(sa + 0.5, ca + 0.5);
            this.texCoords.push(sa + 0.5, ca + 0.5);

            ang += alphaAng;
        }
        let sa = Math.sin(ang);
        let ca = Math.cos(ang);

        this.vertices.push(ca, 0, -sa);
        this.vertices.push(ca, 1, -sa);

        this.normals.push(0, -1, 0);
        this.normals.push(0, 1, 0);

        sa = sa / 2.0;
        ca = ca / 2.0;

        this.texCoords.push(sa + 0.5, ca + 0.5);
        this.texCoords.push(sa + 0.5, ca + 0.5);

        if (this.slices > 2) {
            let lower = 3;
            let upper = 5;
            for (i = 0; i < (this.slices - 2); i++) {
                this.indices.push(1, lower, upper);
                lower -= 1; upper -= 1;
                this.indices.push(upper, lower, 0);
                lower += 3; upper += 3;
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
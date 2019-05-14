/**
* MyPrism
* @constructor
*/
class MyPrism extends CGFobject {
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

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        for(var i = 0; i < this.slices; i++){
			// Declaration of the vertices of each face
            var sa=Math.sin(ang);
            var saa=Math.sin(ang+alphaAng);
            var ca=Math.cos(ang);
            var caa=Math.cos(ang+alphaAng);

            this.vertices.push(ca, 0, -sa);
            this.vertices.push(caa, 0, -saa);
            this.vertices.push(ca, 1, -sa);
            this.vertices.push(caa, 1, -saa);

			// Normals of each face
            var normal= [
                saa-sa,
                0,
                caa-ca
            ];

            var nsize=Math.sqrt(
                normal[0]*normal[0]+
                normal[1]*normal[1]+
                normal[2]*normal[2]
            );
				
            normal[0]/=nsize;
            normal[1]/=nsize;
            normal[2]/=nsize;

            this.normals.push(...normal);
            this.normals.push(...normal);
            this.normals.push(...normal);
            this.normals.push(...normal);

			// Indices for displaying the face
            this.indices.push((4*i), (4*i+1) , (4*i+2) );
            this.indices.push((4*i+1), (4*i+3) , (4*i+2) );

            ang+=alphaAng;

            this.texCoords.push(...[0,1,1,1,1,0,0,0]);
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}



/**
* MyCubeMap
* @constructor
*/
class MyCubeMap extends CGFobject {
	constructor(scene) {
		super(scene);
        this.initBuffers();
	}
	initBuffers() {
		this.vertices = [
		//Face inferior
			-75, -75, -75, //0
			75 , -75, 75 , //1
			75 , -75, -75, //2
			-75, -75, 75 , //3
		//Faces laterais
			75,-75, 75,   //4
			75,-75,-75,   //5
			75, 75,-75,   //6
			75, 75, 75,   //7

			-75, -75, 75, //8
			75, -75, 75,  //9		
			75, 75, 75,   //10
			-75, 75, 75,  //11

			-75, -75, -75, //12
			-75, -75, 75,  //13
			-75, 75, 75,   //14
			-75, 75, -75,  //15

			75, -75, -75,  //16
			-75, -75, -75, //17
			-75, 75, -75,  //18
			75, 75, -75,   //19
		//Face superior
			-75, 75, 75,   //20
			75, 75, 75,    //21
			75, 75, -75,   //22
			-75, 75, -75   //23
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			1, 2, 0,
			3, 1, 0,

			6, 5, 4,
			7, 6, 4,

			10, 9, 8,
			8, 11, 10,

			14, 13, 12,
			12, 15, 14,

			18, 17, 16,
			16, 19, 18,
			
			22, 21, 20,
			20, 23, 22
		];

		this.normals = [0, 1, 0,
						0, 1, 0,
						0, 1, 0,
						0, 1, 0,
						-1,  0, 0,
						-1,  0, 0,
						-1,  0, 0,
						-1,  0, 0,
						0,  0, -1,
						0,  0, -1,
						0,  0, -1,
						0,  0, -1,
						1,  0, 0,
						1,  0, 0,
						1,  0, 0,
						1,  0, 0,
						0, 0 , 1,
						0, 0 , 1,
						0, 0 , 1,
						0, 0 , 1,
						0, -1, 0,
						0, -1, 0,
						0, -1, 0,
						0, -1, 0];
        
        this.texCoords = [
        //Face inferior
            0.25,0.5,
            0.5, 0.75,
            0.5,0.5,
            0.25,0.75,
		//Faces laterais
            0.75,0.5,
            0.5,0.5,
			0.5,0.25,
			0.75,0.25,

			1,0.5,
			0.75,0.5,
			0.75,0.25,
			1,0.25,

			0.25,0.5,
			0,0.5,
			0,0.25,
			0.25,0.25,

			0.5,0.5,
			0.25,0.5,
			0.25,0.25,
			0.5,0.25,
		//Face superior
			0.25,0,
			0.5,0,
			0.5,0.25,
			0.25,0.25
        ];

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}

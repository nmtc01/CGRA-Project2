/**
 * MyCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [
			-0.5, -0.5, 0.5,	//0
			-0.5, -0.5, 0.5,	//0
			-0.5, -0.5, 0.5,	//0
			
			0.5, -0.5, 0.5,		//1  3
			0.5, -0.5, 0.5,		//1
			0.5, -0.5, 0.5,		//1
			
			0.5, 0.5, 0.5,		//2  6
			0.5, 0.5, 0.5,		//2
			0.5, 0.5, 0.5,		//2
			
			-0.5, 0.5, 0.5,		//3  9
			-0.5, 0.5, 0.5,		//3
			-0.5, 0.5, 0.5,		//3
			
			0.5, -0.5, -0.5,	//4  12
			0.5, -0.5, -0.5,	//4
			0.5, -0.5, -0.5,	//4
			
			0.5, 0.5, -0.5,		//5  15
			0.5, 0.5, -0.5,		//5
			0.5, 0.5, -0.5,		//5
			
			-0.5, -0.5, -0.5,	//6  18
			-0.5, -0.5, -0.5,	//6
			-0.5, -0.5, -0.5,	//6
			
			-0.5, 0.5, -0.5,	//7  21
			-0.5, 0.5, -0.5,	//7
			-0.5, 0.5, -0.5,	//7
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 3, 6,
			6, 9, 0,
			
			15, 12, 18,
			18, 21, 15,
			
			0, 21, 18,
			0, 9, 21,
			
			3, 15, 6,
			3, 12, 15,
			
			0, 12, 3,
			0, 18, 12,
			
			9, 15, 21,
			9, 6, 15,
		];
		
		this.normals = [
			0, 0, 1,		//0
			-1, 0, 0,		//0
			0, -1, 0,		//0
			
			0, 0, 1,		//1
			1, 0, 0,		//1
			0, -1, 0,		//1
		
			0, 0, 1,		//2
			1, 0, 0,		//2
			0, 1, 0,		//2
			
			0, 0, 1,		//3
			-1, 0, 0,		//3
			0, 1, 0,		//3
			
			0, 0, -1,		//4
			1, 0, 0,		//4
			0, -1, 0,		//4
			
			0, 0, -1,		//5
			0, 1, 0,		//5
			1, 0, 0,		//5
			
			0, 0, -1,		//6
			-1, 0, 0,		//6
			0, -1, 0,		//6
		
			0, 0, -1,		//7
			-1, 0, 0,		//7
			0, 1, 0,		//7
		];
		
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
	
	updateBuffers(complexity){
        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
	/*
	enableNormalViz(){
	}*/
}


/**
 * MyQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyQuad extends CGFobject {
	constructor(scene, coords) {
		super(scene);
		this.initBuffers();
		if (coords != undefined)
			this.updateTexCoords(coords);
	}
	
	initBuffers() {
		this.vertices = [
			-0.5, -0.5, 0,	//0
			-0.5, -0.5, 0,	//1
			0.5, -0.5, 0,	//2
			0.5, -0.5, 0,	//3
			-0.5, 0.5, 0,	//4
			-0.5, 0.5, 0,	//5
			0.5, 0.5, 0,	//6
			0.5, 0.5, 0		//7

		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 2, 4,
			4, 2, 6,
			
			1, 5, 3,
			3, 5, 7,
		];

		//Facing Z positive
		this.normals = [
			0, 0, 1,
			0, 0, -1,
			0, 0, 1,
			0, 0, -1,
			0, 0, 1,
			0, 0, -1,
			0, 0, 1,
			0, 0, -1,
		];
		
		/*
		Texture coords (s,t)
		+----------> s
        |
        |
		|
		v
        t
        */

		this.texCoords = [
			0, 1,
			0, 1,
			1, 1,
			1, 1,
			0, 0,
			0, 0,
			1, 0,
			1, 0,
		];

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

	/**
	 * @method updateTexCoords
	 * Updates the list of texture coordinates of the quad
	 * @param {Array} coords - Array of texture coordinates
	 */
	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
}


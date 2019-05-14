/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCubeQuad extends CGFobject {
	constructor(scene, topT, botT, sideT) {
		super(scene);
		this.quad = new MyQuad(scene);
		this.topT = topT;
		this.botT = botT;
		this.sideT = sideT;
	}

	display() {
		//Face Inferior
		this.botT.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI / 2, 1, 0, 0);
		this.scene.translate(0, 0, 0.5);
		this.quad.display();
		this.scene.popMatrix();

		//Face Superior
		this.topT.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.scene.pushMatrix();
		this.scene.rotate(-Math.PI / 2, 1, 0, 0);
		this.scene.translate(0, 0, 0.5);
		this.quad.display();
		this.scene.popMatrix();

		//Faces Laterais
		this.sideT.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.scene.pushMatrix();
		this.scene.translate(0, 0, 0.5);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.rotate(Math.PI / 2, 0, 1, 0);
		this.scene.translate(0, 0, 0.5);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.rotate(-Math.PI / 2, 0, 1, 0);
		this.scene.translate(0, 0, 0.5);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.scene.translate(0, 0, 0.5);
		this.quad.display();
		this.scene.popMatrix();
	}
}


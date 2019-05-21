/**
 * MyTerrain
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTerrain extends CGFobject {
	constructor(scene, terrain_mat) {
        super(scene);
        
        this.terrain_mat = terrain_mat;
        this.plane = new Plane(scene, 32);
    }

    display() {
        this.terrain_mat.apply();
        this.plane.display();
    }
}
/**
* MyCloud
* @constructor
*/
class MyCloud extends CGFobject {
    constructor(scene, x, y, z) {
        super(scene);
        this.sphere = new MySphere(scene, 10);
        
        if(x != undefined && y != undefined && z != undefined) this.pos = [x, y, z];
        else this.pos = [0, 0, 0];

        this.s_coords = [];
        for(let i = 0; i < 10; i++){
            this.s_coords.push(this.genCloud(-1.5, 1.5, -0.5, 0.5));
        }
    }
    genCloud(min_xz, max_xz, min_y, max_y){
        let r1 = Math.random() * (max_xz - min_xz) + min_xz,
            r2 = Math.random() * (max_y - min_y) + min_y,
            r3 = Math.random() * (max_xz - min_xz) + min_xz;
        return [r1,r2,r3];
    }
    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.pos[0], this.pos[1], this.pos[2]);
        let i;
        for(i = 0; i < 10; i++){
            this.scene.pushMatrix();
            this.scene.translate(this.s_coords[i][0], this.s_coords[i][1], this.s_coords[i][2]);
            //this.scene.cloud_mat.apply();
            this.sphere.display();
            this.scene.popMatrix();
        }

        this.scene.popMatrix();
    }
}



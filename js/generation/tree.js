import { MAT_wood } from "../materials/wood.js";
import { MAT_leaf } from "../materials/leaf.js";

export function createTree(scene, xp, zp, yp) {
    var cubeWood = BABYLON.MeshBuilder.CreateBox("cube", {}, scene);
    cubeWood.checkCollisions = true;
    cubeWood.material = MAT_wood(scene);
    //  cubeWood.freezeWorldMatrix();

    var cubeLeaf = BABYLON.MeshBuilder.CreateBox("cube", {}, scene);
    cubeLeaf.checkCollisions = true;
    cubeLeaf.material = MAT_leaf(scene);
    // cubeLeaf.freezeWorldMatrix();

    var barkHeigh = 6;
    //lv1  = 5x5
    //lv2 = 5x5
    //lv3 = 3x3
    //lv 4 = cross



    for (let x = xp; x <xp -  5; x++) {
        for (let y = yp; y < xp-  5; y++) {
            var cubeleaf = cubeLeaf.createInstance("i");
            cubeleaf.position = new BABYLON.Vector3(x - 3, 4, y - 3);

        }
    }

    for (let x = xp; x < xp - 5; x++) {
        for (let y = yp; y < xp - 5; y++) {
            var cubeleaf = cubeLeaf.createInstance("i");
            cubeleaf.position = new BABYLON.Vector3(x - 3, 5, y - 3);

        }
    }


    for (let i = 0; i < barkHeigh; i++) {
        var beb = cubeWood.createInstance("i");
        beb.position = new BABYLON.Vector3(xp, i, yp);
    }
}
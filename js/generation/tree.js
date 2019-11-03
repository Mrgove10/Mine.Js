import { MAT_wood } from "../materials/wood.js";
import { MAT_leaf } from "../materials/leaf.js";

export function createTree(scene, renderDistance, xp, zp, yp) {
    var cubeWood = BABYLON.MeshBuilder.CreateBox("cube", {}, scene);
    cubeWood.checkCollisions = true;
    cubeWood.material = MAT_wood(scene);
    cubeWood.addLODLevel(renderDistance, null);
    cubeWood.freezeWorldMatrix();

    var cubeLeaf = BABYLON.MeshBuilder.CreateBox("cube", {}, scene);
    cubeLeaf.checkCollisions = true;
    cubeLeaf.material = MAT_leaf(scene);
    cubeLeaf.addLODLevel(renderDistance, null);
    cubeLeaf.freezeWorldMatrix();

    var barkHeigh = 6;


    //bark
    for (let i = 0; i < barkHeigh; i++) {
        var cubeWoodd = cubeWood.createInstance("i");
        cubeWoodd.position = new BABYLON.Vector3(xp, i, yp);
     //   console.log(i);
    }

    //level 1 5X5
    for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
            var cubeleaf = cubeLeaf.createInstance("i");
            cubeleaf.position = new BABYLON.Vector3(x - 3, 4, y - 3);
        }
    }

    //level 2 5X5
    for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
            var cubeleaf = cubeLeaf.createInstance("i");
            cubeleaf.position = new BABYLON.Vector3(x - 3, 5, y - 3);
        }
    }

    //level 3 3X3
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            var cubeleaf = cubeLeaf.createInstance("i");
            cubeleaf.position = new BABYLON.Vector3(x - 1, 5, y - 1);
        }
    }

    //level 4 cross
}
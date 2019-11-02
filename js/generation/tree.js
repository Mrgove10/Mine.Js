import { MAT_wood } from "../materials/wood.js";
import { MAT_leaf } from "../materials/leaf.js";

export function createTree(scene, x, y, z) {
    console.log("creating tree");

    var cubeBark = BABYLON.MeshBuilder.CreateBox("cube", {}, scene);
    cubeBark.receiveShadows = true;
    cubeBark.checkCollisions = true;
    cubeBark.material = MAT_wood(scene);

    var cubeLeaf = BABYLON.MeshBuilder.CreateBox("cube", {}, scene);
    cubeLeaf.receiveShadows = true;
    cubeLeaf.checkCollisions = true;
    cubeLeaf.material = MAT_leaf(scene);

    var barkHeigh = 6;
    //lv1  = 5x5
    //lv2 = 5x5
    //lv3 = 3x3
    //lv 4 = cross

    for (let i = 0; i < barkHeigh; i++) {
        var barkinstance = cubeBark.createInstance();
        barkinstance.position = new BABYLON.Vector3(x, i, y);
    }
}
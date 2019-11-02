import { MAT_wood } from "../materials/wood.js";
import { MAT_leaf } from "../materials/leaf.js";
/*
export function createTree(scene, x, z, y) {
    console.log("creating tree" + x + z + y);

    var cubeBark = BABYLON.MeshBuilder.CreateBox("cube", {}, scene);
    cubeBark.checkCollisions = true;
    cubeBark.material = MAT_wood(scene);
    cubeBark.freezeWorldMatrix();

    var cubeLeaf = BABYLON.MeshBuilder.CreateBox("cube", {}, scene);
    cubeLeaf.checkCollisions = true;
    cubeLeaf.material = MAT_leaf(scene);
    cubeLeaf.freezeWorldMatrix();

    var barkHeigh = 6;
    //lv1  = 5x5
    //lv2 = 5x5
    //lv3 = 3x3
    //lv 4 = cross

    for (let i = 0; i < barkHeigh; i++) {
        var barkinstance = cubeBark.createInstance("i");
        barkinstance.position = new BABYLON.Vector3(x, i, y);
    }
}*/
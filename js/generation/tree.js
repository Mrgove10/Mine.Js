import { MAT_wood } from "../materials/wood.js";
import { MAT_leaf } from "../materials/leaf.js";

export function createTree(scene, x, z, y) {
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


     for (let i = 0; i < barkHeigh; i++) {
         var bb = cubeLeaf.createInstance("i");
         bb.position = new BABYLON.Vector3(-1, i, -1);
     }
 
     for (let i = 0; i < barkHeigh; i++) {
         var beb = cubeWood.createInstance("i");
         beb.position = new BABYLON.Vector3(-2, i, -2);
     }
}
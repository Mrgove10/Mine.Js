import { MAT_wood } from "../materials/wood.js";
import { MAT_leaf } from "../materials/leaf.js";

export function createTree(scene, renderDistance, xp, zp, yp) {
    console.log("generating tree");

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
    for (let i = zp; i < zp + barkHeigh; i++) {
        var name = "wood #" + xp + "-" + zp + "-" + yp;
        var cubeWoodd = cubeWood.createInstance(name);
        cubeWoodd.position = new BABYLON.Vector3(xp, i, yp);
    }

    //level 1 5X5
    for (let x = xp; x < xp + 5; x++) {
        for (let y = yp; y < yp + 5; y++) {
            var height = zp + 3;
            var name = "leaf #" + x + "-" + height + "-" + y;
            var cubeleaf = cubeLeaf.createInstance(name);
            cubeleaf.position = new BABYLON.Vector3(x - 2, height, y - 2);
        }
    }

    //level 2 5X5
    for (let x = xp; x < xp + 5; x++) {
        for (let y = yp; y < yp + 5; y++) {
            var height = zp + 4;
            var name = "leaf #" + x + "-" + height + "-" + y;
            var cubeleaf = cubeLeaf.createInstance(name);
            cubeleaf.position = new BABYLON.Vector3(x - 2, height, y - 2);
        }
    }

    //level 3 3X3
    for (let x = xp; x < xp + 3; x++) {
        for (let y = yp; y < yp + 3; y++) {
            var height = zp + 5;
            var name = "leaf #" + x + "-" + height + "-" + y;
            var cubeleaf = cubeLeaf.createInstance(name);
            cubeleaf.position = new BABYLON.Vector3(x - 1, height, y - 1);
        }
    }

    //level 4 cross
    var cubeleaf1 = cubeLeaf.createInstance("leaf #" + xp + "-" + zp + 6 + "-" + yp);
    cubeleaf1.position = new BABYLON.Vector3(xp, zp + 6, yp);

    var cubeleaf2 = cubeLeaf.createInstance("leaf #" + xp - 1 + "-" + zp + 6 + "-" + yp);
    cubeleaf2.position = new BABYLON.Vector3(xp - 1, zp + 6, yp);

    var cubeleaf3 = cubeLeaf.createInstance("leaf #" + xp + "-" + zp + 6 + "-" + yp - 1);
    cubeleaf3.position = new BABYLON.Vector3(xp, zp + 6, yp - 1);

    var cubeleaf4 = cubeLeaf.createInstance("leaf #" + xp + 1 + "-" + zp + 6 + "-" + yp);
    cubeleaf4.position = new BABYLON.Vector3(xp + 1, zp + 6, yp);

    var cubeleaf5 = cubeLeaf.createInstance("leaf #" + xp + "-" + zp + 6 + "-" + yp + 1);
    cubeleaf5.position = new BABYLON.Vector3(xp, zp + 6, yp + 1);
}